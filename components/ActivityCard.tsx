import { Text } from "./Themed";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Review, User } from "../Interfaces";
import { ReviewCard } from "./ReviewCard";
import React, { useEffect, useState } from "react";
import { getOneDocById } from "../helper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface Props {
  review: Review;
}

export const ActivityCard = ({ review }: Props) => {
  const [author, setAuthor] = useState<User>();
  const navigation = useNavigation();

  useEffect(() => {
    getReviewAuthor();
  }, []);

  const getReviewAuthor = async () => {
    let data = await getOneDocById("users", review.userID);
    if (data) {
      setAuthor(data as User);
    }
  };

  return (
    <View>
      <ImageBackground
        source={{ uri: review.photo }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.userInfo}>
          <Text>User Pic</Text>
          <Text style={styles.username}>{author?.displayName}</Text>
        </View>
        <ReviewCard key={review.id} review={review} />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: 230,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    width: "100%",
  },
  username: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});
