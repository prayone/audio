import { useEffect, useState, createContext, useRef } from "react";
import "./index.scss";
import { Desc } from "./info";
import { course_play } from "../../api";

export const AudioContext = createContext({});

export default function IndexPage() {
  const [infoObj, setinfoObj] = useState({});

  const [curAudio, setCurAudio] = useState({});
  const [isPlay, setIsPlay] = useState(false);
  const percent = useRef(0);
  const playerRef = useRef(null);

  useEffect(() => {
    get_mp3();
  }, []);

  const get_mp3 = async () => {
    let res = await course_play({ id: "176" });
    if (res.status === 1) {
      setinfoObj(res.data);
    }
  };
  useEffect(() => {
    !!infoObj.url && initPlayer();
  }, [infoObj.url]);

  // 初始化audio
  const initPlayer = () => {
    const player = new Audio(infoObj.url);
    player.ontimeupdate = () => {
      setCurAudio({
        currentTime: player.currentTime,
        duration: player.duration,
      });
      percent.current = +((player.currentTime / player.duration) * 100).toFixed(
        2
      );
    };
    // 音频加载完设置：视频总长
    player.oncanplay = () => {
      setCurAudio({
        currentTime: player.currentTime,
        duration: player.duration,
      });
    };
    playerRef.current = player;
  };
  // 改变拖动条
  const setCurTime = (value) => {
    const currentTime = playerRef.current.duration * (value / 100);
    playerRef.current.currentTime = currentTime;
    setCurAudio({
      currentTime,
      duration: playerRef.current.duration,
    });
  };
  // 暂停、播放动作
  const playPause = (info) => {
    const isInfo = info === "play";
    setIsPlay(isInfo);
    isInfo ? playerRef.current.play() : playerRef.current.pause();
  };
  // 改变速率
  const chageRate = (val) => {
    console.log(val, "rate-----");
    playerRef.current.playbackRate = val;
  };

  return (
    !!infoObj.image && (
      <div className="View">
        <div className="title">Vol.{infoObj.code} 行业大咖讲志愿填报…</div>
        <div className="img">
          <img src={infoObj.image} alt="bg" />
        </div>
        <AudioContext.Provider
          value={{
            curAudio,
            infoObj,
            playPause,
            isPlay,
            percent,
            setCurTime,
            chageRate,
          }}
        >
          <Desc />
        </AudioContext.Provider>
      </div>
    )
  );
}
