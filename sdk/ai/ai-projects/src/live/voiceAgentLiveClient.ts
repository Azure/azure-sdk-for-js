// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { isNodeLike, uint8ArrayToString } from "@azure/core-util";
import type {
  LiveClientEventType,
  LiveClientEventUnion,
  LiveServerEventType,
  LiveServerEventUnion,
  VoiceAgentLiveSessionResource,
  LiveSessionUpdateParams,
  LiveServerEventLiveSessionClosed,
} from "../models/models.js";
import {
  liveClientEventUnionSerializer,
  liveServerEventUnionDeserializer,
} from "../models/models.js";
import { logger } from "../logger.js";
import { AsyncQueue } from "../realtime/asyncQueue.js";
import {
  VoiceAgentAuthenticationError,
  VoiceAgentConnectionError,
  VoiceAgentProtocolError,
} from "../realtime/errors.js";
import {
  KnownVoiceAgentConnectionState,
  buildHeaders,
  buildWebSocketUrl,
  normalizeEndpoint,
} from "../realtime/voiceAgentRealtimeClient.js";
import type {
  VoiceAgentCloseResult,
  VoiceAgentConnectionState,
  VoiceAgentEventOptions,
  VoiceAgentRealtimeClientConnectOptions,
  VoiceAgentRealtimeClientOptions,
  VoiceAgentSendOptions,
  VoiceAgentSendToolOutputOptions,
} from "../realtime/voiceAgentRealtimeClient.js";
import type {
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketTransport,
} from "../realtime/webSocketTransport.js";
import type { VoiceAgentUnknownEvent } from "../realtime/events.js";

/** Commands you can send after the service starts a GPT Live session. */
export type VoiceAgentLiveClientEvent = {
  [K in Exclude<LiveClientEventType, "session.start">]: Extract<LiveClientEventUnion, { type: K }>;
}[Exclude<LiveClientEventType, "session.start">];

/** Events received from GPT Live, including unrecognized service events. */
export type VoiceAgentLiveEvent =
  | {
      [K in LiveServerEventType]: Extract<LiveServerEventUnion, { type: K }>;
    }[LiveServerEventType]
  | VoiceAgentUnknownEvent;

/** Handler for one GPT Live event type. */
export type VoiceAgentLiveEventHandler<K extends VoiceAgentLiveEvent["type"]> = (
  event: Extract<VoiceAgentLiveEvent, { type: K }>,
) => void;

type KnownLiveServerEvent = Exclude<VoiceAgentLiveEvent, VoiceAgentUnknownEvent>;

/** Default settings for GPT Live connections. */
export interface VoiceAgentLiveClientOptions extends VoiceAgentRealtimeClientOptions {
  /** Time to wait for Foundry's session.started event, in milliseconds. Defaults to 30,000. */
  sessionTimeoutInMs?: number;
  /** Time to wait for session.closed during graceful shutdown, in milliseconds. Defaults to 5,000. */
  closeTimeoutInMs?: number;
}

/** Settings for one GPT Live connection. Live does not use transport or agentSessionId. */
export interface VoiceAgentLiveClientConnectOptions extends Omit<
  VoiceAgentRealtimeClientConnectOptions,
  "transport" | "agentSessionId"
> {
  /** Overrides the timeout for the service's session.started event, in milliseconds. */
  sessionTimeoutInMs?: number;
}

/** Options for adding text context to a GPT Live session. */
export interface VoiceAgentLiveAppendOptions extends VoiceAgentEventOptions {
  /** ID from a client delegation event. Omit when the text is not a delegation reply. */
  delegationId?: string | null;
}

/** Details reported when a GPT Live connection closes. */
export interface VoiceAgentLiveCloseResult extends VoiceAgentCloseResult {
  /** Service confirmation that the session finished. If absent, finalization was not confirmed. */
  sessionClosed?: LiveServerEventLiveSessionClosed;
}

/**
 * A GPT Live voice session.
 *
 * Read events with one `for await` loop or use `on`, `off`, and `once` listeners.
 * Leaving the loop closes the session. Received audio chunks are base64 strings.
 */
