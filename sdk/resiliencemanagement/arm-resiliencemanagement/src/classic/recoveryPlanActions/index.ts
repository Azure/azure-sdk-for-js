// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  testFailoverCleanup,
  testFailover,
  reprotect,
  failoverCommit,
  failover,
  checkReadiness,
  validateForReprotect,
  validateForTestFailoverCleanup,
  validateForTestFailover,
  validateForFailoverCommit,
  validateForFailover,
  validateForOperation,
  updateResources,
  finalize,
} from "../../api/recoveryPlanActions/operations.js";
import {
  RecoveryPlanActionsTestFailoverCleanupOptionalParams,
  RecoveryPlanActionsTestFailoverOptionalParams,
  RecoveryPlanActionsReprotectOptionalParams,
  RecoveryPlanActionsFailoverCommitOptionalParams,
  RecoveryPlanActionsFailoverOptionalParams,
  RecoveryPlanActionsCheckReadinessOptionalParams,
  RecoveryPlanActionsValidateForReprotectOptionalParams,
  RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
  RecoveryPlanActionsValidateForTestFailoverOptionalParams,
  RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
  RecoveryPlanActionsValidateForFailoverOptionalParams,
  RecoveryPlanActionsValidateForOperationOptionalParams,
  RecoveryPlanActionsUpdateResourcesOptionalParams,
  RecoveryPlanActionsFinalizeOptionalParams,
} from "../../api/recoveryPlanActions/options.js";
import {
  ArmResponseErrorResponse,
  UpdateRecoveryResourcesRequest,
  UpdateRecoveryResourcesResponse,
  ValidateForOperationRequest,
  FailoverRequest,
  ValidateForRecoveryOperationBaseResponse,
  RecoveryPlanActionBaseResponse,
  TestFailoverCleanupRequest,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoveryPlanActions operations. */
export interface RecoveryPlanActionsOperations {
  /** This action triggers the test failover cleanup operation on the recovery orchestration plan for the qualified resources. */
  testFailoverCleanup: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: TestFailoverCleanupRequest,
    options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanup: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: TestFailoverCleanupRequest,
    options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>
  >;
  /** @deprecated use testFailoverCleanup instead */
  beginTestFailoverCleanupAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: TestFailoverCleanupRequest,
    options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
  ) => Promise<RecoveryPlanActionBaseResponse>;
  /** This action triggers the test failover operation on the recovery orchestration plan for the qualified resources. */
  testFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsTestFailoverOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
  /** @deprecated use testFailover instead */
  beginTestFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsTestFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>
  >;
  /** @deprecated use testFailover instead */
  beginTestFailoverAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsTestFailoverOptionalParams,
  ) => Promise<RecoveryPlanActionBaseResponse>;
  /** This action triggers the reprotect operation on the recovery orchestration plan for the qualified resources. */
  reprotect: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsReprotectOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
  /** @deprecated use reprotect instead */
  beginReprotect: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsReprotectOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>
  >;
  /** @deprecated use reprotect instead */
  beginReprotectAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsReprotectOptionalParams,
  ) => Promise<RecoveryPlanActionBaseResponse>;
  /** This action triggers the failover commit operation on the recovery orchestration plan for the qualified resources. */
  failoverCommit: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFailoverCommitOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommit: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFailoverCommitOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>
  >;
  /** @deprecated use failoverCommit instead */
  beginFailoverCommitAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFailoverCommitOptionalParams,
  ) => Promise<RecoveryPlanActionBaseResponse>;
  /** This action triggers the failover operation on the recovery orchestration plan for the qualified resources. */
  failover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsFailoverOptionalParams,
  ) => PollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>;
  /** @deprecated use failover instead */
  beginFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<RecoveryPlanActionBaseResponse>, RecoveryPlanActionBaseResponse>
  >;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsFailoverOptionalParams,
  ) => Promise<RecoveryPlanActionBaseResponse>;
  /** This action performs the necessary readiness check on the recovery orchestration plan to ensure it is in the desired state and eligible for all recovery actions, including all protected resources. */
  checkReadiness: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsCheckReadinessOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use checkReadiness instead */
  beginCheckReadiness: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsCheckReadinessOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use checkReadiness instead */
  beginCheckReadinessAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsCheckReadinessOptionalParams,
  ) => Promise<void>;
  /** This action checks if the recovery orchestration plan is eligible for reprotect operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
  validateForReprotect: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
  ) => PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
  /** @deprecated use validateForReprotect instead */
  beginValidateForReprotect: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ValidateForRecoveryOperationBaseResponse>,
      ValidateForRecoveryOperationBaseResponse
    >
  >;
  /** @deprecated use validateForReprotect instead */
  beginValidateForReprotectAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
  ) => Promise<ValidateForRecoveryOperationBaseResponse>;
  /** This action checks if the recovery orchestration plan is eligible for test failover cleanup operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
  validateForTestFailoverCleanup: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
  ) => PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
  /** @deprecated use validateForTestFailoverCleanup instead */
  beginValidateForTestFailoverCleanup: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ValidateForRecoveryOperationBaseResponse>,
      ValidateForRecoveryOperationBaseResponse
    >
  >;
  /** @deprecated use validateForTestFailoverCleanup instead */
  beginValidateForTestFailoverCleanupAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
  ) => Promise<ValidateForRecoveryOperationBaseResponse>;
  /** This action checks if the recovery orchestration plan is eligible for test failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
  validateForTestFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
  ) => PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
  /** @deprecated use validateForTestFailover instead */
  beginValidateForTestFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ValidateForRecoveryOperationBaseResponse>,
      ValidateForRecoveryOperationBaseResponse
    >
  >;
  /** @deprecated use validateForTestFailover instead */
  beginValidateForTestFailoverAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
  ) => Promise<ValidateForRecoveryOperationBaseResponse>;
  /** This action checks if the recovery orchestration plan is eligible for failover commit operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
  validateForFailoverCommit: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
  ) => PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
  /** @deprecated use validateForFailoverCommit instead */
  beginValidateForFailoverCommit: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ValidateForRecoveryOperationBaseResponse>,
      ValidateForRecoveryOperationBaseResponse
    >
  >;
  /** @deprecated use validateForFailoverCommit instead */
  beginValidateForFailoverCommitAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
  ) => Promise<ValidateForRecoveryOperationBaseResponse>;
  /** This action checks if the recovery orchestration plan is eligible for failover operation, ensuring it meets the necessary criteria and provides a list of qualified and unqualified resources. */
  validateForFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
  ) => PollerLike<
    OperationState<ValidateForRecoveryOperationBaseResponse>,
    ValidateForRecoveryOperationBaseResponse
  >;
  /** @deprecated use validateForFailover instead */
  beginValidateForFailover: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ValidateForRecoveryOperationBaseResponse>,
      ValidateForRecoveryOperationBaseResponse
    >
  >;
  /** @deprecated use validateForFailover instead */
  beginValidateForFailoverAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: FailoverRequest,
    options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
  ) => Promise<ValidateForRecoveryOperationBaseResponse>;
  /** This action checks if the recovery orchestration plan is eligible for operations like failover and reprotect, ensuring it meets the necessary criteria. */
  validateForOperation: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: ValidateForOperationRequest,
    options?: RecoveryPlanActionsValidateForOperationOptionalParams,
  ) => PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
  /** @deprecated use validateForOperation instead */
  beginValidateForOperation: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: ValidateForOperationRequest,
    options?: RecoveryPlanActionsValidateForOperationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>
  >;
  /** @deprecated use validateForOperation instead */
  beginValidateForOperationAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: ValidateForOperationRequest,
    options?: RecoveryPlanActionsValidateForOperationOptionalParams,
  ) => Promise<ArmResponseErrorResponse>;
  /** This action adds or updates the resources to be included in the recovery orchestration plan. */
  updateResources: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: UpdateRecoveryResourcesRequest,
    options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
  ) => PollerLike<OperationState<UpdateRecoveryResourcesResponse>, UpdateRecoveryResourcesResponse>;
  /** @deprecated use updateResources instead */
  beginUpdateResources: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: UpdateRecoveryResourcesRequest,
    options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<UpdateRecoveryResourcesResponse>,
      UpdateRecoveryResourcesResponse
    >
  >;
  /** @deprecated use updateResources instead */
  beginUpdateResourcesAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    body: UpdateRecoveryResourcesRequest,
    options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
  ) => Promise<UpdateRecoveryResourcesResponse>;
  /** This action finalizes the recovery orchestration plan, ensuring all necessary configurations are in place. */
  finalize: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFinalizeOptionalParams,
  ) => PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
  /** @deprecated use finalize instead */
  beginFinalize: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFinalizeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>
  >;
  /** @deprecated use finalize instead */
  beginFinalizeAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    options?: RecoveryPlanActionsFinalizeOptionalParams,
  ) => Promise<ArmResponseErrorResponse>;
}

