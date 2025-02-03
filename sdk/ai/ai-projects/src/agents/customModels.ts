// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions, RequestParameters } from "@azure-rest/core-client";
import type { ThreadRunOutput } from "../customization/outputModels.js";
import type { AgentEventMessageStream } from "./streamingModels.js";
import type {
  AgentThreadCreationOptions,
  CreateAgentOptions,
  CreateAndRunThreadOptions,
  CreateRunOptions,
  UpdateAgentOptions,
  UpdateAgentThreadOptions,
  VectorStoreFileStatusFilter,
  VectorStoreOptions,
  VectorStoreUpdateOptions,
} from "../customization/models.js";
import type {
  ListMessagesQueryParamProperties,
  ListFilesQueryParamProperties,
} from "../customization/parameters.js";
import type {
  CreateVectorStoreFileBatchOptions,
  CreateVectorStoreFileOptions,
} from "./vectorStoresModels.js";

/**
 * Optional request parameters support passing headers, abort signal, etc.
 */
export type OptionalRequestParameters = Pick<
  RequestParameters,
  "headers" | "timeout" | "abortSignal" | "tracingOptions"
>;

/**
 * Request options for list requests.
 */
export interface ListQueryParameters {
  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.
   */
  limit?: number;

  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   */
  order?: "asc" | "desc";

  /**
   * A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.
   */
  after?: string;

  /**
   * A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.
   */
  before?: string;
}

/**
 * Options for configuring polling behavior.
 */
export interface PollingOptions {
  /**
   * The interval, in milliseconds, to wait between polling attempts. If not specified, a default interval of 1000ms will be used.
   */
  sleepIntervalInMs?: number;
}

/**
 * Optional parameters configuring polling behavior.
 */
export interface PollingOptionsParams {
  /** Options for configuring polling behavior. */
  pollingOptions?: PollingOptions;
}

/**
 * Agent run response with support to stream.
 */
export type AgentRunResponse = PromiseLike<ThreadRunOutput> & {
  /**
   * Function to start streaming the agent event messages.
   * @returns A promise that resolves to an AgentEventMessageStream.
   */
  stream: () => Promise<AgentEventMessageStream>;
};

/**
 * Optional parameters for creating and running a thread, excluding the assistantId.
 */
export type CreateRunOptionalParams = Omit<CreateRunOptions & OperationOptions, "assistantId"> &
  OperationOptions;

/**
 * Optional parameters for creating and running a thread, excluding the assistantId.
 */
export type CreateAndRunThreadOptionalParams = Omit<CreateAndRunThreadOptions, "assistantId"> &
  OperationOptions;

/**
 * Optional parameters for listing run queries.
 */
export interface ListRunQueryOptionalParams extends ListQueryParameters, OperationOptions {}

/**
 * Optional parameters for getting a run.
 */
export interface GetRunOptionalParams extends OperationOptions {}

/**
 * Optional parameters for canceling a run.
 */
export interface CancelRunOptionalParams extends OperationOptions {}

/**
 * Optional parameters for submitting tool outputs to a run.
 */
export interface SubmitToolOutputsToRunOptionalParams extends OperationOptions {
  /**
   * Whether to stream the tool outputs.
   */
  stream?: boolean;
}

/**
 * Optional parameters for updating a run.
 */
export interface UpdateRunOptionalParams extends OperationOptions {
  /**  Metadata to update in the run.  */
  metadata?: Record<string, string> | null;
}

/**
 * Optional parameters for creating an agent thread.
 */
export interface CreateAgentThreadOptionalParams
  extends AgentThreadCreationOptions,
    OperationOptions {}

/**
 * Optional parameters for getting an agent thread.
 */
export interface GetAgentThreadOptionalParams extends OperationOptions {}

/**
 * Optional parameters for updating an agent thread.
 */
export interface UpdateAgentThreadOptionalParams
  extends UpdateAgentThreadOptions,
    OperationOptions {}

/**
 * Optional parameters for deleting an agent thread.
 */
export interface DeleteAgentThreadOptionalParams extends OperationOptions {}

/**
 * Optional parameters for getting an run step.
 */
export interface GetRunStepOptionalParams extends OperationOptions {}

/**
 * Optional parameters for listing run steps.
 */
