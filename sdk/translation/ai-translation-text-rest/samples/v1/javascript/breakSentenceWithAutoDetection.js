// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get sentences' boundaries.
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
  console.log("== Sentence Boundaries with auto-detection sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "How are you? I am fine. What did you do today?" }];
  const breakSentenceResponse = await translationClient.path("/breaksentence").post({
    body: inputText,
  });

  if (isUnexpected(breakSentenceResponse)) {
    throw breakSentenceResponse.body.error;
  }

  const breakSentences = breakSentenceResponse.body;
  for (const breakSentence of breakSentences) {
    console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
    console.log(
      `Detected languages of the input text: ${breakSentence?.detectedLanguage?.language} with score: ${breakSentence?.detectedLanguage?.score}.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
