import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-primary border-b border-base-content/5">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-black font-mono tracking-tight">
              ThinkBoard
            </h1>
          </Link>
          <div className="flex items-centergap-4">
            <Link to={"/create"} className="btn btn-secondary">
              <PlusIcon /> <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
