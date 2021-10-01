import {
  AnalyzeSentimentResult,
  AnalyzeSentimentResultArray,
  AnalyzeSentimentSuccessResult,
  DocumentSentimentLabel,
} from "@azure/ai-text-analytics";
import React, { FC, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { analyzeSentiment } from "../apis/textAnalytics";

export interface SentimentScreenProps {
  style?: StyleProp<ViewStyle>;
}

export const SentimentScreen: FC<SentimentScreenProps> = ({ style }) => {
  const [sentiments, setSetiments] = useState<
    AnalyzeSentimentResultArray | undefined
  >();

  const [textState, setTextState] = useState("");

  return (
    <View style={style}>
      <FlatList
        data={sentiments}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => <SentimentItem sentiment={item} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Text Sentiment Analyzer</Text>
            <Text style={styles.label}>Text to analyze:</Text>
            <View style={styles.textInputView}>
              <TextInput
                multiline={true}
                onChangeText={(text) => {
                  setTextState(text ?? "");
                }}
                placeholder="Enter text to analyze"
                value={textState}
              />
            </View>
            <Button
              title="Analyze"
              onPress={() => {
                const documents = textState.split("\n").filter((t) => t.length);
                if (!documents.length) {
                  return setSetiments(undefined);
                }
                analyzeSentiment(documents)
                  .then((results) => {
                    setSetiments(results);
                  })
                  .catch((err) => {
                    Alert.alert(
                      "Error retrieving sentiments",
                      `${err?.details?.error?.message ?? err?.message ?? ""}\n${
                        err?.details?.error?.innererror?.message ?? ""
                      }`
                    );
                    setSetiments(undefined);
                  });
              }}
            />
          </View>
        }
      ></FlatList>
    </View>
  );
};

const SentimentItem: FC<{ sentiment: AnalyzeSentimentResult }> = ({
  sentiment,
}) => {
  const s = sentiment as AnalyzeSentimentSuccessResult;
  return (
    <>
      <View style={styles.divider} />
      <View style={styles.sentimentRow}>
        <Text style={styles.sentence}>
          {s.sentences.map((sentence) => sentence.text).join(" ")}
        </Text>
        <Text
          style={{
            color: getColorForSentiment(s.sentiment),
            fontSize: 18,
            fontWeight: "400",
            paddingLeft: 16,
          }}
        >
          {s.sentiment}
          <Text style={{ color: "black", fontSize: 10 }}>
            {" ( "}
            <Text style={{ color: "red" }}>
              {s.confidenceScores.negative.toFixed(2)}
            </Text>
            {", "}
            <Text style={{ color: "blue" }}>
              {s.confidenceScores.neutral.toFixed(2)}
            </Text>
            {", "}
            <Text style={{ color: "green" }}>
              {s.confidenceScores.positive.toFixed(2)}
            </Text>
            {" )"}
          </Text>
        </Text>
      </View>
    </>
  );
};

function getColorForSentiment(sentiment: DocumentSentimentLabel): string {
  switch (sentiment) {
    case "negative":
      return "red";
    case "positive":
      return "green";
    default:
      return "blue";
  }
}

const styles = StyleSheet.create({
  textInputView: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
    padding: 4,
  },
  divider: {
    backgroundColor: "#dae1e7",
    height: 1,
  },
  label: {
    color: "black",
    fontWeight: "500",
  },
  sentence: {
    color: "black",
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 16,
  },
  sentimentRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
