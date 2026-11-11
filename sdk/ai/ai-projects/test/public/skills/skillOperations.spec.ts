// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { HttpClient, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../../../src/index.js";

const endpoint = "https://example.com/api/projects/test-project";

function createClient(...responses: unknown[]): {
  client: AIProjectClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const credential: TokenCredential = {
    getToken: async () => ({
      token: "unit-test-token",
      expiresOnTimestamp: Date.now() + 3_600_000,
    }),
  };
  const httpClient: HttpClient = {
    async sendRequest(request) {
      requests.push(request);
      if (responses.length === 0) throw new Error(`Unexpected request: ${request.url}`);
      return {
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: JSON.stringify(responses.shift()),
      };
    },
  };
  return {
    client: new AIProjectClient(endpoint, credential, {
      httpClient,
      retryOptions: { maxRetries: 0 },
    }),
    requests,
  };
}

describe("Skills preview requests", () => {
  it("uses preview routes, API versioning and opt-in headers for all skill operations", async () => {
    const response = {
      id: "skill-id",
      skill_id: "skill-id",
      name: "skill",
      version: "v1",
      description: "Test skill",
      created_at: 0,
      default_version: "v1",
      latest_version: "v1",
      deleted: true,
      data: [],
      has_more: false,
    };
    const { client, requests } = createClient(...Array.from({ length: 11 }, () => response));
    expect(client).not.toHaveProperty("skills");
    expect(client.beta.skills.create).toBeTypeOf("function");

    await client.beta.skills.deleteVersion("skill", "v1");
    await client.beta.skills.downloadVersion("skill", "v1");
    await client.beta.skills.download("skill");
    await client.beta.skills.getVersion("skill", "v1");
    await client.beta.skills
      .listVersions("skill", { limit: 3, after: "v0", order: "asc" })
      .byPage()
      .next();
    await client.beta.skills.createFromFiles("skill", { files: [] });
    await client.beta.skills.create("skill", {
      inlineContent: { description: "Test", instructions: "Test instructions" },
    });
    await client.beta.skills.delete("skill");
    await client.beta.skills.update("skill", "v1");
    await client.beta.skills.list({ limit: 3, after: "v0", order: "asc" }).byPage().next();
    await client.beta.skills.get("skill");

    const root = "/api/projects/test-project/skills";
    expect(requests.map((request) => [request.method, new URL(request.url).pathname])).toEqual([
      ["DELETE", `${root}/skill/versions/v1`],
      ["GET", `${root}/skill/versions/v1/content`],
      ["GET", `${root}/skill/content`],
      ["GET", `${root}/skill/versions/v1`],
      ["GET", `${root}/skill/versions`],
      ["POST", `${root}/skill/versions`],
      ["POST", `${root}/skill/versions`],
      ["DELETE", `${root}/skill`],
      ["POST", `${root}/skill`],
      ["GET", root],
      ["GET", `${root}/skill`],
    ]);
    for (const request of requests) {
      expect(new URL(request.url).searchParams.get("api-version")).toBe("v1");
      expect(request.headers.get("foundry-features")).toBe("Skills=V1Preview");
    }
    for (const request of [requests[4], requests[9]]) {
      const query = new URL(request.url).searchParams;
      expect(query.get("after")).toBe("v0");
      expect(query.get("limit")).toBe("3");
      expect(query.get("order")).toBe("asc");
    }
  });

  it.each(["skills", "versions"] as const)(
    "follows and resumes %s pages with API versioning and preview headers",
    async (kind) => {
      const { client, requests } = createClient(
        { data: [], last_id: "cursor-1", has_more: true },
        { data: [], last_id: "cursor-2", has_more: false },
        { data: [], last_id: "cursor-2", has_more: false },
      );
      const options = {
        limit: 1,
        order: "asc" as const,
        after: "start",
        requestOptions: { headers: { "x-custom": "retained" } },
      };
      const iterator =
        kind === "skills"
          ? client.beta.skills.list(options)
          : client.beta.skills.listVersions("skill", options);
      const pages = iterator.byPage();
      const firstPage = await pages.next();

      const continuation = new URL(requests[0].url);
      continuation.searchParams.set("after", "cursor-1");
      expect(firstPage.value).toHaveProperty("continuationToken", continuation.toString());
      await pages.next();
      await iterator.byPage({ continuationToken: continuation.toString() }).next();

      expect(requests).toHaveLength(3);
      for (const request of requests) {
        const query = new URL(request.url).searchParams;
        expect(query.get("api-version")).toBe("v1");
        expect(request.headers.get("foundry-features")).toBe("Skills=V1Preview");
        expect(query.get("limit")).toBe("1");
        expect(query.get("order")).toBe("asc");
        expect(request.headers.get("x-custom")).toBe("retained");
      }
      expect(requests[1].url).toBe(continuation.toString());
      expect(requests[2].url).toBe(continuation.toString());
    },
  );
});
