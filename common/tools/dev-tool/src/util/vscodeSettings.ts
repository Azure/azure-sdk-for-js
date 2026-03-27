// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { resolveRoot } from "./resolveProject";
import { createPrinter } from "./printer";

const log = createPrinter("vscode");

async function loadSettings(): Promise<{ path: string; settings: Record<string, unknown> }> {
  const root = await resolveRoot();
  const settingsPath = path.join(root, ".vscode", "settings.json");

  if (!existsSync(settingsPath)) {
    throw new Error("No .vscode/settings.json found at repo root.");
  }

  const content = await readFile(settingsPath, "utf-8");
  return { path: settingsPath, settings: JSON.parse(content) };
}

async function saveSettings(
  settingsPath: string,
  settings: Record<string, unknown>,
): Promise<void> {
  await writeFile(settingsPath, JSON.stringify(settings, null, 2) + "\n", "utf-8");
}

export async function enableRecordingsPanel(): Promise<void> {
  const { path: settingsPath, settings } = await loadSettings();

  const scanRepos: string[] = (settings["git.scanRepositories"] as string[]) ?? [];
  if (!scanRepos.includes(".assets")) {
    scanRepos.push(".assets");
  }
  settings["git.scanRepositories"] = scanRepos;

  const currentDepth = settings["git.repositoryScanMaxDepth"] as number | undefined;
  if (currentDepth === undefined || currentDepth < 2) {
    settings["git.repositoryScanMaxDepth"] = 2;
  }

  await saveSettings(settingsPath, settings);

  log.success("Enabled — asset repos will appear in Source Control.");
  log.info("Reload VS Code window (Ctrl+Shift+P → 'Reload Window') to apply.");
}

export async function disableRecordingsPanel(): Promise<void> {
  const { path: settingsPath, settings } = await loadSettings();

  const scanRepos: string[] = (settings["git.scanRepositories"] as string[]) ?? [];
  const filtered = scanRepos.filter((r) => r !== ".assets");
  if (filtered.length > 0) {
    settings["git.scanRepositories"] = filtered;
  } else {
    delete settings["git.scanRepositories"];
  }

  if (settings["git.repositoryScanMaxDepth"] === 2) {
    delete settings["git.repositoryScanMaxDepth"];
  }

  await saveSettings(settingsPath, settings);

  log.success("Disabled — asset repos hidden from Source Control.");
  log.info("Reload VS Code window (Ctrl+Shift+P → 'Reload Window') to apply.");
}
