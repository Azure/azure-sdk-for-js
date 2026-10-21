// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable, isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient } from "@azure/ai-projects";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { createServer } from "vite";
import type { ViteDevServer } from "vite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createProjectsClient, createRecorder } from "../../utils/createClient.js";
import {
  createLiveE2EDefinition,
  createLiveE2EObservation,
  exerciseLiveE2E,
  liveE2ETimeouts,
  recordLiveE2EFailure,
  requireLiveE2E,
} from "../e2eTypes.js";
import type {
  BrowserLiveE2EApi,
  BrowserLiveE2EInput,
  LiveE2EFlow,
  LiveE2EObservation,
  LiveE2ERuntime,
} from "../e2eTypes.js";

const preview = "VoiceAgents=V1Preview" as const;
const browserScriptUrl = "/test/public/live/browser/liveE2EClient.ts";
const flows: LiveE2EFlow[] = ["text", "audio", "tools"];
const runtimes: LiveE2ERuntime[] = ["node", "chromium"];

// These primary WebSockets are deliberately live-only: the HTTP recorder cannot replay them.
describe.runIf(isLiveMode())("GPT Live native E2E", () => {
  describe.each(runtimes)("%s", (runtime) => {
    let browser: Browser | undefined;
    let server: ViteDevServer | undefined;
    let browserUrl: string | undefined;

    beforeAll(async () => {
      if (runtime !== "chromium") return;
      const setup = createLiveE2EObservation(runtime, "text");
      try {
        setup.diagnostics.stage = "browser-server";
        const root = fileURLToPath(new URL("../../../../", import.meta.url));
        const browserEntry = fileURLToPath(new URL("../browser/liveE2EClient.ts", import.meta.url));
        server = await createServer({
          configFile: false,
          envFile: false,
          root,
          publicDir: false,
          logLevel: "silent",
          envPrefix: "__GPT_LIVE_E2E_NO_PUBLIC_ENV__",
          define: { "process.env": "{}" },
          resolve: {
            alias: [
              {
                find: /^@azure\/ai-projects$/,
                replacement: resolve(root, "dist", "browser", "index.js"),
              },
            ],
            conditions: ["browser", "module", "development"],
          },
          optimizeDeps: {
            noDiscovery: true,
            entries: [browserEntry],
            include: ["@azure/ai-projects"],
          },
          plugins: [
            {
              name: "gpt-live-native-e2e",
              configureServer(vite) {
                // Register before Vite's SPA fallback, not in its post-configuration callback.
                vite.middlewares.use((request, response, next) => {
                  if (request.url?.split("?")[0] !== "/__live-e2e") {
                    next();
                    return;
                  }
                  response.statusCode = 200;
                  response.setHeader("Content-Type", "text/html; charset=utf-8");
                  response.end(
                    `<!doctype html><title>GPT Live native E2E</title><script type="module">import * as api from ${JSON.stringify(browserScriptUrl)};globalThis.__liveE2E = api;</script>`,
                  );
                });
              },
            },
          ],
          server: {
            host: "127.0.0.1",
            port: 0,
            strictPort: true,
            hmr: false,
            ws: false,
            warmup: { clientFiles: [browserEntry] },
          },
        });
        await server.listen();
        await server.warmupRequest(browserScriptUrl);
        const address = server.httpServer?.address();
        requireLiveE2E(
          address && typeof address !== "string",
          "missing_browser_server_address",
          "browser-server",
        );
        browserUrl = `http://127.0.0.1:${address.port}/__live-e2e`;
        const response = await fetch(browserUrl, { signal: AbortSignal.timeout(10_000) });
        requireLiveE2E(response.ok, "browser_route_unavailable", "browser-server");
        setup.diagnostics.stage = "chromium-launch";
        browser = await chromium.launch({ headless: true, timeout: 15_000 });
      } catch (error) {
        recordLiveE2EFailure(setup, error);
        await persistObservation(setup);
      }
      if (setup.diagnostics.failures.length > 0) {
        const failure = setup.diagnostics.failures[0];
        throw new Error(
          `GPT Live E2E: stage=${failure.stage} code=${failure.code} status=${failure.status ?? "none"}`,
        );
      }
    }, 45_000);

    afterAll(async () => {
      const cleanup = createLiveE2EObservation(runtime, "text");
      try {
        await browser?.close();
      } catch (error) {
        recordLiveE2EFailure(cleanup, error, "chromium-cleanup");
      }
      try {
        await server?.close();
      } catch (error) {
        recordLiveE2EFailure(cleanup, error, "vite-cleanup");
      }
      expect(cleanup.diagnostics.failures).toEqual([]);
    }, 20_000);

    it.for(flows)(
      "%s streams real transcripts/audio and finalizes the native session",
      { timeout: 150_000 },
      async (flow: LiveE2EFlow, context: VitestTestContext) => {
        let observation = createLiveE2EObservation(runtime, flow);
        let recorder: Recorder | undefined;
        let project: AIProjectClient | undefined;
        let agentName: string | undefined;
        let createAttempted = false;
        let pcm = new Uint8Array();
        try {
          observation.diagnostics.stage = "recorder-start";
          recorder = await createRecorder(context);
          project = createProjectsClient(recorder, {
            retryOptions: { maxRetries: 0 },
            liveOptions: {
              credentialScopes: ["https://ai.azure.com/.default"],
              connectionTimeoutInMs: liveE2ETimeouts.connection,
              sessionTimeoutInMs: liveE2ETimeouts.session,
              closeTimeoutInMs: liveE2ETimeouts.close,
            },
          });
          const endpoint = assertEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT");
          const model = process.env["FOUNDRY_LIVE_MODEL"]?.trim() || "gpt-live-1";
          const backend = process.env["FOUNDRY_LIVE_BACKEND_MODEL"]?.trim() || "gpt-4.1-mini";
          if (flow === "audio") {
            observation.diagnostics.stage = "read-pcm-fixture";
            pcm = new Uint8Array(
              await readFile(
                new URL("../../../../samples-dev/agents/assets/input.pcm", import.meta.url),
              ),
            );
            requireLiveE2E(
              pcm.length > 0 && pcm.length % 2 === 0,
              "invalid_pcm_fixture",
              "read-pcm-fixture",
            );
          }
          agentName = `sdk-live-e2e-${runtime}-${flow}-${randomUUID().slice(0, 8)}`;
          observation.diagnostics.agentName = agentName;
          observation.diagnostics.stage = "create-agent";
          createAttempted = true;
          const agent = await project.agents.create(
            agentName,
            createLiveE2EDefinition(flow, model, backend),
            {
              foundryFeatures: preview,
              abortSignal: AbortSignal.timeout(30_000),
            },
          );
          const definition = agent.versions.latest.definition;
          requireLiveE2E(
            "store" in definition && definition.store === false,
            "foundry_persistence_not_disabled",
            "create-agent",
          );
          if (runtime === "node") {
            observation.diagnostics.stage = "node-connect";
            const connection = await project.beta.voiceAgents.live.connect(agentName, {
              store: false,
            });
            await exerciseLiveE2E(connection, flow, pcm, observation);
          } else {
            requireLiveE2E(browser && browserUrl, "browser_not_started", "browser-bootstrap");
            observation.diagnostics.stage = "browser-credential";
            const access = await createTestCredential().getToken("https://ai.azure.com/.default", {
              abortSignal: AbortSignal.timeout(10_000),
            });
            requireLiveE2E(access?.token, "no_browser_access_token", "browser-credential");
            observation = await exerciseChromium(
              browser,
              browserUrl,
              {
                endpoint,
                agentName,
                flow,
                token: access.token,
                expiresOnTimestamp: access.expiresOnTimestamp,
                pcm: Array.from(pcm),
              },
              observation,
            );
            observation.diagnostics.agentName = agentName;
          }
        } catch (error) {
          recordLiveE2EFailure(observation, error);
        } finally {
          if (createAttempted && project && agentName) {
            try {
              await project.agents.delete(agentName, {
                abortSignal: AbortSignal.timeout(10_000),
                requestOptions: { headers: { "foundry-features": preview } },
              });
              observation.diagnostics.agentDeleted = true;
            } catch (error) {
              if (hasStatus(error, 404)) {
                observation.diagnostics.agentDeleted = true;
              } else {
                recordLiveE2EFailure(observation, error, "delete-agent");
              }
            }
          }
          try {
            await recorder?.stop();
          } catch (error) {
            recordLiveE2EFailure(observation, error, "recorder-stop");
          }
          await persistObservation(observation);
        }

        expect(observation.diagnostics.failures).toEqual([]);
        expect(observation.diagnostics.outcome).toBe("passed");
        expect(observation.diagnostics.agentDeleted).toBe(true);
        expect(observation.nativeEvents.some((event) => event.type === "session.started")).toBe(
          true,
        );
        expect(observation.nativeEvents.some((event) => event.type === "session.closed")).toBe(
          true,
        );
        expect(observation.inputAudioBytes).toBeGreaterThan(0);
        expect(observation.outputAudioBytes).toBeGreaterThan(0);
        expect(observation.outputNonSilentSamples).toBeGreaterThan(200);
        expect(observation.outputTranscript.trim().length).toBeGreaterThan(0);
        expect(observation.terminal).toMatchObject({
          sessionId: observation.sessionId,
          reason: "close_requested",
          wasClean: true,
        });
        if (flow === "audio") {
          expect(observation.inputSpeechBytes).toBe(pcm.length);
          expect(observation.inputTranscript.trim().length).toBeGreaterThan(7);
        }
        if (flow === "tools") {
          expect(observation.tools).toHaveLength(1);
          expect(observation.tools[0]).toMatchObject({
            name: "get_fixture_weather",
            outputItemDone: true,
            resultSent: true,
          });
          expect(observation.diagnostics.continuationRequested).toBe(true);
          expect(observation.backendTranscript).toMatch(/bluebird/i);
          expect(observation.outputTranscript).toMatch(/bluebird/i);
        }
        if (runtime === "chromium") {
          expect(observation.diagnostics.nativeBrowserWebSocket).toBe(true);
          expect(observation.diagnostics.browserSocketOpened).toBe(1);
          expect(observation.diagnostics.browserSocketClosed).toBe(1);
        }
      },
    );
  });
});

