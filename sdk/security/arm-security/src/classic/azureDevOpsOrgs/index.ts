// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listAvailable,
  list,
  update,
  createOrUpdate,
  get,
} from "../../api/azureDevOpsOrgs/operations.js";
import type {
  AzureDevOpsOrgsListAvailableOptionalParams,
  AzureDevOpsOrgsListOptionalParams,
  AzureDevOpsOrgsUpdateOptionalParams,
  AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  AzureDevOpsOrgsGetOptionalParams,
} from "../../api/azureDevOpsOrgs/options.js";
import type {
  SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureDevOpsOrgs operations. */
export interface AzureDevOpsOrgsOperations {
  /** Returns a list of all Azure DevOps organizations accessible by the user token consumed by the connector. */
  listAvailable: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: AzureDevOpsOrgsListAvailableOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse>;
  /** Returns a list of Azure DevOps organizations onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    options?: AzureDevOpsOrgsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>;
  /** Updates monitored Azure DevOps organization details. */
  update: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
    SecurityConnectorsDevOpsAPIAzureDevOpsOrg
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
      SecurityConnectorsDevOpsAPIAzureDevOpsOrg
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>;
  /** Creates or updates monitored Azure DevOps organization details. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
    SecurityConnectorsDevOpsAPIAzureDevOpsOrg
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
      SecurityConnectorsDevOpsAPIAzureDevOpsOrg
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
    options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>;
  /** Returns a monitored Azure DevOps organization resource. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    options?: AzureDevOpsOrgsGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>;
}

function _getAzureDevOpsOrgs(context: SecurityCenterContext) {
  return {
    listAvailable: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: AzureDevOpsOrgsListAvailableOptionalParams,
    ) => listAvailable(context, resourceGroupName, securityConnectorName, options),
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      options?: AzureDevOpsOrgsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, options),
    update: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, securityConnectorName, orgName, azureDevOpsOrg, options),
    beginUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        azureDevOpsOrg,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        azureDevOpsOrg,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        azureDevOpsOrg,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        azureDevOpsOrg,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      azureDevOpsOrg: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
      options?: AzureDevOpsOrgsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        azureDevOpsOrg,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      options?: AzureDevOpsOrgsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, orgName, options),
  };
}

export function _getAzureDevOpsOrgsOperations(
  context: SecurityCenterContext,
): AzureDevOpsOrgsOperations {
  return {
    ..._getAzureDevOpsOrgs(context),
  };
}
