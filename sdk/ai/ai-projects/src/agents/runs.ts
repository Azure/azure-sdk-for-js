// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import { operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type * as GeneratedParameters from "../generated/src/parameters.js";
import type * as CustomOutputModels from "../customization/outputModels.js";
import type * as CustomModels from "../customization/models.js";
import {
  validateLimit,
  validateMessages,
  validateMetadata,
  validateOrder,
  validateRunId,
  validateThreadId,
  validateTools,
  validateTruncationStrategy,
} from "./inputValidations.js";
import { TracingUtility } from "../tracing.js";
import {
  traceEndCreateOrUpdateRun,
  traceEndSubmitToolOutputsToRun,
  traceStartCreateRun,
  traceStartCreateThreadAndRun,
  traceStartSubmitToolOutputsToRun,
} from "./runTrace.js";
import { traceStartAgentGeneric } from "./traceUtility.js";
import {
  createRunStreaming,
  createThreadAndRunStreaming,
  submitToolOutputsToRunStreaming,
} from "./streaming.js";
import type { AgentEventMessageStream } from "./streamingModels.js";
import type {
  AgentRunResponse,
  CreateRunOptionalParams,
  CancelRunOptionalParams,
  CreateAndRunThreadOptionalParams,
  GetRunOptionalParams,
  ListRunQueryOptionalParams,
  SubmitToolOutputsToRunOptionalParams,
  UpdateRunOptionalParams,
} from "./customModels.js";
import * as ConverterToWire from "../customization/convertModelsToWrite.js";
import * as ConvertFromWire from "../customization/convertOutputModelsFromWire.js";
import { convertToListQueryParameters } from "../customization/convertParametersToWire.js";
import { createOpenAIError } from "./openAIError.js";

const expectedStatuses = ["200"];

/** Creates and starts a new run of the specified thread using the specified agent. */
export function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: CreateRunOptionalParams,
): AgentRunResponse {
  const createRunOptions: GeneratedParameters.CreateRunParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...ConverterToWire.convertCreateRunOptions({ ...options, assistantId }),
      stream: false,
    },
  };
  validateThreadId(threadId);
  validateCreateRunParameters(createRunOptions);

  async function executeCreateRun(): Promise<CustomOutputModels.ThreadRunOutput> {
    const output = await TracingUtility.withSpan(
      "CreateRun",
      createRunOptions,
      async (updateOptions) => {
        const result = await context.path("/threads/{threadId}/runs", threadId).post(updateOptions);
        if (!expectedStatuses.includes(result.status)) {
          const error = createOpenAIError(result);
          throw error;
        }
        return result.body;
      },
      (span, updatedOptions) => traceStartCreateRun(span, updatedOptions, threadId),
      traceEndCreateOrUpdateRun,
    );
    return ConvertFromWire.convertThreadRunOutput(output);
  }

  return {
    then: function (onFulfilled, onRejected) {
      return executeCreateRun().then(onFulfilled, onRejected).catch(onRejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      return createRunStreaming(context, threadId, createRunOptions);
    },
  };
}