export interface ListRunStepsOptionalParams extends ListQueryParameters, OperationOptions {}

/**
 * Optional parameters for creating a message.
 */
export interface CreateMessageOptionalParams extends OperationOptions {}

/**
 * Optional parameters for updating a message.
 */
export interface UpdateMessageOptionalParams extends OperationOptions {
  /** Metadata to update in the message. */
  metadata?: Record<string, string> | null;
}

/**
 * Optional parameters for listing messages.
 */
export interface ListMessagesOptionalParams
  extends ListMessagesQueryParamProperties,
    OperationOptions {}

/**
 * Optional parameters creating vector store.
 */
export interface CreateVectorStoreOptionalParams
  extends VectorStoreOptions,
    OperationOptions,
    PollingOptionsParams {}

/**
 * Optional parameters for listing vector stores.
 */
export interface ListVectorStoresOptionalParams extends ListQueryParameters, OperationOptions {}

/**
 * Optional parameters for updating a vector store.
 */
export interface UpdateVectorStoreOptionalParams
  extends VectorStoreUpdateOptions,
    OperationOptions {}

/**
 * Optional parameters for deleting a vector store.
 */
export interface DeleteVectorStoreOptionalParams extends OperationOptions {}

/**
 * Optional parameters for getting a vector store.
 */
export interface GetVectorStoreOptionalParams extends OperationOptions {}

/**
 * Optional parameters for listing vector store files.
 */
export interface ListVectorStoreFilesOptionalParams extends ListQueryParameters, OperationOptions {}

/**
 * Optional parameters for creating a vector store file.
 */
export interface CreateVectorStoreFileOptionalParams
  extends CreateVectorStoreFileOptions,
    OperationOptions,
    PollingOptionsParams {}

/**
 * Optional parameters for getting a vector store file.
 */
export interface GetVectorStoreFileOptionalParams extends OperationOptions {}

/**
 * Optional parameters for deleting a vector store file.
 */
export interface DeleteVectorStoreFileOptionalParams extends OperationOptions {}

/**
 * Optional parameters for listing vector store file batches.
 */
export interface ListVectorStoreFileBatchFilesOptionalParams
  extends ListQueryParameters,
    OperationOptions {
  /** Filter by file status. */
  filter?: VectorStoreFileStatusFilter;
}

/**
 * Optional parameters for getting a vector store file batch.
 */
export interface GetVectorStoreFileBatchOptionalParams extends OperationOptions {}

/**
 * Optional parameters for canceling a vector store file batch.
 */
export interface CancelVectorStoreFileBatchOptionalParams extends OperationOptions {}

/**
 * Optional parameters for creating a vector store file batch.
 */
export interface CreateVectorStoreFileBatchOptionalParams
  extends CreateVectorStoreFileBatchOptions,
    OperationOptions,
    PollingOptionsParams {}

/**
 * Optional parameters for creating agent.
 */
export interface CreateAgentOptionalParams
  extends Omit<CreateAgentOptions, "model">,
    OperationOptions {}

/**
 * Optional parameters for updating agent.
 */
export interface UpdateAgentOptionalParams extends UpdateAgentOptions, OperationOptions {}

/**
 * Optional parameters for deleting agent.
 */
export interface DeleteAgentOptionalParams extends OperationOptions {}

/**
 * Optional parameters for getting agent.
 */
export interface GetAgentOptionalParams extends OperationOptions {}

/**
 * Optional parameters for listing agents.
 */
export interface ListAgentsOptionalParams extends ListQueryParameters, OperationOptions {}

/**
 * Optional parameters for listing files.
 */
export interface ListFilesOptionalParams extends ListFilesQueryParamProperties, OperationOptions {}

/**
 * Optional parameters for deleting a file.
 */
export interface DeleteFileOptionalParams extends OperationOptions {}

/**
 * Optional parameters for getting a file.
 */
export interface GetFileOptionalParams extends OperationOptions {}

/**
 * Optional parameters for getting file content.
 */
export interface GetFileContentOptionalParams extends OperationOptions {}

/**
 * Optional parameters for uploading a file.
 */
export interface UploadFileOptionalParams extends OperationOptions, PollingOptionsParams {
  /** The name of the file. */
  fileName?: string;
}
