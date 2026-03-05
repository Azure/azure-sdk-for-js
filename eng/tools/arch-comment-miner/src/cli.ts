// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { discoverPRs } from "./discover-prs.ts";
import { fetchComments, type GraphQLExecutor } from "./fetch-comments.ts";
import { enrichThread } from "./enrich-context.ts";
import { renderMarkdown } from "./render-markdown.ts";
import { renderJsonl } from "./render-jsonl.ts";
import { createLocalEmbedder, embedThreads } from "./embed.ts";
import { clusterThreads } from "./cluster.ts";
import { dedup } from "./dedup.ts";
import { labelClusters, createGitHubModelsCompleter, extractThreadRules } from "./label.ts";
import { loadConfig, mergeConfig, type MineConfig } from "./config.ts";
import type { EnrichedThread, AnalyzedThread, ClusterInfo } from "./types.ts";

const execFileAsync = promisify(execFile);

// ── mine subcommand ─────────────────────────────────────────────────

interface MineCliArgs {
  config?: string;
  since?: string;
  until?: string;
  repo?: string;
  output?: string;
}

function parseMineCliArgs(argv: string[]): MineCliArgs {
  const args: MineCliArgs = {};
  const positional: string[] = [];

  for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--config" && argv[i + 1]) {
      args.config = argv[++i];
    } else if (arg === "--since" && argv[i + 1]) {
      args.since = argv[++i];
    } else if (arg === "--until" && argv[i + 1]) {
      args.until = argv[++i];
    } else if (arg === "--output" && argv[i + 1]) {
      args.output = argv[++i];
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  if (positional[0]) {
    args.repo = positional[0];
  }

  return args;
}

async function resolveMineConfig(cliArgs: MineCliArgs): Promise<MineConfig> {
  const raw = cliArgs.config ? await loadConfig(cliArgs.config) : undefined;
  const config = mergeConfig(raw, {
    repo: cliArgs.repo,
    since: cliArgs.since,
    until: cliArgs.until,
    output: cliArgs.output,
  });

  if (!config.repo || !config.since) {
    console.error(
      "Usage: arch-comment-miner mine [<owner/repo>] --since YYYY-MM-DD [--until YYYY-MM-DD] [--output name] [--config config.yaml]",
    );
    console.error("\nRequired: repo and since (via CLI args or config file)");
    process.exit(1);
  }

  return config;
}

function createGhExecutor(): GraphQLExecutor {
  return async (query: string): Promise<Record<string, unknown>> => {
    const { stdout } = await execFileAsync("gh", ["api", "graphql", "-f", `query=${query}`], {
      maxBuffer: 50 * 1024 * 1024,
    });
    return JSON.parse(stdout) as Record<string, unknown>;
  };
}

async function runMine(): Promise<void> {
  const cliArgs = parseMineCliArgs(process.argv);
  const config = await resolveMineConfig(cliArgs);

  const [owner, repo] = config.repo.split("/");
  if (!owner || !repo) {
    console.error("Repository must be in owner/repo format (e.g. Azure/azure-sdk-for-js)");
    process.exit(1);
  }

  console.log(`Mining review comments from ${config.repo} (${config.since} to ${config.until})...`);
  if (config.filters.files.length > 0) {
    console.log(`  File filters: ${config.filters.files.join(", ")}`);
  }
  if (config.filters.authors.length > 0) {
    console.log(`  Authors: ${config.filters.authors.join(", ")}`);
  }
  if (config.filters.ignoreAuthors.length > 0) {
    console.log(`  Ignoring: ${config.filters.ignoreAuthors.join(", ")}`);
  }

  console.log("Discovering PRs...");
  const prNumbers = await discoverPRs(owner, repo, config.since, config.until);
  console.log(`Found ${prNumbers.length} PRs.`);

  if (prNumbers.length === 0) {
    console.log("No PRs found. Exiting.");
    return;
  }

  console.log("Fetching review threads from GitHub...");
  const executor = createGhExecutor();
  const threads = await fetchComments(prNumbers, owner, repo, executor, {
    filters: config.filters,
    onProgress: (done, total) => {
      process.stdout.write(`\r  ${done}/${total} PRs processed`);
    },
  });
  console.log(`\nCollected ${threads.length} review threads.`);

  console.log("Enriching context...");
  const enriched = threads.map(enrichThread);

  const mdPath = resolve(config.output + ".md");
  const jsonlPath = resolve(config.output + ".jsonl");

  await writeFile(mdPath, renderMarkdown(enriched, config.since, config.until), "utf-8");
  await writeFile(jsonlPath, renderJsonl(enriched), "utf-8");

  console.log(`\nDone!`);
  console.log(`  Markdown: ${mdPath}`);
  console.log(`  JSONL:    ${jsonlPath}`);
  console.log(`  ${enriched.length} threads across ${new Set(enriched.map((t) => t.pr)).size} PRs`);
}

