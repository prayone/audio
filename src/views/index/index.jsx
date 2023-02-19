
import {useEffect,useState,useRef,createContext} from 'react'
import './index.scss'
import bg from "../../assets/bg.png";
import {Desc} from './info'
import {course_play} from '../../api'

export const AudioContext = createContext({})
export default function IndexPage(){
  const [infoObj,setinfoObj] = useState({})
  const code = infoObj.code

  const [currentAudio,setCurrentAudio] = useState({})


  let player = useRef(null);

  useEffect(() => {
    get_mp3()
  },[])

  const chageCode = (code)=>{
    setinfoObj({...infoObj, code})
  }

  const initPlay = ()=>{
     player = new Audio(infoObj.url)
     player.ontimeupdate = () => {
        setCurrentAudio({
          currentTime : player.currentTime,
          duration : player.duration,
          percent: +((player.currentTime / player.duration) *100).toFixed(2)
        })
      };
  }
  useEffect(()=>{
    if(infoObj?.url) {
      initPlay();
    }
  },[infoObj?.url])

  const play = ()=>{
    console.log(player)
    player.play()
  }
  const chagePlay = (val)=>{
    console.log(val,'val--------')
    const currentTime = player.duration * (val / 100);
    player.currentTime = currentTime;
  }
  const get_mp3 = async()=>{
    let res = await course_play({id:'176'})
    if(res.status === 1){
      setinfoObj(res.data)
    }
  }
  return (
    <div className='View'>
      <div className="title">
      Vol.{code}  行业大咖讲志愿填报…
      </div>
      <div className="play" onClick={play}>播放</div>
      <div className="img"><img src={bg} alt="bg" /></div>
      <AudioContext.Provider value={{currentAudio,chagePlay}}>
        <Desc code={code} chageCode={chageCode}/>
      </AudioContext.Provider>
    </div>
  )
}

