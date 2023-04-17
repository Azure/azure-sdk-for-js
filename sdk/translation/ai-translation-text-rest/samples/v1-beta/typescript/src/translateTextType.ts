// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can select whether the translated text is plain text or HTML text.
 * Any HTML needs to be a well-formed, complete element. Possible values are: plain (default) or html.
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
  console.log("== HTML translation sample ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "<html><body>This <b>is</b> a test.</body></html>" }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",
      textType: "html",
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
