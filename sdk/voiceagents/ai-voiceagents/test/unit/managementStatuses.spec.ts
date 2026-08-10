// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { PathUncheckedResponse } from "@azure-rest/core-client";
import {
  _createVoiceAgentDeserialize,
  _deleteVoiceAgentDeserialize,
  _deleteVoiceAgentVersionDeserialize,
} from "../../src/generated/api/voiceAgents/operations.js";

describe("voice-agent management response statuses", () => {
  it("accepts the live service HTTP 200 create response", async () => {
    const response = {
      status: "200",
      body: {
        object: "agent",
        id: "sample-agent",
        name: "sample-agent",
        state: "enabled",
        versions: {
          latest: {
            metadata: {},
            object: "agent.version",
            id: "sample-agent:1",
            name: "sample-agent",
            version: "1",
            created_at: 1_700_000_000,
            definition: {
              kind: "voice",
              model_type: "managed",
              model: "gpt-realtime",
            },
          },
        },
      },
    } as PathUncheckedResponse;

    const agent = await _createVoiceAgentDeserialize(response);
    assert.equal(agent.name, "sample-agent");
    assert.equal(agent.versions.latest.version, "1");
  });

  it("accepts the live service HTTP 200 delete response", async () => {
    const response = {
      status: "200",
      body: { object: "agent.deleted", name: "sample-agent", deleted: true },
    } as PathUncheckedResponse;

    await assert.doesNotReject(_deleteVoiceAgentDeserialize(response));
  });

  it("accepts the live service HTTP 200 version delete response", async () => {
    const response = {
      status: "200",
      body: {
        object: "agent.version.deleted",
        name: "sample-agent",
        version: "draft-1700000000000",
        deleted: true,
      },
    } as PathUncheckedResponse;

    await assert.doesNotReject(_deleteVoiceAgentVersionDeserialize(response));
  });
});
