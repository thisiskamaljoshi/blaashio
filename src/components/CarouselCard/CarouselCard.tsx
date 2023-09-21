import React from "react";
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
  console.log(active?.StoryId === current, "Video", active?.Url, video);
  //   if(active===current){
  //   console.log(true,video);
  // }

  let cardClass:string;
  
  if(activeIndex && activeIndex-2 >= 0 && activeIndex-2 === index ){
    console.log(activeIndex,index,"leftTwo")
    cardClass = "leftTwo"
  }
  else if(activeIndex && activeIndex-1 >= 0 && activeIndex-1 === index ){
    console.log(activeIndex,index,"leftOne")
    cardClass = "leftOne"
  }else if(activeIndex && activeIndex === index){
    console.log(activeIndex,index,"active")
    cardClass="active"
  }
  else if(activeIndex && activeIndex+1 >= 0 && activeIndex+1 === index ){
    console.log(activeIndex,index,"rightOne")
    cardClass = "rightOne"
  }else if(activeIndex && activeIndex+2 >= 0 && activeIndex+2 === index ){
    console.log(activeIndex,index,"rightTwo")
    cardClass = "rightTwo"
  }

  return (
    <div
      className={`${styles.card} ${
        // @ts-ignore
        active?.StoryId === current ? styles[cardClass] : ""
      }`}
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
