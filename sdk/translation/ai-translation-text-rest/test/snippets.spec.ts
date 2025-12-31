// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import TextTranslationClient, { isUnexpected, TranslatorCredential } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TranslatorCredential", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
  });

  it("ReadmeSampleGetSupportedLanguages", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const langResponse = await translationClient.path("/languages").get();
    // @ts-preserve-whitespace
    if (isUnexpected(langResponse)) {
      throw langResponse.body.error;
    }
    // @ts-preserve-whitespace
    const languages = langResponse.body;
    // @ts-preserve-whitespace
    if (languages.translation) {
      console.log("Translated languages:");
      for (const [key, translationLanguage] of Object.entries(languages.translation)) {
        console.log(
          `${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`,
        );
      }
    }
    // @ts-preserve-whitespace
    if (languages.transliteration) {
      console.log("Transliteration languages:");
      for (const [key, transliterationLanguage] of Object.entries(languages.transliteration)) {
        console.log(
          `${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`,
        );
      }
    }
    // @ts-preserve-whitespace
    if (languages.models) {
      console.log("Available LLM Models:");
      for (const model in languages.models) {
        console.log(model);
      }
    }
  });

  it("ReadmeSampleTranslate", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
      language: "en",
    };
    const translateResponse = await translationClient.path("/translate").post({
      body: { inputs: [input] },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(translateResponse)) {
      throw translateResponse.body.error;
    }
    // @ts-preserve-whitespace
    const translations = translateResponse.body.value;
    for (const translation of translations) {
      console.log(
        `Text was translated to: '${translation?.translations[0]?.language}' and the result is: '${translation?.translations[0]?.text}'.`,
      );
    }
  });

  it("ReadmeSampleTransliterate", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const inputText = [{ text: "这是个测试。" }];
    const parameters = {
      language: "zh-Hans",
      fromScript: "Hans",
      toScript: "Latn",
    };
    const transliterateResponse = await translationClient.path("/transliterate").post({
      body: { inputs: inputText },
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(transliterateResponse)) {
      throw transliterateResponse.body.error;
    }
    // @ts-preserve-whitespace
    const transliterations = transliterateResponse.body.value;
    for (const transliteration of transliterations) {
      console.log(
        `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`,
      );
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
