// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * llm.ts
 *
 * LLM interaction via the Copilot SDK.
 * Uses durable per-file sessions, attachment materialization, and
 * phase-aware session tuning to reduce prompt size and improve reliability.
 */

import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import {
  CopilotClient,
  CopilotSession,
  approveAll,
  defineTool,
  type MessageOptions,
  type ModelInfo,
  type SessionMetadata,
  type SessionConfig,
  type Tool,
  type CustomAgentConfig,
} from "@github/copilot-sdk";
import { defaults } from "./config.ts";
import { deepLog } from "./deep-log.ts";

// Singleton client — created once, reused across all LLM calls.
let sharedClient: CopilotClient | undefined;
let authenticated = false;
let knownModels: ModelInfo[] | undefined;
let clientWarm = false;
const gcCompletedForKey = new Set<string>();
const persistentSessionsById = new Map<string, PersistentSessionState>();

const SESSION_ID_PREFIX = "test-gen-";
const MAX_PERSISTED_SESSIONS_PER_PACKAGE = 24;
const SESSION_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

interface LlmTelemetry {
  clientStarts: number;
  healthChecks: number;
  sessionsCreated: number;
  sessionsResumed: number;
  sessionsDeleted: number;
  compactionsStarted: number;
  compactionsCompleted: number;
  proactiveCompactions: number;
  modelSwitches: number;
  quotaChecks: number;
  fleetStarts: number;
  lifecycleEvents: Record<string, number>;
  phaseModels: Record<string, number>;
}

/** Quota snapshot for a single quota type. */
export interface QuotaSnapshot {
  entitlementRequests: number;
  usedRequests: number;
  remainingPercentage: number;
  overage: number;
  overageAllowedWithExhaustedQuota: boolean;
  resetDate?: string;
}

/** Result of a quota check. */
export interface QuotaInfo {
  quotaSnapshots: Record<string, QuotaSnapshot>;
  belowThreshold: boolean;
  lowestRemainingPct: number;
}

const telemetry: LlmTelemetry = {
  clientStarts: 0,
  healthChecks: 0,
  sessionsCreated: 0,
  sessionsResumed: 0,
  sessionsDeleted: 0,
  compactionsStarted: 0,
  compactionsCompleted: 0,
  proactiveCompactions: 0,
  modelSwitches: 0,
  quotaChecks: 0,
  fleetStarts: 0,
  lifecycleEvents: {},
  phaseModels: {},
};

/** Timeout for LLM responses — large prompts may take several minutes. */
const RESPONSE_TIMEOUT = 5 * 60_000;
const DISCONNECT_TIMEOUT = 5_000;
const PERSISTENT_COMPACTION_WAIT_TIMEOUT = 30_000;
const SYSTEM_MESSAGE =
  "You are a code generation assistant. " +
  "Respond ONLY with the requested output — no explanations, no markdown fences, no commentary.";

let llmConcurrency = defaults.llm.concurrency;
let activeLlmCalls = 0;
const llmWaiters: Array<() => void> = [];
let activeResolveCalls = 0;
const resolveWaiters: Array<() => void> = [];

export type LlmPhase = "resolve" | "generate" | "merge" | "fix" | "isolation" | "seed";
export type ReasoningEffort = "low" | "medium" | "high" | "xhigh";

export type SendAttachment =
  | {
      type: "file";
      path: string;
      displayName?: string;
    }
  | {
      type: "directory";
      path: string;
      displayName?: string;
    }
  | {
      type: "selection";
      filePath: string;
      displayName: string;
      selection?: {
        start: { line: number; character: number };
        end: { line: number; character: number };
      };
      text?: string;
    }
  | {
      type: "virtual-file";
      path: string;
      content: string;
      displayName?: string;
    };

interface PersistentSessionState {
  key: string;
  sessionId: string;
  session: CopilotSession;
  model: string;
  phase: LlmPhase;
  configDir?: string;
  seeded: boolean;
  queue: Promise<void>;
  releaseCompactionWait?: () => void;
  compactionWait?: Promise<void>;
  workspacePath?: string;
  seedArtifacts: Map<string, SeedArtifact>;
}

const sharedSessions = new Map<string, PersistentSessionState>();

interface SeedArtifact {
  alias: string;
  displayName: string;
  resolvedPath: string;
  attachmentType: "file" | "selection" | "virtual-file" | "directory";
}

function configureConcurrency(concurrency: number | undefined): void {
  llmConcurrency = Math.max(1, concurrency ?? defaults.llm.concurrency);
}

async function acquireLlmSlot(signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) throw new Error("Aborted");
  if (activeLlmCalls < llmConcurrency) {
    activeLlmCalls++;
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      const idx = llmWaiters.indexOf(wake);
      if (idx >= 0) llmWaiters.splice(idx, 1);
      reject(new Error("Aborted"));
    };
    const wake = () => {
      signal?.removeEventListener("abort", onAbort);
      activeLlmCalls++;
      resolve();
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    llmWaiters.push(wake);
  });
}

