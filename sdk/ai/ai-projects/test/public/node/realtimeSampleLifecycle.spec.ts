// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import path from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";

const sampleFile = path.join(
  process.cwd(),
  "samples-dev",
  "agents",
  "agentVoiceRealtimeTextAndTools.ts",
);
const source = ts.createSourceFile(
  sampleFile,
  readFileSync(sampleFile, "utf8"),
  ts.ScriptTarget.Latest,
  true,
);
const declarations = source.statements.filter(
  (statement) => ts.isFunctionDeclaration(statement) || ts.isVariableStatement(statement),
);
const compiled = ts.transpileModule(
  declarations.map((statement) => statement.getText(source)).join("\n"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

interface ResponseOptions {
  response?: { metadata?: { additionalProperties?: Record<string, string> } };
}

interface SampleEvent {
  type: string;
  [key: string]: unknown;
  response?: {
    id: string;
    status?: string;
    metadata?: { additionalProperties?: Record<string, string> };
  };
}

interface SampleHarness {
  main: () => Promise<void>;
  calls: string[];
  connection: {
    close: () => Promise<void>;
    sendToolOutput: (callId: string, output: string) => Promise<void>;
    requestResponse: (options: ResponseOptions) => Promise<void>;
  };
  output: {
    writeFile: (bytes: Uint8Array) => Promise<void>;
    close: () => Promise<void>;
  };
  stdout: (text: string) => unknown;
  create: () => Promise<void>;
  remove: () => Promise<void>;
}

function setup({
  greeting = false,
  greetingFails = false,
  responseFails = false,
  responseStatus = "failed",
  greetingDoneMetadata = true,
  closesEarly = false,
  existing = true,
  invalidArguments = false,
  duplicateCall = false,
} = {}): SampleHarness {
  const calls: string[] = [];
  const events: SampleEvent[] = [
    { type: "session.created", session: { greeting: null } },
    {
      type: "session.updated",
      session: { greeting: greeting ? { type: "template", text: "Startup greeting" } : null },
    },
  ];
  let greetingDone = !greeting;
  if (greeting) {
    const metadata = { additionalProperties: { "microsoft.voice.trigger": "session_start" } };
    events.push(
      { type: "response.created", response: { id: "greeting", metadata } },
      { type: "response.output_text.delta", response_id: "greeting", delta: "UNRELATED_GREETING" },
    );
    if (!closesEarly) {
      events.push({
        type: "response.done",
        response: {
          id: "greeting",
          status: greetingFails ? "failed" : "completed",
          metadata: greetingDoneMetadata ? metadata : undefined,
        },
      });
    }
  }
  let requestCount = 0;
  let iteratorCount = 0;
  const close = vi.fn(async () => {});
  const sendToolOutput = vi.fn(async (_callId: string, _output: string) => {
    calls.push("tool");
  });
  const connection = {
    close,
    sendToolOutput,
    configureSession: vi.fn(async () => {
      calls.push("configure");
      events.push({ type: "session.updated", session: { greeting: null } });
    }),
    sendText: vi.fn(async () => {
      calls.push("text");
    }),
    requestResponse: vi.fn(async (options: ResponseOptions) => {
      if (!greetingDone) {
        throw new Error("Requested a response before the startup greeting finished");
      }
      calls.push("request");
      const metadata = options.response?.metadata;
      if (metadata?.additionalProperties?.["sample_turn"] !== "weather-turn") {
        throw new Error("Missing sample response correlation");
      }
      const id = `weather-${++requestCount}`;
      events.push({ type: "response.created", response: { id, metadata } });
      if (requestCount === 1 && !responseFails) {
        const tool = {
          type: "response.function_call_arguments.done",
          response_id: id,
          name: "get_weather",
          call_id: "weather-call",
          arguments: invalidArguments ? "{}" : '{"city":"Seattle"}',
        };
        events.push(tool);
        if (duplicateCall) events.push(tool);
      } else if (!responseFails) {
        events.push(
          { type: "response.output_text.delta", response_id: id, delta: "Seattle is 62 F." },
          {
            type: "response.output_audio.delta",
            response_id: id,
            delta: new Uint8Array([1, 2, 3, 4]),
          },
        );
      }
      events.push({
        type: "response.done",
        response: { id, status: responseFails ? responseStatus : "completed", metadata },
      });
    }),
    async *[Symbol.asyncIterator]() {
      if (++iteratorCount !== 1) throw new Error("The sample opened a second iterator");
      for (let index = 0; index < events.length; index++) {
        const event = events[index];
        if (event.type === "response.done" && event.response?.id === "greeting") {
          greetingDone = true;
          calls.push("greeting-done");
        }
        yield event;
      }
    },
  };
  const remove = vi.fn(async () => {});
  const create = vi.fn(async () => {});
  const output = {
    writeFile: vi.fn(async (_bytes: Uint8Array) => {}),
    close: vi.fn(async () => {}),
  };
  const stdout = vi.fn();
  const exports: { main?: () => Promise<void> } = {};
  class Client {
    public agents = {
      get: vi.fn(async () => {
        if (!existing) throw Object.assign(new Error("not found"), { statusCode: 404 });
        return {
          versions: { latest: { definition: { kind: "voice", sub_protocol: "realtime" } } },
        };
      }),
      create,
      delete: remove,
    };
    public voiceAgents = { realtime: { connect: async () => connection } };
  }
  // Execute only trusted sample declarations; imports and the autorun footer are excluded.
  runInNewContext(compiled, {
    exports,
    AIProjectClient: Client,
    DefaultAzureCredential: class {},
    isRestError: (error: unknown) =>
      typeof error === "object" && error !== null && "statusCode" in error,
    randomUUID: () => "weather-turn",
    open: async () => output,
    process: {
      env: {
        FOUNDRY_PROJECT_ENDPOINT: "https://example.test",
        FOUNDRY_VOICE_AGENT_NAME: "fixture",
      },
      stdout: { write: stdout },
    },
    console: { log: vi.fn(), error: vi.fn() },
  });
  if (!exports.main) throw new Error("Sample main export is missing");
  return { main: exports.main, calls, connection, output, stdout, create, remove };
}

describe("Realtime text-and-tools sample lifecycle", () => {
  it.each([false, true])(
    "completes tool continuation with startup greeting=%s",
    async (greeting) => {
      const test = setup({ greeting });
      await test.main();
      expect(test.connection.requestResponse).toHaveBeenCalledTimes(2);
      expect(test.connection.sendToolOutput).toHaveBeenCalledWith(
        "weather-call",
        '{"city":"Seattle","temperature":62,"unit":"F"}',
        { createResponse: false },
      );
      expect(test.stdout).toHaveBeenCalledWith("Seattle is 62 F.");
      expect(test.stdout).not.toHaveBeenCalledWith("UNRELATED_GREETING");
      expect(test.output.writeFile).toHaveBeenCalledOnce();
      expect(test.connection.close).toHaveBeenCalledOnce();
      expect(test.output.close).toHaveBeenCalledOnce();
      expect(test.remove).not.toHaveBeenCalled();
      if (greeting) {
        expect(test.calls.indexOf("greeting-done")).toBeLessThan(test.calls.indexOf("text"));
        expect(test.calls.indexOf("greeting-done")).toBeLessThan(test.calls.indexOf("request"));
      }
    },
  );

  it("does not start its turn when the startup greeting fails", async () => {
    const test = setup({ greeting: true, greetingFails: true });
    await expect(test.main()).rejects.toThrow("Startup greeting failed.");
    expect(test.connection.requestResponse).not.toHaveBeenCalled();
    expect(test.connection.close).toHaveBeenCalledOnce();
    expect(test.output.close).toHaveBeenCalledOnce();
  });

  it("correlates greeting completion by response ID when done metadata is absent", async () => {
    const test = setup({ greeting: true, greetingDoneMetadata: false });
    await test.main();
    expect(test.calls.indexOf("greeting-done")).toBeLessThan(test.calls.indexOf("request"));
    expect(test.connection.requestResponse).toHaveBeenCalledTimes(2);
    expect(test.stdout).toHaveBeenCalledWith("Seattle is 62 F.");
  });

  it("fails explicitly if the stream closes before the greeting finishes", async () => {
    const test = setup({ greeting: true, closesEarly: true });
    await expect(test.main()).rejects.toThrow("The connection closed before the reply completed.");
    expect(test.connection.requestResponse).not.toHaveBeenCalled();
    expect(test.connection.close).toHaveBeenCalledOnce();
  });

  it.each(["failed", "cancelled", "incomplete"])(
    "cleans up a newly created agent when its response is %s",
    async (responseStatus) => {
      const test = setup({ existing: false, responseFails: true, responseStatus });
      await expect(test.main()).rejects.toThrow(`Voice response ${responseStatus}.`);
      expect(test.create).toHaveBeenCalledOnce();
      expect(test.remove).toHaveBeenCalledWith("fixture");
      expect(test.connection.close).toHaveBeenCalledOnce();
      expect(test.output.close).toHaveBeenCalledOnce();
    },
  );

  it("rejects malformed tool arguments instead of submitting a result", async () => {
    const test = setup({ invalidArguments: true });
    await expect(test.main()).rejects.toThrow('get_weather requires a non-empty string "city"');
    expect(test.connection.sendToolOutput).not.toHaveBeenCalled();
    expect(test.connection.close).toHaveBeenCalledOnce();
  });

  it("submits a duplicated tool call only once", async () => {
    const test = setup({ duplicateCall: true });
    await test.main();
    expect(test.connection.sendToolOutput).toHaveBeenCalledOnce();
    expect(test.connection.requestResponse).toHaveBeenCalledTimes(2);
  });
});
