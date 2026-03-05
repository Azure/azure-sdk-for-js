// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * TypeScript ACP Client test fixture.
 *
 * Implements a minimal ACP client that communicates with an agent via JSON-RPC over stdio.
 * Used to test: .NET agent ↔ TypeScript client interoperability.
 *
 * The client connects to the agent process via stdin/stdout pipes, sends the
 * standard ACP handshake (initialize → session/new → session/prompt), and
 * collects session update notifications.
 *
 * Expects the agent process to be piped via stdin/stdout.
 *
 * Usage: tsx test-client.ts
 *
 * Output: JSON report on stderr with collected results, then exits.
 */

import {
  NdJsonTransport,
  type InitializeRequest,
  type InitializeResponse,
  type NewSessionRequest,
  type NewSessionResponse,
  type PromptRequest,
  type PromptResponse,
  type SessionNotification,
  type RequestPermissionRequest,
  type RequestPermissionResponse,
} from "./acp-protocol.js";

const transport = new NdJsonTransport();

// Collected session updates for verification
const sessionUpdates: SessionNotification[] = [];

// Handle server → client notifications/requests
transport.onNotification(async (method: string, params: unknown) => {
  if (method === "session/update") {
    const notification = params as SessionNotification;
    sessionUpdates.push(notification);
    process.stderr.write(
      `[ts-client] session/update: sessionId=${notification.sessionId}, ` +
        `updateType=${notification.update?.sessionUpdate}\n`
    );
  }
});

transport.onRequest(
  async (method: string, params: unknown): Promise<unknown> => {
    switch (method) {
      case "session/request_permission": {
        const req = params as RequestPermissionRequest;
        process.stderr.write(
          `[ts-client] session/request_permission: sessionId=${req.sessionId}\n`
        );
        const resp: RequestPermissionResponse = {
          outcome: { outcome: "selected", optionId: "allow_once" },
        };
        return resp;
      }

      case "fs/read_text_file": {
        const req = params as { path: string };
        process.stderr.write(
          `[ts-client] fs/read_text_file: path=${req.path}\n`
        );
        return {
          content: `// Content of ${req.path}\nconsole.log("hello");`,
        };
      }

      default:
        throw Object.assign(new Error(`Method not found: ${method}`), {
          code: -32601,
        });
    }
  }
);

interface TestResult {
  success: boolean;
  initializeResponse?: InitializeResponse;
  sessionId?: string;
  promptResponse?: PromptResponse;
  sessionUpdates: SessionNotification[];
  errors: string[];
}

async function runClient(): Promise<void> {
  const result: TestResult = {
    success: false,
    sessionUpdates: [],
    errors: [],
  };

  // Start the transport in background
  const transportDone = transport.run();

  try {
    // Step 1: Initialize
    process.stderr.write("[ts-client] Sending initialize...\n");
    const initResp = (await transport.sendRequest("initialize", {
      protocolVersion: 1,
      clientCapabilities: {
        fs: { readTextFile: true, writeTextFile: true },
        terminal: true,
      },
      clientInfo: { name: "ts-test-client", version: "1.0.0" },
    } satisfies InitializeRequest)) as InitializeResponse;

    result.initializeResponse = initResp;
    process.stderr.write(
      `[ts-client] Initialize response: agent=${initResp.agentInfo?.name}, ` +
        `version=${initResp.agentInfo?.version}\n`
    );

    // Step 2: Create a session
    process.stderr.write("[ts-client] Sending session/new...\n");
    const sessionResp = (await transport.sendRequest("session/new", {
      cwd: "/test/workspace",
      mcpServers: [],
    } satisfies NewSessionRequest)) as NewSessionResponse;

    result.sessionId = sessionResp.sessionId;
    process.stderr.write(
      `[ts-client] Session created: ${sessionResp.sessionId}\n`
    );

    // Step 3: Send a prompt
    process.stderr.write("[ts-client] Sending session/prompt...\n");
    const promptResp = (await transport.sendRequest("session/prompt", {
      sessionId: sessionResp.sessionId,
      prompt: [{ type: "text", text: "Hello from TypeScript client!" }],
    } satisfies PromptRequest)) as PromptResponse;

    result.promptResponse = promptResp;
    process.stderr.write(
      `[ts-client] Prompt response: stopReason=${promptResp.stopReason}\n`
    );

    // Give time for any remaining session/update notifications
    await new Promise((resolve) => setTimeout(resolve, 100));

    result.sessionUpdates = [...sessionUpdates];
    result.success = true;
  } catch (err) {
    result.errors.push((err as Error).message);
    process.stderr.write(`[ts-client] Error: ${(err as Error).message}\n`);
  }

  // Output the result as a single JSON line on stderr with a marker
  // stdout is reserved for the ACP transport (JSON-RPC messages)
  process.stderr.write("__RESULT__" + JSON.stringify(result) + "\n");

  // Close stdin to signal the transport to stop
  process.stdin.destroy();
  await transportDone;

  process.exit(result.success ? 0 : 1);
}

runClient().catch((err) => {
  process.stderr.write(`[ts-client] Fatal error: ${err}\n`);
  process.exit(1);
});