function releaseLlmSlot(): void {
  activeLlmCalls = Math.max(0, activeLlmCalls - 1);
  const next = llmWaiters.shift();
  if (next) next();
}

async function acquirePhaseSlot(phase: LlmPhase, signal?: AbortSignal): Promise<void> {
  if (phase !== "resolve") return;
  if (signal?.aborted) throw new Error("Aborted");
  if (activeResolveCalls === 0) {
    activeResolveCalls = 1;
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      const idx = resolveWaiters.indexOf(wake);
      if (idx >= 0) resolveWaiters.splice(idx, 1);
      reject(new Error("Aborted"));
    };
    const wake = () => {
      signal?.removeEventListener("abort", onAbort);
      activeResolveCalls = 1;
      resolve();
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    resolveWaiters.push(wake);
  });
}

function releasePhaseSlot(phase: LlmPhase): void {
  if (phase !== "resolve") return;
  activeResolveCalls = 0;
  const next = resolveWaiters.shift();
  if (next) next();
}

async function getClient(): Promise<CopilotClient> {
  if (!sharedClient) {
    const githubToken = process.env.GITHUB_TOKEN;
    sharedClient = new CopilotClient({
      useStdio: true,
      autoStart: true,
      logLevel: "error",
      ...(githubToken ? { githubToken } : {}),
    });
    await sharedClient.start();
    telemetry.clientStarts++;
    authenticated = false;
    knownModels = undefined;
    clientWarm = false;
    sharedClient.on((event) => {
      telemetry.lifecycleEvents[event.type] = (telemetry.lifecycleEvents[event.type] ?? 0) + 1;
    });
  }

  if (!authenticated) {
    const auth = await sharedClient.getAuthStatus();
    if (!auth.isAuthenticated) {
      throw new Error(
        "GitHub Copilot is not authenticated. Run `gh auth login` or set GITHUB_TOKEN.",
      );
    }
    authenticated = true;
  }

  if (!clientWarm) {
    await warmClient(sharedClient);
    clientWarm = true;
  }

  return sharedClient;
}

/** Shut down the shared client. Call once at process exit. */
export async function stopClient(): Promise<void> {
  if (!sharedClient) return;

  for (const state of sharedSessions.values()) {
    await Promise.race([
      state.session.disconnect().catch(() => undefined),
      new Promise<void>((resolve) => setTimeout(resolve, DISCONNECT_TIMEOUT)),
    ]);
  }
  sharedSessions.clear();
  persistentSessionsById.clear();
  gcCompletedForKey.clear();

  await sharedClient.stop();
  sharedClient = undefined;
  authenticated = false;
  knownModels = undefined;
  clientWarm = false;
}

export function configureLlm(options?: { concurrency?: number }): void {
  configureConcurrency(options?.concurrency);
}

export function getLlmTelemetry(): LlmTelemetry {
  return {
    ...telemetry,
    lifecycleEvents: { ...telemetry.lifecycleEvents },
    phaseModels: { ...telemetry.phaseModels },
  };
}

/** Default quota threshold (%) below which generation should stop. */
const DEFAULT_QUOTA_THRESHOLD_PCT = 5;

/**
 * Check remaining quota against a threshold.
 * Returns quota info including whether we're below the threshold.
 */
export async function checkQuota(
  thresholdPct = DEFAULT_QUOTA_THRESHOLD_PCT,
): Promise<QuotaInfo | undefined> {
  try {
    const client = await getClient();
    const result = await client.rpc.account.getQuota();
    telemetry.quotaChecks++;
    const snapshots = result.quotaSnapshots;
    let lowestPct = 100;
    for (const key of Object.keys(snapshots)) {
      const snapshot = snapshots[key];
      lowestPct = Math.min(lowestPct, snapshot.remainingPercentage);
    }
    return {
      quotaSnapshots: snapshots as Record<string, QuotaSnapshot>,
      belowThreshold: lowestPct < thresholdPct,
      lowestRemainingPct: lowestPct,
    };
  } catch {
    // Quota API may not be available — don't block on it
    return undefined;
  }
}

export interface SendOptions {
  model?: string;
  signal?: AbortSignal;
  /** Called with streaming token count updates for progress display. */
  onProgress?: (tokensSoFar: number) => void;
  /** Reuse a persistent session keyed by this ID. */
  sessionKey?: string;
  /** Session working directory for tools, attachments, and persisted workspace state. */
  workingDirectory?: string;
  /** SDK message attachments. */
  attachments?: SendAttachment[];
  /** LLM phase for phase-specific tuning. */
  phase?: LlmPhase;
  /** Override reasoning effort when supported by the model. */
  reasoningEffort?: ReasoningEffort;
  /** Override timeout for this send. */
  timeoutMs?: number;
}

