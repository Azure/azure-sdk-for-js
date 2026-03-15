// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ai-loop.ts — AI-powered loop: act returns a prompt + zod schema,
 * LLM client lifecycle is managed internally.
 */

import { z } from "zod";
import { loop } from "./loop.ts";
import { stopClient, send } from "../llm.ts";
import type { LlmCallStats } from "../types.ts";

export interface AIAction<R extends Record<string, any> = Record<string, any>> {
  prompt: string;
  /** Zod schema — used for both prompt JSON schema and response validation. */
  schema: z.ZodType<R>;
  onResponse: (response: R) => Promise<void>;
}

export interface AILoop<T> {
  /** Return true to stop the loop, false to continue. */
  isTerminal: (ctx: T, iteration: number) => Promise<boolean>;
  /** Return a prompt, zod schema, and handler. The prompt is sent to the LLM. */
  act: (ctx: T, iteration: number) => Promise<AIAction>;
  /** Extra cleanup beyond the LLM client (which is automatic). */
  cleanup?: (ctx: T) => Promise<void> | void;
}

export interface AILoopOptions {
  maxIterations: number;
  model?: string;
  /** Pass an AbortSignal to cancel the loop mid-run. Cleanup still fires. */
  signal?: AbortSignal;
  /** Called with streaming progress (output tokens so far) during LLM generation. */
  onProgress?: (tokensSoFar: number) => void;
  /** If provided, each LLM call's usage stats are appended here. */
  llmStats?: LlmCallStats[];
}

/** Measure → act loop with built-in LLM client lifecycle. */
export async function aiLoop<T>(
  config: AILoop<T>,
  ctx: T,
  options: AILoopOptions,
): Promise<number> {
  // Cache: zod schema → precomputed JSON schema string (avoids recomputing each iteration)
  const jsonSchemaCache = new Map<z.ZodType, string>();

  function getJsonSchema(schema: z.ZodType): string {
    let cached = jsonSchemaCache.get(schema);
    if (!cached) {
      cached = JSON.stringify(schema.toJSONSchema(), null, 2);
      jsonSchemaCache.set(schema, cached);
    }
    return cached;
  }

  return loop<T>(
    {
      isTerminal: config.isTerminal,

      async act(ctx, iteration) {
        const action = await config.act(ctx, iteration);
        const jsonSchema = getJsonSchema(action.schema);
        const augmented = `${action.prompt}\n\nRespond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:\n${jsonSchema}`;

        const { content, inputTokens, outputTokens, durationMs } = await send(augmented, {
          model: options.model,
          signal: options.signal,
          onProgress: options.onProgress,
        });
        if (options.llmStats) {
          options.llmStats.push({ inputTokens, outputTokens, durationMs });
        }
        const result = action.schema.parse(JSON.parse(content));
        await action.onResponse(result);
      },

      async cleanup(ctx) {
        if (config.cleanup) await config.cleanup(ctx);
        await stopClient();
      },
    },
    ctx,
    options.maxIterations,
    options.signal,
  );
}
