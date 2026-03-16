/**
 * Trim LRO polling recordings for the Discovery ARM SDK.
 *
 * LRO operations (create workspace, supercomputer, etc.) can generate hundreds
 * of identical polling GET responses during recording. This bloats the recording
 * files and causes CI playback to time out.
 *
 * This script:
 *   1. Backs up recordings to recordings-backup/
 *   2. Strips duplicate intermediate polling responses, keeping only the first
 *      and last of each consecutive polling run
 *   3. Writes the trimmed recordings in place
 *
 * Usage:
 *   node trim-recordings.mjs [--dry-run]
 */

import * as fs from "node:fs";
import * as path from "node:path";

const RECORDINGS_DIR = path.resolve(
  import.meta.dirname ?? ".",
  "recordings",
);
const BACKUP_DIR = path.resolve(
  import.meta.dirname ?? ".",
  "recordings-backup",
);

const dryRun = process.argv.includes("--dry-run");

/** ARM LRO provisioning states that indicate polling is still in progress */
const IN_PROGRESS_STATES = new Set([
  "InProgress",
  "Accepted",
  "Creating",
  "Updating",
  "Deleting",
  "Running",
  "Provisioning",
]);

/**
 * Extract the provisioning state from a response body string.
 * ARM uses either properties.provisioningState or status.
 */
function getProvisioningState(responseBody) {
  if (!responseBody || typeof responseBody !== "string") return null;
  try {
    const body = JSON.parse(responseBody);
    return (
      body?.properties?.provisioningState ??
      body?.status ??
      null
    );
  } catch {
    // Might be encoded or non-JSON
    const match = responseBody.match(
      /provisioningState["\s:]+["']?(\w+)["']?/i,
    );
    return match ? match[1] : null;
  }
}

/**
 * Determine if two entries are consecutive polls to the same LRO endpoint.
 * They share the same HTTP method (GET) and URI (ignoring query-string timestamp).
 */
function isSamePollingRequest(a, b) {
  if (!a || !b) return false;
  if (a.RequestMethod !== "GET" || b.RequestMethod !== "GET") return false;
  // Normalise URI by stripping transient query params
  const normalise = (uri) => (uri ?? "").split("?")[0];
  return normalise(a.RequestUri) === normalise(b.RequestUri);
}

/**
 * Trim a single recording's Entries array.
 * Returns { trimmed: Entries[], removed: number }.
 */
function trimEntries(entries) {
  const result = [];
  let removed = 0;
  let i = 0;

  while (i < entries.length) {
    const entry = entries[i];

    // If this isn't a GET or doesn't look like LRO polling, keep it
    if (entry.RequestMethod !== "GET") {
      result.push(entry);
      i++;
      continue;
    }

    const state = getProvisioningState(entry.ResponseBody);
    if (!state || !IN_PROGRESS_STATES.has(state)) {
      result.push(entry);
      i++;
      continue;
    }

    // We're in a polling run — collect all consecutive identical polls
    const runStart = i;
    let runEnd = i;
    while (
      runEnd + 1 < entries.length &&
      isSamePollingRequest(entries[runEnd], entries[runEnd + 1])
    ) {
      const nextState = getProvisioningState(entries[runEnd + 1].ResponseBody);
      if (nextState && IN_PROGRESS_STATES.has(nextState)) {
        runEnd++;
      } else {
        break;
      }
    }

    if (runEnd > runStart) {
      // Keep only the first and last entry of the polling run
      result.push(entries[runStart]);
      result.push(entries[runEnd]);
      removed += runEnd - runStart - 1;
    } else {
      result.push(entries[runStart]);
    }

    i = runEnd + 1;
  }

  return { trimmed: result, removed };
}

/**
 * Copy a directory recursively.
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** Recursively find all JSON files in a directory. */
function findJsonFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(full));
    } else if (entry.name.endsWith(".json")) {
      files.push(full);
    }
  }
  return files;
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!fs.existsSync(RECORDINGS_DIR)) {
  console.log("No recordings directory found. Nothing to trim.");
  process.exit(0);
}

// Step 1: backup
if (!fs.existsSync(BACKUP_DIR)) {
  console.log(`Backing up recordings to ${BACKUP_DIR} ...`);
  if (!dryRun) {
    copyDirSync(RECORDINGS_DIR, BACKUP_DIR);
  }
  console.log("Backup complete.");
} else {
  console.log("Backup directory already exists — skipping backup.");
}

// Step 2: trim
const files = findJsonFiles(RECORDINGS_DIR);
let totalRemoved = 0;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf-8");
  let recording;
  try {
    recording = JSON.parse(raw);
  } catch {
    console.log(`  Skipping non-JSON: ${path.relative(RECORDINGS_DIR, file)}`);
    continue;
  }

  if (!Array.isArray(recording.Entries)) {
    continue;
  }

  const { trimmed, removed } = trimEntries(recording.Entries);

  if (removed > 0) {
    const relPath = path.relative(RECORDINGS_DIR, file);
    console.log(
      `  ${relPath}: ${recording.Entries.length} → ${trimmed.length} entries (removed ${removed} polling responses)`,
    );
    totalRemoved += removed;

    if (!dryRun) {
      recording.Entries = trimmed;
      fs.writeFileSync(file, JSON.stringify(recording, null, 2), "utf-8");
    }
  }
}

console.log(`\nDone. Total polling responses removed: ${totalRemoved}`);
if (dryRun) {
  console.log("(dry run — no files were modified)");
}