export interface SeedSessionOptions extends Omit<SendOptions, "sessionKey"> {
  sessionKey: string;
  prompt: string;
}

/** Returned from send() with the response text and usage metadata. */
export interface SendResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
}

/** Send a prompt and return the response with usage stats. Streams progress via onProgress. */
export async function send(prompt: string, options?: SendOptions): Promise<SendResult> {
  const {
    model,
    signal,
    onProgress,
    sessionKey,
    attachments,
    workingDirectory,
    phase = "generate",
    reasoningEffort,
    timeoutMs,
  } = options ?? {};

  if (signal?.aborted) throw new Error("Aborted");
  const sendT0 = Date.now();
  const attachCount = attachments?.length ?? 0;
  await deepLog("llm_call", "send_start", {
    phase,
    sessionKey,
    model: model ?? defaults.llm.model,
    promptLen: prompt.length,
    attachments: attachCount,
  });
  await acquireLlmSlot(signal);
  await acquirePhaseSlot(phase, signal);
  try {
    const doSend = () =>
      sendWithRetry(async () => {
        const client = await getClient();
        const resolvedModel = await selectModel(client, model ?? defaults.llm.model, phase);

        if (sessionKey) {
          const state = await getOrCreatePersistentSession(
            client,
            resolvedModel,
            sessionKey,
            workingDirectory,
            phase,
            reasoningEffort,
          );
          return withSessionLock(state, signal, async () =>
            sendWithSession(state.session, prompt, {
              signal,
              onProgress,
              attachments,
              workingDirectory,
              timeoutMs,
              persistentState: state,
            }),
          );
        }

        const session = await client.createSession(
          await createSessionConfig(client, {
            model: resolvedModel,
            workingDirectory,
            phase,
            reasoningEffort,
            persistent: false,
          }),
        );

        try {
          return await sendWithSession(session, prompt, {
            signal,
            onProgress,
            attachments,
            workingDirectory,
            timeoutMs,
          });
        } finally {
          await Promise.race([
            session.disconnect().catch(() => undefined),
            new Promise<void>((resolve) => setTimeout(resolve, DISCONNECT_TIMEOUT)),
          ]);
        }
      }, sessionKey);

    let result: SendResult;
    try {
      result = await doSend();
    } catch (err) {
      if (sessionKey && isSessionTimeoutError(err as Error)) {
        await deepLog("error", "session_timeout_recovery", {
          phase,
          sessionKey,
          error: (err as Error).message,
        });
        const state = sharedSessions.get(sessionKey);
        if (state) {
          sharedSessions.delete(sessionKey);
          persistentSessionsById.delete(state.sessionId);
          await Promise.race([
            state.session.disconnect().catch(() => undefined),
            new Promise<void>((resolve) => setTimeout(resolve, DISCONNECT_TIMEOUT)),
          ]);
        }
        result = await doSend();
      } else {
        throw err;
      }
    }

    await deepLog("llm_call", "send_done", {
      phase,
      sessionKey,
      durationMs: Date.now() - sendT0,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      responseLen: result.content.length,
    });
    return result;
  } catch (err) {
    await deepLog("error", "send_error", {
      phase,
      sessionKey,
      durationMs: Date.now() - sendT0,
      error: (err as Error).message,
    });
    throw err;
  } finally {
    releasePhaseSlot(phase);
    releaseLlmSlot();
  }
}

export async function seedSession(options: SeedSessionOptions): Promise<void> {
  const {
    sessionKey,
    prompt,
    model,
    signal,
    attachments,
    workingDirectory,
    phase = "seed",
    reasoningEffort,
    timeoutMs,
  } = options;

  if (signal?.aborted) throw new Error("Aborted");
  const seedT0 = Date.now();
  await deepLog("llm_call", "seed_start", {
    sessionKey,
    model: model ?? defaults.llm.model,
    promptLen: prompt.length,
    attachments: attachments?.length ?? 0,
  });
  await acquireLlmSlot(signal);
  try {
    await sendWithRetry(async () => {
      const client = await getClient();
      const resolvedModel = await selectModel(client, model ?? defaults.llm.model, phase);
      const state = await getOrCreatePersistentSession(
        client,
        resolvedModel,
        sessionKey,
        workingDirectory,
        phase,
        reasoningEffort,
      );

      if (state.seeded) return;

      await withSessionLock(state, signal, async () => {
        if (state.seeded) return;
        await sendWithSession(state.session, prompt, {
          signal,
          attachments,
          workingDirectory,
          timeoutMs,
          persistentState: state,
          registerSeedArtifacts: true,
        });
        state.seeded = true;
      });
    }, sessionKey);
    await deepLog("llm_call", "seed_done", {
      sessionKey,
      durationMs: Date.now() - seedT0,
    });
  } catch (err) {
    await deepLog("error", "seed_error", {
      sessionKey,
      durationMs: Date.now() - seedT0,
      error: (err as Error).message,
    });
    throw err;
  } finally {
    releaseLlmSlot();
  }
}

