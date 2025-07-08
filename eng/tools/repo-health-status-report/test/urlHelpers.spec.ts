// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import {
  buildUrl,
  buildTimelineUrl,
  githubIssueLinkUrl,
  githubTotalIssueLink,
} from "../src/urlHelpers.js";

describe("urlHelpers", () => {
  describe("buildUrl", () => {
    it("should return the correct build URL", () => {
      const pipelineId = 2470;
      const expectedUrl = `https://dev.azure.com/azure-sdk/internal/_apis/build/builds?definitions=${pipelineId}&$top=1&queryOrder=finishTimeDescending&reasonFilter=schedule&api-version=7.0`;
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

  describe("githubIssueLinkUrl", () => {
    it("should return the correct GitHub issue link URL", () => {
      const label = "bug";
      const kind = "bug";
      const created = "2023-01-01T00:00:00Z";
      const expectedUrl = `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+-label%3Aissue-addressed+-label%3Aquestion+-label%3Aneeds-author-feedback+-label%3Afeature-request+label%3A%22${label.replace(" ", "+")}%22+created%3A%3C${created}`;
      assert.equal(githubIssueLinkUrl(label, kind, created), expectedUrl);
      console.log(githubIssueLinkUrl(label, kind, created));
    });
  });

  describe("githubTotalIssueLink", () => {
    it("should return the correct total issues link URL", () => {
      const expectedUrl = `https://github.com/Azure/azure-sdk-for-js/issues?q=is%3Aopen+is%3Aissue+label%3Acustomer-reported+label%3AClient+label%3A%22AI%20Agents%22`;
      assert.equal(githubTotalIssueLink("AI Agents"), expectedUrl);
    });
  });
});
