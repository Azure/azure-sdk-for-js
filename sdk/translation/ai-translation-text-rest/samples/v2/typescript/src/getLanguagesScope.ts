// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get a list of supported languages for a selected scope
 */
import type { GetSupportedLanguagesParameters } from "@azure-rest/ai-translation-text";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import "dotenv/config";

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

export async function main(): Promise<void> {
  console.log("== Scoped list supported languages sample ==");

  const parameters: GetSupportedLanguagesParameters = {
    queryParameters: {
      scope: "translation",
    },
  };
  const translationClient = TextTranslationClient(endpoint);
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
        `${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`,
      );
    }
  }

  if (languages.transliteration) {
    console.log("Transliteration languages:");
    for (const key in languages.transliteration) {
      const transliterationLanguage = languages.transliteration[key];
      console.log(
        `${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`,
      );
    }
  }

  if (languages.models) {
    console.log("Available LLM Models:");
    for (const model in languages.models) {
      console.log(model);
    }
  }
}

main().catch((err) => {
  console.error(err);
});
