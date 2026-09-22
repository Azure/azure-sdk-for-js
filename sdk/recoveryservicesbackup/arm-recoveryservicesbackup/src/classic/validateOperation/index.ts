// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { trigger } from "../../api/validateOperation/operations.js";
import type { ValidateOperationTriggerOptionalParams } from "../../api/validateOperation/options.js";
import type { ValidateOperationRequestResource } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ValidateOperation operations. */
export interface ValidateOperationOperations {
  /** Validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API. */
  trigger: (
    vaultName: string,
    resourceGroupName: string,
    parameters: ValidateOperationRequestResource,
    options?: ValidateOperationTriggerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use trigger instead */
  beginTrigger: (
    vaultName: string,
    resourceGroupName: string,
    parameters: ValidateOperationRequestResource,
    options?: ValidateOperationTriggerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use trigger instead */
  beginTriggerAndWait: (
    vaultName: string,
    resourceGroupName: string,
    parameters: ValidateOperationRequestResource,
    options?: ValidateOperationTriggerOptionalParams,
  ) => Promise<void>;
}

function _getValidateOperation(context: RecoveryServicesBackupContext) {
  return {
    trigger: (
      vaultName: string,
      resourceGroupName: string,
      parameters: ValidateOperationRequestResource,
      options?: ValidateOperationTriggerOptionalParams,
    ) => trigger(context, vaultName, resourceGroupName, parameters, options),
    beginTrigger: async (
      vaultName: string,
      resourceGroupName: string,
      parameters: ValidateOperationRequestResource,
      options?: ValidateOperationTriggerOptionalParams,
    ) => {
      const poller = trigger(context, vaultName, resourceGroupName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerAndWait: async (
      vaultName: string,
      resourceGroupName: string,
      parameters: ValidateOperationRequestResource,
      options?: ValidateOperationTriggerOptionalParams,
    ) => {
      return await trigger(context, vaultName, resourceGroupName, parameters, options);
    },
  };
}

export function _getValidateOperationOperations(
  context: RecoveryServicesBackupContext,
): ValidateOperationOperations {
  return {
    ..._getValidateOperation(context),
  };
}
