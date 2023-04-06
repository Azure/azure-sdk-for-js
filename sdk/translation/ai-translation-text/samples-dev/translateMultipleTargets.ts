// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can provide multiple target languages which results
 * to each input element be translated to all target languages.
 */
import TextTranslationFactory, { ErrorResponseOutput, TranslatorCredential, InputTextItem, TranslateQueryParamProperties, TranslatedTextItemOutput, isUnexpected } from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Multiple target languages translation ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextItem[] = [
    { text: "This is a test." }
  ];
  const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
    to: "cs,es,de",
    from: "en"
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

    for (const textKey in translation.translations) {
      console.log(`Text was translated to: '${translation?.translations[textKey]?.to}' and the result is: '${translation?.translations[textKey]?.text}'.`);
    }
  }
}

main().catch((err) => {
  console.error(err);
});
