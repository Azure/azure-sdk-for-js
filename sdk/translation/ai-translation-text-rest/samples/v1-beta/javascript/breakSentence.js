// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Get Sentence Boundaries sample ==");

  const translateCedential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "zhè shì gè cè shì。" }];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
    queryParameters: {
      language: "zh-Hans",
      script: "Latn",
    },
  });

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body.error;
  }

  const breakSentences = breakSentenceResponse.body;
  for (const breakSentence of breakSentences) {
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
