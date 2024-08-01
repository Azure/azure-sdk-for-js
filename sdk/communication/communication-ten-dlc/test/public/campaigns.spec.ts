// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { CreateUUID } from "../utils/helpers";

describe("TenDlcClient - Campaigns", function () {
  let recorder: Recorder;
  let client: TenDlcClient;
  let id: string; 
  const DEFAULT_ID = "a551dbcf-30a8-440c-9fb0-6baafbc411e8";

  const messageDetails = { 
    useCase: {
      sampleMessages: ["sampleMessages"],
    }
  }

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
    if(isPlaybackMode()){
      id = DEFAULT_ID;
    }
    else{
      id = CreateUUID();
    }
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully inserts campaign", async function (this: Context) {
    const options = {
      brandId: id,
      campaignDetails: {},
      messageDetails: messageDetails,
    };

    const campaign = await client.upsertUSCampaign(id, options);
    assert.equal(campaign.id, id);
    assert.equal(campaign.messageDetails?.useCase?.sampleMessages?.values, messageDetails.useCase.sampleMessages.values);

    await client.deleteUSCampaign(id);
  }).timeout(30000);

  it("successfully updates campaign", async function (this: Context) {
    const options = {
      brandId: id,
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    let campaign = await client.upsertUSCampaign(id, options);
    assert.equal(campaign.id, id);
    assert.equal(campaign.messageDetails?.useCase?.sampleMessages?.values, messageDetails.useCase.sampleMessages.values);

    messageDetails.useCase.sampleMessages = ["updatedSampleMessages"];
    const newOptions = {
      brandId: id,
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    
    campaign = await client.upsertUSCampaign(id, newOptions);
    assert.equal(campaign.id, id);
    assert.equal(campaign.messageDetails?.useCase?.sampleMessages?.values, messageDetails.useCase.sampleMessages.values);

    await client.deleteUSCampaign(id);

  }).timeout(30000);

  it("can list all us campaigns", async function () {
    const options = {
      brandId: id,
      campaignDetails: {},
      messageDetails: {},
    };

    client.upsertUSCampaign(id, options);
    for await (const campaign of client.listUSCampaigns()) {
      assert.isNotNull(campaign);
    }

    await client.deleteUSCampaign(id);
  }).timeout(30000);
});
