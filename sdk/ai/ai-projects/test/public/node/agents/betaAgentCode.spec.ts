// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { buffer } from "node:stream/consumers";
import { describe, expect, it } from "vitest";
import type { TokenCredential } from "@azure/core-auth";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type {
  AIProjectClientOptionalParams,
  BetaAgentsOperations,
  CreateAgentFromCodeContent,
  CreateAgentVersionFromCodeContent,
  HostedAgentDefinition,
} from "../../../../src/index.js";
import { AIProjectClient } from "../../../../src/index.js";
import {
  createAgentFromCodeContentSerializer,
  createAgentVersionFromCodeContentSerializer,
} from "../../../../src/models/models.js";
import { createFilePartDescriptor } from "../../../../src/static-helpers/multipartHelpers.js";

const agentName = "code-agent";
const codeZipSha256 = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const hostedDefinition: HostedAgentDefinition = {
  kind: "hosted",
  cpu: "0.5",
  memory: "1Gi",
  code_configuration: {
    runtime: "python_3_11",
    entry_point: ["python", "main.py"],
    dependency_resolution: "bundled",
  },
};

function createCodeAgentBody(
  code: CreateAgentFromCodeContent["code"],
): CreateAgentFromCodeContent & CreateAgentVersionFromCodeContent {
  return {
    metadata: {
      description: "code agent",
      definition: hostedDefinition,
    },
    code,
  };
}

function createMockAgentResponseBody(): Record<string, unknown> {
  return {
    object: "agent",
    id: "agent-id",
    name: agentName,
    versions: {
      latest: {
        metadata: {},
        object: "agent.version",
        id: "version-id",
        name: agentName,
        version: "1",
        created_at: 1,
        status: "active",
        definition: {
          ...hostedDefinition,
          code_configuration: {
            ...hostedDefinition.code_configuration,
            content_hash: codeZipSha256,
          },
        },
      },
    },
  };
}

function createMockAgentVersionResponseBody(): Record<string, unknown> {
  return {
    metadata: {},
    object: "agent.version",
    id: "version-id",
    name: agentName,
    version: "2",
    created_at: 1,
    status: "active",
    definition: {
      ...hostedDefinition,
      code_configuration: {
        ...hostedDefinition.code_configuration,
        content_hash: codeZipSha256,
      },
    },
  };
}

type MockPipelineResponse = Partial<PipelineResponse> & { jsonBody?: unknown };

function createCodeAgentsClient(
  responseFn: (request: PipelineRequest) => MockPipelineResponse,
): BetaAgentsOperations {
  const options: AIProjectClientOptionalParams = { additionalPolicies: [] };
  options.additionalPolicies?.push({
    policy: {
      name: "RequestMockPolicy",
      sendRequest: async (request: PipelineRequest) => {
        const { jsonBody, ...response } = responseFn(request);
        const jsonHeaders =
          jsonBody !== undefined && response.readableStreamBody === undefined
            ? createHttpHeaders({ "content-type": "application/json" })
            : createHttpHeaders();
        return {
          bodyAsText: jsonBody !== undefined ? JSON.stringify(jsonBody) : undefined,
          headers: jsonHeaders,
          status: 200,
          request,
          ...response,
        } as PipelineResponse;
      },
    },
    position: "perCall",
  });
  const credential: TokenCredential = {
    getToken: async () => ({
      token: "test-token",
      expiresOnTimestamp: Date.now() + 60_000,
    }),
  };
  const client: AIProjectClient = new AIProjectClient(
    "https://example.azure.com/api/projects/test-project",
    credential,
    options,
  );
  return client.beta.agents;
}

