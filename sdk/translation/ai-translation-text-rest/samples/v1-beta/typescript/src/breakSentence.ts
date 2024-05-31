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
  console.log("== Get Sentence Boundaries sample ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "zhè shì gè cè shì。" }];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
    queryParameters: {
      language: "zh-Hans",
      script: "Latn",
  }});

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body.error;
  }

  const breakSentences = breakSentenceResponse.body;
  for (const breakSentence of breakSentences) {
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
  }
}

main().catch((err) => {
  console.error(err);
});
