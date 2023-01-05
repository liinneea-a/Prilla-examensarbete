import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getOneDocById } from "../helper";
import { Tag, Review, Product } from "../Interfaces";
import { RateInactive } from "./RateInactive";
import { View, Text } from "../components/Themed";

interface Props {
  review: Review;
}

export const ReviewCard = ({ review }: Props) => {
  const [product, setProduct] = useState<Product>();
  const navigation = useNavigation();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let data = await getOneDocById("produkter", review.productID);
    if (data) {
      setProduct(data as Product);
    }
  };

  if (product) {
    return (
      <View lightColor="#7e7885" darkColor="#3D3745" style={styles.wrapper}>
        <View
          lightColor="#7e7885"
          darkColor="#3D3745"
          style={styles.productData}
        >
          <Image style={styles.image} source={{ uri: product.photo }} />
          <View
            lightColor="#7e7885"
            darkColor="#3D3745"
            style={styles.textAndRating}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Product", { id: review.productID })
              }
            >
              <View
                lightColor="#7e7885"
                darkColor="#3D3745"
                style={styles.productText}
              >
                <Text
                  style={styles.textBold}
                  lightColor="#fff"
                  darkColor="#fff"
                >
                  {product.brand + " " + product.name}
                </Text>
                <Text lightColor="#fff" darkColor="#fff">
                  {product.type}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              lightColor="#7e7885"
              darkColor="#3D3745"
              style={{ flexDirection: "row" }}
            >
              <RateInactive rating={review.rating} />
              <Text
                lightColor="#fff"
                darkColor="#fff"
                style={{ marginLeft: 10 }}
              >
                {review.rating}
              </Text>
            </View>
          </View>
        </View>
        <View
          lightColor="#7e7885"
          darkColor="#3D3745"
          style={styles.description}
        >
          <Text lightColor="#fff" darkColor="#fff">
            {review.description}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text lightColor="#333" darkColor="#fff">
          Loading
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    borderRadius: 6,
    width: "90%",
    padding: 10,
    height: 130,
  },
  image: {
    height: 60,
    width: 60,
    flex: 1,
  },
  productData: {
    flexDirection: "row",
  },
  textAndRating: {
    marginLeft: 10,
    flex: 4,
  },
  productText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBold: {
    fontWeight: "bold",
  },
  description: {
    padding: 10,
  },
});
