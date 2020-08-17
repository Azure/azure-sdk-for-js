// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient } from "./utils/recordedClient";
import {
  TextAnalyticsClient,
  TextDocumentInput,
  DetectLanguageInput,
  DetectLanguageSuccessResult,
  ExtractKeyPhrasesSuccessResult
} from "../src/index";
import { assertAllSuccess } from "./utils/resultHelper";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all."
];

const testDataEs = [
  "Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.",
  "La carretera estaba atascada. Había mucho tráfico el día de ayer."
];
describe("[AAD] TextAnalyticsClient", function() {
  let recorder: Recorder;
  let client: TextAnalyticsClient;

  let getId: () => string;

  this.timeout(10000);

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
    let nextId = 0;
    getId = () => {
      nextId += 1;
      return nextId.toString();
    };
  });

  afterEach(() => {
    recorder.stop();
  });

  describe("#analyzeSentiment", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.analyzeSentiment([]), /non-empty array/);
    });

    it("client accepts string[] and language", async () => {
      const results = await client.analyzeSentiment(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.analyzeSentiment(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service returns error for invalid language", async () => {
      const [result] = await client.analyzeSentiment(["Hello world!"], "notalanguage");
      if (result.error === undefined) {
        assert.fail("Expected an error from the service.");
      }
      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("service returns an error for an empty document", async () => {
      const data = [...testDataEn];
      data.splice(1, 0, "");
      const results = await client.analyzeSentiment(data);
      const errorResult = results[1];
      if (errorResult.error === undefined) {
        assert.fail("Expected an error from the service");
      }
      assert.equal(
        results.filter((result) => result.error === undefined).length,
        testDataEn.length
      );
      assert.equal(errorResult.error.code, "InvalidDocument");
    });

    it("client accepts TextDocumentInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          language: "en",
          text
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          language: "es",
          text
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.analyzeSentiment(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assertAllSuccess(results);
    });
  });

  describe("#detectLanguage", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.detectLanguage([]), /non-empty array/);
    });

    it("client accepts no countryHint", async () => {
      const results = await client.detectLanguage(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts a countryHint", async () => {
      const results = await client.detectLanguage(["impossible"], "fr");
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it('client accepts "none" country hint with string[] input', async () => {
      const results = await client.detectLanguage(
        ["I use Azure Functions to develop my service."],
        "none"
      );
      assert.equal(results.length, 1);
      assertAllSuccess(results);
      const result = results[0] as DetectLanguageSuccessResult;
      assert.equal(result.primaryLanguage.iso6391Name, "en");
    });

    it('client accepts "none" country hint with DetectLanguageInput[] input', async () => {
      const results = await client.detectLanguage(
        testDataEn.concat(testDataEs).map(
          (input): DetectLanguageInput => ({
            id: getId(),
            countryHint: "none",
            text: input
          })
        )
      );
      assertAllSuccess(results);
    });

    it("service errors on invalid country hint", async () => {
      const [result] = await client.detectLanguage(["hello"], "invalidcountry");
      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "InvalidCountryHint");
    });

    it("client accepts mixed-country DetectLanguageInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): DetectLanguageInput => ({
          id: getId(),
          text
        })
      );
      const esInputs = testDataEs.map(
        (text): DetectLanguageInput => ({
          id: getId(),
          countryHint: "mx",
          text
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.detectLanguage(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assertAllSuccess(results);
    });
  });

  describe("#recognizeEntities", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.recognizeEntities([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.recognizeEntities(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.recognizeEntities(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.recognizeEntities(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.slice(0, -1).map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.recognizeEntities(allInputs);
      assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
      assertAllSuccess(results);
    });

    it("client throws exception for too many inputs", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      try {
        await client.recognizeEntities(allInputs);
        assert.fail("Oops, an exception didn't happen.");
      } catch (e) {
        assert.equal(e.statusCode, 400);
        assert.equal(e.code, "InvalidDocumentBatch");
        assert.equal(
          e.message,
          "Batch request contains too many records. Max 5 records are permitted."
        );
      }
    });

    it.only("client throws exception for too big of an input", async () => {
      const constitution = 
      `Article I
      Section 1: Congress
      All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.
      
      Section 2: The House of Representatives
      The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.
      
      No Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.
      
      Representatives and direct Taxes shall be apportioned among the several States which may be included within this Union, according to their respective Numbers, which shall be determined by adding to the whole Number of free Persons, including those bound to Service for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct.The number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.
      
      When vacancies happen in the Representation from any State, the Executive Authority thereof shall issue Writs of Election to fill such Vacancies.
      
      The House of Representatives shall chuse their Speaker and other Officers;and shall have the sole Power of Impeachment.
      
      Section 3: The Senate
      The Senate of the United States shall be composed of two Senators from each State, chosen by the Legislature thereof, for six Years; and each Senator shall have one Vote.
      
      Immediately after they shall be assembled in Consequence of the first Election, they shall be divided as equally as may be into three Classes. The Seats of the Senators of the first Class shall be vacated at the Expiration of the second Year, of the second Class at the Expiration of the fourth Year, and of the third Class at the Expiration of the sixth Year, so that one third may be chosen every second Year; and if Vacancies happen by Resignation, or otherwise, during the Recess of the Legislature of any State, the Executive thereof may make temporary Appointments until the next Meeting of the Legislature, which shall then fill such Vacancies.
      
      No Person shall be a Senator who shall not have attained to the Age of thirty Years, and been nine Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State for which he shall be chosen.
      
      The Vice President of the United States shall be President of the Senate, but shall have no Vote, unless they be equally divided.
      
      The Senate shall chuse their other Officers, and also a President pro tempore, in the Absence of the Vice President, or when he shall exercise the Office of President of the United States.
      
      The Senate shall have the sole Power to try all Impeachments. When sitting for that Purpose, they shall be on Oath or Affirmation. When the President of the United States is tried, the Chief Justice shall preside: And no Person shall be convicted without the Concurrence of two thirds of the Members present.
      
      Judgment in Cases of Impeachment shall not extend further than to removal from Office, and disqualification to hold and enjoy any Office of honor, Trust or Profit under the United States: but the Party convicted shall nevertheless be liable and subject to Indictment, Trial, Judgment and Punishment, according to Law.
      
      Section 4: Elections
      The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed in each State by the Legislature thereof; but the Congress may at any time by Law make or alter such Regulations, except as to the Places of chusing Senators.
      
      The Congress shall assemble at least once in every Year, and such Meeting shall be on the first Monday in December, unless they shall by Law appoint a different Day.
      
      Section 5: Powers and Duties of Congress
      Each House shall be the Judge of the Elections, Returns and Qualifications of its own Members,and a Majority of each shall constitute a Quorum to do Business; but a smaller Number may adjourn from day to day, and may be authorized to compel the Attendance of absent Members, in such Manner, and under such Penalties as each House may provide.
      
      Each House may determine the Rules of its Proceedings, punish its Members for disorderly Behaviour, and, with the Concurrence of two thirds, expel a Member.
      
      Each House shall keep a Journal of its Proceedings, and from time to time publish the same, excepting such Parts as may in their Judgment require Secrecy; and the Yeas and Nays of the Members of either House on any question shall, at the Desire of one fifth of those Present, be entered on the Journal.
      
      Neither House, during the Session of Congress, shall, without the Consent of the other, adjourn for more than three days, nor to any other Place than that in which the two Houses shall be sitting.`;

      const inputs = [{
        id: "1",
        text: constitution,
        language: "en"
      }];

      const results = await client.recognizeEntities(inputs);
      results.map(result => 
        {
          assert.equal(result.error?.code, "InvalidDocument");
          assert.equal(result.error?.message,
            "A document within the request was too large to be processed. Limit document size to: 5120 text elements. For additional details on the data limitations see https://aka.ms/text-analytics-data-limits"
          );
        })
    });
  });

  describe("#extractKeyPhrases", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.extractKeyPhrases([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.extractKeyPhrases(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.extractKeyPhrases(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.extractKeyPhrases(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("service reports warning for long words", async () => {
      const results = await client.extractKeyPhrases([
        "Hello world, thisisanextremelymassivesequenceoflettersthatislongerthansixtyfourcharacters."
      ]);
      assertAllSuccess(results);
      const result = results[0] as ExtractKeyPhrasesSuccessResult;
      assert.equal(result.warnings[0].code, "LongWordsInDocument");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.extractKeyPhrases(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assertAllSuccess(results);
    });
  });

  describe("#recognizeLinkedEntities", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.recognizeLinkedEntities([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.recognizeLinkedEntities(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.recognizeLinkedEntities(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.recognizeLinkedEntities(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.slice(0, -1).map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.recognizeLinkedEntities(allInputs);
      assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
      assertAllSuccess(results);
    });

    it("client throws exception for too many inputs", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      try {
        await client.recognizeEntities(allInputs);
        assert.fail("Oops, an exception didn't happen.");
      } catch (e) {
        assert.equal(e.statusCode, 400);
        assert.equal(e.code, "InvalidDocumentBatch");
        assert.equal(
          e.message,
          "Batch request contains too many records. Max 5 records are permitted."
        );
      }
    });
  });
});
