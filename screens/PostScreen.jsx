/**
 * Created by Anoohya Nalla on 2023-07-05.
 * Original code authored by Anoohya Nalla.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

const PostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const handlePost = () => {
    if (!title) {
      // Display an error message indicating that a caption is required
      Alert.alert("Error", "Caption is required.");
      return;
    }

    const post = {
      id: Date.now().toString(),
      title,
      description,
      expiryTime,
      imageSource,
    };

    // Pass the new post to the HomeScreen
    navigation.navigate("Home", { post });
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImageSource(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Create a Post
          </Text>
          {imageSource && (
            <Image
              source={{ uri: imageSource }}
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}
          <View style={{ marginBottom: 20, width: 150 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#d4a575",
                padding: 10,
                borderRadius: 20,
                width: 150,
              }}
              onPress={handleImagePick}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Pick an image
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "#e7e7e7",
              width: 300,
            }}
            placeholder="Write a caption..."
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "#e7e7e7",
              width: 300,
            }}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "#e7e7e7",
              width: 300,
            }}
            placeholder="Expiry time (mins)"
            value={expiryTime}
            onChangeText={setExpiryTime}
          />
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#d4a575",
                padding: 10,
                borderRadius: 20,
                width: 100,
              }}
              onPress={handlePost}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostScreen;
