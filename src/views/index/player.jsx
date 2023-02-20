import { useContext } from "react";
import { AudioContext } from "./index";
import { Slider } from "react-vant";
import play from "../../assets/play.png";
import pause from "../../assets/pause.png";

// 播放速率
const rateList = [
  { text: "X0.5", val: 0.5 },
  { text: "X1", val: 1 },
  { text: "X1.5", val: 1.5 },
  { text: "X2", val: 2 },
];

const Player = () => {
  const { curAudio, playPause, isPlay, percent, setCurTime, chageRate } =
    useContext(AudioContext);
  return (
    <div className="paly-cont">
      <div className="play-rate">
        {rateList.map((item) => {
          return (
            <div
              className="rate"
              key={item.text}
              onClick={() => chageRate(item.val)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
      <div className="play-slider">
        <div className="cur-time">{format(curAudio.currentTime)}</div>
        <Slider
          barHeight="5px"
          activeColor="pink"
          buttonSize="25"
          inactiveColor="#FDE3E3"
          value={percent.current}
          onChange={(val) => {
            setCurTime(val);
          }}
        />
        <div className="duration">{format(curAudio.duration)}</div>
      </div>
      {/* 播放暂停按钮 */}
      <div className="play-pause">
        <img
          src={isPlay ? pause : play}
          alt={play}
          onClick={() => playPause(isPlay ? "pause" : "play")}
        />
      </div>
    </div>
  );
};
export default Player;

const format = (interval) => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = pad(interval % 60);
  return `${minute}:${second}`;
};
const pad = (num, n = 2) => {
  let len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
};
