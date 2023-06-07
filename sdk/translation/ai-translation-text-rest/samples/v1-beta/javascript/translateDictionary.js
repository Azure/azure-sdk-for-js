// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to keep words if you already know the translation you want
 * to apply to a word or a phrase, you can supply it as markup within the request.
 * The dynamic dictionary is safe only for compound nouns like proper names and product names.
 *
 * Note You must include the From parameter in your API translation request instead of using the autodetect feature.
 */
const TextTranslationClient = require("@azure-rest/ai-translation-text").default,
  { isUnexpected } = require("@azure-rest/ai-translation-text");

require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

async function main() {
  console.log("== Translation with Dictionary sample ==");

  const translateCedential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [
    {
      text: 'The word <mstrans:dictionary translation="wordomatic">wordomatic</mstrans:dictionary> is a dictionary entry.',
    },
  ];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`
    );
  }
}

main().catch((err) => {
  console.error(err);
});

module.exports = { main };
