// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import type { OperationOptions } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RestError } from "@azure/core-rest-pipeline";
import { delay } from "@azure/core-util";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type {
  AIProjectClient,
  AgentDefinitionUnion,
  AgentVersion,
  BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  VoiceAgentLiveConversation,
  VoiceAgentLiveConversationItemUnion,
  VoiceAgentLiveDefinition,
  VoiceAgentLiveInputConversationItem,
  VoiceAgentLiveOutputConversationItem,
  VoiceAudioItem,
  VoiceRecording,
} from "@azure/ai-projects";
import { describe, expect, it } from "vitest";
import { LiveSpeechActivity, runLiveAudioSession } from "../e2eTypes.js";
import { createProjectsClient, createRecorder } from "../../utils/createClient.js";

const preview = "VoiceAgents=V1Preview" as const;
const conversationApi = "beta.voiceAgents.liveConversations.";
const requiredApis = [
  ...[
    "create",
    "get",
    "update",
    "createVersion",
    "getVersion",
    "listVersions",
    "list",
    "deleteVersion",
    "delete",
  ].map((name) => `agents.${name}`),
  ...[
    "list",
    "get",
    "delete",
    "listItems",
    "getItem",
    "getAudioItem",
    "downloadAudioItem",
    "getAudio",
    "downloadAudio",
  ].map((name) => `${conversationApi}${name}`),
];

interface HttpObservation {
  status: number;
  code: string | null;
  method: string;
  path: string;
  bodyBytes: number;
  retryAfterMs?: number;
  after?: string;
  before?: string;
  limit?: string;
  order?: string;
}

interface ApiObservation {
  api: string;
  scenario: string;
  outcome: "running" | "passed" | "failed" | "blocked";
  http: HttpObservation[];
  elapsedMs?: number;
  code?: string;
  message?: string;
}

interface StoredSession {
  ordinal: number;
  sessionId?: string;
  conversationId?: string;
  inputBytes: number;
  outputBytes: number;
  outputNonSilentSamples: number;
  inputTranscript: string;
  outputTranscript: string;
  events: Record<string, number>;
  closeReason?: string;
  socketCode?: number;
  usageSeconds?: number;
  outputFile?: string;
  outputSha256?: string;
}

interface WaveObservation {
  file: string;
  bytes: number;
  sha256: string;
  sampleRate: number;
  channels: number;
  bitsPerSample: number;
  pcmBytes: number;
  durationMs: number;
  nonSilentSamples: number[];
}

interface PollOptions<T> {
  ready?: (value: T) => boolean;
  verify?: (value: T) => void;
  timeoutMs?: number;
  retryStatuses?: number[];
  expectedErrorStatus?: number;
}

class PersistenceRun {
  public readonly runId = randomUUID();
  public readonly agentName = `sdk-live-persistence-${this.runId.slice(0, 12)}`;
  public readonly startedAt = new Date().toISOString();
  public readonly apis: ApiObservation[] = [];
  public readonly sessions: StoredSession[] = [];
  public readonly waves: WaveObservation[] = [];
  public readonly versions: AgentVersion[] = [];
  public readonly conversations: Record<string, VoiceAgentLiveConversation> = {};
  public readonly items: Record<string, VoiceAgentLiveConversationItemUnion[]> = {};
  public readonly recordings: Record<string, VoiceRecording> = {};
  public readonly audioItems: VoiceAudioItem[] = [];
  public readonly deletedConversations = new Set<string>();
  public agentCreateAttempted = false;
  public agentDeleted = false;
  public ownershipConfirmed = false;
  private readonly deadline = Date.now() + 240_000;
  private cleaningUp = false;
  public readonly outputPath =
    process.env["GPT_LIVE_PERSISTENCE_OUTPUT_PATH"] ??
    join(tmpdir(), "azure-ai-projects-live-persistence", this.agentName, "results.json");

  public block(api: string, scenario: string, message: string): void {
    this.apis.push({ api, scenario, outcome: "blocked", http: [], message });
  }

  public get remainingMs(): number {
    return Math.max(0, this.deadline - Date.now());
  }

  public beginCleanup(): void {
    this.cleaningUp = true;
  }

