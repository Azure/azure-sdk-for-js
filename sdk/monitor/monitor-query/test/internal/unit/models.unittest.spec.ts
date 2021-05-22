// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { convertToBatchRequest } from "../../../src/logsClient";
import * as assert from "assert";
import {
  BatchRequest as GeneratedBatchRequest,
  LogQueryRequest
} from "../../../src/generated/logquery/src";
import { CommonDurations } from "../../../src/models/constants";

describe("Model unit tests", () => {
  it("convertToBatchRequest (simple)", () => {
    const generatedRequest = convertToBatchRequest({
      queries: [
        {
          query: "the kusto query",
          workspace: "the primary workspace id"
        }
      ]
    });

    assert.deepEqual(generatedRequest, <GeneratedBatchRequest>{
      requests: [
        {
          id: "0", // auto-generated,
          workspace: "the primary workspace id",
          headers: undefined,
          body: {
            query: "the kusto query"
          }
        }
      ]
    });
  });

  it("convertToBatchRequest (complex)", () => {
    const generatedRequest = convertToBatchRequest({
      queries: [
        {
          query: "<placeholder>",
          workspace: "<placeholder>"
        },
        {
          azureResourceIds: ["resourceId1"],
          includeQueryStatistics: true,
          qualifiedNames: ["qualifiedName"],
          query: "the kusto query",
          serverTimeoutInSeconds: 100,
          timespan: CommonDurations.last5Minutes,
          workspace: "the primary workspace id",
          workspaceIds: ["additionalWorkspaceId"],
          workspaces: ["additionalWorkspace"]
        }
      ]
    });

    assert.deepEqual(generatedRequest.requests?.[1], <LogQueryRequest>{
      id: "1", // auto-generated (increments by 1 for each query in the batch)
      workspace: "the primary workspace id",
      headers: {
        Prefer: "wait=100,include-statistics=true"
      },
      body: {
        azureResourceIds: ["resourceId1"],
        qualifiedNames: ["qualifiedName"],
        query: "the kusto query",
        timespan: CommonDurations.last5Minutes,
        workspaceIds: ["additionalWorkspaceId"],
        workspaces: ["additionalWorkspace"]
      }
    });

    assert.equal(generatedRequest?.requests?.length, 2);
  });
});
