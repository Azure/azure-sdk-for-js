// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { TokenCredential } from "@azure/core-auth";
import { uint8ArrayToString } from "@azure/core-util";
import { SDK_VERSION } from "../constants.js";
import type {
  VoiceAgentClientEvent,
  VoiceAgentResponseCreateParams,
  VoiceAgentServerEvent,
  VoiceAgentSessionUpdateConfig,
} from "../models/models.js";
import { logger } from "../logger.js";
import { AsyncQueue } from "./asyncQueue.js";
import {
  VoiceAgentAuthenticationError,
  VoiceAgentConnectionError,
  VoiceAgentProtocolError,
} from "./errors.js";
import { deserializeVoiceAgentServerEvent, serializeVoiceAgentClientEvent } from "./protocol.js";
import type {
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketTransport,
} from "./webSocketTransportLike.js";

const defaultCredentialScope = "https://ai.azure.com/.default";
const voiceAgentsPreview = "VoiceAgents=V1Preview";

/** Connection states reported by a voice-agent realtime connection. */
export enum VoiceAgentConnectionState {
  Disconnected = "disconnected",
  Connecting = "connecting",
  Connected = "connected",
  Closing = "closing",
}

/** Called when a voice-agent connection changes state. */
export type VoiceAgentConnectionStateChangedHandler = (
  state: VoiceAgentConnectionState,
  previousState: VoiceAgentConnectionState,
) => void;

/** Options for the Voice Agents realtime client. */
export interface VoiceAgentRealtimeClientOptions {
  /** Microsoft Entra scopes used to acquire a WebSocket access token. */
  credentialScopes?: string | string[];
  /** Default connection timeout in milliseconds. */
  connectionTimeoutInMs?: number;
  /** API version sent during the WebSocket upgrade. */
  apiVersion?: string;
  /** Prefix added to the SDK user-agent value in Node.js. */
  userAgentPrefix?: string;
  /** @internal */
  webSocketFactory?: VoiceAgentWebSocketFactory;
}

/** Options for connecting the realtime client to a voice agent. */
export interface VoiceAgentRealtimeClientConnectOptions {
  /** Identifier used to correlate the voice session. */
  agentSessionId?: string;
  /** Overrides whether the conversation created by this session is persisted. */
  store?: boolean;
  /** Selects a specific immutable agent version. */
  agentVersionOverride?: string;
  /** Values used to render the agent's structured prompt inputs. */
  structuredInputs?: Record<string, unknown>;
  /** Overrides the client connection timeout in milliseconds. */
  connectionTimeoutInMs?: number;
  /** Cancels the connection attempt. */
  abortSignal?: AbortSignalLike;
  /** Receives connection-state transitions. */
  onConnectionStateChange?: VoiceAgentConnectionStateChangedHandler;
}

/** Result supplied when a voice-agent connection closes. */
export interface VoiceAgentCloseResult {
  /** WebSocket close code. */
  code: number;
  /** WebSocket close reason. */
  reason: string;
  /** Whether the peer completed a normal WebSocket close handshake. */
  wasClean: boolean;
  /** Transport or protocol error associated with the close, if any. */
  error?: Error;
}

/** Options shared by realtime send operations. */
export interface VoiceAgentSendOptions {
  /** Cancels this send operation. */
  abortSignal?: AbortSignalLike;
}

/** Options for sending text input. */
export interface VoiceAgentSendTextOptions extends VoiceAgentSendOptions {
  /** Client-generated event identifier. */
  eventId?: string;
  /** Item after which the new text item is inserted. */
  previousItemId?: string;
  /** Whether to request a response after adding the text. Defaults to true. */
  createResponse?: boolean;
}

/** Options for returning a function result. */
export interface VoiceAgentSendToolOutputOptions extends VoiceAgentSendOptions {
  /** Client-generated event identifier. */
  eventId?: string;
  /** Whether to request a response after adding the result. Defaults to true. */
  createResponse?: boolean;
}

