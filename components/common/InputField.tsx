import { colors } from "@/constants";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  variant?: "search";
}

export default function InputField({ variant, ...props }: Props) {
  return (
    <TextInput
      placeholderTextColor={colors.GRAY_500}
      style={[styles.input, variant && styles[`${variant}`]]}
      autoCapitalize="none"
      spellCheck={false}
      autoCorrect={false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  search: { paddingVertical: 8 },
});
