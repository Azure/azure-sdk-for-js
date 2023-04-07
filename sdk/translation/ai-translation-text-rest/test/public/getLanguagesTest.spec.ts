// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { GetLanguagesParameters, GetLanguagesResultOutput, TextTranslationClient } from "../../src";
import { createLanguageClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("GetLanguages tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createLanguageClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("all scopes", async () => {
    const response = await client.path("/languages").get();
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages.dictionary !== null);
  });

  it("translation scope", async () => {
    const parameters: GetLanguagesParameters = {
      queryParameters: {
        scope: "translation",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages?.translation?.["af"]?.dir !== null);
    assert.isTrue(languages?.translation?.["af"]?.name !== null);
    assert.isTrue(languages?.translation?.["af"]?.nativeName !== null);
  });

  it("transliteration scope", async () => {
    const parameters: GetLanguagesParameters = {
      queryParameters: {
        scope: "transliteration",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.name !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.nativeName !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts !== null);

    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].code !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].dir !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].name !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].nativeName !== null);

    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].toScripts !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].toScripts[0].code !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].toScripts[0].dir !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].toScripts[0].name !== null);
    assert.isTrue(languages?.transliteration?.["be"]?.scripts[0].toScripts[0].nativeName !== null);
  });

  it("transliteration scope multiple scripts", async () => {
    const parameters: GetLanguagesParameters = {
      queryParameters: {
        scope: "transliteration",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.name !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.nativeName !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts !== null);

    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts?.length === 2);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts[0].toScripts.length === 2);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts[1].toScripts.length === 2);
  });

  it("dictionary scope", async () => {
    const parameters: GetLanguagesParameters = {
      queryParameters: {
        scope: "dictionary",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.dictionary !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.name !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.nativeName !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.translations !== null);

    assert.isTrue(languages?.dictionary?.["de"]?.translations[0].code !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.translations[0].dir !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.translations[0].name !== null);
    assert.isTrue(languages?.dictionary?.["de"]?.translations[0].nativeName !== null);
  });

  it("dictionary scope with multiple translations", async () => {
    const parameters: GetLanguagesParameters = {
      queryParameters: {
        scope: "dictionary",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.dictionary !== null);
    assert.isTrue(languages?.dictionary?.["en"]?.name !== null);
    assert.isTrue(languages?.dictionary?.["en"]?.nativeName !== null);
    assert.isTrue(languages?.dictionary?.["en"]?.translations !== null);
    assert.isTrue(languages?.dictionary?.["en"]?.translations?.length !== 1);
  });

  it("with culture", async () => {
    const parameters: GetLanguagesParameters = {
      headers: {
        "Accept-Language": "es",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal("200", response.status);
    const languages = response.body as GetLanguagesResultOutput;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages.dictionary !== null);

    assert.isTrue(languages?.translation?.["en"]?.name !== null);
    assert.isTrue(languages?.translation?.["en"]?.nativeName !== null);
    assert.isTrue(languages?.translation?.["en"]?.dir !== null);
  });
});
