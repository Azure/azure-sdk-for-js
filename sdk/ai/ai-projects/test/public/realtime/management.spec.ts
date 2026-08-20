// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import {
  createHttpHeaders,
  type HttpClient,
  type PipelineRequest,
  type PipelineResponse,
} from "@azure/core-rest-pipeline";
import { AIProjectClient, type VoiceAgentDefinition } from "@azure/ai-projects";
import { assert, describe, it } from "vitest";

const preview = "VoiceAgents=V1Preview" as const;
const agentName = "management-rest-test";

class TestCredential implements TokenCredential {
  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken> {
    return { token: "test-token", expiresOnTimestamp: Date.now() + 60_000 };
  }
}

interface MockResponse {
  status: number;
  body?: unknown;
}

class MockHttpClient implements HttpClient {
  public readonly requests: PipelineRequest[] = [];

  public constructor(private readonly responses: MockResponse[]) {}

  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    this.requests.push(request);
    const response = this.responses.shift();
    assert.ok(response, `No mock response configured for ${request.method} ${request.url}`);
    return {
      request,
      status: response.status,
      headers: createHttpHeaders({ "content-type": "application/json" }),
      bodyAsText: response.body === undefined ? undefined : JSON.stringify(response.body),
    };
  }
}

describe("AIProjectClient Voice Agent management REST", () => {
  it("generates, creates, gets, updates, lists, and deletes through unified agents", async () => {
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: "gpt-realtime",
      instructions: "Be helpful.",
    };
    const generatedBody = createAgentBody("generated", definition);
    const createdBody = createAgentBody("1", definition);
    const updatedBody = createAgentBody("2", {
      ...definition,
      instructions: "Be concise and helpful.",
    });
    const httpClient = new MockHttpClient([
      { status: 200, body: generatedBody },
      { status: 200, body: createdBody },
      { status: 200, body: createdBody },
      { status: 200, body: updatedBody },
      {
        status: 200,
        body: {
          data: [updatedBody],
          first_id: agentName,
          last_id: agentName,
          has_more: false,
        },
      },
      { status: 200, body: { object: "agent.deleted", name: agentName, deleted: true } },
    ]);
    const client = new AIProjectClient(
      "https://example.test/api/projects/project",
      new TestCredential(),
      { httpClient },
    );

    const generated = await client.agents.generateAgent({ kind: "voice", name: agentName });
    assert.equal(generated.versions.latest.version, "generated");

    const created = await client.agents.create(agentName, definition, {
      foundryFeatures: preview,
      description: "REST test agent",
    });
    assert.equal(created.versions.latest.version, "1");

    const retrieved = await client.agents.get(agentName);
    assert.equal(retrieved.name, agentName);

    const updated = await client.agents.update(
      agentName,
      { ...definition, instructions: "Be concise and helpful." },
      { foundryFeatures: preview },
    );
    assert.equal(updated.versions.latest.version, "2");

    const listed = [];
    for await (const agent of client.agents.list({ kind: "voice", limit: 10 })) {
      listed.push(agent);
    }
    assert.deepEqual(
      listed.map((agent) => agent.name),
      [agentName],
    );

    await client.agents.delete(agentName);

    assert.deepEqual(
      httpClient.requests.map((request) => `${request.method} ${new URL(request.url).pathname}`),
      [
        "POST /api/projects/project/agents:generate",
        "POST /api/projects/project/agents",
        `GET /api/projects/project/agents/${agentName}`,
        `POST /api/projects/project/agents/${agentName}`,
        "GET /api/projects/project/agents",
        `DELETE /api/projects/project/agents/${agentName}`,
      ],
    );
    for (const request of httpClient.requests) {
      assert.equal(new URL(request.url).searchParams.get("api-version"), "v1");
    }
    assert.equal(httpClient.requests[0].headers.get("foundry-features"), preview);
    assert.equal(httpClient.requests[1].headers.get("foundry-features"), preview);
    assert.equal(httpClient.requests[3].headers.get("foundry-features"), preview);

    assert.deepEqual(JSON.parse(String(httpClient.requests[0].body)), {
      kind: "voice",
      name: agentName,
    });
    const createBody = JSON.parse(String(httpClient.requests[1].body));
    assert.equal(createBody.name, agentName);
    assert.equal(createBody.definition.kind, "voice");
    assert.equal(createBody.description, "REST test agent");
    const updateBody = JSON.parse(String(httpClient.requests[3].body));
    assert.equal(updateBody.definition.instructions, "Be concise and helpful.");
    assert.equal(new URL(httpClient.requests[4].url).searchParams.get("kind"), "voice");
    assert.equal(new URL(httpClient.requests[4].url).searchParams.get("limit"), "10");
  });
});

function createAgentBody(version: string, definition: VoiceAgentDefinition): unknown {
  return {
    object: "agent",
    id: agentName,
    name: agentName,
    state: "enabled",
    versions: {
      latest: {
        metadata: {},
        object: "agent.version",
        id: `${agentName}:${version}`,
        name: agentName,
        version,
        created_at: 1_700_000_000,
        definition,
      },
    },
  };
}
