// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateRegistrationManagementContext as Client } from "../index.js";
import type {
  AppServiceCertificateOrder,
  AppServiceCertificateOrderPatchResource,
  _AppServiceCertificateOrderCollection,
  ReissueCertificateOrderRequest,
  RenewCertificateOrderRequest,
  NameIdentifier,
  SiteSealRequest,
  SiteSeal,
  CertificateOrderAction,
  CertificateEmail,
  AppServiceCertificateResource,
  AppServiceCertificatePatchResource,
  _AppServiceCertificateCollection,
} from "../../models/models.js";
import {
  appServiceCertificateOrderSerializer,
  appServiceCertificateOrderDeserializer,
  defaultErrorResponseDeserializer,
  appServiceCertificateOrderPatchResourceSerializer,
  _appServiceCertificateOrderCollectionDeserializer,
  reissueCertificateOrderRequestSerializer,
  renewCertificateOrderRequestSerializer,
  nameIdentifierSerializer,
  siteSealRequestSerializer,
  siteSealDeserializer,
  appServiceCertificateResourceSerializer,
  appServiceCertificateResourceDeserializer,
  appServiceCertificatePatchResourceSerializer,
  _appServiceCertificateCollectionDeserializer,
  certificateOrderActionArrayDeserializer,
  certificateEmailArrayDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams,
  AppServiceCertificateOrdersListCertificatesOptionalParams,
  AppServiceCertificateOrdersDeleteCertificateOptionalParams,
  AppServiceCertificateOrdersUpdateCertificateOptionalParams,
  AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams,
  AppServiceCertificateOrdersGetCertificateOptionalParams,
  AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams,
  AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams,
  AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams,
  AppServiceCertificateOrdersRetrieveSiteSealOptionalParams,
  AppServiceCertificateOrdersResendRequestEmailsOptionalParams,
  AppServiceCertificateOrdersResendEmailOptionalParams,
  AppServiceCertificateOrdersRenewOptionalParams,
  AppServiceCertificateOrdersReissueOptionalParams,
  AppServiceCertificateOrdersListOptionalParams,
  AppServiceCertificateOrdersListByResourceGroupOptionalParams,
  AppServiceCertificateOrdersDeleteOptionalParams,
  AppServiceCertificateOrdersUpdateOptionalParams,
  AppServiceCertificateOrdersCreateOrUpdateOptionalParams,
  AppServiceCertificateOrdersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validatePurchaseInformationSend(
  context: Client,
  appServiceCertificateOrder: AppServiceCertificateOrder,
  options: AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CertificateRegistration/validateCertificateRegistrationInformation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: appServiceCertificateOrderSerializer(appServiceCertificateOrder),
  });
}

export async function _validatePurchaseInformationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Validate information for a certificate order. */
export async function validatePurchaseInformation(
  context: Client,
  appServiceCertificateOrder: AppServiceCertificateOrder,
  options: AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _validatePurchaseInformationSend(
    context,
    appServiceCertificateOrder,
    options,
  );
  return _validatePurchaseInformationDeserialize(result);
}

export function _listCertificatesSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersListCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppServiceCertificateCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _appServiceCertificateCollectionDeserializer(result.body);
}

/** Description for List all certificates associated with a certificate order. */
export function listCertificates(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersListCertificatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceCertificateResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listCertificatesSend(context, resourceGroupName, certificateOrderName, options),
    _listCertificatesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _deleteCertificateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  options: AppServiceCertificateOrdersDeleteCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteCertificateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete the certificate associated with a certificate order. */
export async function deleteCertificate(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  options: AppServiceCertificateOrdersDeleteCertificateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteCertificateSend(
    context,
    resourceGroupName,
    certificateOrderName,
    name,
    options,
  );
  return _deleteCertificateDeserialize(result);
}

export function _updateCertificateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  keyVaultCertificate: AppServiceCertificatePatchResource,
  options: AppServiceCertificateOrdersUpdateCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceCertificatePatchResourceSerializer(keyVaultCertificate),
  });
}

export async function _updateCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateResourceDeserializer(result.body);
}

