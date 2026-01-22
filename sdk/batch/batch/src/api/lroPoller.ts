// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PollerLike, OperationState } from "@azure/core-lro";
import type {
  DeletePoolOptionalParams,
  ResizePoolOptionalParams,
  StopPoolResizeOptionalParams,
  RemoveNodesOptionalParams,
  DeallocateNodeOptionalParams,
  RebootNodeOptionalParams,
  ReimageNodeOptionalParams,
  StartNodeOptionalParams,
  DeleteJobOptionalParams,
  DisableJobOptionalParams,
  EnableJobOptionalParams,
  TerminateJobOptionalParams,
  DeleteJobScheduleOptionalParams,
  TerminateJobScheduleOptionalParams,
} from "./options.js";
import type { BatchContext } from "./batchContext.js";
import type {
  BatchJobDisableOptions,
  BatchNodeRemoveOptions,
  BatchPoolResizeOptions,
} from "../models/models.js";
import {
  deletePool,
  getPool,
  resizePool,
  stopPoolResize,
  removeNodes,
  deallocateNode,
  getNode,
  rebootNode,
  reimageNode,
  startNode,
  deleteJob,
  getJob,
  disableJob,
  enableJob,
  terminateJob,
  deleteJobSchedule,
  getJobSchedule,
  terminateJobSchedule,
} from "./operations.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createBatchPoller } from "../static-helpers/batchPoller.js";

// ==================== Pool Pollers ====================

export interface PollerIntervalOptions {
  updateIntervalInMs?: number;
}

export function createDeletePoolPoller(
  context: BatchContext,
  poolId: string,
  options: DeletePoolOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await deletePool(context, poolId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const pool = await getPool(context, poolId, options);
      return { status: pool.state === "deleting" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createResizePoolPoller(
  context: BatchContext,
  poolId: string,
  resizeOptions: BatchPoolResizeOptions,
  options: ResizePoolOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await resizePool(context, poolId, resizeOptions, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const pool = await getPool(context, poolId, options);
      return { status: pool.allocationState === "steady" ? "succeeded" : "running" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createStopPoolResizePoller(
  context: BatchContext,
  poolId: string,
  options: StopPoolResizeOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await stopPoolResize(context, poolId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const pool = await getPool(context, poolId, options);
      return { status: pool.allocationState === "steady" ? "succeeded" : "running" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

// ==================== Node Pollers ====================

export function createRemoveNodesPoller(
  context: BatchContext,
  poolId: string,
  removeOptions: BatchNodeRemoveOptions,
  options: RemoveNodesOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await removeNodes(context, poolId, removeOptions, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const pool = await getPool(context, poolId, options);
      // Node removal is complete when the pool allocation state is STEADY
      // This means the pool is no longer resizing/removing nodes
      return { status: pool.allocationState === "steady" ? "succeeded" : "running" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createDeallocateNodePoller(
  context: BatchContext,
  poolId: string,
  nodeId: string,
  options: DeallocateNodeOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await deallocateNode(context, poolId, nodeId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const node = await getNode(context, poolId, nodeId, options);
      return { status: node.state === "deallocating" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createRebootNodePoller(
  context: BatchContext,
  poolId: string,
  nodeId: string,
  options: RebootNodeOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await rebootNode(context, poolId, nodeId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const node = await getNode(context, poolId, nodeId, options);
      return { status: node.state === "rebooting" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createReimageNodePoller(
  context: BatchContext,
  poolId: string,
  nodeId: string,
  options: ReimageNodeOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await reimageNode(context, poolId, nodeId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const node = await getNode(context, poolId, nodeId, options);
      return { status: node.state === "reimaging" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createStartNodePoller(
  context: BatchContext,
  poolId: string,
  nodeId: string,
  options: StartNodeOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await startNode(context, poolId, nodeId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const node = await getNode(context, poolId, nodeId, options);
      return { status: node.state === "starting" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

// ==================== Job Pollers ====================

export function createDeleteJobPoller(
  context: BatchContext,
  jobId: string,
  options: DeleteJobOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await deleteJob(context, jobId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const job = await getJob(context, jobId, options);
      return { status: job.state === "deleting" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createDisableJobPoller(
  context: BatchContext,
  jobId: string,
  disableOptions: BatchJobDisableOptions,
  options: DisableJobOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await disableJob(context, jobId, disableOptions, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const job = await getJob(context, jobId, options);
      return { status: job.state === "disabling" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        // If job doesn't exist it could've been deleted while disabling
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createEnableJobPoller(
  context: BatchContext,
  jobId: string,
  options: EnableJobOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await enableJob(context, jobId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const job = await getJob(context, jobId, options);
      return { status: job.state === "enabling" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createTerminateJobPoller(
  context: BatchContext,
  jobId: string,
  options: TerminateJobOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await terminateJob(context, jobId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const job = await getJob(context, jobId, options);
      return { status: job.state === "terminating" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

// ==================== Job Schedule Pollers ====================

export function createDeleteJobSchedulePoller(
  context: BatchContext,
  jobScheduleId: string,
  options: DeleteJobScheduleOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await deleteJobSchedule(context, jobScheduleId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const jobSchedule = await getJobSchedule(context, jobScheduleId, options);
      return { status: jobSchedule.state === "deleting" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}

export function createTerminateJobSchedulePoller(
  context: BatchContext,
  jobScheduleId: string,
  options: TerminateJobScheduleOptionalParams & PollerIntervalOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  const initFn = async (): Promise<OperationState<void>> => {
    await terminateJobSchedule(context, jobScheduleId, options);
    return { status: "running" };
  };

  const pollFn = async (): Promise<OperationState<void>> => {
    try {
      const jobSchedule = await getJobSchedule(context, jobScheduleId, options);
      return { status: jobSchedule.state === "terminating" ? "running" : "succeeded" };
    } catch (error: unknown) {
      if (error instanceof RestError && error.statusCode === 404) {
        return { status: "succeeded" };
      }
      throw error;
    }
  };

  return createBatchPoller({ initFn, pollFn, updateIntervalInMs: options.updateIntervalInMs });
}
