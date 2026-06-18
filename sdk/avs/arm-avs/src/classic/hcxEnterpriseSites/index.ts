// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { $delete, createOrUpdate, get, list } from "../../api/hcxEnterpriseSites/operations.js";
import {
  HcxEnterpriseSitesDeleteOptionalParams,
  HcxEnterpriseSitesCreateOrUpdateOptionalParams,
  HcxEnterpriseSitesGetOptionalParams,
  HcxEnterpriseSitesListOptionalParams,
} from "../../api/hcxEnterpriseSites/options.js";
import { HcxEnterpriseSite } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a HcxEnterpriseSites operations. */
export interface HcxEnterpriseSitesOperations {
  /** Delete a HcxEnterpriseSite */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    hcxEnterpriseSiteName: string,
    options?: HcxEnterpriseSitesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a HcxEnterpriseSite */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    hcxEnterpriseSiteName: string,
    hcxEnterpriseSite: HcxEnterpriseSite,
    options?: HcxEnterpriseSitesCreateOrUpdateOptionalParams,
  ) => Promise<HcxEnterpriseSite>;
  /** Get a HcxEnterpriseSite */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    hcxEnterpriseSiteName: string,
    options?: HcxEnterpriseSitesGetOptionalParams,
  ) => Promise<HcxEnterpriseSite>;
  /** List HcxEnterpriseSite resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: HcxEnterpriseSitesListOptionalParams,
  ) => PagedAsyncIterableIterator<HcxEnterpriseSite>;
}

function _getHcxEnterpriseSites(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      hcxEnterpriseSiteName: string,
      options?: HcxEnterpriseSitesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, hcxEnterpriseSiteName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      hcxEnterpriseSiteName: string,
      hcxEnterpriseSite: HcxEnterpriseSite,
      options?: HcxEnterpriseSitesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        hcxEnterpriseSiteName,
        hcxEnterpriseSite,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      hcxEnterpriseSiteName: string,
      options?: HcxEnterpriseSitesGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, hcxEnterpriseSiteName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: HcxEnterpriseSitesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getHcxEnterpriseSitesOperations(
  context: AzureVMwareSolutionAPIContext,
): HcxEnterpriseSitesOperations {
  return {
    ..._getHcxEnterpriseSites(context),
  };
}
