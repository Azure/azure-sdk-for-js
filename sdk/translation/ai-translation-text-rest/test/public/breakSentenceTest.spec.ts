// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  BreakSentenceItemOutput,
  FindSentenceBoundariesQueryParamProperties,
  InputTextItem,
  TextTranslationClient,
  isUnexpected,
} from "../../src";
import { createTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("BreakSentence tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("auto detect", async () => {
    const inputText: InputTextItem[] = [{ text: "hello world" }];
    const response = await client.path("/breaksentence").post({
      body: inputText,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const breakSentences = response.body as BreakSentenceItemOutput[];
    assert.isTrue(breakSentences[0].detectedLanguage?.language === "en");
    assert.isTrue(breakSentences[0].detectedLanguage?.score === 1.0);
    assert.isTrue(breakSentences[0].sentLen[0] === 11);
  });

  it("with language", async () => {
    const inputText: InputTextItem[] = [
      {
        text: "รวบรวมแผ่นคำตอบ ระยะเวลาของโครงการ วิธีเลือกชายในฝัน หมายเลขซีเรียลของระเบียน วันที่สิ้นสุดของโครงการเมื่อเสร็จสมบูรณ์ ปีที่มีการรวบรวม ทุกคนมีวัฒนธรรมและวิธีคิดเหมือนกัน ได้รับโทษจำคุกตลอดชีวิตใน ฉันลดได้ถึง 55 ปอนด์ได้อย่างไร  ฉันคิดว่าใครๆ ก็ต้องการกำหนดเมนูอาหารส่วนบุคคล",
      },
    ];
    const parameters: FindSentenceBoundariesQueryParamProperties & Record<string, unknown> = {
      language: "th",
    };
    const response = await client.path("/breaksentence").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const breakSentences = response.body as BreakSentenceItemOutput[];

    const expectedLengths = [78, 41, 110, 46];
    for (let i = 0; i < expectedLengths.length; i++) {
      assert.equal(expectedLengths[i], breakSentences[0].sentLen[i]);
    }
  });

  it("with language and script", async () => {
    const inputText: InputTextItem[] = [{ text: "zhè shì gè cè shì。" }];
    const parameters: FindSentenceBoundariesQueryParamProperties & Record<string, unknown> = {
      language: "zh-Hans",
      script: "Latn",
    };
    const response = await client.path("/breaksentence").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const breakSentences = response.body as BreakSentenceItemOutput[];
    assert.equal(breakSentences[0].sentLen[0], 18);
  });

  it("with multiple languages", async () => {
    const inputText: InputTextItem[] = [
      { text: "hello world" },
      { text: "العالم هو مكان مثير جدا للاهتمام" },
    ];
    const response = await client.path("/breaksentence").post({
      body: inputText,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const breakSentences = response.body as BreakSentenceItemOutput[];
    assert.equal(breakSentences[0].detectedLanguage?.language, "en");
    assert.equal(breakSentences[1].detectedLanguage?.language, "ar");
    assert.equal(breakSentences[0].sentLen[0], 11);
    assert.equal(breakSentences[1].sentLen[0], 32);
  });
});
