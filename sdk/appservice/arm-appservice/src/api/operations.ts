// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "./index.js";
import type {
  CsmMoveResourceEnvelope,
  ValidateRequest,
  ValidateResponse,
  DeploymentLocations,
  GeoRegion,
  _AseRegionCollection,
  AseRegion,
  _BillingMeterCollection,
  BillingMeter,
  CheckNameResourceTypes,
  ResourceNameAvailability,
  _CustomHostnameSitesCollection,
  CustomHostnameSites,
  Identifier,
  _GeoRegionCollection,
  NameIdentifier,
  _IdentifierCollection,
  DnlResourceNameAvailability,
  _PremierAddOnOfferCollection,
  PremierAddOnOffer,
  SkuInfos,
  VnetParameters,
  VnetValidationFailureDetails,
  User,
  SourceControl,
  _SourceControlCollection,
} from "../models/models.js";
import {
  csmMoveResourceEnvelopeSerializer,
  defaultErrorResponseDeserializer,
  validateRequestSerializer,
  validateResponseDeserializer,
  deploymentLocationsDeserializer,
  _aseRegionCollectionDeserializer,
  _billingMeterCollectionDeserializer,
  resourceNameAvailabilityDeserializer,
  _customHostnameSitesCollectionDeserializer,
  _geoRegionCollectionDeserializer,
  nameIdentifierSerializer,
  _identifierCollectionDeserializer,
  dnlResourceNameAvailabilityDeserializer,
  _premierAddOnOfferCollectionDeserializer,
  skuInfosDeserializer,
  vnetParametersSerializer,
  vnetValidationFailureDetailsDeserializer,
  userSerializer,
  userDeserializer,
  sourceControlSerializer,
  sourceControlDeserializer,
  _sourceControlCollectionDeserializer,
} from "../models/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  ListSourceControlsOptionalParams,
  UpdateSourceControlOptionalParams,
  GetSourceControlOptionalParams,
  UpdatePublishingUserOptionalParams,
  GetPublishingUserOptionalParams,
  MoveOptionalParams,
  VerifyHostingEnvironmentVnetOptionalParams,
  ListSkusOptionalParams,
  ListPremierAddOnOffersOptionalParams,
  RegionalCheckNameAvailabilityOptionalParams,
  ListSiteIdentifiersAssignedToHostNameOptionalParams,
  ListGeoRegionsOptionalParams,
  ListCustomHostNameSitesOptionalParams,
  CheckNameAvailabilityOptionalParams,
  ListBillingMetersOptionalParams,
  ListAseRegionsOptionalParams,
  GetSubscriptionDeploymentLocationsOptionalParams,
  ValidateOptionalParams,
  ValidateMoveOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSourceControlsSend(
  context: Client,
  options: ListSourceControlsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/sourcecontrols{?api%2Dversion}",
    {
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

export async function _listSourceControlsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SourceControlCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _sourceControlCollectionDeserializer(result.body);
}

/** Description for Gets the source controls available for Azure websites. */
export function listSourceControls(
  context: Client,
  options: ListSourceControlsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SourceControl> {
  return buildPagedAsyncIterator(
    context,
    () => _listSourceControlsSend(context, options),
    _listSourceControlsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _updateSourceControlSend(
  context: Client,
  sourceControlType: string,
  requestMessage: SourceControl,
  options: UpdateSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/sourcecontrols/{sourceControlType}{?api%2Dversion}",
    {
      sourceControlType: sourceControlType,
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
    body: sourceControlSerializer(requestMessage),
  });
}

export async function _updateSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Description for Updates source control token */
export async function updateSourceControl(
  context: Client,
  sourceControlType: string,
  requestMessage: SourceControl,
  options: UpdateSourceControlOptionalParams = { requestOptions: {} },
): Promise<SourceControl> {
  const result = await _updateSourceControlSend(
    context,
    sourceControlType,
    requestMessage,
    options,
  );
  return _updateSourceControlDeserialize(result);
}

export function _getSourceControlSend(
  context: Client,
  sourceControlType: string,
  options: GetSourceControlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/sourcecontrols/{sourceControlType}{?api%2Dversion}",
    {
      sourceControlType: sourceControlType,
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

export async function _getSourceControlDeserialize(
  result: PathUncheckedResponse,
): Promise<SourceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return sourceControlDeserializer(result.body);
}

/** Description for Gets source control token */
export async function getSourceControl(
  context: Client,
  sourceControlType: string,
  options: GetSourceControlOptionalParams = { requestOptions: {} },
): Promise<SourceControl> {
  const result = await _getSourceControlSend(context, sourceControlType, options);
  return _getSourceControlDeserialize(result);
}

export function _updatePublishingUserSend(
  context: Client,
  userDetails: User,
  options: UpdatePublishingUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/publishingUsers/web{?api%2Dversion}",
    {
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
    body: userSerializer(userDetails),
  });
}

export async function _updatePublishingUserDeserialize(
  result: PathUncheckedResponse,
): Promise<User> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return userDeserializer(result.body);
}

/** Description for Updates publishing user */
export async function updatePublishingUser(
  context: Client,
  userDetails: User,
  options: UpdatePublishingUserOptionalParams = { requestOptions: {} },
): Promise<User> {
  const result = await _updatePublishingUserSend(context, userDetails, options);
  return _updatePublishingUserDeserialize(result);
}

export function _getPublishingUserSend(
  context: Client,
  options: GetPublishingUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Web/publishingUsers/web{?api%2Dversion}",
    {
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

export async function _getPublishingUserDeserialize(result: PathUncheckedResponse): Promise<User> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return userDeserializer(result.body);
}

/** Description for Gets publishing user */
export async function getPublishingUser(
  context: Client,
  options: GetPublishingUserOptionalParams = { requestOptions: {} },
): Promise<User> {
  const result = await _getPublishingUserSend(context, options);
  return _getPublishingUserDeserialize(result);
}

export function _moveSend(
  context: Client,
  resourceGroupName: string,
  moveResourceEnvelope: CsmMoveResourceEnvelope,
  options: MoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/moveResources{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmMoveResourceEnvelopeSerializer(moveResourceEnvelope),
  });
}

export async function _moveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Move resources between resource groups. */
export async function move(
  context: Client,
  resourceGroupName: string,
  moveResourceEnvelope: CsmMoveResourceEnvelope,
  options: MoveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _moveSend(context, resourceGroupName, moveResourceEnvelope, options);
  return _moveDeserialize(result);
}

export function _verifyHostingEnvironmentVnetSend(
  context: Client,
  parameters: VnetParameters,
  options: VerifyHostingEnvironmentVnetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/verifyHostingEnvironmentVnet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: vnetParametersSerializer(parameters),
  });
}

