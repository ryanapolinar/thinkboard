import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dotenv from "dotenv";

dotenv.config();

// Create a rateLimiter that allows REQUEST_LIMIT requests per REQUEST_INTERVAL seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(process.env.REQUEST_LIMIT, `${process.env.REQUEST_INTERVAL} s`)
});

export default ratelimit;