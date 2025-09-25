// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TenDlcClient } from "@azure-tools/communication-ten-dlc";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createRecordedClient } from "../utils/recordedClient.js";
import { type Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { CreateUUID } from "../utils/helpers.js";

describe("TenDlcClient - Campaigns", function () {
  let recorder: Recorder;
  let client: TenDlcClient;
  let id: string;
  const DEFAULT_ID = "a551dbcf-30a8-440c-9fb0-6baafbc411e8";

  const messageDetails = {
    useCase: {
      sampleMessages: ["sampleMessages"],
    },
  };

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
    if (isPlaybackMode()) {
      id = DEFAULT_ID;
    } else {
      id = CreateUUID();
    }
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("successfully inserts campaign", async () => {
    const options = {
      brandId: id,
      name: "Test Campaign",
      campaignDetails: {},
      messageDetails: messageDetails,
    };

    const campaign = await client.upsertUSCampaign(id, options);
    assert.equal(campaign.id, id);
    assert.equal(
      campaign.messageDetails?.useCase?.sampleMessages?.values,
      messageDetails.useCase.sampleMessages.values,
    );

    await client.deleteUSCampaign(id);
  });

  it("successfully updates campaign", async () => {
    const options = {
      brandId: id,
      name: "Test Campaign",
      campaignDetails: {},
      messageDetails: messageDetails,
    };
    let campaign = await client.upsertUSCampaign(id, options);
    assert.equal(campaign.id, id);
    assert.equal(
      campaign.messageDetails?.useCase?.sampleMessages?.values,
      messageDetails.useCase.sampleMessages.values,
    );

    messageDetails.useCase.sampleMessages = ["updatedSampleMessages"];
    const newOptions = {
      brandId: id,
      name: "Test Campaign",
      campaignDetails: {},
      messageDetails: messageDetails,
    };

    campaign = await client.upsertUSCampaign(id, newOptions);
    assert.equal(campaign.id, id);
    assert.equal(
      campaign.messageDetails?.useCase?.sampleMessages?.values,
      messageDetails.useCase.sampleMessages.values,
    );

    await client.deleteUSCampaign(id);
  });

  it("can list all us campaigns", async function () {
    const options = {
      brandId: id,
      name: "Test Campaign",
      campaignDetails: {},
      messageDetails: {},
    };

    client.upsertUSCampaign(id, options);
    for await (const campaign of client.listUSCampaigns()) {
      assert.isNotNull(campaign);
    }

    await client.deleteUSCampaign(id);
  });
});
