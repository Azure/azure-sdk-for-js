// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, SanitizerOptions, TestInfo } from "@azure-tools/test-recorder";
import {
  Recorder,
  assertEnvironmentVariable,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import type { TokenCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { BookshelfClient, WorkspaceClient } from "../../../src/index.js";

/**
 * Sanitized values substituted for the real environment. During recording the
 * recorder replaces the real environment values with these; during playback it
 * sets these so the recorded requests/responses resolve.
 */
const envSetupForPlayback: Record<string, string> = {
  AZURE_DISCOVERY_WORKSPACE_ENDPOINT: "https://test-wkspc.workspace.discovery.azure.com",
  AZURE_DISCOVERY_BOOKSHELF_ENDPOINT: "https://test-bkshlf.bookshelf.discovery.azure.com",
  AZURE_DISCOVERY_PROJECT_NAME: "test-project",
  AZURE_DISCOVERY_INVESTIGATION_NAME: "test-invst",
  KNOWLEDGE_BASE_NAME: "test-kb",
  KNOWLEDGE_BASE_VERSION: "v1",
  KNOWLEDGE_BASE_DESCRIPTION:
    "Use this tool to query information about immersion cooling systems or liquid cooling technologies.",
  KNOWLEDGE_BASE_COPILOT_INSTRUCTION:
    "Use this tool to query information about immersion cooling systems or liquid cooling technologies.",
  // NOTE: AGENT_NAME is intentionally NOT listed here. Its real value ("Discovery")
  // is a substring of "Microsoft.Discovery", and envSetupForPlayback performs a
  // global string replace during recording, which would corrupt every resource id.
  // Use the agentName() helper below instead; the central "$..id"/"$..createdBy"
  // sanitizers already scrub the agent value in bodies.
  STORAGE_ASSET_ID:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Discovery/storagecontainers/test-storage/storageAssets/test-sa",
  USER_ASSIGNED_IDENTITY:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-mi",
  TOOL_ID:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Discovery/tools/testtool",
  NODE_POOL_ID:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Discovery/supercomputers/test-sc/nodePools/nodepool1",
  PROJECT_ARM_ID:
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Discovery/workspaces/test-wkspc/projects/test-project",
};

// Sanitizers scrub sensitive values (endpoints, GUIDs, credentials) from the
// recorded requests and responses.
const sanitizerOptions: SanitizerOptions = {
  generalSanitizers: [
    // Any GUID (subscription ids, request ids, etc.) -> zeroed GUID.
    {
      regex: true,
      target: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
      value: "00000000-0000-0000-0000-000000000000",
    },
    // Any workspace endpoint host -> sanitized workspace host.
    {
      regex: true,
      target: "https://[a-zA-Z0-9-]+\\.workspace[a-zA-Z0-9-]*\\.discovery\\.azure\\.com",
      value: "https://test-wkspc.workspace.discovery.azure.com",
    },
    // Any bookshelf endpoint host -> sanitized bookshelf host.
    {
      regex: true,
      target: "https://[a-zA-Z0-9-]+\\.bookshelf[a-zA-Z0-9-]*\\.discovery\\.azure\\.com",
      value: "https://test-bkshlf.bookshelf.discovery.azure.com",
    },
  ],
  headerSanitizers: [
    { key: "Authorization", value: "Bearer [REDACTED]" },
    { key: "x-ms-client-request-id", value: "00000000-0000-0000-0000-000000000000" },
    // The service returns a bogus Location: https://example.com for LROs; empty
    // it so the poller falls back to operation-location.
    { key: "Location", regex: true, target: "^https://example\\.com$", value: "" },
  ],
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions,
  // Remove the default "$..name" -> "Sanitized" body-key sanitizer (AZSDK3493)
  // because it clobbers resource names in request/response bodies. Also remove
  // AZSDK4001, which rewrites the endpoint subdomain to "Sanitized" on playback
  // requests and would break URI matching against the "test-wkspc"/"test-bkshlf"
  // hosts baked into the recordings.
  //
  // AZSDK2030 and AZSDK2003 are default header sanitizers that rewrite the
  // "operation-location" and "Location" header values to the literal
  // "https://example.com". The proxy re-applies these on playback, clobbering
  // the real operation-location so the LRO poller follows example.com and fails.
  // Removing them keeps the real (host-sanitized to test-bkshlf/test-wkspc)
  // operation-location; our own headerSanitizer above empties the service's
  // genuinely bogus Location: https://example.com.
  removeCentralSanitizers: ["AZSDK3493", "AZSDK4001", "AZSDK2030", "AZSDK2003"],
};

/**
 * Creates the recorder and reads the environment variables. Should be called
 * first in each test so environment variables are read before they are used.
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  // Match requests on method, URI, and body. Only volatile or transport-level
  // headers (auth, request ids, content negotiation, user-agent) are excluded,
  // since they vary per run and don't identify the operation. `setMatcher` only
  // takes effect in playback mode.
  await recorder.setMatcher("CustomDefaultMatcher", {
    compareBodies: true,
    excludedHeaders: [
      "Accept",
      "Accept-Encoding",
      "Authorization",
      "Connection",
      "Content-Length",
      "Content-Type",
      "User-Agent",
      "x-ms-client-request-id",
    ],
  });
  return recorder;
}

function credential(): TokenCredential {
  if (isPlaybackMode()) {
    return {
      getToken: async () => ({ token: "test-token", expiresOnTimestamp: Date.now() + 3600_000 }),
    };
  }
  return createTestCredential();
}

/** Creates a recorder-instrumented BookshelfClient against the bookshelf endpoint. */
export async function createBookshelfClient(recorder: Recorder): Promise<BookshelfClient> {
  return new BookshelfClient(
    assertEnvironmentVariable("AZURE_DISCOVERY_BOOKSHELF_ENDPOINT"),
    credential(),
    recorder.configureClientOptions({}),
  );
}

/** Creates a recorder-instrumented WorkspaceClient against the workspace endpoint. */
export async function createWorkspaceClient(recorder: Recorder): Promise<WorkspaceClient> {
  return new WorkspaceClient(
    assertEnvironmentVariable("AZURE_DISCOVERY_WORKSPACE_ENDPOINT"),
    credential(),
    recorder.configureClientOptions({}),
  );
}

/** Convenience accessor for the string env vars used across the test suite. */
export function testEnv(name: string): string {
  return env[name] ?? envSetupForPlayback[name] ?? assertEnvironmentVariable(name);
}

/**
 * The agent name. Not routed through envSetupForPlayback because its real value
 * ("Discovery") would be globally string-replaced into every "Microsoft.Discovery"
 * resource id during recording. The value only ever appears in `id`/`createdBy`
 * body fields, which the central sanitizers scrub to "Sanitized", so the exact
 * value is irrelevant to request matching.
 */
export function agentName(): string {
  return isPlaybackMode() ? "test-agent" : assertEnvironmentVariable("AGENT_NAME");
}

/** The full resource path for an investigation. */
export function investigationPath(projectName: string, investigationName: string): string {
  return `/projects/${projectName}/investigations/${investigationName}`;
}

/**
 * Captures the server-assigned operation id from an LRO's `Operation-Location`
 * response header. The SDK does not expose the id directly on the poller, so we
 * read it from the initial response via the `onResponse` callback.
 */
export interface OperationIdCapture {
  onResponse: (rawResponse: { headers: { get(name: string): string | undefined } }) => void;
  operationId(): string;
}

export function captureOperationId(): OperationIdCapture {
  let location: string | undefined;
  return {
    onResponse(rawResponse) {
      const value = rawResponse.headers.get("operation-location");
      if (value) {
        location = value;
      }
    },
    operationId() {
      if (!location) {
        throw new Error("Could not capture operation id: no Operation-Location header seen");
      }
      const id = location.split("/operations/")[1]?.split("?")[0] ?? "";
      if (!id) {
        throw new Error(`Could not extract operation id from Operation-Location: ${location}`);
      }
      return id;
    },
  };
}
