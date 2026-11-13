// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext as Client } from "../index.js";
import type { Agreement, _AgreementListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  agreementSerializer,
  agreementDeserializer,
  _agreementListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgreementsDeleteOptionalParams,
  AgreementsCreateOrUpdateOptionalParams,
  AgreementsListBySubscriptionOptionalParams,
  AgreementsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  agreementName: string,
  options: AgreementsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Anyscale.Platform/agreements/{agreementName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      agreementName: agreementName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Revoke the subscription's acceptance of the agreement. Refused (rejected at validation, before begin) while the subscription still has active Anyscale clouds, since those clouds depend on the accepted agreement -- delete the clouds first. Once permitted, the catalog entry persists (a subsequent GET returns status "Pending") and only the signed record is removed; idempotent. */
export async function $delete(
  context: Client,
  agreementName: string,
  options: AgreementsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, agreementName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  agreementName: string,
  resource: Agreement,
  options: AgreementsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Anyscale.Platform/agreements/{agreementName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      agreementName: agreementName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: agreementSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Agreement> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agreementDeserializer(result.body);
}

/** Sign the agreement via PUT. The request body is intentionally empty -- send `{"properties": {}}`. Every agreement property is RP-managed and read-only, so any value supplied in the body is ignored; the accepting identity is taken from the ARM caller token, not the payload. Idempotent -- PUT-ting an already-Active agreement is a no-op. */
export async function createOrUpdate(
  context: Client,
  agreementName: string,
  resource: Agreement,
  options: AgreementsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Agreement> {
  const result = await _createOrUpdateSend(context, agreementName, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: AgreementsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Anyscale.Platform/agreements{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgreementListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agreementListResultDeserializer(result.body);
}

/** List the agreements available to the subscription. */
export function listBySubscription(
  context: Client,
  options: AgreementsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agreement> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _getSend(
  context: Client,
  agreementName: string,
  options: AgreementsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Anyscale.Platform/agreements/{agreementName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      agreementName: agreementName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Agreement> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agreementDeserializer(result.body);
}

/** Get an agreement. Returns the catalog entry (status "Pending") until accepted, then the full signed record. */
export async function get(
  context: Client,
  agreementName: string,
  options: AgreementsGetOptionalParams = { requestOptions: {} },
): Promise<Agreement> {
  const result = await _getSend(context, agreementName, options);
  return _getDeserialize(result);
}
