// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to you can ask translator service to include sentence boundaries
 * for the input text and the translated text.
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
  console.log("== Translation with sentence boundaries sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "The answer lies in machine translation. This is a test." }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",

      includeSentenceLength: true,
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
    console.log(
      `Source Sentece length: ${translation?.translations[0]?.sentLen?.srcSentLen.join(", ")}`,
    );
    console.log(
      `Translated Sentece length: ${translation?.translations[0]?.sentLen?.transSentLen.join(", ")}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
