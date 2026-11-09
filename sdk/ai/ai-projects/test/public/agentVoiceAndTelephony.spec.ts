// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AbortError } from "@azure/abort-controller";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../src/index.js";
import type {
  BrowserAutomationPreviewTool,
  BrowserAutomationPreviewToolboxTool,
  TelephonyCallJob,
  TelephonyCallJobCreate,
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
  connection_name: "telephony-connection",
  phone_number: "+15555550100",
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

describe("agent voice authoring", () => {
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
    const agent = await client.agents.createFromPrompt(body);
    expect(agent.versions.latest.definition).toMatchObject(voiceDefinition);
    expect(agent.versions.latest.created_at).toEqual(new Date(1_700_000_000_000));
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe("/api/projects/test-project/agents:generate");
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
  });

  it("round-trips a voice definition through createVersion without dropping false or nested audio", async () => {
    const { client, requests } = createClient({ body: version });
    const result = await client.agents.createVersion("voice-agent", voiceDefinition, options);
    expect(JSON.parse(requests[0].body as string).definition).toEqual(voiceDefinition);
    expect(result.definition).toMatchObject(voiceDefinition);
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it("preserves browser automation preview in request and response tool unions", async () => {
    const tool: BrowserAutomationPreviewTool = {
      type: "browser_automation_preview",
      browser_automation_preview: {
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
      client.agents.createFromPrompt({
        kind: "voice",
        name: "voice-agent",
        model: "text-only",
      }),
    ).rejects.toMatchObject({
      statusCode: 400,
      details: { error: { code: "invalid_model", param: "model" } },
    });
  });

  it("preserves browser automation preview in a toolbox", async () => {
    const tool: BrowserAutomationPreviewToolboxTool = {
      type: "browser_automation_preview",
      name: "browser",
      browser_automation_preview: { connection: { project_connection_id: "browser-connection" } },
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

describe("agent telephony operations", () => {
  it("creates a provider-discriminated binding", async () => {
    const { client, requests } = createClient({ status: 201, body: binding });
    const body = {
      provider: "twilio" as const,
      connection_name: binding.connection_name,
      phone_number: binding.phone_number,
      label: "Support",
    };
    const result = await client.voiceAgents.telephony.createBinding("voice agent", body);
    expect(result).toMatchObject({ provider: "twilio", phone_number: binding.phone_number });
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe(
      "/api/projects/test-project/agents/voice%20agent/telephony/bindings",
    );
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
  });

  it("creates a Teams Phone extensibility binding without requiring a phone number", async () => {
    const body = {
      provider: "teams_phone_extensibility" as const,
      connection_name: binding.connection_name,
      resource_account_object_id: "00000000-0000-0000-0000-000000000001",
    };
    const { client, requests } = createClient({ status: 201, body: { ...binding, ...body } });
    const result = await client.voiceAgents.telephony.createBinding("voice-agent", body);
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(result).toMatchObject(body);
  });

  it("creates a SIP binding without service-generated fields or a display phone number", async () => {
    const body = {
      provider: "sip" as const,
      connection_name: binding.connection_name,
      allowed_calling_numbers: ["+15555550101"],
    };
    const { client, requests } = createClient({ status: 201, body: { ...binding, ...body } });
    const result = await client.voiceAgents.telephony.createBinding("voice-agent", body, options);
    expect(JSON.parse(requests[0].body as string)).toEqual(body);
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(result).toMatchObject({
      ...body,
      id: binding.id,
      incoming_call_url: binding.incoming_call_url,
    });
  });

  it("gets a Teams Phone extensibility binding without requiring a phone number", async () => {
    const teamsBinding = {
      ...binding,
      provider: "teams_phone_extensibility",
      phone_number: undefined,
      resource_account_object_id: "00000000-0000-0000-0000-000000000001",
    };
    const { client, requests } = createClient({ body: teamsBinding });
    const result = await client.voiceAgents.telephony.getBinding(
      "voice-agent",
      "binding/1",
      options,
    );
    expect(result).toMatchObject({
      provider: "teams_phone_extensibility",
      resource_account_object_id: teamsBinding.resource_account_object_id,
      phone_number: undefined,
    });
    expect(requests[0].method).toBe("GET");
    expect(new URL(requests[0].url).pathname).toContain("/bindings/binding%2F1");
  });

  it("updates only supplied fields and sends the binding ETag", async () => {
    const { client, requests } = createClient({ body: { ...binding, label: "Updated" } });
    const result = await client.voiceAgents.telephony.updateBinding(
      "voice-agent",
      binding.id,
      binding.etag,
      { label: "Updated" },
      options,
    );
    expect(result.label).toBe("Updated");
    expect(requests[0].method).toBe("PATCH");
    expect(requests[0].headers.get("if-match")).toBe(binding.etag);
    expect(JSON.parse(requests[0].body as string)).toEqual({ label: "Updated" });
  });

  it("deletes a binding with its ETag and accepts an empty 204 response", async () => {
    const { client, requests } = createClient({ status: 204 });
    await expect(
      client.voiceAgents.telephony.deleteBinding("voice-agent", binding.id, binding.etag, options),
    ).resolves.toBeUndefined();
    expect(requests[0].method).toBe("DELETE");
    expect(requests[0].headers.get("if-match")).toBe(binding.etag);
  });

  it("gets an empty set of transfer targets", async () => {
    const { client, requests } = createClient({ body: { transfer_targets: [] } });
    expect(await client.voiceAgents.telephony.getTransferTargets("voice-agent", options)).toEqual({
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
          destination: { type: "phone_number", value: "+15555550101" },
        },
        {
          name: "sip",
          description: "SIP desk",
          destination: { type: "sip", value: "sip:support@example.com" },
        },
        {
          name: "teams",
          description: "Teams desk",
          destination: { type: "teams", value: "00000000-0000-0000-0000-000000000001" },
        },
      ] satisfies TelephonyTransferTarget[],
    },
    { name: "clearing all destinations", targets: [] },
  ])("replaces transfer targets for $name", async ({ targets }) => {
    const body = { transfer_targets: targets };
    const { client, requests } = createClient({ body });
    expect(
      await client.voiceAgents.telephony.replaceTransferTargets(
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
        client.voiceAgents.telephony.getCall("voice-agent", "call/1", options),
    },
    {
      name: "transfer",
      method: "POST",
      suffix: ":transfer",
      invoke: (client: AIProjectClient) =>
        client.voiceAgents.telephony.transferCall("voice-agent", "call/1", "support", options),
    },
    {
      name: "end",
      method: "POST",
      suffix: ":end",
      invoke: (client: AIProjectClient) =>
        client.voiceAgents.telephony.endCall("voice-agent", "call/1", options),
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
      client.voiceAgents.telephony.updateBinding("voice-agent", binding.id, '"stale"', {
        label: "New",
      }),
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
    const result = client.voiceAgents.telephony.getCall("voice-agent", call.id, {
      abortSignal: controller.signal,
    });
    const assertion = expect(result).rejects.toThrow(AbortError);
    await started;
    controller.abort();
    await assertion;
    expect(capturedRequest?.abortSignal).toBe(controller.signal);
  });

  it.each([
    {
      name: "the lower time bound",
      filters: { startedAfterTime: new Date(0) },
      after: "0",
      before: null,
    },
    {
      name: "the upper time bound",
      filters: { startedBeforeTime: new Date(1_700_000_060_000) },
      after: null,
      before: "1700000060",
    },
    {
      name: "both time bounds",
      filters: {
        startedAfterTime: new Date(0),
        startedBeforeTime: new Date(1_700_000_060_000),
      },
      after: "0",
      before: "1700000060",
    },
    {
      name: "omitted time bounds",
      filters: {},
      after: null,
      before: null,
    },
  ])("preserves $name when paging calls", async ({ filters, after, before }) => {
    const { client, requests } = createClient(
      { body: { data: [call], last_id: call.id, has_more: true } },
      { body: { data: [{ ...call, id: "second" }], has_more: false } },
    );
    const ids = [];
    for await (const result of client.voiceAgents.telephony.listCalls("voice-agent", {
      ...options,
      ...filters,
      limit: 1,
    })) {
      ids.push(result.id);
    }

    expect(ids).toEqual([call.id, "second"]);
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      const query = new URL(request.url).searchParams;
      expect(query.get("started_after")).toBe(after);
      expect(query.get("started_before")).toBe(before);
      expect(query.get("started_after_time")).toBeNull();
      expect(query.get("started_before_time")).toBeNull();
      expect(query.get("limit")).toBe("1");
      expect(request.headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    }
    expect(new URL(requests[0].url).searchParams.get("after")).toBeNull();
    expect(new URL(requests[1].url).searchParams.get("after")).toBe(call.id);
  });

  const listCases = [
    {
      name: "bindings",
      item: binding,
      list: (client: AIProjectClient) =>
        client.voiceAgents.telephony.listBindings("voice-agent", { ...options, limit: 1 }),
    },
    {
      name: "calls",
      item: call,
      list: (client: AIProjectClient) =>
        client.voiceAgents.telephony.listCalls("voice-agent", { ...options, limit: 1 }),
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

describe("agent outbound call jobs", () => {
  const input: TelephonyCallJobCreate = {
    connection_name: "outbound-connection",
    source: { type: "phone_number", value: "+15555550100" },
    destination: { type: "sip", value: "sip:help@example.com" },
    structured_inputs: { opted_in: false, count: 0, customer: { name: "Ada" }, optional: null },
    schedule: { not_before: new Date(0), expires_at: new Date(1_700_000_060_000) },
    retry_policy: { type: "fixed_interval", max_attempts: 1, interval: 0 },
  };
  const job = {
    ...input,
    schedule: { not_before: 0, expires_at: 1_700_000_060 },
    id: "job/1",
    agent_name: "voice agent",
    status: "waiting_for_retry",
    attempt_count: 1,
    next_attempt_at: 1_700_000_030,
    revision: 7,
    created_at: 0,
    updated_at: 1_700_000_000,
    campaign_name: "campaign/+",
    terminal_reason: "no_answer",
  };
  const path = "/api/projects/test-project/agents/voice%20agent/telephony_call_jobs";

  it("creates a durable job with an idempotency key and preserves nested and zero-valued inputs", async () => {
    const { client, requests } = createClient({ status: 202, body: job });
    const result = await client.voiceAgents.telephony.createCallJob(
      "voice agent",
      "retry-key/+",
      input,
      options,
    );
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe(path);
    expect(new URL(requests[0].url).searchParams.get("api-version")).toBe("v1");
    expect(requests[0].headers.get("idempotency-key")).toBe("retry-key/+");
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
    expect(requests[0].headers.get("content-type")).toContain("application/json");
    expect(JSON.parse(String(requests[0].body))).toEqual({
      ...input,
      schedule: job.schedule,
    });
    expect(result).toMatchObject({
      ...input,
      id: job.id,
      status: job.status,
      revision: 7,
      attempt_count: 1,
      next_attempt_at: new Date(1_700_000_030_000),
      created_at: new Date(0),
      updated_at: new Date(1_700_000_000_000),
      campaign_name: job.campaign_name,
      terminal_reason: "no_answer",
    });
  });

  it("gets a campaign-owned job using an encoded ID", async () => {
    const { client, requests } = createClient({ body: job });
    const result = await client.voiceAgents.telephony.getCallJob("voice agent", job.id, options);
    expect(result).toMatchObject({
      id: job.id,
      campaign_name: job.campaign_name,
      status: "waiting_for_retry",
      revision: 7,
      next_attempt_at: new Date(1_700_000_030_000),
    });
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("GET");
    expect(new URL(requests[0].url).pathname).toBe(`${path}/job%2F1`);
    expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
  });

  it.each([200, 202])(
    "cancels a job with its ETag and reads cancellation state (%s)",
    async (status) => {
      const cancellation = {
        requested_by: "test-principal",
        mode: "stop_future_attempts",
        requested_at: 1_700_000_010,
        revision: 8,
      };
      const { client, requests } = createClient({
        status,
        body: { ...job, status: "cancellation_requested", revision: 8, cancellation },
      });
      const result = await client.voiceAgents.telephony.cancelCallJob(
        "voice agent",
        job.id,
        '"revision-7"',
        options,
      );
      expect(result).toMatchObject({
        id: job.id,
        status: "cancellation_requested",
        revision: 8,
        cancellation: { ...cancellation, requested_at: new Date(1_700_000_010_000) },
      });
      expect(requests).toHaveLength(1);
      expect(requests[0].method).toBe("POST");
      expect(new URL(requests[0].url).pathname).toBe(`${path}/job%2F1:cancel`);
      expect(requests[0].headers.get("if-match")).toBe('"revision-7"');
      expect(requests[0].headers.get("foundry-features")).toBe("VoiceAgents=V1Preview");
      expect(requests[0].body).toBeUndefined();
    },
  );

  it("deletes a terminal job without a response body or an implicit cancellation", async () => {
    const { client, requests } = createClient({ status: 204 });
    await expect(
      client.voiceAgents.telephony.deleteCallJob("voice agent", job.id),
    ).resolves.toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("DELETE");
    expect(new URL(requests[0].url).pathname).toBe(`${path}/job%2F1`);
    expect(requests[0].headers.get("foundry-features")).toBeUndefined();
    expect(requests[0].body).toBeUndefined();
  });

  it.each([
    {
      name: "idempotency conflict",
      status: 409,
      code: "idempotency_key_conflict",
      invoke: (client: AIProjectClient) =>
        client.voiceAgents.telephony.createCallJob("voice agent", "retry-key/+", input, options),
    },
    {
      name: "stale cancellation ETag",
      status: 412,
      code: "etag_mismatch",
      invoke: (client: AIProjectClient) =>
        client.voiceAgents.telephony.cancelCallJob("voice agent", job.id, '"stale"', options),
    },
    {
      name: "nonterminal deletion",
      status: 409,
      code: "call_job_not_terminal",
      invoke: (client: AIProjectClient) =>
        client.voiceAgents.telephony.deleteCallJob("voice agent", job.id),
    },
  ])(
    "preserves $name errors without issuing a second mutation",
    async ({ status, code, invoke }) => {
      const { client, requests } = createClient({
        status,
        body: { error: { code, message: "The call job cannot be changed.", param: "call_job_id" } },
      });
      await expect(invoke(client)).rejects.toMatchObject({
        statusCode: status,
        details: { error: { code, param: "call_job_id" } },
      });
      expect(requests).toHaveLength(1);
    },
  );

  it("iterates and resumes nonempty job pages with campaign and lifecycle filters", async () => {
    const first = { body: { data: [job], last_id: "opaque/+cursor", has_more: true } };
    const second = { body: { data: [{ ...job, id: "second-job" }], has_more: false } };
    const { client, requests } = createClient(first, second, first, second);
    const list = (): PagedAsyncIterableIterator<TelephonyCallJob> =>
      client.voiceAgents.telephony.listCallJobs("voice agent", {
        campaignName: "campaign/+",
        status: "waiting_for_retry",
        order: "asc",
        limit: 1,
        requestOptions: { headers: { "x-test-header": "retained" } },
      });
    const ids = [];
    for await (const item of list()) {
      ids.push(item.id);
      expect(item.next_attempt_at).toEqual(new Date(1_700_000_030_000));
    }
    expect(ids).toEqual([job.id, "second-job"]);
    const page = await list().byPage().next();
    expect(page.value?.[0].id).toBe(job.id);
    expect(page.value?.continuationToken).toBeTruthy();
    const resumed = list().byPage({ continuationToken: page.value?.continuationToken });
    expect((await resumed.next()).value?.[0].id).toBe("second-job");
    expect((await resumed.next()).done).toBe(true);
    expect(requests).toHaveLength(4);
    for (const [index, request] of requests.entries()) {
      const url = new URL(request.url);
      expect(request.method).toBe("GET");
      expect(url.pathname).toBe(path);
      expect(url.searchParams.get("campaign_name")).toBe("campaign/+");
      expect(url.searchParams.get("status")).toBe("waiting_for_retry");
      expect(url.searchParams.get("order")).toBe("asc");
      expect(url.searchParams.get("limit")).toBe("1");
      expect(url.searchParams.get("after")).toBe(index % 2 ? "opaque/+cursor" : null);
      expect(request.headers.get("foundry-features")).toBeUndefined();
      expect(request.headers.get("x-test-header")).toBe("retained");
    }
  });

  it("surfaces an invalid campaign cursor on the next job page", async () => {
    const { client, requests } = createClient(
      { body: { data: [job], last_id: "old-round/+", has_more: true } },
      {
        status: 400,
        body: { error: { code: "invalid_cursor", message: "Campaign was replaced." } },
      },
    );
    const jobs = client.voiceAgents.telephony.listCallJobs("voice agent", {
      campaignName: "campaign/+",
    });
    expect((await jobs.next()).value?.id).toBe(job.id);
    await expect(jobs.next()).rejects.toMatchObject({
      statusCode: 400,
      details: { error: { code: "invalid_cursor" } },
    });
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1].url).searchParams.get("after")).toBe("old-round/+");
    expect(new URL(requests[1].url).searchParams.get("campaign_name")).toBe("campaign/+");
  });
});
