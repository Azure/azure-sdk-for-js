// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
 */
import TextTranslationFactory, { ErrorResponseOutput, TranslatorCredential, InputTextItem, BreakSentenceItemOutput, isUnexpected } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Sentence Boundaries with auto-detection sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextItem[] = [
    { text: "How are you? I am fine. What did you do today?" }
  ];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText
  })

  if (breakSentenceResponse.status !== "200") {
    const error = breakSentenceResponse.body as ErrorResponseOutput;
    throw error.error;
  }

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body;
  }

  const breakSentences = breakSentenceResponse.body as BreakSentenceItemOutput[];
  for (const key in breakSentences) {
    const breakSentence = breakSentences[key];
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
    console.log(`Detected languages of the input text: ${breakSentence?.detectedLanguage?.language} with score: ${breakSentence?.detectedLanguage?.score}.`);
  }

}

main().catch((err) => {
  console.error(err);
});
