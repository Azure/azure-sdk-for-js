// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByParent, get } from "../../api/solutionMetadatas/operations.js";
import type {
  SolutionMetadatasListByParentOptionalParams,
  SolutionMetadatasGetOptionalParams,
} from "../../api/solutionMetadatas/options.js";
import type { SolutionMetadata } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SolutionMetadatas operations. */
export interface SolutionMetadatasOperations {
  /** List Solution resources */
  listByParent: (
    resourceUri: string,
    options?: SolutionMetadatasListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<SolutionMetadata>;
  /** Get a Solution resource */
  get: (
    resourceUri: string,
    solutionMetadataName: string,
    options?: SolutionMetadatasGetOptionalParams,
  ) => Promise<SolutionMetadata>;
}

function _getSolutionMetadatas(context: WorkloadOrchestrationManagementContext) {
  return {
    listByParent: (resourceUri: string, options?: SolutionMetadatasListByParentOptionalParams) =>
      listByParent(context, resourceUri, options),
    get: (
      resourceUri: string,
      solutionMetadataName: string,
      options?: SolutionMetadatasGetOptionalParams,
    ) => get(context, resourceUri, solutionMetadataName, options),
  };
}

export function _getSolutionMetadatasOperations(
  context: WorkloadOrchestrationManagementContext,
): SolutionMetadatasOperations {
  return {
    ..._getSolutionMetadatas(context),
  };
}
