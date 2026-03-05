// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shared ACP protocol types and JSON-RPC helpers for TypeScript test fixtures.
 * Implements the ACP spec (JSON-RPC 2.0 over NDJSON via stdio).
 */

import * as readline from "readline";

// ─── JSON-RPC Types ───────────────────────────────────────────────

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number | string;
  method: string;
  params?: unknown;
}

export interface JsonRpcNotification {
  jsonrpc: "2.0";
  method: string;
  params?: unknown;
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: unknown;
  error?: JsonRpcError;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

// ─── ACP Schema Types ────────────────────────────────────────────

export interface InitializeRequest {
  protocolVersion: number;
  clientCapabilities?: ClientCapabilities;
  clientInfo?: Implementation;
}

export interface InitializeResponse {
  protocolVersion: number;
  agentCapabilities?: AgentCapabilities;
  agentInfo?: Implementation;
}

export interface ClientCapabilities {
  fs?: { readTextFile?: boolean; writeTextFile?: boolean };
  terminal?: boolean;
}

export interface AgentCapabilities {
  loadSession?: boolean;
}

export interface Implementation {
  name: string;
  version: string;
}

export interface NewSessionRequest {
  cwd: string;
  mcpServers: McpServer[];
}

export interface NewSessionResponse {
  sessionId: string;
}

export interface PromptRequest {
  sessionId: string;
  prompt: ContentBlock[];
}

export interface PromptResponse {
  stopReason: string;
}

export interface CancelNotification {
  sessionId: string;
}

export interface SessionNotification {
  sessionId: string;
  update: SessionUpdate;
}

export interface ContentBlock {
  type: string;
  text?: string;
}

export interface SessionUpdate {
  sessionUpdate: string;
  content?: ContentBlock;
}

export interface McpServer {
  type: string;
  name: string;
}

export interface RequestPermissionRequest {
  sessionId: string;
  toolCall: ToolCallUpdate;
  options: PermissionOption[];
}

export interface RequestPermissionResponse {
  outcome: { outcome: string; optionId?: string };
}

export interface ToolCallUpdate {
  toolCallId: string;
  title: string;
  status: string;
  kind?: string;
}

export interface PermissionOption {
  optionId: string;
  name: string;
  kind: string;
}

export interface ReadTextFileRequest {
  path: string;
}

export interface ReadTextFileResponse {
  content: string;
}

// ─── JSON-RPC Transport ──────────────────────────────────────────

export type RequestHandler = (
  method: string,
  params: unknown
) => Promise<unknown>;

export type NotificationHandler = (
  method: string,
  params: unknown
) => Promise<void>;

/**
 * NDJSON-based JSON-RPC transport over stdio.
 * Reads from stdin, writes to stdout.
 */
export class NdJsonTransport {
  private nextId = 1;
  private pendingRequests = new Map<
    number | string,
    {
      resolve: (value: unknown) => void;
      reject: (reason: Error) => void;
    }
  >();
  private requestHandler?: RequestHandler;
  private notificationHandler?: NotificationHandler;
  private rl: readline.Interface;

  constructor(
    private input: NodeJS.ReadableStream = process.stdin,
    private output: NodeJS.WritableStream = process.stdout
  ) {
    this.rl = readline.createInterface({ input: this.input });
  }

  onRequest(handler: RequestHandler): void {
    this.requestHandler = handler;
  }

  onNotification(handler: NotificationHandler): void {
    this.notificationHandler = handler;
  }

  async sendRequest(method: string, params?: unknown): Promise<unknown> {
    const id = this.nextId++;
    const msg: JsonRpcRequest = { jsonrpc: "2.0", id, method, params };
    return new Promise<unknown>((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.writeLine(msg);
    });
  }

  async sendNotification(method: string, params?: unknown): Promise<void> {
    const msg: JsonRpcNotification = { jsonrpc: "2.0", method, params };
    this.writeLine(msg);
  }

  async sendResponse(
    id: number | string | null,
    result?: unknown,
    error?: JsonRpcError
  ): Promise<void> {
    const msg: JsonRpcResponse = { jsonrpc: "2.0", id };
    if (error) {
      msg.error = error;
    } else {
      msg.result = result;
    }
    this.writeLine(msg);
  }

  run(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.rl.on("line", async (line: string) => {
        if (!line.trim()) return;

        try {
          const msg = JSON.parse(line);
          await this.handleMessage(msg);
        } catch (err) {
          // Skip malformed lines
          process.stderr.write(
            `[ts-transport] Malformed JSON: ${(err as Error).message}\n`
          );
        }
      });

      this.rl.on("close", () => {
        resolve();
      });
    });
  }

  private async handleMessage(
    msg: JsonRpcRequest | JsonRpcResponse | JsonRpcNotification
  ): Promise<void> {
    // Response (has result or error)
    if ("result" in msg || "error" in msg) {
      const resp = msg as JsonRpcResponse;
      const pending = this.pendingRequests.get(resp.id!);
      if (pending) {
        this.pendingRequests.delete(resp.id!);
        if (resp.error) {
          pending.reject(
            new Error(
              `JSON-RPC error ${resp.error.code}: ${resp.error.message}`
            )
          );
        } else {
          pending.resolve(resp.result);
        }
      }
      return;
    }

    // Request (has id and method)
    if ("id" in msg && "method" in msg) {
      const req = msg as JsonRpcRequest;
      if (this.requestHandler) {
        try {
          const result = await this.requestHandler(req.method, req.params);
          await this.sendResponse(req.id, result);
        } catch (err) {
          const error = err as Error & { code?: number };
          await this.sendResponse(req.id, undefined, {
            code: error.code ?? -32603,
            message: error.message,
          });
        }
      }
      return;
    }

    // Notification (method only)
    if ("method" in msg) {
      const notif = msg as JsonRpcNotification;
      if (this.notificationHandler) {
        await this.notificationHandler(notif.method, notif.params);
      }
    }
  }

  private writeLine(msg: unknown): void {
    this.output.write(JSON.stringify(msg) + "\n");
  }
}
