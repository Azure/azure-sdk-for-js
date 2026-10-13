// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isLiveMode, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { DefaultAzureCredential } from "@azure/identity";
import { chromium } from "playwright";
import type { Browser, BrowserContext } from "playwright";
import { createServer } from "vite";
import type { ViteDevServer } from "vite";
import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { AIProjectClient } from "@azure/ai-projects";
import type {
  BrowserVoiceInput,
  BrowserVoiceResult,
} from "../realtime/voiceAgentBrowserTestTypes.js";
import "dotenv/config";

describe.runIf(isLiveMode())("Voice Agents native Chromium telemetry (live)", () => {
  let server: ViteDevServer;
  let browser: Browser;
  let browserContext: BrowserContext | undefined;
  let localUrl: string;
  let agentName: string | undefined;
  let client: AIProjectClient;
  const credential = new DefaultAzureCredential();
  const captured: { scenario: string; contentRecording: boolean; result: BrowserVoiceResult }[] =
    [];

  beforeAll(async () => {
    server = await createServer({
      configFile: false,
      root: resolve("."),
      logLevel: "error",
      resolve: { alias: { "@azure/ai-projects": resolve("dist", "browser", "index.js") } },
      define: { "process.env": "{}" },
      optimizeDeps: {
        include: ["@azure/ai-projects", "@opentelemetry/api", "@opentelemetry/sdk-trace-base"],
      },
      plugins: [
        {
          name: "voice-browser-test-page",
          configureServer(vite) {
            vite.middlewares.use((request, response, next) => {
              if (request.url !== "/") return next();
              response.setHeader("content-type", "text/html");
              response.end(
                '<!doctype html><html><body><script type="module" src="/test/public/realtime/browser/voiceAgentLiveClient.ts"></script></body></html>',
              );
            });
          },
        },
      ],
      server: {
        host: "127.0.0.1",
        port: 0,
        strictPort: false,
        warmup: { clientFiles: ["./test/public/realtime/browser/voiceAgentLiveClient.ts"] },
      },
    });
    await server.listen();
    const address = server.httpServer?.address();
    if (!address || typeof address === "string") {
      throw new Error("Browser test server did not start.");
    }
    localUrl = `http://127.0.0.1:${address.port}`;
    browser = await chromium.launch({ headless: true });
    client = new AIProjectClient(
      assertEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT"),
      credential,
      {
        retryOptions: { maxRetries: 0 },
      },
    );
  }, 90_000);

  beforeEach(() => {
    agentName = undefined;
    browserContext = undefined;
  });
  afterEach(async () => {
    try {
      await browserContext?.close();
      if (agentName) {
        await client.agents.delete(agentName, { abortSignal: AbortSignal.timeout(20_000) });
      }
    } finally {
      const output = process.env["VOICE_AGENT_BROWSER_TELEMETRY_OUTPUT_PATH"];
      if (output) {
        await writeFile(
          output,
          JSON.stringify(
            {
              source:
                "Real headless Chromium, built browser SDK, native WebSocket, live Foundry service",
              authentication: "Cached Entra token supplied in browser memory; not persisted",
              excludes: ["microphone capture", "WebRTC media", "raw audio", "credentials"],
              runs: captured,
            },
            null,
            2,
          ),
        );
      }
    }
  });
  afterAll(async () => {
    await browser?.close();
    await server?.close();
  });

  it.each([
    { scenario: "text_to_audio", recording: false },
    { scenario: "text_to_audio", recording: true },
    { scenario: "text_to_text", recording: true },
    { scenario: "local_function", recording: true },
    { scenario: "audio_to_audio", recording: true },
  ])(
    "uses native Chromium transport ($scenario, recording=$recording)",
    async ({ scenario, recording }) => {
      const audioInput = scenario === "audio_to_audio";
      const tool = scenario === "local_function";
      const output = scenario === "text_to_text" ? "text" : "audio";
      const name = `voice-browser-e2e-${randomUUID().slice(0, 8)}`;
      await client.agents.create(
        name,
        {
          kind: "voice",
          model_type: "managed",
          model: process.env["FOUNDRY_VOICE_MODEL"] || "gpt-realtime",
          instructions: tool
            ? "Call get_current_time exactly once before answering a request for the time, then say the returned time briefly."
            : "Respond briefly.",
          output_modalities: [output],
          store: false,
          audio: audioInput
            ? {
                input: {
                  format: { type: "audio/pcm", rate: 24000 },
                  turn_detection: {
                    type: "server_vad",
                    create_response: true,
                    interrupt_response: false,
                    silence_duration_ms: 500,
                  },
                },
                output: { format: { type: "audio/pcm", rate: 24000 } },
              }
            : undefined,
          tools: tool
            ? [
                {
                  type: "function",
                  name: "get_current_time",
                  description: "Get the current UTC time.",
                  parameters: { type: "object", properties: {} },
                },
              ]
            : undefined,
        },
        { foundryFeatures: "VoiceAgents=V1Preview", abortSignal: AbortSignal.timeout(30_000) },
      );
      agentName = name;
      const accessToken = await credential.getToken("https://ai.azure.com/.default");
      if (!accessToken) throw new Error("No browser test access token.");
      browserContext = await browser.newContext();
      const page = await browserContext.newPage();
      let bootstrapComplete = false;
      page.on("pageerror", (error) => {
        if (!bootstrapComplete) console.error(`Browser bootstrap: ${error.message}`);
      });
      let foundrySockets = 0;
      const expectedHost = new URL(assertEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT")).hostname;
      page.on("websocket", (socket) => {
        const url = new URL(socket.url());
        if (url.protocol === "wss:" && url.hostname === expectedHost) foundrySockets++;
      });
      const document = await page.goto(localUrl);
      expect(document?.ok()).toBe(true);
      await page.waitForFunction(
        () => typeof globalThis.runVoiceTelemetryTest === "function",
        undefined,
        { timeout: 60_000 },
      );
      bootstrapComplete = true;
      const input: BrowserVoiceInput = {
        endpoint: assertEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT"),
        agentName: name,
        token: accessToken.token,
        expiresOnTimestamp: accessToken.expiresOnTimestamp,
        contentRecording: recording,
        output,
        tool,
        audio: audioInput
          ? Array.from(await readFile(resolve("samples-dev", "agents", "assets", "input.pcm")))
          : undefined,
      };
      const result = await page.evaluate(async (payload) => {
        const run = globalThis.runVoiceTelemetryTest;
        if (!run) throw new Error("Browser SDK harness did not load.");
        return run(payload);
      }, input);
      captured.push({ scenario, contentRecording: recording, result });
      expect(result.failure).toBeUndefined();
      expect(result.completed).toBe(true);
      expect(result.nativeWebSocket).toBe(true);
      expect(foundrySockets).toBeGreaterThan(0);
      if (output === "audio") expect(result.receivedAudioBytes).toBeGreaterThan(0);
      else expect(result.receivedTextCharacters).toBeGreaterThan(0);
      if (audioInput) expect(result.sentAudioBytes).toBe(250056);
      if (tool) expect(result.toolRequests).toBeGreaterThan(0);
      const session = result.spans.find((span) => span.name === "voice_agents.realtime.session");
      const responses = result.spans.filter((span) => span.name === "invoke_agent");
      expect(session).toBeDefined();
      expect(responses.length).toBeGreaterThan(0);
      expect(responses.every((span) => span.parentSpanId === session?.spanId)).toBe(true);
      const attributes = JSON.stringify(result.spans.map((span) => span.attributes));
      if (!tool && !audioInput) {
        if (recording) expect(attributes).toContain("BROWSER_TRACE_TEST_PROMPT");
        else expect(attributes).not.toContain("BROWSER_TRACE_TEST_PROMPT");
      }
      expect(JSON.stringify(result)).not.toContain(accessToken.token);
    },
    120_000,
  );
});
