import {useContext,useEffect,useState} from 'react'
import {AudioContext} from './index'
import { Slider } from 'react-vant';


const format=(interval)=> {
    interval = interval | 0;
    const minute = (interval / 60) | 0;
    const second = pad(interval % 60);
    return `${minute}:${second}`;
  }
const pad = (num, n = 2)=> {
    let len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
}

const  Player= ()=>{
    const {curAudio, chagePlay, PlayAction} = useContext(AudioContext)
    /**
     *  Slider数据流必须是单向的
     *  两件事不能相互依赖，会导致进度条拖不动
     */
    const [value, setValue] = useState(0);

    // Slider onChange改动自己进度的同时，手动触发播放器播放进度更新
    const onValueChange = (value) =>{
        setValue(value);
        chagePlay(value);
    }

    // 播放器进度更新，手动触发更新Slider进度
    useEffect(()=>{
        const percent = ((curAudio.currentTime / curAudio.duration) * 100).toFixed(2)
        percent && setValue(percent);
    }, [curAudio.currentTime, curAudio.duration])

    return(
        <>
            <div className="player">
                <div className="currentTime">{format(curAudio.currentTime)}</div>
                <Slider value={value || 0} onChange={onValueChange} />
                <div className="duration">{format(curAudio.duration)}</div>
            </div>
            <div className="control">
                <PlayAction></PlayAction>
            </div>
        </>
    )
}
export default  Player