export interface VoiceAgentLiveConnection extends AsyncIterable<VoiceAgentLiveEvent> {
  /** Current connection state. */
  readonly state: VoiceAgentConnectionState;
  /** Latest session settings. Available as soon as connect() returns. */
  readonly session: VoiceAgentLiveSessionResource;
  /** Resolves when the connection closes, with service confirmation and error details if available. */
  readonly closed: Promise<VoiceAgentLiveCloseResult>;
  /** Sends a Live command. Do not send session.start; the service starts the session. */
  send(event: VoiceAgentLiveClientEvent, options?: VoiceAgentSendOptions): Promise<void>;
  /** Alias for send(). */
  sendEvent(event: VoiceAgentLiveClientEvent, options?: VoiceAgentSendOptions): Promise<void>;
  /** Adds an event listener. Read session for settings received before connect() returned. */
  on<K extends VoiceAgentLiveEvent["type"]>(type: K, handler: VoiceAgentLiveEventHandler<K>): this;
  /** Removes a previously registered listener. */
  off<K extends VoiceAgentLiveEvent["type"]>(type: K, handler: VoiceAgentLiveEventHandler<K>): this;
  /** Adds a listener that runs once. */
  once<K extends VoiceAgentLiveEvent["type"]>(
    type: K,
    handler: VoiceAgentLiveEventHandler<K>,
  ): this;
  /** Updates delegation backend settings and transcript triggers. The audio format, model, and delegation owner cannot change. */
  configureSession(
    session: LiveSessionUpdateParams,
    options?: VoiceAgentEventOptions,
  ): Promise<void>;
  /** Sends raw audio in the configured input format, without a WAV or other file header. */
  sendAudio(audio: Uint8Array | ArrayBuffer, options?: VoiceAgentEventOptions): Promise<void>;
  /** Stops the model from processing input audio. Live has no input buffer to commit or clear. */
  muteInputAudio(options?: VoiceAgentEventOptions): Promise<void>;
  /** Resumes model audio input. */
  unmuteInputAudio(options?: VoiceAgentEventOptions): Promise<void>;
  /** Adds instructions to the session, not a user message. */
  appendInstructions(content: string, options?: VoiceAgentLiveAppendOptions): Promise<void>;
  /** Adds background context without asking the model to speak it. Do not use this to hide secrets. */
  appendThinking(content: string, options?: VoiceAgentLiveAppendOptions): Promise<void>;
  /** Adds text for the model to say to the user. This is context, not a user message. */
  appendCommentary(content: string, options?: VoiceAgentLiveAppendOptions): Promise<void>;
  /** Adds a conversation item when the session uses Responses delegation. */
  sendResponseItem(item: Record<string, unknown>, options?: VoiceAgentEventOptions): Promise<void>;
  /** Sends a function result to the Responses backend and requests a follow-up response by default. */
  sendToolOutput(
    callId: string,
    output: string,
    options?: VoiceAgentSendToolOutputOptions,
  ): Promise<void>;
  /** Asks the Responses backend to respond. Requires Responses delegation. */
  requestResponse(options?: VoiceAgentEventOptions): Promise<void>;
  /** Closes the session and waits for service confirmation. Rejects if confirmation times out. */
  close(code?: number, reason?: string): Promise<void>;
  /** Closes the session. Equivalent to close(). */
  dispose(): Promise<void>;
}

/** Connects to Foundry voice agents that use GPT Live. */
export class VoiceAgentLiveClient {
  private readonly options: VoiceAgentLiveClientOptions;

  /**
   * Creates a GPT Live client.
   * @param endpoint - Foundry project endpoint.
   * @param credential - Credential for Microsoft Entra authentication.
   * @param options - Default connection settings.
   */
  public constructor(
    private readonly endpoint: string,
    private readonly credential: TokenCredential,
    options: VoiceAgentLiveClientOptions = {},
  ) {
    if (!endpoint.trim()) throw new TypeError("endpoint must not be empty.");
    validateTimeout(options.connectionTimeoutInMs, "connectionTimeoutInMs");
    validateTimeout(options.sessionTimeoutInMs, "sessionTimeoutInMs");
    validateTimeout(options.closeTimeoutInMs, "closeTimeoutInMs");
    this.options = { ...options };
  }