/** Fleet mode result. */
export interface FleetResult {
  started: boolean;
}

/**
 * Start fleet mode on a persistent session for parallel agent exploration.
 * Fleet mode allows the session to autonomously spawn multiple agents to try
 * different strategies in parallel (e.g. different test approaches for a file).
 */
export async function startFleet(sessionKey: string, prompt?: string): Promise<FleetResult> {
  const state = sharedSessions.get(sessionKey);
  if (!state) {
    return { started: false };
  }
  try {
    const result = await state.session.rpc.fleet.start({ prompt });
    telemetry.fleetStarts++;
    return { started: result.started };
  } catch {
    return { started: false };
  }
}

/**
 * Set the agent mode on a persistent session.
 * "autopilot" enables autonomous generation without user intervention.
 * "plan" enables planning mode. "interactive" is the default.
 */
export async function setSessionMode(
  sessionKey: string,
  mode: "interactive" | "plan" | "autopilot",
): Promise<boolean> {
  const state = sharedSessions.get(sessionKey);
  if (!state) return false;
  try {
    await state.session.rpc.mode.set({ mode });
    return true;
  } catch {
    return false;
  }
}

async function getOrCreatePersistentSession(
  client: CopilotClient,
  model: string,
  sessionKey: string,
  workingDirectory: string | undefined,
  phase: LlmPhase,
  reasoningEffort: ReasoningEffort | undefined,
): Promise<PersistentSessionState> {
  const existing = sharedSessions.get(sessionKey);
  if (existing && existing.model === model) return existing;
  if (existing) {
    // Try mid-session model switch instead of destroying the session
    try {
      await existing.session.rpc.model.switchTo({ modelId: model });
      existing.model = model;
      telemetry.modelSwitches++;
      // Update the persistentSessionsById mapping
      return existing;
    } catch {
      // Fall back to session recreation if switchTo is unavailable
      sharedSessions.delete(sessionKey);
      persistentSessionsById.delete(existing.sessionId);
      await Promise.race([
        existing.session.disconnect().catch(() => undefined),
        new Promise<void>((resolve) => setTimeout(resolve, DISCONNECT_TIMEOUT)),
      ]);
    }
  }

  const sessionId = stableSessionId(sessionKey, model);
  const gcKey = `${workingDirectory ?? ""}:${getConfigDir(workingDirectory) ?? ""}`;
  if (!gcCompletedForKey.has(gcKey)) {
    await garbageCollectSessions(client, workingDirectory, sessionId);
    gcCompletedForKey.add(gcKey);
  }
  const sessionConfig = await createSessionConfig(client, {
    model,
    workingDirectory,
    phase,
    reasoningEffort,
    persistent: true,
  });

  let session: CopilotSession;
  let seeded = false;
  try {
    session = await client.resumeSession(sessionId, { ...sessionConfig, disableResume: true });
    seeded = true;
    telemetry.sessionsResumed++;
  } catch {
    session = await client.createSession({ ...sessionConfig, sessionId });
    telemetry.sessionsCreated++;
  }

  const state: PersistentSessionState = {
    key: sessionKey,
    sessionId,
    session,
    model,
    phase,
    configDir: sessionConfig.configDir,
    seeded,
    queue: Promise.resolve(),
    workspacePath: session.workspacePath,
    seedArtifacts: new Map<string, SeedArtifact>(),
  };
  registerPersistentSessionEvents(state);
  sharedSessions.set(sessionKey, state);
  persistentSessionsById.set(sessionId, state);
  return state;
}

async function createSessionConfig(
  client: CopilotClient,
  options: {
    model: string;
    workingDirectory?: string;
    phase: LlmPhase;
    reasoningEffort?: ReasoningEffort;
    persistent: boolean;
    customAgents?: CustomAgentConfig[];
  },
): Promise<{
  model: string;
  streaming: true;
  onPermissionRequest: typeof approveAll;
  systemMessage: { mode: "replace"; content: string };
  availableTools: string[];
  tools: Tool[];
  workingDirectory?: string;
  configDir?: string;
  hooks: NonNullable<SessionConfig["hooks"]>;
  infiniteSessions: {
    enabled: boolean;
    backgroundCompactionThreshold?: number;
    bufferExhaustionThreshold?: number;
  };
  reasoningEffort?: ReasoningEffort;
  customAgents?: CustomAgentConfig[];
}> {
  const reasoning = await resolveReasoningEffort(
    client,
    options.model,
    options.reasoningEffort ?? defaultReasoningEffort(options.phase),
  );
  const configDir = getConfigDir(options.workingDirectory);
  if (configDir) {
    await mkdir(configDir, { recursive: true });
  }
  const tools = options.persistent ? [buildReadSeedArtifactTool()] : [];
  const agents = options.customAgents ?? phaseCustomAgents(options.phase);

  return {
    model: options.model,
    streaming: true,
    onPermissionRequest: approveAll,
    systemMessage: {
      mode: "replace",
      content: SYSTEM_MESSAGE,
    },
    availableTools: tools.map((tool) => tool.name),
    tools,
    ...(options.workingDirectory ? { workingDirectory: options.workingDirectory } : {}),
    ...(configDir ? { configDir } : {}),
    hooks: buildSessionHooks(),
    infiniteSessions: options.persistent
      ? {
          enabled: true,
          backgroundCompactionThreshold: 0.7,
          bufferExhaustionThreshold: 0.9,
        }
      : { enabled: false },
    ...(reasoning ? { reasoningEffort: reasoning } : {}),
    ...(agents.length > 0 ? { customAgents: agents } : {}),
  };
}