/** Options for updating the live session. */
export interface VoiceAgentSessionUpdateOptions extends VoiceAgentSendOptions {
  /** Client-generated event identifier. */
  eventId?: string;
}

/** Options for creating a response. */
export interface VoiceAgentResponseOptions extends VoiceAgentSendOptions {
  /** Client-generated event identifier. */
  eventId?: string;
  /** Response-specific configuration. */
  response?: VoiceAgentResponseCreateParams;
}

/** Options for cancelling a response. */
export interface VoiceAgentCancelResponseOptions extends VoiceAgentSendOptions {
  /** Client-generated event identifier. */
  eventId?: string;
  /** Specific response to cancel. The active default-conversation response is used when omitted. */
  responseId?: string;
}

/**
 * A connected, bidirectional voice-agent stream.
 *
 * Supports exactly one `for await` iteration over server events; a second attempt throws.
 * Exiting the loop early (`break`, `return`, or an uncaught error in the loop body) closes
 * the connection as a side effect.
 */
export interface VoiceAgentConnection extends AsyncIterable<VoiceAgentServerEvent> {
  /** Current connection state. */
  readonly state: VoiceAgentConnectionState;
  /** Resolves once the connection is closed. */
  readonly closed: Promise<VoiceAgentCloseResult>;
  /** Sends any generated client protocol event. */
  sendEvent(event: VoiceAgentClientEvent, options?: VoiceAgentSendOptions): Promise<void>;
  /** Updates supported live-session settings. */
  configureSession(
    session: VoiceAgentSessionUpdateConfig,
    options?: VoiceAgentSessionUpdateOptions,
  ): Promise<void>;
  /** Adds a user text item and, by default, requests a response. */
  sendText(text: string, options?: VoiceAgentSendTextOptions): Promise<void>;
  /** Appends base64-encoded audio bytes to the input buffer. */
  sendAudio(audio: Uint8Array | ArrayBuffer, options?: VoiceAgentSendOptions): Promise<void>;
  /** Commits buffered input audio. */
  commitAudio(options?: VoiceAgentSendOptions): Promise<void>;
  /** Clears buffered input audio. */
  clearInputAudio(options?: VoiceAgentSendOptions): Promise<void>;
  /** Clears pending output audio at the service. */
  clearOutputAudio(options?: VoiceAgentSendOptions): Promise<void>;
  /** Returns a client-executed function result to the agent. */
  sendToolOutput(
    callId: string,
    output: string,
    options?: VoiceAgentSendToolOutputOptions,
  ): Promise<void>;
  /** Requests a new response. */
  requestResponse(options?: VoiceAgentResponseOptions): Promise<void>;
  /** Cancels an in-progress response. */
  cancelResponse(options?: VoiceAgentCancelResponseOptions): Promise<void>;
  /** Gracefully closes the WebSocket connection. */
  close(code?: number, reason?: string): Promise<void>;
  /** Releases the connection. Equivalent to close(). */
  dispose(): Promise<void>;
}

/** Client for establishing realtime sessions with managed Foundry voice agents. */
export class VoiceAgentRealtimeClient {
  private readonly endpoint: string;
  private readonly credential: TokenCredential;
  private readonly options: Required<
    Pick<VoiceAgentRealtimeClientOptions, "connectionTimeoutInMs" | "apiVersion">
  > &
    VoiceAgentRealtimeClientOptions;

  public constructor(
    endpoint: string,
    credential: TokenCredential,
    options: VoiceAgentRealtimeClientOptions = {},
  ) {
    this.endpoint = normalizeEndpoint(endpoint);
    this.credential = credential;
    this.options = {
      ...options,
      connectionTimeoutInMs: options.connectionTimeoutInMs ?? 30_000,
      apiVersion: options.apiVersion ?? "v1",
    };
  }

