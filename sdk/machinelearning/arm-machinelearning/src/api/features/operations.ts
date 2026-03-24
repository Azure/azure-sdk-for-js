// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type { Feature, _FeatureResourceArmPaginatedResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  featureDeserializer,
  _featureResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FeaturesListOptionalParams, FeaturesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  featuresetName: string,
  featuresetVersion: string,
  options: FeaturesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features{?api%2Dversion,%24skip,tags,featureName,description,listViewType,pageSize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      featuresetName: featuresetName,
      featuresetVersion: featuresetVersion,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      "%24skip": options?.skip,
      tags: options?.tags,
      featureName: options?.featureName,
      description: options?.description,
      listViewType: options?.listViewType,
      pageSize: options?.pageSize ?? 1000,
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
): Promise<_FeatureResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _featureResourceArmPaginatedResultDeserializer(result.body);
}

/** List Features. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  featuresetName: string,
  featuresetVersion: string,
  options: FeaturesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Feature> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        workspaceName,
        featuresetName,
        featuresetVersion,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  featuresetName: string,
  featuresetVersion: string,
  featureName: string,
  options: FeaturesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      featuresetName: featuresetName,
      featuresetVersion: featuresetVersion,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Feature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return featureDeserializer(result.body);
}

/** Get feature. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  featuresetName: string,
  featuresetVersion: string,
  featureName: string,
  options: FeaturesGetOptionalParams = { requestOptions: {} },
): Promise<Feature> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    featuresetName,
    featuresetVersion,
    featureName,
    options,
  );
  return _getDeserialize(result);
}
