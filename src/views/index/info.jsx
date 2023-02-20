import Player from "./player";
import { useContext } from "react";
import { AudioContext } from "./index";
const Desc = () => {
  const { infoObj } = useContext(AudioContext);
  return (
    <div className="card">
      <div className="video-titles">
        <div className="v-title">选择财务专业到底好不好</div>
        <div className="desc">Vol.{infoObj.code} 行业大咖讲志愿填报</div>
        <Player />
      </div>
    </div>
  );
};
export { Desc };
