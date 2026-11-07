// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import type * as Models from "../../src/index.js";
import type {
  AgentSessionResource,
  ApiErrorResponse,
  BrowserAutomationPreviewTool,
  BrowserAutomationTool,
  BrowserAutomationToolboxTool,
  ConnectionType,
  TelephonyBinding,
  TelephonyBindingUnion,
  TelephonyBindingCreate,
  TelephonyBindingCreateUnion,
  TeamsPhoneExtensibilityTelephonyBindingCreate,
  TwilioTelephonyBindingCreate,
  SipTelephonyBindingCreate,
  TelephonyCampaign,
  TelephonyCampaignCreate,
  TelephonyCallJobCreate,
  TelephonyAddressUnion,
  DataGenerationJobConfigurationUnion,
  DataGenerationJobInputsUnion,
  DataGenerationJobType,
  EvaluationDataGenerationJobOutputConfiguration,
  ErrorModel,
  FunctionTool,
  HostedAgentDefinition,
  MisalignmentErrorDetailsResource,
  MisalignmentErrorType,
  RealtimeConversationItemMessageAssistant,
  RealtimeConversationItemMessageSystem,
  RealtimeConversationItemMessageUser,
  RealtimeServerEventConversationItemInputAudioTranscriptionCompleted,
  ReinforcementFineTuningDataGenerationJobOutputConfiguration,
  SupervisedFineTuningDataGenerationJobOutputConfiguration,
  TelephonyCallEndReason,
  TelephonyCallJob,
  TelephonyCallJobTerminalReason,
  TelephonyCallLifecycleEventReason,
  FixedIntervalRetryPolicy,
  TelephonyOutboundRetryPolicy,
  TelephonyOutboundRetryPolicyUnion,
  UpdateTelephonyBindingRequest,
  VoiceAgentInputTranscription,
  VoiceAgentDefinition,
} from "../../src/models/index.js";
import type {
  BetaRoutinesCreateOrUpdateOptionalParams,
  BetaRoutinesDeleteOptionalParams,
  BetaRoutinesDisableOptionalParams,
  BetaRoutinesDispatchOptionalParams,
  BetaRoutinesEnableOptionalParams,
  BetaRoutinesGetOptionalParams,
  BetaRoutinesListOptionalParams,
  BetaRoutinesListRunsOptionalParams,
  FoundryFeaturesOptInKeys,
  PageOrder,
  SimulationSeedDataGenerationJobConfiguration,
  TelephonyCallLifecycleEventSource,
  TelephonyProvider,
  TeamsPhoneExtensibilityTelephonyBinding,
  TeamsPhoneExtensibilityTelephonyBindingListItem,
  VoiceAgentTransport,
} from "../../src/index.js";
import {
  agentSessionResourceDeserializer,
  apiErrorDeserializer,
  apiErrorResponseDeserializer,
  telephonyBindingUnionSerializer,
  telephonyCallJobCreateSerializer,
  customToolParamDeserializer,
  customToolParamSerializer,
  dataGenerationJobConfigurationUnionDeserializer,
  dataGenerationJobConfigurationUnionSerializer,
  dataGenerationJobInputsUnionSerializer,
  dataGenerationJobUnionDeserializer,
  evaluatorGenerationArtifactsDeserializer,
  errorDeserializer,
  functionToolDeserializer,
  functionToolParamDeserializer,
  functionToolParamSerializer,
  functionToolSerializer,
  hostedAgentDefinitionDeserializer,
  hostedAgentDefinitionSerializer,
  imageGenToolDeserializer,
  imageGenToolSerializer,
  misalignmentErrorDetailsResourceDeserializer,
  realtimeConversationItemUnionDeserializer,
  realtimeConversationItemUnionSerializer,
  realtimeResponseStatusDetailsErrorDeserializer,
  realtimeResponseStatusDetailsErrorSerializer,
  realtimeServerEventConversationItemInputAudioTranscriptionCompletedDeserializer,
  realtimeServerEventConversationItemInputAudioTranscriptionCompletedSerializer,
  telephonyBindingListItemUnionDeserializer,
  telephonyBindingUnionDeserializer,
  telephonyCallJobDeserializer,
  telephonyCallLifecycleEventDeserializer,
  telephonyCallSummaryDeserializer,
  telephonyCampaignSerializer,
  telephonyCampaignDeserializer,
  telephonyOutboundRetryPolicyUnionDeserializer,
  telephonyOutboundRetryPolicyUnionSerializer,
  toolboxToolUnionDeserializer,
  toolboxToolUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
  toolFunctionToolSerializer,
  toolFunctionToolDeserializer,
  updateTelephonyBindingRequestSerializer,
  voiceAgentInputTranscriptionDeserializer,
  voiceAgentInputTranscriptionSerializer,
  voiceAgentDefinitionDeserializer,
  voiceAgentDefinitionSerializer,
  agentDefinitionUnionDeserializer,
  agentDefinitionUnionSerializer,
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
  it("requires a resolved dataset version for evaluator generation artifacts", () => {
    expectTypeOf<Models.DatasetReference["version"]>().toEqualTypeOf<string>();
    expectTypeOf<
      Models.EvaluatorGenerationArtifacts["dataset"]
    >().toEqualTypeOf<Models.DatasetReference>();
    const artifacts: Models.EvaluatorGenerationArtifacts = {
      dataset: { name: "generated-artifacts", version: "1" },
      kinds: ["spec"],
    };
    expect(evaluatorGenerationArtifactsDeserializer(artifacts)).toEqual(artifacts);
  });

  it.each([{ name: "recipients" }, { name: "recipients", version: "2" }])(
    "preserves campaign dataset resolution with reference %j",
    (reference) => {
      expectTypeOf<Models.TelephonyCampaignDatasetReference["version"]>().toEqualTypeOf<
        string | undefined
      >();
      expectTypeOf<TelephonyCampaignCreate["recipient_dataset"]>().toEqualTypeOf<
        Models.TelephonyCampaignDatasetReference | undefined
      >();
      const campaign: TelephonyCampaignCreate = {
        connection_name: connectionName,
        source: { type: "phone_number", value: "+14255550100" },
        recipient_dataset: reference,
      };
      const response = {
        ...campaign,
        name: "campaign-test",
        status: "queued",
        created_at: timestamp,
        updated_at: timestamp,
        etag: "campaign-revision",
        operation_id: "prepare-test",
        progress: {
          total_recipients: 1,
          pending: 1,
          active: 0,
          completed: 0,
          failed: 0,
          cancelled: 0,
          expired: 0,
        },
      };
      expect(toWire(telephonyCampaignSerializer(campaign))).toEqual(campaign);
      expect(toWire(telephonyCampaignDeserializer(response).recipient_dataset)).toEqual(reference);
      expect(
        toWire(
          telephonyCampaignSerializer({
            connection_name: connectionName,
            source: campaign.source,
          }),
        ),
      ).not.toHaveProperty("recipient_dataset");
      expect(
        telephonyCampaignDeserializer({ ...response, recipient_dataset: undefined })
          .recipient_dataset,
      ).toBeUndefined();
    },
  );

  it("keeps emitted tool names as aliases of the customized public contracts", () => {
    expectTypeOf<Models.ComparisonFilterValueItems>().toEqualTypeOf<string | number>();
    expectTypeOf<Models.ToolFunctionTool>().toEqualTypeOf<Models.FunctionTool>();
    expectTypeOf<Models.ToolFileSearchTool>().toEqualTypeOf<Models.FileSearchTool>();
    expectTypeOf<Models.ToolComputerTool>().toEqualTypeOf<Models.ComputerTool>();
    expectTypeOf<Models.ToolComputerUsePreviewTool>().toEqualTypeOf<Models.ComputerUsePreviewTool>();
    expectTypeOf<Models.ToolWebSearchTool>().toEqualTypeOf<Models.WebSearchTool>();
    expectTypeOf<Models.ToolMcpTool>().toEqualTypeOf<Models.MCPTool>();
    expectTypeOf<Models.ToolCodeInterpreterTool>().toEqualTypeOf<Models.CodeInterpreterTool>();
    expectTypeOf<Models.ToolProgrammaticToolCallingParam>().toEqualTypeOf<Models.ProgrammaticToolCallingParam>();
    expectTypeOf<Models.ToolImageGenTool>().toEqualTypeOf<Models.ImageGenTool>();
    expectTypeOf<Models.ToolLocalShellToolParam>().toEqualTypeOf<Models.LocalShellToolParam>();
    expectTypeOf<Models.ToolFunctionShellToolParam>().toEqualTypeOf<Models.FunctionShellToolParam>();
    expectTypeOf<Models.ToolCustomToolParam>().toEqualTypeOf<Models.CustomToolParam>();
    expectTypeOf<Models.ToolToolSearchToolParam>().toEqualTypeOf<Models.ToolSearchToolParam>();
    expectTypeOf<Models.ToolWebSearchPreviewTool>().toEqualTypeOf<Models.WebSearchPreviewTool>();
    expectTypeOf<Models.ToolApplyPatchToolParam>().toEqualTypeOf<Models.ApplyPatchToolParam>();
    const tool: Models.ToolFunctionTool = { type: "function", name: "lookup", async: false };
    expect(toolFunctionToolSerializer).toBe(functionToolSerializer);
    expect(toolFunctionToolDeserializer).toBe(functionToolDeserializer);
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    expect(toolUnionDeserializer(tool)).toMatchObject(tool);
  });

  it.each([{ include: undefined }, { include: [] }, { include: ["audio"] }] as const)(
    "round-trips both post-call destinations with include $include",
    ({ include }) => {
      const postCall: Models.VoiceAgentPostCallConfig = {
        destinations: [
          { type: "event_grid", connection_name: "post-call-events" },
          { type: "routine", name: "archive" },
        ],
        // "audio" is modeled but rejected by the service in this preview.
        include: include ? [...include] : undefined,
      };
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        store: false,
        post_call: postCall,
      };
      expect(toWire(voiceAgentDefinitionSerializer(definition))).toEqual(toWire(definition));
      expect(voiceAgentDefinitionDeserializer(definition)).toMatchObject(definition);
    },
  );

  it("omits unconfigured post-call delivery without changing storage", () => {
    const definition: VoiceAgentDefinition = { kind: "voice", store: false };
    expect(toWire(voiceAgentDefinitionSerializer(definition))).toEqual(definition);
    expect(toWire(voiceAgentDefinitionDeserializer(definition))).toEqual(definition);
  });

  it.each([undefined, "realtime"] as const)(
    "dispatches Realtime voice definitions with sub_protocol %s without losing fields",
    (subProtocol) => {
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        sub_protocol: subProtocol,
        model_type: "managed",
        model: "voice-deployment",
        output_modalities: ["text"],
        store: false,
      };
      expect(toWire(agentDefinitionUnionSerializer(definition))).toEqual(toWire(definition));
      expect(agentDefinitionUnionDeserializer(toWire(definition))).toMatchObject(definition);
    },
  );

  it("preserves explicit null turn detection for manually controlled voice input", () => {
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      sub_protocol: "realtime",
      model_type: "managed",
      model: "voice-deployment",
      audio: { input: { turn_detection: null } },
    };
    expect(toWire(agentDefinitionUnionSerializer(definition))).toEqual(definition);
    expect(agentDefinitionUnionDeserializer(toWire(definition))).toMatchObject({
      kind: "voice",
      audio: { input: { turn_detection: null } },
    });
  });

  it("dispatches Live voice definitions through their protocol and delegation serializers", () => {
    const definition: Models.VoiceAgentLiveDefinition = {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model: "live-deployment",
      store: false,
      delegation: { type: "foundry_managed_agent", agent_name: "backend", agent_version: "1" },
    };
    expect(toWire(agentDefinitionUnionSerializer(definition))).toEqual(definition);
    expect(agentDefinitionUnionDeserializer(definition)).toMatchObject(definition);
  });

  it("preserves error review targets and realtime failure messages", () => {
    const details: MisalignmentErrorDetailsResource = {
      review_target: "destination",
      detailed_explanation: "Review before sending.",
    };
    expect(misalignmentErrorDetailsResourceDeserializer(details)).toMatchObject(details);
    const failure: Models.RealtimeResponseStatusDetailsError = {
      type: "server_error",
      code: "response_failed",
      message: "Unable to complete the response.",
    };
    expect(realtimeResponseStatusDetailsErrorSerializer(failure)).toEqual(failure);
    expect(realtimeResponseStatusDetailsErrorDeserializer(failure)).toEqual(failure);
    expect(toWire(realtimeResponseStatusDetailsErrorSerializer({}))).toEqual({});
  });

  it("exports the upstream voice transports and fine-tuning preview opt-in", () => {
    expectTypeOf<VoiceAgentTransport>().toEqualTypeOf<"websocket" | "webrtc">();
    expectTypeOf<"FineTuningSessions=V1Preview">().toExtend<FoundryFeaturesOptInKeys>();
  });

  it("uses only the generated V2 routines feature flag", () => {
    expectTypeOf<
      (
        | BetaRoutinesCreateOrUpdateOptionalParams
        | BetaRoutinesDeleteOptionalParams
        | BetaRoutinesDisableOptionalParams
        | BetaRoutinesDispatchOptionalParams
        | BetaRoutinesEnableOptionalParams
        | BetaRoutinesGetOptionalParams
        | BetaRoutinesListOptionalParams
        | BetaRoutinesListRunsOptionalParams
      )["foundryFeatures"]
    >().toEqualTypeOf<"Routines=V2Preview" | undefined>();
    expectTypeOf<
      Extract<FoundryFeaturesOptInKeys, `Routines=${string}`>
    >().toEqualTypeOf<"Routines=V2Preview">();
  });

  it("uses the generated routines list parameters without backward pagination", () => {
    expectTypeOf<
      Pick<BetaRoutinesListOptionalParams, "limit" | "after" | "order">
    >().toEqualTypeOf<{
      limit?: number;
      after?: string;
      order?: PageOrder;
    }>();
    expectTypeOf<Extract<keyof BetaRoutinesListOptionalParams, "before">>().toEqualTypeOf<never>();
  });

  it("uses the generated routine-run list parameters without backward pagination", () => {
    expectTypeOf<
      Pick<BetaRoutinesListRunsOptionalParams, "filter" | "limit" | "after" | "order">
    >().toEqualTypeOf<{
      filter?: string;
      limit?: number;
      after?: string;
      order?: PageOrder;
    }>();
    expectTypeOf<
      Extract<keyof BetaRoutinesListRunsOptionalParams, "before">
    >().toEqualTypeOf<never>();
  });

  it("uses the Teams Phone extensibility discriminator on all binding shapes", () => {
    expectTypeOf<TelephonyProvider>().toEqualTypeOf<
      "teams_phone_extensibility" | "twilio" | "sip"
    >();
    expectTypeOf<
      TeamsPhoneExtensibilityTelephonyBinding["provider"]
    >().toEqualTypeOf<"teams_phone_extensibility">();
    expectTypeOf<
      TeamsPhoneExtensibilityTelephonyBindingListItem["provider"]
    >().toEqualTypeOf<"teams_phone_extensibility">();
    expectTypeOf<TelephonyCallLifecycleEventSource>().toEqualTypeOf<
      "gateway" | "teams_phone_extensibility" | "twilio" | "voice_agent"
    >();
    expect(
      telephonyCallLifecycleEventDeserializer({
        sequence: 1,
        name: "telephony.call.answer",
        source: "teams_phone_extensibility",
        outcome: "succeeded",
        observed_at: timestamp,
        timestamp_source: "provider",
      }).source,
    ).toBe("teams_phone_extensibility");
  });

  it("uses exactly the upstream data-generation discriminator values", () => {
    expectTypeOf<DataGenerationJobType>().toEqualTypeOf<
      "simple_qna" | "traces" | "tool_use" | "simulation_seed"
    >();
    expectTypeOf<
      Pick<SimulationSeedDataGenerationJobConfiguration, "max_samples">
    >().toEqualTypeOf<{ max_samples: number }>();
  });

  const generationConfigurations: DataGenerationJobConfigurationUnion[] = [
    { type: "simple_qna", max_samples: 2, question_types: ["short_answer"] },
    { type: "traces", max_samples: 3, redact_private_content: false },
    { type: "tool_use", max_samples: 4 },
    { type: "simulation_seed", max_samples: 5 },
  ];

  it.each(generationConfigurations)(
    "round-trips the renamed $type generation configuration without losing fields",
    (configuration) => {
      const input = {
        ...configuration,
        train_split: 0,
        model_options: { model: "test-model" },
      };
      expect(toWire(dataGenerationJobConfigurationUnionSerializer(input))).toEqual(input);
      expect(dataGenerationJobConfigurationUnionDeserializer(input)).toMatchObject(input);
    },
  );

  const evaluationOutput: EvaluationDataGenerationJobOutputConfiguration = {
    name: "evaluation-data",
    description: "Generated evaluation data",
    tags: { purpose: "test" },
    write_mode: "overwrite",
  };
  const supervisedOutput: SupervisedFineTuningDataGenerationJobOutputConfiguration = {
    name: "supervised.jsonl",
    write_mode: "merge",
    merge_file_id: "file-supervised",
  };
  const reinforcementOutput: ReinforcementFineTuningDataGenerationJobOutputConfiguration = {
    name: "reinforcement.jsonl",
    write_mode: "overwrite",
    merge_file_id: "file-reinforcement",
  };

  it.each([
    { scenario: "evaluation", output_configuration: evaluationOutput },
    { scenario: "supervised_finetuning_preview", output_configuration: supervisedOutput },
    { scenario: "reinforcement_finetuning_preview", output_configuration: reinforcementOutput },
  ] as const)(
    "retains renamed $scenario output configuration in requests and responses",
    (output) => {
      const input: DataGenerationJobInputsUnion = {
        ...output,
        name: "configuration-test",
        sources: [{ type: "prompt", prompt: "Generate data." }],
        generation_configuration: { type: "simple_qna", max_samples: 2 },
      };
      expect(toWire(dataGenerationJobInputsUnionSerializer(input))).toEqual(input);
      expect(
        dataGenerationJobUnionDeserializer({
          ...input,
          id: "job-1",
          status: "succeeded",
          created_at: 0,
        }),
      ).toMatchObject(input);
    },
  );

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

  const bindings: TelephonyBindingUnion[] = [
    {
      provider: "sip",
      id: "binding-test",
      incoming_call_url: "https://example.com/incoming-call",
      connection_name: connectionName,
      phone_number: "+14255550100",
      allowed_calling_numbers: ["+14255550123", "^\\+1425[0-9]+$"],
      label: "SIP binding",
    },
    {
      provider: "twilio",
      id: "binding-test",
      incoming_call_url: "https://example.com/incoming-call",
      connection_name: connectionName,
      phone_number: "+14255550100",
      label: "Twilio binding",
    },
    {
      provider: "teams_phone_extensibility",
      id: "binding-test",
      incoming_call_url: "https://example.com/incoming-call",
      connection_name: connectionName,
      resource_account_object_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      label: "Teams binding",
    },
  ];

  it.each(bindings)("uses connection_name throughout $provider binding models", (binding) => {
    const { id, incoming_call_url: incomingCallUrl, ...input } = binding;
    expect(toWire(telephonyBindingUnionSerializer(input))).toEqual(input);
    expect(toWire(telephonyBindingUnionSerializer(binding))).toEqual(input);
    const response = {
      ...binding,
      id,
      incoming_call_url: incomingCallUrl,
      etag: "binding-revision",
    };

    expect(telephonyBindingUnionDeserializer(response)).toMatchObject(binding);
    expect(telephonyBindingListItemUnionDeserializer(response)).toMatchObject(response);
    expect(telephonyBindingUnionDeserializer(response)).not.toHaveProperty("connection");
    expect(telephonyBindingListItemUnionDeserializer(response)).not.toHaveProperty("connection");
  });

  it("keeps a binding connection optional only for updates", () => {
    expectTypeOf<TelephonyBinding["connection_name"]>().toEqualTypeOf<string>();
    expectTypeOf<UpdateTelephonyBindingRequest["connection_name"]>().toEqualTypeOf<
      string | undefined
    >();
    expect(
      toWire(updateTelephonyBindingRequestSerializer({ connection_name: connectionName })),
    ).toEqual({ connection_name: connectionName });
    expect(toWire(updateTelephonyBindingRequestSerializer({}))).toEqual({});
  });

  it("separates creation inputs from required service response fields", () => {
    expectTypeOf<
      Parameters<Models.BetaVoiceAgentsTelephonyOperations["create"]>[2]
    >().toEqualTypeOf<TelephonyCampaignCreate>();
    expectTypeOf<
      Parameters<Models.BetaVoiceAgentsTelephonyOperations["createBinding"]>[1]
    >().toEqualTypeOf<TelephonyBindingCreateUnion>();
    expectTypeOf<keyof TelephonyCampaignCreate>().toEqualTypeOf<
      | "connection_name"
      | "source"
      | "recipients"
      | "recipient_dataset"
      | "schedule"
      | "retry_policy"
    >();
    expectTypeOf<keyof TelephonyBindingCreate>().toEqualTypeOf<
      "provider" | "connection_name" | "label"
    >();
    expectTypeOf<TwilioTelephonyBindingCreate["phone_number"]>().toEqualTypeOf<string>();
    expectTypeOf<
      TeamsPhoneExtensibilityTelephonyBindingCreate["resource_account_object_id"]
    >().toEqualTypeOf<string>();
    expectTypeOf<SipTelephonyBindingCreate["phone_number"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<Pick<TelephonyBinding, "id" | "incoming_call_url">>().toEqualTypeOf<{
      readonly id: string;
      readonly incoming_call_url: string;
    }>();
    expectTypeOf<
      Pick<
        TelephonyCampaign,
        "name" | "status" | "created_at" | "updated_at" | "etag" | "operation_id" | "progress"
      >
    >().toEqualTypeOf<{
      readonly name: string;
      readonly status: Models.TelephonyCampaignStatus;
      readonly created_at: Date;
      readonly updated_at: Date;
      readonly etag: string;
      readonly operation_id: string;
      readonly progress: Models.TelephonyCampaignProgress;
    }>();
  });

  it("requires connection_name and typed source on call-job requests and responses", () => {
    type Connection = { connection_name: string; source: TelephonyAddressUnion };
    expectTypeOf<
      Pick<TelephonyCallJobCreate, "connection_name" | "source">
    >().toEqualTypeOf<Connection>();
    expectTypeOf<
      Pick<TelephonyCallJob, "connection_name" | "source">
    >().toEqualTypeOf<Connection>();
    expectTypeOf<
      TelephonyCallJob["retry_policy"]
    >().toEqualTypeOf<TelephonyOutboundRetryPolicyUnion>();
    expectTypeOf<Pick<FixedIntervalRetryPolicy, "interval">>().toEqualTypeOf<{
      interval: number;
    }>();
    expectTypeOf<TelephonyOutboundRetryPolicy["max_attempts"]>().toEqualTypeOf<
      number | undefined
    >();
  });

  it.each([
    { type: "phone_number", value: "+14255550100" },
    { type: "teams", value: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" },
  ] satisfies TelephonyAddressUnion[])(
    "preserves typed outbound source $type in call jobs",
    (source) => {
      const call: TelephonyCallJobCreate = {
        destination: { type: "phone_number", value: "+14255550123" },
        connection_name: connectionName,
        source,
        structured_inputs: { customer: { name: "Ada" }, notify: false },
      };
      expect(toWire(telephonyCallJobCreateSerializer(call))).toEqual(call);
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
      const policy: FixedIntervalRetryPolicy = {
        type: "fixed_interval",
        interval,
      };
      expect(toWire(telephonyOutboundRetryPolicyUnionSerializer(policy))).toEqual(policy);
      expect(telephonyOutboundRetryPolicyUnionDeserializer(policy)).toMatchObject(policy);

      const request: TelephonyCallJobCreate = {
        destination: { type: "phone_number", value: "+14255550123" },
        connection_name: connectionName,
        source: { type: "phone_number", value: "+14255550100" },
        retry_policy: policy,
      };
      expect(toWire(telephonyCallJobCreateSerializer(request))).toEqual(request);
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
        source: { type: "phone_number", value: "+14255550100" },
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

  it.each(["masked", "unfiltered", "removed"] as const)(
    "round-trips streaming speech transcription with profanity mode %s",
    (profanityFilter) => {
      const configuration: VoiceAgentInputTranscription = {
        model: "azure-speech-streaming",
        language: "en-US",
        languages: ["en"],
        keywords: ["Foundry"],
        phrase_list: ["existing phrase"],
        custom_speech: { "en-US": "custom-deployment" },
        profanity_filter: profanityFilter,
      };
      expect(toWire(voiceAgentInputTranscriptionSerializer(configuration))).toEqual(configuration);
      expect(voiceAgentInputTranscriptionDeserializer(configuration)).toMatchObject(configuration);
    },
  );

  it("round-trips all soundscape tracks without dropping zero gain or delay", () => {
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      soundscape: {
        background: { source: { type: "built_in", name: "office" }, gain: 0 },
        working: {
          source: { type: "built_in", name: "call_center" },
          gain: 0.5,
          delay_ms: 0,
        },
        opening: { source: { type: "built_in", name: "ding1" } },
        transfer: { source: { type: "built_in", name: "ding2" } },
        closing: { source: { type: "built_in", name: "people_talking" } },
      },
      audio: { input: { noise_reduction: { type: "azure_deep_noise_suppression_headset" } } },
    };
    expect(toWire(voiceAgentDefinitionSerializer(definition))).toEqual(definition);
    expect(voiceAgentDefinitionDeserializer(definition)).toMatchObject(definition);
    const withoutSoundscape: VoiceAgentDefinition = { kind: "voice" };
    expect(toWire(voiceAgentDefinitionSerializer(withoutSoundscape))).toEqual(withoutSoundscape);
  });

  it.each([false, true])("preserves hosted memory snapshot opt-in %s", (enabled) => {
    const definition: HostedAgentDefinition = {
      kind: "hosted",
      cpu: "1",
      memory: "2Gi",
      enable_memory_snapshot: enabled,
      protocol_versions: [{ protocol: "voice_conversation_engine", version: "1.0.0" }],
    };
    expect(toWire(hostedAgentDefinitionSerializer(definition))).toEqual(definition);
    expect(hostedAgentDefinitionDeserializer(definition)).toMatchObject(definition);
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

  it.each([
    { statusCode: 401, message: "Unauthorized." },
    "Gateway unavailable.",
    { error: null },
    { error: "Access denied." },
    null,
  ])("retains nonstandard gateway error details without a decoding failure", (body) => {
    expect(apiErrorResponseDeserializer(body)).toEqual(body);
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

  it.each([
    "gpt-image-2",
    "gpt-image-2-2026-04-21",
    "gpt-image-2.5-sunburst",
    "gpt-image-2.5-sunburst-2026-09-08",
    "gpt-image-2.5-flare",
    "gpt-image-2.5-flare-2026-09-08",
  ] as const)("preserves image model %s", (model) => {
    const tool = { type: "image_generation" as const, model };
    expect(toWire(imageGenToolSerializer(tool))).toEqual(tool);
    expect(imageGenToolDeserializer(tool)).toMatchObject(tool);
  });

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
