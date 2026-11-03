// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRPContext } from "../../api/helpRPContext.js";
import { get } from "../../api/solutionSelfHelp/operations.js";
import { SolutionSelfHelpGetOptionalParams } from "../../api/solutionSelfHelp/options.js";
import { SolutionResourceSelfHelp } from "../../models/models.js";

/** Interface representing a SolutionSelfHelp operations. */
export interface SolutionSelfHelpOperations {
  /** Gets Self Help Solutions for a given solutionId. Self Help Solutions consist of rich instructional video tutorials, links and guides to public documentation related to a specific problem that enables users to troubleshoot Azure issues. */
  get: (
    solutionId: string,
    options?: SolutionSelfHelpGetOptionalParams,
  ) => Promise<SolutionResourceSelfHelp>;
}

function _getSolutionSelfHelp(context: HelpRPContext) {
  return {
    get: (solutionId: string, options?: SolutionSelfHelpGetOptionalParams) =>
      get(context, solutionId, options),
  };
}

export function _getSolutionSelfHelpOperations(context: HelpRPContext): SolutionSelfHelpOperations {
  return {
    ..._getSolutionSelfHelp(context),
  };
}