  // Failures remain in the matrix so an unavailable API cannot hide independent API results.
  public async call<T>(
    api: string,
    scenario: string,
    operation: (options: OperationOptions) => Promise<T>,
    poll: PollOptions<T> = {},
  ): Promise<T | undefined> {
    const observation: ApiObservation = { api, scenario, outcome: "running", http: [] };
    this.apis.push(observation);
    const started = Date.now();
    const deadline = Math.min(
      started + (poll.timeoutMs ?? 15_000),
      this.deadline + (this.cleaningUp ? 55_000 : 0),
    );
    if (deadline <= started) {
      observation.outcome = "blocked";
      observation.message = "The bounded execution budget is exhausted; cleanup time is reserved.";
      return undefined;
    }
    try {
      for (;;) {
        const remaining = deadline - Date.now();
        if (remaining <= 0) throw new Error("Persistence readiness deadline exceeded.");
        const options: OperationOptions = {
          abortSignal: AbortSignal.timeout(Math.min(30_000, remaining)),
          requestOptions: { timeout: Math.min(30_000, remaining) },
          onResponse: (response) => {
            const url = new URL(response.request.url);
            const retryAfter = response.headers.get("retry-after");
            const retryAfterMs = retryAfter
              ? /^\d+(\.\d+)?$/.test(retryAfter)
                ? Number(retryAfter) * 1000
                : Math.max(0, Date.parse(retryAfter) - Date.now())
              : undefined;
            observation.http.push({
              status: response.status,
              code: errorCode(response.parsedBody) ?? null,
              method: response.request.method,
              path: url.pathname.replace(/^.*?(\/agents(?:\/|$))/, "$1"),
              bodyBytes: response.bodyAsText?.length ?? 0,
              retryAfterMs: Number.isFinite(retryAfterMs) ? retryAfterMs : undefined,
              after: url.searchParams.get("after") ?? undefined,
              before: url.searchParams.get("before") ?? undefined,
              limit: url.searchParams.get("limit") ?? undefined,
              order: url.searchParams.get("order") ?? undefined,
            });
          },
        };
        try {
          const value = await operation(options);
          if (poll.expectedErrorStatus !== undefined) {
            throw new Error(`Expected HTTP ${poll.expectedErrorStatus}, but the call succeeded.`);
          }
          if (!poll.ready || poll.ready(value)) {
            poll.verify?.(value);
            observation.outcome = "passed";
            return value;
          }
        } catch (error) {
          if (
            poll.expectedErrorStatus !== undefined &&
            error instanceof RestError &&
            error.statusCode === poll.expectedErrorStatus
          ) {
            observation.outcome = "passed";
            return undefined;
          }
          if (
            !(error instanceof RestError) ||
            !poll.retryStatuses?.includes(error.statusCode ?? 0) ||
            errorCode(error.details) === "recording_unavailable"
          ) {
            throw error;
          }
          if (Date.now() >= deadline) throw error;
        }
        const lastResponse = observation.http.at(-1);
        const wait = Math.max(250, lastResponse?.retryAfterMs ?? 1000);
        if (Date.now() + wait >= deadline) {
          throw new Error("Persistence readiness deadline exceeded before the next allowed retry.");
        }
        await delay(wait);
      }
    } catch (error) {
      observation.outcome = "failed";
      observation.code =
        error instanceof RestError ? (errorCode(error.details) ?? error.code) : errorName(error);
      observation.message =
        error instanceof RestError
          ? `HTTP ${error.statusCode ?? "unavailable"}`
          : error instanceof Error
            ? error.message
            : "A non-Error value was thrown.";
      return undefined;
    } finally {
      observation.elapsedMs = Date.now() - started;
    }
  }

  public async persist(): Promise<void> {
    await mkdir(dirname(this.outputPath), { recursive: true });
    await writeFile(
      this.outputPath,
      JSON.stringify(
        {
          startedAt: this.startedAt,
          finishedAt: new Date().toISOString(),
          runId: this.runId,
          agentName: this.agentName,
          agentDeleted: this.agentDeleted,
          deletedConversations: [...this.deletedConversations],
          apis: this.apis,
          sessions: this.sessions,
          conversations: this.conversations,
          items: this.items,
          recordings: this.recordings,
          audioItems: this.audioItems,
          waves: this.waves,
          versions: this.versions,
        },
        undefined,
        2,
      ),
    );
  }
}

function errorName(value: unknown): string {
  return value instanceof Error ? value.name : "NonError";
}

function errorCode(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  if ("error" in value) return errorCode(value.error);
  return "code" in value && typeof value.code === "string" ? value.code : undefined;
}

function isLiveDefinition(value: AgentDefinitionUnion): value is VoiceAgentLiveDefinition {
  return (
    value.kind === "voice" &&
    "sub_protocol" in value &&
    value.sub_protocol === "live" &&
    "model_type" in value &&
    value.model_type === "self_deployed" &&
    "model" in value &&
    typeof value.model === "string"
  );
}