export async function _verifyHostingEnvironmentVnetDeserialize(
  result: PathUncheckedResponse,
): Promise<VnetValidationFailureDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return vnetValidationFailureDetailsDeserializer(result.body);
}

/** Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the Network Security Group rules. */
export async function verifyHostingEnvironmentVnet(
  context: Client,
  parameters: VnetParameters,
  options: VerifyHostingEnvironmentVnetOptionalParams = { requestOptions: {} },
): Promise<VnetValidationFailureDetails> {
  const result = await _verifyHostingEnvironmentVnetSend(context, parameters, options);
  return _verifyHostingEnvironmentVnetDeserialize(result);
}

export function _listSkusSend(
  context: Client,
  options: ListSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/skus{?api%2Dversion}",
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

export async function _listSkusDeserialize(result: PathUncheckedResponse): Promise<SkuInfos> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return skuInfosDeserializer(result.body);
}

/** Description for List all SKUs. */
export async function listSkus(
  context: Client,
  options: ListSkusOptionalParams = { requestOptions: {} },
): Promise<SkuInfos> {
  const result = await _listSkusSend(context, options);
  return _listSkusDeserialize(result);
}

export function _listPremierAddOnOffersSend(
  context: Client,
  options: ListPremierAddOnOffersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/premieraddonoffers{?api%2Dversion}",
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

export async function _listPremierAddOnOffersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PremierAddOnOfferCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _premierAddOnOfferCollectionDeserializer(result.body);
}

