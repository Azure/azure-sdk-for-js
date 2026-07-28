// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Shared helpers used by the CLI command modules.
 *
 * - buildClient(): creates a ContentUnderstandingClient using credentials from
 *   environment variables (CONTENTUNDERSTANDING_ENDPOINT / CONTENTUNDERSTANDING_KEY,
 *   or `az login` via DefaultAzureCredential with ManagedIdentity / Workload
 *   identity excluded to avoid the slow IMDS probe on dev boxes).
 * - capturedAnalyzeBinary() / capturedCreateAnalyzer(): wrap the typed SDK
 *   methods with a pipeline policy that captures the raw service JSON so we
 *   can write on-disk output in the same shape as the Python and .NET skills
 *   (valueString / valueNumber / ... rather than the SDK's deserialised
 *   typed model). The LRO envelope `{id,status,result,usage}` is unwrapped
 *   to match `poller.pollUntilDone()` semantics in Python and .NET.
 * - guessContentType(): file-extension lookup for the analyzeBinary contentType.
 * - readEnv(): trim one layer of surrounding quotes (dotenv strips them but
 *   raw `export` from a shell does not).
 * - enumerateInputs(): single-file or folder-of-files enumeration with the
 *   same supported extension list as Python.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import {
  ChainedTokenCredential,
  AzureCliCredential,
  EnvironmentCredential,
  type TokenCredential,
} from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient } from "@azure/ai-content-understanding";
import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const SUPPORTED_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".tif",
  ".tiff",
  ".bmp",
  ".heif",
  ".heic",
  ".wav",
  ".mp3",
  ".m4a",
  ".mp4",
  ".mov",
]);

/**
 * Reads an env var and strips one layer of surrounding single or double
 * quotes — dotenv strips them by default but raw `export` from a shell does
 * not, so users who source .env manually still get a clean value.
 */
export function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return value;
  }
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.substring(1, value.length - 1);
  }
  return value;
}

export function buildClient(): ContentUnderstandingClient {
  let endpoint = readEnv("CONTENTUNDERSTANDING_ENDPOINT");
  if (!endpoint || endpoint.trim() === "") {
    throw new Error(
      "CONTENTUNDERSTANDING_ENDPOINT is not set. Configure your .env file (see cu-sdk-setup).",
    );
  }
  // Strip trailing slash to match the convention from samples — avoids
  // double-slash URLs when the env var was copy-pasted from the portal.
  while (endpoint.endsWith("/")) {
    endpoint = endpoint.substring(0, endpoint.length - 1);
  }

  const key = readEnv("CONTENTUNDERSTANDING_KEY");
  if (key && key.trim() !== "") {
    return new ContentUnderstandingClient(endpoint, new AzureKeyCredential(key));
  }
  // Build a focused chain: Environment first (CI), then Azure CLI (dev
  // boxes). DefaultAzureCredential would probe IMDS first and block for
  // ~30 s on WSL / laptops before falling through.
  const credential: TokenCredential = new ChainedTokenCredential(
    new EnvironmentCredential(),
    new AzureCliCredential(),
  );
  return new ContentUnderstandingClient(endpoint, credential);
}

/**
 * Wraps `client.analyzeBinary(...)` in a pipeline policy that captures the
 * raw service response, then unwraps the LRO envelope so the returned object
 * matches the Python / .NET on-disk shape (`{analyzerId, contents: [...]}`).
 */
export async function capturedAnalyzeBinary(
  client: ContentUnderstandingClient,
  analyzerId: string,
  bytes: Uint8Array,
  contentType: string,
): Promise<Record<string, unknown>> {
  let rawResponse: PipelineResponse | undefined;
  const capturePolicy: PipelinePolicy = {
    name: "cuSkillCaptureRawResponse",
    async sendRequest(req: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const res = await next(req);
      // Only keep the final LRO status response — its body is what we want
      // for the on-disk shape. The submission response (202) has an empty
      // body, so this filter keeps things simple.
      if (res.bodyAsText && res.bodyAsText.length > 0) {
        rawResponse = res;
      }
      return res;
    },
  };
  client.pipeline.addPolicy(capturePolicy);
  try {
    const poller = client.analyzeBinary(analyzerId, bytes, contentType);
    await poller.pollUntilDone();
  } finally {
    client.pipeline.removePolicy({ name: "cuSkillCaptureRawResponse" });
  }

  if (!rawResponse || !rawResponse.bodyAsText) {
    throw new Error("analyzeBinary completed but no raw response body was captured");
  }
  const envelope = JSON.parse(rawResponse.bodyAsText);
  // Unwrap `{id, status, result, usage}` so callers see just the analysis
  // result. Matches Python's `poller.result()` and .NET's `op.result`.
  if (
    envelope !== null &&
    typeof envelope === "object" &&
    !Array.isArray(envelope) &&
    "result" in envelope &&
    typeof envelope["result"] === "object" &&
    envelope["result"] !== null
  ) {
    return envelope["result"] as Record<string, unknown>;
  }
  return envelope as Record<string, unknown>;
}