function _getRecoveryPlanActions(context: AzureResilienceManagementContext) {
  return {
    testFailoverCleanup: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: TestFailoverCleanupRequest,
      options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
    ) =>
      testFailoverCleanup(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginTestFailoverCleanup: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: TestFailoverCleanupRequest,
      options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
    ) => {
      const poller = testFailoverCleanup(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverCleanupAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: TestFailoverCleanupRequest,
      options?: RecoveryPlanActionsTestFailoverCleanupOptionalParams,
    ) => {
      return await testFailoverCleanup(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    testFailover: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsTestFailoverOptionalParams,
    ) => testFailover(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginTestFailover: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsTestFailoverOptionalParams,
    ) => {
      const poller = testFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTestFailoverAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsTestFailoverOptionalParams,
    ) => {
      return await testFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    reprotect: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsReprotectOptionalParams,
    ) => reprotect(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginReprotect: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsReprotectOptionalParams,
    ) => {
      const poller = reprotect(context, serviceGroupName, operationId, recoveryPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginReprotectAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsReprotectOptionalParams,
    ) => {
      return await reprotect(context, serviceGroupName, operationId, recoveryPlanName, options);
    },
    failoverCommit: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFailoverCommitOptionalParams,
    ) => failoverCommit(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginFailoverCommit: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFailoverCommitOptionalParams,
    ) => {
      const poller = failoverCommit(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverCommitAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFailoverCommitOptionalParams,
    ) => {
      return await failoverCommit(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
    },
    failover: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsFailoverOptionalParams,
    ) => failover(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginFailover: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsFailoverOptionalParams,
    ) => {
      const poller = failover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsFailoverOptionalParams,
    ) => {
      return await failover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    checkReadiness: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsCheckReadinessOptionalParams,
    ) => checkReadiness(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginCheckReadiness: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsCheckReadinessOptionalParams,
    ) => {
      const poller = checkReadiness(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCheckReadinessAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsCheckReadinessOptionalParams,
    ) => {
      return await checkReadiness(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
    },
    validateForReprotect: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
    ) => validateForReprotect(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginValidateForReprotect: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
    ) => {
      const poller = validateForReprotect(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForReprotectAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForReprotectOptionalParams,
    ) => {
      return await validateForReprotect(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
    },
    validateForTestFailoverCleanup: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
    ) =>
      validateForTestFailoverCleanup(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      ),
    beginValidateForTestFailoverCleanup: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
    ) => {
      const poller = validateForTestFailoverCleanup(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForTestFailoverCleanupAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForTestFailoverCleanupOptionalParams,
    ) => {
      return await validateForTestFailoverCleanup(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
    },
    validateForTestFailover: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
    ) =>
      validateForTestFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      ),
    beginValidateForTestFailover: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
    ) => {
      const poller = validateForTestFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForTestFailoverAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForTestFailoverOptionalParams,
    ) => {
      return await validateForTestFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    validateForFailoverCommit: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
    ) =>
      validateForFailoverCommit(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginValidateForFailoverCommit: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
    ) => {
      const poller = validateForFailoverCommit(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForFailoverCommitAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsValidateForFailoverCommitOptionalParams,
    ) => {
      return await validateForFailoverCommit(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        options,
      );
    },
    validateForFailover: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
    ) =>
      validateForFailover(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginValidateForFailover: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
    ) => {
      const poller = validateForFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForFailoverAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: FailoverRequest,
      options?: RecoveryPlanActionsValidateForFailoverOptionalParams,
    ) => {
      return await validateForFailover(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    validateForOperation: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: ValidateForOperationRequest,
      options?: RecoveryPlanActionsValidateForOperationOptionalParams,
    ) =>
      validateForOperation(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginValidateForOperation: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: ValidateForOperationRequest,
      options?: RecoveryPlanActionsValidateForOperationOptionalParams,
    ) => {
      const poller = validateForOperation(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateForOperationAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: ValidateForOperationRequest,
      options?: RecoveryPlanActionsValidateForOperationOptionalParams,
    ) => {
      return await validateForOperation(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    updateResources: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: UpdateRecoveryResourcesRequest,
      options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
    ) => updateResources(context, serviceGroupName, operationId, recoveryPlanName, body, options),
    beginUpdateResources: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: UpdateRecoveryResourcesRequest,
      options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
    ) => {
      const poller = updateResources(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateResourcesAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      body: UpdateRecoveryResourcesRequest,
      options?: RecoveryPlanActionsUpdateResourcesOptionalParams,
    ) => {
      return await updateResources(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        body,
        options,
      );
    },
    finalize: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFinalizeOptionalParams,
    ) => finalize(context, serviceGroupName, operationId, recoveryPlanName, options),
    beginFinalize: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFinalizeOptionalParams,
    ) => {
      const poller = finalize(context, serviceGroupName, operationId, recoveryPlanName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFinalizeAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      options?: RecoveryPlanActionsFinalizeOptionalParams,
    ) => {
      return await finalize(context, serviceGroupName, operationId, recoveryPlanName, options);
    },
  };
}

export function _getRecoveryPlanActionsOperations(
  context: AzureResilienceManagementContext,
): RecoveryPlanActionsOperations {
  return {
    ..._getRecoveryPlanActions(context),
  };
}
