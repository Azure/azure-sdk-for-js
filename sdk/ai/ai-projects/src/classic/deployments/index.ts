// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { DeploymentUnion } from "../../models/models.js";
import {
  DeploymentsListOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import { list, get } from "../../api/deployments/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** List all deployed models in the project */
  list: (
    options?: DeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentUnion>;
  /** Get a deployed model. */
  get: (
    name: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<DeploymentUnion>;
}

function _getDeployments(context: AIProjectContext) {
  return {
    list: (options?: DeploymentsListOptionalParams) => list(context, options),
    get: (name: string, options?: DeploymentsGetOptionalParams) =>
      get(context, name, options),
  };
}

export function _getDeploymentsOperations(
  context: AIProjectContext,
): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
