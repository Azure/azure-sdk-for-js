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
    if (languages.dictionary) {
      console.log("Dictionary languages:");
      for (const [key, dictionaryLanguage] of Object.entries(languages.dictionary)) {
        console.log(
          `${key} -- name: ${dictionaryLanguage.name} (${dictionaryLanguage.nativeName}), supported target languages count: ${dictionaryLanguage.translations.length}`,
        );
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
    const inputText = [{ text: "This is a test." }];
    const parameters = {
      to: "cs",
      from: "en",
    };
    const translateResponse = await translationClient.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(translateResponse)) {
      throw translateResponse.body.error;
    }
    // @ts-preserve-whitespace
    const translations = translateResponse.body;
    for (const translation of translations) {
      console.log(
        `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`,
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
      body: inputText,
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(transliterateResponse)) {
      throw transliterateResponse.body.error;
    }
    // @ts-preserve-whitespace
    const translations = transliterateResponse.body;
    for (const transliteration of translations) {
      console.log(
        `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`,
      );
    }
  });

  it("ReadmeSampleBreakSentence", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const inputText = [{ text: "zhè shì gè cè shì。" }];
    const parameters = {
      language: "zh-Hans",
      script: "Latn",
    };
    const breakSentenceResponse = await translationClient.path("/breaksentence").post({
      body: inputText,
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(breakSentenceResponse)) {
      throw breakSentenceResponse.body.error;
    }
    // @ts-preserve-whitespace
    const breakSentences = breakSentenceResponse.body;
    for (const breakSentence of breakSentences) {
      console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
    }
  });

  it("ReadmeSampleDictionaryLookup", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const inputText = [{ text: "fly" }];
    const parameters = {
      to: "es",
      from: "en",
    };
    const dictionaryResponse = await translationClient.path("/dictionary/lookup").post({
      body: inputText,
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(dictionaryResponse)) {
      throw dictionaryResponse.body.error;
    }
    // @ts-preserve-whitespace
    const dictionaryEntries = dictionaryResponse.body;
    for (const dictionaryEntry of dictionaryEntries) {
      console.log(
        `For the given input ${dictionaryEntry?.translations?.length} entries were found in the dictionary.`,
      );
      console.log(
        `First entry: '${dictionaryEntry?.translations[0]?.displayTarget}', confidence: ${dictionaryEntry?.translations[0]?.confidence}.`,
      );
    }
  });

  it("ReadmeSampleDictionaryExamples", async () => {
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const key = "YOUR_SUBSCRIPTION_KEY";
    const region = "westus";
    const credential: TranslatorCredential = {
      key,
      region,
    };
    const translationClient = TextTranslationClient(endpoint, credential);
    // @ts-preserve-whitespace
    const inputText = [{ text: "fly", translation: "volar" }];
    const parameters = {
      to: "es",
      from: "en",
    };
    const dictionaryResponse = await translationClient.path("/dictionary/examples").post({
      body: inputText,
      queryParameters: parameters,
    });
    // @ts-preserve-whitespace
    if (isUnexpected(dictionaryResponse)) {
      throw dictionaryResponse.body.error;
    }
    // @ts-preserve-whitespace
    const dictionaryExamples = dictionaryResponse.body;
    for (const dictionaryExample of dictionaryExamples) {
      console.log(
        `For the given input ${dictionaryExample?.examples?.length} examples were found in the dictionary.`,
      );
      const firstExample = dictionaryExample?.examples[0];
      console.log(
        `Example: '${firstExample.targetPrefix + firstExample.targetTerm + firstExample.targetSuffix}'.`,
      );
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