  /**
   * Connects to a voice agent and waits for the service to start the GPT Live session.
   * @param agentName - Name of an existing GPT Live voice agent.
   * @param options - Settings for this connection.
   * @returns The connected session, ready to send audio and receive events.
   */
  public async connect(
    agentName: string,
    options: VoiceAgentLiveClientConnectOptions = {},
  ): Promise<VoiceAgentLiveConnection> {
    if (!agentName.trim()) throw new TypeError("agentName must not be empty.");
    if ("transport" in options || "agentSessionId" in options) {
      throw new TypeError(
        "Live connections do not accept Realtime transport or agentSessionId options.",
      );
    }
    validateTimeout(options.connectionTimeoutInMs, "connectionTimeoutInMs");
    validateTimeout(options.sessionTimeoutInMs, "sessionTimeoutInMs");
    const url = new URL(
      buildWebSocketUrl(
        normalizeEndpoint(this.endpoint),
        agentName,
        this.options.apiVersion ?? "v1",
        options,
        "/live/sessions",
      ),
    );
    if (options.structuredInputs !== undefined) {
      const serialized = JSON.stringify(options.structuredInputs);
      url.searchParams.delete("structured_input");
      url.searchParams.set("structured_inputs", serialized);
    }
    const factory =
      this.options.webSocketFactory ??
      (await import("#platform/webSocketTransport")).createDefaultVoiceAgentWebSocketFactory();
    const connection = new VoiceAgentLiveConnectionImpl(
      url.toString(),
      this.credential,
      this.options,
      { ...options },
      factory,
    );
    await connection.open();
    return connection;
  }
}

interface Listener {
  type: VoiceAgentLiveEvent["type"];
  original: unknown;
  invoke: (event: VoiceAgentLiveEvent) => void;
}

class VoiceAgentLiveConnectionImpl implements VoiceAgentLiveConnection {
  private readonly transport: VoiceAgentWebSocketTransport;
  private readonly events: AsyncQueue<VoiceAgentLiveEvent>;
  private readonly listeners: Listener[] = [];
  private currentState: VoiceAgentConnectionState = KnownVoiceAgentConnectionState.Disconnected;
  private snapshot?: VoiceAgentLiveSessionResource;
  private finalEvent?: LiveServerEventLiveSessionClosed;
  private finished = false;
  private iteratorStarted = false;
  private closing?: Promise<void>;
  private requestedClose?: { code: number; reason: string };
  private transportClosing?: Promise<void>;
  private readonly closePromise: Promise<VoiceAgentLiveCloseResult>;
  private resolveClosed!: (value: VoiceAgentLiveCloseResult) => void;
  private started?: { resolve: () => void; reject: (error: Error) => void };
  private finalized?: () => void;

  public constructor(
    private readonly url: string,
    private readonly credential: TokenCredential,
    private readonly clientOptions: VoiceAgentLiveClientOptions,
    private readonly connectOptions: VoiceAgentLiveClientConnectOptions,
    factory: VoiceAgentWebSocketFactory,
  ) {
    this.closePromise = new Promise((resolve) => {
      this.resolveClosed = resolve;
    });
    this.events = new AsyncQueue(10_000, {
      onOverflow: (cause) =>
        this.finish(1006, "Live event queue overflow.", false, connectionError(cause)),
    });
    this.transport = factory.create();
    this.transport.setHandlers({
      onMessage: (data) => this.handleMessage(data),
      onClose: (code, reason, wasClean) =>
        this.finish(
          code,
          reason,
          wasClean,
          wasClean
            ? undefined
            : new VoiceAgentConnectionError(
                "Live socket closed unexpectedly.",
                "connectionClosed",
                { closeCode: code },
              ),
        ),
      onError: (cause) =>
        this.finish(1006, "Live transport failed.", false, connectionError(cause)),
    });
  }

  public get state(): VoiceAgentConnectionState {
    return this.currentState;
  }
  public get session(): VoiceAgentLiveSessionResource {
    if (!this.snapshot) {
      throw new VoiceAgentConnectionError("Live session has not started.", "invalidState");
    }
    return this.snapshot;
  }
  public get closed(): Promise<VoiceAgentLiveCloseResult> {
    return this.closePromise;
  }