/** Description for List all premier add-on offers. */
export function listPremierAddOnOffers(
  context: Client,
  options: ListPremierAddOnOffersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PremierAddOnOffer> {
  return buildPagedAsyncIterator(
    context,
    () => _listPremierAddOnOffersSend(context, options),
    _listPremierAddOnOffersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _regionalCheckNameAvailabilitySend(
  context: Client,
  location: string,
  name: string,
  typeParam: CheckNameResourceTypes,
  options: RegionalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/checknameavailability{?api%2Dversion}",
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
    body: {
      resourceGroupName: options?.resourceGroupName,
      autoGeneratedDomainNameLabelScope: options?.autoGeneratedDomainNameLabelScope,
      name: name,
      type: typeParam,
    },
  });
}

export async function _regionalCheckNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<DnlResourceNameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return dnlResourceNameAvailabilityDeserializer(result.body);
}

/** Check if a resource name is available for DNL sites. */
export async function regionalCheckNameAvailability(
  context: Client,
  location: string,
  name: string,
  typeParam: CheckNameResourceTypes,
  options: RegionalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<DnlResourceNameAvailability> {
  const result = await _regionalCheckNameAvailabilitySend(
    context,
    location,
    name,
    typeParam,
    options,
  );
  return _regionalCheckNameAvailabilityDeserialize(result);
}

export function _listSiteIdentifiersAssignedToHostNameSend(
  context: Client,
  nameIdentifier: NameIdentifier,
  options: ListSiteIdentifiersAssignedToHostNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/listSitesAssignedToHostName{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: nameIdentifierSerializer(nameIdentifier),
  });
}

export async function _listSiteIdentifiersAssignedToHostNameDeserialize(
  result: PathUncheckedResponse,
): Promise<_IdentifierCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _identifierCollectionDeserializer(result.body);
}

