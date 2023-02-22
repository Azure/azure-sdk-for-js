// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";
import { TranslatorCustomEndpoint } from "../../src/authentication";
import * as TextTranslationFactory from "../../src/index";
import { TranslatorCredential, TranslateParameters, TranslatedTextElementOutput } from "../../src/index";

class MTToken implements TokenCredential {
  getToken(scopes: string | string[], options?: GetTokenOptions | undefined): Promise<AccessToken | null> {
    if (!scopes || options) {
    }

    return Promise.resolve<AccessToken>({ token: "", expiresOnTimestamp: new Date("2023/03/01").getTime() });
  }

}

describe("Sample Tests", () => {

  it("anonymous client - GET languages", async function () {
    let translationClient = TextTranslationFactory.default("https://api.cognitive.microsofttranslator.com");
    let langResponse = await translationClient.path("/languages").get();

    assert.equal("200", langResponse.status);

    let languages = langResponse.body as TextTranslationFactory.GetLanguagesResultOutput;
    assert.equal(languages.translation["af"].name, "Afrikaans");
  });

  it("global endpoint - translate", async function () {
    let translatorCredential = new TranslatorCredential("", "centralus");
    let translationClient = TextTranslationFactory.default("https://api.cognitive.microsofttranslator.com", translatorCredential);

    let params: TranslateParameters = {
      body: [{ text: "This is a test" }],
      queryParameters: {
        to: "cs"
      }
    };
    let translateResponse = await translationClient.path("/translate").post(params);

    assert.equal("200", translateResponse.status);

    let translation = translateResponse.body as TranslatedTextElementOutput[];
    assert.equal(translation[0].translations[0].to, "cs");
  });

  it("global endpoint - token - translate", async function () {
    let translatorCredential: TokenCredential = new MTToken();
    let translationClient = TextTranslationFactory.default("https://api.cognitive.microsofttranslator.com", translatorCredential);

    let params: TranslateParameters = {
      body: [{ text: "This is a test" }],
      queryParameters: {
        to: "cs"
      }
    };
    let translateResponse = await translationClient.path("/translate").post(params);

    assert.equal("200", translateResponse.status);

    let translation = translateResponse.body as TranslatedTextElementOutput[];
    assert.equal(translation[0].translations[0].to, "cs");
  });

  it("custom endpoint - translate", async function () {
    let translatorCredential = new AzureKeyCredential("");
    let customEndpoint = new TranslatorCustomEndpoint("https://mimat-cus-white.cognitiveservices.azure.com");
    let translationClient = TextTranslationFactory.default(customEndpoint, translatorCredential);

    let params: TranslateParameters = {
      body: [{ text: "This is a test" }],
      queryParameters: {
        to: "cs"
      }
    };
    let translateResponse = await translationClient.path("/translate").post(params);

    assert.equal("200", translateResponse.status);

    let translation = translateResponse.body as TranslatedTextElementOutput[];
    assert.equal(translation[0].translations[0].to, "cs");
  });
});
