#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Fixes update recordings by ensuring they have the correct entry structure.
 *
 * ARM LRO pollers for PATCH operations with both Azure-AsyncOperation and Location
 * headers follow this flow:
 * 1. PATCH → 202 (initial request)
 * 2. GET operationStatuses → Succeeded (poll via Azure-AsyncOperation)
 * 3. GET operationStatuses → Succeeded (follow Location header for final result)
 * 4. GET resource → 200 (final resource GET)
 *
 * After trimming, updates have only: PATCH + GET operationStatuses(Succeeded).
 * This script adds entry 3 (duplicate operationStatuses) and entry 4 (resource GET).
 */

const fs = require("fs");
const path = require("path");

const recordingsDir = path.join(__dirname, "..", "recordings", "node");

// Map of update recording paths to their corresponding GET recording paths
const updateToGetMap = {
  "discovery_arm_client__bookshelves/recording_should_update_a_bookshelf.json":
    "discovery_arm_client__bookshelves/recording_should_get_a_bookshelf.json",
  "discovery_arm_client__storage_containers/recording_should_update_a_storage_container.json":
    "discovery_arm_client__storage_containers/recording_should_get_a_storage_container.json",
  "discovery_arm_client__tools/recording_should_update_a_tool.json":
    "discovery_arm_client__tools/recording_should_get_a_tool.json",
  "discovery_arm_client__storage_assets/recording_should_update_a_storage_asset.json":
    "discovery_arm_client__storage_assets/recording_should_get_a_storage_asset.json",
  "discovery_arm_client__workspaces/recording_should_update_a_workspace.json":
    "discovery_arm_client__workspaces/recording_should_get_a_workspace.json",
};

for (const [updateFile, getFile] of Object.entries(updateToGetMap)) {
  const updatePath = path.join(recordingsDir, updateFile);
  const getPath = path.join(recordingsDir, getFile);

  if (!fs.existsSync(updatePath) || !fs.existsSync(getPath)) {
    console.log(`SKIP: ${updateFile} (file not found)`);
    continue;
  }

  const updateRecording = JSON.parse(fs.readFileSync(updatePath, "utf-8"));
  const getRecording = JSON.parse(fs.readFileSync(getPath, "utf-8"));
  const entries = updateRecording.Entries;
  const oldCount = entries.length;

  // Find the last operationStatuses entry
  let lastOpStatusIdx = -1;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i].RequestUri.includes("operationStatuses")) {
      lastOpStatusIdx = i;
      break;
    }
  }

  if (lastOpStatusIdx < 0) {
    console.log(`SKIP: ${updateFile} (no operationStatuses entry found)`);
    continue;
  }

  // Current state after trimming: [PATCH, poll(Succeeded), resourceGET]
  // Target state: [PATCH, poll(Succeeded), locationFollow(Succeeded), resourceGET]
  // The poller follows Azure-AsyncOperation for polling, then Location for final result
  const newEntries = [];
  const patchEntry = entries[0];
  newEntries.push(patchEntry);

  // Find the operationStatuses entry (should be entry 1)
  const pollEntry = entries.find((e) => e.RequestUri.includes("operationStatuses"));
  if (!pollEntry) {
    console.log(`SKIP: ${updateFile} (no operationStatuses entry found)`);
    continue;
  }
  newEntries.push(pollEntry);

  // Create the Location-follow entry
  const patchHeaders = patchEntry.ResponseHeaders;
  const locationUrl = patchHeaders["Location"];
  const asyncOpUrl = patchHeaders["Azure-AsyncOperation"];

  if (locationUrl && asyncOpUrl && locationUrl !== asyncOpUrl) {
    // Different URLs: create entry with Location URL
    const locationEntry = JSON.parse(JSON.stringify(pollEntry));
    const locPath = locationUrl.replace(/^https:\/\/[^/]+/, "");
    const recordHost =
      pollEntry.RequestUri.match(/^https:\/\/[^/]+/)?.[0] || "https://Sanitized.azure.com";
    locationEntry.RequestUri = recordHost + locPath;
    newEntries.push(locationEntry);
  } else {
    // Same URL or no Location: duplicate the poll entry
    newEntries.push(JSON.parse(JSON.stringify(pollEntry)));
  }

  // Add the resource GET entry (should be the last non-operationStatuses entry)
  const resourceGet = entries.find(
    (e) => e.RequestMethod === "GET" && !e.RequestUri.includes("operationStatuses"),
  );
  if (resourceGet) {
    newEntries.push(resourceGet);
  } else {
    // Fall back to GET recording
    const getEntry = getRecording.Entries[0];
    if (getEntry && getEntry.RequestMethod === "GET") {
      newEntries.push(JSON.parse(JSON.stringify(getEntry)));
    }
  }

  updateRecording.Entries = newEntries;
  fs.writeFileSync(updatePath, JSON.stringify(updateRecording, null, 2), "utf-8");
  console.log(`FIXED: ${updateFile} (${oldCount} -> ${newEntries.length} entries)`);
}

console.log("\nDone.");
