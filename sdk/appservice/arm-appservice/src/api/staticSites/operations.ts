// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  PrivateLinkResourcesWrapper,
  RemotePrivateEndpointConnectionARMResource,
  _PrivateEndpointConnectionCollection,
  StaticSiteARMResource,
  StaticSitePatchResource,
  _StaticSiteCollection,
  _StaticSiteUserCollection,
  StaticSiteUserARMResource,
  StringDictionary,
  StaticSiteUserInvitationRequestResource,
  StaticSiteUserInvitationResponseResource,
  _StaticSiteFunctionOverviewCollection,
  StaticSiteFunctionOverviewARMResource,
  StringList,
  StaticSiteResetPropertiesARMResource,
  _DatabaseConnectionCollection,
  DatabaseConnection,
  StaticSiteZipDeploymentARMResource,
  StaticSiteBuildARMResource,
  _StaticSiteBuildCollection,
  DatabaseConnectionPatchRequest,
  StaticSiteUserProvidedFunctionAppARMResource,
  _StaticSiteUserProvidedFunctionAppsCollection,
  StaticSiteBasicAuthPropertiesARMResource,
  BasicAuthName,
  _StaticSiteBasicAuthPropertiesCollection,
  StaticSiteCustomDomainOverviewARMResource,
  StaticSiteCustomDomainRequestPropertiesARMResource,
  _StaticSiteCustomDomainOverviewCollection,
  StaticSiteLinkedBackendARMResource,
  _StaticSiteLinkedBackendsCollection,
  StaticSitesWorkflowPreviewRequest,
  StaticSitesWorkflowPreview,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  privateLinkResourcesWrapperDeserializer,
  remotePrivateEndpointConnectionARMResourceSerializer,
  remotePrivateEndpointConnectionARMResourceDeserializer,
  _privateEndpointConnectionCollectionDeserializer,
  staticSiteARMResourceSerializer,
  staticSiteARMResourceDeserializer,
  staticSitePatchResourceSerializer,
  _staticSiteCollectionDeserializer,
  _staticSiteUserCollectionDeserializer,
  staticSiteUserARMResourceSerializer,
  staticSiteUserARMResourceDeserializer,
  stringDictionarySerializer,
  stringDictionaryDeserializer,
  staticSiteUserInvitationRequestResourceSerializer,
  staticSiteUserInvitationResponseResourceDeserializer,
  _staticSiteFunctionOverviewCollectionDeserializer,
  stringListDeserializer,
  staticSiteResetPropertiesARMResourceSerializer,
  _databaseConnectionCollectionDeserializer,
  databaseConnectionSerializer,
  databaseConnectionDeserializer,
  staticSiteZipDeploymentARMResourceSerializer,
  staticSiteBuildARMResourceDeserializer,
  _staticSiteBuildCollectionDeserializer,
  databaseConnectionPatchRequestSerializer,
  staticSiteUserProvidedFunctionAppARMResourceSerializer,
  staticSiteUserProvidedFunctionAppARMResourceDeserializer,
  _staticSiteUserProvidedFunctionAppsCollectionDeserializer,
  staticSiteBasicAuthPropertiesARMResourceSerializer,
  staticSiteBasicAuthPropertiesARMResourceDeserializer,
  _staticSiteBasicAuthPropertiesCollectionDeserializer,
  staticSiteCustomDomainOverviewARMResourceDeserializer,
  staticSiteCustomDomainRequestPropertiesARMResourceSerializer,
  _staticSiteCustomDomainOverviewCollectionDeserializer,
  staticSiteLinkedBackendARMResourceSerializer,
  staticSiteLinkedBackendARMResourceDeserializer,
  _staticSiteLinkedBackendsCollectionDeserializer,
  staticSitesWorkflowPreviewRequestSerializer,
  staticSitesWorkflowPreviewDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _previewWorkflowSend(
  context: Client,
  location: string,
  staticSitesWorkflowPreviewRequest: StaticSitesWorkflowPreviewRequest,
  options: StaticSitesPreviewWorkflowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/previewStaticSiteWorkflowFile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSitesWorkflowPreviewRequestSerializer(staticSitesWorkflowPreviewRequest),
  });
}

export async function _previewWorkflowDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSitesWorkflowPreview> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSitesWorkflowPreviewDeserializer(result.body);
}

/** Description for Generates a preview workflow file for the static site */
export async function previewWorkflow(
  context: Client,
  location: string,
  staticSitesWorkflowPreviewRequest: StaticSitesWorkflowPreviewRequest,
  options: StaticSitesPreviewWorkflowOptionalParams = { requestOptions: {} },
): Promise<StaticSitesWorkflowPreview> {
  const result = await _previewWorkflowSend(
    context,
    location,
    staticSitesWorkflowPreviewRequest,
    options,
  );
  return _previewWorkflowDeserialize(result);
}

export function _validateBackendForBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesValidateBackendForBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteLinkedBackendARMResourceSerializer(staticSiteLinkedBackendEnvelope),
  });
}

export async function _validateBackendForBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Validates that a backend can be linked to a static site build */
export function validateBackendForBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesValidateBackendForBuildOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _validateBackendForBuildDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateBackendForBuildSend(
          context,
          resourceGroupName,
          name,
          environmentName,
          linkedBackendName,
          staticSiteLinkedBackendEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listLinkedBackendsForBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListLinkedBackendsForBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listLinkedBackendsForBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteLinkedBackendsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteLinkedBackendsCollectionDeserializer(result.body);
}

