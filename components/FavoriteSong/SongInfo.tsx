import { colors } from "@/constants";
import { FavoriteSong } from "@/store/favoriteSongs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextStyle, View } from "react-native";

import { StyleProp } from "react-native";

const InfoRow = ({
  icon,
  label,
  labelStyle,
}: {
  icon: React.ReactNode;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}) => {
  return (
    <View style={styles.infoRowContainer}>
      {icon}
      <Text style={[{ fontSize: 22 }, labelStyle]}>{label}</Text>
    </View>
  );
};

export default function SongInfo({ song }: { song: FavoriteSong }) {
  return (
    <View>
      <InfoRow
        icon={<AntDesign name="profile" size={20} color={colors.ORANGE_600} />}
        label={song.number}
        labelStyle={{ color: colors.ORANGE_600, fontWeight: "bold" }}
      />
      <InfoRow
        icon={
          <Ionicons name="musical-notes" size={22} color={colors.ORANGE_600} />
        }
        label={song.title}
        labelStyle={{ color: colors.BLACK, fontWeight: "bold" }}
      />
      <InfoRow
        icon={<Ionicons name="person" size={22} color={colors.ORANGE_600} />}
        label={song.singer}
        labelStyle={{ color: colors.BLACK }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  infoRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 4,
  },
});