function isSpeechItem(
  value: VoiceAgentLiveConversationItemUnion,
): value is VoiceAgentLiveInputConversationItem | VoiceAgentLiveOutputConversationItem {
  return (
    (value.type === "input" || value.type === "output") &&
    ("transcription" in value || "audio" in value)
  );
}

async function collect<T>(iterable: AsyncIterable<T>, maximum = 100): Promise<T[]> {
  const values: T[] = [];
  for await (const value of iterable) {
    values.push(value);
    if (values.length > maximum) throw new Error(`Pagination exceeded ${maximum} owned results.`);
  }
  return values;
}

async function verifyCursorPages<T extends { id: string }>(
  create: () => PagedAsyncIterableIterator<T>,
  expectedIds: string[],
): Promise<void> {
  const pages = create().byPage({ maxPageSize: 1 });
  const first = await pages.next();
  expect(first.done).toBe(false);
  if (first.done) throw new Error("No first page was returned.");
  expect(first.value).toHaveLength(1);
  const page = first.value;
  if (!("continuationToken" in page) || typeof page.continuationToken !== "string") {
    throw new Error("A limit=1 page with more owned results has no continuation token.");
  }
  const resumed = await collect(
    create().byPage({ continuationToken: page.continuationToken, maxPageSize: 1 }),
  );
  for (const resumedPage of resumed) expect(resumedPage).toHaveLength(1);
  const ids = [...page, ...resumed.flat()].map((value) => value.id);
  expect(new Set(ids).size).toBe(ids.length);
  expect(ids.toSorted()).toEqual(expectedIds.toSorted());
}

async function exerciseDefinitions(
  project: AIProjectClient,
  run: PersistenceRun,
  definition: VoiceAgentLiveDefinition,
): Promise<void> {
  const metadata = { suite: "live-persistence", owner: run.runId };
  run.agentCreateAttempted = true;
  const created = await run.call(
    "agents.create",
    "stored Live definition",
    (options) =>
      project.agents.create(run.agentName, definition, {
        ...options,
        foundryFeatures: preview,
        metadata,
        description: "Owned real-service Live persistence E2E",
      }),
    {
      timeoutMs: 35_000,
      verify: (agent) => {
        run.ownershipConfirmed = agent.versions.latest.metadata?.["owner"] === run.runId;
        run.versions.push(agent.versions.latest);
        expect(agent.name).toBe(run.agentName);
        expect(isLiveDefinition(agent.versions.latest.definition)).toBe(true);
        expect(agent.versions.latest.definition).toMatchObject(definition);
        expect(agent.versions.latest.metadata).toEqual(metadata);
      },
    },
  );
  const retrieved = await run.call(
    "agents.get",
    "preserves Live definition",
    (options) => project.agents.get(run.agentName, options),
    {
      verify: (agent) => {
        expect(agent.versions.latest.metadata).toEqual(metadata);
        run.ownershipConfirmed = true;
        expect(agent.versions.latest.definition).toMatchObject(definition);
      },
    },
  );
  if (!run.ownershipConfirmed) {
    throw new Error("No owned Live agent was established; refusing further agent mutations.");
  }
  const updatedDefinition: VoiceAgentLiveDefinition = {
    ...definition,
    instructions: `${definition.instructions} This is the updated version.`,
  };
  const updated = await run.call(
    "agents.update",
    "new immutable Live version",
    (options) =>
      project.agents.update(run.agentName, updatedDefinition, {
        ...options,
        foundryFeatures: preview,
        metadata,
      }),
    {
      verify: (agent) => {
        run.versions.push(agent.versions.latest);
        expect(agent.versions.latest.definition).toMatchObject(updatedDefinition);
        if (created) {
          expect(agent.versions.latest.version).not.toBe(created.versions.latest.version);
        }
      },
    },
  );
  const newestDefinition: VoiceAgentLiveDefinition = {
    ...updatedDefinition,
    instructions: `${updatedDefinition.instructions} Answer with one concise sentence.`,
  };
  const newest = await run.call(
    "agents.createVersion",
    "explicit Live version",
    (options) =>
      project.agents.createVersion(run.agentName, newestDefinition, {
        ...options,
        foundryFeatures: preview,
        metadata,
      }),
    {
      verify: (version) => {
        run.versions.push(version);
        expect(version.definition).toMatchObject(newestDefinition);
        expect(version.metadata).toEqual(metadata);
        if (updated) expect(version.version).not.toBe(updated.versions.latest.version);
      },
    },
  );
  const original = created?.versions.latest ?? retrieved?.versions.latest;
  for (const version of [original, newest]) {
    if (!version) continue;
    await run.call(
      "agents.getVersion",
      version.version,
      (options) => project.agents.getVersion(run.agentName, version.version, options),
      { verify: (read) => expect(read.definition).toEqual(version.definition) },
    );
  }
  const versions = await run.call(
    "agents.listVersions",
    "limit=1 automatic cursor iteration",
    (options) =>
      collect(project.agents.listVersions(run.agentName, { ...options, limit: 1, order: "asc" })),
    {
      verify: (values) => {
        for (const version of [original, updated?.versions.latest, newest]) {
          if (version) expect(values.map((value) => value.version)).toContain(version.version);
        }
        for (const version of values) {
          expect(isLiveDefinition(version.definition)).toBe(true);
          expect(version.definition).toMatchObject({
            model: definition.model,
            store: true,
            audio: definition.audio,
            delegation: definition.delegation,
          });
        }
      },
    },
  );
  if (versions && versions.length > 1) {
    await run.call("agents.listVersions", "byPage continuation", (options) =>
      verifyCursorPages(
        () => project.agents.listVersions(run.agentName, { ...options, limit: 1, order: "asc" }),
        versions.map((version) => version.id),
      ),
    );
  }
  await run.call("agents.list", "find only the owned agent", async (options) => {
    for await (const agent of project.agents.list({
      ...options,
      kind: "voice",
      limit: 100,
      order: "desc",
    })) {
      if (agent.name === run.agentName) {
        expect(agent.versions.latest.definition).toMatchObject({
          ...definition,
          instructions: newest
            ? newestDefinition.instructions
            : updated
              ? updatedDefinition.instructions
              : definition.instructions,
        });
        return;
      }
    }
    throw new Error("The created Live agent is absent from agents.list.");
  });
  if (original && (newest || updated)) {
    await run.call("agents.deleteVersion", original.version, async (options) => {
      const deleted = await project.agents.deleteVersion(run.agentName, original.version, options);
      expect(deleted.deleted).toBe(true);
    });
    await run.call(
      "agents.getVersion",
      "deleted version is 404",
      (options) => project.agents.getVersion(run.agentName, original.version, options),
      { expectedErrorStatus: 404 },
    );
    await run.call(
      "agents.listVersions",
      "deleted version is absent",
      (options) => collect(project.agents.listVersions(run.agentName, { ...options, limit: 1 })),
      {
        verify: (values) =>
          expect(values.map((value) => value.version)).not.toContain(original.version),
      },
    );
  } else {
    run.block(
      "agents.deleteVersion",
      "immutable version cleanup",
      "No superseded owned version exists.",
    );
  }
}

