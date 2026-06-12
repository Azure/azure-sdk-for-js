// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to change the profanity handling during translate call.
 * Normally the Translator service will retain profanity that is present in the source
 * in the translation. The degree of profanity and the context that makes words profane
 * differ between cultures, and as a result the degree of profanity in the target language
 * may be amplified or reduced.
 *
 * If you want to avoid getting profanity in the translation, regardless of the presence
 * of profanity in the source text, you can use the profanity filtering option. The option
 * allows you to choose whether you want to see profanity deleted, whether you want to mark
 * profanities with appropriate tags (giving you the option to add your own post-processing),
 * or you want no action taken. The accepted values of `ProfanityAction` are `Deleted`, `Marked`
 * and `NoAction` (default).
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
  console.log("== Profanity handling sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const input = {
    text: "This is ***.",
    targets: [
      {
        language: "cs",
        profanityAction: "Marked",
        profanityMarker: "Asterisk",
      },
    ],
    language: "en",
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
