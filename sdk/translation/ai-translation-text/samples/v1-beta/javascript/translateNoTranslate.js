// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how it's sometimes useful to exclude specific content from translation.
 * You can use the attribute class=notranslate to specify content that should remain
 * in its original language. In the following example, the content inside the first div
 * element won't be translated, while the content in the second div element will be translated.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { TranslatorCredential, isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Marking text input with notranslate div sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationClient(endpoint, translateCedential, undefined);

  const inputText = [
    {
      text: '<div class="notranslate">This will not be translated.</div><div>This will be translated.</div>',
    },
  ];
  const parameters = {
    to: "cs",
    from: "en",
    textType: "html",
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
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
