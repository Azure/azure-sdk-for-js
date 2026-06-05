// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext as Client } from "./index.js";
import {
  RedeemRequest,
  redeemRequestSerializer,
  errorResponseBodyDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { RedeemInvitationCodeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _redeemInvitationCodeSend(
  context: Client,
  parameters: RedeemRequest,
  options: RedeemInvitationCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Education/redeemInvitationCode{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: redeemRequestSerializer(parameters),
  });
}

export async function _redeemInvitationCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseBodyDeserializer(result.body);

    throw error;
  }

  return;
}

/** Redeem invite code to join a redeemable lab */
export async function redeemInvitationCode(
  context: Client,
  parameters: RedeemRequest,
  options: RedeemInvitationCodeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _redeemInvitationCodeSend(context, parameters, options);
  return _redeemInvitationCodeDeserialize(result);
}
