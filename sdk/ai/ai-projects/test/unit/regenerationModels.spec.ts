// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  AgentSessionResource,
  ApiErrorResponse,
  BrowserAutomationPreviewTool,
  BrowserAutomationTool,
  BrowserAutomationToolboxTool,
  ConnectionType,
  CreateTelephonyBindingRequest,
  CreateTelephonyBindingRequestUnion,
  CreateTelephonyCallJobRequest,
  ErrorModel,
  FunctionTool,
  MisalignmentErrorDetailsResource,
  MisalignmentErrorType,
  RealtimeConversationItemMessageAssistant,
  RealtimeConversationItemMessageSystem,
  RealtimeConversationItemMessageUser,
  RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
  TelephonyCallEndReason,
  TelephonyCallJob,
  TelephonyCallJobTerminalReason,
  TelephonyCallLifecycleEventReason,
  TelephonyOutboundFixedIntervalRetryPolicy,
  TelephonyOutboundRetryPolicy,
  TelephonyOutboundRetryPolicyUnion,
  UpdateTelephonyBindingRequest,
  VoiceAgentInputTranscription,
} from "../../src/models/index.js";
import {
  agentSessionResourceDeserializer,
  apiErrorDeserializer,
  apiErrorResponseDeserializer,
  createTelephonyBindingRequestUnionSerializer,
  createTelephonyCallJobRequestSerializer,
  customToolParamDeserializer,
  customToolParamSerializer,
  errorDeserializer,
  functionToolDeserializer,
  functionToolParamDeserializer,
  functionToolParamSerializer,
  functionToolSerializer,
  imageGenToolDeserializer,
  imageGenToolSerializer,
  misalignmentErrorDetailsResourceDeserializer,
  realtimeConversationItemUnionDeserializer,
  realtimeConversationItemUnionSerializer,
  realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer,
  realtimeServerEventConversationItemInputAudioTranscriptionCompletedSerializer,
  telephonyBindingListItemUnionDeserializer,
  telephonyBindingUnionDeserializer,
  telephonyCallJobDeserializer,
  telephonyCallLifecycleEventDeserializer,
  telephonyCallSummaryDeserializer,
  telephonyOutboundRetryPolicyUnionDeserializer,
  telephonyOutboundRetryPolicyUnionSerializer,
  toolboxToolUnionDeserializer,
  toolboxToolUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
  updateTelephonyBindingRequestSerializer,
  voiceAgentInputTranscriptionDeserializer,
  voiceAgentInputTranscriptionSerializer,
  webSearchToolboxToolDeserializer,
  webSearchToolboxToolSerializer,
  webSearchToolDeserializer,
  webSearchToolSerializer,
} from "../../src/models/models.js";

function toWire(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value));
}

const timestamp = 1_789_200_000;
const connectionName = "telephony-provider";

