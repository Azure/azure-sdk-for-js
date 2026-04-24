// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, update, createOrUpdate, get } from "../../api/azureDevOpsRepos/operations.js";
import type {
  AzureDevOpsReposListOptionalParams,
  AzureDevOpsReposUpdateOptionalParams,
  AzureDevOpsReposCreateOrUpdateOptionalParams,
  AzureDevOpsReposGetOptionalParams,
} from "../../api/azureDevOpsRepos/options.js";
import type { SecurityConnectorsDevOpsAPIAzureDevOpsRepository } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureDevOpsRepos operations. */
export interface AzureDevOpsReposOperations {
  /** Returns a list of Azure DevOps repositories onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    options?: AzureDevOpsReposListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>;
  /** Updates a monitored Azure DevOps repository resource. */
  update: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
    SecurityConnectorsDevOpsAPIAzureDevOpsRepository
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
      SecurityConnectorsDevOpsAPIAzureDevOpsRepository
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>;
  /** Creates or updates a monitored Azure DevOps repository resource. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
    SecurityConnectorsDevOpsAPIAzureDevOpsRepository
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
      SecurityConnectorsDevOpsAPIAzureDevOpsRepository
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
    options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>;
  /** Returns a monitored Azure DevOps repository resource. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    repoName: string,
    options?: AzureDevOpsReposGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>;
}

function _getAzureDevOpsRepos(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      options?: AzureDevOpsReposListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, orgName, projectName, options),
    update: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      azureDevOpsRepository: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
      options?: AzureDevOpsReposCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        azureDevOpsRepository,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      repoName: string,
      options?: AzureDevOpsReposGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        repoName,
        options,
      ),
  };
}

export function _getAzureDevOpsReposOperations(
  context: SecurityCenterContext,
): AzureDevOpsReposOperations {
  return {
    ..._getAzureDevOpsRepos(context),
  };
}
