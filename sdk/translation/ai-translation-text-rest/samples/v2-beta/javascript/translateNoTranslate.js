// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how it's sometimes useful to exclude specific content from translation.
 * You can use the attribute class=notranslate to specify content that should remain
 * in its original language. In the following example, the content inside the first div
 * element won't be translated, while the content in the second div element will be translated.
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
  console.log("== Marking text input with notranslate div sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const input = {
    text: '<div class="notranslate">This will not be translated.</div><div>This will be translated.</div>',
    language: "en",
    targets: [{ language: "cs" }],
    textType: "html",
  };
  const translateResponse = await translationClient.path("/translate").post({
    body: { inputs: [input] },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body.value;
  for (const translation of translations) {
    console.log(
      `Text was translated to: '${translation?.translations[0]?.language}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
