// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";

/**
 * resourceId - resource ID of API Management service "subscriptions/[subscription-id]/resourceGroups/[resource-group-name]/providers/Microsoft.ApiManagement/service/[service-name]"
 * managementApiEndpoint - URL with protocol (e.g. https://management.azure.com)
 * apiVersion - optional to override default (e.g. "2019-01-01")
 * tokenOverride - optional, provides token to use for auth, instead of 'az login' approach
 */
export type ServiceInformation = {
  resourceId: string;
  managementApiEndpoint: string;
  apiVersion?: string;
  tokenOverride?: string;
};

/**
 * Optional options object for configuring the deployment function.
 *
 * @param rootLocal - optional, root of the local folder with compiled project to be exported (by default "./dist")
 * @param interactiveBrowserCredentialOptions - options for InteractiveBrowserCredential for Node or InBrowser from \@azure/identity
 */
export type DeployConfig = {
  rootLocal?: string;
  interactiveBrowserCredentialOptions?: InteractiveBrowserCredentialNodeOptions;
};
