// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get a list of supported languages
 *
 * @summary gets a list of all supported languages
 */
import TextTranslationFactory, { GetLanguagesParameters, GetLanguagesResultOutput, MtErrorResponseOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

export async function main() {
  console.log("== List supported languages sample ==");

  const parameters: GetLanguagesParameters = {
    queryParameters: {
      scope: "translation"
    }
  };
  const translationClient = TextTranslationFactory(endpoint, undefined, undefined);
  const langResponse = await translationClient.path("/languages").get(parameters);

  if (langResponse.status !== "200") {
    const error = langResponse.body as MtErrorResponseOutput;
    throw error.error;
  }

  const languages = langResponse.body as GetLanguagesResultOutput;

  if (languages.translation) {
    console.log("Translated languages:");
    for (const key in languages.translation) {
      const translationLanguage = languages.translation[key];
      console.log(`${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`);
    }
  }

  if (languages.transliteration) {
    console.log("Transliteration languages:");
    for (const key in languages.transliteration) {
      const transliterationLanguage = languages.transliteration[key];
      console.log(`${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`);
    }
  }

  if (languages.dictionary) {
    console.log("Dictionary languages:");
    for (const key in languages.dictionary) {
      const dictionaryLanguage = languages.dictionary[key];
      console.log(`${key} -- name: ${dictionaryLanguage.name} (${dictionaryLanguage.nativeName}), supported target languages count: ${dictionaryLanguage.translations.length}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
});
