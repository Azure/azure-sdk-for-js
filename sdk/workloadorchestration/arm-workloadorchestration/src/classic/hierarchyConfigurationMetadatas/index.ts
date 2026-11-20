// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByParent, get } from "../../api/hierarchyConfigurationMetadatas/operations.js";
import type {
  HierarchyConfigurationMetadatasListByParentOptionalParams,
  HierarchyConfigurationMetadatasGetOptionalParams,
} from "../../api/hierarchyConfigurationMetadatas/options.js";
import type { HierarchyConfigurationMetadata } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HierarchyConfigurationMetadatas operations. */
export interface HierarchyConfigurationMetadatasOperations {
  /** List Solution resources */
  listByParent: (
    resourceUri: string,
    options?: HierarchyConfigurationMetadatasListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<HierarchyConfigurationMetadata>;
  /** Get a Hierarchy Configuration Metadata resource */
  get: (
    resourceUri: string,
    hierarchyConfigurationMetadataName: string,
    options?: HierarchyConfigurationMetadatasGetOptionalParams,
  ) => Promise<HierarchyConfigurationMetadata>;
}

function _getHierarchyConfigurationMetadatas(context: WorkloadOrchestrationManagementContext) {
  return {
    listByParent: (
      resourceUri: string,
      options?: HierarchyConfigurationMetadatasListByParentOptionalParams,
    ) => listByParent(context, resourceUri, options),
    get: (
      resourceUri: string,
      hierarchyConfigurationMetadataName: string,
      options?: HierarchyConfigurationMetadatasGetOptionalParams,
    ) => get(context, resourceUri, hierarchyConfigurationMetadataName, options),
  };
}

export function _getHierarchyConfigurationMetadatasOperations(
  context: WorkloadOrchestrationManagementContext,
): HierarchyConfigurationMetadatasOperations {
  return {
    ..._getHierarchyConfigurationMetadatas(context),
  };
}