/** Returns details of all backends linked to a static site build */
export function listLinkedBackendsForBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListLinkedBackendsForBuildOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteLinkedBackendARMResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listLinkedBackendsForBuildSend(context, resourceGroupName, name, environmentName, options),
    _listLinkedBackendsForBuildDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _unlinkBackendFromBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  options: StaticSitesUnlinkBackendFromBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}{?api%2Dversion,isCleaningAuthConfig}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      isCleaningAuthConfig: options?.isCleaningAuthConfig,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _unlinkBackendFromBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Unlink a backend from a static site build */
export async function unlinkBackendFromBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  options: StaticSitesUnlinkBackendFromBuildOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _unlinkBackendFromBuildSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    linkedBackendName,
    options,
  );
  return _unlinkBackendFromBuildDeserialize(result);
}

export function _linkBackendToBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesLinkBackendToBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteLinkedBackendARMResourceSerializer(staticSiteLinkedBackendEnvelope),
  });
}

export async function _linkBackendToBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteLinkedBackendARMResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteLinkedBackendARMResourceDeserializer(result.body);
}

/** Link backend to a static site build */
export function linkBackendToBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesLinkBackendToBuildOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<StaticSiteLinkedBackendARMResource>,
  StaticSiteLinkedBackendARMResource
> {
  return getLongRunningPoller(context, _linkBackendToBuildDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkBackendToBuildSend(
        context,
        resourceGroupName,
        name,
        environmentName,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<
    OperationState<StaticSiteLinkedBackendARMResource>,
    StaticSiteLinkedBackendARMResource
  >;
}

export function _getLinkedBackendForBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  options: StaticSitesGetLinkedBackendForBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/linkedBackends/{linkedBackendName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLinkedBackendForBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteLinkedBackendARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteLinkedBackendARMResourceDeserializer(result.body);
}

/** Returns the details of a linked backend linked to a static site build by name */
export async function getLinkedBackendForBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  linkedBackendName: string,
  options: StaticSitesGetLinkedBackendForBuildOptionalParams = { requestOptions: {} },
): Promise<StaticSiteLinkedBackendARMResource> {
  const result = await _getLinkedBackendForBuildSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    linkedBackendName,
    options,
  );
  return _getLinkedBackendForBuildDeserialize(result);
}

export function _validateBackendSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesValidateBackendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteLinkedBackendARMResourceSerializer(staticSiteLinkedBackendEnvelope),
  });
}

export async function _validateBackendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Validates that a backend can be linked to a static site */
export function validateBackend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesValidateBackendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _validateBackendDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateBackendSend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listLinkedBackendsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListLinkedBackendsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listLinkedBackendsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteLinkedBackendsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteLinkedBackendsCollectionDeserializer(result.body);
}

/** Returns details of all backends linked to a static site */
export function listLinkedBackends(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListLinkedBackendsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteLinkedBackendARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listLinkedBackendsSend(context, resourceGroupName, name, options),
    _listLinkedBackendsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _unlinkBackendSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  options: StaticSitesUnlinkBackendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}{?api%2Dversion,isCleaningAuthConfig}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      isCleaningAuthConfig: options?.isCleaningAuthConfig,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _unlinkBackendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Unlink a backend from a static site */
export async function unlinkBackend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  options: StaticSitesUnlinkBackendOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _unlinkBackendSend(
    context,
    resourceGroupName,
    name,
    linkedBackendName,
    options,
  );
  return _unlinkBackendDeserialize(result);
}

export function _linkBackendSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesLinkBackendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteLinkedBackendARMResourceSerializer(staticSiteLinkedBackendEnvelope),
  });
}

export async function _linkBackendDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteLinkedBackendARMResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteLinkedBackendARMResourceDeserializer(result.body);
}

/** Link backend to a static site */
export function linkBackend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  staticSiteLinkedBackendEnvelope: StaticSiteLinkedBackendARMResource,
  options: StaticSitesLinkBackendOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<StaticSiteLinkedBackendARMResource>,
  StaticSiteLinkedBackendARMResource
> {
  return getLongRunningPoller(context, _linkBackendDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkBackendSend(
        context,
        resourceGroupName,
        name,
        linkedBackendName,
        staticSiteLinkedBackendEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<
    OperationState<StaticSiteLinkedBackendARMResource>,
    StaticSiteLinkedBackendARMResource
  >;
}

export function _getLinkedBackendSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  options: StaticSitesGetLinkedBackendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/linkedBackends/{linkedBackendName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      linkedBackendName: linkedBackendName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getLinkedBackendDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteLinkedBackendARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteLinkedBackendARMResourceDeserializer(result.body);
}

/** Returns the details of a linked backend linked to a static site by name */
export async function getLinkedBackend(
  context: Client,
  resourceGroupName: string,
  name: string,
  linkedBackendName: string,
  options: StaticSitesGetLinkedBackendOptionalParams = { requestOptions: {} },
): Promise<StaticSiteLinkedBackendARMResource> {
  const result = await _getLinkedBackendSend(
    context,
    resourceGroupName,
    name,
    linkedBackendName,
    options,
  );
  return _getLinkedBackendDeserialize(result);
}

export function _validateCustomDomainCanBeAddedToStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
  options: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteCustomDomainRequestPropertiesARMResourceSerializer(
      staticSiteCustomDomainRequestPropertiesEnvelope,
    ),
  });
}

export async function _validateCustomDomainCanBeAddedToStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Validates a particular custom domain can be added to a static site. */
export function validateCustomDomainCanBeAddedToStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
  options: StaticSitesValidateCustomDomainCanBeAddedToStaticSiteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _validateCustomDomainCanBeAddedToStaticSiteDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateCustomDomainCanBeAddedToStaticSiteSend(
          context,
          resourceGroupName,
          name,
          domainName,
          staticSiteCustomDomainRequestPropertiesEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listStaticSiteCustomDomainsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteCustomDomainsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteCustomDomainsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteCustomDomainOverviewCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteCustomDomainOverviewCollectionDeserializer(result.body);
}

