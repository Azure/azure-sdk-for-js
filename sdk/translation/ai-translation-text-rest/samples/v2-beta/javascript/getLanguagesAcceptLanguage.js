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
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");
require("dotenv/config");

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";

async function main() {
  console.log("== List supported localized languages sample ==");

  const parameters = {
    headers: {
      "Accept-Language": "cs",
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

module.exports = { main };
