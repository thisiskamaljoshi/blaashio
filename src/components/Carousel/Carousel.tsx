import React, { useState,useEffect } from "react";
import styles from "./carousel.module.css";
import axios from "axios";
import Card from "../Card/card";
import CarouselCard from "../CarouselCard/CarouselCard";

import Prev from "../../assets/svg/prev";
import Next from "../../assets/svg/next";

const Carousel = ({ currentVideo, videos,setCurrentVideo,getRequestVideo }) => {

  const [activeIndex, setActiveIndex] = useState(-1);


  const oneVideoUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=`;

  const videosConfig = {
    headers: {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "BLAASH1122",
    },
  };

  const findActiveIndex=(videos,currentVideo)=>{
    videos.map((videoObject,index)=>{
      if((currentVideo?.StoryId) === videoObject?.EngagementPostId){
        setActiveIndex(index)
      }
    })
  }
  

  

  const handleVideoClick = (id) => {
    getRequestVideo(oneVideoUrl + id, videosConfig);
    findActiveIndex(videos,currentVideo)
  };

  const handlePrevClick = (activeIndex) => {
    
    if(activeIndex === 0){
      getRequestVideo(oneVideoUrl + videos[videos.length-1]?.EngagementPostId, videosConfig);
      setActiveIndex(videos.length-1);
    }else{
      setActiveIndex(prev => prev-1);
      getRequestVideo(oneVideoUrl + videos[activeIndex-1]?.EngagementPostId, videosConfig);
    }
  };

  const handleNextClick = (activeIndex) => {
    if(activeIndex === videos.length-1){
      getRequestVideo(oneVideoUrl + videos[0]?.EngagementPostId, videosConfig);
      setActiveIndex(0);
    }else{
      setActiveIndex(next => next+1);
      getRequestVideo(oneVideoUrl + videos[activeIndex+1]?.EngagementPostId, videosConfig);
    }
  };

  useEffect(() => {
    findActiveIndex(videos,currentVideo)
  }, [currentVideo])

  return (
    <div className={styles.carouselMain}>
      <div className={styles.prev}>
        <Prev onPress={() => handlePrevClick(activeIndex)} />
      </div>
      {videos.map((videoObject,index) => {
        return (
          <CarouselCard
            key={videoObject?.EngagementPostId}
            current={videoObject?.EngagementPostId}
            video={videoObject?.Thumbnail_URL}
            caption={videoObject?.Thumbnail_Title}
            active={currentVideo}
            index={index}
            activeIndex={activeIndex}
            videos={videos}
            onPress={() => handleVideoClick(videoObject?.EngagementPostId)}
          />
        );
      })}
      <div className={styles.next}>
        <Next onPress={() => handleNextClick(activeIndex)} />
      </div>
    </div>
  );
};

export default Carousel;