  /** Establishes a WebSocket connection to a managed voice agent. */
  public async connect(
    agentName: string,
    options: VoiceAgentRealtimeClientConnectOptions = {},
  ): Promise<VoiceAgentConnection> {
    if (!agentName.trim()) {
      throw new TypeError("agentName must not be empty.");
    }
    const factory =
      this.options.webSocketFactory ??
      (await import("#platform/webSocketTransport")).defaultVoiceAgentWebSocketFactory;
    const connection = new VoiceAgentConnectionImpl(
      this.endpoint,
      agentName,
      this.credential,
      this.options,
      options,
      factory,
    );
    await connection.open();
    return connection;
  }
}

class VoiceAgentConnectionImpl implements VoiceAgentConnection {
  private readonly events = new AsyncQueue<VoiceAgentServerEvent>();
  private readonly transport: VoiceAgentWebSocketTransport;
  private readonly closePromise: Promise<VoiceAgentCloseResult>;
  private resolveClose!: (result: VoiceAgentCloseResult) => void;
  private currentState = VoiceAgentConnectionState.Disconnected;
  private iteratorStarted = false;
  private finished = false;

  public constructor(
    private readonly endpoint: string,
    private readonly agentName: string,
    private readonly credential: TokenCredential,
    private readonly clientOptions: VoiceAgentRealtimeClientOptions & {
      connectionTimeoutInMs: number;
      apiVersion: string;
    },
    private readonly connectOptions: VoiceAgentRealtimeClientConnectOptions,
    factory: VoiceAgentWebSocketFactory,
  ) {
    this.transport = factory.create();
    this.closePromise = new Promise<VoiceAgentCloseResult>((resolve) => {
      this.resolveClose = resolve;
    });
    this.transport.setHandlers({
      onMessage: (data) => this.handleMessage(data),
      onClose: (code, reason, wasClean) => this.handleClose(code, reason, wasClean),
      onError: (error) => this.handleTransportError(error),
    });
  }

  public get state(): VoiceAgentConnectionState {
    return this.currentState;
  }

  public get closed(): Promise<VoiceAgentCloseResult> {
    return this.closePromise;
  }

  public async open(): Promise<void> {
    this.setState(VoiceAgentConnectionState.Connecting);
    let token: string;
    try {
      const accessToken = await this.credential.getToken(
        this.clientOptions.credentialScopes ?? defaultCredentialScope,
        { abortSignal: this.connectOptions.abortSignal },
      );
      if (!accessToken) {
        throw new VoiceAgentAuthenticationError("The credential returned no access token.");
      }
      token = accessToken.token;
    } catch (error) {
      const authenticationError =
        error instanceof VoiceAgentAuthenticationError
          ? error
          : new VoiceAgentAuthenticationError("Failed to acquire a Voice Agents access token.", {
              cause: error,
            });
      this.finish(1006, authenticationError.message, false, authenticationError);
      throw authenticationError;
    }

    try {
      await this.transport.connect({
        url: buildWebSocketUrl(
          this.endpoint,
          this.agentName,
          this.clientOptions.apiVersion,
          this.connectOptions,
        ),
        protocols: ["realtime"],
        headers: buildHeaders(token, this.clientOptions, this.connectOptions),
        connectionTimeoutInMs:
          this.connectOptions.connectionTimeoutInMs ?? this.clientOptions.connectionTimeoutInMs,
        abortSignal: this.connectOptions.abortSignal,
      });
      this.setState(VoiceAgentConnectionState.Connected);
      logger.info("Connected to voice agent", { agentName: this.agentName });
    } catch (error) {
      const cancelled = this.connectOptions.abortSignal?.aborted === true;
      const connectionError = new VoiceAgentConnectionError(
        cancelled
          ? "Voice-agent connection was cancelled."
          : "Failed to connect to the voice agent.",
        cancelled ? "operationCancelled" : "connectionFailed",
        { cause: error },
      );
      this.finish(1006, connectionError.message, false, connectionError);
      throw connectionError;
    }
  }

