// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityContext } from "../../api/programmableConnectivityContext.js";
import { OperatorApiPlan } from "../../models/models.js";
import {
  OperatorApiPlansListBySubscriptionOptionalParams,
  OperatorApiPlansGetOptionalParams,
} from "../../api/operatorApiPlans/options.js";
import {
  listBySubscription,
  get,
} from "../../api/operatorApiPlans/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OperatorApiPlans operations. */
export interface OperatorApiPlansOperations {
  /** List OperatorApiPlan resources by subscription ID. */
  listBySubscription: (
    options?: OperatorApiPlansListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OperatorApiPlan>;
  /** Get an OperatorApiPlan resource by name. */
  get: (
    operatorApiPlanName: string,
    options?: OperatorApiPlansGetOptionalParams,
  ) => Promise<OperatorApiPlan>;
}

function _getOperatorApiPlans(context: ProgrammableConnectivityContext) {
  return {
    listBySubscription: (
      options?: OperatorApiPlansListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    get: (
      operatorApiPlanName: string,
      options?: OperatorApiPlansGetOptionalParams,
    ) => get(context, operatorApiPlanName, options),
  };
}

export function _getOperatorApiPlansOperations(
  context: ProgrammableConnectivityContext,
): OperatorApiPlansOperations {
  return {
    ..._getOperatorApiPlans(context),
  };
}
