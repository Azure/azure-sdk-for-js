// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how You can get translations from a customized system built with
 * Custom Translator (https://learn.microsoft.com/azure/cognitive-services/translator/customization). Add the Category ID from your Custom Translator [project details](https://learn.microsoft.com/azure/cognitive-services/translator/custom-translator/how-to-create-project#view-project-details)
 * to this parameter to use your deployed customized system.
 *
 * It is possible to set `allowFalback` paramter. It specifies that the service is allowed to
 * fall back to a general system when a custom system doesn't exist. Possible values are:
 * `true` (default) or `false`.
 *
 * `allowFallback=false` specifies that the translation should only use systems trained for
 * the category specified by the request. If a translation for language X to language Y requires
 * chaining through a pivot language E, then all the systems in the chain (X → E and E → Y)
 * will need to be custom and have the same category. If no system is found with the specific
 * category, the request will return a 400 status code. `allowFallback=true` specifies that
 * the service is allowed to fall back to a general system when a custom system doesn't exist.
 */
import TextTranslationClient, {
  TranslatorCredential,
  InputTextItem,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env["TEXT_TRANSLATOR_API_KEY"] || "<api key>";
const region = process.env["TEXT_TRANSLATOR_REGION"] || "<region>";

export async function main() {
  console.log("== Custom translator sample ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "This is a test." }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",
      category: "<<CUSTOM CATEGORY ID>>",
  }});

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
