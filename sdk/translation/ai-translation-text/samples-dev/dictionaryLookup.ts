// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get equivalent words for the source term in the target language.
 */
import TextTranslationFactory, { ErrorResponseOutput, TranslatorCredential, InputTextItem, LookupDictionaryEntriesQueryParamProperties, DictionaryLookupItemOutput, isUnexpected } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Dictionary Lookup sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextItem[] = [
    { text: "fly" }
  ];
  const parameters: LookupDictionaryEntriesQueryParamProperties & Record<string, unknown> = {
    to: "es",
    from: "en"
  };
  const dictionaryResponse = await translationClient.path("/dictionary/lookup").post({
    body: inputText,
    queryParameters: parameters
  })

  if (dictionaryResponse.status !== "200") {
    const error = dictionaryResponse.body as ErrorResponseOutput;
    throw error.error;
  }

  if (isUnexpected(dictionaryResponse)) {
    throw dictionaryResponse.body;
  }

  const dictionaryEntries = dictionaryResponse.body as DictionaryLookupItemOutput[];
  for (const key in dictionaryEntries) {
    const dictionaryEntry = dictionaryEntries[key];
    console.log(`For the given input ${dictionaryEntry?.translations?.length} entries were found in the dictionary.`);
    console.log(`First entry: '${dictionaryEntry?.translations[0]?.displayTarget}', confidence: ${dictionaryEntry?.translations[0]?.confidence}.`);
  }

}

main().catch((err) => {
  console.error(err);
});
