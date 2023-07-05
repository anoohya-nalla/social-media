import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
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
      <ScrollView>
        <View style={{ padding: 20 }}>
          {posts.length === 0 ? (
            <View>
              <Text style={{ textAlign: "center" }}>No posts available</Text>
            </View>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
          <Button
            title="Create Post"
            onPress={() => navigation.navigate("Post")}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
