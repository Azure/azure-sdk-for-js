// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "dotenv/config";
import Fastify from "fastify";
import { badRequest, notFound } from "@hapi/boom";
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { join } from "node:path";
import { PassThrough, Readable } from "node:stream";
import { authenticateToken, authenticateTeamId } from "./auth.js";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const logger = {
  pretty: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  basic: {
    level: process.env.CACHE_LOG_LEVEL || "info",
  },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pinoPretty: any | undefined = undefined;
try {
  pinoPretty = await import("pino-pretty");
} catch {
  // no-op
}
const fastify = Fastify({
  logger: pinoPretty ? logger.pretty : logger.basic,
  exposeHeadRoutes: false,
  bodyLimit: MAX_FILE_SIZE,
});

fastify.addContentTypeParser(
  "application/octet-stream",
  { parseAs: "buffer", bodyLimit: MAX_FILE_SIZE },
  (_req, body, done) => {
    done(null, body);
  },
);

fastify.addHook("preHandler", authenticateTeamId);

const port = (process.env.AZURE_CACHE_PORT || 3000) as number;
const packageVersion = process.env.PACKAGE_VERSION || "1.0.0";

let containerClient: ContainerClient;

if (process.env.AZURE_CONTAINER_SAS_URL) {
  containerClient = new ContainerClient(process.env.AZURE_CONTAINER_SAS_URL);

  const url = new URL(containerClient.url);
  fastify.log.info(
    { storageAccount: url.host, container: url.pathname },
    "Using Azure Blob Storage back end",
  );
} else {
  const azureStorageAccount = process.env.AZURE_STORAGE_ACCOUNT;
  const azureStorageContainerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
  if (!azureStorageAccount || !azureStorageContainerName) {
    fastify.log.error("Missing Azure Storage account or container name.");
    process.exit(1);
  }

  fastify.log.info(
    { storageAccount: azureStorageAccount, container: azureStorageContainerName },
    "Using Azure Blob Storage back end",
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${azureStorageAccount}.blob.core.windows.net`,
    new DefaultAzureCredential(),
  );

  containerClient = blobServiceClient.getContainerClient(azureStorageContainerName);
}

// GET /v8/artifacts/status
fastify.get("/v8/artifacts/status", async (_request, reply) => {
  return reply.send({ status: "enabled", version: packageVersion });
});

// GET /v8/artifacts/:key
fastify.get("/v8/artifacts/:key", async (request, reply) => {
  const { key } = request.params as { key: string };
  const { teamId, team, slug } = request.query as {
    teamId?: string;
    team?: string;
    slug?: string;
  };
  const teamPath = teamId ?? team ?? slug;

  if (!teamPath) {
    throw badRequest("No team identifier provided");
  }

  const blobName = join(teamPath, key);
  const blobClient = containerClient.getBlobClient(blobName);
  const exists = await blobClient.exists();
  if (!exists) {
    fastify.log.error(`Blob not found: ${blobName}`);
    return reply.status(404).send(`Blob not found: ${blobName}`);
  }

  try {
    const stream = new PassThrough();
    const response = await blobClient.download();
    if (response.readableStreamBody) {
      response.readableStreamBody.pipe(stream);
    }

    reply.header("Content-Type", "application/octet-stream");
    return reply.send(stream);
  } catch (error) {
    fastify.log.error(`Error downloading blob: ${error}`);
    throw notFound(`Blob not found: ${blobName}`);
  }
});

// PUT /v8/artifacts/:key
fastify.put("/v8/artifacts/:key", { preHandler: authenticateToken }, async (request, reply) => {
  const { key } = request.params as { key: string };
  const { teamId, team, slug } = request.query as {
    teamId?: string;
    team?: string;
    slug?: string;
  };
  const teamPath = teamId ?? team ?? slug;

  if (!teamPath) {
    throw badRequest("No team identifier provided");
  }

  // If the request is raw, request.body is a Buffer
  if (!request.body || !(request.body instanceof Buffer)) {
    throw badRequest("No file uploaded or invalid content type");
  }
  const readableStream = Readable.from(request.body);

  const blobPath = join(teamPath, key);
  const blobClient = containerClient.getBlockBlobClient(blobPath);
  await blobClient.uploadStream(readableStream, request.body.length);

  fastify.log.info(`Uploaded blob: ${blobPath}`);

  reply.send({ urls: [`${teamPath}/${key}`] });
});

// HEAD /v8/artifacts/:key
fastify.head("/v8/artifacts/:key", async (request, reply) => {
  const { key } = request.params as { key: string };
  const { teamId, team, slug } = request.query as {
    teamId?: string;
    team?: string;
    slug?: string;
  };
  const teamPath = teamId ?? team ?? slug;

  if (!teamPath) {
    throw badRequest("No team identifier provided");
  }

  const blobPath = join(teamPath, key);
  const blobClient = containerClient.getBlobClient(blobPath);
  const exists = await blobClient.exists();

  if (!exists) {
    fastify.log.info(`Artifact with hash ${key} not found.`);
    throw notFound(`Artifact with hash ${key} not found.`);
  }

  reply.send();
});

// POST /v8/artifacts/events
fastify.post("/v8/artifacts/events", async (request, reply) => {
  const { body } = request as { body: unknown[] };
  const events = body;

  if (!Array.isArray(events)) {
    throw badRequest("Invalid request body. Expected an array of events.");
  }

  // Process events (e.g., log them or store them in a database)
  fastify.log.info({ events }, "Received events:");

  reply.code(200).send({});
});

// POST /v8/artifacts
fastify.post("/v8/artifacts", async (request, reply) => {
  const { teamId, team, slug } = request.query as {
    teamId?: string;
    team?: string;
    slug?: string;
  };
  const teamPath = teamId ?? team ?? slug;
  const { hashes } = request.body as { hashes: string[] };

  if (!teamPath) {
    throw badRequest("No team identifier provided");
  }

  if (!Array.isArray(hashes)) {
    throw badRequest("Invalid request body. Expected an array of hashes.");
  }

  // Query information about the artifacts
  fastify.log.info(`Querying artifacts: ${hashes}.join(", ")}`);

  const jsonResponse: Record<string, { size: number; taskDurationMs: number }> = {};
  for (const hash of hashes) {
    const startTime = performance.now();

    const blobPath = join(teamPath, hash);
    const blobClient = containerClient.getBlobClient(blobPath);
    const exists = await blobClient.exists();
    if (exists) {
      const properties = await blobClient.getProperties();
      const size = properties.contentLength ?? 0;
      const endTime = performance.now();
      const taskDurationMs = endTime - startTime;
      jsonResponse[hash] = { size, taskDurationMs };
    } else {
      const endTime = performance.now();
      const taskDurationMs = endTime - startTime;
      jsonResponse[hash] = { size: 0, taskDurationMs };
    }
  }

  reply.send(jsonResponse);
});

const start = async () => {
  if (!process.env.AZURE_CONTAINER_SAS_URL) {
    await containerClient.createIfNotExists();
  }
  fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      return;
    }
    fastify.log.info(`Server listening at ${address}`);
  });
};

start().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
