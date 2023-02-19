import {AudioContext} from './index'
import {useContext} from 'react'
import { Slider } from 'react-vant';
const  Player= ()=>{
    const {currentAudio,chagePlay} = useContext(AudioContext)
    return(
        <div className="player">
            <div className="currentTime">{format(currentAudio.currentTime)}</div>
            <Slider value={currentAudio?.percent||0} onChange={(val)=>{
                chagePlay(val)}} />
            <div className="duration">{format(currentAudio.duration)}</div>
        </div>
    )
}
export default  Player

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