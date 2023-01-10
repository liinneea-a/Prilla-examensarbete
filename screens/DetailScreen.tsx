import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import * as Haptics from "expo-haptics";
import { View, Text } from "../components/Themed";
import { getDocsWithSpecificValue, getOneDocById } from "../helper";
import { Product, Review } from "../Interfaces";
import { RootStackScreenProps } from "../types";
import { RateInactive } from "../components/RateInactive";
import { AntDesign } from "@expo/vector-icons";
import { StrengthBar } from "../components/StrengthBar";
import Colors, { gradientDark, gradientLight } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

interface ReviewWithAuthor extends Review {
  author: string;
}

function ProductDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<"Product">) {
  const [product, setProduct] = useState<Product>();
  const [activeTab, setActiveTab] = useState<number>(3);
  const [reviews, setReviews] = useState<ReviewWithAuthor[]>([]);
  const [like, setLike] = useState<boolean>(false);
  const colorScheme: any = useColorScheme();
  let isLight = colorScheme == "light" ? true : false;

  useEffect(() => {
    getProductReviews();
    getProductData();
  }, []);

  const getProductData = async () => {
    try {
      let data = await getOneDocById("produkter", route.params.id);
      if (data) {
        setProduct(data as Product);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProductReviews = async () => {
    let newList: ReviewWithAuthor[] = [];
    try {
      const reviewsDocs = await getDocsWithSpecificValue(
        "recensioner",
        "productID",
        route.params.id
      );
      if (reviewsDocs) {
        for (let rev of reviewsDocs) {
          let name = await getReviewAuthor(rev.userID);
          newList.push({ ...rev, author: name } as ReviewWithAuthor);
        }
        setReviews(newList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewAuthor = async (id: string) => {
    try {
      const user = await getOneDocById("users", id);
      if (user) {
        let name = user?.displayName;
        return name;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const toggleButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLike(!like);
  };

  const renderFolderContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <Text lightColor={Colors[colorScheme].text}>
            {product?.description}
          </Text>
        );
      case 2:
        return (
          <>
            <View lightColor="transparent" style={styles.folderFacts}>
              <Text
                lightColor={Colors[colorScheme].text}
                style={styles.fatText}
              >
                Varumärke
              </Text>
              <Text lightColor={Colors[colorScheme].text}>
                {product?.brand}
              </Text>
            </View>
            <View lightColor="transparent" style={styles.folderFacts}>
              <Text
                lightColor={Colors[colorScheme].text}
                style={styles.fatText}
              >
                Namn
              </Text>
              <Text lightColor={Colors[colorScheme].text}>{product?.name}</Text>
            </View>
            <View lightColor="transparent" style={styles.folderFacts}>
              <Text
                lightColor={Colors[colorScheme].text}
                style={styles.fatText}
              >
                Smak
              </Text>
              <View lightColor="transparent" style={{ flexDirection: "row" }}>
                {product?.flavor.map((f) => {
                  return (
                    <Text lightColor={Colors[colorScheme].text}>{f} </Text>
                  );
                })}
              </View>
            </View>
            <View lightColor="transparent" style={styles.folderFacts}>
              <Text
                lightColor={Colors[colorScheme].text}
                style={styles.fatText}
              >
                Nikotinhalt
              </Text>
              <Text lightColor={Colors[colorScheme].text}>
                {product?.nicotine} mg/g
              </Text>
            </View>
            <View lightColor="transparent" style={styles.folderFacts}>
              <Text
                lightColor={Colors[colorScheme].text}
                style={styles.fatText}
              >
                Vikt
              </Text>
              <Text lightColor={Colors[colorScheme].text}>
                {product?.weight}g
              </Text>
            </View>
          </>
        );
      case 3:
        return reviews.map((rev) => {
          return (
            <View lightColor="transparent" style={styles.reviewWrapper}>
              <View lightColor="transparent" style={styles.reviewTop}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Profile", { id: rev.userID });
                  }}
                >
                  <Text
                    lightColor={Colors[colorScheme].text}
                    style={[styles.fatText, styles.capitalize]}
                  >
                    {rev.author}
                  </Text>
                </TouchableOpacity>
                <RateInactive
                  rating={rev.rating}
                  small={{ size: 15, container: 90, single: 17 }}
                />
                <Text lightColor={Colors[colorScheme].text}>{rev.rating}</Text>
              </View>
              <Text lightColor={Colors[colorScheme].text}>
                {rev.description}
              </Text>
            </View>
          );
        });
    }
  };

  const styles = StyleSheet.create({
    fatText: {
      fontWeight: "bold",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    background: {
      position: "relative",
      height: 200,
      width: "100%",
    },
    waves: {
      position: "absolute",
      bottom: -23,
      height: 100,
    },
    screenContainer: {
      padding: 20,
    },
    productImg: {
      height: 120,
      width: 120,
      marginRight: 10,
    },
    productDataContainer: {
      height: 200,
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
    },
    productInfo: {
      padding: 10,
      borderBottomLeftRadius: 6,
      borderTopLeftRadius: 6,
      justifyContent: "space-between",
      maxWidth: "60%",
    },
    manufacturer: {},
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      color: "white",
      marginLeft: 10,
    },
    interactions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      padding: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: "#783BC9",
      borderRadius: 6,
    },
    tableDataContainer: {
      width: "70%",
    },
    tableRow: {
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: Colors[isLight ? "light" : "dark"].grey.light,
      borderBottomWidth: 1,
    },
    folder: {
      marginTop: 50,
      width: "100%",
    },
    tabs: {
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      height: 50,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderWidth: 1,
      borderColor: Colors[isLight ? "light" : "dark"].grey.light,
      borderBottomWidth: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[colorScheme].grey.light,
    },
    activeTab: {
      backgroundColor: Colors[colorScheme].background,
    },

    folderContent: {
      backgroundColor: Colors[colorScheme].background,
      borderColor: Colors[isLight ? "light" : "dark"].grey.light,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      padding: 30,
    },
    folderFacts: {
      flexDirection: "row",
      justifyContent: "space-between",
      height: 50,
    },
    reviewTop: {
      flexDirection: "row",
      width: "50%",
      justifyContent: "space-between",
    },
    reviewWrapper: {
      width: "90%",
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomColor: Colors[colorScheme].grey.light,
      borderBottomWidth: 1,
    },
  });

  if (product && reviews) {
    return (
      <LinearGradient
        colors={
          isLight
            ? [gradientLight.from, gradientLight.to]
            : [gradientDark.from, gradientDark.to]
        }
      >
        <ScrollView>
          <ImageBackground
            style={styles.background}
            source={require("../assets/images/detail_Bg.png")}
          >
            {isLight ? (
              <Image
                source={require("../assets/images/waves_light.png")}
                style={styles.waves}
              />
            ) : (
              <Image
                style={styles.waves}
                source={require("../assets/images/waves_dark.png")}
              />
            )}
          </ImageBackground>
          <View style={styles.screenContainer}>
            <View style={styles.productDataContainer}>
              <Image
                style={styles.productImg}
                source={{ uri: product?.photo }}
              />
              <View style={styles.productInfo}>
                <Text style={styles.title}>
                  {product?.brand + " " + product?.name}
                </Text>
                <Text style={styles.manufacturer}>{product?.manufacturer}</Text>
                <View style={styles.ratingContainer}>
                  <View
                    style={{
                      backgroundColor: Colors[colorScheme!].primary.dark,
                      padding: 10,
                      borderRadius: 6,
                      flexDirection: "row",
                    }}
                  >
                    <RateInactive
                      rating={product?.rating ? product.rating : 0}
                    />
                    <Text style={styles.ratingText}>
                      {product?.rating ? product.rating : 0}
                    </Text>
                  </View>
                </View>
                <Text>{product?.reviews.length} Ratings</Text>
                <View style={styles.interactions}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Review", { id: product.id })
                    }
                  >
                    <View style={styles.button}>
                      <Text lightColor="#333" darkColor="#fff">
                        Lägg till recension
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={toggleButton}>
                    {like ? (
                      <AntDesign name="heart" size={24} color="red" />
                    ) : (
                      <AntDesign name="hearto" size={24} color="#783BC9" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.tableDataContainer}>
              <View style={styles.tableRow}>
                <Text>Styrka</Text>
                <StrengthBar strength={product?.strength} />
              </View>
              <View style={styles.tableRow}>
                <Text>Antal</Text>
                <Text>{product?.pouches} st per dosa</Text>
              </View>
              <View style={styles.tableRow}>
                <Text>Typ</Text>
                <Text>{product?.type}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text>Format</Text>
                <Text>{product?.format}</Text>
              </View>
            </View>

            <View style={styles.folder}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setActiveTab(1)}
                  style={[
                    styles.tab,
                    activeTab === 1 ? styles.activeTab : null,
                  ]}
                >
                  <Text lightColor={Colors[colorScheme].text}>Beskrivning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab(2)}
                  style={[
                    styles.tab,
                    activeTab === 2 ? styles.activeTab : null,
                    { marginLeft: 10, marginRight: 10 },
                  ]}
                >
                  <Text lightColor={Colors[colorScheme].text}>Fakta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab(3)}
                  style={[
                    styles.tab,
                    activeTab === 3 ? styles.activeTab : null,
                  ]}
                >
                  <Text lightColor={Colors[colorScheme].text}>Recensioner</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.folderContent}>{renderFolderContent()}</View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  } else {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
}

export default ProductDetailScreen;
