// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can select whether the translated text is plain text or HTML text.
 * Any HTML needs to be a well-formed, complete element. Possible values are: plain (default) or html.
 */
const TextTranslationFactory = require("@azure-rest/ai-translation-text").default,
  { TranslatorCredential } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== HTML translation sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText = [{ text: "<html><body>This <b>is</b> a test.</body></html>" }];
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
