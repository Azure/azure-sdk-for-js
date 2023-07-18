// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator service to get equivalent words for the source term in the target language.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Dictionary Lookup sample ==");

  const translateCedential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "fly" }];
  const dictionaryResponse = await translationClient.path("/dictionary/lookup").post({
    body: inputText,
    queryParameters: {
      to: "es",
      from: "en",
    },
  });

  if (isUnexpected(dictionaryResponse)) {
    throw dictionaryResponse.body.error;
  }

  const dictionaryEntries = dictionaryResponse.body;
  for (const dictionaryEntry of dictionaryEntries) {
    console.log(
      `For the given input ${dictionaryEntry?.translations?.length} entries were found in the dictionary.`
    );
    console.log(
      `First entry: '${dictionaryEntry?.translations[0]?.displayTarget}', confidence: ${dictionaryEntry?.translations[0]?.confidence}.`
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
