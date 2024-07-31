// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import { Recorder } from "@azure-tools/test-recorder";

describe("TenDlcClient - Campaigns", function () {
  let recorder: Recorder;
  let client: TenDlcClient;

  let messageDetails = { 
    useCase: {
      sampleMessages: ["sampleMessages"],
    },
    isTollFree: false,
    campaignId: "campaignId",
    brandId: "brandId",
    messageTemplate: "messageTemplate",
    senderId: "senderId",
    countryCode: "countryCode",
    isDynamic: false,
    isUnicode: false,
    isInteractive: false,
    isLocalTimeRestriction: false,
    isGlobalTimeRestriction: false,
    isTimeZoneRestriction: false,
    isQuietHoursRestriction: false,
    isOptOut: false,
    isSignature: false,
    isStopMessage: false,
    isStopAfterMessage: false,
    isStopAllMessages: false,
    isStopAllMessagesConfirmation: false,
    isStopAllMessagesHelp: false,
    isHelpMessage: false,
    isHelpMessageConfirmation: false,
    isHelpMessageHelp: false,
    isOptInMessage: false,
    isOptInMessageConfirmation: false,
    isOptInMessageHelp: false,
    isOptInMessageKeyword: false,
    isOptInMessageKeywordConfirmation: false,
    isOptInMessageKeywordHelp: false,
    isOptInMessageKeywordStop: false,
    isOptInMessageKeywordStopConfirmation: false,
    isOptInMessageKeywordStopHelp: false,
    isOptInMessageKeywordStopAll: false,
    isOptInMessageKeywordStopAllConfirmation: false,
    isOptInMessageKeywordStopAllHelp: false,
    isOptInMessageKeywordHelpMessage: false,
    isOptInMessageKeywordHelpMessageConfirmation: false,
    isOptInMessageKeywordHelpMessageHelp: false,
    isOptInMessageKeywordHelpMessageKeyword: false,
    isOptInMessageKeywordHelpMessageKeywordConfirmation: false,
    isOptInMessageKeywordHelpMessageKeywordHelp: false,
    isOptInMessageKeywordHelpMessageKeywordStop: false,
    isOptInMessageKeywordHelpMessageKeywordStopConfirmation: false,
    isOptInMessageKeywordHelpMessageKeywordStopHelp: false,
    isOptInMessageKeywordHelpMessageKeywordStopAll: false,
    isOptInMessageKeywordHelpMessageKeywordStopAllConfirmation: false,
    isOptInMessageKeywordHelpMessageKeywordStopAllHelp: false,
    isOptInMessageKeywordHelpMessageKeywordStopAllMessage: false,
    isOptInMessageKeywordHelpMessageKeywordStopAllMessageConfirmation: false,
  }

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully inserts campaign", function (this: Context) {
    const options = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    var campaign = client.upsertUSCampaign("campaignId", options);
    campaign.then((value) => {
      assert.equal(value.id, "campaignId");
      assert.equal(value.messageDetails?.useCase?.sampleMessages, ["sampleMessages"]);
    });
  }).timeout(30000);

  it("successfully updates campaign", function (this: Context) {
    const options = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    var campaign = client.upsertUSCampaign("campaignId", options);
    campaign.then((value) => {
      assert.equal(value.id, "campaignId");
      assert.equal(value.messageDetails?.useCase?.sampleMessages, ["sampleMessages"]);
    });

    messageDetails.useCase.sampleMessages = ["updatedSampleMessages"];
    const newOptions = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    var campaign = client.upsertUSCampaign("campaignId", newOptions);
    campaign.then((value) => {
      assert.equal(value.id, "campaignId");
      assert.equal(value.messageDetails?.useCase?.sampleMessages, ["updatedSampleMessages"]);
    });
  }).timeout(30000);

  it("successfully deletes campaign", function (this: Context) {
    const options = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: {},
    };

    client.upsertUSCampaign("campaignId", options);
    var campaign = client.getUSCampaign("campaignId");
    campaign.then((value) => {
      assert.equal(value.id, "campaignId");
    });

    client.deleteUSBrand("campaignId");
    var campaign = client.getUSCampaign("campaignId");
    campaign.then((value) => {
      assert.equal(value, undefined);
    });
  }).timeout(30000);

  it("can list all us campaigns", async function () {
    const options = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: {},
    };

    client.upsertUSCampaign("campaignId", options);
    let count = 0;
    for await (const campaign of client.listUSCampaigns()) {
      count++;
      assert.isNotNull(campaign);
    }
  }).timeout(30000);

  it("successfully cancels campaign", function (this: Context) {
    const options = {
      brandId: "brandId",
      campaignDetails: {},
      messageDetails: {},
    };

    client.upsertUSCampaign("campaignId", options);
    var campaign = client.getUSBrand("campaignId");
    campaign.then((value) => {
      assert.equal(value.id, "campaignId");
    });

    campaign = client.cancelUSCampaign("campaignId");
    campaign.then((value) => {
      assert.equal(value.status?.toString(), "Cancelled");
    });
  }).timeout(30000);
});
