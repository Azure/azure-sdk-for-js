// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * TypeScript ACP Agent (server) test fixture.
 *
 * Implements a minimal ACP agent that communicates via JSON-RPC over stdio.
 * Used to test: TypeScript agent ↔ .NET client interoperability.
 *
 * Supports:
 *   - initialize
 *   - session/new
 *   - session/prompt  (sends session/update notifications back to client)
 *   - session/cancel
 *
 * Usage: tsx test-server.ts
 */

import {
  NdJsonTransport,
  type InitializeRequest,
  type InitializeResponse,
  type NewSessionRequest,
  type NewSessionResponse,
  type PromptRequest,
  type PromptResponse,
  type CancelNotification,
} from "./acp-protocol.js";

const transport = new NdJsonTransport();

let sessionCounter = 0;
const sessions = new Map<string, { cwd: string; cancelled: boolean }>();

transport.onRequest(
  async (method: string, params: unknown): Promise<unknown> => {
    switch (method) {
      case "initialize": {
        const req = params as InitializeRequest;
        process.stderr.write(
          `[ts-agent] initialize: protocolVersion=${req.protocolVersion}\n`
        );
        const resp: InitializeResponse = {
          protocolVersion: req.protocolVersion,
          agentCapabilities: {},
          agentInfo: { name: "ts-test-agent", version: "1.0.0" },
        };
        return resp;
      }

      case "session/new": {
        const req = params as NewSessionRequest;
        const sessionId = `ts-session-${++sessionCounter}`;
        sessions.set(sessionId, { cwd: req.cwd, cancelled: false });
        process.stderr.write(
          `[ts-agent] session/new: sessionId=${sessionId}, cwd=${req.cwd}\n`
        );
        const resp: NewSessionResponse = { sessionId };
        return resp;
      }

      case "session/prompt": {
        const req = params as PromptRequest;
        const session = sessions.get(req.sessionId);
        process.stderr.write(
          `[ts-agent] session/prompt: sessionId=${req.sessionId}\n`
        );

        if (!session) {
          throw Object.assign(
            new Error(`Session not found: ${req.sessionId}`),
            { code: -32001 }
          );
        }

        // Extract prompt text
        const promptText =
          req.prompt
            ?.filter((b) => b.type === "text")
            .map((b) => b.text)
            .join("") ?? "";

        // Send a session/update notification with agent response
        await transport.sendNotification("session/update", {
          sessionId: req.sessionId,
          update: {
            sessionUpdate: "agent_message_chunk",
            content: {
              type: "text",
              text: `Echo from TypeScript agent: ${promptText}`,
            },
          },
        });

        const resp: PromptResponse = { stopReason: "end_turn" };
        return resp;
      }

      default:
        throw Object.assign(new Error(`Method not found: ${method}`), {
          code: -32601,
        });
    }
  }
);

transport.onNotification(async (method: string, params: unknown) => {
  switch (method) {
    case "session/cancel": {
      const notif = params as CancelNotification;
      const session = sessions.get(notif.sessionId);
      if (session) {
        session.cancelled = true;
      }
      process.stderr.write(
        `[ts-agent] session/cancel: sessionId=${notif.sessionId}\n`
      );
      break;
    }
  }
});

// Start processing stdio
process.stderr.write("[ts-agent] Starting ACP agent on stdio...\n");
transport.run().then(() => {
  process.stderr.write("[ts-agent] Agent shutting down.\n");
  process.exit(0);
});
