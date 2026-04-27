// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateRegistrationManagementContext as Client } from "../index.js";
import type { DetectorResponse, _DetectorResponseCollection } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  detectorResponseDeserializer,
  _detectorResponseCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
  CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAppServiceCertificateOrderDetectorResponseSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/detectors{?api%2Dversion}",
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

export async function _listAppServiceCertificateOrderDetectorResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<_DetectorResponseCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _detectorResponseCollectionDeserializer(result.body);
}

/** Description for Microsoft.CertificateRegistration to get the list of detectors for this RP. */
export function listAppServiceCertificateOrderDetectorResponse(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  options: CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DetectorResponse> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAppServiceCertificateOrderDetectorResponseSend(
        context,
        resourceGroupName,
        certificateOrderName,
        options,
      ),
    _listAppServiceCertificateOrderDetectorResponseDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _getAppServiceCertificateOrderDetectorResponseSend(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  detectorName: string,
  options: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/detectors/{detectorName}{?api%2Dversion,startTime,endTime,timeGrain}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      certificateOrderName: certificateOrderName,
      detectorName: detectorName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
      startTime: !options?.startTime ? options?.startTime : options?.startTime.toISOString(),
      endTime: !options?.endTime ? options?.endTime : options?.endTime.toISOString(),
      timeGrain: options?.timeGrain,
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

export async function _getAppServiceCertificateOrderDetectorResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<DetectorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return detectorResponseDeserializer(result.body);
}

/** Description for Microsoft.CertificateRegistration call to get a detector response from App Lens. */
export async function getAppServiceCertificateOrderDetectorResponse(
  context: Client,
  resourceGroupName: string,
  certificateOrderName: string,
  detectorName: string,
  options: CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams = {
    requestOptions: {},
  },
): Promise<DetectorResponse> {
  const result = await _getAppServiceCertificateOrderDetectorResponseSend(
    context,
    resourceGroupName,
    certificateOrderName,
    detectorName,
    options,
  );
  return _getAppServiceCertificateOrderDetectorResponseDeserialize(result);
}
