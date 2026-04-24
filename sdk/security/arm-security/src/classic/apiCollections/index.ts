// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listByResourceGroup,
  listBySubscription,
  listByAzureApiManagementService,
  offboardAzureApiManagementApi,
  onboardAzureApiManagementApi,
  getByAzureApiManagementService,
} from "../../api/apiCollections/operations.js";
import type {
  APICollectionsListByResourceGroupOptionalParams,
  APICollectionsListBySubscriptionOptionalParams,
  APICollectionsListByAzureApiManagementServiceOptionalParams,
  APICollectionsOffboardAzureApiManagementApiOptionalParams,
  APICollectionsOnboardAzureApiManagementApiOptionalParams,
  APICollectionsGetByAzureApiManagementServiceOptionalParams,
} from "../../api/apiCollections/options.js";
import type { ApiCollection } from "../../models/apiCollectionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a APICollections operations. */
export interface APICollectionsOperations {
  /** Gets a list of API collections within a resource group that have been onboarded to Microsoft Defender for APIs. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: APICollectionsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ApiCollection>;
  /** Gets a list of API collections within a subscription that have been onboarded to Microsoft Defender for APIs. */
  listBySubscription: (
    options?: APICollectionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ApiCollection>;
  /** Gets a list of Azure API Management APIs that have been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
  listByAzureApiManagementService: (
    resourceGroupName: string,
    serviceName: string,
    options?: APICollectionsListByAzureApiManagementServiceOptionalParams,
  ) => PagedAsyncIterableIterator<ApiCollection>;
  /** Offboard an Azure API Management API from Microsoft Defender for APIs. The system will stop monitoring the operations within the Azure API Management API for intrusive behaviors. */
  offboardAzureApiManagementApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: APICollectionsOffboardAzureApiManagementApiOptionalParams,
  ) => Promise<void>;
  /** Onboard an Azure API Management API to Microsoft Defender for APIs. The system will start monitoring the operations within the Azure Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
  onboardAzureApiManagementApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
  ) => PollerLike<OperationState<ApiCollection>, ApiCollection>;
  /** @deprecated use onboardAzureApiManagementApi instead */
  beginOnboardAzureApiManagementApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ApiCollection>, ApiCollection>>;
  /** @deprecated use onboardAzureApiManagementApi instead */
  beginOnboardAzureApiManagementApiAndWait: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
  ) => Promise<ApiCollection>;
  /** Gets an Azure API Management API if it has been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
  getByAzureApiManagementService: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: APICollectionsGetByAzureApiManagementServiceOptionalParams,
  ) => Promise<ApiCollection>;
}

function _getAPICollections(context: SecurityCenterContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: APICollectionsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: APICollectionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByAzureApiManagementService: (
      resourceGroupName: string,
      serviceName: string,
      options?: APICollectionsListByAzureApiManagementServiceOptionalParams,
    ) => listByAzureApiManagementService(context, resourceGroupName, serviceName, options),
    offboardAzureApiManagementApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: APICollectionsOffboardAzureApiManagementApiOptionalParams,
    ) => offboardAzureApiManagementApi(context, resourceGroupName, serviceName, apiId, options),
    onboardAzureApiManagementApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
    ) => onboardAzureApiManagementApi(context, resourceGroupName, serviceName, apiId, options),
    beginOnboardAzureApiManagementApi: async (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
    ) => {
      const poller = onboardAzureApiManagementApi(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginOnboardAzureApiManagementApiAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: APICollectionsOnboardAzureApiManagementApiOptionalParams,
    ) => {
      return await onboardAzureApiManagementApi(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        options,
      );
    },
    getByAzureApiManagementService: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: APICollectionsGetByAzureApiManagementServiceOptionalParams,
    ) => getByAzureApiManagementService(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getAPICollectionsOperations(
  context: SecurityCenterContext,
): APICollectionsOperations {
  return {
    ..._getAPICollections(context),
  };
}
