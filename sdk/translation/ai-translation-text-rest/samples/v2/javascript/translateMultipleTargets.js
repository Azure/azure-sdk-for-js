// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can provide multiple target languages which results
 * to each input element be translated to all target languages.
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
  console.log("== Multiple target languages translation ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const input = {
    text: "This is a test.",
    targets: [{ language: "cs" }, { language: "es" }, { language: "de" }],
    language: "en",
  };
  const translateResponse = await translationClient.path("/translate").post({
    body: { inputs: [input] },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body.value;
  for (const translation of translations) {
    for (const textKey in translation.translations) {
      console.log(
        `Text was translated to: '${translation?.translations[textKey]?.language}' and the result is: '${translation?.translations[textKey]?.text}'.`,
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