  public async sendEvent(
    event: VoiceAgentClientEvent,
    options: VoiceAgentSendOptions = {},
  ): Promise<void> {
    if (this.state !== VoiceAgentConnectionState.Connected) {
      throw new VoiceAgentConnectionError(
        `Cannot send while the connection is ${this.state}.`,
        "invalidState",
      );
    }
    if (options.abortSignal?.aborted) {
      throw new VoiceAgentConnectionError("Send operation was cancelled.", "operationCancelled");
    }

    try {
      await this.transport.send(serializeVoiceAgentClientEvent(event), options.abortSignal);
    } catch (error) {
      if (error instanceof VoiceAgentProtocolError) {
        throw error;
      }
      throw new VoiceAgentConnectionError("Failed to send a voice-agent event.", "sendFailed", {
        cause: error,
      });
    }
  }

  public configureSession(
    session: VoiceAgentSessionUpdateConfig,
    options: VoiceAgentSessionUpdateOptions = {},
  ): Promise<void> {
    return this.sendEvent({ type: "session.update", event_id: options.eventId, session }, options);
  }

  public async sendText(text: string, options: VoiceAgentSendTextOptions = {}): Promise<void> {
    await this.sendEvent(
      {
        type: "conversation.item.create",
        event_id: options.eventId,
        previous_item_id: options.previousItemId,
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text }],
        },
      },
      options,
    );
    if (options.createResponse !== false) {
      await this.requestResponse(options);
    }
  }

  public sendAudio(
    audio: Uint8Array | ArrayBuffer,
    options: VoiceAgentSendOptions = {},
  ): Promise<void> {
    const bytes = audio instanceof Uint8Array ? audio : new Uint8Array(audio);
    return this.sendEvent(
      {
        type: "input_audio_buffer.append",
        audio: uint8ArrayToString(bytes, "base64"),
      },
      options,
    );
  }

  public commitAudio(options: VoiceAgentSendOptions = {}): Promise<void> {
    return this.sendEvent({ type: "input_audio_buffer.commit" }, options);
  }

  public clearInputAudio(options: VoiceAgentSendOptions = {}): Promise<void> {
    return this.sendEvent({ type: "input_audio_buffer.clear" }, options);
  }

  public clearOutputAudio(options: VoiceAgentSendOptions = {}): Promise<void> {
    return this.sendEvent({ type: "output_audio_buffer.clear" }, options);
  }

  public async sendToolOutput(
    callId: string,
    output: string,
    options: VoiceAgentSendToolOutputOptions = {},
  ): Promise<void> {
    await this.sendEvent(
      {
        type: "conversation.item.create",
        event_id: options.eventId,
        item: { type: "function_call_output", call_id: callId, output },
      },
      options,
    );
    if (options.createResponse !== false) {
      await this.requestResponse(options);
    }
  }

  public requestResponse(options: VoiceAgentResponseOptions = {}): Promise<void> {
    return this.sendEvent(
      { type: "response.create", event_id: options.eventId, response: options.response },
      options,
    );
  }

  public cancelResponse(options: VoiceAgentCancelResponseOptions = {}): Promise<void> {
    return this.sendEvent(
      { type: "response.cancel", event_id: options.eventId, response_id: options.responseId },
      options,
    );
  }

  public async close(
    code = 1000,
    reason = "Client closed the voice-agent connection.",
  ): Promise<void> {
    if (
      this.state === VoiceAgentConnectionState.Disconnected ||
      this.state === VoiceAgentConnectionState.Closing
    ) {
      await this.closed;
      return;
    }
    this.setState(VoiceAgentConnectionState.Closing);
    try {
      await this.transport.close(code, reason);
    } finally {
      this.finish(code, reason, code === 1000);
    }
  }

  public dispose(): Promise<void> {
    return this.close();
  }

  public async *[Symbol.asyncIterator](): AsyncIterator<VoiceAgentServerEvent> {
    if (this.iteratorStarted) {
      throw new VoiceAgentConnectionError(
        "A voice-agent connection supports one active event iterator.",
        "invalidState",
      );
    }
    this.iteratorStarted = true;
    try {
      while (true) {
        const result = await this.events.next();
        if (result.done) {
          return;
        }
        yield result.value;
      }
    } finally {
      if (this.state === VoiceAgentConnectionState.Connected) {
        await this.close();
      }
    }
  }

  private handleMessage(data: string | ArrayBuffer): void {
    try {
      this.events.enqueue(deserializeVoiceAgentServerEvent(data));
    } catch (error) {
      const protocolError =
        error instanceof VoiceAgentProtocolError
          ? error
          : new VoiceAgentProtocolError("Failed to process a voice-agent event.", { cause: error });
      this.finish(1002, protocolError.message, false, protocolError);
      void this.transport.close(1002, protocolError.message);
    }
  }

  private handleClose(code: number, reason: string, wasClean: boolean): void {
    if (this.finished) {
      return;
    }
    if (wasClean || this.state === VoiceAgentConnectionState.Closing) {
      this.finish(code, reason, wasClean);
    } else {
      const error = new VoiceAgentConnectionError(
        `Voice-agent connection closed unexpectedly (${code}${reason ? `: ${reason}` : ""}).`,
        "connectionClosed",
        { closeCode: code },
      );
      this.finish(code, reason, false, error);
    }
  }

  private handleTransportError(cause: Error): void {
    if (this.finished) {
      return;
    }
    const error = new VoiceAgentConnectionError(
      "Voice-agent WebSocket transport failed.",
      "connectionClosed",
      {
        cause,
      },
    );
    this.finish(1006, cause.message, false, error);
  }

  private finish(code: number, reason: string, wasClean: boolean, error?: Error): void {
    if (this.finished) {
      return;
    }
    this.finished = true;
    if (error) {
      this.events.fail(error);
    } else {
      this.events.close();
    }
    this.setState(VoiceAgentConnectionState.Disconnected);
    this.resolveClose({ code, reason, wasClean, error });
    logger.info("Voice-agent connection closed", { code, reason, wasClean });
  }

  private setState(state: VoiceAgentConnectionState): void {
    if (state === this.currentState) {
      return;
    }
    const previousState = this.currentState;
    this.currentState = state;
    this.connectOptions.onConnectionStateChange?.(state, previousState);
  }
}

