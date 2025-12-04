// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
import type {
  DeploymentUnion,
  _PagedDeployment} from "../../models/models.js";
import {
  deploymentUnionDeserializer,
  _pagedDeploymentDeserializer,
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DeploymentsListOptionalParams, DeploymentsGetOptionalParams } from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deployments{?api-version,modelPublisher,modelName,deploymentType}",
    {
      "api-version": context.apiVersion,
      modelPublisher: options?.modelPublisher,
      modelName: options?.modelName,
      deploymentType: options?.deploymentType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PagedDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDeploymentDeserializer(result.body);
}

/** List all deployed models in the project */
export function list(
  context: Client,
  options: DeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  name: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deployments/{name}{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeploymentUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deploymentUnionDeserializer(result.body);
}

/** Get a deployed model. */
export async function get(
  context: Client,
  name: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<DeploymentUnion> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}
