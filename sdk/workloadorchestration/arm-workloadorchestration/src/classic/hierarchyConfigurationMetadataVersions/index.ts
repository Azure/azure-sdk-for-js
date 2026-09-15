// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext } from "../../api/workloadOrchestrationManagementContext.js";
import { listByParent, get } from "../../api/hierarchyConfigurationMetadataVersions/operations.js";
import type {
  HierarchyConfigurationMetadataVersionsListByParentOptionalParams,
  HierarchyConfigurationMetadataVersionsGetOptionalParams,
} from "../../api/hierarchyConfigurationMetadataVersions/options.js";
import type { HierarchyConfigurationMetadataVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HierarchyConfigurationMetadataVersions operations. */
export interface HierarchyConfigurationMetadataVersionsOperations {
  /** List Hierarchy Configuration Metadata Version resources */
  listByParent: (
    resourceUri: string,
    hierarchyConfigurationMetadataName: string,
    options?: HierarchyConfigurationMetadataVersionsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<HierarchyConfigurationMetadataVersion>;
  /** Get a Hierarchy Configuration Metadata Version resource */
  get: (
    resourceUri: string,
    hierarchyConfigurationMetadataName: string,
    hierarchyConfigurationMetadataVersionName: string,
    options?: HierarchyConfigurationMetadataVersionsGetOptionalParams,
  ) => Promise<HierarchyConfigurationMetadataVersion>;
}

function _getHierarchyConfigurationMetadataVersions(
  context: WorkloadOrchestrationManagementContext,
) {
  return {
    listByParent: (
      resourceUri: string,
      hierarchyConfigurationMetadataName: string,
      options?: HierarchyConfigurationMetadataVersionsListByParentOptionalParams,
    ) => listByParent(context, resourceUri, hierarchyConfigurationMetadataName, options),
    get: (
      resourceUri: string,
      hierarchyConfigurationMetadataName: string,
      hierarchyConfigurationMetadataVersionName: string,
      options?: HierarchyConfigurationMetadataVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceUri,
        hierarchyConfigurationMetadataName,
        hierarchyConfigurationMetadataVersionName,
        options,
      ),
  };
}

export function _getHierarchyConfigurationMetadataVersionsOperations(
  context: WorkloadOrchestrationManagementContext,
): HierarchyConfigurationMetadataVersionsOperations {
  return {
    ..._getHierarchyConfigurationMetadataVersions(context),
  };
}