function buildSessionHooks(): NonNullable<SessionConfig["hooks"]> {
  return {
    onErrorOccurred(input: { recoverable: boolean; errorContext: string }) {
      if (input.recoverable && input.errorContext === "model_call") {
        return { errorHandling: "retry", retryCount: 1 };
      }
      return { errorHandling: input.recoverable ? "skip" : "abort" };
    },
    onSessionStart(input) {
      telemetry.lifecycleEvents[`session.start.${input.source}`] =
        (telemetry.lifecycleEvents[`session.start.${input.source}`] ?? 0) + 1;
    },
    onSessionEnd(input) {
      telemetry.lifecycleEvents[`session.end.${input.reason}`] =
        (telemetry.lifecycleEvents[`session.end.${input.reason}`] ?? 0) + 1;
    },
  };
}

function buildReadSeedArtifactTool(): Tool<any> {
  return defineTool("read_seed_artifact", {
    description: "List or read seed artifacts stored for the current persistent test-gen session.",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string", description: "Artifact alias or display name to read" },
        list: { type: "boolean", description: "When true, list available seed artifacts" },
        startLine: { type: "number", description: "Optional 1-based start line" },
        endLine: { type: "number", description: "Optional 1-based end line" },
      },
    },
    handler: async (
      args: { path?: string; list?: boolean; startLine?: number; endLine?: number },
      invocation,
    ) => {
      const state = persistentSessionsById.get(invocation.sessionId);
      if (!state) return "No persistent seed artifacts are available for this session.";
      if (args.list || !args.path) {
        return Array.from(state.seedArtifacts.values())
          .map((artifact) => `${artifact.alias} -> ${artifact.displayName}`)
          .join("\n");
      }

      const artifact = findSeedArtifact(state, args.path);
      if (!artifact) {
        return `Seed artifact not found: ${args.path}`;
      }

      const content = await readFile(artifact.resolvedPath, "utf8");
      if (!args.startLine && !args.endLine) return content;

      const lines = content.split("\n");
      const start = Math.max(1, args.startLine ?? 1);
      const end = Math.max(start, args.endLine ?? lines.length);
      return lines.slice(start - 1, end).join("\n");
    },
  });
}

async function resolveReasoningEffort(
  client: CopilotClient,
  model: string,
  effort: ReasoningEffort | undefined,
): Promise<ReasoningEffort | undefined> {
  if (!effort) return undefined;
  const modelInfo = await getModelInfo(client, model);
  if (!modelInfo?.capabilities.supports.reasoningEffort) return undefined;
  const supported = modelInfo.supportedReasoningEfforts;
  return supported && supported.length > 0
    ? supported.includes(effort)
      ? effort
      : supported[0]
    : effort;
}

async function getModelInfo(client: CopilotClient, model: string): Promise<ModelInfo | undefined> {
  if (!knownModels) {
    try {
      knownModels = await client.listModels();
    } catch {
      knownModels = [];
    }
  }
  return knownModels.find((entry) => entry.id === model || entry.name === model);
}

async function selectModel(
  client: CopilotClient,
  preferredModel: string,
  phase: LlmPhase,
): Promise<string> {
  if (!knownModels) {
    try {
      knownModels = await client.listModels();
    } catch {
      knownModels = [];
    }
  }

  const enabled = knownModels.filter((model) => model.policy?.state !== "disabled");
  const preferred =
    enabled.find((entry) => entry.id === preferredModel || entry.name === preferredModel) ??
    knownModels.find((entry) => entry.id === preferredModel || entry.name === preferredModel);

  const chooseLowCost = phase === "resolve";
  const selected =
    chooseLowCost && enabled.length > 0
      ? enabled.slice().sort(compareModelForCost)[0]
      : (preferred ??
        (enabled.length > 0 ? enabled.slice().sort(compareModelForCost)[0] : undefined));

  const resolved = selected?.id ?? preferredModel;
  telemetry.phaseModels[`${phase}:${resolved}`] =
    (telemetry.phaseModels[`${phase}:${resolved}`] ?? 0) + 1;
  return resolved;
}

