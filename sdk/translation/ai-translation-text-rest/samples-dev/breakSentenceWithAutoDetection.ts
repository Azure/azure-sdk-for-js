// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
 */
import TextTranslationClient, {
  TranslatorCredential,
  InputTextItem,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Sentence Boundaries with auto-detection sample ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "How are you? I am fine. What did you do today?" }];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
  });

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body.error;
  }

  const breakSentences = breakSentenceResponse.body;
  for (const breakSentence of breakSentences) {
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
    console.log(
      `Detected languages of the input text: ${breakSentence?.detectedLanguage?.language} with score: ${breakSentence?.detectedLanguage?.score}.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