async function createStoredSession(
  project: AIProjectClient,
  run: PersistenceRun,
  input: Uint8Array,
  ordinal: number,
): Promise<void> {
  const observed: StoredSession = {
    ordinal,
    inputBytes: input.length,
    outputBytes: 0,
    outputNonSilentSamples: 0,
    inputTranscript: "",
    outputTranscript: "",
    events: {},
  };
  run.sessions.push(observed);
  if (run.remainingMs < 65_000) {
    run.block(
      "beta.voiceAgents.live.connect",
      `stored speech session ${ordinal}`,
      "Insufficient bounded time remains to open and reliably finalize a speech session.",
    );
    return;
  }
  await run.call(
    "beta.voiceAgents.live.connect",
    `stored speech session ${ordinal}`,
    async () => {
      const connection = await project.beta.voiceAgents.live.connect(run.agentName, {
        store: true,
        abortSignal: AbortSignal.timeout(60_000),
      });
      const speech = new LiveSpeechActivity();
      const output: Uint8Array[] = [];
      try {
        await runLiveAudioSession(
          connection,
          (event) => {
            observed.events[event.type] = (observed.events[event.type] ?? 0) + 1;
            if (event.type === "session.started") {
              observed.sessionId = event.session.id;
              observed.conversationId = event.conversation_id;
              expect(event.conversation_id).toBeTruthy();
              expect(event.conversation_id).not.toBe(event.session.id);
            } else if (event.type === "session.input_transcript.delta") {
              observed.inputTranscript += event.delta;
            } else if (event.type === "session.output_transcript.delta") {
              observed.outputTranscript += event.delta;
            }
            const bytes = speech.observe(event);
            if (bytes) {
              output.push(bytes);
              observed.outputBytes += bytes.length;
              const pcm = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
              for (let offset = 0; offset < bytes.length; offset += 2) {
                if (Math.abs(pcm.getInt16(offset, true)) > 256) observed.outputNonSilentSamples++;
              }
            }
          },
          (signal, inputComplete) =>
            speech.waitForSpeech(
              signal,
              () => inputComplete() && observed.inputTranscript.trim().length > 0,
              45_000,
            ),
          input,
        );
      } finally {
        if (connection.state !== "disconnected") await connection.close();
        const closed = await connection.closed;
        observed.socketCode = closed.code;
        observed.closeReason = closed.sessionClosed?.reason;
        observed.usageSeconds = closed.sessionClosed?.usage.seconds;
        if (output.length > 0) {
          const pcm = Buffer.concat(output);
          observed.outputFile = `${observed.sessionId ?? `session-${ordinal}`}-output.pcm`;
          observed.outputSha256 = createHash("sha256").update(pcm).digest("hex");
          await mkdir(dirname(run.outputPath), { recursive: true });
          await writeFile(join(dirname(run.outputPath), observed.outputFile), pcm);
        }
      }
      expect(observed.events["session.started"]).toBe(1);
      expect(observed.inputTranscript.trim()).not.toBe("");
      expect(observed.outputTranscript.trim()).not.toBe("");
      expect(observed.outputNonSilentSamples).toBeGreaterThan(0);
      expect(observed.closeReason).toBe("close_requested");
      expect(observed.socketCode).toBe(1000);
      expect(observed.usageSeconds).toBeGreaterThan(0);
    },
    { timeoutMs: 65_000 },
  );
}

