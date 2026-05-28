// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { create, get } from "../../api/simplifiedSolutions/operations.js";
import {
  SimplifiedSolutionsCreateOptionalParams,
  SimplifiedSolutionsGetOptionalParams,
} from "../../api/simplifiedSolutions/options.js";
import { SimplifiedSolutionsResource } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SimplifiedSolutions operations. */
export interface SimplifiedSolutionsOperations {
  /** Creates Simplified Solutions for an Azure subscription using 'solutionId' from Discovery Solutions as the input. <br/><br/> Simplified Solutions API makes the consumption of solutions APIs easier while still providing access to the same powerful solutions rendered in Solutions API. With Simplified Solutions, users don't have to worry about stitching together the article using replacement maps and can use the content in the API response to directly render as HTML content.<br/> */
  create: (
    scope: string,
    simplifiedSolutionsResourceName: string,
    options?: SimplifiedSolutionsCreateOptionalParams,
  ) => PollerLike<OperationState<SimplifiedSolutionsResource>, SimplifiedSolutionsResource>;
  /** Get the simplified Solutions using the applicable solutionResourceName while creating the simplified Solutions. */
  get: (
    scope: string,
    simplifiedSolutionsResourceName: string,
    options?: SimplifiedSolutionsGetOptionalParams,
  ) => Promise<SimplifiedSolutionsResource>;
}

function _getSimplifiedSolutions(context: HelpRPContext) {
  return {
    create: (
      scope: string,
      simplifiedSolutionsResourceName: string,
      options?: SimplifiedSolutionsCreateOptionalParams,
    ) => create(context, scope, simplifiedSolutionsResourceName, options),
    get: (
      scope: string,
      simplifiedSolutionsResourceName: string,
      options?: SimplifiedSolutionsGetOptionalParams,
    ) => get(context, scope, simplifiedSolutionsResourceName, options),
  };
}

export function _getSimplifiedSolutionsOperations(
  context: HelpRPContext,
): SimplifiedSolutionsOperations {
  return {
    ..._getSimplifiedSolutions(context),
  };
}
