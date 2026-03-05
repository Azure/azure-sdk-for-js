// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { EnrichedThread, ClusterInfo } from "./types.ts";

const execFileAsync = promisify(execFile);

const GITHUB_MODELS_URL = "https://models.inference.ai.azure.com/chat/completions";
const MODEL = "gpt-4o-mini";
const MAX_REPRESENTATIVES = 5;

/** A function that calls a chat completion API and returns the response text. */
export type ChatCompleter = (systemPrompt: string, userPrompt: string) => Promise<string>;

/**
 * Creates a ChatCompleter that calls GitHub Models API.
 * Token resolution order:
 *   1. GH_TOKEN env var (set by eng/common/scripts/login-to-github.ps1 in CI)
 *   2. `gh auth token` (local dev)
 */
export async function createGitHubModelsCompleter(): Promise<ChatCompleter> {
  const token = await resolveGitHubToken();
  const maxRetries = 5;
  // GitHub Models allows 20 requests/min — pace at ~3.5s between calls
  const minDelayMs = 3500;
  let lastCallTime = 0;

  return async (systemPrompt: string, userPrompt: string): Promise<string> => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      // Proactive rate-limit pacing
      const elapsed = Date.now() - lastCallTime;
      if (elapsed < minDelayMs) {
        await new Promise((resolve) => setTimeout(resolve, minDelayMs - elapsed));
      }
      lastCallTime = Date.now();

      const response = await fetch(GITHUB_MODELS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 200,
          temperature: 0.3,
        }),
        signal: AbortSignal.timeout(30_000),
      });

      if (response.status === 429 && attempt < maxRetries) {
        // Parse retry-after header or use exponential backoff
        const retryAfter = response.headers.get("retry-after");
        const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.min(2000 * 2 ** attempt, 60_000);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      if (!response.ok) {
        throw new Error(`GitHub Models API error: ${response.status} ${await response.text()}`);
      }

      const data = (await response.json()) as {
        choices: Array<{ message: { content: string } }>;
      };
      return data.choices[0]?.message?.content ?? "";
    }

    throw new Error("GitHub Models API: max retries exceeded");
  };
}

/**
 * Resolves a GitHub token, preferring the GH_TOKEN env var
 * (set by eng/common/scripts/login-to-github.ps1 in CI pipelines)
 * and falling back to `gh auth token` for local development.
 */
async function resolveGitHubToken(): Promise<string> {
  const envToken = process.env.GH_TOKEN;
  if (envToken) {
    return envToken;
  }

  const { stdout } = await execFileAsync("gh", ["auth", "token"]);
  return stdout.trim();
}

const SYSTEM_PROMPT = `You are an expert in Azure SDK API design reviews. Given a set of review thread examples from a cluster, produce a short category label (2-5 words).

Respond in exactly this JSON format (no markdown):
{"label": "..."}`;

/**
 * Labels clusters by sending representative threads to an LLM.
 */
export async function labelClusters(
  clusterAssignments: Map<string, number>,
  threads: EnrichedThread[],
  clusterCount: number,
  completer: ChatCompleter,
  onProgress?: (done: number, total: number) => void,
): Promise<Map<number, ClusterInfo>> {
  const clusters = new Map<number, ClusterInfo>();

  // Group threads by cluster
  const grouped = new Map<number, EnrichedThread[]>();
  for (const thread of threads) {
    const id = clusterAssignments.get(thread.threadUrl) ?? -1;
    if (id === -1) continue;
    const arr = grouped.get(id);
    if (arr) {
      arr.push(thread);
    } else {
      grouped.set(id, [thread]);
    }
  }

  let done = 0;
  for (const [id, members] of grouped) {
    const representatives = members.slice(0, MAX_REPRESENTATIVES);
    const examples = representatives
      .map((t, i) => {
        const comments = t.comments
          .slice(0, 2)
          .map((c) => `  ${c.author}: ${c.body.slice(0, 200)}`)
          .join("\n");
        return `Example ${i + 1}:\nCode: ${t.targetLine}\nConversation:\n${comments}`;
      })
      .join("\n\n");

    let label = `Cluster ${id}`;

    try {
      const response = await completer(SYSTEM_PROMPT, examples);
      const parsed = JSON.parse(response) as { label?: string };
      if (parsed.label) label = parsed.label;
    } catch {
      // fallback label
    }

    clusters.set(id, {
      id,
      label,
      size: members.length,
      threadUrls: members.map((t) => t.threadUrl),
    });

    done++;
    onProgress?.(done, clusterCount);
  }

  // Add noise cluster info
  const noiseThreads = threads.filter((t) => (clusterAssignments.get(t.threadUrl) ?? -1) === -1);
  if (noiseThreads.length > 0) {
    clusters.set(-1, {
      id: -1,
      label: "Unclustered",
      size: noiseThreads.length,
      threadUrls: noiseThreads.map((t) => t.threadUrl),
    });
  }

  return clusters;
}

const SUMMARIZE_SYSTEM_PROMPT = `You are an expert in Azure SDK API design reviews. Given a review thread with code context and reviewer comments, extract the architecture or design rule being enforced.

Describe the rule as an imperative statement (e.g. "Export all public-facing symbols from the package entry point", "Use string literal unions instead of enums for extensibility").

Respond with ONLY the rule statement, no quotes or extra formatting.`;

/**
 * Extracts the architecture/design rule each thread enforces via LLM.
 * Batches requests to reduce round-trips.
 */
export async function extractThreadRules(
  threads: EnrichedThread[],
  completer: ChatCompleter,
  onProgress?: (done: number, total: number) => void,
): Promise<Map<string, string>> {
  const summaries = new Map<string, string>();
  const batchSize = 5;

  for (let i = 0; i < threads.length; i += batchSize) {
    const batch = threads.slice(i, i + batchSize);

    const userPrompt = batch
      .map((t, idx) => {
        const conversation = t.comments
          .slice(0, 3)
          .map((c) => `  ${c.author}: ${c.body.slice(0, 150)}`)
          .join("\n");
        return `[${idx + 1}]\nCode: ${t.targetLine}\n${conversation}`;
      })
      .join("\n\n");

    const systemPrompt =
      batch.length === 1
        ? SUMMARIZE_SYSTEM_PROMPT
        : `${SUMMARIZE_SYSTEM_PROMPT}\n\nThere are ${batch.length} threads. Respond with one summary per line, prefixed with the thread number like:\n[1] Summary here\n[2] Summary here`;

    try {
      const response = await completer(systemPrompt, userPrompt);
      const lines = response.split("\n").filter((l) => l.trim());

      if (batch.length === 1) {
        summaries.set(batch[0].threadUrl, lines[0]?.replace(/^\[1\]\s*/, "").trim() || "");
      } else {
        for (const line of lines) {
          const match = line.match(/^\[(\d+)\]\s*(.*)/);
          if (match) {
            const idx = parseInt(match[1], 10) - 1;
            if (idx >= 0 && idx < batch.length) {
              summaries.set(batch[idx].threadUrl, match[2].trim());
            }
          }
        }
        // Fill any missing
        for (const t of batch) {
          if (!summaries.has(t.threadUrl)) {
            summaries.set(t.threadUrl, "");
          }
        }
      }
    } catch {
      for (const t of batch) {
        summaries.set(t.threadUrl, "");
      }
    }

    onProgress?.(Math.min(i + batchSize, threads.length), threads.length);
  }

  return summaries;
}