  public async open(): Promise<void> {
    this.setState(KnownVoiceAgentConnectionState.Connecting);
    const signal = this.connectOptions.abortSignal;
    try {
      let token: string;
      try {
        const access = await this.credential.getToken(
          this.clientOptions.credentialScopes ?? "https://ai.azure.com/.default",
          { abortSignal: signal },
        );
        if (!access?.token) {
          throw new VoiceAgentAuthenticationError("The credential returned no access token.");
        }
        token = access.token;
      } catch (cause) {
        if (signal?.aborted) throw cancelled();
        throw cause instanceof VoiceAgentAuthenticationError
          ? cause
          : new VoiceAgentAuthenticationError("Failed to acquire a Voice Agents access token.", {
              cause,
            });
      }
      if (signal?.aborted) throw cancelled();
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const abort = (): void => this.started?.reject(cancelled());
      const ready = new Promise<void>((resolve, reject) => {
        this.started = { resolve, reject };
        timeout = setTimeout(
          () =>
            reject(
              new VoiceAgentConnectionError(
                "Timed out waiting for Live session.started.",
                "connectionFailed",
              ),
            ),
          this.connectOptions.sessionTimeoutInMs ?? this.clientOptions.sessionTimeoutInMs ?? 30_000,
        );
        signal?.addEventListener("abort", abort, { once: true });
      });
      try {
        await Promise.all([
          ready,
          this.transport.connect({
            url: this.url,
            // Browser upgrades require Live plus the bearer credential subprotocol.
            protocols: isNodeLike ? [] : ["live"],
            headers: buildHeaders(token, this.clientOptions),
            connectionTimeoutInMs:
              this.connectOptions.connectionTimeoutInMs ??
              this.clientOptions.connectionTimeoutInMs ??
              30_000,
            abortSignal: signal,
          }),
        ]);
        if (this.finished || this.finalEvent) {
          throw new VoiceAgentConnectionError(
            "Live session closed during startup.",
            "connectionClosed",
          );
        }
        this.setState(KnownVoiceAgentConnectionState.Connected);
      } finally {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", abort);
        this.started = undefined;
      }
    } catch (cause) {
      const error =
        cause instanceof VoiceAgentAuthenticationError ||
        cause instanceof VoiceAgentConnectionError ||
        cause instanceof VoiceAgentProtocolError
          ? cause
          : new VoiceAgentConnectionError(
              "Failed to connect to the Live voice agent.",
              signal?.aborted ? "operationCancelled" : "connectionFailed",
              { cause },
            );
      this.finish(1006, "Live connection failed.", false, error);
      void this.closeTransport(1000, "Live connection failed.");
      throw error;
    }
  }