function checkAudioMetadata(audio: VoiceAudioItem, conversationId: string, itemId: string): void {
  expect(audio.conversation_id).toBe(conversationId);
  expect(audio.item_id).toBe(itemId);
  if (audio.format !== undefined) expect(audio.format).toBe("wav");
  if (audio.codec !== undefined) expect(audio.codec).toBe("pcm16");
  if (audio.sample_rate !== undefined) expect(audio.sample_rate).toBe(24000);
  if (audio.channels !== undefined) expect(audio.channels).toBe(1);
  if (audio.duration_ms !== undefined) expect(audio.duration_ms).toBeGreaterThan(0);
  if (audio.start_offset_ms !== undefined) expect(audio.start_offset_ms).toBeGreaterThanOrEqual(0);
}

async function downloadWave(
  run: PersistenceRun,
  response: BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  filename: string,
  expectedChannels: number,
  metadata?: VoiceAudioItem | VoiceRecording,
): Promise<void> {
  const stream = response.readableStreamBody;
  if (!(stream instanceof Readable)) {
    throw new Error("The Node WAV response has no readable stream.");
  }
  const timer = setTimeout(
    () => stream.destroy(new Error("WAV download deadline exceeded.")),
    12_000,
  );
  let bytes: Buffer;
  try {
    bytes = await buffer(stream);
  } finally {
    clearTimeout(timer);
    stream.destroy();
  }
  await mkdir(dirname(run.outputPath), { recursive: true });
  await writeFile(join(dirname(run.outputPath), filename), bytes);
  expect(bytes.length).toBeGreaterThan(44);
  expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
  expect(bytes.toString("ascii", 8, 12)).toBe("WAVE");
  expect(bytes.readUInt32LE(4) + 8).toBe(bytes.length);
  let dataOffset = 0;
  let dataBytes = 0;
  let channels = 0;
  let sampleRate = 0;
  let bitsPerSample = 0;
  let blockAlign = 0;
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const size = bytes.readUInt32LE(offset + 4);
    const start = offset + 8;
    expect(start + size).toBeLessThanOrEqual(bytes.length);
    const chunk = bytes.toString("ascii", offset, offset + 4);
    if (chunk === "fmt ") {
      expect(size).toBeGreaterThanOrEqual(16);
      expect(bytes.readUInt16LE(start)).toBe(1);
      channels = bytes.readUInt16LE(start + 2);
      sampleRate = bytes.readUInt32LE(start + 4);
      blockAlign = bytes.readUInt16LE(start + 12);
      bitsPerSample = bytes.readUInt16LE(start + 14);
      expect(bytes.readUInt32LE(start + 8)).toBe(sampleRate * blockAlign);
    } else if (chunk === "data") {
      dataOffset = start;
      dataBytes = size;
    }
    offset = start + size + (size % 2);
  }
  expect(channels).toBe(expectedChannels);
  expect(sampleRate).toBe(24000);
  expect(bitsPerSample).toBe(16);
  expect(blockAlign).toBe(channels * 2);
  expect(dataBytes).toBeGreaterThan(0);
  expect(dataBytes % blockAlign).toBe(0);
  const nonSilentSamples = Array.from({ length: channels }, () => 0);
  for (let offset = 0; offset < dataBytes; offset += 2) {
    if (Math.abs(bytes.readInt16LE(dataOffset + offset)) > 256) {
      const channel = (offset / 2) % channels;
      nonSilentSamples[channel] = (nonSilentSamples[channel] ?? 0) + 1;
    }
  }
  const durationMs = (dataBytes / blockAlign / sampleRate) * 1000;
  run.waves.push({
    file: filename,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    sampleRate,
    channels,
    bitsPerSample,
    pcmBytes: dataBytes,
    durationMs,
    nonSilentSamples,
  });
  for (const count of nonSilentSamples) expect(count).toBeGreaterThan(0);
  if (metadata?.sample_rate !== undefined) expect(sampleRate).toBe(metadata.sample_rate);
  if (metadata?.channels !== undefined) expect(channels).toBe(metadata.channels);
  if (metadata?.duration_ms !== undefined) {
    expect(Math.abs(durationMs - metadata.duration_ms)).toBeLessThanOrEqual(1);
  }
}

