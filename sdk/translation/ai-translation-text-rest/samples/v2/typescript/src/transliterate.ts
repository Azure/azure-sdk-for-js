// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to convert characters or letters of a source language to the corresponding
 * characters or letters of a target language.
 */
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const resourceId = process.env["TRANSLATOR_RESOURCE_ID"] || "<api key>";
const region = process.env["TRANSLATOR_REGION"] || "<region>";

export async function main(): Promise<void> {
  console.log("== Simple transliterate sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText = [{ text: "这是个测试。" }];
  const transliterateResponse = await translationClient.path("/transliterate").post({
    body: { inputs: inputText },
    queryParameters: {
      language: "zh-Hans",
      fromScript: "Hans",
      toScript: "Latn",
    },
  });

  if (isUnexpected(transliterateResponse)) {
    throw transliterateResponse.body.error;
  }

  const transliterations = transliterateResponse.body.value;
  for (const transliteration of transliterations) {
    console.log(
      `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