/** Description for Gets all static site custom domains for a particular static site. */
export function listStaticSiteCustomDomains(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteCustomDomainsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteCustomDomainOverviewARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listStaticSiteCustomDomainsSend(context, resourceGroupName, name, options),
    _listStaticSiteCustomDomainsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteStaticSiteCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  options: StaticSitesDeleteStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteStaticSiteCustomDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deletes a custom domain. */
export function deleteStaticSiteCustomDomain(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  options: StaticSitesDeleteStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteStaticSiteCustomDomainDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteStaticSiteCustomDomainSend(context, resourceGroupName, name, domainName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateStaticSiteCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
  options: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteCustomDomainRequestPropertiesARMResourceSerializer(
      staticSiteCustomDomainRequestPropertiesEnvelope,
    ),
  });
}

export async function _createOrUpdateStaticSiteCustomDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteCustomDomainOverviewARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteCustomDomainOverviewARMResourceDeserializer(result.body);
}

/** Description for Creates a new static site custom domain in an existing resource group and static site. */
export function createOrUpdateStaticSiteCustomDomain(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  staticSiteCustomDomainRequestPropertiesEnvelope: StaticSiteCustomDomainRequestPropertiesARMResource,
  options: StaticSitesCreateOrUpdateStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<StaticSiteCustomDomainOverviewARMResource>,
  StaticSiteCustomDomainOverviewARMResource
> {
  return getLongRunningPoller(
    context,
    _createOrUpdateStaticSiteCustomDomainDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateStaticSiteCustomDomainSend(
          context,
          resourceGroupName,
          name,
          domainName,
          staticSiteCustomDomainRequestPropertiesEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<StaticSiteCustomDomainOverviewARMResource>,
    StaticSiteCustomDomainOverviewARMResource
  >;
}

export function _getStaticSiteCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  options: StaticSitesGetStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getStaticSiteCustomDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteCustomDomainOverviewARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteCustomDomainOverviewARMResourceDeserializer(result.body);
}

/** Description for Gets an existing custom domain for a particular static site. */
export async function getStaticSiteCustomDomain(
  context: Client,
  resourceGroupName: string,
  name: string,
  domainName: string,
  options: StaticSitesGetStaticSiteCustomDomainOptionalParams = { requestOptions: {} },
): Promise<StaticSiteCustomDomainOverviewARMResource> {
  const result = await _getStaticSiteCustomDomainSend(
    context,
    resourceGroupName,
    name,
    domainName,
    options,
  );
  return _getStaticSiteCustomDomainDeserialize(result);
}

export function _listBasicAuthSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListBasicAuthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/basicAuth{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBasicAuthDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteBasicAuthPropertiesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteBasicAuthPropertiesCollectionDeserializer(result.body);
}

/** Description for Gets the basic auth properties for a static site as a collection. */
export function listBasicAuth(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListBasicAuthOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteBasicAuthPropertiesARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBasicAuthSend(context, resourceGroupName, name, options),
    _listBasicAuthDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _createOrUpdateBasicAuthSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  basicAuthName: BasicAuthName,
  basicAuthEnvelope: StaticSiteBasicAuthPropertiesARMResource,
  options: StaticSitesCreateOrUpdateBasicAuthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/basicAuth/{basicAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      basicAuthName: basicAuthName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteBasicAuthPropertiesARMResourceSerializer(basicAuthEnvelope),
  });
}

export async function _createOrUpdateBasicAuthDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteBasicAuthPropertiesARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteBasicAuthPropertiesARMResourceDeserializer(result.body);
}

/** Description for Adds or updates basic auth for a static site. */
export async function createOrUpdateBasicAuth(
  context: Client,
  resourceGroupName: string,
  name: string,
  basicAuthName: BasicAuthName,
  basicAuthEnvelope: StaticSiteBasicAuthPropertiesARMResource,
  options: StaticSitesCreateOrUpdateBasicAuthOptionalParams = { requestOptions: {} },
): Promise<StaticSiteBasicAuthPropertiesARMResource> {
  const result = await _createOrUpdateBasicAuthSend(
    context,
    resourceGroupName,
    name,
    basicAuthName,
    basicAuthEnvelope,
    options,
  );
  return _createOrUpdateBasicAuthDeserialize(result);
}

export function _getBasicAuthSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  basicAuthName: BasicAuthName,
  options: StaticSitesGetBasicAuthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/basicAuth/{basicAuthName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      basicAuthName: basicAuthName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBasicAuthDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteBasicAuthPropertiesARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteBasicAuthPropertiesARMResourceDeserializer(result.body);
}

/** Description for Gets the basic auth properties for a static site. */
export async function getBasicAuth(
  context: Client,
  resourceGroupName: string,
  name: string,
  basicAuthName: BasicAuthName,
  options: StaticSitesGetBasicAuthOptionalParams = { requestOptions: {} },
): Promise<StaticSiteBasicAuthPropertiesARMResource> {
  const result = await _getBasicAuthSend(context, resourceGroupName, name, basicAuthName, options);
  return _getBasicAuthDeserialize(result);
}

export function _listUserProvidedFunctionAppsForStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUserProvidedFunctionAppsForStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteUserProvidedFunctionAppsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteUserProvidedFunctionAppsCollectionDeserializer(result.body);
}

/** Description for Gets the details of the user provided function apps registered with a static site */
export function listUserProvidedFunctionAppsForStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListUserProvidedFunctionAppsForStaticSiteOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StaticSiteUserProvidedFunctionAppARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listUserProvidedFunctionAppsForStaticSiteSend(context, resourceGroupName, name, options),
    _listUserProvidedFunctionAppsForStaticSiteDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _detachUserProvidedFunctionAppFromStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  options: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachUserProvidedFunctionAppFromStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Detach the user provided function app from the static site */
export async function detachUserProvidedFunctionAppFromStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  options: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _detachUserProvidedFunctionAppFromStaticSiteSend(
    context,
    resourceGroupName,
    name,
    functionAppName,
    options,
  );
  return _detachUserProvidedFunctionAppFromStaticSiteDeserialize(result);
}

export function _registerUserProvidedFunctionAppWithStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
  options: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion,isForced}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      isForced: options?.isForced,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteUserProvidedFunctionAppARMResourceSerializer(
      staticSiteUserProvidedFunctionEnvelope,
    ),
  });
}

export async function _registerUserProvidedFunctionAppWithStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserProvidedFunctionAppARMResourceDeserializer(result.body);
}

/** Description for Register a user provided function app with a static site */
export function registerUserProvidedFunctionAppWithStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
  options: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
  StaticSiteUserProvidedFunctionAppARMResource
> {
  return getLongRunningPoller(
    context,
    _registerUserProvidedFunctionAppWithStaticSiteDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _registerUserProvidedFunctionAppWithStaticSiteSend(
          context,
          resourceGroupName,
          name,
          functionAppName,
          staticSiteUserProvidedFunctionEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
    StaticSiteUserProvidedFunctionAppARMResource
  >;
}

export function _getUserProvidedFunctionAppForStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  options: StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getUserProvidedFunctionAppForStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserProvidedFunctionAppARMResourceDeserializer(result.body);
}

/** Description for Gets the details of the user provided function app registered with a static site */
export async function getUserProvidedFunctionAppForStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  functionAppName: string,
  options: StaticSitesGetUserProvidedFunctionAppForStaticSiteOptionalParams = {
    requestOptions: {},
  },
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const result = await _getUserProvidedFunctionAppForStaticSiteSend(
    context,
    resourceGroupName,
    name,
    functionAppName,
    options,
  );
  return _getUserProvidedFunctionAppForStaticSiteDeserialize(result);
}

export function _listUserProvidedFunctionAppsForStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUserProvidedFunctionAppsForStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteUserProvidedFunctionAppsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteUserProvidedFunctionAppsCollectionDeserializer(result.body);
}

/** Description for Gets the details of the user provided function apps registered with a static site build */
export function listUserProvidedFunctionAppsForStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListUserProvidedFunctionAppsForStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StaticSiteUserProvidedFunctionAppARMResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listUserProvidedFunctionAppsForStaticSiteBuildSend(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      ),
    _listUserProvidedFunctionAppsForStaticSiteBuildDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _detachUserProvidedFunctionAppFromStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  options: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachUserProvidedFunctionAppFromStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Detach the user provided function app from the static site build */
export async function detachUserProvidedFunctionAppFromStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  options: StaticSitesDetachUserProvidedFunctionAppFromStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _detachUserProvidedFunctionAppFromStaticSiteBuildSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    functionAppName,
    options,
  );
  return _detachUserProvidedFunctionAppFromStaticSiteBuildDeserialize(result);
}

export function _registerUserProvidedFunctionAppWithStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
  options: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion,isForced}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      isForced: options?.isForced,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteUserProvidedFunctionAppARMResourceSerializer(
      staticSiteUserProvidedFunctionEnvelope,
    ),
  });
}

export async function _registerUserProvidedFunctionAppWithStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserProvidedFunctionAppARMResourceDeserializer(result.body);
}

/** Description for Register a user provided function app with a static site build */
export function registerUserProvidedFunctionAppWithStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  staticSiteUserProvidedFunctionEnvelope: StaticSiteUserProvidedFunctionAppARMResource,
  options: StaticSitesRegisterUserProvidedFunctionAppWithStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
  StaticSiteUserProvidedFunctionAppARMResource
> {
  return getLongRunningPoller(
    context,
    _registerUserProvidedFunctionAppWithStaticSiteBuildDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _registerUserProvidedFunctionAppWithStaticSiteBuildSend(
          context,
          resourceGroupName,
          name,
          environmentName,
          functionAppName,
          staticSiteUserProvidedFunctionEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<StaticSiteUserProvidedFunctionAppARMResource>,
    StaticSiteUserProvidedFunctionAppARMResource
  >;
}

export function _getUserProvidedFunctionAppForStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  options: StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      functionAppName: functionAppName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getUserProvidedFunctionAppForStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserProvidedFunctionAppARMResourceDeserializer(result.body);
}

/** Description for Gets the details of the user provided function app registered with a static site build */
export async function getUserProvidedFunctionAppForStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  functionAppName: string,
  options: StaticSitesGetUserProvidedFunctionAppForStaticSiteBuildOptionalParams = {
    requestOptions: {},
  },
): Promise<StaticSiteUserProvidedFunctionAppARMResource> {
  const result = await _getUserProvidedFunctionAppForStaticSiteBuildSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    functionAppName,
    options,
  );
  return _getUserProvidedFunctionAppForStaticSiteBuildDeserialize(result);
}

export function _getDatabaseConnectionWithDetailsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesGetDatabaseConnectionWithDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections/{databaseConnectionName}/show{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDatabaseConnectionWithDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Returns details of a database connection for a static site by name */
export async function getDatabaseConnectionWithDetails(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesGetDatabaseConnectionWithDetailsOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _getDatabaseConnectionWithDetailsSend(
    context,
    resourceGroupName,
    name,
    databaseConnectionName,
    options,
  );
  return _getDatabaseConnectionWithDetailsDeserialize(result);
}

export function _listDatabaseConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListDatabaseConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDatabaseConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _databaseConnectionCollectionDeserializer(result.body);
}