async function exerciseConversation(
  project: AIProjectClient,
  run: PersistenceRun,
  conversationId: string,
): Promise<void> {
  const conversations = project.beta.voiceAgents.liveConversations;
  await run.call(
    `${conversationApi}get`,
    conversationId,
    (options) => conversations.get(run.agentName, conversationId, options),
    {
      timeoutMs: 20_000,
      retryStatuses: [404, 409],
      ready: (conversation) => conversation.status !== "in_progress",
      verify: (conversation) => {
        run.conversations[conversationId] = conversation;
        expect(conversation.id).toBe(conversationId);
        expect(conversation.object).toBe("voice.conversation");
        expect(conversation.status).toBe("completed");
        expect(conversation.last_error).toBeUndefined();
        expect(conversation.created_at.getTime()).toBeGreaterThan(0);
        expect(conversation.completed_at?.getTime()).toBeGreaterThanOrEqual(
          conversation.created_at.getTime(),
        );
        expect(conversation.usage?.seconds).toBeGreaterThan(0);
      },
    },
  );
  const items = await run.call(
    `${conversationApi}listItems`,
    `${conversationId} limit=1 automatic iteration`,
    (options) =>
      collect(
        conversations.listItems(run.agentName, conversationId, {
          ...options,
          limit: 1,
          order: "asc",
        }),
      ),
    {
      timeoutMs: 15_000,
      retryStatuses: [404, 409],
      ready: (values) =>
        values.some((value) => value.type === "input") &&
        values.some((value) => value.type === "output"),
      verify: (values) => {
        run.items[conversationId] = values;
        expect(new Set(values.map((value) => value.id)).size).toBe(values.length);
        const native = run.sessions.find((session) => session.conversationId === conversationId);
        if (!native) throw new Error("No matching native session exists for the stored speech.");
        for (const type of ["input", "output"]) {
          const speech = values.filter(isSpeechItem).filter((value) => value.type === type);
          expect(speech.length).toBeGreaterThan(0);
          expect(speech.some((value) => value.transcription?.trim())).toBe(true);
          expect(speech.some((value) => value.audio)).toBe(true);
          const transcription = speech.map((value) => value.transcription ?? "").join("");
          const streamed = type === "input" ? native.inputTranscript : native.outputTranscript;
          const normalize = (text: string): string => text.toLowerCase().replace(/[^a-z0-9]/g, "");
          expect(normalize(transcription)).toBe(normalize(streamed));
          for (const item of speech) {
            if (item.audio) checkAudioMetadata(item.audio, conversationId, item.id);
          }
        }
      },
    },
  );
  if (items && items.length > 1) {
    await run.call(
      `${conversationApi}listItems`,
      `${conversationId} byPage continuation`,
      (options) =>
        verifyCursorPages(
          () =>
            conversations.listItems(run.agentName, conversationId, {
              ...options,
              limit: 1,
              order: "asc",
            }),
          items.map((item) => item.id),
        ),
    );
    await run.call(
      `${conversationApi}listItems`,
      `${conversationId} explicit after/before`,
      async (options) => {
        const first = items[0];
        const last = items.at(-1);
        if (!first || !last) throw new Error("No real items are available for cursor tests.");
        const after = await collect(
          conversations.listItems(run.agentName, conversationId, {
            ...options,
            after: first.id,
            limit: 1,
            order: "asc",
          }),
        );
        expect(after.map((item) => item.id)).toEqual(items.slice(1).map((item) => item.id));
        const before = await collect(
          conversations.listItems(run.agentName, conversationId, {
            ...options,
            before: last.id,
            limit: 100,
            order: "asc",
          }),
        );
        expect(before.map((item) => item.id)).toEqual(items.slice(0, -1).map((item) => item.id));
      },
    );
  }
  const speechItems = items?.filter(isSpeechItem) ?? [];
  for (const type of ["input", "output"]) {
    const item = speechItems.find((value) => value.type === type && value.audio);
    if (!item) {
      for (const api of ["getItem", "getAudioItem", "downloadAudioItem"]) {
        run.block(
          `${conversationApi}${api}`,
          `${conversationId} ${type}`,
          "No legitimate stored speech/audio item ID is available.",
        );
      }
      continue;
    }
    await run.call(
      `${conversationApi}getItem`,
      `${conversationId}/${item.id} ${type}`,
      (options) => conversations.getItem(run.agentName, conversationId, item.id, options),
      { verify: (value) => expect(value).toEqual(item) },
    );
    const audio = await run.call(
      `${conversationApi}getAudioItem`,
      `${conversationId}/${item.id} ${type}`,
      (options) => conversations.getAudioItem(run.agentName, conversationId, item.id, options),
      {
        timeoutMs: 15_000,
        retryStatuses: [404, 409],
        verify: (value) => {
          run.audioItems.push(value);
          checkAudioMetadata(value, conversationId, item.id);
          expect(value.role).toBe(type === "input" ? "user" : "agent");
          expect(value).toMatchObject(item.audio ?? {});
        },
      },
    );
    await run.call(
      `${conversationApi}downloadAudioItem`,
      `${conversationId}/${item.id} ${type}`,
      async (options) =>
        downloadWave(
          run,
          await conversations.downloadAudioItem(run.agentName, conversationId, item.id, options),
          `${conversationId}-${item.id}-${type}.wav`,
          1,
          audio,
        ),
      { timeoutMs: 20_000, retryStatuses: [404, 409] },
    );
  }
  const recording = await run.call(
    `${conversationApi}getAudio`,
    `${conversationId} merged recording`,
    (options) => conversations.getAudio(run.agentName, conversationId, options),
    {
      timeoutMs: 20_000,
      retryStatuses: [404, 409],
      verify: (value) => {
        run.recordings[conversationId] = value;
        expect(value.conversation_id).toBe(conversationId);
        expect(value.format).toBe("wav");
        expect(value.sample_rate).toBe(24000);
        expect(value.channels).toBe(2);
        expect(value.channel_layout).toEqual({ left: "user", right: "agent" });
        expect(value.duration_ms).toBeGreaterThan(0);
      },
    },
  );
  await run.call(
    `${conversationApi}downloadAudio`,
    `${conversationId} merged recording`,
    async (options) =>
      downloadWave(
        run,
        await conversations.downloadAudio(run.agentName, conversationId, options),
        `${conversationId}-stereo.wav`,
        2,
        recording,
      ),
    { timeoutMs: 20_000, retryStatuses: [404, 409] },
  );
}

