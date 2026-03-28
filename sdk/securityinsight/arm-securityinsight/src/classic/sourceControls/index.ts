// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { $delete, list, create, get } from "../../api/sourceControls/operations.js";
import type {
  SourceControlsDeleteOptionalParams,
  SourceControlsListOptionalParams,
  SourceControlsCreateOptionalParams,
  SourceControlsGetOptionalParams,
} from "../../api/sourceControls/options.js";
import type { SourceControl, RepositoryAccessProperties, Warning } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SourceControls operations. */
export interface SourceControlsOperations {
  /** Delete a source control. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    sourceControlId: string,
    repositoryAccess: RepositoryAccessProperties,
    options?: SourceControlsDeleteOptionalParams,
  ) => Promise<Warning>;
  /** Gets all source controls, without source control items. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SourceControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<SourceControl>;
  /** Creates a source control. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    sourceControlId: string,
    sourceControl: SourceControl,
    options?: SourceControlsCreateOptionalParams,
  ) => Promise<SourceControl>;
  /** Gets a source control byt its identifier. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    sourceControlId: string,
    options?: SourceControlsGetOptionalParams,
  ) => Promise<SourceControl>;
}

function _getSourceControls(context: SecurityInsightsContext) {
  return {
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      sourceControlId: string,
      repositoryAccess: RepositoryAccessProperties,
      options?: SourceControlsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        sourceControlId,
        repositoryAccess,
        options,
      ),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SourceControlsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      sourceControlId: string,
      sourceControl: SourceControl,
      options?: SourceControlsCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, sourceControlId, sourceControl, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      sourceControlId: string,
      options?: SourceControlsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, sourceControlId, options),
  };
}

export function _getSourceControlsOperations(
  context: SecurityInsightsContext,
): SourceControlsOperations {
  return {
    ..._getSourceControls(context),
  };
}