// ── analyze subcommand ──────────────────────────────────────────────

interface AnalyzeArgs {
  input: string;
  output: string;
  maxDistance: number;
  recoveryDistance: number;
  threshold: number;
  model: string;
}

function parseAnalyzeArgs(argv: string[]): AnalyzeArgs {
  let output = "";
  let maxDistance = 0.55;
  let recoveryDistance = 0.70;
  let threshold = 0.92;
  let model = "Xenova/all-MiniLM-L6-v2";
  const positional: string[] = [];

  for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--output" && argv[i + 1]) {
      output = argv[++i];
    } else if (arg === "--max-distance" && argv[i + 1]) {
      maxDistance = parseFloat(argv[++i]);
    } else if (arg === "--recovery-distance" && argv[i + 1]) {
      recoveryDistance = parseFloat(argv[++i]);
    } else if (arg === "--threshold" && argv[i + 1]) {
      threshold = parseFloat(argv[++i]);
    } else if (arg === "--model" && argv[i + 1]) {
      model = argv[++i];
    } else if (!arg.startsWith("-")) {
      positional.push(arg);
    }
  }

  const input = positional[0];
  if (!input) {
    console.error(
      "Usage: arch-comment-miner analyze <input.jsonl> [--output name] [--max-distance 0.35] [--recovery-distance 0.45] [--threshold 0.92] [--model Xenova/all-MiniLM-L6-v2]",
    );
    process.exit(1);
  }

  if (!output) {
    output = input.replace(/\.jsonl$/, "") + "-analyzed";
  }

  return { input, output, maxDistance, recoveryDistance, threshold, model };
}

function loadJsonl(content: string): EnrichedThread[] {
  return content
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line) as EnrichedThread);
}

function renderAnalyzedJsonl(threads: AnalyzedThread[]): string {
  return threads.map((t) => JSON.stringify(t)).join("\n");
}

