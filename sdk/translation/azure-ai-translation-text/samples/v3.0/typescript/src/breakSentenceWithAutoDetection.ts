// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get sentences' boundaries.
 *
 * @summary Get Sentence Boundaries with auto-detection
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, BreakSentenceQueryParamProperties, BreakSentenceElementOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Sentence Boundaries with auto-detection sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "How are you? I am fine. What did you do today?" }
  ];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText
  })

  if (breakSentenceResponse.status !== "200") {
    const error = breakSentenceResponse.body as MtErrorResponseOutput;
    throw error.error;
  }

  const breakSentences = breakSentenceResponse.body as BreakSentenceElementOutput[];
  for (const key in breakSentences) {
    const breakSentence = breakSentences[key];
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
    console.log(`Detected languages of the input text: ${breakSentence?.detectedLanguage?.language} with score: ${breakSentence?.detectedLanguage?.score}.`);
  }

}

main().catch((err) => {
  console.error(err);
});
