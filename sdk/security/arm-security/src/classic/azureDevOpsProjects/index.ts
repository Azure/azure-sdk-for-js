// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { list, update, createOrUpdate, get } from "../../api/azureDevOpsProjects/operations.js";
import type {
  AzureDevOpsProjectsListOptionalParams,
  AzureDevOpsProjectsUpdateOptionalParams,
  AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  AzureDevOpsProjectsGetOptionalParams,
} from "../../api/azureDevOpsProjects/options.js";
import type { SecurityConnectorsDevOpsAPIAzureDevOpsProject } from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureDevOpsProjects operations. */
export interface AzureDevOpsProjectsOperations {
  /** Returns a list of Azure DevOps projects onboarded to the connector. */
  list: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    options?: AzureDevOpsProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<SecurityConnectorsDevOpsAPIAzureDevOpsProject>;
  /** Updates a monitored Azure DevOps project resource. */
  update: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
    SecurityConnectorsDevOpsAPIAzureDevOpsProject
  >;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
      SecurityConnectorsDevOpsAPIAzureDevOpsProject
    >
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject>;
  /** Creates or updates a monitored Azure DevOps project resource. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<
    OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
    SecurityConnectorsDevOpsAPIAzureDevOpsProject
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
      SecurityConnectorsDevOpsAPIAzureDevOpsProject
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
    options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject>;
  /** Returns a monitored Azure DevOps project resource. */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    orgName: string,
    projectName: string,
    options?: AzureDevOpsProjectsGetOptionalParams,
  ) => Promise<SecurityConnectorsDevOpsAPIAzureDevOpsProject>;
}

function _getAzureDevOpsProjects(context: SecurityCenterContext) {
  return {
    list: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      options?: AzureDevOpsProjectsListOptionalParams,
    ) => list(context, resourceGroupName, securityConnectorName, orgName, options),
    update: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
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
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
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
      azureDevOpsProject: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
      options?: AzureDevOpsProjectsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        orgName,
        projectName,
        azureDevOpsProject,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      orgName: string,
      projectName: string,
      options?: AzureDevOpsProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, orgName, projectName, options),
  };
}

export function _getAzureDevOpsProjectsOperations(
  context: SecurityCenterContext,
): AzureDevOpsProjectsOperations {
  return {
    ..._getAzureDevOpsProjects(context),
  };
}