  public async send(
    event: VoiceAgentLiveClientEvent,
    options: VoiceAgentSendOptions = {},
  ): Promise<void> {
    if (this.state !== KnownVoiceAgentConnectionState.Connected) {
      throw new VoiceAgentConnectionError(
        `Cannot send while the Live connection is ${this.state}.`,
        "invalidState",
      );
    }
    if (options.abortSignal?.aborted) throw cancelled();
    const data = serializeVoiceAgentLiveEvent(event);
    if (
      (event.type === "response.item.create" || event.type === "response.create") &&
      this.session.delegation?.type !== "responses"
    ) {
      throw new VoiceAgentProtocolError("Responses commands require a Responses delegation.");
    }
    try {
      await this.transport.send(data, options.abortSignal);
    } catch (cause) {
      if (options.abortSignal?.aborted) throw cancelled();
      throw new VoiceAgentConnectionError("Failed to send a Live event.", "sendFailed", { cause });
    }
  }
  public sendEvent(
    event: VoiceAgentLiveClientEvent,
    options?: VoiceAgentSendOptions,
  ): Promise<void> {
    return this.send(event, options);
  }
  public on<K extends VoiceAgentLiveEvent["type"]>(
    type: K,
    handler: VoiceAgentLiveEventHandler<K>,
  ): this {
    this.listeners.push({
      type,
      original: handler,
      invoke: (event) => {
        if (isEventType(event, type)) handler(event);
      },
    });
    return this;
  }
  public off<K extends VoiceAgentLiveEvent["type"]>(
    type: K,
    handler: VoiceAgentLiveEventHandler<K>,
  ): this {
    for (let i = this.listeners.length - 1; i >= 0; i--) {
      if (this.listeners[i].type === type && this.listeners[i].original === handler) {
        this.listeners.splice(i, 1);
      }
    }
    return this;
  }
  public once<K extends VoiceAgentLiveEvent["type"]>(
    type: K,
    handler: VoiceAgentLiveEventHandler<K>,
  ): this {
    let fired = false;
    const listener: Listener = {
      type,
      original: handler,
      invoke: (event) => {
        if (fired || !isEventType(event, type)) return;
        fired = true;
        const index = this.listeners.indexOf(listener);
        if (index !== -1) this.listeners.splice(index, 1);
        handler(event);
      },
    };
    this.listeners.push(listener);
    return this;
  }
  public configureSession(
    session: LiveSessionUpdateParams,
    options: VoiceAgentEventOptions = {},
  ): Promise<void> {
    return this.send({ type: "session.update", session, event_id: options.eventId }, options);
  }
  public sendAudio(
    audio: Uint8Array | ArrayBuffer,
    options: VoiceAgentEventOptions = {},
  ): Promise<void> {
    return this.send(
      {
        type: "session.input_audio.append",
        audio: uint8ArrayToString(
          audio instanceof Uint8Array ? audio : new Uint8Array(audio),
          "base64",
        ),
        event_id: options.eventId,
      },
      options,
    );
  }
  public muteInputAudio(options: VoiceAgentEventOptions = {}): Promise<void> {
    return this.send({ type: "session.input_audio.mute", event_id: options.eventId }, options);
  }
  public unmuteInputAudio(options: VoiceAgentEventOptions = {}): Promise<void> {
    return this.send({ type: "session.input_audio.unmute", event_id: options.eventId }, options);
  }
  public appendInstructions(
    content: string,
    options: VoiceAgentLiveAppendOptions = {},
  ): Promise<void> {
    return this.send(
      {
        type: "session.instructions.append",
        content,
        delegation_id: options.delegationId ?? null,
        event_id: options.eventId,
      },
      options,
    );
  }
  public appendThinking(content: string, options: VoiceAgentLiveAppendOptions = {}): Promise<void> {
    return this.send(
      {
        type: "session.thinking.append",
        content,
        delegation_id: options.delegationId ?? null,
        event_id: options.eventId,
      },
      options,
    );
  }
  public appendCommentary(
    content: string,
    options: VoiceAgentLiveAppendOptions = {},
  ): Promise<void> {
    return this.send(
      {
        type: "session.commentary.append",
        content,
        delegation_id: options.delegationId ?? null,
        event_id: options.eventId,
      },
      options,
    );
  }
  public sendResponseItem(
    item: Record<string, unknown>,
    options: VoiceAgentEventOptions = {},
  ): Promise<void> {
    return this.send({ type: "response.item.create", item, event_id: options.eventId }, options);
  }
  public async sendToolOutput(
    callId: string,
    output: string,
    options: VoiceAgentSendToolOutputOptions = {},
  ): Promise<void> {
    await this.sendResponseItem({ type: "function_call_output", call_id: callId, output }, options);
    if (options.createResponse !== false) {
      await this.requestResponse({ abortSignal: options.abortSignal });
    }
  }
  public requestResponse(options: VoiceAgentEventOptions = {}): Promise<void> {
    return this.send({ type: "response.create", event_id: options.eventId }, options);
  }

  public close(code = 1000, reason = "Client closed the Live session."): Promise<void> {
    if (this.finished) return this.closed.then(() => undefined);
    if (!this.closing) {
      let resolveClose!: () => void;
      let rejectClose!: (reason: unknown) => void;
      this.closing = new Promise<void>((resolve, reject) => {
        resolveClose = resolve;
        rejectClose = reject;
      });
      void this.gracefulClose(code, reason).then(resolveClose, rejectClose);
    }
    return this.closing;
  }
  public dispose(): Promise<void> {
    return this.close();
  }
  private async gracefulClose(code: number, reason: string): Promise<void> {
    this.requestedClose = { code, reason };
    this.setState(KnownVoiceAgentConnectionState.Closing);
    const finalized = new Promise<void>((resolve) => {
      this.finalized = resolve;
    });
    try {
      await this.withCloseDeadline(
        Promise.all([
          finalized,
          this.transport.send(serializeVoiceAgentLiveEvent({ type: "session.close" })),
          this.closed.then((result) => {
            if (result.error) throw result.error;
            if (!this.finalEvent) {
              throw new VoiceAgentConnectionError(
                "Live socket closed without session.closed.",
                "connectionClosed",
              );
            }
            return undefined;
          }),
        ]),
      );
    } catch (cause) {
      const error = cause instanceof Error ? cause : connectionError(cause);
      this.finish(code, reason, false, error);
      throw error;
    } finally {
      this.finalized = undefined;
      void this.closeTransport(code, reason);
      this.finish(code, reason, false);
    }
  }

