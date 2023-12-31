/**
 * Created by Anoohya Nalla on 2023-07-05.
 * Original code authored by Anoohya Nalla.
 */

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";

const PostCard = ({ post }) => {
  const { title, description, expiryTime, imageSource } = post;
  const [isExpired, setIsExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const expirationTime = moment(post.createdAt).add(expiryTime, "minutes");

    const updateRemainingTime = () => {
      const currentTime = moment();
      const duration = moment.duration(expirationTime.diff(currentTime));

      if (duration.asMilliseconds() > 0) {
        const totalSeconds = Math.floor(duration.asSeconds());
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setRemainingTime(`${minutes}m ${seconds}s`);
      } else {
        setIsExpired(true);
      }
    };

    updateRemainingTime(); // Initial calculation

    const interval = setInterval(() => {
      updateRemainingTime(); // Update remaining time every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isExpired && expiryTime) {
    return null; // Hide the post card if expired
  }

  return (
    <>
      <View
        style={{
          marginTop: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#7C4E29",
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageSource && (
            <Image
              source={{ uri: imageSource }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}
        </View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        {description ? <Text>{description}</Text> : null}
        {expiryTime != null && remainingTime ? (
          <Text style={{ marginTop: 5 }}>Expires in: {remainingTime}</Text>
        ) : null}
      </View>
    </>
  );
};

export default PostCard;
