// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { CloudLink } from "../../models/models.js";
import {
  CloudLinksDeleteOptionalParams,
  CloudLinksCreateOrUpdateOptionalParams,
  CloudLinksGetOptionalParams,
  CloudLinksListOptionalParams,
} from "../../api/cloudLinks/options.js";
import { $delete, createOrUpdate, get, list } from "../../api/cloudLinks/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudLinks operations. */
export interface CloudLinksOperations {
  /** Delete a CloudLink */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    cloudLinkName: string,
    options?: CloudLinksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a CloudLink */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    cloudLinkName: string,
    cloudLink: CloudLink,
    options?: CloudLinksCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudLink>, CloudLink>;
  /** Get a CloudLink */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    cloudLinkName: string,
    options?: CloudLinksGetOptionalParams,
  ) => Promise<CloudLink>;
  /** List CloudLink resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: CloudLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<CloudLink>;
}

function _getCloudLinks(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      cloudLinkName: string,
      options?: CloudLinksDeleteOptionalParams,
    ) => $delete(context, apiVersion, resourceGroupName, privateCloudName, cloudLinkName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      cloudLinkName: string,
      cloudLink: CloudLink,
      options?: CloudLinksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        cloudLinkName,
        cloudLink,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      cloudLinkName: string,
      options?: CloudLinksGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, cloudLinkName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: CloudLinksListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getCloudLinksOperations(
  context: AzureVMwareSolutionAPIContext,
): CloudLinksOperations {
  return {
    ..._getCloudLinks(context),
  };
}
