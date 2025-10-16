import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

type PageProps = {
  children: ReactNode;
  title?: string;
  renderHeader?: ReactNode;
};

type PageHeaderProps = {
  title?: string;
  renderHeader?: ReactNode;
  colors: {
    text: string;
    background: string;
    [key: string]: string;
  };
};

function PageHeader({ title, renderHeader, colors }: PageHeaderProps) {
  if (title) {
    return <Text style={[styles.title, { color: colors.text }]}>{title}</Text>;
  } else if (renderHeader) {
    return <>{renderHeader}</>;
  }

  return null;
}

export default function Page({ children, title, renderHeader }: PageProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PageHeader title={title} renderHeader={renderHeader} colors={colors} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
