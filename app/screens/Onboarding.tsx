import Leaves from "../../assets/leaves1.svg";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useAuth } from "../contexts/AuthContext";
import { completeOnboarding } from "../api/firebase";

const { width, height } = Dimensions.get("window");

interface SwipeInfo {
  header: string;
  description: string;
}
const items: SwipeInfo[] = [
  {
    header: "Welcome to Accountable",
    description:
      "The app that helps you make better food choices for the climate",
  },
  {
    header: "Did you know?",
    description:
      "10% of the greenhouse gases heating the atmosphere come from the foods we eat. Especially beef.",
  },
  {
    header: "Cows are the key",
    description:
      "Factory farmed cows emit methane, a greenhouse gas 100x more powerful than CO2. But its effects don’t last long.",
  },

  {
    header: "A cooler future",
    description:
      "So reducing or eliminating red meats from your diet can help us keep warming under the Paris Agreement’s 1.5C limit. Use Accountable to get there!",
  },
];

const Onboarding = ({ navigation }) => {
  const { user } = useAuth();
  if (!user) {
    return navigation.navigate("Login");
  }
  if (user.onboarded) {
    navigation.navigate("TabNavigator");
  }

  const scrollRef = React.useRef(null);

  const continuePressed = () => {
    const currentIndex = scrollRef.current.getCurrentIndex();
    if (currentIndex >= items.length - 1) {
      completedOnboarding();
    } else {
      scrollRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    }
  };

  const completedOnboarding = async () => {
    completeOnboarding(user.id);
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.fullScreenView, styles.backgroundImage]}>
        <Leaves></Leaves>
      </View>
      <View style={styles.fullScreenView}>
        <SafeAreaView style={styles.foreground}>
          <View
            style={{
              width: "100%",
              flexDirection: "row-reverse",
              marginLeft: 48,
              marginBottom: 50,
            }}
          >
            <Button
              title="Skip"
              onPress={() => {
                completedOnboarding();
              }}
            />
          </View>
          <SwiperFlatList
            style={styles.swiper}
            data={items}
            renderItem={({ item }) => (
              <View style={styles.swipePanel}>
                <Text
                  style={{
                    marginHorizontal: 24,
                    fontSize: 32,
                    marginBottom: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.header}
                </Text>
                <Text style={{ marginHorizontal: 24, fontSize: 16 }}>
                  {item.description}
                </Text>
              </View>
            )}
            showPagination
            ref={scrollRef}
          />
        </SafeAreaView>
        <View style={{ flexGrow: 1 }}></View>
        <TouchableOpacity style={styles.bottomButton} onPress={continuePressed}>
          <Text style={styles.bottomButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenView: {
    position: "absolute",
    width: width,
    height: height,
  },
  foreground: {
    alignItems: "center",
  },
  swiper: {
    height: 200,
    width: width,
  },
  swipePanel: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: width,
  },
  bottomButton: {
    backgroundColor: "#4CAF50", // Green background
    padding: 20,
    borderRadius: 30,
    marginBottom: 30,
    marginHorizontal: 24,
    alignItems: "center",
  },
  bottomButtonText: {
    fontSize: 18,
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 22,
  },
});

export default Onboarding;