/** Description for List all apps that are assigned to a hostname. */
export function listSiteIdentifiersAssignedToHostName(
  context: Client,
  nameIdentifier: NameIdentifier,
  options: ListSiteIdentifiersAssignedToHostNameOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Identifier> {
  return buildPagedAsyncIterator(
    context,
    () => _listSiteIdentifiersAssignedToHostNameSend(context, nameIdentifier, options),
    _listSiteIdentifiersAssignedToHostNameDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listGeoRegionsSend(
  context: Client,
  options: ListGeoRegionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/geoRegions{?api%2Dversion,sku,linuxWorkersEnabled,xenonWorkersEnabled,linuxDynamicWorkersEnabled,customModeWorkersEnabled}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      sku: options?.sku,
      linuxWorkersEnabled: options?.linuxWorkersEnabled,
      xenonWorkersEnabled: options?.xenonWorkersEnabled,
      linuxDynamicWorkersEnabled: options?.linuxDynamicWorkersEnabled,
      customModeWorkersEnabled: options?.customModeWorkersEnabled,
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

export async function _listGeoRegionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_GeoRegionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _geoRegionCollectionDeserializer(result.body);
}

/** Description for Get a list of available geographical regions. */
export function listGeoRegions(
  context: Client,
  options: ListGeoRegionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GeoRegion> {
  return buildPagedAsyncIterator(
    context,
    () => _listGeoRegionsSend(context, options),
    _listGeoRegionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listCustomHostNameSitesSend(
  context: Client,
  options: ListCustomHostNameSitesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/customhostnameSites{?api%2Dversion,hostname}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      hostname: options?.hostname,
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

export async function _listCustomHostNameSitesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomHostnameSitesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _customHostnameSitesCollectionDeserializer(result.body);
}

/** Get custom hostnames under this subscription */
export function listCustomHostNameSites(
  context: Client,
  options: ListCustomHostNameSitesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomHostnameSites> {
  return buildPagedAsyncIterator(
    context,
    () => _listCustomHostNameSitesSend(context, options),
    _listCustomHostNameSitesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _checkNameAvailabilitySend(
  context: Client,
  name: string,
  typeParam: CheckNameResourceTypes,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/checknameavailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: {
      name: name,
      type: typeParam,
      isFqdn: options?.isFqdn,
      environmentId: options?.environmentId,
    },
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceNameAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return resourceNameAvailabilityDeserializer(result.body);
}

/** Description for Check if a resource name is available. */
export async function checkNameAvailability(
  context: Client,
  name: string,
  typeParam: CheckNameResourceTypes,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<ResourceNameAvailability> {
  const result = await _checkNameAvailabilitySend(context, name, typeParam, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listBillingMetersSend(
  context: Client,
  options: ListBillingMetersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/billingMeters{?api%2Dversion,billingLocation,osType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
      billingLocation: options?.billingLocation,
      osType: options?.osType,
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

export async function _listBillingMetersDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingMeterCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _billingMeterCollectionDeserializer(result.body);
}

/** Description for Gets a list of meters for a given location. */
export function listBillingMeters(
  context: Client,
  options: ListBillingMetersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingMeter> {
  return buildPagedAsyncIterator(
    context,
    () => _listBillingMetersSend(context, options),
    _listBillingMetersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listAseRegionsSend(
  context: Client,
  options: ListAseRegionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/aseRegions{?api%2Dversion}",
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

export async function _listAseRegionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AseRegionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _aseRegionCollectionDeserializer(result.body);
}

/** Description for get a list of available ASE regions and its supported Skus. */
export function listAseRegions(
  context: Client,
  options: ListAseRegionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AseRegion> {
  return buildPagedAsyncIterator(
    context,
    () => _listAseRegionsSend(context, options),
    _listAseRegionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _getSubscriptionDeploymentLocationsSend(
  context: Client,
  options: GetSubscriptionDeploymentLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deploymentLocations{?api%2Dversion}",
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

export async function _getSubscriptionDeploymentLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentLocations> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentLocationsDeserializer(result.body);
}

/** Description for Gets list of available geo regions plus ministamps */
export async function getSubscriptionDeploymentLocations(
  context: Client,
  options: GetSubscriptionDeploymentLocationsOptionalParams = { requestOptions: {} },
): Promise<DeploymentLocations> {
  const result = await _getSubscriptionDeploymentLocationsSend(context, options);
  return _getSubscriptionDeploymentLocationsDeserialize(result);
}

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  validateRequest: ValidateRequest,
  options: ValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/validate{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
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
    body: validateRequestSerializer(validateRequest),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return validateResponseDeserializer(result.body);
}

/** Description for Validate if a resource can be created. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  validateRequest: ValidateRequest,
  options: ValidateOptionalParams = { requestOptions: {} },
): Promise<ValidateResponse> {
  const result = await _validateSend(context, resourceGroupName, validateRequest, options);
  return _validateDeserialize(result);
}

export function _validateMoveSend(
  context: Client,
  resourceGroupName: string,
  moveResourceEnvelope: CsmMoveResourceEnvelope,
  options: ValidateMoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/validateMoveResources{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: csmMoveResourceEnvelopeSerializer(moveResourceEnvelope),
  });
}

export async function _validateMoveDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Validate whether a resource can be moved. */
export async function validateMove(
  context: Client,
  resourceGroupName: string,
  moveResourceEnvelope: CsmMoveResourceEnvelope,
  options: ValidateMoveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _validateMoveSend(context, resourceGroupName, moveResourceEnvelope, options);
  return _validateMoveDeserialize(result);
}
