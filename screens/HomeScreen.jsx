/**
 * Created by Anoohya Nalla on 2023-07-05.
 * Original code authored by Anoohya Nalla.
 */

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import PostCard from "../components/PostCard";

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  useEffect(() => {
    if (route.params && route.params.post) {
      addPost(route.params.post);
    }
  }, [route.params]);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#ffffff" }}>
        <View style={{ padding: 20 }}>
          {posts.length === 0 ? (
            <View>
              <Text style={{ textAlign: "center", fontSize: 14 }}>
                No posts available
              </Text>
            </View>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#d4a575",
                padding: 10,
                borderRadius: 20,
                width: 150,
              }}
              onPress={() => navigation.navigate("Post")}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Create Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
