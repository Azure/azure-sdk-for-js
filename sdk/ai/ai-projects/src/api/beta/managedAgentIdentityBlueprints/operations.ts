// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  ManagedAgentIdentityBlueprint,
  PagedManagedAgentIdentityBlueprint,
} from "../../../models/models.js";
import {
  apiErrorResponseDeserializer,
  KnownApiVersions,
  managedAgentIdentityBlueprintDeserializer,
  pagedManagedAgentIdentityBlueprintDeserializer,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaManagedAgentIdentityBlueprintsListOptionalParams,
  BetaManagedAgentIdentityBlueprintsDeleteOptionalParams,
  BetaManagedAgentIdentityBlueprintsGetOptionalParams,
  CreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  options: BetaManagedAgentIdentityBlueprintsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints{?order,limit,api-version}",
    {
      order: options?.order,
      limit: options?.limit,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return pagedManagedAgentIdentityBlueprintDeserializer(result.body);
}

export async function list(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  options: BetaManagedAgentIdentityBlueprintsListOptionalParams = { requestOptions: {} },
): Promise<PagedManagedAgentIdentityBlueprint> {
  const result = await _listSend(context, foundryFeatures, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  options: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a managed agent identity blueprint by name. */
export async function $delete(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  options: BetaManagedAgentIdentityBlueprintsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, foundryFeatures, blueprintName, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  options: BetaManagedAgentIdentityBlueprintsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return managedAgentIdentityBlueprintDeserializer(result.body);
}

/** Retrieves a managed agent identity blueprint by name. */
export async function get(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  options: BetaManagedAgentIdentityBlueprintsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedAgentIdentityBlueprint> {
  const result = await _getSend(context, foundryFeatures, blueprintName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  name: string,
  options: CreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { name: name },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return managedAgentIdentityBlueprintDeserializer(result.body);
}

export async function createOrUpdate(
  context: Client,
  foundryFeatures: "AgentEndpoints=V1Preview",
  blueprintName: string,
  name: string,
  options: CreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedAgentIdentityBlueprint> {
  const result = await _createOrUpdateSend(context, foundryFeatures, blueprintName, name, options);
  return _createOrUpdateDeserialize(result);
}
