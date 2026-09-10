// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { AbortError } from "@azure/abort-controller";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  BrowserAutomationTool,
  BrowserAutomationToolboxTool,
  TelephonyTransferTarget,
  VoiceAgentDefinition,
} from "../../src/index.js";

interface MockResponse {
  status?: number;
  body?: unknown;
}

// These are offline public-client tests: the transport never makes a network request.
// Live voice generation, browser execution, and provider calls still need service recordings.
function createClient(...responses: MockResponse[]): {
  client: AIProjectClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      const response = responses.shift();
      if (!response) throw new Error(`Unexpected request: ${request.method} ${request.url}`);
      return {
        request,
        status: response.status ?? 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
      };
    },
  };
  return {
    client: new AIProjectClient(
      "https://example.com/api/projects/test-project",
      { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
      { httpClient, retryOptions: { maxRetries: 0 } },
    ),
    requests,
  };
}

const voiceDefinition: VoiceAgentDefinition = {
  kind: "voice",
  model_type: "self_deployed",
  model: "voice-deployment",
  greeting: { type: "template", text: "Hello!" },
  audio: { output: { format: { type: "audio/pcm", rate: 24000 } } },
  store: false,
};
const version = {
  object: "agent.version",
  id: "version-1",
  name: "voice-agent",
  version: "1",
  created_at: 1_700_000_000,
  definition: voiceDefinition,
};
const binding = {
  id: "binding-1",
  provider: "twilio",
  connection: "telephony-connection",
  phone_number: "+15555550100",
  status: "active",
  incoming_call_url: "https://example.com/incoming",
  etag: '"binding-etag"',
};
const call = {
  id: "call-1",
  provider: "twilio",
  status: "success",
  phase: "completed",
  started_at: 1_700_000_000,
  ended_at: 1_700_000_060,
  duration_ms: 60_000,
  timing: { timestamp_source: "provider", ended_at: 1_700_000_060 },
  events: [],
  events_truncated: false,
};
const options = { foundryFeatures: "VoiceAgents=V1Preview" } as const;

