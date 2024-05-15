import { Link } from "react-router-dom";
import Posts from "./Posts";
import Aside from "./Aside";

const Home = () => {
  return (
    <div className="grid lg:grid-cols-[1fr_5fr] grid-cols-[1fr]  gap-5 mt-4">
      <Aside />
      <Posts />
    </div>
  );
};

export default Home;
