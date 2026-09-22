// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { retry, resume, cancel, list, get } from "../../api/recoveryJobs/operations.js";
import type {
  RecoveryJobsRetryOptionalParams,
  RecoveryJobsResumeOptionalParams,
  RecoveryJobsCancelOptionalParams,
  RecoveryJobsListOptionalParams,
  RecoveryJobsGetOptionalParams,
} from "../../api/recoveryJobs/options.js";
import type {
  ArmResponseErrorResponse,
  RecoveryJob,
  RecoveryActionRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoveryJobs operations. */
export interface RecoveryJobsOperations {
  /** This action retries the ongoing recovery orchestration job for resources that failed in previous attempts. */
  retry: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    options?: RecoveryJobsRetryOptionalParams,
  ) => PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
  /** @deprecated use retry instead */
  beginRetry: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    options?: RecoveryJobsRetryOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>
  >;
  /** @deprecated use retry instead */
  beginRetryAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    options?: RecoveryJobsRetryOptionalParams,
  ) => Promise<ArmResponseErrorResponse>;
  /** This action resumes the ongoing recovery orchestration job that was paused for required user intervention. */
  resume: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsResumeOptionalParams,
  ) => PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
  /** @deprecated use resume instead */
  beginResume: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsResumeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>
  >;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsResumeOptionalParams,
  ) => Promise<ArmResponseErrorResponse>;
  /** This action attempts to cancel the ongoing recovery orchestration job. */
  cancel: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsCancelOptionalParams,
  ) => PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
  /** @deprecated use cancel instead */
  beginCancel: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsCancelOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>
  >;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    serviceGroupName: string,
    operationId: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    body: RecoveryActionRequest,
    options?: RecoveryJobsCancelOptionalParams,
  ) => Promise<ArmResponseErrorResponse>;
  /** List RecoveryJob resources by RecoveryPlan */
  list: (
    serviceGroupName: string,
    recoveryPlanName: string,
    options?: RecoveryJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryJob>;
  /** Get a RecoveryJob */
  get: (
    serviceGroupName: string,
    recoveryPlanName: string,
    recoveryJobName: string,
    options?: RecoveryJobsGetOptionalParams,
  ) => Promise<RecoveryJob>;
}

function _getRecoveryJobs(context: AzureResilienceManagementContext) {
  return {
    retry: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      options?: RecoveryJobsRetryOptionalParams,
    ) => retry(context, serviceGroupName, operationId, recoveryPlanName, recoveryJobName, options),
    beginRetry: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      options?: RecoveryJobsRetryOptionalParams,
    ) => {
      const poller = retry(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRetryAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      options?: RecoveryJobsRetryOptionalParams,
    ) => {
      return await retry(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        options,
      );
    },
    resume: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsResumeOptionalParams,
    ) =>
      resume(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      ),
    beginResume: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsResumeOptionalParams,
    ) => {
      const poller = resume(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsResumeOptionalParams,
    ) => {
      return await resume(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      );
    },
    cancel: (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsCancelOptionalParams,
    ) =>
      cancel(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      ),
    beginCancel: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsCancelOptionalParams,
    ) => {
      const poller = cancel(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      serviceGroupName: string,
      operationId: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      body: RecoveryActionRequest,
      options?: RecoveryJobsCancelOptionalParams,
    ) => {
      return await cancel(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      );
    },
    list: (
      serviceGroupName: string,
      recoveryPlanName: string,
      options?: RecoveryJobsListOptionalParams,
    ) => list(context, serviceGroupName, recoveryPlanName, options),
    get: (
      serviceGroupName: string,
      recoveryPlanName: string,
      recoveryJobName: string,
      options?: RecoveryJobsGetOptionalParams,
    ) => get(context, serviceGroupName, recoveryPlanName, recoveryJobName, options),
  };
}

export function _getRecoveryJobsOperations(
  context: AzureResilienceManagementContext,
): RecoveryJobsOperations {
  return {
    ..._getRecoveryJobs(context),
  };
}