async function exerciseChromium(
  browser: Browser,
  url: string,
  input: BrowserLiveE2EInput,
  initial: LiveE2EObservation,
): Promise<LiveE2EObservation> {
  let page: Page | undefined;
  let observation = initial;
  let opened = 0;
  let closed = 0;
  let handshakeStatus: number | undefined;
  try {
    observation.diagnostics.stage = "browser-bootstrap";
    page = await browser.newPage();
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      const match = /WebSocket handshake: Unexpected response code: ([45]\d\d)/i.exec(
        message.text(),
      );
      if (match) handshakeStatus = Number(match[1]);
    });
    page.on("websocket", (socket) => {
      // Playwright observes Chromium's real socket, without inspecting authentication protocols.
      if (!new URL(socket.url()).pathname.endsWith("/protocols/voice/live/sessions")) return;
      opened++;
      socket.on("close", () => closed++);
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 20_000 });
    await page.waitForFunction(() => Boolean(Reflect.get(globalThis, "__liveE2E")), undefined, {
      timeout: 20_000,
    });
    observation.diagnostics.stage = "browser-evaluate";
    // The bearer is passed only in memory after bootstrap; it never enters a served file or define.
    observation = await page.evaluate(async (argument: BrowserLiveE2EInput) => {
      const api = Reflect.get(globalThis, "__liveE2E") as BrowserLiveE2EApi;
      return api.run(argument);
    }, input);
  } catch (error) {
    if (page) {
      try {
        const partial = await page.evaluate(() => {
          const api = Reflect.get(globalThis, "__liveE2E") as BrowserLiveE2EApi | undefined;
          return api?.snapshot();
        });
        if (partial) observation = partial;
      } catch {
        recordLiveE2EFailure(
          observation,
          { code: "browser_snapshot_unavailable" },
          "browser-evaluate",
        );
      }
    }
    // In particular, never print browser exception text or its credential-bearing stack.
    recordLiveE2EFailure(observation, error, "browser-evaluate");
  } finally {
    try {
      await page?.close();
    } catch (error) {
      recordLiveE2EFailure(observation, error, "browser-page-cleanup");
    }
    observation.diagnostics.browserSocketCreated = opened;
    observation.diagnostics.browserSocketOpened ??= 0;
    observation.diagnostics.browserSocketClosed = closed;
    if (handshakeStatus !== undefined) {
      observation.diagnostics.browserHandshakeStatus = handshakeStatus;
    }
  }
  return observation;
}

async function persistObservation(observation: LiveE2EObservation): Promise<void> {
  const output = process.env["GPT_LIVE_E2E_OUTPUT_PATH"];
  if (!output) return;
  try {
    const path = resolve(output);
    let previous: unknown[] = [];
    try {
      const document: unknown = JSON.parse(await readFile(path, "utf8"));
      requireLiveE2E(
        typeof document === "object" &&
          document !== null &&
          "schema" in document &&
          document.schema === "gpt-live-native-e2e/v1" &&
          "sessions" in document &&
          Array.isArray(document.sessions),
        "invalid_diagnostics_document",
        "write-diagnostics",
      );
      previous = document.sessions;
    } catch (error) {
      if (!isFileNotFound(error)) throw error;
    }
    await mkdir(dirname(path), { recursive: true });
    await writeFile(
      path,
      JSON.stringify(
        { schema: "gpt-live-native-e2e/v1", sessions: [...previous, observation] },
        null,
        2,
      ),
      "utf8",
    );
  } catch (error) {
    recordLiveE2EFailure(observation, error, "write-diagnostics");
  }
}

function hasStatus(error: unknown, status: number): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === status
  );
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
