// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to convert characters or letters of a source language to the corresponding
 * characters or letters of a target language.
 *
 * @summary simple transliterate call
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, TransliterateQueryParamProperties, TransliteratedTextOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Simple transliterate sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "这是个测试。" }
  ];
  const parameters: TransliterateQueryParamProperties & Record<string, unknown> = {
    language: "zh-Hans",
    fromScript: "Hans",
    toScript: "Latn"
  };
  const transliterateResponse = await translationClient.path("/transliterate").post({
    body: inputText,
    queryParameters: parameters
  })

  if (transliterateResponse.status !== "200") {
    const error = transliterateResponse.body as MtErrorResponseOutput;
    throw error.error;
  }

  const translations = transliterateResponse.body as TransliteratedTextOutput[];
  for (const key in translations) {
    const transliteration = translations[key];
    console.log(`Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`);
  }

}

main().catch((err) => {
  console.error(err);
});
