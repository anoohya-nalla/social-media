import React, { useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const PostScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const handlePost = () => {
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Create a Post
      </Text>
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
        placeholder="Expiry Time"
        value={expiryTime}
        onChangeText={setExpiryTime}
      />
      {imageSource && (
        <Image
          source={{ uri: imageSource }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}
      <Button title="Pick Image" onPress={handleImagePick} />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

export default PostScreen;
