// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { warmUp, update, create, get } from "../../api/solution/operations.js";
import {
  SolutionWarmUpOptionalParams,
  SolutionUpdateOptionalParams,
  SolutionCreateOptionalParams,
  SolutionGetOptionalParams,
} from "../../api/solution/options.js";
import { SolutionResource } from "../../models/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Solution operations. */
export interface SolutionOperations {
  /** Warm up the solution resource by preloading asynchronous diagnostics results into cache */
  warmUp: (
    scope: string,
    solutionResourceName: string,
    options?: SolutionWarmUpOptionalParams,
  ) => Promise<void>;
  /** Update the requiredInputs or additional information needed to execute the solution */
  update: (
    scope: string,
    solutionResourceName: string,
    options?: SolutionUpdateOptionalParams,
  ) => PollerLike<OperationState<SolutionResource>, SolutionResource>;
  /** Creates a solution for the specific Azure resource or subscription using the inputs ‘solutionId and requiredInputs’ from discovery solutions. <br/> Azure solutions comprise a comprehensive library of self-help resources that have been thoughtfully curated by Azure engineers to aid customers in resolving typical troubleshooting issues. These solutions encompass: <br/> (1.) Dynamic and context-aware diagnostics, guided troubleshooting wizards, and data visualizations. <br/> (2.) Rich instructional video tutorials and illustrative diagrams and images. <br/> (3.) Thoughtfully assembled textual troubleshooting instructions. <br/> All these components are seamlessly converged into unified solutions tailored to address a specific support problem area. */
  create: (
    scope: string,
    solutionResourceName: string,
    options?: SolutionCreateOptionalParams,
  ) => PollerLike<OperationState<SolutionResource>, SolutionResource>;
  /** Get the solution using the applicable solutionResourceName while creating the solution. */
  get: (
    scope: string,
    solutionResourceName: string,
    options?: SolutionGetOptionalParams,
  ) => Promise<SolutionResource>;
}

function _getSolution(context: HelpRPContext) {
  return {
    warmUp: (scope: string, solutionResourceName: string, options?: SolutionWarmUpOptionalParams) =>
      warmUp(context, scope, solutionResourceName, options),
    update: (scope: string, solutionResourceName: string, options?: SolutionUpdateOptionalParams) =>
      update(context, scope, solutionResourceName, options),
    create: (scope: string, solutionResourceName: string, options?: SolutionCreateOptionalParams) =>
      create(context, scope, solutionResourceName, options),
    get: (scope: string, solutionResourceName: string, options?: SolutionGetOptionalParams) =>
      get(context, scope, solutionResourceName, options),
  };
}

export function _getSolutionOperations(context: HelpRPContext): SolutionOperations {
  return {
    ..._getSolution(context),
  };
}