/** Returns overviews of database connections for a static site */
export function listDatabaseConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListDatabaseConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listDatabaseConnectionsSend(context, resourceGroupName, name, options),
    _listDatabaseConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesDeleteDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a database connection for a static site */
export async function deleteDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesDeleteDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    databaseConnectionName,
    options,
  );
  return _deleteDatabaseConnectionDeserialize(result);
}

export function _updateDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
  options: StaticSitesUpdateDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseConnectionPatchRequestSerializer(databaseConnectionRequestEnvelope),
  });
}

export async function _updateDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Description for Create or update a database connection for a static site */
export async function updateDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
  options: StaticSitesUpdateDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _updateDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
    options,
  );
  return _updateDatabaseConnectionDeserialize(result);
}

export function _createOrUpdateDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnection,
  options: StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseConnectionSerializer(databaseConnectionRequestEnvelope),
  });
}

export async function _createOrUpdateDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Description for Create or update a database connection for a static site */
export async function createOrUpdateDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnection,
  options: StaticSitesCreateOrUpdateDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _createOrUpdateDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
    options,
  );
  return _createOrUpdateDatabaseConnectionDeserialize(result);
}

export function _getDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesGetDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Returns overview of a database connection for a static site by name */
export async function getDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  databaseConnectionName: string,
  options: StaticSitesGetDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _getDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    databaseConnectionName,
    options,
  );
  return _getDatabaseConnectionDeserialize(result);
}

export function _getBuildDatabaseConnectionWithDetailsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections/{databaseConnectionName}/show{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBuildDatabaseConnectionWithDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Returns details of a database connection for a static site build by name */
export async function getBuildDatabaseConnectionWithDetails(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesGetBuildDatabaseConnectionWithDetailsOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _getBuildDatabaseConnectionWithDetailsSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    options,
  );
  return _getBuildDatabaseConnectionWithDetailsDeserialize(result);
}

export function _listBuildDatabaseConnectionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListBuildDatabaseConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBuildDatabaseConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _databaseConnectionCollectionDeserializer(result.body);
}

/** Returns overviews of database connections for a static site build */
export function listBuildDatabaseConnections(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListBuildDatabaseConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBuildDatabaseConnectionsSend(context, resourceGroupName, name, environmentName, options),
    _listBuildDatabaseConnectionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteBuildDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesDeleteBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteBuildDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a database connection for a static site build */
export async function deleteBuildDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesDeleteBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteBuildDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    options,
  );
  return _deleteBuildDatabaseConnectionDeserialize(result);
}

export function _updateBuildDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
  options: StaticSitesUpdateBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseConnectionPatchRequestSerializer(databaseConnectionRequestEnvelope),
  });
}

export async function _updateBuildDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Description for Create or update a database connection for a static site build */
export async function updateBuildDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnectionPatchRequest,
  options: StaticSitesUpdateBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _updateBuildDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
    options,
  );
  return _updateBuildDatabaseConnectionDeserialize(result);
}

export function _createOrUpdateBuildDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnection,
  options: StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: databaseConnectionSerializer(databaseConnectionRequestEnvelope),
  });
}

export async function _createOrUpdateBuildDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Description for Create or update a database connection for a static site build */
export async function createOrUpdateBuildDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  databaseConnectionRequestEnvelope: DatabaseConnection,
  options: StaticSitesCreateOrUpdateBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _createOrUpdateBuildDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    databaseConnectionRequestEnvelope,
    options,
  );
  return _createOrUpdateBuildDatabaseConnectionDeserialize(result);
}

export function _getBuildDatabaseConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesGetBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/databaseConnections/{databaseConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      databaseConnectionName: databaseConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getBuildDatabaseConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatabaseConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return databaseConnectionDeserializer(result.body);
}

/** Returns overview of a database connection for a static site build by name */
export async function getBuildDatabaseConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  databaseConnectionName: string,
  options: StaticSitesGetBuildDatabaseConnectionOptionalParams = { requestOptions: {} },
): Promise<DatabaseConnection> {
  const result = await _getBuildDatabaseConnectionSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    databaseConnectionName,
    options,
  );
  return _getBuildDatabaseConnectionDeserialize(result);
}

export function _createZipDeploymentForStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
  options: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/zipdeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteZipDeploymentARMResourceSerializer(staticSiteZipDeploymentEnvelope),
  });
}

export async function _createZipDeploymentForStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deploys zipped content to a specific environment of a static site. */
export function createZipDeploymentForStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
  options: StaticSitesCreateZipDeploymentForStaticSiteBuildOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _createZipDeploymentForStaticSiteBuildDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createZipDeploymentForStaticSiteBuildSend(
          context,
          resourceGroupName,
          name,
          environmentName,
          staticSiteZipDeploymentEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listBuildDatabaseConnectionsWithDetailsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/showDatabaseConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listBuildDatabaseConnectionsWithDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _databaseConnectionCollectionDeserializer(result.body);
}

/** Returns details of database connections for a static site build */
export function listBuildDatabaseConnectionsWithDetails(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListBuildDatabaseConnectionsWithDetailsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DatabaseConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBuildDatabaseConnectionsWithDetailsSend(
        context,
        resourceGroupName,
        name,
        environmentName,
        options,
      ),
    _listBuildDatabaseConnectionsWithDetailsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listStaticSiteBuildFunctionAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/listFunctionAppSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteBuildFunctionAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of a static site build. */
export async function listStaticSiteBuildFunctionAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildFunctionAppSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listStaticSiteBuildFunctionAppSettingsSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    options,
  );
  return _listStaticSiteBuildFunctionAppSettingsDeserialize(result);
}

