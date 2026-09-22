// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext as Client } from "../index.js";
import type {
  TopLevelDomain,
  _TopLevelDomainCollection,
  TopLevelDomainAgreementOption,
  _TldLegalAgreementCollection,
  TldLegalAgreement,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  topLevelDomainDeserializer,
  _topLevelDomainCollectionDeserializer,
  topLevelDomainAgreementOptionSerializer,
  _tldLegalAgreementCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TopLevelDomainsListAgreementsOptionalParams,
  TopLevelDomainsListOptionalParams,
  TopLevelDomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAgreementsSend(
  context: Client,
  name: string,
  agreementOption: TopLevelDomainAgreementOption,
  options: TopLevelDomainsListAgreementsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}/listAgreements{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      name: name,
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
    body: topLevelDomainAgreementOptionSerializer(agreementOption),
  });
}

export async function _listAgreementsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TldLegalAgreementCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _tldLegalAgreementCollectionDeserializer(result.body);
}

/** Description for Gets all legal agreements that user needs to accept before purchasing a domain. */
export function listAgreements(
  context: Client,
  name: string,
  agreementOption: TopLevelDomainAgreementOption,
  options: TopLevelDomainsListAgreementsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TldLegalAgreement> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgreementsSend(context, name, agreementOption, options),
    _listAgreementsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _listSend(
  context: Client,
  options: TopLevelDomainsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains{?api%2Dversion}",
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
): Promise<_TopLevelDomainCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _topLevelDomainCollectionDeserializer(result.body);
}

/** Description for Get all top-level domains supported for registration. */
export function list(
  context: Client,
  options: TopLevelDomainsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopLevelDomain> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: TopLevelDomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TopLevelDomain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return topLevelDomainDeserializer(result.body);
}

/** Description for Get details of a top-level domain. */
export async function get(
  context: Client,
  name: string,
  options: TopLevelDomainsGetOptionalParams = { requestOptions: {} },
): Promise<TopLevelDomain> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
