// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext } from "../../api/developerHubServiceContext.js";
import {
  sync,
  scale,
  $export,
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/iacProfiles/operations.js";
import {
  IacProfilesSyncOptionalParams,
  IacProfilesScaleOptionalParams,
  IacProfilesExportOptionalParams,
  IacProfilesListOptionalParams,
  IacProfilesListByResourceGroupOptionalParams,
  IacProfilesDeleteOptionalParams,
  IacProfilesUpdateTagsOptionalParams,
  IacProfilesCreateOrUpdateOptionalParams,
  IacProfilesGetOptionalParams,
} from "../../api/iacProfiles/options.js";
import {
  IacProfile,
  TagsObject,
  ExportTemplateRequest,
  PrLinkResponse,
  ScaleTemplateRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IacProfiles operations. */
export interface IacProfilesOperations {
  /** Sync template */
  sync: (
    resourceGroupName: string,
    iacProfileName: string,
    options?: IacProfilesSyncOptionalParams,
  ) => Promise<void>;
  /** Scale by template */
  scale: (
    resourceGroupName: string,
    iacProfileName: string,
    parameters: ScaleTemplateRequest,
    options?: IacProfilesScaleOptionalParams,
  ) => Promise<PrLinkResponse>;
  /** Export a template */
  export: (
    resourceGroupName: string,
    iacProfileName: string,
    parameters: ExportTemplateRequest,
    options?: IacProfilesExportOptionalParams,
  ) => Promise<PrLinkResponse>;
  /** Gets a list of IacProfiles associated with the specified subscription. */
  list: (options?: IacProfilesListOptionalParams) => PagedAsyncIterableIterator<IacProfile>;
  /** Gets a list of iacProfiles within a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IacProfilesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IacProfile>;
  /** Deletes a IacProfile */
  delete: (
    resourceGroupName: string,
    iacProfileName: string,
    options?: IacProfilesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags on a IacProfile. */
  updateTags: (
    resourceGroupName: string,
    iacProfileName: string,
    parameters: TagsObject,
    options?: IacProfilesUpdateTagsOptionalParams,
  ) => Promise<IacProfile>;
  /** Creates or updates a IacProfile */
  createOrUpdate: (
    resourceGroupName: string,
    iacProfileName: string,
    parameters: IacProfile,
    options?: IacProfilesCreateOrUpdateOptionalParams,
  ) => Promise<IacProfile>;
  /** Gets a IacProfile. */
  get: (
    resourceGroupName: string,
    iacProfileName: string,
    options?: IacProfilesGetOptionalParams,
  ) => Promise<IacProfile>;
}

function _getIacProfiles(context: DeveloperHubServiceContext) {
  return {
    sync: (
      resourceGroupName: string,
      iacProfileName: string,
      options?: IacProfilesSyncOptionalParams,
    ) => sync(context, resourceGroupName, iacProfileName, options),
    scale: (
      resourceGroupName: string,
      iacProfileName: string,
      parameters: ScaleTemplateRequest,
      options?: IacProfilesScaleOptionalParams,
    ) => scale(context, resourceGroupName, iacProfileName, parameters, options),
    export: (
      resourceGroupName: string,
      iacProfileName: string,
      parameters: ExportTemplateRequest,
      options?: IacProfilesExportOptionalParams,
    ) => $export(context, resourceGroupName, iacProfileName, parameters, options),
    list: (options?: IacProfilesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IacProfilesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      iacProfileName: string,
      options?: IacProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, iacProfileName, options),
    updateTags: (
      resourceGroupName: string,
      iacProfileName: string,
      parameters: TagsObject,
      options?: IacProfilesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, iacProfileName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      iacProfileName: string,
      parameters: IacProfile,
      options?: IacProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, iacProfileName, parameters, options),
    get: (
      resourceGroupName: string,
      iacProfileName: string,
      options?: IacProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, iacProfileName, options),
  };
}

export function _getIacProfilesOperations(
  context: DeveloperHubServiceContext,
): IacProfilesOperations {
  return {
    ..._getIacProfiles(context),
  };
}
