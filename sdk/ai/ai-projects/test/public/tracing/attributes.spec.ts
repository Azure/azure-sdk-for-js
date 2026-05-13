// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { TracingSpan } from "@azure/core-tracing";
import { enableGenAITracing } from "../../../src/tracing/configuration.js";
import {
  setCommonAttributes,
  setAgentAttributes,
  setAgentVersionAttributes,
  setDefinitionAttributes,
  setResponseAttributes,
  setErrorAttributes,
} from "../../../src/tracing/attributes.js";
import {
  GEN_AI_OPERATION_NAME,
  GEN_AI_PROVIDER_NAME,
  AZ_NAMESPACE,
  AZ_NAMESPACE_VALUE,
  AGENTS_PROVIDER,
  SERVER_ADDRESS,
  SERVER_PORT,
  GEN_AI_AGENT_ID,
  GEN_AI_AGENT_NAME,
  GEN_AI_AGENT_DESCRIPTION,
  GEN_AI_AGENT_VERSION,
  GEN_AI_AGENT_TYPE,
  GEN_AI_AGENT_HOSTED_CPU,
  GEN_AI_AGENT_HOSTED_MEMORY,
  GEN_AI_AGENT_HOSTED_IMAGE,
  GEN_AI_AGENT_HOSTED_PROTOCOL,
  GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_REQUEST_REASONING_EFFORT,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOP_P,
  GEN_AI_RESPONSE_MODEL,
  GEN_AI_RESPONSE_ID,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  GEN_AI_AGENT_WORKFLOW_EVENT,
  GEN_AI_EVENT_CONTENT,
  ERROR_TYPE,
} from "../../../src/tracing/constants.js";

// Simple mock span that collects attributes and events
interface RecordedEvent {
  name: string;
  options?: { attributes?: Record<string, unknown> };
}

function createMockSpan(): TracingSpan & {
  attributes: Record<string, unknown>;
  events: RecordedEvent[];
} {
  const attributes: Record<string, unknown> = {};
  const events: RecordedEvent[] = [];
  return {
    attributes,
    events,
    setAttribute(name: string, value: unknown) {
      attributes[name] = value;
    },
    setStatus(_status: { status: string; error?: string }) {
      // no-op for tests
    },
    end() {
      // no-op for tests
    },
    isRecording() {
      return true;
    },
    addEvent(name: string, options?: { attributes?: Record<string, unknown> }) {
      events.push({ name, options });
    },
  } as any;
}

// Save and restore env vars around each test
let savedContentEnv: string | undefined;

function enableContentRecording(): void {
  enableGenAITracing({ experimental: true, contentRecording: true });
}

function disableContentRecording(): void {
  enableGenAITracing({ experimental: true, contentRecording: false });
}

describe("setCommonAttributes", () => {
  it("sets operation name, az.namespace, provider, and server address", () => {
    const span = createMockSpan();
    setCommonAttributes(span, "create_agent", "https://myendpoint.services.ai.azure.com");

    assert.equal(span.attributes[GEN_AI_OPERATION_NAME], "create_agent");
    assert.equal(span.attributes[AZ_NAMESPACE], AZ_NAMESPACE_VALUE);
    assert.equal(span.attributes[GEN_AI_PROVIDER_NAME], AGENTS_PROVIDER);
    assert.equal(span.attributes[SERVER_ADDRESS], "myendpoint.services.ai.azure.com");
  });

  it("sets server port when non-443", () => {
    const span = createMockSpan();
    setCommonAttributes(span, "create_agent", "https://myendpoint.com:8443");

    assert.equal(span.attributes[SERVER_ADDRESS], "myendpoint.com");
    assert.equal(span.attributes[SERVER_PORT], 8443);
  });

  it("does not set server port for 443", () => {
    const span = createMockSpan();
    setCommonAttributes(span, "create_agent", "https://myendpoint.com:443");

    assert.equal(span.attributes[SERVER_ADDRESS], "myendpoint.com");
    assert.notProperty(span.attributes, SERVER_PORT);
  });

  it("handles invalid URL gracefully", () => {
    const span = createMockSpan();
    setCommonAttributes(span, "create_agent", "not-a-url");

    assert.equal(span.attributes[GEN_AI_OPERATION_NAME], "create_agent");
    assert.notProperty(span.attributes, SERVER_ADDRESS);
  });
});

describe("setAgentAttributes", () => {
  it("sets agent id as name:version", () => {
    const span = createMockSpan();
    setAgentAttributes(span, {
      name: "MyAgent",
      versions: { latest: { name: "MyAgent", version: "3", definition: { kind: "prompt", model: "gpt-4" } } },
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_ID], "MyAgent:3");
    assert.equal(span.attributes[GEN_AI_AGENT_NAME], "MyAgent");
    assert.equal(span.attributes[GEN_AI_AGENT_VERSION], "3");
    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "prompt");
  });

  it("sets agent id as just name when no version", () => {
    const span = createMockSpan();
    setAgentAttributes(span, {
      name: "MyAgent",
      versions: { latest: { name: "MyAgent", version: undefined, definition: { kind: "prompt" } } },
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_ID], "MyAgent");
  });
});