function compareModelForCost(left: ModelInfo, right: ModelInfo): number {
  const cost = (model: ModelInfo): number => {
    const multiplier = model.billing?.multiplier ?? 100;
    const id = model.id.toLowerCase();
    const heuristic = /mini|haiku|flash|4\.1|nano/.test(id)
      ? -5
      : /sonnet|codex/.test(id)
        ? 0
        : /opus/.test(id)
          ? 10
          : 2;
    return multiplier * 100 + heuristic;
  };
  return cost(left) - cost(right) || left.id.localeCompare(right.id);
}

function defaultReasoningEffort(phase: LlmPhase): ReasoningEffort | undefined {
  switch (phase) {
    case "resolve":
    case "merge":
    case "seed":
      return "low";
    case "generate":
    case "fix":
    case "isolation":
      return "medium";
    default:
      return undefined;
  }
}

/**
 * Build phase-specific custom agent definitions.
 * Specialized agents have narrower tool sets and focused prompts for each phase.
 */
function phaseCustomAgents(phase: LlmPhase): CustomAgentConfig[] {
  switch (phase) {
    case "fix":
      return [
        {
          name: "test-fixer",
          displayName: "Test Fixer",
          description: "Specialized agent for diagnosing and fixing test failures",
          prompt: [
            "You are a test-fixing specialist. Your ONLY job is to diagnose test failures and produce corrected test code.",
            "Rules:",
            "- Read the error traceback carefully and trace to root cause",
            "- Fix ONLY failing tests — never modify passing tests",
            "- Never delete or skip tests — every test must appear in output",
            "- Never invent fixtures, decorators, helpers, or imports not visible in the source",
            "- Never replace behavior tests with smoke/import tests",
            "- Return the COMPLETE corrected file as JSON",
          ].join("\n"),
          tools: null, // all tools available
        },
      ];
    case "isolation":
      return [
        {
          name: "isolation-fixer",
          displayName: "Isolation Fixer",
          description:
            "Specialized agent for finding and fixing test isolation issues (global state leaks)",
          prompt: [
            "You are a test isolation specialist. Your ONLY job is to find and fix tests that leak global state.",
            "Look for: module reloading, unscoped mocking, global state mutation, singleton modification.",
            "Rules:",
            "- Fix ONLY files from the current batch that cause isolation problems",
            "- Prefer rewriting with scoped mocks over removing tests",
            "- If a branch is untestable without global mutation, remove the test and add a comment explaining why",
            "- Return ONLY changed files, omit files that are fine as-is",
            "- Return the COMPLETE corrected content for each changed file as JSON",
          ].join("\n"),
          tools: null,
        },
      ];
    default:
      return [];
  }
}

function registerPersistentSessionEvents(state: PersistentSessionState): void {
  state.session.on((event) => {
    switch (event.type) {
      case "session.compaction_start":
        telemetry.compactionsStarted++;
        if (!state.compactionWait) {
          state.compactionWait = new Promise<void>((resolve) => {
            state.releaseCompactionWait = resolve;
          });
        }
        break;
      case "session.compaction_complete":
        telemetry.compactionsCompleted++;
        state.releaseCompactionWait?.();
        state.releaseCompactionWait = undefined;
        state.compactionWait = undefined;
        break;
    }
  });
}

async function withSessionLock<T>(
  state: PersistentSessionState,
  signal: AbortSignal | undefined,
  fn: () => Promise<T>,
): Promise<T> {
  if (signal?.aborted) throw new Error("Aborted");
  const previous = state.queue;
  let release!: () => void;
  state.queue = new Promise<void>((resolve) => {
    release = resolve;
  });

  await waitForPromise(previous, signal);
  try {
    if (state.compactionWait) {
      await waitForPromise(
        Promise.race([
          state.compactionWait,
          new Promise<void>((resolve) => setTimeout(resolve, PERSISTENT_COMPACTION_WAIT_TIMEOUT)),
        ]),
        signal,
      );
    }
    return await fn();
  } finally {
    release();
  }
}

/**
 * Proactively compact a persistent session to free context budget.
 * Returns true if compaction was performed successfully.
 */
async function proactiveCompact(state: PersistentSessionState): Promise<boolean> {
  try {
    const result = await state.session.rpc.compaction.compact();
    if (result.success) {
      telemetry.proactiveCompactions++;
      await deepLog("compaction", "proactive_compact", {
        sessionKey: state.key,
        tokensRemoved: result.tokensRemoved,
        messagesRemoved: result.messagesRemoved,
      });
    }
    return result.success;
  } catch {
    return false;
  }
}

/**
 * Proactively compact a persistent session before an expensive operation.
 * This is a no-op for ephemeral sessions. Exported for use by runner.ts.
 */
export async function compactSessionIfNeeded(sessionKey: string): Promise<boolean> {
  const state = sharedSessions.get(sessionKey);
  if (!state) return false;
  return proactiveCompact(state);
}

