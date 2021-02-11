/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import * as chai from "chai";

describe("featuresPhraseLists.test.ts", () => {

  it("should add phrase list", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const id = await client.features.addPhraseList(BaseTest.GlobalAppId, "0.1", {
        name: "DayOfWeekToAdd",
        phrases: "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        isExchangeable: true
      });
      const phrases = await client.features.getPhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      await client.features.deletePhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      chai.expect(phrases).not.to.be.null;
      chai.expect(phrases.name).to.eq("DayOfWeekToAdd");
      chai.expect(phrases.phrases).to.eq("monday,tuesday,wednesday,thursday,friday,saturday,sunday")
    });
  });


  it("should list phrase lists", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const id = await client.features.addPhraseList(BaseTest.GlobalAppId, "0.1", {
        name: "DayOfWeekToList",
        phrases: "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        isExchangeable: true
      });
      let phrases = await client.features.listPhraseLists(BaseTest.GlobalAppId, "0.1");
      await client.features.deletePhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      chai.expect(phrases).not.to.be.null;
      chai.expect(phrases.length).not.to.eq(0);
    });
  });

  it("should get phrase list", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const id = await client.features.addPhraseList(BaseTest.GlobalAppId, "0.1", {
        name: "DayOfWeekToGet",
        phrases: "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        isExchangeable: true
      });

      const phrases = await client.features.getPhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      await client.features.deletePhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      chai.expect(phrases).not.to.be.null;
      chai.expect(phrases.name).to.eq("DayOfWeekToGet");
      chai.expect(phrases.isActive).to.eq(true);
      chai.expect(phrases.isExchangeable).to.eq(true);
    });
  });


  it("should update phrase list", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const id = await client.features.addPhraseList(BaseTest.GlobalAppId, "0.1", {
        name: "DayOfWeekToUpdate",
        phrases: "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        isExchangeable: true
      });

      await client.features.updatePhraseList(BaseTest.GlobalAppId, "0.1", id.body, {
        phraselistUpdateObject: {
          isActive: false,
          name: "Month",
          phrases: "january,february,march,april,may,june,july,august,september,october,november,december"
        }
      });

      const phrases = await client.features.getPhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      await client.features.deletePhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      chai.expect(phrases).not.to.be.null;
      chai.expect(phrases.name).to.eq("Month");
      chai.expect(phrases.phrases).to.eq("january,february,march,april,may,june,july,august,september,october,november,december");
      chai.expect(phrases.isActive).to.eq(false);
    });
  });

  it("should delete phrase list", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const id = await client.features.addPhraseList(BaseTest.GlobalAppId, "0.1", {
        name: "DayOfWeekToDelete",
        phrases: "monday,tuesday,wednesday,thursday,friday,saturday,sunday",
        isExchangeable: true
      });
      let phrase = await client.features.getPhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      await client.features.deletePhraseList(BaseTest.GlobalAppId, "0.1", id.body);
      let phrases = await client.features.listPhraseLists(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(phrases, "id", id)).to.be.false;
    });
  });
});
