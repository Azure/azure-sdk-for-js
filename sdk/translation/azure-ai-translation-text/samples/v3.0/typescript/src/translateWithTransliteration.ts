// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * You can combine both Translation and Transliteration in one Translate call.
 * Your source Text can be in non-standard Script of a language as well as you
 * can ask for non-standard Script of a target language.
 *
 * @summary translate text with transliteration
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, TranslateQueryParamProperties, TranslateParameters, TranslatedTextElementOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Translate with transliteration sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "hudha akhtabar." }
  ];
  const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
    to: "zh-Hans",
    toScript: "Latn",
    from: "ar",
    fromScript: "Latn"
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

    console.log(`Source Text: ${translation.sourceText?.text}`);
    console.log(`Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`);
    console.log(`Transliterated text (${translation?.translations[0]?.transliteration?.script}): ${translation?.translations[0]?.transliteration?.text}`);
  }
}

main().catch((err) => {
  console.error(err);
});