async function sendWithSession(
  session: CopilotSession,
  prompt: string,
  options: {
    signal?: AbortSignal;
    onProgress?: (tokensSoFar: number) => void;
    attachments?: SendAttachment[];
    workingDirectory?: string;
    timeoutMs?: number;
    persistentState?: PersistentSessionState;
    registerSeedArtifacts?: boolean;
  },
): Promise<SendResult> {
  const {
    signal,
    onProgress,
    attachments,
    workingDirectory,
    timeoutMs,
    persistentState,
    registerSeedArtifacts,
  } = options;
  const prepared = await materializeAttachments(
    attachments,
    workingDirectory,
    persistentState,
    registerSeedArtifacts,
  );
  const t0 = Date.now();
  let content = "";
  let inputTokens = 0;
  let outputTokens = 0;
  const unsubscribe = session.on((evt) => {
    switch (evt.type as string) {
      case "assistant.message.delta":
      case "assistant.message_delta":
        content +=
          ((evt as { data?: { deltaContent?: string } }).data?.deltaContent as string) ?? "";
        break;
      case "assistant.usage":
        inputTokens +=
          ((evt as { data?: { inputTokens?: number } }).data?.inputTokens as number) ?? 0;
        outputTokens +=
          ((evt as { data?: { outputTokens?: number } }).data?.outputTokens as number) ?? 0;
        onProgress?.(outputTokens);
        break;
      case "assistant.message":
        content = ((evt as { data?: { content?: string } }).data?.content as string) ?? content;
        break;
      case "session.error":
        break;
    }
  });

  try {
    const effectiveTimeout = timeoutMs ?? RESPONSE_TIMEOUT;
    const timeoutPromise = new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        reject(new Error(`LLM response timed out after ${effectiveTimeout}ms`));
      }, effectiveTimeout);
      // Allow GC if the main promise resolves first
      if (typeof id === "object" && "unref" in id) id.unref();
    });

    const finalMessage = await Promise.race([
      session.sendAndWait(
        {
          prompt,
          attachments: prepared.attachments,
          mode: "immediate",
        },
        effectiveTimeout,
      ),
      timeoutPromise,
    ]);
    if (signal?.aborted) throw new Error("Aborted");

    const finalContent = finalMessage?.data.content ?? content;
    if (!finalContent) throw new Error("Empty LLM response");
    return {
      content: finalContent,
      inputTokens,
      outputTokens,
      durationMs: Date.now() - t0,
    };
  } finally {
    unsubscribe();
    await prepared.cleanup();
  }
}

async function materializeAttachments(
  attachments: SendAttachment[] | undefined,
  workingDirectory: string | undefined,
  persistentState: PersistentSessionState | undefined,
  registerSeedArtifacts = false,
): Promise<{
  attachments: MessageOptions["attachments"];
  cleanup: () => Promise<void>;
}> {
  if (!attachments || attachments.length === 0) {
    return { attachments: undefined, cleanup: async () => undefined };
  }

  let tempRoot: string | undefined;
  const sdkAttachments: NonNullable<MessageOptions["attachments"]> = [];

  for (const attachment of attachments) {
    switch (attachment.type) {
      case "file":
      case "directory":
        registerArtifact(
          persistentState,
          registerSeedArtifacts,
          attachment.displayName ?? attachment.path,
          attachment.displayName ?? attachment.path,
          normalizeAttachmentPath(attachment.path, workingDirectory),
          attachment.type,
        );
        sdkAttachments.push({
          type: attachment.type,
          path: normalizeAttachmentPath(attachment.path, workingDirectory),
          ...(attachment.displayName ? { displayName: attachment.displayName } : {}),
        });
        break;

      case "selection":
        registerArtifact(
          persistentState,
          registerSeedArtifacts,
          attachment.displayName,
          attachment.displayName,
          normalizeAttachmentPath(attachment.filePath, workingDirectory),
          "selection",
        );
        sdkAttachments.push({
          type: "selection",
          filePath: normalizeAttachmentPath(attachment.filePath, workingDirectory),
          displayName: attachment.displayName,
          ...(attachment.selection ? { selection: attachment.selection } : {}),
          ...(attachment.text ? { text: attachment.text } : {}),
        });
        break;

      case "virtual-file": {
        const relativePath = sanitizeRelativePath(attachment.path);
        if (!tempRoot && !persistentState?.workspacePath) {
          tempRoot = await mkdtemp(join(tmpdir(), "test-gen-llm-"));
        }
        const targetPath = persistentState?.workspacePath
          ? resolve(
              persistentState.workspacePath,
              "files",
              "test-gen",
              persistentState.sessionId,
              relativePath,
            )
          : resolve(tempRoot!, relativePath);

        await mkdir(dirname(targetPath), { recursive: true });
        const existing = await readFile(targetPath, "utf8").catch(() => undefined);
        if (existing !== attachment.content) {
          await writeFile(targetPath, attachment.content, "utf8");
        }
        registerArtifact(
          persistentState,
          registerSeedArtifacts,
          sanitizeRelativePath(attachment.path),
          attachment.displayName ?? basename(relativePath),
          targetPath,
          "virtual-file",
        );
        sdkAttachments.push({
          type: "file",
          path: targetPath,
          displayName: attachment.displayName ?? basename(relativePath),
        });
        break;
      }
    }
  }

  return {
    attachments: sdkAttachments,
    cleanup: async () => {
      if (tempRoot) {
        await rm(tempRoot, { recursive: true, force: true }).catch(() => undefined);
      }
    },
  };
}

