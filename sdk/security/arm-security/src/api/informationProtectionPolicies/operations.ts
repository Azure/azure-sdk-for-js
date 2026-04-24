// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  LegacySettingsAPIInformationProtectionPolicy,
  LegacySettingsAPIInformationProtectionPolicyName,
  _LegacySettingsAPIInformationProtectionPolicyList,
} from "../../models/legacySettingsAPI/models.js";
import {
  legacySettingsAPIInformationProtectionPolicySerializer,
  legacySettingsAPIInformationProtectionPolicyDeserializer,
  _legacySettingsAPIInformationProtectionPolicyListDeserializer,
} from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InformationProtectionPoliciesListOptionalParams,
  InformationProtectionPoliciesCreateOrUpdateOptionalParams,
  InformationProtectionPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: InformationProtectionPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/informationProtectionPolicies{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<_LegacySettingsAPIInformationProtectionPolicyList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _legacySettingsAPIInformationProtectionPolicyListDeserializer(result.body);
}

/** Information protection policies of a specific management group. */
export function list(
  context: Client,
  scope: string,
  options: InformationProtectionPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LegacySettingsAPIInformationProtectionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2017-08-01-preview" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  informationProtectionPolicyName: LegacySettingsAPIInformationProtectionPolicyName,
  informationProtectionPolicy: LegacySettingsAPIInformationProtectionPolicy,
  options: InformationProtectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/informationProtectionPolicies/{informationProtectionPolicyName}{?api%2Dversion}",
    {
      scope: scope,
      informationProtectionPolicyName: informationProtectionPolicyName,
      "api%2Dversion": "2017-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: legacySettingsAPIInformationProtectionPolicySerializer(informationProtectionPolicy),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LegacySettingsAPIInformationProtectionPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return legacySettingsAPIInformationProtectionPolicyDeserializer(result.body);
}

/** Details of the information protection policy. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  informationProtectionPolicyName: LegacySettingsAPIInformationProtectionPolicyName,
  informationProtectionPolicy: LegacySettingsAPIInformationProtectionPolicy,
  options: InformationProtectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<LegacySettingsAPIInformationProtectionPolicy> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    informationProtectionPolicyName,
    informationProtectionPolicy,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  informationProtectionPolicyName: LegacySettingsAPIInformationProtectionPolicyName,
  options: InformationProtectionPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/informationProtectionPolicies/{informationProtectionPolicyName}{?api%2Dversion}",
    {
      scope: scope,
      informationProtectionPolicyName: informationProtectionPolicyName,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<LegacySettingsAPIInformationProtectionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return legacySettingsAPIInformationProtectionPolicyDeserializer(result.body);
}

/** Details of the information protection policy. */
export async function get(
  context: Client,
  scope: string,
  informationProtectionPolicyName: LegacySettingsAPIInformationProtectionPolicyName,
  options: InformationProtectionPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<LegacySettingsAPIInformationProtectionPolicy> {
  const result = await _getSend(context, scope, informationProtectionPolicyName, options);
  return _getDeserialize(result);
}
