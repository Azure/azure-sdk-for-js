// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to perform translation with a LLM deployment.
 * By default, Azure Translator uses neural Machine Translation (NMT) technology. With the newest preview
 * release, you now can optionally select either the standard NMT translation or Large Language Model (LLM)
 * models — GPT-4o-mini or GPT-4o. You can choose a large language model for translation based on factors such
 * as quality, cost, and other considerations. However, using an LLM model requires you to have a [Microsoft
 * Foundry resource].
 *
 * https://learn.microsoft.com/azure/ai-services/translator/how-to/create-translator-resource?tabs=foundry
 *
 * To use an LLM model for translation, set the `deploymentName` property in the `TranslationTarget` object to the
 * name of your Foundry resource deployment, e.g., `gpt-4o-mini` or `gpt-4o`. You can also configure the tone and
 * gender of the translation by setting the `tone` and `gender` properties.
 */
import type { TranslateInputItem } from "@azure-rest/ai-translation-text";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint =
  process.env["TEXT_TRANSLATION_ENDPOINT"] || "https://api.cognitive.microsofttranslator.com";
const resourceId = process.env["TRANSLATOR_RESOURCE_ID"] || "<api key>";
const region = process.env["TRANSLATOR_REGION"] || "<region>";

export async function main(): Promise<void> {
  console.log("== Profanity handling sample ==");

  const translateCedential = {
    tokenCredential: new DefaultAzureCredential(),
    azureResourceId: resourceId,
    region,
  };
  const translationClient = TextTranslationClient(endpoint, translateCedential);

  const input: TranslateInputItem = {
    text: "Doctor is available next Monday. Do you want to schedule an appointment?",
    targets: [
      {
        language: "es",
        deploymentName: "gpt-4o-mini",
        tone: "formal",
        gender: "female",
      },
    ],
    language: "en",
  };
  const translateResponse = await translationClient.path("/translate").post({
    body: { inputs: [input] },
  });

  if (isUnexpected(translateResponse)) {
    throw translateResponse.body.error;
  }

  const translations = translateResponse.body.value;
  for (const translation of translations) {
    console.log(
      `Text was translated to: '${translation?.translations[0]?.language}' and the result is: '${translation?.translations[0]?.text}'.`,
    );
  }
}

main().catch((err) => {
  console.error(err);
});
