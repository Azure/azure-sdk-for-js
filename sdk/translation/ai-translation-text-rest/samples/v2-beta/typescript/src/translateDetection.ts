// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get translation without specifying the source language to a target language.
 */
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const resourceId = process.env["TRANSLATOR_RESOURCE_ID"] || "<api key>";
const region = process.env["TRANSLATOR_REGION"] || "<region>";

export async function main(): Promise<void> {
  console.log("== Translate sample with auto-detection ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const input = {
    text: "This is a test.",
    targets: [{ language: "cs" }],
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
      `Detected languages of the input text: ${translation?.detectedLanguage?.language} with score: ${translation?.detectedLanguage?.score}.`,
    );
    console.log(
      `Text was translated to: '${translation?.translations[0]?.language}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
