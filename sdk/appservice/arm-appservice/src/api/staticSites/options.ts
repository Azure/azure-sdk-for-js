// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface StaticSitesPreviewWorkflowOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesValidateBackendForBuildOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesListLinkedBackendsForBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesUnlinkBackendFromBuildOptionalParams extends OperationOptions {
  /** Decides if auth will be removed from backend configuration */
  isCleaningAuthConfig?: boolean;
}

/** Optional parameters. */
export interface StaticSitesLinkBackendToBuildOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetLinkedBackendForBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesValidateBackendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesListLinkedBackendsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesUnlinkBackendOptionalParams extends OperationOptions {
  /** Decides if Easy Auth configuration will be removed from backend configuration */
  isCleaningAuthConfig?: boolean;
}

/** Optional parameters. */
export interface StaticSitesLinkBackendOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetLinkedBackendOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesListStaticSiteCustomDomainsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteStaticSiteCustomDomainOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetStaticSiteCustomDomainOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListBasicAuthOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateBasicAuthOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetBasicAuthOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specify <code>true</code> to force the update of the auth configuration on the function app even if an AzureStaticWebApps provider is already configured on the function app. The default is <code>false</code>. */
  isForced?: boolean;
}

/** Optional parameters. */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specify <code>true</code> to force the update of the auth configuration on the function app even if an AzureStaticWebApps provider is already configured on the function app. The default is <code>false</code>. */
  isForced?: boolean;
}

/** Optional parameters. */
export interface StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetDatabaseConnectionWithDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListDatabaseConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesUpdateDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListBuildDatabaseConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteBuildDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesUpdateBuildDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetBuildDatabaseConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteBuildAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteBuildFunctionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteBuildsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteStaticSiteBuildOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetStaticSiteBuildOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateZipDeploymentForStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesListDatabaseConnectionsWithDetailsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesResetStaticSiteApiKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesGetPrivateLinkResourcesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteFunctionAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteConfiguredRolesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteFunctionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDetachStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesCreateUserRolesInvitationLinkOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesUpdateStaticSiteUserOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteStaticSiteUserOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSiteUsersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListStaticSitesByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeleteStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesUpdateStaticSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesCreateOrUpdateStaticSiteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetStaticSiteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesListPrivateEndpointConnectionListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface StaticSitesDeletePrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface StaticSitesGetPrivateEndpointConnectionOptionalParams extends OperationOptions {}
