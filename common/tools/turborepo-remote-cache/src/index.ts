// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import express from "express";
import process from "node:process";
import { Readable } from "node:stream";
import { createAzureStorageClient } from "./storage.js";
import { performance } from "node:perf_hooks";
import { authenticateTeamId, authenticateToken } from "./auth.js";
import { createClientLogger } from "./util/logger.js";

const logger = createClientLogger("turbo-cache");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.raw({ type: "*/*", limit: "50mb" }));
app.use("/v8/artifacts", authenticateToken);
app.use("/v8/artifacts", authenticateTeamId);

const port = process.env.AZURE_CACHE_PORT || 3000;
const azureStorageAccount = process.env.AZURE_STORAGE_ACCOUNT;
const azureStorageContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const packageVersion = process.env.PACKAGE_VERSION || "1.0.0";

if (!azureStorageAccount || !azureStorageContainerName) {
  logger.error("Missing Azure Storage account or container name.");
  process.exit(1);
}
const azureStorageClient = await createAzureStorageClient({
  containerName: azureStorageContainerName,
  account: azureStorageAccount,
});

// POST /v8/artifacts/events
app.post("/v8/artifacts/events", (req, res) => {
  const events = req.body;

  if (!Array.isArray(events)) {
    const errorMessage = "Invalid request body. Expected an array of events.";
    logger.error(errorMessage);
    res.status(400).send(errorMessage);
    return;
  }

  // Process events (e.g., log them or store them in a database)
  logger.info("Received events:", events);

  res.status(200).send({});
});

// GET /v8/artifacts/status
app.get("/v8/artifacts/status", (_req, res) => {
  res.status(200).json({ status: "enabled", version: packageVersion });
});

// PUT /v8/artifacts/:hash
app.put("/v8/artifacts/:hash", async (req, res) => {
  const { hash } = req.params;
  const team = req.query.teamId ?? req.query.team ?? req.query.slug;

  logger.info(`Uploading artifact with hash: ${hash}`);

  if (!req.body) {
    logger.warning("No body found in the request.");
    res.status(202).json({
      urls: [[`${team}/${hash}`]],
    });
    return;
  }

  const bodyStream = Readable.from(req.body);
  const writeStream = await azureStorageClient.createWriteStream(team as string, hash);
  bodyStream.pipe(writeStream);
  writeStream.on("error", (err) => {
    logger.error("Error writing artifact:", err);
    res.status(500).send("Error writing artifact.");
  });
  writeStream.on("finish", () => {
    logger.info(`Artifact uploaded with hash: ${hash}`);
    res.status(202).json({
      urls: [[`${team}/${hash}`]],
    });
  });
  writeStream.on("close", () => {
    logger.info(`Artifact upload completed with hash: ${hash}`);
  });
});

// GET /v8/artifacts/:hash
app.get("/v8/artifacts/:hash", async (req, res) => {
  const { hash } = req.params;
  const team = req.query.teamId ?? req.query.team ?? req.query.slug;

  // Check if the artifact exists
  logger.info(`Checking existence of artifact with hash: ${hash}`);

  const exists = await azureStorageClient.exists(team as string, hash);
  if (!exists) {
    logger.info(`Artifact with hash ${hash} not found.`);
    res.status(404).send("Artifact not found.");
    return;
  }
  const stream = await azureStorageClient.createReadStream(team as string, hash);

  // Set headers for binary stream
  res.setHeader("Content-Type", "application/octet-stream");

  stream.on("error", (err) => {
    logger.error("Error streaming artifact:", err);
    res.status(500).send("Error streaming artifact.");
  });

  stream.pipe(res);
});

// HEAD /v8/artifacts/:hash
app.head("/v8/artifacts/:hash", async (req, res) => {
  const { hash } = req.params;
  const team = req.query.teamId ?? req.query.team ?? req.query.slug;

  // Check if the artifact exists
  logger.info(`Checking existence of artifact with hash: ${hash}`);
  const exists = await azureStorageClient.exists(team as string, hash);
  if (!exists) {
    logger.info(`Artifact with hash ${hash} not found.`);
    res.status(404).send("Artifact not found.");
    return;
  }

  res.status(200).end();
});

// POST /v8/artifacts
app.post("/v8/artifacts", async (req, res) => {
  const { hashes } = req.body;
  const team = req.query.teamId ?? req.query.team ?? req.query.slug;

  if (!Array.isArray(hashes)) {
    logger.error("Invalid request body. Expected an array of hashes.");
    res.status(400).send("Invalid request body. Expected an array of hashes.");
    return;
  }

  // Query information about the artifacts
  logger.info("Querying artifacts:", hashes);

  const jsonResponse: Record<string, { size: number; taskDurationMs: number }> = {};
  for (const hash of hashes) {
    const startTime = performance.now();

    const exists = await azureStorageClient.exists(team as string, hash);
    if (exists) {
      const size = (await azureStorageClient.contentLength(team as string, hash)) ?? 0;
      const endTime = performance.now();
      const taskDurationMs = endTime - startTime;
      jsonResponse[hash] = { size, taskDurationMs };
    } else {
      const endTime = performance.now();
      const taskDurationMs = endTime - startTime;
      jsonResponse[hash] = { size: 0, taskDurationMs };
    }
  }

  res.status(200).json(jsonResponse);
});

app.listen(port, () => {
  logger.info(`Express is listening on ${port}`);
});
