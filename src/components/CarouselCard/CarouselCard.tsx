import React,{useState} from "react";
import styles from "./carouselCard.module.css";

interface Props {
  video: string;
  caption: string;
  onPress: any;
  active: any;
  current: any;
  index:number;
  activeIndex:number;
}



const CarouselCard = ({ video, caption, onPress, active, current,index,activeIndex }: Props) => {

  function isNullOrUndefined(value) {
    return value === undefined || value === null;
  }

 

  let cardClass:string;
  
  if(!isNullOrUndefined(activeIndex) && (activeIndex-2) >= 0 && (activeIndex-2) === index ){
    cardClass = "leftTwo"
  }
  else if(!isNullOrUndefined(activeIndex) && (activeIndex-1) >= 0 && (activeIndex-1) === index ){
    cardClass = "leftOne"
  }else if(!isNullOrUndefined(activeIndex) && activeIndex === index){
    cardClass="active"
  }
  else if(!isNullOrUndefined(activeIndex) && +activeIndex+1 === index ){
    cardClass = "rightOne"
  }else if(!isNullOrUndefined(activeIndex) && +activeIndex+2 === index ){
    cardClass = "rightTwo"
  }

  return (
    <div
      className={`${styles.card} ${ styles[cardClass] }`}
      onClick={onPress}
    >
      {active?.StoryId === current ? (
        <video className={styles.video} loop autoPlay playsInline>
          <source src={active?.Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video className={styles.video} muted autoPlay playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* <div className={styles.caption}>
        <p className={styles.text}>{caption}</p>
      </div> */}
    </div>
  );
};

export default CarouselCard;