async function deleteConversation(
  project: AIProjectClient,
  run: PersistenceRun,
  id: string,
): Promise<void> {
  const conversations = project.beta.voiceAgents.liveConversations;
  await run.call(
    `${conversationApi}delete`,
    id,
    async (options) => {
      await conversations.delete(run.agentName, id, options);
      run.deletedConversations.add(id);
    },
    { timeoutMs: 5000 },
  );
  if (!run.deletedConversations.has(id)) {
    run.block(
      `${conversationApi}get`,
      `${id} deletion verification`,
      "Delete did not succeed; an existing 404 would not prove a deletion transition.",
    );
    run.block(
      `${conversationApi}list`,
      `${id} deletion verification`,
      "Delete did not succeed, so listing absence cannot establish deletion.",
    );
    return;
  }
  await run.call(
    `${conversationApi}get`,
    `${id} deleted is 404`,
    (options) => conversations.get(run.agentName, id, options),
    { expectedErrorStatus: 404, timeoutMs: 5000 },
  );
  await run.call(
    `${conversationApi}list`,
    `${id} deleted is absent`,
    (options) => collect(conversations.list(run.agentName, { ...options, limit: 1, order: "asc" })),
    {
      timeoutMs: 5000,
      verify: (values) => expect(values.map((value) => value.id)).not.toContain(id),
    },
  );
}

