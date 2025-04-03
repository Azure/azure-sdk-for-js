// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how you can select whether the translated text is plain text or HTML text.
 * Any HTML needs to be a well-formed, complete element. Possible values are: plain (default) or html.
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
  console.log("== HTML translation sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const inputText: InputTextItem[] = [{ text: "<html><body>This <b>is</b> a test.</body></html>" }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "cs",
      from: "en",
      textType: "html",
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
  }
}

main().catch((err) => {
  console.error(err);
});
