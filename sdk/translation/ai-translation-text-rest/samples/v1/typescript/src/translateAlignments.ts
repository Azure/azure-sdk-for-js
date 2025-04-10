// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can ask translation service to include alignment
 * projection from source text to translated text.
 */
import type { InputTextItem } from "@azure-rest/ai-translation-text";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const resourceId = process.env["TRANSLATOR_RESOURCE_ID"] || "<api key>";
const region = process.env["TRANSLATOR_REGION"] || "<region>";

export async function main(): Promise<void> {
  console.log("== Translation with alignments sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "The answer lies in machine translation." }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",

      includeAlignment: true,
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
    console.log(`Alignments: ${translation?.translations[0]?.alignment?.proj}`);
  }
}

main().catch((err) => {
  console.error(err);
});
