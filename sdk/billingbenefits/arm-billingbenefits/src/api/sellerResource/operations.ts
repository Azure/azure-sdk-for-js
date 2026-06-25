// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Macc,
  maccArrayDeserializer,
  SellerResourceListRequest,
  sellerResourceListRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SellerResourceListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  body: SellerResourceListRequest,
  options: SellerResourceListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/listSellerResources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: sellerResourceListRequestSerializer(body),
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<Macc[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return maccArrayDeserializer(result.body);
}

/** List maccs by billing account */
export async function list(
  context: Client,
  body: SellerResourceListRequest,
  options: SellerResourceListOptionalParams = { requestOptions: {} },
): Promise<Macc[]> {
  const result = await _listSend(context, body, options);
  return _listDeserialize(result);
}
