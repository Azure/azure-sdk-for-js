// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to change the profanity handling during translate call.
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
 *
 * @summary Profanity handling
 */
import TextTranslationFactory, { MtErrorResponseOutput, TranslatorCredential, InputTextElement, TranslateQueryParamProperties, TranslateParameters, TranslatedTextElementOutput } from "@azure-rest/azure-ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Profanity handling sample ==");

  const translateCedential = new TranslatorCredential(apiKey, region);
  const translationClient = TextTranslationFactory(endpoint, translateCedential, undefined);

  const inputText: InputTextElement[] = [
    { text: "This is ***." }
  ];
  const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
    to: "cs",
    from: "en",
    profanityAction: "Marked",
    profanityMarker: "Asterisk"
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
  }

}

main().catch((err) => {
  console.error(err);
});
