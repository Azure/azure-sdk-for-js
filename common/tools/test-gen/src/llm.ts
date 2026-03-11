// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * llm.ts
 *
 * LLM interaction via the Copilot SDK.
 * Uses streaming with event-based collection for live progress feedback.
 */

import { CopilotClient, approveAll } from "@github/copilot-sdk";
import { defaults } from "./config.ts";

// Singleton client — created once, reused across all LLM calls.
let sharedClient: CopilotClient | undefined;
let authenticated = false;

/** Timeout for LLM responses — large prompts may take several minutes. */
const RESPONSE_TIMEOUT = 5 * 60_000;

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
    authenticated = false;
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

  return sharedClient;
}

/** Shut down the shared client. Call once at process exit. */
export async function stopClient(): Promise<void> {
  if (sharedClient) {
    await sharedClient.stop();
    sharedClient = undefined;
    authenticated = false;
  }
}

export interface SendOptions {
  model?: string;
  signal?: AbortSignal;
  /** Called with streaming token count updates for progress display. */
  onProgress?: (tokensSoFar: number) => void;
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
  const { model, signal, onProgress } = options ?? {};
  if (signal?.aborted) throw new Error("Aborted");
  const m = model ?? defaults.llm.model;
  const client = await getClient();
  const session = await client.createSession({
    model: m,
    streaming: true,
    onPermissionRequest: approveAll,
    systemMessage: {
      mode: "replace",
      content:
        "You are a code generation assistant. " +
        "Respond ONLY with the requested output — no explanations, no markdown fences, no commentary.",
    },
  });

  const t0 = Date.now();
  try {
    let content = "";
    let inputTokens = 0;
    let outputTokens = 0;

    const result = await new Promise<string>((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`LLM response timeout after ${RESPONSE_TIMEOUT / 1000}s`)),
        RESPONSE_TIMEOUT,
      );

      const unsub = session.on((evt: { type: string; data?: Record<string, any> }) => {
        switch (evt.type) {
          case "assistant.message.delta":
            content += (evt.data?.deltaContent as string) ?? "";
            break;
          case "assistant.usage":
            inputTokens += (evt.data?.inputTokens as number) ?? 0;
            outputTokens += (evt.data?.outputTokens as number) ?? 0;
            if (onProgress) onProgress(outputTokens);
            break;
          case "assistant.message":
            content = (evt.data?.content as string) ?? content;
            break;
          case "session.idle":
            clearTimeout(timer);
            unsub();
            resolve(content);
            break;
          case "session.error":
            clearTimeout(timer);
            unsub();
            reject(new Error((evt.data?.message as string) ?? "Session error"));
            break;
        }
      });

      session.send({ prompt }).catch((err: Error) => {
        clearTimeout(timer);
        unsub();
        reject(err);
      });
    });

    if (signal?.aborted) throw new Error("Aborted");
    if (!result) throw new Error("Empty LLM response");
    return { content: result, inputTokens, outputTokens, durationMs: Date.now() - t0 };
  } finally {
    await session.disconnect();
  }
}
