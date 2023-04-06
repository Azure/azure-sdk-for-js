// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { TranslatorCredential, isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Get Sentence Boundaries sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationClient(endpoint, translateCedential, undefined);

  const inputText = [{ text: "zhè shì gè cè shì。" }];
  const parameters = {
    language: "zh-Hans",
    script: "Latn",
  };
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
    queryParameters: parameters,
  });

  if (breakSentenceResponse.status !== "200") {
    const error = breakSentenceResponse.body;
    throw error.error;
  }

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body;
  }

  const breakSentences = breakSentenceResponse.body;
  for (const key in breakSentences) {
    const breakSentence = breakSentences[key];
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
