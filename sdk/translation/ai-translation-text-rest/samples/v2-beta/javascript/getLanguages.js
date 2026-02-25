// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get a list of supported languages
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");
require("dotenv/config");

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

async function main() {
  console.log("== List supported languages sample ==");

  const translationClient = TextTranslationClient(endpoint);
  const langResponse = await translationClient.path("/languages").get();

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

module.exports = { main };
