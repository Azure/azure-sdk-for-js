// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { TracingSpan } from "@azure/core-tracing";
import {
  setCommonAttributes,
  setAgentAttributes,
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
  GEN_AI_AGENT_VERSION,
  GEN_AI_AGENT_TYPE,
  GEN_AI_REQUEST_MODEL,
  GEN_AI_SYSTEM_MESSAGE,
  GEN_AI_REQUEST_TEMPERATURE,
  GEN_AI_REQUEST_TOP_P,
  GEN_AI_RESPONSE_MODEL,
  GEN_AI_RESPONSE_ID,
  GEN_AI_USAGE_INPUT_TOKENS,
  GEN_AI_USAGE_OUTPUT_TOKENS,
  ERROR_TYPE,
} from "../../../src/tracing/constants.js";

// Simple mock span that collects attributes
function createMockSpan(): TracingSpan & { attributes: Record<string, unknown> } {
  const attributes: Record<string, unknown> = {};
  return {
    attributes,
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
  } as any;
}

// Save and restore env vars around each test
let savedContentEnv: string | undefined;

function enableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "true";
}

function disableContentRecording(): void {
  process.env.OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT = "false";
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
      versions: { latest: { version: "3", definition: { kind: "prompt", model: "gpt-4" } } },
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
      versions: { latest: { version: undefined, definition: { kind: "prompt" } } },
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
