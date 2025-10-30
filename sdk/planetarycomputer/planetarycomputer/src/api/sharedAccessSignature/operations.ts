// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProContext as Client } from "../index.js";
import {
  SharedAccessSignatureSignedLink,
  sharedAccessSignatureSignedLinkDeserializer,
  SharedAccessSignatureToken,
  sharedAccessSignatureTokenDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SharedAccessSignatureRevokeTokenOptionalParams,
  SharedAccessSignatureGetTokenOptionalParams,
  SharedAccessSignatureGetSignOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _revokeTokenSend(
  context: Client,
  options: SharedAccessSignatureRevokeTokenOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/sas/token/revoke{?api%2Dversion,duration}",
    {
      "api%2Dversion": context.apiVersion,
      duration: options?.durationInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Revoke a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for managed storage account of this GeoCatalog.
 */
export async function revokeToken(
  context: Client,
  options: SharedAccessSignatureRevokeTokenOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _revokeTokenSend(context, options);
  return _revokeTokenDeserialize(result);
}

export function _getTokenSend(
  context: Client,
  collectionId: string,
  options: SharedAccessSignatureGetTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/sas/token/{collectionId}{?api%2Dversion,duration}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
      duration: options?.durationInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessSignatureToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sharedAccessSignatureTokenDeserializer(result.body);
}

/**
 * Generate a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
 * for the given storage account and container. The storage account and container
 * must be associated with a Planetary Computer dataset indexed by the STAC API.
 */
export async function getToken(
  context: Client,
  collectionId: string,
  options: SharedAccessSignatureGetTokenOptionalParams = { requestOptions: {} },
): Promise<SharedAccessSignatureToken> {
  const result = await _getTokenSend(context, collectionId, options);
  return _getTokenDeserialize(result);
}

export function _getSignSend(
  context: Client,
  href: string,
  options: SharedAccessSignatureGetSignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/sas/sign{?api%2Dversion,href,duration}",
    {
      "api%2Dversion": context.apiVersion,
      href: href,
      duration: options?.durationInMinutes,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSignDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessSignatureSignedLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sharedAccessSignatureSignedLinkDeserializer(result.body);
}

/**
 * Signs a HREF (a link URL) by appending a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works).
 * If the HREF is not a Azure Blob Storage HREF, then pass back the HREF unsigned.
 */
export async function getSign(
  context: Client,
  href: string,
  options: SharedAccessSignatureGetSignOptionalParams = { requestOptions: {} },
): Promise<SharedAccessSignatureSignedLink> {
  const result = await _getSignSend(context, href, options);
  return _getSignDeserialize(result);
}