describe("regenerated model wire contracts", () => {
  it("round-trips the GA browser automation tool through agent tool dispatch", () => {
    const tool: BrowserAutomationTool = {
      type: "browser_automation",
      browser_automation: { connection: { project_connection_id: "browser-connection" } },
    };
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    expect(toolUnionDeserializer(tool)).toEqual(tool);
  });

  it.each([undefined, "browser"])(
    "round-trips a GA browser automation toolbox tool with name %s",
    (name) => {
      const tool: BrowserAutomationToolboxTool = {
        type: "browser_automation",
        name,
        description: "Browse a website",
        browser_automation: { connection: { project_connection_id: "browser-connection" } },
      };
      expect(toWire(toolboxToolUnionSerializer(tool))).toEqual(toWire(tool));
      expect(toolboxToolUnionDeserializer(tool)).toMatchObject(tool);
    },
  );

  it("accepts the new connection types without removing existing types", () => {
    expectTypeOf<"OpenAPI" | "RemoteA2A" | "AzureOpenAI">().toExtend<ConnectionType>();
  });

  it.each([undefined, null, 0, timestamp])(
    "deserializes optional stopped_at without dropping Unix timestamp %s",
    (stoppedAt) => {
      const session = agentSessionResourceDeserializer({
        agent_session_id: "session-test",
        version_indicator: { type: "version_ref", agent_version: "1" },
        status: "idle",
        created_at: timestamp,
        last_accessed_at: timestamp,
        expires_at: timestamp + 3600,
        stopped_at: stoppedAt,
      });

      expectTypeOf<Pick<AgentSessionResource, "stopped_at">>().toEqualTypeOf<{
        readonly stopped_at?: Date;
      }>();
      expect(session.stopped_at).toEqual(
        stoppedAt === undefined || stoppedAt === null ? stoppedAt : new Date(stoppedAt * 1000),
      );
      expect(session.created_at).toEqual(new Date(timestamp * 1000));
      expect(session.expires_at).toEqual(new Date((timestamp + 3600) * 1000));
    },
  );

  const bindings: CreateTelephonyBindingRequestUnion[] = [
    {
      provider: "twilio",
      connection_name: connectionName,
      phone_number: "+14255550100",
      label: "Twilio binding",
    },
    {
      provider: "teams_phone_extension",
      connection_name: connectionName,
      resource_account_object_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      label: "Teams binding",
    },
  ];

  it.each(bindings)("uses connection_name throughout $provider binding models", (binding) => {
    expect(toWire(createTelephonyBindingRequestUnionSerializer(binding))).toEqual(binding);
    const response = {
      ...binding,
      id: "binding-test",
      status: "active",
      incoming_call_url: "https://example.com/incoming-call",
      etag: "binding-revision",
    };

    expect(telephonyBindingUnionDeserializer(response)).toMatchObject(binding);
    expect(telephonyBindingListItemUnionDeserializer(response)).toMatchObject(response);
    expect(telephonyBindingUnionDeserializer(response)).not.toHaveProperty("connection");
    expect(telephonyBindingListItemUnionDeserializer(response)).not.toHaveProperty("connection");
  });

  it("keeps a binding connection optional only for updates", () => {
    expectTypeOf<CreateTelephonyBindingRequest["connection_name"]>().toEqualTypeOf<string>();
    expectTypeOf<UpdateTelephonyBindingRequest["connection_name"]>().toEqualTypeOf<
      string | undefined
    >();
    expect(
      toWire(updateTelephonyBindingRequestSerializer({ connection_name: connectionName })),
    ).toEqual({ connection_name: connectionName });
    expect(toWire(updateTelephonyBindingRequestSerializer({}))).toEqual({});
  });

  it("requires connection_name and scalar source on call-job requests and responses", () => {
    type Connection = { connection_name: string; source: string };
    expectTypeOf<
      Pick<CreateTelephonyCallJobRequest, "connection_name" | "source">
    >().toEqualTypeOf<Connection>();
    expectTypeOf<
      Pick<TelephonyCallJob, "connection_name" | "source">
    >().toEqualTypeOf<Connection>();
    expectTypeOf<
      TelephonyCallJob["retry_policy"]
    >().toEqualTypeOf<TelephonyOutboundRetryPolicyUnion>();
    expectTypeOf<Pick<TelephonyOutboundFixedIntervalRetryPolicy, "interval">>().toEqualTypeOf<{
      interval: number;
    }>();
    expectTypeOf<TelephonyOutboundRetryPolicy["max_attempts"]>().toEqualTypeOf<
      number | undefined
    >();
  });

  it.each(["+14255550100", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"])(
    "preserves scalar outbound source %s in call jobs",
    (source) => {
      const call: CreateTelephonyCallJobRequest = {
        destination: { type: "phone_number", value: "+14255550123" },
        connection_name: connectionName,
        source,
        structured_inputs: { customer: { name: "Ada" }, notify: false },
      };
      expect(toWire(createTelephonyCallJobRequestSerializer(call))).toEqual(call);
      const job = telephonyCallJobDeserializer({
        ...call,
        id: "call-job-test",
        object: "telephony.call_job",
        agent_name: "voice-agent",
        status: "queued",
        retry_policy: { type: "fixed_interval", max_attempts: 1, interval: 0 },
        attempt_count: 0,
        revision: 1,
        created_at: timestamp,
        updated_at: timestamp,
      });
      expect(job).toMatchObject(call);
      expect(job).not.toHaveProperty("telephony_binding_id");
      expect(job.created_at).toEqual(new Date(timestamp * 1000));
    },
  );

  it.each([0, 60])(
    "uses the unified retry policy with interval %s in requests and responses",
    (interval) => {
      const policy: TelephonyOutboundFixedIntervalRetryPolicy = {
        type: "fixed_interval",
        interval,
      };
      expect(toWire(telephonyOutboundRetryPolicyUnionSerializer(policy))).toEqual(policy);
      expect(telephonyOutboundRetryPolicyUnionDeserializer(policy)).toMatchObject(policy);

      const request: CreateTelephonyCallJobRequest = {
        destination: { type: "phone_number", value: "+14255550123" },
        connection_name: connectionName,
        source: "+14255550100",
        retry_policy: policy,
      };
      expect(toWire(createTelephonyCallJobRequestSerializer(request))).toEqual(request);
      expect(
        telephonyCallJobDeserializer({
          ...request,
          id: "call-job-test",
          object: "telephony.call_job",
          agent_name: "voice-agent",
          status: "queued",
          attempt_count: 0,
          revision: 1,
          created_at: timestamp,
          updated_at: timestamp,
        }).retry_policy,
      ).toMatchObject(policy);
    },
  );

  it("keeps all three telephony reason domains open to future string codes", () => {
    const endReason: TelephonyCallEndReason = "future_call_end_reason";
    const eventReason: TelephonyCallLifecycleEventReason = "future_event_reason";
    const terminalReason: TelephonyCallJobTerminalReason = "future_job_reason";

    expect(
      telephonyCallSummaryDeserializer({
        id: "call-test",
        provider: "twilio",
        status: "success",
        phase: "completed",
        started_at: timestamp,
        end_reason: endReason,
      }).end_reason,
    ).toBe(endReason);
    expect(
      telephonyCallLifecycleEventDeserializer({
        sequence: 1,
        name: "telephony.call.disconnect",
        source: "gateway",
        outcome: "observed",
        observed_at: timestamp,
        timestamp_source: "provider",
        reason: eventReason,
      }).reason,
    ).toBe(eventReason);
    expect(
      telephonyCallJobDeserializer({
        destination: { type: "phone_number", value: "+14255550123" },
        connection_name: connectionName,
        source: "+14255550100",
        id: "call-job-test",
        object: "telephony.call_job",
        agent_name: "voice-agent",
        status: "queued",
        retry_policy: { type: "fixed_interval", max_attempts: 1, interval: 0 },
        attempt_count: 0,
        terminal_reason: terminalReason,
        revision: 1,
        created_at: timestamp,
        updated_at: timestamp,
      }).terminal_reason,
    ).toBe(terminalReason);
  });

  const messages: Array<
    | RealtimeConversationItemMessageSystem
    | RealtimeConversationItemMessageUser
    | RealtimeConversationItemMessageAssistant
  > = [
    {
      type: "message",
      role: "system",
      content: [{ type: "input_text", text: "Answer concisely." }],
    },
    {
      type: "message",
      role: "user",
      content: [
        { type: "input_text", text: "Describe the image." },
        { type: "input_audio", audio: "AQID", transcript: "Describe the image." },
        { type: "input_image", image_url: "https://example.com/image.png", detail: "high" },
      ],
    },
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: "A landscape." },
        { type: "output_audio", audio: "BAUG", transcript: "A landscape." },
      ],
    },
  ];

  it.each(messages)("dispatches $role messages without dropping content or metadata", (message) => {
    const input = { ...message, created_at: new Date(0), response_id: "response-test" };
    expect(toWire(realtimeConversationItemUnionSerializer(input))).toEqual(message);
    expect(
      realtimeConversationItemUnionDeserializer({
        ...message,
        created_at: 0,
        response_id: "response-test",
      }),
    ).toMatchObject(input);
    expect(realtimeConversationItemUnionDeserializer(message)).toMatchObject(message);
  });

  it("preserves empty message content arrays for every sender role", () => {
    for (const message of messages) {
      const empty = { ...message, content: [] };
      expect(toWire(realtimeConversationItemUnionSerializer(empty))).toEqual(empty);
      expect(realtimeConversationItemUnionDeserializer(empty)).toMatchObject(empty);
    }
  });

  it("retains transcription languages and keywords alongside existing speech settings", () => {
    const configuration: VoiceAgentInputTranscription = {
      model: "gpt-4o-transcribe",
      languages: ["en", "fr"],
      keywords: ["Foundry", "TypeSpec"],
      phrase_list: ["existing phrase"],
      custom_speech: { "en-US": "custom-deployment" },
    };
    expect(toWire(voiceAgentInputTranscriptionSerializer(configuration))).toEqual(configuration);
    expect(voiceAgentInputTranscriptionDeserializer(configuration)).toMatchObject(configuration);
  });

  it.each([{ languages: [{ code: "en" }, { code: "fr" }] }, { languages: [] }])(
    "retains detected transcription languages $languages",
    ({ languages }) => {
      const event: RealtimeServerEventConversationItemInputAudioTranscriptionCompleted = {
        type: "conversation.item.input_audio_transcription.completed",
        event_id: "event-test",
        item_id: "item-test",
        content_index: 0,
        transcript: "Hello",
        languages,
        usage: { type: "duration", seconds: 1 },
      };
      expect(
        toWire(
          realtimeServerEventConversationItemInputAudioTranscriptionCompletedSerializer(event),
        ),
      ).toEqual(event);
      expect(
        realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer(event),
      ).toMatchObject(event);
    },
  );

  it("preserves recursive ErrorModel details through canonical and compatible helpers", () => {
    const error: ErrorModel = {
      code: "action_blocked",
      message: "Review the requested action.",
      param: "tool",
      type: "request_error",
      misalignment: {
        error_type: "potentially_unintended_data_transfer",
        detailed_explanation: "Review the requested destination.",
        steer: { message: "Confirm the destination before continuing." },
      },
      details: [
        {
          code: "nested_error",
          message: "Nested detail.",
          param: "destination",
          misalignment: { error_type: "future_nested_classification" },
        },
      ],
      additionalInfo: { policy: { id: "policy-test" } },
      debugInfo: { retryable: false },
    };
    expectTypeOf<ApiErrorResponse["error"]>().toEqualTypeOf<ErrorModel>();
    expect(errorDeserializer(error)).toMatchObject(error);
    expect(apiErrorDeserializer(error)).toEqual(errorDeserializer(error));
    expect(apiErrorResponseDeserializer({ error })).toMatchObject({ error });
    expect(errorDeserializer({ code: "minimal", message: "Minimal error." })).toMatchObject({
      code: "minimal",
      message: "Minimal error.",
    });
  });

  it.each(["potentially_unintended_data_access", "future_service_classification"])(
    "preserves extensible misalignment classification %s",
    (value) => {
      const errorType: MisalignmentErrorType = value;
      const details: MisalignmentErrorDetailsResource = { error_type: errorType };
      expect(misalignmentErrorDetailsResourceDeserializer(details)).toMatchObject(details);
      expect(toWire(misalignmentErrorDetailsResourceDeserializer({}))).toEqual({});
      expect(
        errorDeserializer({
          code: "action_blocked",
          message: "Review the requested action.",
          misalignment: details,
        }).misalignment,
      ).toMatchObject(details);
    },
  );

  it.each([false, true])("preserves async=%s on function and custom tools", (async) => {
    const tool: FunctionTool = { type: "function", name: "lookup", async };
    expectTypeOf<FunctionTool["parameters"]>().toEqualTypeOf<Record<string, unknown> | undefined>();
    expectTypeOf<FunctionTool["strict"]>().toEqualTypeOf<boolean | undefined>();
    expect(toWire(functionToolSerializer(tool))).toEqual(tool);
    expect(functionToolDeserializer(tool)).toMatchObject(tool);
    expect(toWire(functionToolParamSerializer(tool))).toEqual(tool);
    expect(functionToolParamDeserializer(tool)).toMatchObject(tool);
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    const custom = { type: "custom" as const, name: "lookup", async };
    expect(toWire(customToolParamSerializer(custom))).toEqual(custom);
    expect(customToolParamDeserializer(custom)).toMatchObject(custom);
  });

  it.each(["gpt-image-2", "gpt-image-2-2026-04-21"] as const)(
    "preserves image model %s",
    (model) => {
      const tool = { type: "image_generation" as const, model };
      expect(toWire(imageGenToolSerializer(tool))).toEqual(tool);
      expect(imageGenToolDeserializer(tool)).toMatchObject(tool);
    },
  );

  it("retains preview browser automation and its shared parameters after stable-model removal", () => {
    const tool: BrowserAutomationPreviewTool = {
      type: "browser_automation_preview",
      browser_automation_preview: {
        connection: { project_connection_id: "browser-connection-test" },
      },
    };
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    expect(toolUnionDeserializer(tool)).toMatchObject(tool);
    expect(toWire(toolboxToolUnionSerializer(tool))).toEqual(tool);
    expect(toolboxToolUnionDeserializer(tool)).toMatchObject(tool);
  });

  it("forwards explicit offline web search on agent and toolbox tools", () => {
    const tool = { type: "web_search" as const, external_web_access: false };
    expect(toWire(webSearchToolSerializer(tool))).toEqual(tool);
    expect(webSearchToolDeserializer(tool)).toMatchObject(tool);
    expect(toWire(webSearchToolboxToolSerializer(tool))).toEqual(tool);
    expect(webSearchToolboxToolDeserializer(tool)).toMatchObject(tool);
  });
});
