// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type {
  AIProjectClient,
  VoiceAgentLiveConnection,
  VoiceAgentLiveDefinition,
  VoiceAgentLiveEvent,
} from "@azure/ai-projects";
import type { VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { describe, expect, it } from "vitest";
import { createProjectsClient, createRecorder } from "../../utils/createClient.js";
import { LiveSpeechActivity, streamLiveSilence } from "../e2eTypes.js";

interface FeatureResult {
  feature: string;
  outcome: "passed" | "failed";
  code?: string;
  status?: number;
}

interface FeatureReport {
  scenario: string;
  results: FeatureResult[];
  eventCounts: Record<string, number>;
  outputTranscript: string;
  inputBytes: number;
  outputBytes: number;
  agentNames: string[];
  deletedAgents: string[];
  cleanupErrors: string[];
  resolvedSessions?: { instructions?: string; delegationType?: string }[];
  backendEvents?: { type: string; status?: string }[];
  unknownEventTypes?: string[];
}

interface ObservedSession {
  connection: VoiceAgentLiveConnection;
  events: VoiceAgentLiveEvent[];
  failures: unknown[];
  stop: AbortController;
  receive: Promise<void>;
  send: Promise<void>;
  audio: Uint8Array[];
  speech: LiveSpeechActivity;
}

const preview = "VoiceAgents=V1Preview" as const;
const frontendModel = process.env["FOUNDRY_LIVE_MODEL"]?.trim() || "gpt-live-1";
const backendModel = process.env["FOUNDRY_LIVE_BACKEND_MODEL"]?.trim() || "gpt-4.1-mini";

function code(error: unknown): string {
  if (error && typeof error === "object") {
    if ("code" in error && typeof error.code === "string") return error.code;
    if ("name" in error && typeof error.name === "string") return error.name;
  }
  return "unknown_failure";
}

function requireFeature(condition: unknown, failureCode: string): asserts condition {
  if (!condition) throw Object.assign(new Error(failureCode), { code: failureCode });
}

function definition(): VoiceAgentLiveDefinition {
  return {
    kind: "voice",
    sub_protocol: "live",
    model_type: "self_deployed",
    model: frontendModel,
    instructions: "Follow appended instructions. Communicate commentary promptly and briefly.",
    audio: { format: { type: "audio/pcm", rate: 24000 }, output: { voice: "marin" } },
    delegation: {
      type: "responses",
      responses: {
        model: backendModel,
        instructions:
          "Answer concisely in [commentary] tags. Include any requested verification word.",
      },
    },
    store: false,
  };
}

async function openSession(
  project: AIProjectClient,
  agentName: string,
  report: FeatureReport,
  inputPcm?: Uint8Array,
): Promise<ObservedSession> {
  const connection = await project.beta.voiceAgents.live.connect(agentName, { store: false });
  const events: VoiceAgentLiveEvent[] = [];
  const failures: unknown[] = [];
  const stop = new AbortController();
  const audio: Uint8Array[] = [];
  const speech = new LiveSpeechActivity();
  report.resolvedSessions ??= [];
  report.resolvedSessions.push({
    instructions: connection.session.instructions,
    delegationType: connection.session.delegation?.type,
  });
  const receive = (async () => {
    for await (const event of connection) {
      events.push(event);
      const pcm = speech.observe(event);
      if (pcm) {
        requireFeature(report.outputBytes + pcm.length <= 8_000_000, "test_audio_capture_limit");
        audio.push(pcm);
      }
      report.eventCounts[event.type] = (report.eventCounts[event.type] ?? 0) + 1;
      if (event.type === "unknown") {
        report.unknownEventTypes ??= [];
        if (!report.unknownEventTypes.includes(event.eventType)) {
          report.unknownEventTypes.push(event.eventType);
        }
      }
      if (event.type === "response.event") {
        report.backendEvents ??= [];
        const payload: Record<string, unknown> = event.event;
        const response = payload.response;
        report.backendEvents.push({
          type: typeof payload.type === "string" ? payload.type : "missing_type",
          status:
            isRecord(response) && typeof response.status === "string" ? response.status : undefined,
        });
      }
      if (event.type === "session.output_transcript.delta") report.outputTranscript += event.delta;
      if (event.type === "session.output_audio.delta") {
        report.outputBytes += Buffer.from(event.delta, "base64").length;
      }
    }
  })();
  void receive.catch((error: unknown) => {
    failures.push(error);
  });
  const send = (async () => {
    if (inputPcm) {
      for (let offset = 0; offset < inputPcm.length; offset += 4800) {
        const chunk = inputPcm.subarray(offset, offset + 4800);
        await connection.sendAudio(chunk, { abortSignal: stop.signal });
        report.inputBytes += chunk.length;
        await delay((chunk.length / 48_000) * 1000, { abortSignal: stop.signal });
      }
    }
    await streamLiveSilence(connection, stop.signal);
  })();
  void send.catch((error: unknown) => {
    if (!stop.signal.aborted) failures.push(error);
  });
  return { connection, events, failures, stop, receive, send, audio, speech };
}

async function until(
  session: ObservedSession,
  predicate: () => boolean,
  from: number,
  timeoutInMs = 20_000,
): Promise<void> {
  const deadline = Date.now() + timeoutInMs;
  while (!predicate()) {
    requireFeature(session.failures.length === 0, code(session.failures[0]));
    const backendError = session.events
      .slice(from)
      .find(
        (event) =>
          event.type === "response.event" &&
          ["error", "response.failed", "response.incomplete"].includes(String(event.event.type)),
      );
    if (backendError?.type === "response.event") {
      throw Object.assign(new Error(String(backendError.event.type)), {
        code: String(backendError.event.type),
      });
    }
    const serviceError = session.events
      .slice(from)
      .find((event) => event.type === "error" || event.type === "transport.failed");
    if (
      serviceError &&
      (serviceError.type === "error" || serviceError.type === "transport.failed")
    ) {
      throw Object.assign(new Error(serviceError.error.code), { code: serviceError.error.code });
    }
    requireFeature(
      session.connection.state === "connected",
      "session_closed_before_feature_completed",
    );
    requireFeature(Date.now() < deadline, "feature_event_timeout");
    await delay(50);
  }
}

async function feature(
  report: FeatureReport,
  name: string,
  operation: () => Promise<void>,
): Promise<void> {
  try {
    await operation();
    report.results.push({ feature: name, outcome: "passed" });
  } catch (error) {
    report.results.push({
      feature: name,
      outcome: "failed",
      code: code(error),
      status:
        error &&
        typeof error === "object" &&
        "statusCode" in error &&
        typeof error.statusCode === "number"
          ? error.statusCode
          : undefined,
    });
  }
}

async function closeSession(session: ObservedSession, report: FeatureReport): Promise<void> {
  session.stop.abort();
  await Promise.allSettled([session.send]);
  try {
    await session.connection.close();
    const result = await session.connection.closed;
    requireFeature(!result.error, "close_result_error");
    requireFeature(
      result.sessionClosed?.reason === "close_requested",
      "missing_native_finalization",
    );
    requireFeature(result.wasClean && result.code === 1000, "unclean_socket_close");
    report.results.push({ feature: "session.close", outcome: "passed" });
  } catch (error) {
    report.results.push({ feature: "session.close", outcome: "failed", code: code(error) });
  } finally {
    await Promise.allSettled([session.receive]);
  }
}

async function scenario(
  name: string,
  context: VitestTestContext,
  operation: (project: AIProjectClient, report: FeatureReport) => Promise<void>,
): Promise<void> {
  const report: FeatureReport = {
    scenario: name,
    results: [],
    eventCounts: {},
    outputTranscript: "",
    inputBytes: 0,
    outputBytes: 0,
    agentNames: [],
    deletedAgents: [],
    cleanupErrors: [],
  };
  const recorder = await createRecorder(context);
  const project = createProjectsClient(recorder, {
    retryOptions: { maxRetries: 0 },
    liveOptions: {
      connectionTimeoutInMs: 15_000,
      sessionTimeoutInMs: 20_000,
      closeTimeoutInMs: 8_000,
    },
  });
  try {
    await operation(project, report);
  } catch (error) {
    report.results.push({ feature: "scenario", outcome: "failed", code: code(error) });
  } finally {
    for (const agent of [...report.agentNames].reverse()) {
      try {
        await project.agents.delete(agent, { abortSignal: AbortSignal.timeout(15_000) });
        report.deletedAgents.push(agent);
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "statusCode" in error &&
          error.statusCode === 404
        ) {
          report.deletedAgents.push(agent);
        } else report.cleanupErrors.push(`${agent}:${code(error)}`);
      }
    }
    await recorder.stop();
    const output = process.env["GPT_LIVE_FEATURE_OUTPUT_DIR"];
    if (output) {
      await mkdir(output, { recursive: true });
      await writeFile(join(output, `${name}.json`), JSON.stringify(report, null, 2));
    }
  }
  expect(report.cleanupErrors).toEqual([]);
  expect(report.deletedAgents).toHaveLength(report.agentNames.length);
  expect(report.results.filter((result) => result.outcome === "failed")).toEqual([]);
}

