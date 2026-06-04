// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import { create, get } from "../../api/savingsPlanOrderAlias/operations.js";
import {
  SavingsPlanOrderAliasCreateOptionalParams,
  SavingsPlanOrderAliasGetOptionalParams,
} from "../../api/savingsPlanOrderAlias/options.js";
import { SavingsPlanOrderAliasModel } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SavingsPlanOrderAlias operations. */
export interface SavingsPlanOrderAliasOperations {
  /** Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851 */
  create: (
    savingsPlanOrderAliasName: string,
    body: SavingsPlanOrderAliasModel,
    options?: SavingsPlanOrderAliasCreateOptionalParams,
  ) => PollerLike<OperationState<SavingsPlanOrderAliasModel>, SavingsPlanOrderAliasModel>;
  /** @deprecated use create instead */
  beginCreate: (
    savingsPlanOrderAliasName: string,
    body: SavingsPlanOrderAliasModel,
    options?: SavingsPlanOrderAliasCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<SavingsPlanOrderAliasModel>, SavingsPlanOrderAliasModel>
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    savingsPlanOrderAliasName: string,
    body: SavingsPlanOrderAliasModel,
    options?: SavingsPlanOrderAliasCreateOptionalParams,
  ) => Promise<SavingsPlanOrderAliasModel>;
  /** Get a savings plan. */
  get: (
    savingsPlanOrderAliasName: string,
    options?: SavingsPlanOrderAliasGetOptionalParams,
  ) => Promise<SavingsPlanOrderAliasModel>;
}

function _getSavingsPlanOrderAlias(context: BillingBenefitsRPContext) {
  return {
    create: (
      savingsPlanOrderAliasName: string,
      body: SavingsPlanOrderAliasModel,
      options?: SavingsPlanOrderAliasCreateOptionalParams,
    ) => create(context, savingsPlanOrderAliasName, body, options),
    beginCreate: async (
      savingsPlanOrderAliasName: string,
      body: SavingsPlanOrderAliasModel,
      options?: SavingsPlanOrderAliasCreateOptionalParams,
    ) => {
      const poller = create(context, savingsPlanOrderAliasName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      savingsPlanOrderAliasName: string,
      body: SavingsPlanOrderAliasModel,
      options?: SavingsPlanOrderAliasCreateOptionalParams,
    ) => {
      return await create(context, savingsPlanOrderAliasName, body, options);
    },
    get: (savingsPlanOrderAliasName: string, options?: SavingsPlanOrderAliasGetOptionalParams) =>
      get(context, savingsPlanOrderAliasName, options),
  };
}

export function _getSavingsPlanOrderAliasOperations(
  context: BillingBenefitsRPContext,
): SavingsPlanOrderAliasOperations {
  return {
    ..._getSavingsPlanOrderAlias(context),
  };
}
