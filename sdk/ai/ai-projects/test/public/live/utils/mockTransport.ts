// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type {
  LiveServerEventLiveSessionClosed,
  LiveServerEventLiveSessionStarted,
  VoiceAgentLiveSessionResource,
} from "@azure/ai-projects";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "$internal/realtime/webSocketTransport.js";

export const endpoint = "https://example.services.ai.azure.com/api/projects/live-project";
export const accessToken: AccessToken = {
  token: "offline-live-test-token",
  expiresOnTimestamp: 4_102_444_800_000,
};

export class TestCredential implements TokenCredential {
  public requestedScopes?: string | string[];
  public tokenOptions?: GetTokenOptions;

  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    this.requestedScopes = scopes;
    this.tokenOptions = options;
    return accessToken;
  }
}

export function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} {
  let resolveValue!: (value: T) => void;
  let rejectError!: (error: Error) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveValue = resolve;
    rejectError = reject;
  });
  return { promise, resolve: resolveValue, reject: rejectError };
}

export function createSession(
  overrides: Partial<VoiceAgentLiveSessionResource> = {},
): VoiceAgentLiveSessionResource {
  return {
    id: "live-session-1",
    model: "gpt-live-1",
    status: "active",
    expires_at: 4_102_444_800,
    audio: { format: { type: "audio/pcm", rate: 24000 }, output: { voice: "marin" } },
    delegation: { type: "responses", responses: { model: "offline-responses-model" } },
    ...overrides,
  };
}

export function sessionStarted(session = createSession()): LiveServerEventLiveSessionStarted {
  return {
    type: "session.started",
    event_id: "started-1",
    conversation_id: "live-conversation-1",
    session,
  };
}

export function sessionClosed(session = createSession()): LiveServerEventLiveSessionClosed {
  return {
    type: "session.closed",
    event_id: "closed-1",
    reason: "close_requested",
    session,
    usage: { seconds: 12.5 },
  };
}

export class MockWebSocketTransport implements VoiceAgentWebSocketTransport {
  public handlers?: VoiceAgentWebSocketHandlers;
  public connectOptions?: VoiceAgentWebSocketConnectOptions;
  public readonly sentMessages: string[] = [];
  public readonly closeCalls: { code: number; reason: string }[] = [];
  public readonly connecting = deferred<void>();
  public session = createSession();
  public autoStart = true;
  public autoFinalize = true;
  public autoClose = true;
  public connectError?: Error;
  public sendError?: Error;
  public closeError?: Error;
  public connectResult?: Promise<void>;
  public sendResult?: Promise<void>;
  private socketClosed = false;

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    this.connectOptions = options;
    this.connecting.resolve();
    if (this.connectError) throw this.connectError;
    if (this.autoStart) this.receive(sessionStarted(this.session));
    await this.connectResult;
  }

  public async send(data: string, abortSignal?: AbortSignalLike): Promise<void> {
    if (abortSignal?.aborted) throw new Error("Mock send was cancelled.");
    if (this.sendError) throw this.sendError;
    this.sentMessages.push(data);
    const event: { type: string } = JSON.parse(data);
    if (this.autoFinalize && event.type === "session.close") {
      this.receive(sessionClosed(this.session));
    }
    await this.sendResult;
  }

  public async close(code: number, reason: string): Promise<void> {
    this.closeCalls.push({ code, reason });
    if (this.closeError) throw this.closeError;
    if (this.autoClose && !this.socketClosed) {
      this.socketClosed = true;
      await Promise.resolve();
      this.handlers?.onClose(code, reason, code === 1000);
    }
  }

  public receive(event: unknown): void {
    this.receiveRaw(JSON.stringify(event));
  }

  public receiveRaw(data: string | ArrayBuffer): void {
    this.handlers?.onMessage(data);
  }

  public disconnect(code = 1006, reason = "Offline socket interrupted.", wasClean = false): void {
    this.socketClosed = true;
    this.handlers?.onClose(code, reason, wasClean);
  }
}

export class MockWebSocketFactory implements VoiceAgentWebSocketFactory {
  public readonly transports = [new MockWebSocketTransport()];
  private count = 0;

  public get transport(): MockWebSocketTransport {
    return this.transports[this.transports.length - 1];
  }

  public create(): VoiceAgentWebSocketTransport {
    if (this.count++ > 0) this.transports.push(new MockWebSocketTransport());
    return this.transport;
  }
}