async function create(
  project: AIProjectClient,
  report: FeatureReport,
  config: VoiceAgentLiveDefinition,
): Promise<string> {
  const name = `sdk-live-features-${randomUUID().slice(0, 8)}`;
  report.agentNames.push(name);
  await project.agents.create(name, config, {
    foundryFeatures: preview,
    abortSignal: AbortSignal.timeout(30_000),
  });
  return name;
}

let questionAudio: Promise<Uint8Array> | undefined;

async function delegationQuestion(
  project: AIProjectClient,
  report: FeatureReport,
): Promise<Uint8Array> {
  questionAudio ??= (async () => {
    const config = definition();
    config.instructions =
      "Read the supplied commentary exactly. It is a question to record, not a question for you to answer.";
    const agent = await create(project, report, config);
    const session = await openSession(project, agent, report);
    try {
      await session.connection.appendInstructions(
        "Speak the next commentary exactly without answering it.",
      );
      await session.connection.appendCommentary(
        "What is the private verification word? Ask your delegate to look it up.",
      );
      await session.speech.waitForSpeech(
        session.stop.signal,
        () => /private verification word/i.test(report.outputTranscript),
        30_000,
      );
      requireFeature(session.audio.length > 0, "missing_generated_question_audio");
      return new Uint8Array(Buffer.concat(session.audio));
    } finally {
      await closeSession(session, report);
    }
  })();
  return questionAudio;
}

