// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextTranslationClient } from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import { createTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("GetLanguages tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("all scopes", async () => {
    const response = await client.path("/languages").get();
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages.models !== null);
  });

  it("translation scope", async () => {
    const parameters = {
      queryParameters: {
        scope: "translation",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages?.translation?.["af"]?.dir !== null);
    assert.isTrue(languages?.translation?.["af"]?.name !== null);
    assert.isTrue(languages?.translation?.["af"]?.nativeName !== null);
  });

  it("transliteration scope", async () => {
    const parameters = {
      queryParameters: {
        scope: "transliteration",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
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
    const parameters = {
      queryParameters: {
        scope: "transliteration",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.name !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.nativeName !== null);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts !== null);

    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts?.length === 2);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts[0].toScripts.length === 2);
    assert.isTrue(languages?.transliteration?.["zh-Hant"]?.scripts[1].toScripts.length === 2);
  });

  it("models scope", async () => {
    const parameters = {
      queryParameters: {
        scope: "models",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
    assert.isTrue(languages.models !== null);
    assert.isTrue(languages.models!.length > 0);
    for (const model of languages.models!) {
      assert.isTrue(model.includes("gpt"));
    }
  });

  it("with culture", async () => {
    const parameters = {
      headers: {
        "Accept-Language": "es",
      },
    };
    const response = await client.path("/languages").get(parameters);
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const languages = response.body;
    assert.isTrue(languages.translation !== null);
    assert.isTrue(languages.transliteration !== null);
    assert.isTrue(languages.models !== null);

    assert.isTrue(languages?.translation?.["en"]?.name !== null);
    assert.isTrue(languages?.translation?.["en"]?.nativeName !== null);
    assert.isTrue(languages?.translation?.["en"]?.dir !== null);
  });
});
