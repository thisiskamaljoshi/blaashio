import React,{useState,useEffect} from "react";
import styles from "./carouselCard.module.css";
import Video from "./Video/video";

interface Props {
  video: string;
  caption: string;
  onPress: any;
  active: any;
  current: any;
  index:number;
  activeIndex:number;
  videos:any;
  muteStatus?:Boolean;
}



const CarouselCard = ({ video,videos, caption, onPress, active, current,index,activeIndex,muteStatus }: Props) => {

  function isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

 

  let cardClass:string;
  
  if(!isNullOrUndefined(activeIndex) && (((activeIndex-2) >= 0 && (activeIndex-2) === index) || (activeIndex-2 + videos.length) === index ) ){
    cardClass = "leftTwo"
  }
  else if(!isNullOrUndefined(activeIndex) && ((activeIndex-1) >= 0 && (activeIndex-1) === index) || (activeIndex-1 + videos.length) === index ){
    cardClass = "leftOne"
  }else if(!isNullOrUndefined(activeIndex) && (activeIndex === index)){
    cardClass="active"
  }
  else if(!isNullOrUndefined(activeIndex) && (((activeIndex+1) < videos.length && (activeIndex+1) === index) || (activeIndex+1 - videos.length) === 0) ){
    cardClass = "rightOne"
  }else if(!isNullOrUndefined(activeIndex) && (((activeIndex+2) < videos.length && (activeIndex+2) === index) || (activeIndex+2 - videos.length) === 0) ){
    cardClass = "rightTwo"
  }
  

  return (
    <div
      className={`${styles.card} ${ styles[cardClass] }`}
      onClick={onPress}
    >
      {active?.StoryId === current  ? (
        <Video muteStatus={muteStatus} autoplay={true}  videoUrl={active?.Url}/>
      ) : (
        null
      )}


      {active?.StoryId !== current  ? (
        <Video muteStatus={true} autoplay={true} videoUrl={video}/>
      ) : (
        null
      )}


      

      {/* <div className={styles.caption}>
        <p className={styles.text}>{caption}</p>
      </div> */}
    </div>
  );
};

export default CarouselCard;