export function _listStaticSiteBuildAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildAppSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/listAppSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteBuildAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of a static site build. */
export async function listStaticSiteBuildAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildAppSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listStaticSiteBuildAppSettingsSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    options,
  );
  return _listStaticSiteBuildAppSettingsDeserialize(result);
}

export function _listStaticSiteBuildFunctionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildFunctionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/functions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteBuildFunctionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteFunctionOverviewCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteFunctionOverviewCollectionDeserializer(result.body);
}

/** Description for Gets the functions of a particular static site build. */
export function listStaticSiteBuildFunctions(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesListStaticSiteBuildFunctionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteFunctionOverviewARMResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listStaticSiteBuildFunctionsSend(context, resourceGroupName, name, environmentName, options),
    _listStaticSiteBuildFunctionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _createOrUpdateStaticSiteBuildFunctionAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/config/functionappsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _createOrUpdateStaticSiteBuildFunctionAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Creates or updates the function app settings of a static site build. */
export async function createOrUpdateStaticSiteBuildFunctionAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteBuildFunctionAppSettingsOptionalParams = {
    requestOptions: {},
  },
): Promise<StringDictionary> {
  const result = await _createOrUpdateStaticSiteBuildFunctionAppSettingsSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    appSettings,
    options,
  );
  return _createOrUpdateStaticSiteBuildFunctionAppSettingsDeserialize(result);
}

export function _createOrUpdateStaticSiteBuildAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/config/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _createOrUpdateStaticSiteBuildAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Creates or updates the app settings of a static site build. */
export async function createOrUpdateStaticSiteBuildAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteBuildAppSettingsOptionalParams = {
    requestOptions: {},
  },
): Promise<StringDictionary> {
  const result = await _createOrUpdateStaticSiteBuildAppSettingsSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    appSettings,
    options,
  );
  return _createOrUpdateStaticSiteBuildAppSettingsDeserialize(result);
}

export function _listStaticSiteBuildsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteBuildsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteBuildsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteBuildCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteBuildCollectionDeserializer(result.body);
}

/** Description for Gets all static site builds for a particular static site. */
export function listStaticSiteBuilds(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteBuildsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteBuildARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listStaticSiteBuildsSend(context, resourceGroupName, name, options),
    _listStaticSiteBuildsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesDeleteStaticSiteBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deletes a static site build. */
export function deleteStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesDeleteStaticSiteBuildOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteStaticSiteBuildDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteStaticSiteBuildSend(context, resourceGroupName, name, environmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getStaticSiteBuildSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesGetStaticSiteBuildOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getStaticSiteBuildDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteBuildARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteBuildARMResourceDeserializer(result.body);
}

/** Description for Gets the details of a static site build. */
export async function getStaticSiteBuild(
  context: Client,
  resourceGroupName: string,
  name: string,
  environmentName: string,
  options: StaticSitesGetStaticSiteBuildOptionalParams = { requestOptions: {} },
): Promise<StaticSiteBuildARMResource> {
  const result = await _getStaticSiteBuildSend(
    context,
    resourceGroupName,
    name,
    environmentName,
    options,
  );
  return _getStaticSiteBuildDeserialize(result);
}

export function _createZipDeploymentForStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
  options: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/zipdeploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteZipDeploymentARMResourceSerializer(staticSiteZipDeploymentEnvelope),
  });
}

export async function _createZipDeploymentForStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deploys zipped content to a static site. */
export function createZipDeploymentForStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteZipDeploymentEnvelope: StaticSiteZipDeploymentARMResource,
  options: StaticSitesCreateZipDeploymentForStaticSiteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _createZipDeploymentForStaticSiteDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createZipDeploymentForStaticSiteSend(
          context,
          resourceGroupName,
          name,
          staticSiteZipDeploymentEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listDatabaseConnectionsWithDetailsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListDatabaseConnectionsWithDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/showDatabaseConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDatabaseConnectionsWithDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatabaseConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _databaseConnectionCollectionDeserializer(result.body);
}

/** Returns details of database connections for a static site */
export function listDatabaseConnectionsWithDetails(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListDatabaseConnectionsWithDetailsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatabaseConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listDatabaseConnectionsWithDetailsSend(context, resourceGroupName, name, options),
    _listDatabaseConnectionsWithDetailsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _resetStaticSiteApiKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  resetPropertiesEnvelope: StaticSiteResetPropertiesARMResource,
  options: StaticSitesResetStaticSiteApiKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/resetapikey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: staticSiteResetPropertiesARMResourceSerializer(resetPropertiesEnvelope),
  });
}

export async function _resetStaticSiteApiKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Resets the api key for an existing static site. */
export async function resetStaticSiteApiKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  resetPropertiesEnvelope: StaticSiteResetPropertiesARMResource,
  options: StaticSitesResetStaticSiteApiKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetStaticSiteApiKeySend(
    context,
    resourceGroupName,
    name,
    resetPropertiesEnvelope,
    options,
  );
  return _resetStaticSiteApiKeyDeserialize(result);
}

export function _getPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourcesWrapper> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return privateLinkResourcesWrapperDeserializer(result.body);
}

/** Description for Gets the private link resources */
export async function getPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourcesWrapper> {
  const result = await _getPrivateLinkResourcesSend(context, resourceGroupName, name, options);
  return _getPrivateLinkResourcesDeserialize(result);
}

export function _listStaticSiteSecretsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Lists the secrets for an existing static site. */
export async function listStaticSiteSecrets(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteSecretsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listStaticSiteSecretsSend(context, resourceGroupName, name, options);
  return _listStaticSiteSecretsDeserialize(result);
}

