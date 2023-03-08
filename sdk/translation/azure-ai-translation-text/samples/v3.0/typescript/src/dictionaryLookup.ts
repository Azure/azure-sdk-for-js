// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get translation for a text which language is know to a target language.
 *
 * @summary simple translate text
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, DictionaryLookupQueryParamProperties, DictionaryLookupElementOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Simple translate sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "fly" }
  ];
  const parameters: DictionaryLookupQueryParamProperties & Record<string, unknown> = {
    to: "es",
    from: "en"
  };
  const dictionaryResponse = await translationClient.path("/dictionary/lookup").post({
    body: inputText,
    queryParameters: parameters
  })

  if (dictionaryResponse.status !== "200") {
    const error = dictionaryResponse.body as MtErrorResponseOutput;
    throw error.error;
  }

  const dictionaryEntries = dictionaryResponse.body as DictionaryLookupElementOutput[];
  for (const key in dictionaryEntries) {
    const dictionaryEntry = dictionaryEntries[key];
    console.log(`For the given input ${dictionaryEntry?.translations?.length} entries were found in the dictionary.`);
    console.log(`First entry: '${dictionaryEntry?.translations[0]?.displayTarget}', confidence: ${dictionaryEntry?.translations[0]?.confidence}.`);
  }

}

main().catch((err) => {
  console.error(err);
});
