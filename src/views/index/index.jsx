
import {useEffect,useState,createContext} from 'react'
import './index.scss'
import bg from "../../assets/bg.png";
import {Desc} from './info'
import {course_play} from '../../api'

export const AudioContext = createContext({})
export default function IndexPage(){
  const [infoObj,setinfoObj] = useState({})

  const  [player, setPlayer] = useState(null);
  const  [curAudio, setCurAudio] = useState({});

  useEffect(() => {
    get_mp3()
  },[])

  const chageCode = (code)=>{
    setinfoObj({...infoObj, code})
  }

  const initPlay = ()=>{
     const player = new Audio(infoObj.url)
     player.ontimeupdate = () => {
        setCurAudio({
          ...curAudio,
          currentTime:player.currentTime,
          duration : player.duration,
        })
      };

    player.loop = true;
    player.oncanplay = () => {
      console.log('oncanplay,ready')
      setCurAudio({
        duration : player.duration,
      })
    };
    player.onended = () => {
      player.pause()
    };
    setPlayer(player)
  }
  useEffect(()=>{
    if(infoObj?.url) {
      initPlay();
    }
  },[infoObj?.url])

  const play = ()=>{
    player.play()
  }

  /**
   * 这里必须等player加载完毕才能允许触发
   */
  const chagePlay = (val)=>{
    const currentTime = curAudio.duration * (val / 100) || 0;
    if(player && currentTime) {
      player.currentTime = currentTime;
    }
  }
  const get_mp3 = async()=>{
    let res = await course_play({id:'176'})
    if(res.status === 1){
      console.log('ajax load')
      setinfoObj(res.data)
    }
  }
  const PlayAction = ()=>{
    if(player?.paused) {
      return <div className='play-control' onClick={()=>player?.play()}>播放</div>
    }
    return <div className='play-control' onClick={()=>player?.pause()}>暂停</div>
  }

  return (
    <div className='View'>
      <div className="title">
      Vol.{infoObj.code}  行业大咖讲志愿填报…
      </div>
      <div className="img"><img src={bg} alt="bg" /></div>
      <AudioContext.Provider value={{curAudio, chagePlay, PlayAction}}>
        <Desc code={infoObj.code} chageCode={chageCode}/>
      </AudioContext.Provider>
    </div>
  )
}

