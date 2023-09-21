import React, { useState,useEffect } from "react";
import styles from "./carousel.module.css";
import axios from "axios";
import Card from "../Card/card";
import CarouselCard from "../CarouselCard/CarouselCard";

const Carousel = ({ currentVideo, videos }) => {
  const [carouselVideo, setCarouselVideo] = useState({...currentVideo});

  const [activeIndex, setActiveIndex] = useState(null);


  const oneVideoUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=`;

  const videosConfig = {
    headers: {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "BLAASH1122",
    },
  };

  const findActiveIndex=(videos)=>{
    videos.map((videoObject,index)=>{
      console.log(currentVideo?.StoryId ,videoObject?.EngagementPostId,"index",carouselVideo?.StoryId,index)
      if((currentVideo?.StoryId ?? carouselVideo?.StoryId) === videoObject?.EngagementPostId){
        setActiveIndex(index)
      }
    })
  }


  console.log(activeIndex,"activeIndex");
  
  

  const getRequestVideo = async (url, config) => {
    axios
      .get(url, config)
      .then((response) => {
        setCarouselVideo(response?.data?.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleVideoClick = (id) => {
    getRequestVideo(oneVideoUrl + id, videosConfig);
    findActiveIndex(videos)
  };


  useEffect(() => {
    findActiveIndex(videos)
    console.log(activeIndex,"working")
  }, [])

  return (
    <div className={styles.carouselMain}>
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
            onPress={() => handleVideoClick(videoObject?.EngagementPostId)}
          />
        );
      })}
    </div>
  );
};

export default Carousel;
