// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to you can ask translator service to include sentence boundaries
 * for the input text and the translated text.
 */
import TextTranslationClient, { ErrorResponseOutput, TranslatorCredential, InputTextItem, TranslateQueryParamProperties, TranslatedTextItemOutput, isUnexpected } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Translation with sentence boundaries sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationClient(endpoint, translateCedential, undefined);

  const inputText: InputTextItem[] = [
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
    const error = translateResponse.body as ErrorResponseOutput;
    throw error.error;
  }

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body;
  }

  const translations = translateResponse.body as TranslatedTextItemOutput[];
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
