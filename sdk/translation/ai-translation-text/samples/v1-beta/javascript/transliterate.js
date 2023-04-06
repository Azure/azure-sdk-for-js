// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to convert characters or letters of a source language to the corresponding
 * characters or letters of a target language.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { TranslatorCredential, isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Simple transliterate sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationClient(endpoint, translateCedential, undefined);

  const inputText = [{ text: "这是个测试。" }];
  const parameters = {
    language: "zh-Hans",
    fromScript: "Hans",
    toScript: "Latn",
  };
  const transliterateResponse = await translationClient.path("/transliterate").post({
    body: inputText,
    queryParameters: parameters,
  });

  if (transliterateResponse.status !== "200") {
    const error = transliterateResponse.body;
    throw error.error;
  }

  if (isUnexpected(transliterateResponse)) {
    throw transliterateResponse.body;
  }

  const translations = transliterateResponse.body;
  for (const key in translations) {
    const transliteration = translations[key];
    console.log(
      `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
