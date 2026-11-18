// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectClient } from "../../src/index.js";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { randomUUID } from "@azure/core-util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createProjectsClient, createRecorder } from "./utils/createClient.js";

describe("VoiceAgents telephony recordings", () => {
  let recorder: Recorder;
  let client: AIProjectClient;
  let agentName: string;
  let created: boolean;

  beforeEach(async (context: VitestTestContext) => {
    recorder = await createRecorder(context);
    await recorder.addSanitizers(
      {
        bodyKeySanitizers: [{ jsonPath: "$.definition.model", value: "voice-model" }],
      },
      ["record", "playback"],
    );
    client = createProjectsClient(recorder);
    agentName = recorder.variable("agentName", `js-voice-telephony-${randomUUID()}`);
    created = false;
    await client.agents.create(agentName, {
      kind: "voice",
      model_type: "self_deployed",
      model: process.env["FOUNDRY_VOICE_MODEL"] || "gpt-realtime",
    });
    created = true;
  });

  afterEach(async () => {
    try {
      if (created) await client.agents.delete(agentName);
    } finally {
      await recorder.stop();
    }
  });

  it.each(["listBindings", "listCalls", "listCallJobs"] as const)(
    "%s returns an empty collection for a new agent",
    async (method) => {
      const items = [];
      for await (const item of client.voiceAgents.telephony[method](agentName, { limit: 1 })) {
        items.push(item);
      }
      expect(items).toEqual([]);
      const pages = client.voiceAgents.telephony[method](agentName, { limit: 1 }).byPage();
      const page = await pages.next();
      expect(page.value).toHaveLength(0);
      expect(page.value.continuationToken).toBeUndefined();
      expect((await pages.next()).done).toBe(true);
    },
  );

  it("replaces and clears transfer targets using entity tags and rejects stale updates", async () => {
    const operations = client.voiceAgents.telephony;
    let etag: string | undefined;
    const current = await operations.getTransferTargets(agentName, {
      onResponse: (response) => {
        etag = response.headers.get("etag");
      },
    });
    expect(current.transfer_targets).toEqual([]);
    if (!etag) throw new Error("Transfer targets response did not include an entity tag.");
    const originalEtag = etag;
    const targets = [
      {
        name: "support",
        description: "Reserved test destination. Never place a call.",
        destination: { type: "phone_number" as const, value: "+12025550100" },
      },
    ];
    const replaced = await operations.replaceTransferTargets(agentName, etag, targets);
    expect(replaced.transfer_targets).toEqual(targets);
    expect(
      (
        await operations.getTransferTargets(agentName, {
          onResponse: (response) => {
            etag = response.headers.get("etag");
          },
        })
      ).transfer_targets,
    ).toEqual(targets);
    expect(etag).not.toBe(originalEtag);
    await expect(
      operations.replaceTransferTargets(agentName, originalEtag, []),
    ).rejects.toMatchObject({ statusCode: 412 });
    if (!etag) throw new Error("Updated transfer targets response did not include an entity tag.");
    expect((await operations.replaceTransferTargets(agentName, etag, [])).transfer_targets).toEqual(
      [],
    );
    expect((await operations.getTransferTargets(agentName)).transfer_targets).toEqual([]);
  });

  it.each(["getBinding", "updateBinding", "deleteBinding"] as const)(
    "%s rejects an invalid binding identifier",
    async (method) => {
      const operations = client.voiceAgents.telephony;
      const operation =
        method === "getBinding"
          ? operations.getBinding(agentName, "invalid-binding-id")
          : method === "updateBinding"
            ? operations.updateBinding(agentName, "invalid-binding-id", '"invalid-etag"', {
                label: "test",
              })
            : operations.deleteBinding(agentName, "invalid-binding-id", '"invalid-etag"');
      await expect(operation).rejects.toMatchObject({
        statusCode: 400,
        details: { error: { code: "bad_request" } },
      });
    },
  );

  it.each(["getCallJob", "cancelCallJob", "deleteCallJob"] as const)(
    "%s rejects an invalid call job identifier",
    async (method) => {
      const operations = client.voiceAgents.telephony;
      const operation =
        method === "cancelCallJob"
          ? operations.cancelCallJob(agentName, "invalid-job-id", '"invalid-etag"')
          : operations[method](agentName, "invalid-job-id");
      await expect(operation).rejects.toMatchObject({ statusCode: 400 });
    },
  );

  it.each(["getCall", "endCall", "transferCall"] as const)(
    "%s returns not found for an unknown inbound call",
    async (method) => {
      const operations = client.voiceAgents.telephony;
      const operation =
        method === "transferCall"
          ? operations.transferCall(agentName, "missing-call", "support")
          : operations[method](agentName, "missing-call");
      await expect(operation).rejects.toMatchObject({
        statusCode: 404,
        details: { error: { code: "not_found" } },
      });
    },
  );

  it("rejects binding creation with a nonexistent provider connection", async () => {
    await expect(
      client.voiceAgents.telephony.createBinding(agentName, {
        provider: "twilio",
        connection_name: agentName,
        phone_number: "+12025550100",
      }),
    ).rejects.toMatchObject({
      statusCode: 404,
      details: { error: { code: "not_found" } },
    });
  });

  it("rejects call job creation before dialing when the provider connection does not exist", async () => {
    await expect(
      client.voiceAgents.telephony.createCallJob(
        agentName,
        recorder.variable("idempotencyKey", randomUUID()),
        {
          connection_name: agentName,
          source: { type: "phone_number", value: "+12025550100" },
          destination: { type: "phone_number", value: "+12025550101" },
        },
      ),
    ).rejects.toMatchObject({
      statusCode: 404,
      details: { error: { code: "not_found" } },
    });
  });
});
