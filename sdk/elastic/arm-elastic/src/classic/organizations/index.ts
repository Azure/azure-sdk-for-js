// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import {
  getElasticToAzureSubscriptionMapping,
  getApiKey,
  resubscribe,
} from "../../api/organizations/operations.js";
import type {
  OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
  OrganizationsGetApiKeyOptionalParams,
  OrganizationsResubscribeOptionalParams,
} from "../../api/organizations/options.js";
import type {
  ElasticMonitorResource,
  UserApiKeyResponse,
  ElasticOrganizationToAzureSubscriptionMappingResponse,
} from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Organizations operations. */
export interface OrganizationsOperations {
  /**
   * >;
   *   /**
   * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
   */
  getElasticToAzureSubscriptionMapping: (
    options?: OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
  ) => Promise<ElasticOrganizationToAzureSubscriptionMappingResponse>;
  /** Fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization. */
  getApiKey: (options?: OrganizationsGetApiKeyOptionalParams) => Promise<UserApiKeyResponse>;
  /** Resubscribe the Elasticsearch Organization. */
  resubscribe: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => PollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>;
  /** @deprecated use resubscribe instead */
  beginResubscribe: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>>;
  /** @deprecated use resubscribe instead */
  beginResubscribeAndWait: (
    resourceGroupName: string,
    monitorName: string,
    options?: OrganizationsResubscribeOptionalParams,
  ) => Promise<ElasticMonitorResource>;
}

function _getOrganizations(context: MicrosoftElasticContext) {
  return {
    getElasticToAzureSubscriptionMapping: (
      options?: OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
    ) => getElasticToAzureSubscriptionMapping(context, options),
    getApiKey: (options?: OrganizationsGetApiKeyOptionalParams) => getApiKey(context, options),
    resubscribe: (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => resubscribe(context, resourceGroupName, monitorName, options),
    beginResubscribe: async (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => {
      const poller = resubscribe(context, resourceGroupName, monitorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResubscribeAndWait: async (
      resourceGroupName: string,
      monitorName: string,
      options?: OrganizationsResubscribeOptionalParams,
    ) => {
      return await resubscribe(context, resourceGroupName, monitorName, options);
    },
  };
}

export function _getOrganizationsOperations(
  context: MicrosoftElasticContext,
): OrganizationsOperations {
  return {
    ..._getOrganizations(context),
  };
}
