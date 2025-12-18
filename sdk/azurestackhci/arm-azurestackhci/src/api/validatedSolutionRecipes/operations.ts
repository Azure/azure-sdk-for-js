// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidatedSolutionRecipe,
  validatedSolutionRecipeDeserializer,
  _ValidatedSolutionRecipeListResult,
  _validatedSolutionRecipeListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams,
  ValidatedSolutionRecipesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/validatedSolutionRecipes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ValidatedSolutionRecipeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _validatedSolutionRecipeListResultDeserializer(result.body);
}

/** List all validated solution recipes. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ValidatedSolutionRecipe> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  validatedSolutionRecipeName: string,
  options: ValidatedSolutionRecipesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/validatedSolutionRecipes/{validatedSolutionRecipeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      validatedSolutionRecipeName: validatedSolutionRecipeName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidatedSolutionRecipe> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validatedSolutionRecipeDeserializer(result.body);
}

/** Get a validated solution recipe. */
export async function get(
  context: Client,
  location: string,
  validatedSolutionRecipeName: string,
  options: ValidatedSolutionRecipesGetOptionalParams = { requestOptions: {} },
): Promise<ValidatedSolutionRecipe> {
  const result = await _getSend(context, location, validatedSolutionRecipeName, options);
  return _getDeserialize(result);
}