  private async withCloseDeadline(operation: Promise<unknown>): Promise<void> {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const expired = new Promise<never>((_resolve, reject) => {
      timeout = setTimeout(
        () =>
          reject(
            new VoiceAgentConnectionError(
              "Timed out waiting for Live session.closed and socket close.",
              "connectionClosed",
            ),
          ),
        this.clientOptions.closeTimeoutInMs ?? 5_000,
      );
    });
    try {
      await Promise.race([operation, expired]);
    } finally {
      clearTimeout(timeout);
    }
  }

  public async *[Symbol.asyncIterator](): AsyncIterator<VoiceAgentLiveEvent> {
    if (this.iteratorStarted) {
      throw new VoiceAgentConnectionError(
        "A Live connection supports one event iterator.",
        "invalidState",
      );
    }
    this.iteratorStarted = true;
    try {
      while (true) {
        const result = await this.events.next();
        if (result.done) return;
        yield result.value;
      }
    } finally {
      if (!this.finished) await this.close();
    }
  }

  private handleMessage(data: string | ArrayBuffer): void {
    if (this.finished) return;
    let event: VoiceAgentLiveEvent;
    try {
      event = deserializeVoiceAgentLiveEvent(data);
    } catch (cause) {
      const error =
        cause instanceof VoiceAgentProtocolError
          ? cause
          : new VoiceAgentProtocolError("Invalid Live event.", { cause });
      this.finish(1002, "Invalid Live event.", false, error);
      return;
    }
    if (event.type === "session.started" || event.type === "session.updated") {
      this.snapshot = event.session;
      if (event.type === "session.started") this.started?.resolve();
    } else if (event.type === "error" && !this.snapshot) {
      this.started?.reject(
        new VoiceAgentConnectionError(event.error.message, "connectionFailed", { cause: event }),
      );
    } else if (event.type === "session.closed") {
      this.snapshot = event.session;
      this.finalEvent = event;
      this.finalized?.();
      if (this.state !== KnownVoiceAgentConnectionState.Closing) {
        this.closing = this.withCloseDeadline(
          this.closed.then((result) => {
            if (result.error) throw result.error;
            return undefined;
          }),
        );
        void this.closing.catch((cause: unknown) => {
          const error = cause instanceof Error ? cause : connectionError(cause);
          this.finish(1006, "Live socket did not close after finalization.", false, error);
          logger.warning("Live socket did not close after finalization.", { error });
        });
        this.setState(KnownVoiceAgentConnectionState.Closing);
      }
      const close = this.requestedClose ?? { code: 1000, reason: "Live session finalized." };
      void this.closeTransport(close.code, close.reason);
    }
    if (this.iteratorStarted || this.listeners.length === 0) this.events.enqueue(event);
    for (const listener of [...this.listeners]) {
      if (listener.type !== event.type) continue;
      try {
        listener.invoke(event);
      } catch (error) {
        logger.warning("Voice-agent Live event listener threw an error.", { error });
      }
    }
  }
  private closeTransport(code: number, reason: string): Promise<void> {
    // Finish event dispatch before a synchronous close callback, and start cleanup only once.
    this.transportClosing ??= Promise.resolve()
      .then(() => this.transport.close(code === 1006 ? 1000 : code, reason))
      .catch((cause: unknown) => {
        this.finish(1006, "Failed to close Live transport.", false, connectionError(cause));
        logger.warning("Failed to close the Live transport.", { cause });
      });
    return this.transportClosing;
  }
  private finish(code: number, reason: string, wasClean: boolean, error?: Error): void {
    if (this.finished) return;
    this.finished = true;
    this.started?.reject(
      error ??
        new VoiceAgentConnectionError(
          "Live socket closed before session.started.",
          "connectionClosed",
        ),
    );
    if (error) this.events.fail(error);
    else this.events.close();
    this.setState(KnownVoiceAgentConnectionState.Disconnected);
    this.resolveClosed({ code, reason, wasClean, error, sessionClosed: this.finalEvent });
    if (error) void this.closeTransport(code, reason);
  }
  private setState(state: VoiceAgentConnectionState): void {
    if (state === this.currentState) return;
    const previous = this.currentState;
    this.currentState = state;
    try {
      this.connectOptions.onConnectionStateChange?.(state, previous);
    } catch (error) {
      logger.warning("Live onConnectionStateChange callback threw an error.", { error });
    }
  }
}

