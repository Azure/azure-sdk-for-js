// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { USCampaign, NumberPoolStatus } from "@azure-tools/communication-ten-dlc";
import { TenDlcClient } from "@azure-tools/communication-ten-dlc";
import { describe, it, assert } from "vitest";
import { createMockHttpClient } from "../utils/mockHttpClients.js";

describe("TenDlcClient - numberPoolStatus deserialization", () => {
  const endpoint = "https://contoso.spool.azure.local";
  const accessKey = "banana";
  const connectionString = `endpoint=${endpoint};accesskey=${accessKey}`;
  const campaignId = "a551dbcf-30a8-440c-9fb0-6baafbc411e8";

  function createClientWithMockResponse(body: Record<string, unknown>): TenDlcClient {
    return new TenDlcClient(connectionString, {
      httpClient: createMockHttpClient(200, body),
    });
  }

  it("deserializes numberPoolStatus 'Activated' from campaign response", async () => {
    const mockResponse: Record<string, unknown> = {
      id: campaignId,
      name: "Test Campaign",
      numberPoolStatus: "Activated",
    };
    const client = createClientWithMockResponse(mockResponse);
    const campaign: USCampaign = await client.getUSCampaign(campaignId);

    assert.equal(campaign.id, campaignId);
    assert.equal(campaign.numberPoolStatus, "Activated");
  });

  it("deserializes numberPoolStatus 'None' from campaign response", async () => {
    const mockResponse: Record<string, unknown> = {
      id: campaignId,
      name: "Test Campaign",
      numberPoolStatus: "None",
    };
    const client = createClientWithMockResponse(mockResponse);
    const campaign: USCampaign = await client.getUSCampaign(campaignId);

    assert.equal(campaign.numberPoolStatus, "None");
  });

  it("deserializes numberPoolStatus null from campaign response", async () => {
    const mockResponse: Record<string, unknown> = {
      id: campaignId,
      name: "Test Campaign",
      numberPoolStatus: null,
    };
    const client = createClientWithMockResponse(mockResponse);
    const campaign: USCampaign = await client.getUSCampaign(campaignId);

    assert.isNull(campaign.numberPoolStatus);
  });

  it("handles absent numberPoolStatus (undefined) in campaign response", async () => {
    const mockResponse: Record<string, unknown> = {
      id: campaignId,
      name: "Test Campaign",
    };
    const client = createClientWithMockResponse(mockResponse);
    const campaign: USCampaign = await client.getUSCampaign(campaignId);

    assert.isUndefined(campaign.numberPoolStatus);
  });

  it("deserializes all NumberPoolStatus enum values correctly", async () => {
    const statuses: NumberPoolStatus[] = [
      "None",
      "Requested",
      "ActivationPending",
      "Activated",
      "ActivationFailed",
    ];

    for (const status of statuses) {
      const mockResponse: Record<string, unknown> = {
        id: campaignId,
        numberPoolStatus: status,
      };
      const client = createClientWithMockResponse(mockResponse);
      const campaign: USCampaign = await client.getUSCampaign(campaignId);

      assert.equal(
        campaign.numberPoolStatus,
        status,
        `Expected numberPoolStatus to be '${status}'`,
      );
    }
  });

  it("includes numberPoolStatus in list campaigns response", async () => {
    const mockResponse: Record<string, unknown> = {
      campaigns: [
        { id: "campaign-1", numberPoolStatus: "Activated" },
        { id: "campaign-2", numberPoolStatus: null },
        { id: "campaign-3" },
      ],
    };
    const client = createClientWithMockResponse(mockResponse);

    const campaigns: USCampaign[] = [];
    for await (const campaign of client.listUSCampaigns()) {
      campaigns.push(campaign);
    }

    assert.equal(campaigns.length, 3);
    assert.equal(campaigns[0].numberPoolStatus, "Activated");
    assert.isNull(campaigns[1].numberPoolStatus);
    assert.isUndefined(campaigns[2].numberPoolStatus);
  });
});
