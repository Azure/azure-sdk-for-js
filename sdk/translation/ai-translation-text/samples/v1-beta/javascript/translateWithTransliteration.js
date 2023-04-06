// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary You can combine both Translation and Transliteration in one Translate call.
 * Your source Text can be in non-standard Script of a language as well as you
 * can ask for non-standard Script of a target language.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { TranslatorCredential, isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Translate with transliteration sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationClient(endpoint, translateCedential, undefined);

  const inputText = [{ text: "hudha akhtabar." }];
  const parameters = {
    to: "zh-Hans",
    toScript: "Latn",
    from: "ar",
    fromScript: "Latn",
  };
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: parameters,
  });

  if (translateResponse.status !== "200") {
    const error = translateResponse.body;
    throw error.error;
  }

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body;
  }

  const translations = translateResponse.body;
  for (const key in translations) {
    const translation = translations[key];

    console.log(`Source Text: ${translation.sourceText?.text}`);
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`
    );
    console.log(
      `Transliterated text (${translation?.translations[0]?.transliteration?.script}): ${translation?.translations[0]?.transliteration?.text}`
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
