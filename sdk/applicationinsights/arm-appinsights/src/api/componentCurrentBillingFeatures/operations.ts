// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  ApplicationInsightsComponentBillingFeatures,
  applicationInsightsComponentBillingFeaturesSerializer,
  applicationInsightsComponentBillingFeaturesDeserializer,
} from "../../models/componentAPIs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ComponentCurrentBillingFeaturesUpdateOptionalParams,
  ComponentCurrentBillingFeaturesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures,
  options: ComponentCurrentBillingFeaturesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/currentbillingfeatures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationInsightsComponentBillingFeaturesSerializer(billingFeaturesProperties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentBillingFeatures> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentBillingFeaturesDeserializer(result.body);
}

/** Update current billing features for an Application Insights component. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  billingFeaturesProperties: ApplicationInsightsComponentBillingFeatures,
  options: ComponentCurrentBillingFeaturesUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentBillingFeatures> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    billingFeaturesProperties,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentCurrentBillingFeaturesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/currentbillingfeatures{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
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
): Promise<ApplicationInsightsComponentBillingFeatures> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentBillingFeaturesDeserializer(result.body);
}

/** Returns current billing features for an Application Insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentCurrentBillingFeaturesGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentBillingFeatures> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
