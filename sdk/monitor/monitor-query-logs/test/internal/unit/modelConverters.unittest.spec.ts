// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { convertQueryBatch } from "../../../src/models/models.js";
import { Durations } from "../../../src/index.js";
import { describe, it, assert } from "vitest";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertQueryBatch (simple)", () => {
      const result = convertQueryBatch(
        {
          query: "the kusto query",
          workspaceId: "the primary workspace id",
          timespan: { duration: Durations.twentyFourHours },
        },
        "0",
      );

      assert.deepEqual(result, {
        id: "0",
        query: "the kusto query",
        timespan: { duration: Durations.twentyFourHours },
        workspace: "the primary workspace id",
        headers: undefined,
        workspaces: undefined,
      });
    });

    it("convertQueryBatch (complex)", () => {
      const result = convertQueryBatch(
        {
          query: "the kusto query",
          timespan: { duration: Durations.fiveMinutes },
          workspaceId: "the primary workspace id",
          includeQueryStatistics: true,
          serverTimeoutInSeconds: 100,
          additionalWorkspaces: ["additionalWorkspace", "resourceId1"],
        },
        "1",
      );

      assert.deepEqual(result, {
        id: "1",
        query: "the kusto query",
        timespan: { duration: Durations.fiveMinutes },
        workspace: "the primary workspace id",
        headers: {
          prefer: "wait=100,include-statistics=true",
        },
        workspaces: ["additionalWorkspace", "resourceId1"],
      });
    });
  });
});
