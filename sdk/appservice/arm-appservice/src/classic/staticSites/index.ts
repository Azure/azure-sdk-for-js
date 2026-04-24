// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext } from "../../api/webSiteManagementContext.js";
import {
  previewWorkflow,
  validateBackendForBuild,
  listLinkedBackendsForBuild,
  unlinkBackendFromBuild,
  linkBackendToBuild,
  getLinkedBackendForBuild,
  validateBackend,
  listLinkedBackends,
  unlinkBackend,
  linkBackend,
  getLinkedBackend,
  validateCustomDomainCanBeAddedToStaticSite,
  listStaticSiteCustomDomains,
  deleteStaticSiteCustomDomain,
  createOrUpdateStaticSiteCustomDomain,
  getStaticSiteCustomDomain,
  listBasicAuth,
  createOrUpdateBasicAuth,
  getBasicAuth,
  listUserProvidedFunctionAppsForStaticSite,
  detachUserProvidedFunctionAppFromStaticSite,
  registerUserProvidedFunctionAppWithStaticSite,
  getUserProvidedFunctionAppForStaticSite,
  listUserProvidedFunctionAppsForStaticSiteBuild,
  detachUserProvidedFunctionAppFromStaticSiteBuild,
  registerUserProvidedFunctionAppWithStaticSiteBuild,
  getUserProvidedFunctionAppForStaticSiteBuild,
  getDatabaseConnectionWithDetails,
  listDatabaseConnections,
  deleteDatabaseConnection,
  updateDatabaseConnection,
  createOrUpdateDatabaseConnection,
  getDatabaseConnection,
  getBuildDatabaseConnectionWithDetails,
  listBuildDatabaseConnections,
  deleteBuildDatabaseConnection,
  updateBuildDatabaseConnection,
  createOrUpdateBuildDatabaseConnection,
  getBuildDatabaseConnection,
  createZipDeploymentForStaticSiteBuild,
  listBuildDatabaseConnectionsWithDetails,
  listStaticSiteBuildFunctionAppSettings,
  listStaticSiteBuildAppSettings,
  listStaticSiteBuildFunctions,
  createOrUpdateStaticSiteBuildFunctionAppSettings,
  createOrUpdateStaticSiteBuildAppSettings,
  listStaticSiteBuilds,
  deleteStaticSiteBuild,
  getStaticSiteBuild,
  createZipDeploymentForStaticSite,
  listDatabaseConnectionsWithDetails,
  resetStaticSiteApiKey,
  getPrivateLinkResources,
  listStaticSiteSecrets,
  listStaticSiteFunctionAppSettings,
  listStaticSiteConfiguredRoles,
  listStaticSiteAppSettings,
  listStaticSiteFunctions,
  detachStaticSite,
  createUserRolesInvitationLink,
  createOrUpdateStaticSiteFunctionAppSettings,
  createOrUpdateStaticSiteAppSettings,
  updateStaticSiteUser,
  deleteStaticSiteUser,
  listStaticSiteUsers,
  list,
  listStaticSitesByResourceGroup,
  deleteStaticSite,
  updateStaticSite,
  createOrUpdateStaticSite,
  getStaticSite,
  listPrivateEndpointConnectionList,
  deletePrivateEndpointConnection,
  approveOrRejectPrivateEndpointConnection,
  getPrivateEndpointConnection,
} from "../../api/staticSites/operations.js";
import type {
  StaticSitesPreviewWorkflowOptionalParams,
  StaticSitesValidateBackendForBuildOptionalParams,
  StaticSitesListLinkedBackendsForBuildOptionalParams,
  StaticSitesUnlinkBackendFromBuildOptionalParams,
  StaticSitesLinkBackendToBuildOptionalParams,
  StaticSitesGetLinkedBackendForBuildOptionalParams,
  StaticSitesValidateBackendOptionalParams,
  StaticSitesListLinkedBackendsOptionalParams,
  StaticSitesUnlinkBackendOptionalParams,
  StaticSitesLinkBackendOptionalParams,
  StaticSitesGetLinkedBackendOptionalParams,
  StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
  StaticSitesListStaticSiteCustomDomainsOptionalParams,
  StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
  StaticSitesGetStaticSiteCustomDomainOptionalParams,
  StaticSitesListBasicAuthOptionalParams,
  StaticSitesCreateOrUpdateBasicAuthOptionalParams,
  StaticSitesGetBasicAuthOptionalParams,
  StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams,
  StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams,
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
  StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams,
  StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams,
  StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams,
  StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
  StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams,
  StaticSitesGetDatabaseConnectionWithDetailsOptionalParams,
  StaticSitesListDatabaseConnectionsOptionalParams,
  StaticSitesDeleteDatabaseConnectionOptionalParams,
  StaticSitesUpdateDatabaseConnectionOptionalParams,
  StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams,
  StaticSitesGetDatabaseConnectionOptionalParams,
  StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams,
  StaticSitesListBuildDatabaseConnectionsOptionalParams,
  StaticSitesDeleteBuildDatabaseConnectionOptionalParams,
  StaticSitesUpdateBuildDatabaseConnectionOptionalParams,
  StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams,
  StaticSitesGetBuildDatabaseConnectionOptionalParams,
  StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
  StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams,
  StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams,
  StaticSitesListStaticSiteBuildAppSettingsOptionalParams,
  StaticSitesListStaticSiteBuildFunctionsOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams,
  StaticSitesListStaticSiteBuildsOptionalParams,
  StaticSitesDeleteStaticSiteBuildOptionalParams,
  StaticSitesGetStaticSiteBuildOptionalParams,
  StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
  StaticSitesListDatabaseConnectionsWithDetailsOptionalParams,
  StaticSitesResetStaticSiteApiKeyOptionalParams,
  StaticSitesGetPrivateLinkResourcesOptionalParams,
  StaticSitesListStaticSiteSecretsOptionalParams,
  StaticSitesListStaticSiteFunctionAppSettingsOptionalParams,
  StaticSitesListStaticSiteConfiguredRolesOptionalParams,
  StaticSitesListStaticSiteAppSettingsOptionalParams,
  StaticSitesListStaticSiteFunctionsOptionalParams,
  StaticSitesDetachStaticSiteOptionalParams,
  StaticSitesCreateUserRolesInvitationLinkOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams,
  StaticSitesUpdateStaticSiteUserOptionalParams,
  StaticSitesDeleteStaticSiteUserOptionalParams,
  StaticSitesListStaticSiteUsersOptionalParams,
  StaticSitesListOptionalParams,
  StaticSitesListStaticSitesByResourceGroupOptionalParams,
  StaticSitesDeleteStaticSiteOptionalParams,
  StaticSitesUpdateStaticSiteOptionalParams,
  StaticSitesCreateOrUpdateStaticSiteOptionalParams,
  StaticSitesGetStaticSiteOptionalParams,
  StaticSitesListPrivateEndpointConnectionListOptionalParams,
  StaticSitesDeletePrivateEndpointConnectionOptionalParams,
  StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
  StaticSitesGetPrivateEndpointConnectionOptionalParams,
} from "../../api/staticSites/options.js";
import type {
  PrivateLinkResourcesWrapper,
  RemotePrivateEndpointConnectionARMResource,
  StaticSiteARMResource,
  StaticSitePatchResource,
  StaticSiteUserARMResource,
  StringDictionary,
  StaticSiteUserInvitationRequestResource,
  StaticSiteUserInvitationResponseResource,
  StaticSiteFunctionOverviewARMResource,
  StringList,
  StaticSiteResetPropertiesARMResource,
  DatabaseConnection,
  StaticSiteZipDeploymentARMResource,
  StaticSiteBuildARMResource,
  DatabaseConnectionPatchRequest,
  StaticSiteUserProvidedFunctionAppARMResource,
  StaticSiteBasicAuthPropertiesARMResource,
  BasicAuthName,
  StaticSiteCustomDomainOverviewARMResource,
  StaticSiteCustomDomainRequestPropertiesARMResource,
  StaticSiteLinkedBackendARMResource,
  StaticSitesWorkflowPreviewRequest,
  StaticSitesWorkflowPreview,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StaticSites operations. */
export interface StaticSitesOperations {
  /** Description for Generates a preview workflow file for the static site */
  previewWorkflow: (
    location: string,
    staticSitesWorkflowPreviewRequest: StaticSitesWorkflowPreviewRequest,
    options?: StaticSitesPreviewWorkflowOptionalParams,
  ) => Promise<StaticSitesWorkflowPreview>;
  /** Validates that a backend can be linked to a static site build */
  validateBackendForBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendForBuildOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateBackendForBuild instead */
  beginValidateBackendForBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendForBuildOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateBackendForBuild instead */
  beginValidateBackendForBuildAndWait: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendForBuildOptionalParams,
  ) => Promise<void>;
  /** Returns details of all backends linked to a static site build */
  listLinkedBackendsForBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListLinkedBackendsForBuildOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteLinkedBackendARMResource>;
  /** Unlink a backend from a static site build */
  unlinkBackendFromBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    options?: StaticSitesUnlinkBackendFromBuildOptionalParams,
  ) => Promise<void>;
  /** Link backend to a static site build */
  linkBackendToBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendToBuildOptionalParams,
  ) => PollerLike<
    OperationState<StaticSiteLinkedBackendARMResource>,
    StaticSiteLinkedBackendARMResource
  >;
  /** @deprecated use linkBackendToBuild instead */
  beginLinkBackendToBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendToBuildOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<StaticSiteLinkedBackendARMResource>,
      StaticSiteLinkedBackendARMResource
    >
  >;
  /** @deprecated use linkBackendToBuild instead */
  beginLinkBackendToBuildAndWait: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendToBuildOptionalParams,
  ) => Promise<StaticSiteLinkedBackendARMResource>;
  /** Returns the details of a linked backend linked to a static site build by name */
  getLinkedBackendForBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    linkedBackendName: string,
    options?: StaticSitesGetLinkedBackendForBuildOptionalParams,
  ) => Promise<StaticSiteLinkedBackendARMResource>;
  /** Validates that a backend can be linked to a static site */
  validateBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateBackend instead */
  beginValidateBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateBackend instead */
  beginValidateBackendAndWait: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesValidateBackendOptionalParams,
  ) => Promise<void>;
  /** Returns details of all backends linked to a static site */
  listLinkedBackends: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListLinkedBackendsOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteLinkedBackendARMResource>;
  /** Unlink a backend from a static site */
  unlinkBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    options?: StaticSitesUnlinkBackendOptionalParams,
  ) => Promise<void>;
  /** Link backend to a static site */
  linkBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendOptionalParams,
  ) => PollerLike<
    OperationState<StaticSiteLinkedBackendARMResource>,
    StaticSiteLinkedBackendARMResource
  >;
  /** @deprecated use linkBackend instead */
  beginLinkBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<StaticSiteLinkedBackendARMResource>,
      StaticSiteLinkedBackendARMResource
    >
  >;
  /** @deprecated use linkBackend instead */
  beginLinkBackendAndWait: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
    options?: StaticSitesLinkBackendOptionalParams,
  ) => Promise<StaticSiteLinkedBackendARMResource>;
  /** Returns the details of a linked backend linked to a static site by name */
  getLinkedBackend: (
    resourceGroupName: string,
    name: string,
    linkedBackendName: string,
    options?: StaticSitesGetLinkedBackendOptionalParams,
  ) => Promise<StaticSiteLinkedBackendARMResource>;
  /** Description for Validates a particular custom domain can be added to a static site. */
  validateCustomDomainCanBeAddedToStaticSite: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use validateCustomDomainCanBeAddedToStaticSite instead */
  beginValidateCustomDomainCanBeAddedToStaticSite: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use validateCustomDomainCanBeAddedToStaticSite instead */
  beginValidateCustomDomainCanBeAddedToStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
  ) => Promise<void>;
  /** Description for Gets all static site custom domains for a particular static site. */
  listStaticSiteCustomDomains: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteCustomDomainsOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteCustomDomainOverviewARMResource>;
  /** Description for Deletes a custom domain. */
  deleteStaticSiteCustomDomain: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteStaticSiteCustomDomain instead */
  beginDeleteStaticSiteCustomDomain: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteStaticSiteCustomDomain instead */
  beginDeleteStaticSiteCustomDomainAndWait: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new static site custom domain in an existing resource group and static site. */
  createOrUpdateStaticSiteCustomDomain: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
  ) => PollerLike<
    OperationState<StaticSiteCustomDomainOverviewARMResource>,
    StaticSiteCustomDomainOverviewARMResource
  >;
  /** @deprecated use createOrUpdateStaticSiteCustomDomain instead */
  beginCreateOrUpdateStaticSiteCustomDomain: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<StaticSiteCustomDomainOverviewARMResource>,
      StaticSiteCustomDomainOverviewARMResource
    >
  >;
  /** @deprecated use createOrUpdateStaticSiteCustomDomain instead */
  beginCreateOrUpdateStaticSiteCustomDomainAndWait: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
  ) => Promise<StaticSiteCustomDomainOverviewARMResource>;
  /** Description for Gets an existing custom domain for a particular static site. */
  getStaticSiteCustomDomain: (
    resourceGroupName: string,
    name: string,
    domainName: string,
    options?: StaticSitesGetStaticSiteCustomDomainOptionalParams,
  ) => Promise<StaticSiteCustomDomainOverviewARMResource>;
  /** Description for Gets the basic auth properties for a static site as a collection. */
  listBasicAuth: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListBasicAuthOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteBasicAuthPropertiesARMResource>;
  /** Description for Adds or updates basic auth for a static site. */
  createOrUpdateBasicAuth: (
    resourceGroupName: string,
    name: string,
    basicAuthName: BasicAuthName,
    basicAuthEnvelope: StaticSiteBasicAuthPropertiesARMResource,
    options?: StaticSitesCreateOrUpdateBasicAuthOptionalParams,
  ) => Promise<StaticSiteBasicAuthPropertiesARMResource>;
  /** Description for Gets the basic auth properties for a static site. */
  getBasicAuth: (
    resourceGroupName: string,
    name: string,
    basicAuthName: BasicAuthName,
    options?: StaticSitesGetBasicAuthOptionalParams,
  ) => Promise<StaticSiteBasicAuthPropertiesARMResource>;
  /** Description for Gets the details of the user provided function apps registered with a static site */
  listUserProvidedFunctionAppsForStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Description for Detach the user provided function app from the static site */
  detachUserProvidedFunctionAppFromStaticSite: (
    resourceGroupName: string,
    name: string,
    functionAppName: string,
    options?: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams,
  ) => Promise<void>;
  /** Description for Register a user provided function app with a static site */
  registerUserProvidedFunctionAppWithStaticSite: (
    resourceGroupName: string,
    name: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
  ) => PollerLike<
    OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
    StaticSiteUserProvidedFunctionAppARMResource
  >;
  /** @deprecated use registerUserProvidedFunctionAppWithStaticSite instead */
  beginRegisterUserProvidedFunctionAppWithStaticSite: (
    resourceGroupName: string,
    name: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
      StaticSiteUserProvidedFunctionAppARMResource
    >
  >;
  /** @deprecated use registerUserProvidedFunctionAppWithStaticSite instead */
  beginRegisterUserProvidedFunctionAppWithStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
  ) => Promise<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Description for Gets the details of the user provided function app registered with a static site */
  getUserProvidedFunctionAppForStaticSite: (
    resourceGroupName: string,
    name: string,
    functionAppName: string,
    options?: StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams,
  ) => Promise<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Description for Gets the details of the user provided function apps registered with a static site build */
  listUserProvidedFunctionAppsForStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Description for Detach the user provided function app from the static site build */
  detachUserProvidedFunctionAppFromStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    functionAppName: string,
    options?: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams,
  ) => Promise<void>;
  /** Description for Register a user provided function app with a static site build */
  registerUserProvidedFunctionAppWithStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
  ) => PollerLike<
    OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
    StaticSiteUserProvidedFunctionAppARMResource
  >;
  /** @deprecated use registerUserProvidedFunctionAppWithStaticSiteBuild instead */
  beginRegisterUserProvidedFunctionAppWithStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
      StaticSiteUserProvidedFunctionAppARMResource
    >
  >;
  /** @deprecated use registerUserProvidedFunctionAppWithStaticSiteBuild instead */
  beginRegisterUserProvidedFunctionAppWithStaticSiteBuildAndWait: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    functionAppName: string,
    staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
    options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
  ) => Promise<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Description for Gets the details of the user provided function app registered with a static site build */
  getUserProvidedFunctionAppForStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    functionAppName: string,
    options?: StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams,
  ) => Promise<StaticSiteUserProvidedFunctionAppARMResource>;
  /** Returns details of a database connection for a static site by name */
  getDatabaseConnectionWithDetails: (
    resourceGroupName: string,
    name: string,
    databaseConnectionName: string,
    options?: StaticSitesGetDatabaseConnectionWithDetailsOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Returns overviews of database connections for a static site */
  listDatabaseConnections: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListDatabaseConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseConnection>;
  /** Delete a database connection for a static site */
  deleteDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    databaseConnectionName: string,
    options?: StaticSitesDeleteDatabaseConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Create or update a database connection for a static site */
  updateDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    databaseConnectionName: string,
    databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
    options?: StaticSitesUpdateDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Description for Create or update a database connection for a static site */
  createOrUpdateDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    databaseConnectionName: string,
    databaseConnectionRequestEnvelope: DatabaseConnection,
    options?: StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Returns overview of a database connection for a static site by name */
  getDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    databaseConnectionName: string,
    options?: StaticSitesGetDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Returns details of a database connection for a static site build by name */
  getBuildDatabaseConnectionWithDetails: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    databaseConnectionName: string,
    options?: StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Returns overviews of database connections for a static site build */
  listBuildDatabaseConnections: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListBuildDatabaseConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseConnection>;
  /** Delete a database connection for a static site build */
  deleteBuildDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    databaseConnectionName: string,
    options?: StaticSitesDeleteBuildDatabaseConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Create or update a database connection for a static site build */
  updateBuildDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    databaseConnectionName: string,
    databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
    options?: StaticSitesUpdateBuildDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Description for Create or update a database connection for a static site build */
  createOrUpdateBuildDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    databaseConnectionName: string,
    databaseConnectionRequestEnvelope: DatabaseConnection,
    options?: StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Returns overview of a database connection for a static site build by name */
  getBuildDatabaseConnection: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    databaseConnectionName: string,
    options?: StaticSitesGetBuildDatabaseConnectionOptionalParams,
  ) => Promise<DatabaseConnection>;
  /** Description for Deploys zipped content to a specific environment of a static site. */
  createZipDeploymentForStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createZipDeploymentForStaticSiteBuild instead */
  beginCreateZipDeploymentForStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createZipDeploymentForStaticSiteBuild instead */
  beginCreateZipDeploymentForStaticSiteBuildAndWait: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
  ) => Promise<void>;
  /** Returns details of database connections for a static site build */
  listBuildDatabaseConnectionsWithDetails: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseConnection>;
  /** Description for Gets the application settings of a static site build. */
  listStaticSiteBuildFunctionAppSettings: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the application settings of a static site build. */
  listStaticSiteBuildAppSettings: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListStaticSiteBuildAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the functions of a particular static site build. */
  listStaticSiteBuildFunctions: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesListStaticSiteBuildFunctionsOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteFunctionOverviewARMResource>;
  /** Description for Creates or updates the function app settings of a static site build. */
  createOrUpdateStaticSiteBuildFunctionAppSettings: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    appSettings: StringDictionary,
    options?: StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Creates or updates the app settings of a static site build. */
  createOrUpdateStaticSiteBuildAppSettings: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    appSettings: StringDictionary,
    options?: StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets all static site builds for a particular static site. */
  listStaticSiteBuilds: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteBuildsOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteBuildARMResource>;
  /** Description for Deletes a static site build. */
  deleteStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteStaticSiteBuild instead */
  beginDeleteStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteStaticSiteBuild instead */
  beginDeleteStaticSiteBuildAndWait: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the details of a static site build. */
  getStaticSiteBuild: (
    resourceGroupName: string,
    name: string,
    environmentName: string,
    options?: StaticSitesGetStaticSiteBuildOptionalParams,
  ) => Promise<StaticSiteBuildARMResource>;
  /** Description for Deploys zipped content to a static site. */
  createZipDeploymentForStaticSite: (
    resourceGroupName: string,
    name: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createZipDeploymentForStaticSite instead */
  beginCreateZipDeploymentForStaticSite: (
    resourceGroupName: string,
    name: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createZipDeploymentForStaticSite instead */
  beginCreateZipDeploymentForStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
    options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
  ) => Promise<void>;
  /** Returns details of database connections for a static site */
  listDatabaseConnectionsWithDetails: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListDatabaseConnectionsWithDetailsOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseConnection>;
  /** Description for Resets the api key for an existing static site. */
  resetStaticSiteApiKey: (
    resourceGroupName: string,
    name: string,
    resetPropertiesEnvelope: StaticSiteResetPropertiesARMResource,
    options?: StaticSitesResetStaticSiteApiKeyOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the private link resources */
  getPrivateLinkResources: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesGetPrivateLinkResourcesOptionalParams,
  ) => Promise<PrivateLinkResourcesWrapper>;
  /** Description for Lists the secrets for an existing static site. */
  listStaticSiteSecrets: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteSecretsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the application settings of a static site. */
  listStaticSiteFunctionAppSettings: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteFunctionAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Lists the roles configured for the static site. */
  listStaticSiteConfiguredRoles: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteConfiguredRolesOptionalParams,
  ) => Promise<StringList>;
  /** Description for Gets the application settings of a static site. */
  listStaticSiteAppSettings: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Gets the functions of a static site. */
  listStaticSiteFunctions: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListStaticSiteFunctionsOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteFunctionOverviewARMResource>;
  /** Description for Detaches a static site. */
  detachStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDetachStaticSiteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use detachStaticSite instead */
  beginDetachStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDetachStaticSiteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use detachStaticSite instead */
  beginDetachStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDetachStaticSiteOptionalParams,
  ) => Promise<void>;
  /** Description for Creates an invitation link for a user with the role */
  createUserRolesInvitationLink: (
    resourceGroupName: string,
    name: string,
    staticSiteUserRolesInvitationEnvelope: StaticSiteUserInvitationRequestResource,
    options?: StaticSitesCreateUserRolesInvitationLinkOptionalParams,
  ) => Promise<StaticSiteUserInvitationResponseResource>;
  /** Description for Creates or updates the function app settings of a static site. */
  createOrUpdateStaticSiteFunctionAppSettings: (
    resourceGroupName: string,
    name: string,
    appSettings: StringDictionary,
    options?: StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Creates or updates the app settings of a static site. */
  createOrUpdateStaticSiteAppSettings: (
    resourceGroupName: string,
    name: string,
    appSettings: StringDictionary,
    options?: StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams,
  ) => Promise<StringDictionary>;
  /** Description for Updates a user entry with the listed roles */
  updateStaticSiteUser: (
    resourceGroupName: string,
    name: string,
    authprovider: string,
    userid: string,
    staticSiteUserEnvelope: StaticSiteUserARMResource,
    options?: StaticSitesUpdateStaticSiteUserOptionalParams,
  ) => Promise<StaticSiteUserARMResource>;
  /** Description for Deletes the user entry from the static site. */
  deleteStaticSiteUser: (
    resourceGroupName: string,
    name: string,
    authprovider: string,
    userid: string,
    options?: StaticSitesDeleteStaticSiteUserOptionalParams,
  ) => Promise<void>;
  /** Description for Gets the list of users of a static site. */
  listStaticSiteUsers: (
    resourceGroupName: string,
    name: string,
    authprovider: string,
    options?: StaticSitesListStaticSiteUsersOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteUserARMResource>;
  /** Description for Get all Static Sites for a subscription. */
  list: (
    options?: StaticSitesListOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteARMResource>;
  /** Description for Gets all static sites in the specified resource group. */
  listStaticSitesByResourceGroup: (
    resourceGroupName: string,
    options?: StaticSitesListStaticSitesByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StaticSiteARMResource>;
  /** Description for Deletes a static site. */
  deleteStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDeleteStaticSiteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteStaticSite instead */
  beginDeleteStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDeleteStaticSiteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteStaticSite instead */
  beginDeleteStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesDeleteStaticSiteOptionalParams,
  ) => Promise<void>;
  /** Description for Creates a new static site in an existing resource group, or updates an existing static site. */
  updateStaticSite: (
    resourceGroupName: string,
    name: string,
    staticSiteEnvelope: StaticSitePatchResource,
    options?: StaticSitesUpdateStaticSiteOptionalParams,
  ) => Promise<StaticSiteARMResource>;
  /** Description for Creates a new static site in an existing resource group, or updates an existing static site. */
  createOrUpdateStaticSite: (
    resourceGroupName: string,
    name: string,
    staticSiteEnvelope: StaticSiteARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
  ) => PollerLike<OperationState<StaticSiteARMResource>, StaticSiteARMResource>;
  /** @deprecated use createOrUpdateStaticSite instead */
  beginCreateOrUpdateStaticSite: (
    resourceGroupName: string,
    name: string,
    staticSiteEnvelope: StaticSiteARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StaticSiteARMResource>, StaticSiteARMResource>>;
  /** @deprecated use createOrUpdateStaticSite instead */
  beginCreateOrUpdateStaticSiteAndWait: (
    resourceGroupName: string,
    name: string,
    staticSiteEnvelope: StaticSiteARMResource,
    options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
  ) => Promise<StaticSiteARMResource>;
  /** Description for Gets the details of a static site. */
  getStaticSite: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesGetStaticSiteOptionalParams,
  ) => Promise<StaticSiteARMResource>;
  /** Description for Gets the list of private endpoint connections associated with a static site */
  listPrivateEndpointConnectionList: (
    resourceGroupName: string,
    name: string,
    options?: StaticSitesListPrivateEndpointConnectionListOptionalParams,
  ) => PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Deletes a private endpoint connection */
  deletePrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deletePrivateEndpointConnection instead */
  beginDeletePrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
  ) => Promise<void>;
  /** Description for Approves or rejects a private endpoint connection */
  approveOrRejectPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnection instead */
  beginApproveOrRejectPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<RemotePrivateEndpointConnectionARMResource>,
      RemotePrivateEndpointConnectionARMResource
    >
  >;
  /** @deprecated use approveOrRejectPrivateEndpointConnection instead */
  beginApproveOrRejectPrivateEndpointConnectionAndWait: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
    options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
  /** Description for Gets a private endpoint connection */
  getPrivateEndpointConnection: (
    resourceGroupName: string,
    name: string,
    privateEndpointConnectionName: string,
    options?: StaticSitesGetPrivateEndpointConnectionOptionalParams,
  ) => Promise<RemotePrivateEndpointConnectionARMResource>;
}

function _getStaticSites(context: WebSiteManagementContext) {
  return {
    previewWorkflow: (
      location: string,
      staticSitesWorkflowPreviewRequest: StaticSitesWorkflowPreviewRequest,
      options?: StaticSitesPreviewWorkflowOptionalParams,
    ) => previewWorkflow(context, location, staticSitesWorkflowPreviewRequest, options),
    validateBackendForBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendForBuildOptionalParams,
    ) =>
      validateBackendForBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    beginValidateBackendForBuild: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendForBuildOptionalParams,
    ) => {
      const poller = validateBackendForBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateBackendForBuildAndWait: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendForBuildOptionalParams,
    ) => {
      return await validateBackendForBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
    },
    listLinkedBackendsForBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListLinkedBackendsForBuildOptionalParams,
    ) => listLinkedBackendsForBuild(context, resourceGroupName, name, environmentName, options),
    unlinkBackendFromBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      options?: StaticSitesUnlinkBackendFromBuildOptionalParams,
    ) =>
      unlinkBackendFromBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        options,
      ),
    linkBackendToBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendToBuildOptionalParams,
    ) =>
      linkBackendToBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    beginLinkBackendToBuild: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendToBuildOptionalParams,
    ) => {
      const poller = linkBackendToBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLinkBackendToBuildAndWait: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendToBuildOptionalParams,
    ) => {
      return await linkBackendToBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
    },
    getLinkedBackendForBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      linkedBackendName: string,
      options?: StaticSitesGetLinkedBackendForBuildOptionalParams,
    ) =>
      getLinkedBackendForBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        options,
      ),
    validateBackend: (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendOptionalParams,
    ) =>
      validateBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    beginValidateBackend: async (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendOptionalParams,
    ) => {
      const poller = validateBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateBackendAndWait: async (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesValidateBackendOptionalParams,
    ) => {
      return await validateBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
    },
    listLinkedBackends: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListLinkedBackendsOptionalParams,
    ) => listLinkedBackends(context, resourceGroupName, name, options),
    unlinkBackend: (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      options?: StaticSitesUnlinkBackendOptionalParams,
    ) => unlinkBackend(context, resourceGroupName, name, linkedBackendName, options),
    linkBackend: (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendOptionalParams,
    ) =>
      linkBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    beginLinkBackend: async (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendOptionalParams,
    ) => {
      const poller = linkBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginLinkBackendAndWait: async (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
      options?: StaticSitesLinkBackendOptionalParams,
    ) => {
      return await linkBackend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      );
    },
    getLinkedBackend: (
      resourceGroupName: string,
      name: string,
      linkedBackendName: string,
      options?: StaticSitesGetLinkedBackendOptionalParams,
    ) => getLinkedBackend(context, resourceGroupName, name, linkedBackendName, options),
    validateCustomDomainCanBeAddedToStaticSite: (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
    ) =>
      validateCustomDomainCanBeAddedToStaticSite(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      ),
    beginValidateCustomDomainCanBeAddedToStaticSite: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
    ) => {
      const poller = validateCustomDomainCanBeAddedToStaticSite(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateCustomDomainCanBeAddedToStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams,
    ) => {
      return await validateCustomDomainCanBeAddedToStaticSite(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      );
    },
    listStaticSiteCustomDomains: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteCustomDomainsOptionalParams,
    ) => listStaticSiteCustomDomains(context, resourceGroupName, name, options),
    deleteStaticSiteCustomDomain: (
      resourceGroupName: string,
      name: string,
      domainName: string,
      options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
    ) => deleteStaticSiteCustomDomain(context, resourceGroupName, name, domainName, options),
    beginDeleteStaticSiteCustomDomain: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
    ) => {
      const poller = deleteStaticSiteCustomDomain(
        context,
        resourceGroupName,
        name,
        domainName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteStaticSiteCustomDomainAndWait: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      options?: StaticSitesDeleteStaticSiteCustomDomainOptionalParams,
    ) => {
      return await deleteStaticSiteCustomDomain(
        context,
        resourceGroupName,
        name,
        domainName,
        options,
      );
    },
    createOrUpdateStaticSiteCustomDomain: (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
    ) =>
      createOrUpdateStaticSiteCustomDomain(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      ),
    beginCreateOrUpdateStaticSiteCustomDomain: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
    ) => {
      const poller = createOrUpdateStaticSiteCustomDomain(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateStaticSiteCustomDomainAndWait: async (
      resourceGroupName: string,
      name: string,
      domainName: string,
      staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams,
    ) => {
      return await createOrUpdateStaticSiteCustomDomain(
        context,
        resourceGroupName,
        name,
        domainName,
        staticSiteCustomDomainRequestPropertiesEnvelope,
        options,
      );
    },
    getStaticSiteCustomDomain: (
      resourceGroupName: string,
      name: string,
      domainName: string,
      options?: StaticSitesGetStaticSiteCustomDomainOptionalParams,
    ) => getStaticSiteCustomDomain(context, resourceGroupName, name, domainName, options),
    listBasicAuth: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListBasicAuthOptionalParams,
    ) => listBasicAuth(context, resourceGroupName, name, options),
    createOrUpdateBasicAuth: (
      resourceGroupName: string,
      name: string,
      basicAuthName: BasicAuthName,
      basicAuthEnvelope: StaticSiteBasicAuthPropertiesARMResource,
      options?: StaticSitesCreateOrUpdateBasicAuthOptionalParams,
    ) =>
      createOrUpdateBasicAuth(
        context,
        resourceGroupName,
        name,
        basicAuthName,
        basicAuthEnvelope,
        options,
      ),
    getBasicAuth: (
      resourceGroupName: string,
      name: string,
      basicAuthName: BasicAuthName,
      options?: StaticSitesGetBasicAuthOptionalParams,
    ) => getBasicAuth(context, resourceGroupName, name, basicAuthName, options),
    listUserProvidedFunctionAppsForStaticSite: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams,
    ) => listUserProvidedFunctionAppsForStaticSite(context, resourceGroupName, name, options),
    detachUserProvidedFunctionAppFromStaticSite: (
      resourceGroupName: string,
      name: string,
      functionAppName: string,
      options?: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams,
    ) =>
      detachUserProvidedFunctionAppFromStaticSite(
        context,
        resourceGroupName,
        name,
        functionAppName,
        options,
      ),
    registerUserProvidedFunctionAppWithStaticSite: (
      resourceGroupName: string,
      name: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
    ) =>
      registerUserProvidedFunctionAppWithStaticSite(
        context,
        resourceGroupName,
        name,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      ),
    beginRegisterUserProvidedFunctionAppWithStaticSite: async (
      resourceGroupName: string,
      name: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
    ) => {
      const poller = registerUserProvidedFunctionAppWithStaticSite(
        context,
        resourceGroupName,
        name,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegisterUserProvidedFunctionAppWithStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams,
    ) => {
      return await registerUserProvidedFunctionAppWithStaticSite(
        context,
        resourceGroupName,
        name,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      );
    },
    getUserProvidedFunctionAppForStaticSite: (
      resourceGroupName: string,
      name: string,
      functionAppName: string,
      options?: StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams,
    ) =>
      getUserProvidedFunctionAppForStaticSite(
        context,
        resourceGroupName,
        name,
        functionAppName,
        options,
      ),
    listUserProvidedFunctionAppsForStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams,
    ) =>
      listUserProvidedFunctionAppsForStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      ),
    detachUserProvidedFunctionAppFromStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      functionAppName: string,
      options?: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams,
    ) =>
      detachUserProvidedFunctionAppFromStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        options,
      ),
    registerUserProvidedFunctionAppWithStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
    ) =>
      registerUserProvidedFunctionAppWithStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      ),
    beginRegisterUserProvidedFunctionAppWithStaticSiteBuild: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
    ) => {
      const poller = registerUserProvidedFunctionAppWithStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegisterUserProvidedFunctionAppWithStaticSiteBuildAndWait: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      functionAppName: string,
      staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
      options?: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams,
    ) => {
      return await registerUserProvidedFunctionAppWithStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        staticSiteUserProvidedFunctionEnvelope,
        options,
      );
    },
    getUserProvidedFunctionAppForStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      functionAppName: string,
      options?: StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams,
    ) =>
      getUserProvidedFunctionAppForStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        options,
      ),
    getDatabaseConnectionWithDetails: (
      resourceGroupName: string,
      name: string,
      databaseConnectionName: string,
      options?: StaticSitesGetDatabaseConnectionWithDetailsOptionalParams,
    ) =>
      getDatabaseConnectionWithDetails(
        context,
        resourceGroupName,
        name,
        databaseConnectionName,
        options,
      ),
    listDatabaseConnections: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListDatabaseConnectionsOptionalParams,
    ) => listDatabaseConnections(context, resourceGroupName, name, options),
    deleteDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      databaseConnectionName: string,
      options?: StaticSitesDeleteDatabaseConnectionOptionalParams,
    ) =>
      deleteDatabaseConnection(context, resourceGroupName, name, databaseConnectionName, options),
    updateDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      databaseConnectionName: string,
      databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
      options?: StaticSitesUpdateDatabaseConnectionOptionalParams,
    ) =>
      updateDatabaseConnection(
        context,
        resourceGroupName,
        name,
        databaseConnectionName,
        databaseConnectionRequestEnvelope,
        options,
      ),
    createOrUpdateDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      databaseConnectionName: string,
      databaseConnectionRequestEnvelope: DatabaseConnection,
      options?: StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams,
    ) =>
      createOrUpdateDatabaseConnection(
        context,
        resourceGroupName,
        name,
        databaseConnectionName,
        databaseConnectionRequestEnvelope,
        options,
      ),
    getDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      databaseConnectionName: string,
      options?: StaticSitesGetDatabaseConnectionOptionalParams,
    ) => getDatabaseConnection(context, resourceGroupName, name, databaseConnectionName, options),
    getBuildDatabaseConnectionWithDetails: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      databaseConnectionName: string,
      options?: StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams,
    ) =>
      getBuildDatabaseConnectionWithDetails(
        context,
        resourceGroupName,
        name,
        environmentName,
        databaseConnectionName,
        options,
      ),
    listBuildDatabaseConnections: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListBuildDatabaseConnectionsOptionalParams,
    ) => listBuildDatabaseConnections(context, resourceGroupName, name, environmentName, options),
    deleteBuildDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      databaseConnectionName: string,
      options?: StaticSitesDeleteBuildDatabaseConnectionOptionalParams,
    ) =>
      deleteBuildDatabaseConnection(
        context,
        resourceGroupName,
        name,
        environmentName,
        databaseConnectionName,
        options,
      ),
    updateBuildDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      databaseConnectionName: string,
      databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
      options?: StaticSitesUpdateBuildDatabaseConnectionOptionalParams,
    ) =>
      updateBuildDatabaseConnection(
        context,
        resourceGroupName,
        name,
        environmentName,
        databaseConnectionName,
        databaseConnectionRequestEnvelope,
        options,
      ),
    createOrUpdateBuildDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      databaseConnectionName: string,
      databaseConnectionRequestEnvelope: DatabaseConnection,
      options?: StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams,
    ) =>
      createOrUpdateBuildDatabaseConnection(
        context,
        resourceGroupName,
        name,
        environmentName,
        databaseConnectionName,
        databaseConnectionRequestEnvelope,
        options,
      ),
    getBuildDatabaseConnection: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      databaseConnectionName: string,
      options?: StaticSitesGetBuildDatabaseConnectionOptionalParams,
    ) =>
      getBuildDatabaseConnection(
        context,
        resourceGroupName,
        name,
        environmentName,
        databaseConnectionName,
        options,
      ),
    createZipDeploymentForStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
    ) =>
      createZipDeploymentForStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        staticSiteZipDeploymentEnvelope,
        options,
      ),
    beginCreateZipDeploymentForStaticSiteBuild: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
    ) => {
      const poller = createZipDeploymentForStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        staticSiteZipDeploymentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateZipDeploymentForStaticSiteBuildAndWait: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams,
    ) => {
      return await createZipDeploymentForStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        staticSiteZipDeploymentEnvelope,
        options,
      );
    },
    listBuildDatabaseConnectionsWithDetails: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams,
    ) =>
      listBuildDatabaseConnectionsWithDetails(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      ),
    listStaticSiteBuildFunctionAppSettings: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams,
    ) =>
      listStaticSiteBuildFunctionAppSettings(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      ),
    listStaticSiteBuildAppSettings: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListStaticSiteBuildAppSettingsOptionalParams,
    ) => listStaticSiteBuildAppSettings(context, resourceGroupName, name, environmentName, options),
    listStaticSiteBuildFunctions: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesListStaticSiteBuildFunctionsOptionalParams,
    ) => listStaticSiteBuildFunctions(context, resourceGroupName, name, environmentName, options),
    createOrUpdateStaticSiteBuildFunctionAppSettings: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      appSettings: StringDictionary,
      options?: StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams,
    ) =>
      createOrUpdateStaticSiteBuildFunctionAppSettings(
        context,
        resourceGroupName,
        name,
        environmentName,
        appSettings,
        options,
      ),
    createOrUpdateStaticSiteBuildAppSettings: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      appSettings: StringDictionary,
      options?: StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams,
    ) =>
      createOrUpdateStaticSiteBuildAppSettings(
        context,
        resourceGroupName,
        name,
        environmentName,
        appSettings,
        options,
      ),
    listStaticSiteBuilds: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteBuildsOptionalParams,
    ) => listStaticSiteBuilds(context, resourceGroupName, name, options),
    deleteStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
    ) => deleteStaticSiteBuild(context, resourceGroupName, name, environmentName, options),
    beginDeleteStaticSiteBuild: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
    ) => {
      const poller = deleteStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteStaticSiteBuildAndWait: async (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesDeleteStaticSiteBuildOptionalParams,
    ) => {
      return await deleteStaticSiteBuild(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      );
    },
    getStaticSiteBuild: (
      resourceGroupName: string,
      name: string,
      environmentName: string,
      options?: StaticSitesGetStaticSiteBuildOptionalParams,
    ) => getStaticSiteBuild(context, resourceGroupName, name, environmentName, options),
    createZipDeploymentForStaticSite: (
      resourceGroupName: string,
      name: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
    ) =>
      createZipDeploymentForStaticSite(
        context,
        resourceGroupName,
        name,
        staticSiteZipDeploymentEnvelope,
        options,
      ),
    beginCreateZipDeploymentForStaticSite: async (
      resourceGroupName: string,
      name: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
    ) => {
      const poller = createZipDeploymentForStaticSite(
        context,
        resourceGroupName,
        name,
        staticSiteZipDeploymentEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateZipDeploymentForStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
      options?: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams,
    ) => {
      return await createZipDeploymentForStaticSite(
        context,
        resourceGroupName,
        name,
        staticSiteZipDeploymentEnvelope,
        options,
      );
    },
    listDatabaseConnectionsWithDetails: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListDatabaseConnectionsWithDetailsOptionalParams,
    ) => listDatabaseConnectionsWithDetails(context, resourceGroupName, name, options),
    resetStaticSiteApiKey: (
      resourceGroupName: string,
      name: string,
      resetPropertiesEnvelope: StaticSiteResetPropertiesARMResource,
      options?: StaticSitesResetStaticSiteApiKeyOptionalParams,
    ) => resetStaticSiteApiKey(context, resourceGroupName, name, resetPropertiesEnvelope, options),
    getPrivateLinkResources: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesGetPrivateLinkResourcesOptionalParams,
    ) => getPrivateLinkResources(context, resourceGroupName, name, options),
    listStaticSiteSecrets: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteSecretsOptionalParams,
    ) => listStaticSiteSecrets(context, resourceGroupName, name, options),
    listStaticSiteFunctionAppSettings: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteFunctionAppSettingsOptionalParams,
    ) => listStaticSiteFunctionAppSettings(context, resourceGroupName, name, options),
    listStaticSiteConfiguredRoles: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteConfiguredRolesOptionalParams,
    ) => listStaticSiteConfiguredRoles(context, resourceGroupName, name, options),
    listStaticSiteAppSettings: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteAppSettingsOptionalParams,
    ) => listStaticSiteAppSettings(context, resourceGroupName, name, options),
    listStaticSiteFunctions: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListStaticSiteFunctionsOptionalParams,
    ) => listStaticSiteFunctions(context, resourceGroupName, name, options),
    detachStaticSite: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDetachStaticSiteOptionalParams,
    ) => detachStaticSite(context, resourceGroupName, name, options),
    beginDetachStaticSite: async (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDetachStaticSiteOptionalParams,
    ) => {
      const poller = detachStaticSite(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDetachStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDetachStaticSiteOptionalParams,
    ) => {
      return await detachStaticSite(context, resourceGroupName, name, options);
    },
    createUserRolesInvitationLink: (
      resourceGroupName: string,
      name: string,
      staticSiteUserRolesInvitationEnvelope: StaticSiteUserInvitationRequestResource,
      options?: StaticSitesCreateUserRolesInvitationLinkOptionalParams,
    ) =>
      createUserRolesInvitationLink(
        context,
        resourceGroupName,
        name,
        staticSiteUserRolesInvitationEnvelope,
        options,
      ),
    createOrUpdateStaticSiteFunctionAppSettings: (
      resourceGroupName: string,
      name: string,
      appSettings: StringDictionary,
      options?: StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams,
    ) =>
      createOrUpdateStaticSiteFunctionAppSettings(
        context,
        resourceGroupName,
        name,
        appSettings,
        options,
      ),
    createOrUpdateStaticSiteAppSettings: (
      resourceGroupName: string,
      name: string,
      appSettings: StringDictionary,
      options?: StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams,
    ) =>
      createOrUpdateStaticSiteAppSettings(context, resourceGroupName, name, appSettings, options),
    updateStaticSiteUser: (
      resourceGroupName: string,
      name: string,
      authprovider: string,
      userid: string,
      staticSiteUserEnvelope: StaticSiteUserARMResource,
      options?: StaticSitesUpdateStaticSiteUserOptionalParams,
    ) =>
      updateStaticSiteUser(
        context,
        resourceGroupName,
        name,
        authprovider,
        userid,
        staticSiteUserEnvelope,
        options,
      ),
    deleteStaticSiteUser: (
      resourceGroupName: string,
      name: string,
      authprovider: string,
      userid: string,
      options?: StaticSitesDeleteStaticSiteUserOptionalParams,
    ) => deleteStaticSiteUser(context, resourceGroupName, name, authprovider, userid, options),
    listStaticSiteUsers: (
      resourceGroupName: string,
      name: string,
      authprovider: string,
      options?: StaticSitesListStaticSiteUsersOptionalParams,
    ) => listStaticSiteUsers(context, resourceGroupName, name, authprovider, options),
    list: (options?: StaticSitesListOptionalParams) => list(context, options),
    listStaticSitesByResourceGroup: (
      resourceGroupName: string,
      options?: StaticSitesListStaticSitesByResourceGroupOptionalParams,
    ) => listStaticSitesByResourceGroup(context, resourceGroupName, options),
    deleteStaticSite: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDeleteStaticSiteOptionalParams,
    ) => deleteStaticSite(context, resourceGroupName, name, options),
    beginDeleteStaticSite: async (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDeleteStaticSiteOptionalParams,
    ) => {
      const poller = deleteStaticSite(context, resourceGroupName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesDeleteStaticSiteOptionalParams,
    ) => {
      return await deleteStaticSite(context, resourceGroupName, name, options);
    },
    updateStaticSite: (
      resourceGroupName: string,
      name: string,
      staticSiteEnvelope: StaticSitePatchResource,
      options?: StaticSitesUpdateStaticSiteOptionalParams,
    ) => updateStaticSite(context, resourceGroupName, name, staticSiteEnvelope, options),
    createOrUpdateStaticSite: (
      resourceGroupName: string,
      name: string,
      staticSiteEnvelope: StaticSiteARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
    ) => createOrUpdateStaticSite(context, resourceGroupName, name, staticSiteEnvelope, options),
    beginCreateOrUpdateStaticSite: async (
      resourceGroupName: string,
      name: string,
      staticSiteEnvelope: StaticSiteARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
    ) => {
      const poller = createOrUpdateStaticSite(
        context,
        resourceGroupName,
        name,
        staticSiteEnvelope,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateStaticSiteAndWait: async (
      resourceGroupName: string,
      name: string,
      staticSiteEnvelope: StaticSiteARMResource,
      options?: StaticSitesCreateOrUpdateStaticSiteOptionalParams,
    ) => {
      return await createOrUpdateStaticSite(
        context,
        resourceGroupName,
        name,
        staticSiteEnvelope,
        options,
      );
    },
    getStaticSite: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesGetStaticSiteOptionalParams,
    ) => getStaticSite(context, resourceGroupName, name, options),
    listPrivateEndpointConnectionList: (
      resourceGroupName: string,
      name: string,
      options?: StaticSitesListPrivateEndpointConnectionListOptionalParams,
    ) => listPrivateEndpointConnectionList(context, resourceGroupName, name, options),
    deletePrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
    ) =>
      deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      ),
    beginDeletePrivateEndpointConnection: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeletePrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: StaticSitesDeletePrivateEndpointConnectionOptionalParams,
    ) => {
      return await deletePrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      );
    },
    approveOrRejectPrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) =>
      approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      ),
    beginApproveOrRejectPrivateEndpointConnection: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) => {
      const poller = approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginApproveOrRejectPrivateEndpointConnectionAndWait: async (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
      options?: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams,
    ) => {
      return await approveOrRejectPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        privateEndpointWrapper,
        options,
      );
    },
    getPrivateEndpointConnection: (
      resourceGroupName: string,
      name: string,
      privateEndpointConnectionName: string,
      options?: StaticSitesGetPrivateEndpointConnectionOptionalParams,
    ) =>
      getPrivateEndpointConnection(
        context,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options,
      ),
  };
}

export function _getStaticSitesOperations(
  context: WebSiteManagementContext,
): StaticSitesOperations {
  return {
    ..._getStaticSites(context),
  };
}
