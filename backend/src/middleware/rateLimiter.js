import ratelimit from "../config/upstash.js";

const rateLimiter = async (request, response, next) => {
    try {
        // [[my-limit-key]] should be a userId or IP address so you can stop a user from doing too many requests
        const {success} = await ratelimit.limit("my-rate-limit");
        if (!success)
        {
            return response.status(429).json({
                message: "Too many requests, please try again later"
            })
        }
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
    next();
};

export default rateLimiter;