/** Gets a list of runs for a specified thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ListRunQueryOptionalParams = {},
): Promise<CustomOutputModels.OpenAIPageableListOfThreadRunOutput> {
  const listRunOptions: GeneratedParameters.ListRunsParameters = {
    ...operationOptionsToRequestParameters(options),
    queryParameters: convertToListQueryParameters(options),
  };

  validateListRunsParameters(threadId, options);
  return TracingUtility.withSpan(
    "ListRuns",
    listRunOptions || {},
    async (updateOptions) => {
      const result = await context.path("/threads/{threadId}/runs", threadId).get(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return ConvertFromWire.convertOpenAIPageableListOfThreadRunOutput(result.body);
    },
    (span, updatedOptions) =>
      traceStartAgentGeneric(span, {
        ...updatedOptions,
        tracingAttributeOptions: { threadId: threadId },
      }),
  );
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options: GetRunOptionalParams = {},
): Promise<CustomOutputModels.ThreadRunOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
  const getRunOptions: GeneratedParameters.GetRunParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  return TracingUtility.withSpan(
    "GetRun",
    getRunOptions,
    async (updateOptions) => {
      const result = await context
        .path("/threads/{threadId}/runs/{runId}", threadId, runId)
        .get(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return ConvertFromWire.convertThreadRunOutput(result.body);
    },
    (span, updatedOptions) =>
      traceStartAgentGeneric(span, {
        ...updatedOptions,
        tracingAttributeOptions: { threadId: threadId, runId: runId },
      }),
  );
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: UpdateRunOptionalParams = {},
): Promise<CustomOutputModels.ThreadRunOutput> {
  const updateRunOptions: GeneratedParameters.UpdateRunParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      metadata: options?.metadata,
    },
  };

  validateUpdateRunParameters(threadId, runId, updateRunOptions);
  const response = await TracingUtility.withSpan(
    "UpdateRun",
    updateRunOptions,
    async (updateOptions) => {
      const result = await context
        .path("/threads/{threadId}/runs/{runId}", threadId, runId)
        .post(updateOptions);
      if (!expectedStatuses.includes(result.status)) {
        throw createOpenAIError(result);
      }
      return result.body;
    },
    (span, updatedOptions) =>
      traceStartAgentGeneric(span, {
        ...updatedOptions,
        tracingAttributeOptions: { threadId: threadId, runId: runId },
      }),
    traceEndCreateOrUpdateRun,
  );

  return ConvertFromWire.convertThreadRunOutput(response);
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: Array<CustomModels.ToolOutput>,
  options: SubmitToolOutputsToRunOptionalParams = {},
): AgentRunResponse {
  validateThreadId(threadId);
  validateRunId(runId);
  const submitToolOutputsOptions: GeneratedParameters.SubmitToolOutputsToRunParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      tool_outputs: toolOutputs?.map(ConverterToWire.convertToolOutput),
      stream: false,
    },
  };

  async function executeSubmitToolOutputsToRun(): Promise<CustomOutputModels.ThreadRunOutput> {
    const response = await TracingUtility.withSpan(
      "SubmitToolOutputsToRun",
      submitToolOutputsOptions,
      async (updateOptions) => {
        const result = await context
          .path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
          .post(updateOptions);
        if (!expectedStatuses.includes(result.status)) {
          throw createOpenAIError(result);
        }
        return result.body;
      },
      (span, updatedOptions) =>
        traceStartSubmitToolOutputsToRun(span, updatedOptions, threadId, runId),
      traceEndSubmitToolOutputsToRun,
    );
    return ConvertFromWire.convertThreadRunOutput(response);
  }

  return {
    then: function (onFulfilled, onrejected) {
      return executeSubmitToolOutputsToRun().then(onFulfilled, onrejected).catch(onrejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      return submitToolOutputsToRunStreaming(context, threadId, runId, submitToolOutputsOptions);
    },
  };
}

/** Cancels a run of an in progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: CancelRunOptionalParams = {},
): Promise<CustomOutputModels.ThreadRunOutput> {
  validateThreadId(threadId);
  validateRunId(runId);
  const cancelRunOptions: GeneratedParameters.CancelRunParameters = {
    ...operationOptionsToRequestParameters(options),
  };
  return TracingUtility.withSpan("CancelRun", cancelRunOptions, async (updateOptions) => {
    const result = await context
      .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
      .post(updateOptions);
    if (!expectedStatuses.includes(result.status)) {
      throw createOpenAIError(result);
    }
    return ConvertFromWire.convertThreadRunOutput(result.body);
  });
}

/** Creates a new thread and immediately starts a run of that thread. */
export function createThreadAndRun(
  context: Client,
  assistantId: string,
  options: CreateAndRunThreadOptionalParams,
): AgentRunResponse {
  const createThreadAndRunOptions: GeneratedParameters.CreateThreadAndRunParameters = {
    ...operationOptionsToRequestParameters(options),
    body: {
      ...ConverterToWire.convertCreateAndRunThreadOptions({ ...options, assistantId }),
      stream: false,
    },
  };

  validateCreateThreadAndRunParameters(createThreadAndRunOptions);

  async function executeCreateThreadAndRun(): Promise<CustomOutputModels.ThreadRunOutput> {
    const response = await TracingUtility.withSpan(
      "CreateThreadAndRun",
      createThreadAndRunOptions,
      async (updateOptions) => {
        const result = await context.path("/threads/runs").post(updateOptions);
        if (!expectedStatuses.includes(result.status)) {
          throw createOpenAIError(result);
        }

        return result.body;
      },
      traceStartCreateThreadAndRun,
      traceEndCreateOrUpdateRun,
    );

    return ConvertFromWire.convertThreadRunOutput(response);
  }

  return {
    then: function (onFulfilled, onrejected) {
      return executeCreateThreadAndRun().then(onFulfilled, onrejected).catch(onrejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      return createThreadAndRunStreaming(context, createThreadAndRunOptions);
    },
  };
}

function validateListRunsParameters(
  thread_id: string,
  options?: GeneratedParameters.ListRunsParameters,
): void {
  validateThreadId(thread_id);
  if (
    options?.queryParameters?.limit &&
    (options.queryParameters.limit < 1 || options.queryParameters.limit > 100)
  ) {
    throw new Error("Limit must be between 1 and 100");
  }
  if (options?.queryParameters?.limit) {
    validateLimit(options.queryParameters.limit);
  }
  if (options?.queryParameters?.order) {
    validateOrder(options.queryParameters.order);
  }
}

function validateUpdateRunParameters(
  thread_id: string,
  run_id: string,
  options?: GeneratedParameters.UpdateRunParameters,
): void {
  validateThreadId(thread_id);
  validateRunId(run_id);
  if (options?.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateCreateRunParameters(
  options:
    | GeneratedParameters.CreateRunParameters
    | GeneratedParameters.CreateThreadAndRunParameters,
): void {
  if ("additional_messages" in options.body && options.body.additional_messages) {
    options.body.additional_messages.forEach((message) => validateMessages(message.role));
  }
  if (options.body.tools) {
    validateTools(options.body.tools);
  }
  if (options.body.temperature && (options.body.temperature < 0 || options.body.temperature > 2)) {
    throw new Error("Temperature must be between 0 and 2");
  }
  if (options.body.tool_choice && typeof options.body.tool_choice !== "string") {
    validateTools([options.body.tool_choice]);
  }
  if (options.body.truncation_strategy?.type) {
    validateTruncationStrategy(options.body.truncation_strategy.type);
  }
  if (options.body.metadata) {
    validateMetadata(options.body.metadata);
  }
}

function validateCreateThreadAndRunParameters(
  options: GeneratedParameters.CreateThreadAndRunParameters,
): void {
  validateCreateRunParameters(options);
  if (options.body.thread?.messages) {
    options.body.thread?.messages.forEach((message) => validateMessages(message.role));
  }
  if (options.body.tools) {
    validateTools(options.body.tools);
  }
  if (options.body.tool_resources?.code_interpreter) {
    if (options.body.tool_resources.code_interpreter) {
      if (
        options.body.tool_resources.code_interpreter.file_ids &&
        options.body.tool_resources.code_interpreter.file_ids.length > 20
      ) {
        throw new Error("A maximum of 20 file IDs are allowed");
      }
    }
    if (options.body.tool_resources.file_search) {
      if (
        options.body.tool_resources.file_search.vector_store_ids &&
        options.body.tool_resources.file_search.vector_store_ids.length > 1
      ) {
        throw new Error("Only one vector store ID is allowed");
      }
    }
    if (options.body.tool_resources.azure_ai_search) {
      if (
        options.body.tool_resources.azure_ai_search.indexes &&
        options.body.tool_resources.azure_ai_search.indexes.length > 1
      ) {
        throw new Error("Only one index is allowed");
      }
    }
  }
}