/** Description for Creates or updates a certificate and associates with key vault secret. */
export async function updateCertificate(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  keyVaultCertificate: AppServiceCertificatePatchResource,
  options: AppServiceCertificateOrdersUpdateCertificateOptionalParams = { requestOptions: {} },
): Promise<AppServiceCertificateResource> {
  const result = await _updateCertificateSend(
    context,
    resourceGroupName,
    certificateOrderName,
    name,
    keyVaultCertificate,
    options,
  );
  return _updateCertificateDeserialize(result);
}

export function _createOrUpdateCertificateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  keyVaultCertificate: AppServiceCertificateResource,
  options: AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceCertificateResourceSerializer(keyVaultCertificate),
  });
}

export async function _createOrUpdateCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateResourceDeserializer(result.body);
}

/** Description for Creates or updates a certificate and associates with key vault secret. */
export function createOrUpdateCertificate(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  keyVaultCertificate: AppServiceCertificateResource,
  options: AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<AppServiceCertificateResource>, AppServiceCertificateResource> {
  return getLongRunningPoller(
    context,
    _createOrUpdateCertificateDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateCertificateSend(
          context,
          resourceGroupName,
          certificateOrderName,
          name,
          keyVaultCertificate,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-11-01",
    },
  ) as PollerLike<OperationState<AppServiceCertificateResource>, AppServiceCertificateResource>;
}

export function _getCertificateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  options: AppServiceCertificateOrdersGetCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _getCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateResourceDeserializer(result.body);
}

/** Description for Get the certificate associated with a certificate order. */
export async function getCertificate(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  name: string,
  options: AppServiceCertificateOrdersGetCertificateOptionalParams = { requestOptions: {} },
): Promise<AppServiceCertificateResource> {
  const result = await _getCertificateSend(
    context,
    resourceGroupName,
    certificateOrderName,
    name,
    options,
  );
  return _getCertificateDeserialize(result);
}

export function _retrieveCertificateEmailHistorySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{name}/retrieveEmailHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _retrieveCertificateEmailHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateEmail[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateEmailArrayDeserializer(result.body);
}

/** Description for Retrieve email history. */
export async function retrieveCertificateEmailHistory(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams = {
    requestOptions: {},
  },
): Promise<CertificateEmail[]> {
  const result = await _retrieveCertificateEmailHistorySend(
    context,
    resourceGroupName,
    name,
    options,
  );
  return _retrieveCertificateEmailHistoryDeserialize(result);
}

export function _retrieveCertificateActionsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{name}/retrieveCertificateActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _retrieveCertificateActionsDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateOrderAction[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return certificateOrderActionArrayDeserializer(result.body);
}

/** Description for Retrieve the list of certificate actions. */
export async function retrieveCertificateActions(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams = {
    requestOptions: {},
  },
): Promise<CertificateOrderAction[]> {
  const result = await _retrieveCertificateActionsSend(context, resourceGroupName, name, options);
  return _retrieveCertificateActionsDeserialize(result);
}

export function _verifyDomainOwnershipSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/verifyDomainOwnership{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _verifyDomainOwnershipDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Verify domain ownership for this certificate order. */
export async function verifyDomainOwnership(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _verifyDomainOwnershipSend(
    context,
    resourceGroupName,
    certificateOrderName,
    options,
  );
  return _verifyDomainOwnershipDeserialize(result);
}

export function _retrieveSiteSealSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  siteSealRequest: SiteSealRequest,
  options: AppServiceCertificateOrdersRetrieveSiteSealOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/retrieveSiteSeal{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: siteSealRequestSerializer(siteSealRequest),
  });
}

export async function _retrieveSiteSealDeserialize(
  result: PathUncheckedResponse,
): Promise<SiteSeal> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return siteSealDeserializer(result.body);
}

/** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
export async function retrieveSiteSeal(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  siteSealRequest: SiteSealRequest,
  options: AppServiceCertificateOrdersRetrieveSiteSealOptionalParams = { requestOptions: {} },
): Promise<SiteSeal> {
  const result = await _retrieveSiteSealSend(
    context,
    resourceGroupName,
    certificateOrderName,
    siteSealRequest,
    options,
  );
  return _retrieveSiteSealDeserialize(result);
}

export function _resendRequestEmailsSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  nameIdentifier: NameIdentifier,
  options: AppServiceCertificateOrdersResendRequestEmailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/resendRequestEmails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: nameIdentifierSerializer(nameIdentifier),
  });
}

export async function _resendRequestEmailsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
export async function resendRequestEmails(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  nameIdentifier: NameIdentifier,
  options: AppServiceCertificateOrdersResendRequestEmailsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resendRequestEmailsSend(
    context,
    resourceGroupName,
    certificateOrderName,
    nameIdentifier,
    options,
  );
  return _resendRequestEmailsDeserialize(result);
}

export function _resendEmailSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersResendEmailOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/resendEmail{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resendEmailDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Resend certificate email. */
export async function resendEmail(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersResendEmailOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resendEmailSend(context, resourceGroupName, certificateOrderName, options);
  return _resendEmailDeserialize(result);
}

export function _renewSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  renewCertificateOrderRequest: RenewCertificateOrderRequest,
  options: AppServiceCertificateOrdersRenewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/renew{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: renewCertificateOrderRequestSerializer(renewCertificateOrderRequest),
  });
}

export async function _renewDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Renew an existing certificate order. */
export async function renew(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  renewCertificateOrderRequest: RenewCertificateOrderRequest,
  options: AppServiceCertificateOrdersRenewOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _renewSend(
    context,
    resourceGroupName,
    certificateOrderName,
    renewCertificateOrderRequest,
    options,
  );
  return _renewDeserialize(result);
}

export function _reissueSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  reissueCertificateOrderRequest: ReissueCertificateOrderRequest,
  options: AppServiceCertificateOrdersReissueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/reissue{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: reissueCertificateOrderRequestSerializer(reissueCertificateOrderRequest),
  });
}

export async function _reissueDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Reissue an existing certificate order. */
export async function reissue(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  reissueCertificateOrderRequest: ReissueCertificateOrderRequest,
  options: AppServiceCertificateOrdersReissueOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _reissueSend(
    context,
    resourceGroupName,
    certificateOrderName,
    reissueCertificateOrderRequest,
    options,
  );
  return _reissueDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AppServiceCertificateOrdersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CertificateRegistration/certificateOrders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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
): Promise<_AppServiceCertificateOrderCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _appServiceCertificateOrderCollectionDeserializer(result.body);
}

/** Description for List all certificate orders in a subscription. */
export function list(
  context: Client,
  options: AppServiceCertificateOrdersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceCertificateOrder> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AppServiceCertificateOrdersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppServiceCertificateOrderCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _appServiceCertificateOrderCollectionDeserializer(result.body);
}

/** Description for Get certificate orders in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AppServiceCertificateOrdersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppServiceCertificateOrder> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Description for Delete an existing certificate order. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, certificateOrderName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  certificateDistinguishedName: AppServiceCertificateOrderPatchResource,
  options: AppServiceCertificateOrdersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceCertificateOrderPatchResourceSerializer(certificateDistinguishedName),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateOrder> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateOrderDeserializer(result.body);
}

/** Description for Create or update a certificate purchase order. */
export async function update(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  certificateDistinguishedName: AppServiceCertificateOrderPatchResource,
  options: AppServiceCertificateOrdersUpdateOptionalParams = { requestOptions: {} },
): Promise<AppServiceCertificateOrder> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    certificateOrderName,
    certificateDistinguishedName,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  certificateDistinguishedName: AppServiceCertificateOrder,
  options: AppServiceCertificateOrdersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appServiceCertificateOrderSerializer(certificateDistinguishedName),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateOrder> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateOrderDeserializer(result.body);
}

/** Description for Create or update a certificate purchase order. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  certificateDistinguishedName: AppServiceCertificateOrder,
  options: AppServiceCertificateOrdersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AppServiceCertificateOrder>, AppServiceCertificateOrder> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        certificateOrderName,
        certificateDistinguishedName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-11-01",
  }) as PollerLike<OperationState<AppServiceCertificateOrder>, AppServiceCertificateOrder>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AppServiceCertificateOrder> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return appServiceCertificateOrderDeserializer(result.body);
}

/** Description for Get a certificate order. */
export async function get(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: AppServiceCertificateOrdersGetOptionalParams = { requestOptions: {} },
): Promise<AppServiceCertificateOrder> {
  const result = await _getSend(context, resourceGroupName, certificateOrderName, options);
  return _getDeserialize(result);
}
