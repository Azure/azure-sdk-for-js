// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get grammatical structure and context examples for the source term and target term pair.
 */
import TextTranslationFactory, { ErrorResponseOutput, TranslatorCredential, DictionaryExampleTextItem, LookupDictionaryExamplesQueryParamProperties, DictionaryExampleItemOutput } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Dictionary Examples sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: DictionaryExampleTextItem[] = [
    { text: "fly", translation: "volar" }
  ];
  const parameters: LookupDictionaryExamplesQueryParamProperties & Record<string, unknown> = {
    to: "es",
    from: "en"
  };
  const dictionaryResponse = await translationClient.path("/dictionary/examples").post({
    body: inputText,
    queryParameters: parameters
  })

  if (dictionaryResponse.status !== "200") {
    const error = dictionaryResponse.body as ErrorResponseOutput;
    throw error.error;
  }

  const dictionaryExamples = dictionaryResponse.body as DictionaryExampleItemOutput[];
  for (const key in dictionaryExamples) {
    const dictionaryExample = dictionaryExamples[key];
    console.log(`For the given input ${dictionaryExample?.examples?.length} examples were found in the dictionary.`);
    const firstExample = dictionaryExample?.examples[0];
    console.log(`Example: '${firstExample.targetPrefix + firstExample.targetTerm + firstExample.targetSuffix}'.`);
  }

}

main().catch((err) => {
  console.error(err);
});