describe("setDefinitionAttributes", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  it("always sets model for prompt agents regardless of content recording", () => {
    disableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "prompt",
      model: "gpt-4.1",
      instructions: "You are helpful",
    } as any);

    assert.equal(span.attributes[GEN_AI_REQUEST_MODEL], "gpt-4.1");
  });

  it("sets instructions with content when recording enabled", () => {
    enableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "prompt",
      model: "gpt-4.1",
      instructions: "You are helpful",
    } as any);

    const parsed = JSON.parse(span.attributes[GEN_AI_SYSTEM_MESSAGE] as string);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].type, "text");
    assert.equal(parsed[0].content, "You are helpful");
  });

  it("sets instructions without content when recording disabled", () => {
    disableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "prompt",
      model: "gpt-4.1",
      instructions: "You are helpful",
    } as any);

    const parsed = JSON.parse(span.attributes[GEN_AI_SYSTEM_MESSAGE] as string);
    assert.lengthOf(parsed, 1);
    assert.equal(parsed[0].type, "text");
    assert.notProperty(parsed[0], "content");
  });

  it("sets temperature and top_p only when content recording enabled", () => {
    enableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "prompt",
      model: "gpt-4.1",
      temperature: 0.7,
      top_p: 0.9,
    } as any);

    assert.equal(span.attributes[GEN_AI_REQUEST_TEMPERATURE], "0.7");
    assert.equal(span.attributes[GEN_AI_REQUEST_TOP_P], "0.9");
  });

  it("does not set temperature/top_p when content recording disabled", () => {
    disableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "prompt",
      model: "gpt-4.1",
      temperature: 0.7,
      top_p: 0.9,
    } as any);

    assert.notProperty(span.attributes, GEN_AI_REQUEST_TEMPERATURE);
    assert.notProperty(span.attributes, GEN_AI_REQUEST_TOP_P);
  });

  it("handles null definition gracefully", () => {
    const span = createMockSpan();
    setDefinitionAttributes(span, null as any);
    assert.isEmpty(span.attributes);
  });
});

describe("setResponseAttributes", () => {
  it("sets all response attributes", () => {
    const span = createMockSpan();
    setResponseAttributes(span, {
      id: "resp_123",
      model: "gpt-4.1",
      usage: { input_tokens: 50, output_tokens: 100 },
    });

    assert.equal(span.attributes[GEN_AI_RESPONSE_ID], "resp_123");
    assert.equal(span.attributes[GEN_AI_RESPONSE_MODEL], "gpt-4.1");
    assert.equal(span.attributes[GEN_AI_USAGE_INPUT_TOKENS], 50);
    assert.equal(span.attributes[GEN_AI_USAGE_OUTPUT_TOKENS], 100);
  });

  it("handles missing optional fields", () => {
    const span = createMockSpan();
    setResponseAttributes(span, {});

    assert.notProperty(span.attributes, GEN_AI_RESPONSE_ID);
    assert.notProperty(span.attributes, GEN_AI_RESPONSE_MODEL);
    assert.notProperty(span.attributes, GEN_AI_USAGE_INPUT_TOKENS);
  });
});

describe("setErrorAttributes", () => {
  it("sets error type from Error instance", () => {
    const span = createMockSpan();
    setErrorAttributes(span, new TypeError("bad input"));
    assert.equal(span.attributes[ERROR_TYPE], "TypeError");
  });

  it("sets generic error type for non-Error values", () => {
    const span = createMockSpan();
    setErrorAttributes(span, "something went wrong");
    assert.equal(span.attributes[ERROR_TYPE], "Error");
  });
});

// ---- Hosted agent definition ----

describe("setDefinitionAttributes - hosted agent", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  it("sets all hosted attributes regardless of content recording", () => {
    disableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      image: "myregistry.azurecr.io/myapp:latest",
      container_protocol_versions: [{ protocol: "responses", version: "1.0.0" }],
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "hosted");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_CPU], "0.5");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_MEMORY], "1Gi");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_IMAGE], "myregistry.azurecr.io/myapp:latest");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_PROTOCOL], "responses");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION], "1.0.0");
  });

  it("hosted attributes are NOT gated by content recording (content ON produces same result)", () => {
    enableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      image: "myregistry.azurecr.io/myapp:latest",
      container_protocol_versions: [{ protocol: "responses", version: "1.0.0" }],
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_CPU], "0.5");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_MEMORY], "1Gi");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_IMAGE], "myregistry.azurecr.io/myapp:latest");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_PROTOCOL], "responses");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION], "1.0.0");
  });

  it("handles missing protocol versions gracefully", () => {
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      image: "myregistry.azurecr.io/myapp:latest",
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_CPU], "0.5");
    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_PROTOCOL);
    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION);
  });

  it("handles empty protocol versions array gracefully", () => {
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "hosted",
      cpu: "0.5",
      container_protocol_versions: [],
    } as any);

    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_PROTOCOL);
    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_PROTOCOL_VERSION);
  });

  it("does not set hosted attributes that are missing", () => {
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "hosted",
      image: "myapp:latest",
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "hosted");
    assert.equal(span.attributes[GEN_AI_AGENT_HOSTED_IMAGE], "myapp:latest");
    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_CPU);
    assert.notProperty(span.attributes, GEN_AI_AGENT_HOSTED_MEMORY);
  });
});

