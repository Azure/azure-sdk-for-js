// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
 */
import TextTranslationFactory, { ErrorResponseOutput, TranslatorCredential, InputTextItem, FindSentenceBoundariesQueryParamProperties, BreakSentenceItemOutput } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Get Sentence Boundaries sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextItem[] = [
    { text: "zhè shì gè cè shì。" }
  ];
  const parameters: FindSentenceBoundariesQueryParamProperties & Record<string, unknown> = {
    language: "zh-Hans",
    script: "Latn"
  };
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
    queryParameters: parameters
  })

  if (breakSentenceResponse.status !== "200") {
    const error = breakSentenceResponse.body as ErrorResponseOutput;
    throw error.error;
  }

  const breakSentences = breakSentenceResponse.body as BreakSentenceItemOutput[];
  for (const key in breakSentences) {
    const breakSentence = breakSentences[key];
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
  }

}

main().catch((err) => {
  console.error(err);
});
