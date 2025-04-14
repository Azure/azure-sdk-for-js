// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary You can combine both Translation and Transliteration in one Translate call.
 * Your source Text can be in non-standard Script of a language as well as you
 * can ask for non-standard Script of a target language.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const resourceId = process.env["TRANSLATOR_RESOURCE_ID"] || "<api key>";
const region = process.env["TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Translate with transliteration sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "hudha akhtabar." }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "zh-Hans",
      toScript: "Latn",
      from: "ar",
      fromScript: "Latn",
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log(`Source Text: ${translation.sourceText?.text}`);
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
    console.log(
      `Transliterated text (${translation?.translations[0]?.transliteration?.script}): ${translation?.translations[0]?.transliteration?.text}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
