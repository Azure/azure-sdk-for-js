// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listBySubscriptionLocationResource,
  get,
} from "../../api/validatedSolutionRecipes/operations.js";
import {
  ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams,
  ValidatedSolutionRecipesGetOptionalParams,
} from "../../api/validatedSolutionRecipes/options.js";
import { ValidatedSolutionRecipe } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ValidatedSolutionRecipes operations. */
export interface ValidatedSolutionRecipesOperations {
  /** List all validated solution recipes. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<ValidatedSolutionRecipe>;
  /** Get a validated solution recipe. */
  get: (
    location: string,
    validatedSolutionRecipeName: string,
    options?: ValidatedSolutionRecipesGetOptionalParams,
  ) => Promise<ValidatedSolutionRecipe>;
}

function _getValidatedSolutionRecipes(context: AzureStackHCIContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: ValidatedSolutionRecipesListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    get: (
      location: string,
      validatedSolutionRecipeName: string,
      options?: ValidatedSolutionRecipesGetOptionalParams,
    ) => get(context, location, validatedSolutionRecipeName, options),
  };
}

export function _getValidatedSolutionRecipesOperations(
  context: AzureStackHCIContext,
): ValidatedSolutionRecipesOperations {
  return {
    ..._getValidatedSolutionRecipes(context),
  };
}