/**
 * Create an analyzer using a raw JSON schema. The typed SDK signature only
 * accepts `ContentAnalyzer`, but we want to pass whatever the user put in
 * their schema file (including custom properties that may not be in the
 * model).
 *
 * The JS SDK's serializer has a small wire-format quirk for nested field
 * definitions: it reads `itemDefinition` and writes `items` (the wire shape
 * we want). Our raw JSON already uses the wire shape (`items` directly), so
 * we pre-translate to the typed shape before handing the schema off — that
 * way the serializer doesn't strip the `items` body when it builds the PUT.
 * Mirrors the way Python's typed sdk requires no remapping because Python's
 * model is permissive. Same translation applies to `$ref` → `ref`.
 */
export async function createAnalyzerRaw(
  client: ContentUnderstandingClient,
  analyzerId: string,
  schema: Record<string, unknown>,
): Promise<void> {
  const adapted = translateForJsSerializer(schema);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const poller = client.createAnalyzer(analyzerId, adapted as any);
  await poller.pollUntilDone();
}

/**
 * Recursively rename wire-format keys that the JS typed model serializer
 * expects under different names:
 *   - `items` → `itemDefinition` — but ONLY on field-descriptor objects
 *     (siblings of `"type": "array"`), NOT on arbitrary map keys. Users
 *     may legitimately name a field literally "items" (very common for
 *     line-item arrays) and that key must be preserved.
 *   - `$ref`  → `ref` — likewise only on field descriptors.
 *
 * A field descriptor is any object that has a `type` string property. The
 * children of `fieldSchema.fields`, `properties`, and (renamed)
 * `itemDefinition.properties` are keyed by user-chosen field names and must
 * not be renamed.
 */
function translateForJsSerializer(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(translateForJsSerializer);
  }
  if (value && typeof value === "object") {
    const src = value as Record<string, unknown>;
    const isFieldDescriptor = typeof src["type"] === "string";
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(src)) {
      let key = k;
      if (isFieldDescriptor) {
        if (k === "items") {
          key = "itemDefinition";
        } else if (k === "$ref") {
          key = "ref";
        }
      }
      out[key] = translateForJsSerializer(v);
    }
    return out;
  }
  return value;
}

// Exported for unit testing. The public entry point is the internal
// `createAnalyzer` above; this is exposed only so tests can assert the
// key-renaming rules without needing to mock the Azure client.
export const _translateForJsSerializer = translateForJsSerializer;

export function guessContentType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".tif":
    case ".tiff":
      return "image/tiff";
    case ".bmp":
      return "image/bmp";
    case ".heif":
    case ".heic":
      return "image/heif";
    case ".wav":
      return "audio/wav";
    case ".mp3":
      return "audio/mpeg";
    case ".m4a":
      return "audio/mp4";
    case ".mp4":
      return "video/mp4";
    case ".mov":
      return "video/quicktime";
    default:
      return "application/octet-stream";
  }
}

export function enumerateInputs(inputPath: string): string[] {
  if (!existsSync(inputPath)) {
    return [];
  }
  const stats = statSync(inputPath);
  if (stats.isFile()) {
    return [inputPath];
  }
  if (stats.isDirectory()) {
    return readdirSync(inputPath)
      .map((name) => join(inputPath, name))
      .filter((p) => statSync(p).isFile())
      .filter((p) => SUPPORTED_EXTENSIONS.has(extname(p).toLowerCase()))
      .sort();
  }
  return [];
}

export function stripExtension(name: string): string {
  const ext = extname(name);
  return ext ? name.substring(0, name.length - ext.length) : name;
}

export function readFileBytes(filePath: string): Uint8Array {
  return new Uint8Array(readFileSync(filePath));
}