// ---- Workflow agent definition ----

describe("setDefinitionAttributes - workflow agent", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  const sampleWorkflow = "triggers:\n  - type: OnConversationStart\nactions:\n  - type: InvokeAzureAgent";

  it("emits gen_ai.agent.workflow event with CSDL when content recording ON", () => {
    enableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "workflow",
      workflow: sampleWorkflow,
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "workflow");
    assert.lengthOf(span.events, 1);
    assert.equal(span.events[0]!.name, GEN_AI_AGENT_WORKFLOW_EVENT);

    const eventContent = JSON.parse(
      span.events[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.lengthOf(eventContent, 1);
    assert.equal(eventContent[0].type, "workflow");
    assert.equal(eventContent[0].content, sampleWorkflow);
  });

  it("emits gen_ai.agent.workflow event with empty array when content recording OFF", () => {
    disableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "workflow",
      workflow: sampleWorkflow,
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "workflow");
    assert.lengthOf(span.events, 1);
    assert.equal(span.events[0]!.name, GEN_AI_AGENT_WORKFLOW_EVENT);

    const eventContent = JSON.parse(
      span.events[0]!.options!.attributes![GEN_AI_EVENT_CONTENT] as string,
    );
    assert.lengthOf(eventContent, 0, "workflow CSDL must not leak when content recording is off");
  });

  it("sets provider name in workflow event attributes", () => {
    enableContentRecording();
    const span = createMockSpan();
    setDefinitionAttributes(span, {
      kind: "workflow",
      workflow: sampleWorkflow,
    } as any);

    assert.equal(
      span.events[0]!.options!.attributes![GEN_AI_PROVIDER_NAME],
      AGENTS_PROVIDER,
    );
  });
});

// ---- setAgentVersionAttributes ----

describe("setAgentVersionAttributes", () => {
  beforeEach(() => {
    savedContentEnv = process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
  });

  afterEach(() => {
    if (savedContentEnv === undefined) {
      delete process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT;
    } else {
      process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = savedContentEnv;
    }
  });

  it("sets agent.id, agent.name, agent.version, and agent.type", () => {
    const span = createMockSpan();
    setAgentVersionAttributes(span, {
      name: "MyAgent",
      version: "5",
      definition: { kind: "prompt", model: "gpt-4.1" },
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_ID], "MyAgent:5");
    assert.equal(span.attributes[GEN_AI_AGENT_NAME], "MyAgent");
    assert.equal(span.attributes[GEN_AI_AGENT_VERSION], "5");
    assert.equal(span.attributes[GEN_AI_AGENT_TYPE], "prompt");
  });

  it("sets description only when content recording is ON", () => {
    enableContentRecording();
    const span = createMockSpan();
    setAgentVersionAttributes(span, {
      name: "MyAgent",
      version: "1",
      description: "A helpful agent",
      definition: { kind: "prompt", model: "gpt-4.1" },
    } as any);

    assert.equal(span.attributes[GEN_AI_AGENT_DESCRIPTION], "A helpful agent");
  });

  it("does NOT set description when content recording is OFF (privacy)", () => {
    disableContentRecording();
    const span = createMockSpan();
    setAgentVersionAttributes(span, {
      name: "MyAgent",
      version: "1",
      description: "A helpful agent",
      definition: { kind: "prompt", model: "gpt-4.1" },
    } as any);

    assert.notProperty(span.attributes, GEN_AI_AGENT_DESCRIPTION,
      "agent description must not leak when content recording is off");
  });

  it("sets reasoning effort only when content recording is ON", () => {
    enableContentRecording();
    const span = createMockSpan();
    setAgentVersionAttributes(span, {
      name: "MyAgent",
      version: "1",
      definition: { kind: "prompt", model: "gpt-4.1", reasoning: { effort: "high" } },
    } as any);

    assert.equal(span.attributes[GEN_AI_REQUEST_REASONING_EFFORT], "high");
  });

  it("does NOT set reasoning effort when content recording is OFF", () => {
    disableContentRecording();
    const span = createMockSpan();
    setAgentVersionAttributes(span, {
      name: "MyAgent",
      version: "1",
      definition: { kind: "prompt", model: "gpt-4.1", reasoning: { effort: "high" } },
    } as any);

    assert.notProperty(span.attributes, GEN_AI_REQUEST_REASONING_EFFORT);
  });
});
