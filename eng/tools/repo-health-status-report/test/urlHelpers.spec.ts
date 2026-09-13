// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, assert, describe, expect, it, vi } from "vitest";
import {
  buildUrl,
  buildTimelineUrl,
  getAllDevopsBuilds,
  githubIssueLinkUrl,
  githubTotalIssueLink,
} from "../src/urlHelpers.js";

describe("urlHelpers", () => {
  describe("buildUrl", () => {
    it("should return the correct build URL", () => {
      const pipelineId = 2470;
      const expectedUrl = `https://dev.azure.com/azure-sdk/internal/_apis/build/builds?definitions=${pipelineId}&branchName=refs/heads/main&$top=1&queryOrder=finishTimeDescending&reasonFilter=schedule&api-version=7.0`;
      assert.equal(buildUrl(pipelineId), expectedUrl);
      console.log(buildUrl(pipelineId));
    });
  });

  describe("buildTimelineUrl", () => {
    it("should return the correct timeline URL", () => {
      const buildId = 4825727;
      const expectedUrl = `https://dev.azure.com/azure-sdk/internal/_apis/build/builds/${buildId}/Timeline?api-version=7.0`;
      assert.equal(buildTimelineUrl(buildId), expectedUrl);
      console.log(buildTimelineUrl(buildId));
    });
  });

  describe("getAllDevopsBuilds", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("combines all paginated pipeline definitions", async () => {
      const fetchMock = vi
        .spyOn(globalThis, "fetch")
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ count: 1, value: [{ id: 1, name: "js - first" }] }), {
            headers: { "x-ms-continuationtoken": "next page" },
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ count: 1, value: [{ id: 2, name: "js - second" }] })),
        );

      const result = await getAllDevopsBuilds("token");

      expect(result).toEqual({
        count: 2,
        value: [
          { id: 1, name: "js - first" },
          { id: 2, name: "js - second" },
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(String(fetchMock.mock.calls[0][0])).not.toContain("continuationToken");
      expect(String(fetchMock.mock.calls[1][0])).toContain("continuationToken=next+page");
    });
  });

  describe("githubIssueLinkUrl", () => {
    it("encodes every space in the GitHub issue label", () => {
      const label = "Cognitive - Form Recognizer";
      const kind = "bug";
      const created = "2023-01-01T00:00:00Z";
      const expectedUrl = `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+-label%3Aissue-addressed+-label%3Aquestion+-label%3Aneeds-author-feedback+-label%3Afeature-request+label%3A%22Cognitive+-+Form+Recognizer%22+created%3A%3C${created}`;
      assert.equal(githubIssueLinkUrl(label, kind, created), expectedUrl);
      console.log(githubIssueLinkUrl(label, kind, created));
    });
  });

  describe("githubTotalIssueLink", () => {
    it("encodes every space in the total issues label", () => {
      const expectedUrl = `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+label%3A%22Cognitive%20-%20Form%20Recognizer%22`;
      assert.equal(githubTotalIssueLink("Cognitive - Form Recognizer"), expectedUrl);
    });
  });
});
