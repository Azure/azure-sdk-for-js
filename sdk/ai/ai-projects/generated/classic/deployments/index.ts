// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { list, get } from "../../api/deployments/operations.js";
import {
  DeploymentsListOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import { DeploymentUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** Returns the deployed models available in the current project, optionally filtered by publisher, model name, or deployment type. */
  list: (options?: DeploymentsListOptionalParams) => PagedAsyncIterableIterator<DeploymentUnion>;
  /** Gets a deployed model. */
  get: (name: string, options?: DeploymentsGetOptionalParams) => Promise<DeploymentUnion>;
}

function _getDeployments(context: AIProjectContext) {
  return {
    list: (options?: DeploymentsListOptionalParams) => list(context, options),
    get: (name: string, options?: DeploymentsGetOptionalParams) => get(context, name, options),
  };
}

export function _getDeploymentsOperations(context: AIProjectContext): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