export function _listStaticSiteFunctionAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteFunctionAppSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listFunctionAppSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteFunctionAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of a static site. */
export async function listStaticSiteFunctionAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteFunctionAppSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listStaticSiteFunctionAppSettingsSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _listStaticSiteFunctionAppSettingsDeserialize(result);
}

export function _listStaticSiteConfiguredRolesSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteConfiguredRolesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listConfiguredRoles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteConfiguredRolesDeserialize(
  result: PathUncheckedResponse,
): Promise<StringList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringListDeserializer(result.body);
}

/** Description for Lists the roles configured for the static site. */
export async function listStaticSiteConfiguredRoles(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteConfiguredRolesOptionalParams = { requestOptions: {} },
): Promise<StringList> {
  const result = await _listStaticSiteConfiguredRolesSend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _listStaticSiteConfiguredRolesDeserialize(result);
}

export function _listStaticSiteAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteAppSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listAppSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Gets the application settings of a static site. */
export async function listStaticSiteAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteAppSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _listStaticSiteAppSettingsSend(context, resourceGroupName, name, options);
  return _listStaticSiteAppSettingsDeserialize(result);
}

export function _listStaticSiteFunctionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteFunctionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/functions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteFunctionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteFunctionOverviewCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteFunctionOverviewCollectionDeserializer(result.body);
}

/** Description for Gets the functions of a static site. */
export function listStaticSiteFunctions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListStaticSiteFunctionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteFunctionOverviewARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listStaticSiteFunctionsSend(context, resourceGroupName, name, options),
    _listStaticSiteFunctionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _detachStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesDetachStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/detach{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _detachStaticSiteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Detaches a static site. */
export function detachStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesDetachStaticSiteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _detachStaticSiteDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _detachStaticSiteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createUserRolesInvitationLinkSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteUserRolesInvitationEnvelope: StaticSiteUserInvitationRequestResource,
  options: StaticSitesCreateUserRolesInvitationLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/createUserInvitation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteUserInvitationRequestResourceSerializer(staticSiteUserRolesInvitationEnvelope),
  });
}

export async function _createUserRolesInvitationLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserInvitationResponseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserInvitationResponseResourceDeserializer(result.body);
}

/** Description for Creates an invitation link for a user with the role */
export async function createUserRolesInvitationLink(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteUserRolesInvitationEnvelope: StaticSiteUserInvitationRequestResource,
  options: StaticSitesCreateUserRolesInvitationLinkOptionalParams = { requestOptions: {} },
): Promise<StaticSiteUserInvitationResponseResource> {
  const result = await _createUserRolesInvitationLinkSend(
    context,
    resourceGroupName,
    name,
    staticSiteUserRolesInvitationEnvelope,
    options,
  );
  return _createUserRolesInvitationLinkDeserialize(result);
}

export function _createOrUpdateStaticSiteFunctionAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/config/functionappsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _createOrUpdateStaticSiteFunctionAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Creates or updates the function app settings of a static site. */
export async function createOrUpdateStaticSiteFunctionAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteFunctionAppSettingsOptionalParams = {
    requestOptions: {},
  },
): Promise<StringDictionary> {
  const result = await _createOrUpdateStaticSiteFunctionAppSettingsSend(
    context,
    resourceGroupName,
    name,
    appSettings,
    options,
  );
  return _createOrUpdateStaticSiteFunctionAppSettingsDeserialize(result);
}

export function _createOrUpdateStaticSiteAppSettingsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/config/appsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: stringDictionarySerializer(appSettings),
  });
}

export async function _createOrUpdateStaticSiteAppSettingsDeserialize(
  result: PathUncheckedResponse,
): Promise<StringDictionary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return stringDictionaryDeserializer(result.body);
}

/** Description for Creates or updates the app settings of a static site. */
export async function createOrUpdateStaticSiteAppSettings(
  context: Client,
  resourceGroupName: string,
  name: string,
  appSettings: StringDictionary,
  options: StaticSitesCreateOrUpdateStaticSiteAppSettingsOptionalParams = { requestOptions: {} },
): Promise<StringDictionary> {
  const result = await _createOrUpdateStaticSiteAppSettingsSend(
    context,
    resourceGroupName,
    name,
    appSettings,
    options,
  );
  return _createOrUpdateStaticSiteAppSettingsDeserialize(result);
}

export function _updateStaticSiteUserSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  userid: string,
  staticSiteUserEnvelope: StaticSiteUserARMResource,
  options: StaticSitesUpdateStaticSiteUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/staticSites/{name}/authproviders/{authprovider}/users/{userid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      authprovider: authprovider,
      userid: userid,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteUserARMResourceSerializer(staticSiteUserEnvelope),
  });
}

export async function _updateStaticSiteUserDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteUserARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteUserARMResourceDeserializer(result.body);
}

/** Description for Updates a user entry with the listed roles */
export async function updateStaticSiteUser(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  userid: string,
  staticSiteUserEnvelope: StaticSiteUserARMResource,
  options: StaticSitesUpdateStaticSiteUserOptionalParams = { requestOptions: {} },
): Promise<StaticSiteUserARMResource> {
  const result = await _updateStaticSiteUserSend(
    context,
    resourceGroupName,
    name,
    authprovider,
    userid,
    staticSiteUserEnvelope,
    options,
  );
  return _updateStaticSiteUserDeserialize(result);
}

export function _deleteStaticSiteUserSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  userid: string,
  options: StaticSitesDeleteStaticSiteUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/staticSites/{name}/authproviders/{authprovider}/users/{userid}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      authprovider: authprovider,
      userid: userid,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteStaticSiteUserDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deletes the user entry from the static site. */