function isEventType<K extends VoiceAgentLiveEvent["type"]>(
  event: VoiceAgentLiveEvent,
  type: K,
): event is Extract<VoiceAgentLiveEvent, { type: K }> {
  return event.type === type;
}
function cancelled(): VoiceAgentConnectionError {
  return new VoiceAgentConnectionError("The Live operation was cancelled.", "operationCancelled");
}
function connectionError(cause: unknown): VoiceAgentConnectionError {
  return new VoiceAgentConnectionError("Live WebSocket transport failed.", "connectionClosed", {
    cause,
  });
}

function validateTimeout(value: number | undefined, name: string): void {
  if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
    throw new RangeError(`${name} must be a positive finite number.`);
  }
}

const clientTypes: { [K in VoiceAgentLiveClientEvent["type"]]: true } = {
  "session.update": true,
  "session.input_audio.append": true,
  "session.input_audio.mute": true,
  "session.input_audio.unmute": true,
  "session.output_audio.fixture.play": true,
  "session.instructions.append": true,
  "session.thinking.append": true,
  "session.commentary.append": true,
  "decision.create": true,
  "decision.item.create": true,
  "decision.item.delete": true,
  "response.item.create": true,
  "response.create": true,
  "session.close": true,
};

const requiredFields: {
  [K in KnownLiveServerEvent["type"]]: readonly (keyof Extract<
    KnownLiveServerEvent,
    { type: K }
  >)[];
} = {
  "session.started": ["session"],
  "session.updated": ["session"],
  "session.input_audio.muted": [],
  "session.input_audio.unmuted": [],
  "session.output_audio.fixture.playing": [],
  "session.output_audio.fixture.played": [],
  "session.instructions.appended": ["start_ms", "end_ms"],
  "session.thinking.appended": ["start_ms", "end_ms"],
  "session.commentary.appended": ["start_ms", "end_ms"],
  "session.input_audio.append": ["audio"],
  "session.output_audio.delta": ["delta"],
  "session.input_transcript.delta": ["delta", "start_ms", "end_ms"],
  "session.output_transcript.delta": ["delta", "start_ms", "end_ms"],
  "session.delegation.created": ["delegation", "offset_ms"],
  "decision.event": ["event"],
  "decision.item.created": ["item"],
  "decision.item.deleted": ["item_id"],
  "response.event": ["event"],
  "session.usage.updated": ["usage"],
  "session.closed": ["session", "reason", "usage"],
  error: ["error"],
  info: ["code", "message"],
  "transport.dtmf.received": ["event"],
  "transport.dtmf.send": ["event"],
  "transport.ringing": ["session_id"],
  "transport.answered": ["session_id"],
  "transport.failed": ["session_id", "error"],
};

/** @internal */
export function serializeVoiceAgentLiveEvent(event: VoiceAgentLiveClientEvent): string {
  if (!event || !Object.prototype.hasOwnProperty.call(clientTypes, event.type)) {
    throw new VoiceAgentProtocolError(
      "Unsupported Live client event. Foundry owns session.start; Realtime commands are not Live commands.",
    );
  }
  switch (event.type) {
    case "session.input_audio.append":
    case "session.output_audio.fixture.play":
      if (typeof event.audio !== "string") {
        throw new VoiceAgentProtocolError("Live audio must be a base64 string.");
      }
      break;
    case "session.instructions.append":
    case "session.thinking.append":
    case "session.commentary.append":
      if (
        typeof event.content !== "string" ||
        (event.delegation_id !== null && typeof event.delegation_id !== "string")
      ) {
        throw new VoiceAgentProtocolError(
          "Live context requires text and a string or null delegation_id.",
        );
      }
      break;
    case "session.update":
      if (!isRecord(event.session)) {
        throw new VoiceAgentProtocolError("Live session updates must be objects.");
      }
      break;
    case "response.item.create":
      if (!isRecord(event.item)) {
        throw new VoiceAgentProtocolError("Live response items must be objects.");
      }
      break;
    case "decision.create":
      if (typeof event.event_id !== "string" || !event.event_id) {
        throw new VoiceAgentProtocolError("Live decision requests require an event_id.");
      }
      break;
    case "decision.item.create":
      if (
        !isRecord(event.item) ||
        event.item.role !== "user" ||
        (typeof event.item.content !== "string" && !Array.isArray(event.item.content))
      ) {
        throw new VoiceAgentProtocolError("Live decision items require user content.");
      }
      break;
    case "decision.item.delete":
      if (typeof event.item_id !== "string" || !event.item_id) {
        throw new VoiceAgentProtocolError("Live decision item deletion requires an item_id.");
      }
      break;
  }
  try {
    return JSON.stringify(liveClientEventUnionSerializer(event));
  } catch (cause) {
    throw new VoiceAgentProtocolError("Failed to serialize a Live event.", { cause });
  }
}