describe("non-beta agent voice authoring", () => {
  it("generates a voice agent and deserializes its latest definition", async () => {
    const { client, requests } = createClient({
      body: {
        object: "agent",
        id: "agent-1",
        name: "voice-agent",
        state: "enabled",
        versions: { latest: version },
      },
    });
    const body = {
      kind: "voice" as const,
      name: "voice-agent",
      model_type: "self_deployed" as const,
      model: "voice-deployment",
      goal: "Help callers find public transport.",
      draft: true,
    };
    const agent = await client.agents.generateAgent(body);
    expect(agent.versions.latest.definition).toMatchObject(voiceDefinition);
    expect(agent.versions.latest.created_at).toEqual(new Date(1_700_000_000_000));
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe("/api/projects/test-project/agents:generate");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
  });

  it("round-trips a voice definition through createVersion without dropping false or nested audio", async () => {
    const { client, requests } = createClient({ body: version });
    const result = await client.agents.createVersion("voice-agent", voiceDefinition, options);
    expect(JSON.parse(requests[0].body as string).definition).toEqual(voiceDefinition);
    expect(result.definition).toMatchObject(voiceDefinition);
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("preserves non-preview browser automation in request and response tool unions", async () => {
    const tool: BrowserAutomationTool = {
      type: "browser_automation",
      browser_automation: {
        connection: { project_connection_id: "browser-connection" },
      },
    };
    const definition = { kind: "prompt" as const, model: "chat-deployment", tools: [tool] };
    const { client, requests } = createClient({ body: { ...version, definition } });
    const result = await client.agents.createVersion("browser-agent", definition);
    expect(JSON.parse(requests[0].body as string).definition.tools).toEqual([tool]);
    expect(result.definition).toMatchObject({ tools: [tool] });
  });

  it("surfaces generation validation errors with the service error details", async () => {
    const { client } = createClient({
      status: 400,
      body: {
        error: { code: "invalid_model", message: "Model must support voice.", param: "model" },
      },
    });
    await expect(
      client.agents.generateAgent({ kind: "voice", name: "voice-agent", model: "text-only" }),
    ).rejects.toMatchObject({
      statusCode: 400,
      details: { error: { code: "invalid_model", param: "model" } },
    });
  });

  it("preserves non-preview browser automation in a toolbox", async () => {
    const tool: BrowserAutomationToolboxTool = {
      type: "browser_automation",
      name: "browser",
      browser_automation: { connection: { project_connection_id: "browser-connection" } },
    };
    const { client, requests } = createClient({
      body: {
        id: "toolbox-1",
        name: "browser-tools",
        version: "1",
        created_at: 1_700_000_000,
        metadata: null,
        tools: [tool],
      },
    });
    const result = await client.toolboxes.createVersion("browser-tools", [tool]);
    expect(JSON.parse(requests[0].body as string).tools).toEqual([tool]);
    expect(result.tools).toEqual([tool]);
  });
});

describe("non-beta agent telephony operations", () => {
  it("creates a provider-discriminated binding", async () => {
    const { client, requests } = createClient({ status: 201, body: binding });
    const body = {
      provider: "twilio" as const,
      connection: binding.connection,
      phone_number: binding.phone_number,
      label: "Support",
    };
    const result = await client.agents.createTelephonyBinding("voice agent", body, options);
    expect(result).toMatchObject({ provider: "twilio", phone_number: binding.phone_number });
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/telephony/bindings",
    );
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
  });

  it("gets a Teams Phone Extension binding without requiring a phone number", async () => {
    const teamsBinding = {
      ...binding,
      provider: "teams_phone_extension",
      phone_number: undefined,
      resource_account_object_id: "00000000-0000-0000-0000-000000000001",
    };
    const { client, requests } = createClient({ body: teamsBinding });
    const result = await client.agents.getTelephonyBinding("voice-agent", "binding/1", options);
    expect(result).toMatchObject({
      provider: "teams_phone_extension",
      resource_account_object_id: teamsBinding.resource_account_object_id,
      phone_number: undefined,
    });
    expect(requests[0].method).toBe("GET");
    expect(new URL(requests[0].url).pathname).toContain("/bindings/binding%2F1");
  });

  it("updates only supplied fields and sends the binding ETag", async () => {
    const { client, requests } = createClient({ body: { ...binding, status: "suspended" } });
    const result = await client.agents.updateTelephonyBinding(
      "voice-agent",
      binding.id,
      binding.etag,
      { status: "suspended" },
      options,
    );
    expect(result.status).toBe("suspended");
    expect(requests[0].method).toBe("PATCH");
    expect(requests[0].headers.get("if-match")).toBe(binding.etag);
    expect(JSON.parse(requests[0].body as string)).toEqual({ status: "suspended" });
  });

  it("deletes a binding with its ETag and accepts an empty 204 response", async () => {
    const { client, requests } = createClient({ status: 204 });
    await expect(
      client.agents.deleteTelephonyBinding("voice-agent", binding.id, binding.etag, options),
    ).resolves.toBeUndefined();
    expect(requests[0].method).toBe("DELETE");
    expect(requests[0].headers.get("if-match")).toBe(binding.etag);
  });

  it("gets an empty set of transfer targets", async () => {
    const { client, requests } = createClient({ body: { transfer_targets: [] } });
    expect(await client.agents.getTelephonyTransferTargets("voice-agent", options)).toEqual({
      transfer_targets: [],
    });
    expect(requests[0].method).toBe("GET");
    expect(new URL(requests[0].url).pathname).toContain("/telephony/transfer_targets");
  });

  it.each([
    {
      name: "provider-specific destinations",
      targets: [
        {
          name: "support",
          description: "Support line",
          destination: { kind: "pstn", value: "+15555550101" },
        },
        {
          name: "sip",
          description: "SIP desk",
          destination: { kind: "sip", value: "sip:support@example.com" },
        },
        {
          name: "teams",
          description: "Teams desk",
          destination: { kind: "teams", value: "00000000-0000-0000-0000-000000000001" },
        },
      ] satisfies TelephonyTransferTarget[],
    },
    { name: "clearing all destinations", targets: [] },
  ])("replaces transfer targets for $name", async ({ targets }) => {
    const body = { transfer_targets: targets };
    const { client, requests } = createClient({ body });
    expect(
      await client.agents.replaceTelephonyTransferTargets(
        "voice-agent",
        '"targets-etag"',
        targets,
        options,
      ),
    ).toEqual(body);
    expect(requests[0].method).toBe("PUT");
    expect(requests[0].headers.get("if-match")).toBe('"targets-etag"');
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
  });

  it.each([
    {
      name: "get",
      method: "GET",
      suffix: "",
      invoke: (client: AIProjectClient) =>
        client.agents.getTelephonyCall("voice-agent", "call/1", options),
    },
    {
      name: "transfer",
      method: "POST",
      suffix: ":transfer",
      invoke: (client: AIProjectClient) =>
        client.agents.transferTelephonyCall("voice-agent", "call/1", "support", options),
    },
    {
      name: "end",
      method: "POST",
      suffix: ":end",
      invoke: (client: AIProjectClient) =>
        client.agents.endTelephonyCall("voice-agent", "call/1", options),
    },
  ])("routes $name and deserializes call timestamps", async ({ name, method, suffix, invoke }) => {
    const { client, requests } = createClient({ body: call });
    const result = await invoke(client);
    expect(result.id).toBe(call.id);
    expect(result.started_at).toEqual(new Date(1_700_000_000_000));
    expect(result.timing.ended_at).toEqual(new Date(1_700_000_060_000));
    expect(result.events).toEqual([]);
    expect(result.events_truncated).toBe(false);
    expect(requests[0].method).toBe(method);
    expect(new URL(requests[0].url).pathname).toContain(`/telephony/calls/call%2F1${suffix}`);
    if (name === "transfer") {
      expect(JSON.parse(requests[0].body as string)).toEqual({ target: "support" });
    }
  });

  it("surfaces stale ETag errors rather than retrying the update", async () => {
    const { client, requests } = createClient({
      status: 412,
      body: {
        error: { code: "etag_mismatch", message: "Read the latest binding before updating." },
      },
    });
    await expect(
      client.agents.updateTelephonyBinding("voice-agent", binding.id, '"stale"', { label: "New" }),
    ).rejects.toMatchObject({ statusCode: 412, details: { error: { code: "etag_mismatch" } } });
    expect(requests).toHaveLength(1);
  });

  it("forwards mid-request cancellation and propagates the transport abort error", async () => {
    const controller = new AbortController();
    let capturedRequest: PipelineRequest | undefined;
    let notifyStarted!: () => void;
    const started = new Promise<void>((resolve) => {
      notifyStarted = resolve;
    });
    const client = new AIProjectClient(
      "https://example.com/api/projects/test-project",
      { getToken: async () => ({ token: "unit-test-token", expiresOnTimestamp: Infinity }) },
      {
        retryOptions: { maxRetries: 0 },
        httpClient: {
          sendRequest: (request) =>
            new Promise((_resolve, reject) => {
              capturedRequest = request;
              request.abortSignal?.addEventListener(
                "abort",
                () => reject(new AbortError("The request was aborted.")),
                { once: true },
              );
              notifyStarted();
            }),
        },
      },
    );
    const result = client.agents.getTelephonyCall("voice-agent", call.id, {
      abortSignal: controller.signal,
    });
    const assertion = expect(result).rejects.toThrow(AbortError);
    await started;
    controller.abort();
    await assertion;
    expect(capturedRequest?.abortSignal).toBe(controller.signal);
  });

  const listCases = [
    {
      name: "bindings",
      item: binding,
      list: (client: AIProjectClient) =>
        client.agents.listTelephonyBindings("voice-agent", { ...options, limit: 1 }),
    },
    {
      name: "calls",
      item: call,
      list: (client: AIProjectClient) =>
        client.agents.listTelephonyCalls("voice-agent", { ...options, limit: 1 }),
    },
  ];

  it.each(listCases)("iterates $name across nonempty pages", async ({ item, list }) => {
    const { client, requests } = createClient(
      { body: { data: [item], last_id: item.id, has_more: true } },
      { body: { data: [{ ...item, id: "second" }], last_id: "second", has_more: false } },
    );
    const ids = [];
    for await (const result of list(client)) ids.push(result.id);
    expect(ids).toEqual([item.id, "second"]);
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe(item.id);
    expect(requests[1].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it.each(listCases)("resumes $name from a page continuation token", async ({ item, list }) => {
    const { client, requests } = createClient(
      { body: { data: [item], last_id: item.id, has_more: true } },
      { body: { data: [{ ...item, id: "second" }], has_more: false } },
    );
    const first = await list(client).byPage().next();
    expect(first.value?.[0].id).toBe(item.id);
    expect(first.value?.continuationToken).toBeDefined();
    const resumed = list(client).byPage({ continuationToken: first.value?.continuationToken });
    expect((await resumed.next()).value?.[0].id).toBe("second");
    expect((await resumed.next()).done).toBe(true);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe(item.id);
  });

  it.each(listCases)("returns no items for empty $name", async ({ list }) => {
    const { client, requests } = createClient({ body: { data: [], has_more: false } });
    expect((await list(client).next()).done).toBe(true);
    expect(requests).toHaveLength(1);
  });
});