describe("beta agents - code-based operations", () => {
  it("createFilePartDescriptor preserves wrapped empty contents and allows undefined input", () => {
    expect(
      createFilePartDescriptor("code", {
        contents: "",
        contentType: "application/zip",
        filename: "agent.zip",
      }),
    ).toEqual({
      name: "code",
      body: "",
      contentType: "application/zip",
      filename: "agent.zip",
    });

    expect(createFilePartDescriptor("code", undefined, "application/octet-stream")).toEqual({
      name: "code",
      body: undefined,
      contentType: "application/octet-stream",
    });
  });

  it("serializes create and update code-based agent requests", async () => {
    const requests: { url: string; method: string; headers: Record<string, string> }[] = [];
    const betaAgents = createCodeAgentsClient((request) => {
      requests.push({
        url: request.url,
        method: request.method,
        headers: {
          agentName: request.headers.get("x-ms-agent-name") ?? "",
          codeZipSha256: request.headers.get("x-ms-code-zip-sha256") ?? "",
          foundryFeatures: request.headers.get("foundry-features") ?? "",
        },
      });
      return {
        jsonBody: createMockAgentResponseBody(),
      };
    });

    const body = createCodeAgentBody({
      contents: "",
      contentType: "application/zip",
      filename: "agent.zip",
    });

    const created = await betaAgents.createAgentFromCode(agentName, codeZipSha256, body, {
      foundryFeatures: "CodeAgents=V1Preview",
    });
    const updated = await betaAgents.updateAgentFromCode(agentName, codeZipSha256, body, {
      foundryFeatures: "CodeAgents=V1Preview",
    });

    expect(created.name).toBe(agentName);
    expect(updated.name).toBe(agentName);
    expect(requests).toHaveLength(2);
    expect(requests[0]?.method).toBe("POST");
    expect(requests[0]?.url).toContain("/agents?api-version=v1");
    expect(requests[0]?.headers).toEqual({
      agentName,
      codeZipSha256,
      foundryFeatures: "CodeAgents=V1Preview",
    });
    expect(requests[1]?.url).toContain(`/agents/${agentName}?api-version=v1`);
    expect(requests[1]?.headers).toEqual({
      agentName: "",
      codeZipSha256,
      foundryFeatures: "CodeAgents=V1Preview",
    });
    expect(createAgentFromCodeContentSerializer(body)).toMatchObject([
      { name: "metadata" },
      {
        name: "code",
        body: "",
        contentType: "application/zip",
        filename: "agent.zip",
      },
    ]);
    expect(createAgentVersionFromCodeContentSerializer(body)).toMatchObject([
      { name: "metadata" },
      {
        name: "code",
        body: "",
        contentType: "application/zip",
        filename: "agent.zip",
      },
    ]);
  });

  it("creates an agent version from code", async () => {
    let capturedRequest:
      | {
          url: string;
          method: string;
          foundryFeatures: string;
          codeZipSha256: string;
        }
      | undefined;
    const betaAgents = createCodeAgentsClient((request) => {
      capturedRequest = {
        url: request.url,
        method: request.method,
        foundryFeatures: request.headers.get("foundry-features") ?? "",
        codeZipSha256: request.headers.get("x-ms-code-zip-sha256") ?? "",
      };
      return {
        jsonBody: createMockAgentVersionResponseBody(),
      };
    });

    const version = await betaAgents.createAgentVersionFromCode(
      agentName,
      codeZipSha256,
      createCodeAgentBody(new Uint8Array([1, 2, 3])),
      { foundryFeatures: "CodeAgents=V1Preview" },
    );

    expect(version.version).toBe("2");
    expect(capturedRequest).toMatchObject({
      method: "POST",
      foundryFeatures: "CodeAgents=V1Preview",
      codeZipSha256,
    });
    expect(capturedRequest?.url).toContain(`/agents/${agentName}/versions?api-version=v1`);
    expect(
      createAgentVersionFromCodeContentSerializer(createCodeAgentBody(new Uint8Array([1, 2, 3]))),
    ).toMatchObject([
      { name: "metadata" },
      { name: "code", body: new Uint8Array([1, 2, 3]), contentType: "application/octet-stream" },
    ]);
  });

  it("downloads agent code streams for latest and specific versions", async () => {
    const payload = Buffer.from("zip-bytes");
    const requests: string[] = [];
    const betaAgents = createCodeAgentsClient((request) => {
      requests.push(request.url);
      return {
        readableStreamBody: Readable.from([payload]),
      };
    });

    const latest = await betaAgents.downloadAgentCode(agentName);
    const specific = await betaAgents.downloadAgentCode(agentName, { agentVersion: "2" });

    expect(new Uint8Array(await buffer(latest.readableStreamBody!))).toEqual(
      new Uint8Array(payload),
    );
    expect(new Uint8Array(await buffer(specific.readableStreamBody!))).toEqual(
      new Uint8Array(payload),
    );
    expect(requests[0]).toContain(`/agents/${agentName}/code:download?api-version=v1`);
    expect(requests[1]).toContain(`/agents/${agentName}/versions/2/code:download?api-version=v1`);
  });

  it("surfaces service failures from code-based agent operations", async () => {
    const betaAgents = createCodeAgentsClient(() => ({
      status: 400,
      jsonBody: {
        error: {
          code: "InvalidRequest",
          message: "The code payload is invalid.",
        },
      },
    }));

    await expect(
      betaAgents.createAgentFromCode(
        agentName,
        codeZipSha256,
        createCodeAgentBody(new Uint8Array([1])),
      ),
    ).rejects.toMatchObject({
      statusCode: 400,
      details: {
        error: {
          code: "InvalidRequest",
          message: "The code payload is invalid.",
        },
      },
    });
  });
});
