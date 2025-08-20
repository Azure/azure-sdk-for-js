// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecorder, createModelClient } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { context } from "@opentelemetry/api";
import type {
  ChatCompletionsOutput,
  ChatRequestMessage,
  ChatRequestToolMessage,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  ModelClient,
} from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import type {
  AddEventOptions,
  Instrumenter,
  InstrumenterSpanOptions,
  SpanStatus,
  TracingContext,
  TracingSpan,
  TracingSpanOptions,
} from "@azure/core-tracing";
import { useInstrumenter } from "@azure/core-tracing";

describe("tracing test suite", { skip: true }, () => {
  let recorder: Recorder;
  let client: ModelClient;
  let instrumenter: MockInstrumenter;

  const getCurrentWeather = {
    name: "get_current_weather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The city and state, e.g. San Francisco, CA",
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
        },
      },
      required: ["location"],
    },
  };

  const getWeatherFunc = (location: string, unit: string): string => {
    if (unit !== "celsius") {
      unit = "fahrenheit";
    }
    return `The temperature in ${location} is 72 degrees ${unit}`;
  };

  const updateToolCalls = (toolCallArray: Array<any>, functionArray: Array<any>): void => {
    const dummyFunction = { name: "", arguments: "", id: "" };
    while (functionArray.length < toolCallArray.length) {
      functionArray.push(dummyFunction);
    }

    let index = 0;
    for (const toolCall of toolCallArray) {
      if (toolCall.function.name) {
        functionArray[index].name = toolCall.function.name;
      }
      if (toolCall.id) {
        functionArray[index].id = toolCall.id;
      }
      if (toolCall.function.arguments) {
        functionArray[index].arguments += toolCall.function.arguments;
      }
      index++;
    }
  };

  const handleToolCalls = (
    functionArray: Array<any>,
  ): {
    role: string;
    content: string;
    tool_call_id: any;
    name: any;
  }[] => {
    const messageArray = [];
    for (const func of functionArray) {
      const funcArgs = JSON.parse(func.arguments);
      let content = "";

      switch (func.name) {
        case "get_current_weather":
          content = getWeatherFunc(funcArgs.location, funcArgs.unit ?? "fahrenheit");
          messageArray.push({
            role: "tool",
            content,
            tool_call_id: func.id,
            name: func.name,
          });
          break;

        default:
          throw new Error(`unknown function ${func.name}`);
          break;
      }
    }
    return messageArray;
  };

  async function callPost(): Promise<{
    messages: ChatRequestMessage[];
    response: GetChatCompletions200Response | GetChatCompletionsDefaultResponse | undefined;
  }> {
    let toolCallAnswer = "";
    let awaitingToolCallAnswer = true;
    const messages: ChatRequestMessage[] = [
      {
        role: "user",
        content: "What's the weather like in Boston?",
      },
      {
        role: "assistant",
        tool_calls: [
          {
            function: {
              arguments: '{"location":"Boston, MA"}',
              name: "get_current_weather",
            },
            id: "call_YZo4xi315MOSB4pt450S2nyR",
            type: "function",
          },
        ],
      },
      {
        role: "tool",
        content: "The temperature in Boston, MA is 72 degrees fahrenheit",
        tool_call_id: "call_YZo4xi315MOSB4pt450S2nyR",
      },
    ];

    let response: GetChatCompletions200Response | GetChatCompletionsDefaultResponse | undefined;
    while (awaitingToolCallAnswer) {
      response = await client.path("/chat/completions").post({
        body: {
          messages,
          tools: [
            {
              type: "function",
              function: getCurrentWeather,
            },
          ],
        },
        tracingOptions: { tracingContext: context.active() },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      const stream = response.body;
      if (!stream) {
        throw new Error("The response stream is undefined");
      }

      if (response.status !== "200") {
        throw new Error("Failed to get chat completions.");
      }

      const functionArray: Array<any> = [];

      for (const choice of response.body.choices) {
        const toolCallArray = choice.message?.tool_calls;

        if (toolCallArray) {
          if (toolCallArray[0].function?.name) {
            // Include original response from assistant requesting tool call in chat history
            choice.message.role = "assistant";
            messages.push(choice.message);
          }
          updateToolCalls(toolCallArray, functionArray);
        }
        if (choice.finish_reason === "tool_calls") {
          const messageArray = handleToolCalls(functionArray);
          messages.push(...messageArray);
        } else {
          if (choice.message?.content && choice.message.content !== "") {
            toolCallAnswer += choice.message?.content;
            awaitingToolCallAnswer = false;
          }
        }
      }
    }
    return { messages, response };
  }

  beforeEach(async (recordCOntext) => {
    recorder = await createRecorder(recordCOntext);
    client = await createModelClient("completions", recorder);
    instrumenter = new MockInstrumenter();
    useInstrumenter(instrumenter);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("client test", () => {
    assert.isNotNull(client);
    assert.isNotNull(client.path);
    assert.isNotNull(client.pipeline);
  });

  it("tracing should work", async () => {
    env["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"] = "true";

    const { messages, response } = await callPost();

    assert.isDefined(response);

    const createdSpan = instrumenter.createdSpans.get("chat");
    if (!createdSpan) {
      assert.fail("expected span to be created");
    }

    const mockSpan = createdSpan;
    assert.isTrue(mockSpan.endCalled, "expected span to be ended");
    assert.equal(mockSpan.name, "chat");
    assert.equal(mockSpan.getAttribute("az.namespace"), "Microsoft.CognitiveServices");
    assert.isTrue(mockSpan.getAttribute("server.address")?.toString().endsWith("azure.com"));
    assert.equal(mockSpan.getAttribute("server.port"), undefined);
    assert.equal(mockSpan.getAttribute("gen_ai.operation.name"), "chat");
    assert.equal(mockSpan.getAttribute("gen_ai.system"), "az.ai.inference");
    assert.equal(mockSpan.getAttribute("error.type"), undefined);
    assert.equal(mockSpan.getAttribute("gen_ai.response.finish_reasons"), "stop");
    assert.equal(
      mockSpan.getAttribute("gen_ai.response.id"),
      (response?.body as ChatCompletionsOutput).id,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.response.model"),
      (response?.body as ChatCompletionsOutput).model,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.usage.input_tokens"),
      (response?.body as ChatCompletionsOutput).usage.prompt_tokens,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.usage.output_tokens"),
      (response?.body as ChatCompletionsOutput).usage.completion_tokens,
    );
    assert.equal(mockSpan.events.size, 4);

    const userMessageEvent = mockSpan.events.get("gen_ai.user.message");
    assert.isDefined(userMessageEvent);
    assert.deepEqual(userMessageEvent, {
      name: "gen_ai.user.message",
      options: {
        attributes: {
          "gen_ai.system": "az.ai.inference",
          "gen_ai.event.content": '{"content":"What\'s the weather like in Boston?"}',
        },
      },
    });
    const tooCallId = (messages.find((msg) => msg.role === "tool") as ChatRequestToolMessage)
      .tool_call_id;

    const assistantMessageEvent = mockSpan.events.get("gen_ai.assistant.message");
    assert.isDefined(tooCallId);

    assert.isDefined(assistantMessageEvent);
    assert.equal(assistantMessageEvent?.name, "gen_ai.assistant.message");
    assert.equal(
      (assistantMessageEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls.length,
      1,
    );
    assert.equal(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].id,
      tooCallId,
    );
    assert.isNotEmpty(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].function.name,
    );
    assert.isNotEmpty(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].function.arguments,
    );

    const toolMessageEvent = mockSpan.events.get("gen_ai.tool.message");
    assert.isDefined(toolMessageEvent);
    assert.isDefined(toolMessageEvent?.name, "gen_ai.tool.message");
    assert.equal(
      (toolMessageEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (toolMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).id,
      tooCallId,
    );
    assert.isNotEmpty(
      JSON.parse(
        (toolMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).content,
    );

    const choiceEvent = mockSpan.events.get("gen_ai.choice");
    assert.isDefined(choiceEvent);
    assert.equal(choiceEvent?.name, "gen_ai.choice");
    assert.equal(
      (choiceEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).finish_reason,
      "stop",
    );
    assert.equal(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).index,
      0,
    );
    assert.isNotEmpty(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).message.content,
    );
  });

  it("tracing with CONTENT_RECORDING_ENABLED false", async () => {
    delete env["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"];

    const { messages, response } = await callPost();

    assert.isDefined(response);

    const createdSpan = instrumenter.createdSpans.get("chat");
    if (!createdSpan) {
      assert.fail("expected span to be created");
    }

    const mockSpan = createdSpan;
    assert.isTrue(mockSpan.endCalled, "expected span to be ended");
    assert.equal(mockSpan.name, "chat");
    assert.equal(mockSpan.getAttribute("az.namespace"), "Microsoft.CognitiveServices");
    assert.isTrue(mockSpan.getAttribute("server.address")?.toString().endsWith("azure.com"));
    assert.equal(mockSpan.getAttribute("server.port"), undefined);
    assert.equal(mockSpan.getAttribute("gen_ai.operation.name"), "chat");
    assert.equal(mockSpan.getAttribute("gen_ai.system"), "az.ai.inference");
    assert.equal(
      mockSpan.getAttribute("gen_ai.response.id"),
      (response?.body as ChatCompletionsOutput).id,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.response.model"),
      (response?.body as ChatCompletionsOutput).model,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.usage.input_tokens"),
      (response?.body as ChatCompletionsOutput).usage.prompt_tokens,
    );
    assert.equal(
      mockSpan.getAttribute("gen_ai.usage.output_tokens"),
      (response?.body as ChatCompletionsOutput).usage.completion_tokens,
    );
    assert.equal(mockSpan.events.size, 4);

    const userMessageEvent = mockSpan.events.get("gen_ai.user.message");
    assert.isDefined(userMessageEvent);
    assert.deepEqual(userMessageEvent, {
      name: "gen_ai.user.message",
      options: {
        attributes: {
          "gen_ai.system": "az.ai.inference",
          "gen_ai.event.content": '{"content":""}',
        },
      },
    });
    const tooCallId = (messages.find((msg) => msg.role === "tool") as ChatRequestToolMessage)
      .tool_call_id;

    const assistantMessageEvent = mockSpan.events.get("gen_ai.assistant.message");
    assert.isDefined(tooCallId);

    assert.isDefined(assistantMessageEvent);
    assert.equal(assistantMessageEvent?.name, "gen_ai.assistant.message");
    assert.equal(
      (assistantMessageEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls.length,
      1,
    );
    assert.equal(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].id,
      tooCallId,
    );
    assert.isEmpty(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].function.name,
    );
    assert.isEmpty(
      JSON.parse(
        (assistantMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).tool_calls[0].function.arguments,
    );

    const toolMessageEvent = mockSpan.events.get("gen_ai.tool.message");
    assert.isDefined(toolMessageEvent);
    assert.isDefined(toolMessageEvent?.name, "gen_ai.tool.message");
    assert.equal(
      (toolMessageEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (toolMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).id,
      tooCallId,
    );
    assert.isEmpty(
      JSON.parse(
        (toolMessageEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).content,
    );

    const choiceEvent = mockSpan.events.get("gen_ai.choice");
    assert.isDefined(choiceEvent);
    assert.equal(choiceEvent?.name, "gen_ai.choice");
    assert.equal(
      (choiceEvent?.options?.attributes as Record<string, unknown>)["gen_ai.system"],
      "az.ai.inference",
    );
    assert.equal(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).finish_reason,
      "stop",
    );
    assert.equal(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).index,
      0,
    );
    assert.isEmpty(
      JSON.parse(
        (choiceEvent?.options?.attributes as Record<string, unknown>)[
          "gen_ai.event.content"
        ] as any,
      ).message.content,
    );
  });

  it("tracing with errors", async () => {
    client = await createModelClient("dummy", recorder);

    await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "" }],
      },
      tracingOptions: { tracingContext: context.active() },
    });

    const createdSpan = instrumenter.createdSpans.get("chat");
    if (!createdSpan) {
      assert.fail("expected span to be created");
    }

    const mockSpan = createdSpan;
    assert.isTrue(mockSpan.endCalled, "expected span to be ended");
    assert.equal(mockSpan.name, "chat");
    assert.equal(mockSpan.getAttribute("az.namespace"), "Microsoft.CognitiveServices");
    assert.isTrue(mockSpan.getAttribute("server.address")?.toString().endsWith("azure.com"));
    assert.equal(mockSpan.getAttribute("server.port"), undefined);
    assert.equal(mockSpan.getAttribute("gen_ai.operation.name"), "chat");
    assert.equal(mockSpan.getAttribute("gen_ai.system"), "az.ai.inference");
    assert.deepEqual(mockSpan.status, {
      status: "error",
      error:
        "Unauthorized. Access token is missing, invalid, audience is incorrect (https://cognitiveservices.azure.com), or have expired.",
    });
    assert.equal(mockSpan.getAttribute("error.type"), "401");
  });

  it("no tracing other than chat completion", async () => {
    client = await createModelClient("embeddings", recorder);

    await client.path("/embeddings").post({
      tracingOptions: { tracingContext: context.active() },
    });

    assert.equal(instrumenter.createdSpans.size, 1);
    assert.isDefined(instrumenter.createdSpans.get("HTTP POST"));
  });

  it("no tracing for streaming", async () => {
    client = await createModelClient("completions", recorder);

    await client.path("/chat/completions").post({
      body: {
        messages: [{ role: "user", content: "" }],
        stream: true,
      },
      tracingOptions: { tracingContext: context.active() },
    });

    assert.equal(instrumenter.createdSpans.size, 1);
    assert.isDefined(instrumenter.createdSpans.get("HTTP POST"));
  });
});

