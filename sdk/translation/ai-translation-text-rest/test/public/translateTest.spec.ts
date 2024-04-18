// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  InputTextItem,
  TextTranslationClient,
  TranslatedTextItemOutput,
  TranslateQueryParamProperties,
  isUnexpected,
} from "../../src";
import {
  createCustomTranslationClient,
  createTranslationClient,
  createTokenTranslationClient,
  createAADAuthenticationTranslationClient,
  startRecorder,
} from "./utils/recordedClient";
import { Context } from "mocha";

describe("Translate tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;
  let customClient: TextTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createTranslationClient({ recorder });
    customClient = await createCustomTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("translate basic", async () => {
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
      from: "en",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations[0].translations.length > 0);
    assert.isTrue(translations[0].translations[0].to === "cs");
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("with auto detect", async () => {
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations[0].translations.length > 0);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].to === "cs");
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("no translate tag", async () => {
    const inputText: InputTextItem[] = [
      { text: "<span class=notranslate>今天是怎么回事是</span>非常可怕的" },
    ];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "zh-chs",
      from: "en",
      textType: "html",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].text.includes("今天是怎么回事是"));
  });

  it("dictionary tag", async () => {
    const inputText: InputTextItem[] = [
      {
        text: 'The word < mstrans:dictionary translation ="wordomatic">wordomatic</mstrans:dictionary> is a dictionary entry.',
      },
    ];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "es",
      from: "en",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].to === "es");
    assert.isTrue(translations[0].translations[0].text.includes("wordomatic"));
  });

  it("transliteration", async () => {
    const inputText: InputTextItem[] = [{ text: "hudha akhtabar." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "zh-Hans",
      from: "ar",
      fromScript: "Latn",
      toScript: "Latn",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].to === "zh-Hans");
    assert.isTrue(translations[0].translations[0].text !== null);
  });

  it("from latin to latin script", async () => {
    const inputText: InputTextItem[] = [{ text: "ap kaise ho" }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "ta",
      from: "hi",
      fromScript: "Latn",
      toScript: "Latn",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].translations[0].transliteration != null);
    assert.isTrue(
      translations[0].translations[0].transliteration?.text.includes("eppadi irukkiraai?"),
    );
  });

  it("multiple input text", async () => {
    const inputText: InputTextItem[] = [
      { text: "This is a test." },
      { text: "Esto es una prueba." },
      { text: "Dies ist ein Test." },
    ];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
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
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs,es,de",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations[0].translations.length === 3);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);

    assert.isTrue(translations[0].translations[0].text != null);
    assert.isTrue(translations[0].translations[1].text != null);
    assert.isTrue(translations[0].translations[2].text != null);
  });

  it("different text types", async () => {
    const inputText: InputTextItem[] = [
      { text: "<html><body>This <b>is</b> a test.</body></html>" },
    ];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
  });

  it("with profanity", async () => {
    const inputText: InputTextItem[] = [{ text: "shit this is fucking crazy" }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "zh-cn",
      profanityAction: "Marked",
      profanityMarker: "Asterisk",
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].text.includes("***"));
  });

  it("with alignment", async () => {
    const inputText: InputTextItem[] = [{ text: "It is a beautiful morning" }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
      includeAlignment: true,
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].alignment?.proj != null);
  });

  it("with include sentence length", async () => {
    const inputText: InputTextItem[] = [
      {
        text: "La réponse se trouve dans la traduction automatique. La meilleure technologie de traduction automatique ne peut pas toujours fournir des traductions adaptées à un site ou des utilisateurs comme un être humain. Il suffit de copier et coller un extrait de code n'importe où.",
      },
    ];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "fr",
      includeSentenceLength: true,
    };
    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "fr");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].sentLen?.srcSentLen.length === 3);
    assert.isTrue(translations[0].translations[0].sentLen?.transSentLen.length === 3);
  });

  it("with custom endpoint", async () => {
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
      includeSentenceLength: true,
    };
    const response = await customClient.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    const translations = response.body as TranslatedTextItemOutput[];
    assert.isTrue(translations.length === 1);
    assert.isTrue(translations[0].translations.length === 1);
    assert.isTrue(translations[0].detectedLanguage?.language === "en");
    assert.isTrue(translations[0].detectedLanguage?.score === 1);
    assert.isTrue(translations[0].translations[0].text != null);
  });

  it("with token", async () => {
    const tokenClient = await createTokenTranslationClient({ recorder });
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
    };
    const response = await tokenClient.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");
  });

  it("with AAD authentication", async () => {
    const tokenClient = await createAADAuthenticationTranslationClient({ recorder });
    const inputText: InputTextItem[] = [{ text: "This is a test." }];
    const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
      to: "cs",
    };
    const response = await tokenClient.path("/translate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");
  });
});
