// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { FeedOptions, PartitionedQueryExecutionInfo, Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { SqlQuerySpec } from "../SqlQuerySpec";

export class GlobalStatisticsExecutionContext implements ExecutionContext {

  constructor(
   private clientContext: ClientContext,
    private collectionLink: string,
    private query: string | SqlQuerySpec,
    private options: FeedOptions,
    private partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo,
    private correlatedActivityId: string,
  ) {

  }
  nextItem: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
  hasMoreResults: () => boolean;
  fetchMore?: (diagnosticNode: DiagnosticNodeInternal) => Promise<Response<any>>;
}
