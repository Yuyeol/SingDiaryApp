import { colors } from "@/constants";
import { Entypo } from "@expo/vector-icons";
import { Fragment } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SongMemo({
  vocalGender,
  vocalKey,
  memo,
}: {
  vocalGender: string;
  vocalKey: string;
  memo: string;
}) {
  return (
    <Fragment>
      <Text style={styles.title}>메모</Text>
      {vocalGender && vocalKey && (
        <View style={styles.memoKeyContainer}>
          <Entypo name="sound-mix" size={16} color={colors.ORANGE_600} />
          <Text style={styles.memoKeyLabel}>Key:</Text>
          <Text style={styles.memoKey}>
            {vocalGender}{" "}
            {+vocalKey > 0 ? `♯${vocalKey}` : `♭${vocalKey.slice(1)}`}
          </Text>
        </View>
      )}
      {memo && (
        <ScrollView style={styles.memoTextContainer}>
          <Text style={styles.memoText}>{memo}</Text>
        </ScrollView>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },

  memoKeyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memoKeyLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginLeft: 2,
    marginRight: 4,
  },
  memoKey: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  memoTextContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
  },
  memoText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