class MockSpan implements TracingSpan {
  spanAttributes: Record<string, unknown> = {};
  events = new Map<string, { name: string; options?: AddEventOptions }>();
  endCalled: boolean = false;
  status?: SpanStatus;
  exceptions: Array<Error | string> = [];

  constructor(
    public name: string,
    spanOptions: TracingSpanOptions = {},
  ) {
    this.spanAttributes = spanOptions.spanAttributes ?? {};
  }
  addEvent?(name: string, options?: AddEventOptions): void {
    this.events.set(name, { name, options });
  }

  isRecording(): boolean {
    return true;
  }

  recordException(exception: Error | string): void {
    this.exceptions.push(exception);
  }

  end(): void {
    this.endCalled = true;
  }

  setStatus(status: SpanStatus): void {
    this.status = status;
  }

  setAttribute(name: string, value: unknown): void {
    this.spanAttributes[name] = value;
  }

  getAttribute(name: string): unknown {
    return this.spanAttributes[name];
  }
}

const noopTracingContext: TracingContext = {
  deleteValue() {
    return this;
  },
  getValue() {
    return undefined;
  },
  setValue() {
    return this;
  },
};

class MockInstrumenter implements Instrumenter {
  createdSpans = new Map<string, MockSpan>();
  staticSpan: MockSpan | undefined;

  setStaticSpan(span: MockSpan): void {
    this.staticSpan = span;
  }
  startSpan(
    name: string,
    spanOptions: InstrumenterSpanOptions,
  ): {
    span: TracingSpan;
    tracingContext: TracingContext;
  } {
    const tracingContext = spanOptions.tracingContext ?? noopTracingContext;
    if (this.staticSpan) {
      return { span: this.staticSpan, tracingContext };
    }
    const span = new MockSpan(name, spanOptions);
    this.createdSpans.set(name, span);
    return {
      span,
      tracingContext,
    };
  }
  withContext<
    CallbackArgs extends unknown[],
    Callback extends (...args: CallbackArgs) => ReturnType<Callback>,
  >(
    _context: TracingContext,
    callback: Callback,
    ...callbackArgs: CallbackArgs
  ): ReturnType<Callback> {
    return callback(...callbackArgs);
  }

  parseTraceparentHeader(_traceparentHeader: string): TracingContext | undefined {
    return undefined;
  }
  createRequestHeaders(_tracingContext?: TracingContext): Record<string, string> {
    return {};
  }
}