export async function deleteStaticSiteUser(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  userid: string,
  options: StaticSitesDeleteStaticSiteUserOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteStaticSiteUserSend(
    context,
    resourceGroupName,
    name,
    authprovider,
    userid,
    options,
  );
  return _deleteStaticSiteUserDeserialize(result);
}

export function _listStaticSiteUsersSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  options: StaticSitesListStaticSiteUsersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Web/staticSites/{name}/authproviders/{authprovider}/listUsers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      authprovider: authprovider,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSiteUsersDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteUserCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteUserCollectionDeserializer(result.body);
}

/** Description for Gets the list of users of a static site. */
export function listStaticSiteUsers(
  context: Client,
  resourceGroupName: string,
  name: string,
  authprovider: string,
  options: StaticSitesListStaticSiteUsersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteUserARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listStaticSiteUsersSend(context, resourceGroupName, name, authprovider, options),
    _listStaticSiteUsersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  options: StaticSitesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/staticSites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteCollectionDeserializer(result.body);
}

/** Description for Get all Static Sites for a subscription. */
export function list(
  context: Client,
  options: StaticSitesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listStaticSitesByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: StaticSitesListStaticSitesByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listStaticSitesByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StaticSiteCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _staticSiteCollectionDeserializer(result.body);
}

/** Description for Gets all static sites in the specified resource group. */
export function listStaticSitesByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StaticSitesListStaticSitesByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StaticSiteARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listStaticSitesByResourceGroupSend(context, resourceGroupName, options),
    _listStaticSitesByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deleteStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesDeleteStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteStaticSiteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deletes a static site. */
export function deleteStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesDeleteStaticSiteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteStaticSiteDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteStaticSiteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteEnvelope: StaticSitePatchResource,
  options: StaticSitesUpdateStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSitePatchResourceSerializer(staticSiteEnvelope),
  });
}

export async function _updateStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteARMResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteARMResourceDeserializer(result.body);
}

/** Description for Creates a new static site in an existing resource group, or updates an existing static site. */
export async function updateStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteEnvelope: StaticSitePatchResource,
  options: StaticSitesUpdateStaticSiteOptionalParams = { requestOptions: {} },
): Promise<StaticSiteARMResource> {
  const result = await _updateStaticSiteSend(
    context,
    resourceGroupName,
    name,
    staticSiteEnvelope,
    options,
  );
  return _updateStaticSiteDeserialize(result);
}

export function _createOrUpdateStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteEnvelope: StaticSiteARMResource,
  options: StaticSitesCreateOrUpdateStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: staticSiteARMResourceSerializer(staticSiteEnvelope),
  });
}

export async function _createOrUpdateStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteARMResourceDeserializer(result.body);
}

/** Description for Creates a new static site in an existing resource group, or updates an existing static site. */
export function createOrUpdateStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  staticSiteEnvelope: StaticSiteARMResource,
  options: StaticSitesCreateOrUpdateStaticSiteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StaticSiteARMResource>, StaticSiteARMResource> {
  return getLongRunningPoller(
    context,
    _createOrUpdateStaticSiteDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateStaticSiteSend(
          context,
          resourceGroupName,
          name,
          staticSiteEnvelope,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<StaticSiteARMResource>, StaticSiteARMResource>;
}

export function _getStaticSiteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesGetStaticSiteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getStaticSiteDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSiteARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return staticSiteARMResourceDeserializer(result.body);
}

/** Description for Gets the details of a static site. */
export async function getStaticSite(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesGetStaticSiteOptionalParams = { requestOptions: {} },
): Promise<StaticSiteARMResource> {
  const result = await _getStaticSiteSend(context, resourceGroupName, name, options);
  return _getStaticSiteDeserialize(result);
}

export function _listPrivateEndpointConnectionListSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListPrivateEndpointConnectionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listPrivateEndpointConnectionListDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _privateEndpointConnectionCollectionDeserializer(result.body);
}

/** Description for Gets the list of private endpoint connections associated with a static site */
export function listPrivateEndpointConnectionList(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: StaticSitesListPrivateEndpointConnectionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RemotePrivateEndpointConnectionARMResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listPrivateEndpointConnectionListSend(context, resourceGroupName, name, options),
    _listPrivateEndpointConnectionListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _deletePrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: StaticSitesDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _deletePrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Deletes a private endpoint connection */
export function deletePrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: StaticSitesDeletePrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deletePrivateEndpointConnectionDeserialize,
    ["200", "202", "204"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deletePrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _approveOrRejectPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: remotePrivateEndpointConnectionARMResourceSerializer(privateEndpointWrapper),
  });
}

export async function _approveOrRejectPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Approves or rejects a private endpoint connection */
export function approveOrRejectPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  privateEndpointWrapper: RemotePrivateEndpointConnectionARMResource,
  options: StaticSitesApproveOrRejectPrivateEndpointConnectionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<RemotePrivateEndpointConnectionARMResource>,
  RemotePrivateEndpointConnectionARMResource
> {
  return getLongRunningPoller(
    context,
    _approveOrRejectPrivateEndpointConnectionDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _approveOrRejectPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          name,
          privateEndpointConnectionName,
          privateEndpointWrapper,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-05-01",
    },
  ) as PollerLike<
    OperationState<RemotePrivateEndpointConnectionARMResource>,
    RemotePrivateEndpointConnectionARMResource
  >;
}

export function _getPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: StaticSitesGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return remotePrivateEndpointConnectionARMResourceDeserializer(result.body);
}

/** Description for Gets a private endpoint connection */
export async function getPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: StaticSitesGetPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): Promise<RemotePrivateEndpointConnectionARMResource> {
  const result = await _getPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    options,
  );
  return _getPrivateEndpointConnectionDeserialize(result);
}
