// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import type { AIProjectContext } from "../../src/api/aiProjectContext.js";
import { createAIProject } from "../../src/api/aiProjectContext.js";
import {
  _createAgentFromManifestSend,
  _createAgentVersionFromManifestSend,
  _createVersionFromCodeSend,
  _patchAgentObjectSend,
  _updateAgentFromManifestSend,
} from "../../src/api/agents/operations.js";
import type {
  AgentsCreateAgentFromManifestOptionalParams,
  CreateAgentVersionFromCodeContent,
} from "../../src/index.js";

const codeContent: CreateAgentVersionFromCodeContent = {
  metadata: {
    definition: {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      protocol_versions: [{ protocol: "a2a", version: "0.3" }],
      code_configuration: {
        runtime: "python_3_11",
        entry_point: ["python", "main.py"],
        dependency_resolution: "bundled",
      },
    },
  },
  code: { contents: "", filename: "agent.zip", contentType: "application/zip" },
};

const operations: {
  name: string;
  method: string;
  path: string;
  send: (
    context: AIProjectContext,
    options: AgentsCreateAgentFromManifestOptionalParams,
  ) => StreamableMethod;
}[] = [
  {
    name: "createVersionFromCode",
    method: "POST",
    path: "/agents/agent/versions",
    send: (context, options) =>
      _createVersionFromCodeSend(context, "agent", "digest", codeContent, options),
  },
  {
    name: "patchAgentObject",
    method: "PATCH",
    path: "/agents/agent",
    send: (context, options) => _patchAgentObjectSend(context, "agent", options),
  },
  {
    name: "createAgentVersionFromManifest",
    method: "POST",
    path: "/agents/agent/versions:import",
    send: (context, options) =>
      _createAgentVersionFromManifestSend(context, "agent", "manifest", {}, options),
  },
  {
    name: "updateAgentFromManifest",
    method: "POST",
    path: "/agents/agent/import",
    send: (context, options) =>
      _updateAgentFromManifestSend(context, "agent", "manifest", {}, options),
  },
  {
    name: "createAgentFromManifest",
    method: "POST",
    path: "/agents:import",
    send: (context, options) =>
      _createAgentFromManifestSend(context, "agent", "manifest", {}, options),
  },
];

describe("agent write conditional preview opt-ins", () => {
  for (const operation of operations) {
    for (const foundryFeatures of [undefined, "A2AAgents=V1Preview"] as const) {
      it(`${operation.name} ${foundryFeatures ? "forwards the explicit opt-in" : "does not opt into preview by default"}`, async () => {
        const requests: PipelineRequest[] = [];
        const context = createAIProject(
          "https://example.com",
          {
            getToken: async () => ({
              token: "test-token",
              expiresOnTimestamp: Date.now() + 60_000,
            }),
          },
          {
            httpClient: {
              sendRequest: async (request) => {
                requests.push(request);
                return {
                  request,
                  status: 200,
                  headers: createHttpHeaders({ "content-type": "application/json" }),
                  bodyAsText: "{}",
                };
              },
            },
          },
        );
        const abortController = new AbortController();
        await operation.send(context, {
          foundryFeatures,
          abortSignal: abortController.signal,
          requestOptions: { headers: { "x-custom-header": "preserved" } },
        });

        expect(requests).toHaveLength(1);
        const request = requests[0];
        expect(request.method).toBe(operation.method);
        expect(new URL(request.url).pathname).toBe(operation.path);
        expect(new URL(request.url).searchParams.get("api-version")).toBe("v1");
        expect(request.headers.get("foundry-features")).toBe(foundryFeatures);
        expect(request.headers.get("x-custom-header")).toBe("preserved");
        expect(request.abortSignal).toBe(abortController.signal);
        if (operation.name === "createVersionFromCode") {
          expect(request.headers.get("x-ms-code-zip-sha256")).toBe("digest");
        }
      });
    }
  }
});
