#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Trims LRO polling entries from test recordings to prevent playback timeouts.
 *
 * For each recording, this script:
 * 1. Identifies LRO polling sequences (repeated GET requests to the same Azure-AsyncOperation
 *    or Location URL that return 200/202 with "InProgress"/"Running" status)
 * 2. Keeps only the first and last polling entry of each sequence
 * 3. Preserves all non-polling entries (initial PUT/PATCH/DELETE, final results, list/get calls)
 *
 * Usage:
 *   node scripts/trim-recordings.js [recordings-dir]
 *   Default: recordings/node
 */

const fs = require("fs");
const path = require("path");

const recordingsDir = process.argv[2] || path.join(__dirname, "..", "recordings", "node");

function isPollingEntry(entry) {
  if (entry.RequestMethod !== "GET") return false;

  const uri = entry.RequestUri || "";
  // Azure-AsyncOperation polling URLs
  if (uri.includes("/operationStatuses/") || uri.includes("/operationResults/")) return true;
  // Location-based polling (check if it's a status check)
  if (uri.includes("/operations/")) return true;

  // Check response body for in-progress status
  const body = entry.ResponseBody;
  if (body && typeof body === "object") {
    const status = body.status || body.Status || "";
    if (
      typeof status === "string" &&
      (status === "InProgress" ||
        status === "Running" ||
        status === "Accepted" ||
        status === "Updating" ||
        status === "Creating" ||
        status === "Deleting")
    ) {
      return true;
    }
  }

  return false;
}

function trimRecording(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const recording = JSON.parse(raw);

  if (!recording.Entries || !Array.isArray(recording.Entries)) {
    return { trimmed: false, before: 0, after: 0 };
  }

  const entries = recording.Entries;
  const originalCount = entries.length;

  // Group consecutive polling entries by URL (ignoring query parameters)
  const trimmedEntries = [];
  let pollingGroup = [];
  let lastPollingUrl = null;

  function normalizeUrl(url) {
    // Strip query parameters for comparison - polling URLs may have unique SAS tokens
    const qIndex = url.indexOf("?");
    return qIndex >= 0 ? url.substring(0, qIndex).toLowerCase() : url.toLowerCase();
  }

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isPoll = isPollingEntry(entry);

    if (isPoll) {
      const url = normalizeUrl(entry.RequestUri);
      if (lastPollingUrl === url || lastPollingUrl === null) {
        pollingGroup.push(entry);
        lastPollingUrl = url;
      } else {
        // New polling URL - flush old group
        if (pollingGroup.length > 0) {
          flushPollingGroup(pollingGroup, trimmedEntries);
        }
        pollingGroup = [entry];
        lastPollingUrl = url;
      }
    } else {
      // Non-polling entry - flush any accumulated polling group first
      if (pollingGroup.length > 0) {
        flushPollingGroup(pollingGroup, trimmedEntries);
        pollingGroup = [];
        lastPollingUrl = null;
      }
      trimmedEntries.push(entry);
    }
  }

  // Flush any remaining polling group
  if (pollingGroup.length > 0) {
    flushPollingGroup(pollingGroup, trimmedEntries);
  }

  const newCount = trimmedEntries.length;

  if (newCount < originalCount) {
    recording.Entries = trimmedEntries;
    fs.writeFileSync(filePath, JSON.stringify(recording, null, 2), "utf-8");
    return { trimmed: true, before: originalCount, after: newCount };
  }

  return { trimmed: false, before: originalCount, after: originalCount };
}

function flushPollingGroup(group, output) {
  if (group.length <= 1) {
    output.push(...group);
  } else {
    // Keep only the first polling entry but make it return "Succeeded" with 200
    // so the LRO poller completes immediately. The JS test-proxy matches requests
    // by URL, and each polling response contains a unique URL for the next poll.
    // Removing intermediate entries breaks the URL chain, so instead we make the
    // first poll return the terminal status.
    const first = JSON.parse(JSON.stringify(group[0]));
    const last = group[group.length - 1];
    // Copy the terminal status from the last entry
    first.StatusCode = last.StatusCode;
    if (first.ResponseBody && typeof first.ResponseBody === "object" && last.ResponseBody && typeof last.ResponseBody === "object") {
      first.ResponseBody.status = last.ResponseBody.status;
    }
    // Update Content-Length header if present
    const newBody = JSON.stringify(first.ResponseBody);
    if (first.ResponseHeaders && first.ResponseHeaders["Content-Length"]) {
      first.ResponseHeaders["Content-Length"] = String(Buffer.byteLength(newBody, "utf-8"));
    }
    output.push(first);
  }
}

function walkDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Main
console.log(`Trimming recordings in: ${recordingsDir}`);
const files = walkDir(recordingsDir);
console.log(`Found ${files.length} recording file(s)\n`);

let totalTrimmed = 0;
let totalEntriesRemoved = 0;

for (const file of files) {
  const relPath = path.relative(recordingsDir, file);
  const result = trimRecording(file);
  if (result.trimmed) {
    const removed = result.before - result.after;
    totalTrimmed++;
    totalEntriesRemoved += removed;
    console.log(`  TRIMMED: ${relPath} (${result.before} -> ${result.after}, -${removed} entries)`);
  } else {
    console.log(`  OK:      ${relPath} (${result.before} entries, no LRO polling to trim)`);
  }
}

console.log(`\nDone. Trimmed ${totalTrimmed} file(s), removed ${totalEntriesRemoved} total polling entries.`);