function renderAnalyzedMarkdown(
  threads: AnalyzedThread[],
  clusterInfos: Map<number, ClusterInfo>,
): string {
  const lines: string[] = [];

  lines.push("# Architecture Review Feedback — Analysis");
  lines.push("");
  lines.push(`**${threads.length} threads**, **${clusterInfos.size} clusters**`);
  const dupeCount = threads.filter((t) => t.isDuplicateOf !== null).length;
  if (dupeCount > 0) {
    lines.push(`(**${dupeCount}** near-duplicates flagged)`);
  }
  lines.push("");

  // Cluster summary table — pick most common rule per cluster
  lines.push("## Clusters");
  lines.push("");
  lines.push("| # | Label | Size | Top Rule |");
  lines.push("|---|-------|------|----------|");

  const sorted = [...clusterInfos.values()].sort((a, b) => b.size - a.size);
  for (const info of sorted) {
    const idStr = info.id === -1 ? "—" : String(info.id);
    const clusterRules = threads
      .filter((t) => t.clusterId === info.id && t.threadRule)
      .map((t) => t.threadRule);
    // Find the most frequent rule
    const freq = new Map<string, number>();
    for (const r of clusterRules) {
      freq.set(r, (freq.get(r) ?? 0) + 1);
    }
    const topRule = [...freq.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    lines.push(`| ${idStr} | ${info.label} | ${info.size} | ${topRule} |`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  // Threads grouped by cluster
  for (const info of sorted) {
    lines.push(`## ${info.label} (${info.size} threads)`);
    lines.push("");

    const clusterThreads = threads
      .filter((t) => t.clusterId === info.id)
      .sort((a, b) => a.pr - b.pr);

    lines.push("| PR | Rule | Status | Link |");
    lines.push("|---:|------|--------|------|");
    for (const thread of clusterThreads) {
      const dupeTag = thread.isDuplicateOf ? " *(dup)*" : "";
      const rule = thread.threadRule || "—";
      const status = thread.isResolved ? "✅" : "⏳";
      lines.push(
        `| #${thread.pr}${dupeTag} | ${rule} | ${status} | [Thread](${thread.threadUrl}) |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

async function runAnalyze(): Promise<void> {
  const { input, output, maxDistance, recoveryDistance, threshold, model } = parseAnalyzeArgs(process.argv);

  console.log(`Analyzing ${input}...`);

  // Step 1: Load
  const content = await readFile(resolve(input), "utf-8");
  const threads = loadJsonl(content);
  console.log(`Loaded ${threads.length} threads.`);

  if (threads.length === 0) {
    console.log("No threads to analyze. Exiting.");
    return;
  }

  // Step 2: Embed
  console.log(`Loading embedding model (${model})...`);
  const embedder = await createLocalEmbedder(model);
  console.log("Computing embeddings...");
  const embeddings = await embedThreads(threads, embedder, (done, total) => {
    process.stdout.write(`\r  ${done}/${total} threads embedded`);
  });
  console.log("");

  // Step 3: Cluster (HAC with noise recovery)
  console.log(`Clustering (maxDistance=${maxDistance}, recovery=${recoveryDistance})...`);
  const { assignments, clusterCount } = clusterThreads(embeddings, maxDistance, 2, recoveryDistance);
  const noiseCount = [...assignments.values()].filter((v) => v === -1).length;
  console.log(`Found ${clusterCount} clusters (${noiseCount} unclustered).`);

  // Step 4: Dedup
  console.log(`Deduplicating (threshold=${threshold})...`);
  const { duplicates } = dedup(threads, embeddings, assignments, threshold);
  const dupeCount = [...duplicates.values()].filter((v) => v !== null).length;
  console.log(`Found ${dupeCount} near-duplicates.`);

  // Step 5: Label clusters
  console.log("Labeling clusters via GitHub Models...");
  const completer = await createGitHubModelsCompleter();
  const clusterInfos = await labelClusters(assignments, threads, clusterCount, completer, (done, total) => {
    process.stdout.write(`\r  ${done}/${total} clusters labeled`);
  });
  console.log("");

  // Step 6: Summarize individual threads
  console.log("Extracting thread rules...");
  const threadRules = await extractThreadRules(threads, completer, (done, total) => {
    process.stdout.write(`\r  ${done}/${total} thread rules extracted`);
  });
  console.log("");

  // Step 7: Assemble analyzed threads
  const analyzed: AnalyzedThread[] = threads.map((thread) => {
    const clusterId = assignments.get(thread.threadUrl) ?? -1;
    const info = clusterInfos.get(clusterId);
    return {
      ...thread,
      clusterId,
      clusterLabel: info?.label ?? "Unclustered",
      isDuplicateOf: duplicates.get(thread.threadUrl) ?? null,
      threadRule: threadRules.get(thread.threadUrl) ?? "",
    };
  });

  // Step 7: Write outputs
  const jsonlPath = resolve(output + ".jsonl");
  const mdPath = resolve(output + ".md");

  await writeFile(jsonlPath, renderAnalyzedJsonl(analyzed), "utf-8");
  await writeFile(mdPath, renderAnalyzedMarkdown(analyzed, clusterInfos), "utf-8");

  console.log(`\nDone!`);
  console.log(`  JSONL:    ${jsonlPath}`);
  console.log(`  Markdown: ${mdPath}`);
  console.log(`  ${analyzed.length} threads, ${clusterCount} clusters, ${dupeCount} duplicates`);
}

// ── main dispatch ───────────────────────────────────────────────────

const USAGE = `Usage: arch-comment-miner <command>

Commands:
  mine     Mine review comments from GitHub PRs
  analyze  Cluster, dedup, and label mined threads

Run 'arch-comment-miner <command>' for command-specific help.`;

async function main(): Promise<void> {
  const command = process.argv[2];

  switch (command) {
    case "mine":
      return runMine();
    case "analyze":
      return runAnalyze();
    default:
      console.error(USAGE);
      process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