// Persistence and primary audio WebSockets require real service state, not HTTP playback.
describe.runIf(isLiveMode())("GPT Live REST and persistence E2E", () => {
  it(
    "round-trips Live definitions and every stored conversation operation",
    { timeout: 300_000 },
    async (context: VitestTestContext) => {
      const run = new PersistenceRun();
      let recorder: Recorder | undefined;
      let project: AIProjectClient | undefined;
      try {
        recorder = await createRecorder(context);
        project = createProjectsClient(recorder, {
          retryOptions: { maxRetries: 0 },
          liveOptions: {
            credentialScopes: ["https://ai.azure.com/.default"],
            connectionTimeoutInMs: 15_000,
            sessionTimeoutInMs: 20_000,
            closeTimeoutInMs: 8_000,
          },
        });
        const definition: VoiceAgentLiveDefinition = {
          kind: "voice",
          sub_protocol: "live",
          model_type: "self_deployed",
          model: process.env["FOUNDRY_LIVE_MODEL"]?.trim() || "gpt-live-1",
          instructions: "Answer the user's spoken question briefly. Do not speak before the user.",
          audio: { format: { type: "audio/pcm", rate: 24000 }, output: { voice: "marin" } },
          delegation: { type: "client" },
          store: true,
        };
        await exerciseDefinitions(project, run, definition);
        const conversations = project.beta.voiceAgents.liveConversations;
        await run.call(
          `${conversationApi}list`,
          "empty owned agent",
          (options) => collect(conversations.list(run.agentName, { ...options, limit: 1 })),
          { verify: (values) => expect(values).toEqual([]) },
        );
        const input = await readFile(
          new URL("../../../../samples-dev/agents/assets/input.pcm", import.meta.url),
        );
        expect(input.length).toBeGreaterThan(0);
        for (const ordinal of [1, 2]) await createStoredSession(project, run, input, ordinal);
        const ids = run.sessions.flatMap((session) =>
          session.conversationId ? [session.conversationId] : [],
        );
        const listed = await run.call(
          `${conversationApi}list`,
          "stored sessions limit=1",
          (options) =>
            collect(conversations.list(run.agentName, { ...options, limit: 1, order: "asc" })),
          {
            timeoutMs: 10_000,
            retryStatuses: [404, 409],
            ready: (values) => ids.every((id) => values.some((value) => value.id === id)),
            verify: (values) => {
              expect(ids).toHaveLength(2);
              expect(new Set(ids).size).toBe(2);
              expect(values.map((value) => value.id).toSorted()).toEqual(ids.toSorted());
            },
          },
        );
        if (listed && listed.length > 1) {
          await run.call(`${conversationApi}list`, "byPage continuation", (options) =>
            verifyCursorPages(
              () => conversations.list(run.agentName, { ...options, limit: 1, order: "asc" }),
              listed.map((conversation) => conversation.id),
            ),
          );
        }
        for (const id of ids) await exerciseConversation(project, run, id);
        if (ids.length === 0) {
          for (const api of requiredApis.filter(
            (name) => name.startsWith(conversationApi) && !name.endsWith(".list"),
          )) {
            run.block(
              api,
              "stored session prerequisite",
              "No session.started event supplied a legitimate stored conversation ID.",
            );
          }
        }
      } finally {
        run.beginCleanup();
        if (project && run.agentCreateAttempted && run.ownershipConfirmed) {
          const cleanupProject = project;
          const ids = new Set(
            run.sessions.flatMap((session) =>
              session.conversationId ? [session.conversationId] : [],
            ),
          );
          for (const id of ids) await deleteConversation(cleanupProject, run, id);
          await run.call("agents.delete", "owned agent cleanup", async (options) => {
            const deleted = await cleanupProject.agents.delete(run.agentName, options);
            expect(deleted.deleted).toBe(true);
            run.agentDeleted = true;
          });
          await run.call(
            "agents.get",
            "deleted agent is 404",
            (options) => cleanupProject.agents.get(run.agentName, options),
            { expectedErrorStatus: 404 },
          );
        }
        if (recorder) {
          const cleanupRecorder = recorder;
          await run.call("recorder.stop", "live recorder cleanup", () => cleanupRecorder.stop());
        }
        for (const api of requiredApis) {
          if (!run.apis.some((value) => value.api === api)) {
            run.block(
              api,
              "unexecuted prerequisite",
              "An earlier prerequisite did not yield the real owned resource required by this API.",
            );
          }
        }
        await run.persist();
      }
      expect(
        run.apis
          .filter((value) => value.outcome !== "passed")
          .map(({ api, scenario, outcome, http, code, message }) => ({
            api,
            scenario,
            outcome,
            statuses: [...new Set(http.map((value) => value.status))],
            code,
            message,
          })),
      ).toEqual([]);
      expect(run.agentDeleted).toBe(true);
    },
  );
});
