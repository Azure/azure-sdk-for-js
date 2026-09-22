// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextTranslationClient, TranslateInputItem } from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import {
  createCustomTranslationClient,
  createTranslationClient,
  createTokenTranslationClient,
  createAADAuthenticationTranslationClient,
  startRecorder,
} from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Translate tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;
  let customClient: TextTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createTranslationClient({ recorder });
    customClient = await createCustomTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("translate basic", async () => {
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
      language: "en",
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations[0].translations.length > 0);
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("with auto detect", async () => {
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations[0].translations.length > 0);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("no translate tag", async () => {
    const input = {
      text: "<span class=notranslate>今天是怎么回事是</span>非常可怕的",
      targets: [{ language: "zh-chs" }],
      language: "en",
      textType: "html",
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].text.includes("今天是怎么回事是"));
  });

  it("dictionary tag", async () => {
    const input = {
      text: 'The word <mstrans:dictionary translation ="wordomatic">wordomatic</mstrans:dictionary> is a dictionary entry.',
      targets: [{ language: "es" }],
      language: "en",
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].text.includes("wordomatic"));
  });

  it("transliteration", async () => {
    const input = {
      text: "hudha akhtabar.",
      targets: [{ language: "zh-Hans", toScript: "Latn" }],
      language: "ar",
      script: "Latn",
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("multiple input text", async () => {
    const inputs = [
      { text: "This is a test.", targets: [{ language: "cs" }] },
      { text: "Esto es una prueba.", targets: [{ language: "cs" }] },
      { text: "Dies ist ein Test.", targets: [{ language: "cs" }] },
    ];
    const response = await client.path("/translate").post({
      body: { inputs: inputs },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 3);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[1].detectedLanguage?.language === "es");
    assert.isTrue(translations[2].detectedLanguage?.language === "de");

    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[1].detectedLanguage?.score === 1);
    assert.isTrue(translations[2].detectedLanguage?.score === 1);

    assert.isTrue(translations[0].translations[0].text != null);
    assert.isTrue(translations[1].translations[0].text != null);
    assert.isTrue(translations[2].translations[0].text != null);
  });

  it("multiple target languages", async () => {
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }, { language: "es" }, { language: "de" }],
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations[0].translations.length === 3);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);

    assert.isTrue(translations[0].translations[0].text != null);
    assert.isTrue(translations[0].translations[1].text != null);
    assert.isTrue(translations[0].translations[2].text != null);
  });

  it("Translate using LLM", async () => {
    const input = {
      text: "This is a test",
      targets: [
        {
          language: "cs",
          deploymentName: "gpt-4o-mini",
        },
      ],
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].sourceTokens != null);
    assert.isTrue(translations[0].translations[0].targetTokens != null);
  });

  it("different text types", async () => {
    const input = {
      text: "<html><body>This <b>is</b> a test.</body></html>",
      targets: [{ language: "cs" }],
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
  });

  it("with profanity", async () => {
    const input: TranslateInputItem = {
      text: "shit this is fucking crazy shit fuck",
      targets: [
        {
          language: "zh-Hans",
          profanityAction: "Marked",
          profanityMarker: "Asterisk",
        },
      ],
    };
    const response = await client.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].translations[0].text.includes("***"));
  });

  it("with custom endpoint", async () => {
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
    };
    const response = await customClient.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body.value;
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].text != null);
  });

  it("with token", async () => {
    const tokenClient = await createTokenTranslationClient({ recorder });
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
    };
    const response = await tokenClient.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");
  });

  it("with AAD authentication", async () => {
    const tokenClient = await createAADAuthenticationTranslationClient({ recorder });
    const input = {
      text: "This is a test.",
      targets: [{ language: "cs" }],
    };
    const response = await tokenClient.path("/translate").post({
      body: { inputs: [input] },
    });
    assert.equal(response.status, "200");
  });
});
