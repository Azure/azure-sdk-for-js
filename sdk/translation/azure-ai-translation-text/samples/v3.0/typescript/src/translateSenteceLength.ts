// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to make a simple call to the Azure Text Translator
 * service to get translation for a text which language is know to a target language.
 *
 * @summary simple translate text
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, TranslateQueryParamProperties, TranslateParameters, TranslatedTextElementOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Simple translate sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "The answer lies in machine translation. This is a test." }
  ];
  const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
    to: "cs",
    from: "en",

    includeSentenceLength: true
  };
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: parameters
  })

  if (translateResponse.status !== "200") {
    const error = translateResponse.body as MtErrorResponseOutput;
    throw error.error;
  }

  const translations = translateResponse.body as TranslatedTextElementOutput[];
  for (const key in translations) {
    const translation = translations[key];
    console.log(`Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`);
    console.log(`Source Sentece length: ${translation?.translations[0]?.sentLen?.srcSentLen.join(", ")}`);
    console.log(`Translated Sentece length: ${translation?.translations[0]?.sentLen?.transSentLen.join(", ")}`);
  }

}

main().catch((err) => {
  console.error(err);
});