/** @internal */
export function deserializeVoiceAgentLiveEvent(data: string | ArrayBuffer): VoiceAgentLiveEvent {
  let raw: unknown;
  try {
    raw = JSON.parse(
      typeof data === "string" ? data : new TextDecoder("utf-8", { fatal: true }).decode(data),
    );
  } catch (cause) {
    throw new VoiceAgentProtocolError("The service returned invalid Live JSON.", { cause });
  }
  if (!isRecord(raw) || typeof raw.type !== "string" || !raw.type) {
    throw new VoiceAgentProtocolError("The service returned a Live event without a type.");
  }
  if (!Object.prototype.hasOwnProperty.call(requiredFields, raw.type)) {
    return { type: "unknown", eventType: raw.type, rawEvent: raw };
  }
  const type = raw.type as KnownLiveServerEvent["type"];
  const audio = type === "session.input_audio.append" || type === "session.output_audio.delta";
  if (!audio && (typeof raw.event_id !== "string" || !raw.event_id)) {
    throw new VoiceAgentProtocolError(`The service returned "${type}" without event_id.`);
  }
  for (const key of requiredFields[type]) {
    if (raw[key] === undefined || raw[key] === null) {
      throw new VoiceAgentProtocolError(`The service returned "${type}" without "${key}".`);
    }
  }
  if (audio && typeof raw[type === "session.input_audio.append" ? "audio" : "delta"] !== "string") {
    throw new VoiceAgentProtocolError("The service returned invalid Live audio data.");
  }
  if (
    (type === "session.started" || type === "session.updated" || type === "session.closed") &&
    (!isRecord(raw.session) || typeof raw.session.id !== "string" || !raw.session.id)
  ) {
    throw new VoiceAgentProtocolError("The service returned a Live session without an id.");
  }
  if (type === "response.event" && (!isRecord(raw.event) || typeof raw.event.type !== "string")) {
    throw new VoiceAgentProtocolError("The service returned an invalid delegated response event.");
  }
  if (type === "decision.event") {
    if (
      !isRecord(raw.event) ||
      raw.event.type !== "decision.completed" ||
      !isRecord(raw.event.decision) ||
      typeof raw.event.decision.model !== "string" ||
      !Array.isArray(raw.event.decision.answers) ||
      !isRecord(raw.event.decision.usage)
    ) {
      throw new VoiceAgentProtocolError("The service returned an invalid Live decision event.");
    }
    for (const field of ["delegation_id", "trigger_id", "source_event_type", "source_event_id"]) {
      if (
        !Object.prototype.hasOwnProperty.call(raw, field) ||
        (raw[field] !== null && typeof raw[field] !== "string")
      ) {
        throw new VoiceAgentProtocolError(`The service returned invalid decision "${field}".`);
      }
    }
  }
  if (
    type === "decision.item.created" &&
    (!isRecord(raw.item) ||
      typeof raw.item.id !== "string" ||
      !raw.item.id ||
      raw.item.role !== "user" ||
      (typeof raw.item.content !== "string" && !Array.isArray(raw.item.content)))
  ) {
    throw new VoiceAgentProtocolError("The service returned an invalid Live decision item.");
  }
  if (type === "decision.item.deleted" && (typeof raw.item_id !== "string" || !raw.item_id)) {
    throw new VoiceAgentProtocolError("The service returned an invalid Live decision item id.");
  }
  if (
    type === "error" &&
    (!isRecord(raw.error) ||
      typeof raw.error.type !== "string" ||
      typeof raw.error.code !== "string" ||
      typeof raw.error.message !== "string")
  ) {
    throw new VoiceAgentProtocolError("The service returned invalid Live error details.");
  }
  if (
    type === "session.delegation.created" &&
    (!isRecord(raw.delegation) || typeof raw.delegation.id !== "string" || !raw.delegation.id)
  ) {
    throw new VoiceAgentProtocolError("The service returned a Live delegation without an id.");
  }
  try {
    // Validate the envelope before invoking the generated converter.
    return liveServerEventUnionDeserializer(raw) as KnownLiveServerEvent;
  } catch (cause) {
    throw new VoiceAgentProtocolError(`Failed to deserialize Live event "${type}".`, { cause });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