function normalizeAttachmentPath(path: string, workingDirectory: string | undefined): string {
  if (isAbsolute(path)) return path;
  return workingDirectory ? resolve(workingDirectory, path) : resolve(path);
}

function sanitizeRelativePath(path: string): string {
  const parts = path
    .split(/[\\/]+/)
    .filter((segment) => segment.length > 0 && segment !== "." && segment !== "..");
  return parts.length > 0 ? parts.join("/") : "attachment.txt";
}

function stableSessionId(sessionKey: string, model: string): string {
  const digest = createHash("sha1").update(`${sessionKey}\0${model}`).digest("hex").slice(0, 24);
  return `${SESSION_ID_PREFIX}${digest}`;
}

async function sendWithRetry<T>(fn: () => Promise<T>, sessionKey?: string): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (!isClientDisconnectedError(error)) throw error;
    await resetClientState(sessionKey);
    return fn();
  }
}

function isClientDisconnectedError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /client not connected|not connected/i.test(error.message);
}

function isSessionTimeoutError(err: Error): boolean {
  return /Timeout/i.test(err.message) && /session\.idle/i.test(err.message);
}

async function resetClientState(sessionKey?: string): Promise<void> {
  if (sessionKey) {
    const state = sharedSessions.get(sessionKey);
    if (state) {
      sharedSessions.delete(sessionKey);
      persistentSessionsById.delete(state.sessionId);
      await Promise.race([
        state.session.disconnect().catch(() => undefined),
        new Promise<void>((resolve) => setTimeout(resolve, DISCONNECT_TIMEOUT)),
      ]);
    }
  }
  await stopClient();
}

function registerArtifact(
  state: PersistentSessionState | undefined,
  enabled: boolean,
  alias: string,
  displayName: string,
  resolvedPath: string,
  attachmentType: SeedArtifact["attachmentType"],
): void {
  if (!state || !enabled) return;
  const keys = new Set([alias, displayName, basename(displayName), basename(alias)]);
  for (const key of keys) {
    if (!key) continue;
    state.seedArtifacts.set(key, { alias: key, displayName, resolvedPath, attachmentType });
  }
}

function findSeedArtifact(state: PersistentSessionState, query: string): SeedArtifact | undefined {
  return (
    state.seedArtifacts.get(query) ??
    Array.from(state.seedArtifacts.values()).find(
      (artifact) => artifact.alias === query || artifact.displayName === query,
    )
  );
}

function getConfigDir(workingDirectory: string | undefined): string | undefined {
  if (!workingDirectory) return undefined;
  return resolve(workingDirectory, ".test-gen-copilot-sdk");
}

async function warmClient(client: CopilotClient): Promise<void> {
  await Promise.allSettled([client.ping("test-gen-warmup"), client.listModels()]);
  telemetry.healthChecks++;
}

async function garbageCollectSessions(
  client: CopilotClient,
  workingDirectory: string | undefined,
  protectedSessionId: string,
): Promise<void> {
  if (!workingDirectory) return;
  let sessions: SessionMetadata[] = [];
  try {
    sessions = await client.listSessions({ cwd: workingDirectory });
  } catch {
    return;
  }

  const now = Date.now();
  const candidates = sessions
    .filter((session) => session.sessionId.startsWith(SESSION_ID_PREFIX))
    .sort((a, b) => b.modifiedTime.getTime() - a.modifiedTime.getTime());

  const keep = new Set(
    candidates
      .slice(0, MAX_PERSISTED_SESSIONS_PER_PACKAGE)
      .map((session) => session.sessionId)
      .concat([protectedSessionId]),
  );

  for (const session of candidates) {
    const tooOld = now - session.modifiedTime.getTime() > SESSION_MAX_AGE_MS;
    const shouldDelete = tooOld || !keep.has(session.sessionId);
    if (!shouldDelete) continue;
    try {
      await client.deleteSession(session.sessionId);
      telemetry.sessionsDeleted++;
    } catch {
      // ignore GC failures
    }
  }
}

async function waitForPromise<T>(promise: Promise<T>, signal: AbortSignal | undefined): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) throw new Error("Aborted");

  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      const onAbort = () => {
        signal.removeEventListener("abort", onAbort);
        reject(new Error("Aborted"));
      };
      signal.addEventListener("abort", onAbort, { once: true });
    }),
  ]);
}