function normalizeEndpoint(endpoint: string): string {
  const normalized = endpoint.trim();
  if (!normalized) {
    throw new TypeError("endpoint must not be empty.");
  }
  const url = new URL(normalized.includes("://") ? normalized : `https://${normalized}`);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new TypeError("endpoint must use http or https.");
  }
  return url.toString().replace(/\/$/, "");
}

function buildWebSocketUrl(
  endpoint: string,
  agentName: string,
  apiVersion: string,
  options: VoiceAgentRealtimeClientConnectOptions,
): string {
  const url = new URL(endpoint);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/$/, "")}/agents/${encodeURIComponent(agentName)}/endpoint/protocols/voice`;
  url.searchParams.set("api-version", apiVersion);
  if (options.agentSessionId) {
    url.searchParams.set("agent_session_id", options.agentSessionId);
  }
  if (options.store !== undefined) {
    url.searchParams.set("store", String(options.store));
  }
  if (options.agentVersionOverride) {
    url.searchParams.set("x-agent-version-override", options.agentVersionOverride);
  }
  return url.toString();
}

function buildHeaders(
  token: string,
  clientOptions: VoiceAgentRealtimeClientOptions,
  connectOptions: VoiceAgentRealtimeClientConnectOptions,
): Record<string, string> {
  const sdkUserAgent = `azsdk-js-ai-projects/${SDK_VERSION}`;
  const headers: Record<string, string> = {
    authorization: `Bearer ${token}`,
    "foundry-features": voiceAgentsPreview,
    "x-ms-client-request-id": createRequestId(),
    "user-agent": clientOptions.userAgentPrefix
      ? `${clientOptions.userAgentPrefix} ${sdkUserAgent}`
      : sdkUserAgent,
  };
  if (connectOptions.structuredInputs) {
    headers["x-ms-voice-structured-inputs"] = JSON.stringify(connectOptions.structuredInputs);
  }
  return headers;
}

function createRequestId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}