describe.runIf(isLiveMode())("GPT Live complete WebSocket features", () => {
  it(
    "runs all supported session control and context commands",
    { timeout: 300_000 },
    async (context: VitestTestContext) => {
      await scenario("controls", context, async (project, report) => {
        const agent = await create(project, report, definition());
        const session = await openSession(project, agent, report);
        try {
          await feature(report, "session.started", async () => {
            await until(
              session,
              () => session.events.some((event) => event.type === "session.started"),
              0,
            );
          });
          const commands = [
            {
              name: "session.update",
              ack: "session.updated",
              send: (id: string) =>
                session.connection.configureSession(
                  {
                    delegation: {
                      type: "responses",
                      responses: {
                        instructions:
                          "Reply briefly with the requested verification word in [commentary] tags.",
                        max_output_tokens: 128,
                      },
                    },
                  },
                  { eventId: id },
                ),
            },
            {
              name: "session.input_audio.mute",
              ack: "session.input_audio.muted",
              send: (id: string) => session.connection.muteInputAudio({ eventId: id }),
            },
            {
              name: "session.input_audio.unmute",
              ack: "session.input_audio.unmuted",
              send: (id: string) => session.connection.unmuteInputAudio({ eventId: id }),
            },
            {
              name: "session.instructions.append",
              ack: "session.instructions.appended",
              send: (id: string) =>
                session.connection.appendInstructions(
                  "Communicate any appended commentary promptly.",
                  { eventId: id },
                ),
            },
            {
              name: "session.thinking.append",
              ack: "session.thinking.appended",
              send: (id: string) =>
                session.connection.appendThinking("A harmless test context note.", { eventId: id }),
            },
            {
              name: "session.commentary.append",
              ack: "session.commentary.appended",
              send: (id: string) =>
                session.connection.appendCommentary(
                  "Say: the controls verification word is cobalt.",
                  { eventId: id },
                ),
            },
          ];
          for (const command of commands) {
            await feature(report, command.name, async () => {
              const from = session.events.length;
              const id = randomUUID();
              await command.send(id);
              await until(
                session,
                () =>
                  session.events
                    .slice(from)
                    .some(
                      (event) =>
                        event.type === command.ack &&
                        "client_event_id" in event &&
                        event.client_event_id === id,
                    ),
                from,
              );
            });
          }
          await feature(
            report,
            "session.input_audio.append/output_transcripts/output_audio",
            async () => {
              const from = session.events.length;
              await session.connection.sendAudio(new Uint8Array(4800));
              await until(
                session,
                () => report.outputBytes > 4800 && /cobalt/i.test(report.outputTranscript),
                from,
              );
            },
          );
          const from = session.events.length;
          await feature(report, "response.item.create + response.create", async () => {
            await session.connection.sendResponseItem({
              type: "message",
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: "Reply with: the backend verification word is indigo.",
                },
              ],
            });
            await session.connection.requestResponse();
            await until(
              session,
              () =>
                session.events
                  .slice(from)
                  .some(
                    (event) =>
                      event.type === "response.event" &&
                      event.event.type === "response.completed" &&
                      isRecord(event.event.response) &&
                      event.event.response.status === "completed",
                  ),
              from,
              45_000,
            );
            await until(session, () => /indigo/i.test(report.outputTranscript), from);
          });
        } finally {
          await closeSession(session, report);
        }
      });
    },
  );

  it(
    "handles client-owned delegation and correlated context results",
    { timeout: 240_000 },
    async (context: VitestTestContext) => {
      await scenario("client-delegation", context, async (project, report) => {
        const config = definition();
        config.delegation = { type: "client" };
        config.instructions =
          "Delegate every user question to your client; never answer from your own knowledge. Speak the returned commentary exactly.";
        const agent = await create(project, report, config);
        const pcm = await delegationQuestion(project, report);
        const session = await openSession(project, agent, report, pcm);
        try {
          await feature(
            report,
            "client delegation + appendThinking/appendCommentary results",
            async () => {
              await until(
                session,
                () =>
                  session.events.some(
                    (event) =>
                      event.type === "session.delegation.created" &&
                      event.delegation.target === "client",
                  ),
                0,
                45_000,
              );
              const created = session.events.find(
                (event) =>
                  event.type === "session.delegation.created" &&
                  event.delegation.target === "client",
              );
              requireFeature(
                created?.type === "session.delegation.created",
                "missing_client_delegation",
              );
              const thinking = randomUUID();
              const commentary = randomUUID();
              const from = session.events.length;
              await session.connection.appendThinking(
                "The local application completed its test work.",
                { delegationId: created.delegation.id, eventId: thinking },
              );
              await session.connection.appendCommentary(
                "The client verification word is silverleaf.",
                { delegationId: created.delegation.id, eventId: commentary },
              );
              await until(
                session,
                () =>
                  session.events
                    .slice(from)
                    .some(
                      (event) =>
                        event.type === "session.commentary.appended" &&
                        event.client_event_id === commentary,
                    ),
                from,
              );
              await until(
                session,
                () => /silverleaf/i.test(report.outputTranscript) && report.outputBytes > 4800,
                from,
              );
            },
          );
        } finally {
          await closeSession(session, report);
        }
      });
    },
  );

  it(
    "delegates to an owned Foundry prompt agent and speaks its result",
    { timeout: 240_000 },
    async (context: VitestTestContext) => {
      await scenario("managed-delegation", context, async (project, report) => {
        const backend = `sdk-live-managed-${randomUUID().slice(0, 8)}`;
        report.agentNames.push(backend);
        const backendAgent = await project.agents.create(
          backend,
          {
            kind: "prompt",
            model: backendModel,
            instructions:
              "For every request, return exactly [commentary]The managed verification word is obsidian.[/commentary]. Do not use tools.",
          },
          { abortSignal: AbortSignal.timeout(30_000) },
        );
        const config = definition();
        config.delegation = {
          type: "foundry_managed_agent",
          agent_name: backend,
          agent_version: backendAgent.versions.latest.version,
        };
        config.instructions =
          "Delegate every user question to your configured backend. Never answer yourself or invent a verification word. Speak returned commentary exactly.";
        const agent = await create(project, report, config);
        const pcm = await delegationQuestion(project, report);
        const session = await openSession(project, agent, report, pcm);
        try {
          await feature(
            report,
            "foundry_managed_agent backend result and spoken output",
            async () => {
              await until(
                session,
                () => /obsidian/i.test(report.outputTranscript) && report.outputBytes > 4800,
                0,
                60_000,
              );
            },
          );
          await feature(
            report,
            "managed native session.delegation.created forwarding",
            async () => {
              requireFeature(
                session.events.some((event) => event.type === "session.delegation.created"),
                "missing_managed_native_delegation",
              );
            },
          );
          await feature(report, "managed backend response.event forwarding", async () => {
            requireFeature(
              session.events.some((event) => event.type === "response.event"),
              "missing_managed_backend_events",
            );
          });
        } finally {
          await closeSession(session, report);
        }
      });
    },
  );
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
