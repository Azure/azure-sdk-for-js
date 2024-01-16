// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to you can ask translator service to include sentence boundaries
 * for the input text and the translated text.
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
  console.log("== Translation with sentence boundaries sample ==");

  const translateCedential: TranslatorCredential = {
    key: apiKey,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [
    { text: "The answer lies in machine translation. This is a test." },
  ];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",

      includeSentenceLength: true,
    },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log(
      `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
    console.log(
      `Source Sentece length: ${translation?.translations[0]?.sentLen?.srcSentLen.join(", ")}`,
    );
    console.log(
      `Translated Sentece length: ${translation?.translations[0]?.sentLen?.transSentLen.join(
        ", ",
      )}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
