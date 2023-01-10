import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Product } from "../Interfaces";
import { RateInactive } from "./RateInactive";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={content.cardWrapper} key={product?.id}>
      <Image
        testID="photo"
        source={{ uri: product?.photo }}
        style={card.image}
      />
      <View style={{ flex: 3 }}>
        <TouchableOpacity
          testID="navigation"
          onPress={() => navigation.navigate("Product", { id: product.id })}
        >
          <Text testID="name" style={[text.fat, margin.bottom]}>
            {product?.name} {product?.format}
          </Text>
        </TouchableOpacity>
        <Text testID="description" style={margin.bottom}>
          {product?.description.slice(0, 130)}...
        </Text>
        <View style={{ flexDirection: "row" }}>
          <RateInactive rating={product?.rating ?? 0} />
          <Text testID="rating" style={margin.left}>
            {product?.rating}
          </Text>
        </View>
        <Text>{product?.reviews.length} ratings</Text>
      </View>
    </View>
  );
};

const text = StyleSheet.create({
  fat: {
    fontWeight: "bold",
  },
});

const margin = StyleSheet.create({
  all: {
    margin: 10,
  },
  bottom: {
    marginBottom: 10,
  },
  left: {
    marginLeft: 10,
  },
  top: {
    marginTop: 10,
  },
});

const content = StyleSheet.create({
  cardWrapper: {
    width: "95%",
    minHeight: 100,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    padding: 10,
  },
});

const card = StyleSheet.create({
  image: {
    flex: 1,
    height: 90,
    width: 90,
    marginRight: 10,
  },
});
