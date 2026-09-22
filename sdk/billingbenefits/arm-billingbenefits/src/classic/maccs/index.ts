// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext } from "../../api/billingBenefitsRPContext.js";
import {
  chargeShortfall,
  writeOff,
  cancel,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/maccs/operations.js";
import {
  MaccsChargeShortfallOptionalParams,
  MaccsWriteOffOptionalParams,
  MaccsCancelOptionalParams,
  MaccsListBySubscriptionOptionalParams,
  MaccsListByResourceGroupOptionalParams,
  MaccsDeleteOptionalParams,
  MaccsUpdateOptionalParams,
  MaccsCreateOptionalParams,
  MaccsGetOptionalParams,
} from "../../api/maccs/options.js";
import { Macc, MaccPatchRequest, ChargeShortfallRequest } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Maccs operations. */
export interface MaccsOperations {
  /** Operation to charge shortfall to a customer's account, ensuring they are charged for the outstanding amount of MACC credit. */
  chargeShortfall: (
    resourceGroupName: string,
    maccName: string,
    body: ChargeShortfallRequest,
    options?: MaccsChargeShortfallOptionalParams,
  ) => PollerLike<OperationState<Macc>, Macc>;
  /** @deprecated use chargeShortfall instead */
  beginChargeShortfall: (
    resourceGroupName: string,
    maccName: string,
    body: ChargeShortfallRequest,
    options?: MaccsChargeShortfallOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Macc>, Macc>>;
  /** @deprecated use chargeShortfall instead */
  beginChargeShortfallAndWait: (
    resourceGroupName: string,
    maccName: string,
    body: ChargeShortfallRequest,
    options?: MaccsChargeShortfallOptionalParams,
  ) => Promise<Macc>;
  /** Operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount. */
  writeOff: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsWriteOffOptionalParams,
  ) => PollerLike<OperationState<Macc>, Macc>;
  /** @deprecated use writeOff instead */
  beginWriteOff: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsWriteOffOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Macc>, Macc>>;
  /** @deprecated use writeOff instead */
  beginWriteOffAndWait: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsWriteOffOptionalParams,
  ) => Promise<Macc>;
  /** Represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account. */
  cancel: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsCancelOptionalParams,
  ) => PollerLike<OperationState<Macc>, Macc>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Macc>, Macc>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsCancelOptionalParams,
  ) => Promise<Macc>;
  /** List MACCs under a subscription from primary service tenant. */
  listBySubscription: (
    options?: MaccsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Macc>;
  /** List MACCs under a resource group for primary service admin. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MaccsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Macc>;
  /** Delete MACC. */
  delete: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update MACC. */
  update: (
    resourceGroupName: string,
    maccName: string,
    body: MaccPatchRequest,
    options?: MaccsUpdateOptionalParams,
  ) => PollerLike<OperationState<Macc>, Macc>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    maccName: string,
    body: MaccPatchRequest,
    options?: MaccsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Macc>, Macc>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    maccName: string,
    body: MaccPatchRequest,
    options?: MaccsUpdateOptionalParams,
  ) => Promise<Macc>;
  /** Create MACC. */
  create: (
    resourceGroupName: string,
    maccName: string,
    body: Macc,
    options?: MaccsCreateOptionalParams,
  ) => PollerLike<OperationState<Macc>, Macc>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    maccName: string,
    body: Macc,
    options?: MaccsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Macc>, Macc>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    maccName: string,
    body: Macc,
    options?: MaccsCreateOptionalParams,
  ) => Promise<Macc>;
  /** Get a MACC. */
  get: (
    resourceGroupName: string,
    maccName: string,
    options?: MaccsGetOptionalParams,
  ) => Promise<Macc>;
}

function _getMaccs(context: BillingBenefitsRPContext) {
  return {
    chargeShortfall: (
      resourceGroupName: string,
      maccName: string,
      body: ChargeShortfallRequest,
      options?: MaccsChargeShortfallOptionalParams,
    ) => chargeShortfall(context, resourceGroupName, maccName, body, options),
    beginChargeShortfall: async (
      resourceGroupName: string,
      maccName: string,
      body: ChargeShortfallRequest,
      options?: MaccsChargeShortfallOptionalParams,
    ) => {
      const poller = chargeShortfall(context, resourceGroupName, maccName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginChargeShortfallAndWait: async (
      resourceGroupName: string,
      maccName: string,
      body: ChargeShortfallRequest,
      options?: MaccsChargeShortfallOptionalParams,
    ) => {
      return await chargeShortfall(context, resourceGroupName, maccName, body, options);
    },
    writeOff: (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsWriteOffOptionalParams,
    ) => writeOff(context, resourceGroupName, maccName, options),
    beginWriteOff: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsWriteOffOptionalParams,
    ) => {
      const poller = writeOff(context, resourceGroupName, maccName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWriteOffAndWait: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsWriteOffOptionalParams,
    ) => {
      return await writeOff(context, resourceGroupName, maccName, options);
    },
    cancel: (resourceGroupName: string, maccName: string, options?: MaccsCancelOptionalParams) =>
      cancel(context, resourceGroupName, maccName, options),
    beginCancel: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, maccName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, maccName, options);
    },
    listBySubscription: (options?: MaccsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MaccsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, maccName: string, options?: MaccsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, maccName, options),
    beginDelete: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, maccName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      maccName: string,
      options?: MaccsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, maccName, options);
    },
    update: (
      resourceGroupName: string,
      maccName: string,
      body: MaccPatchRequest,
      options?: MaccsUpdateOptionalParams,
    ) => update(context, resourceGroupName, maccName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      maccName: string,
      body: MaccPatchRequest,
      options?: MaccsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, maccName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      maccName: string,
      body: MaccPatchRequest,
      options?: MaccsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, maccName, body, options);
    },
    create: (
      resourceGroupName: string,
      maccName: string,
      body: Macc,
      options?: MaccsCreateOptionalParams,
    ) => create(context, resourceGroupName, maccName, body, options),
    beginCreate: async (
      resourceGroupName: string,
      maccName: string,
      body: Macc,
      options?: MaccsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, maccName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      maccName: string,
      body: Macc,
      options?: MaccsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, maccName, body, options);
    },
    get: (resourceGroupName: string, maccName: string, options?: MaccsGetOptionalParams) =>
      get(context, resourceGroupName, maccName, options),
  };
}

export function _getMaccsOperations(context: BillingBenefitsRPContext): MaccsOperations {
  return {
    ..._getMaccs(context),
  };
}
