// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can select the language to use for user interface strings.
 * Some of the fields in the response are names of languages or names of regions.
 * Use this parameter to define the language in which these names are returned.
 * The language is specified by providing a well-formed BCP 47 language tag.
 * For instance, use the value `fr` to request names in French or use the value `zh-Hant`
 * to request names in Chinese Traditional.
 *
 * Names are provided in the English language when a target language is not specified
 * or when localization is not available.
 */
import TextTranslationClient, {
  GetLanguagesParameters,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

export async function main() {
  console.log("== List supported localized languages sample ==");

  const parameters: GetLanguagesParameters = {
    headers: {
      "Accept-Language": "cs",
    },
  };
  const translationClient = TextTranslationClient(endpoint, undefined, undefined);
  const langResponse = await translationClient.path("/languages").get(parameters);

  if (isUnexpected(langResponse)) {
    throw langResponse.body.error;
  }

  const languages = langResponse.body;

  if (languages.translation) {
    console.log("Translated languages:");
    for (const key in languages.translation) {
      const translationLanguage = languages.translation[key];
      console.log(
        `${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`
      );
    }
  }

  if (languages.transliteration) {
    console.log("Transliteration languages:");
    for (const key in languages.transliteration) {
      const transliterationLanguage = languages.transliteration[key];
      console.log(
        `${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`
      );
    }
  }

  if (languages.dictionary) {
    console.log("Dictionary languages:");
    for (const key in languages.dictionary) {
      const dictionaryLanguage = languages.dictionary[key];
      console.log(
        `${key} -- name: ${dictionaryLanguage.name} (${dictionaryLanguage.nativeName}), supported target languages count: ${dictionaryLanguage.translations.length}`
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
});
