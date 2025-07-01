// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  CreateAgentOptions,
  ListSortOrder,
  UpdateAgentOptions,
  CreateAndRunThreadOptions,
  AgentThreadCreationOptions,
  UpdateAgentThreadOptions,
  ThreadMessageOptions,
  RunAdditionalFieldList,
  CreateRunOptions,
  ToolOutput,
  FilePurpose,
  VectorStoreOptions,
  VectorStoreUpdateOptions,
  VectorStoreFileStatusFilter,
  VectorStoreDataSource,
  VectorStoreChunkingStrategyRequest,
} from "./models.js";

export interface CreateAgentBodyParam {
  body: CreateAgentOptions;
}

export type CreateAgentParameters = CreateAgentBodyParam & RequestParameters;

export interface ListAgentsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListAgentsQueryParam {
  queryParameters?: ListAgentsQueryParamProperties;
}

export type ListAgentsParameters = ListAgentsQueryParam & RequestParameters;
export type GetAgentParameters = RequestParameters;

export interface UpdateAgentBodyParam {
  body: UpdateAgentOptions;
}

export type UpdateAgentParameters = UpdateAgentBodyParam & RequestParameters;
export type DeleteAgentParameters = RequestParameters;

export interface CreateThreadAndRunBodyParam {
  body: CreateAndRunThreadOptions;
}

export type CreateThreadAndRunParameters = CreateThreadAndRunBodyParam &
  RequestParameters;

export interface CreateThreadBodyParam {
  body: AgentThreadCreationOptions;
}

export type CreateThreadParameters = CreateThreadBodyParam & RequestParameters;

export interface ListThreadsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListThreadsQueryParam {
  queryParameters?: ListThreadsQueryParamProperties;
}

export type ListThreadsParameters = ListThreadsQueryParam & RequestParameters;
export type GetThreadParameters = RequestParameters;

export interface UpdateThreadBodyParam {
  body: UpdateAgentThreadOptions;
}

export type UpdateThreadParameters = UpdateThreadBodyParam & RequestParameters;
export type DeleteThreadParameters = RequestParameters;

export interface CreateMessageBodyParam {
  body: ThreadMessageOptions;
}

export type CreateMessageParameters = CreateMessageBodyParam &
  RequestParameters;

export interface ListMessagesQueryParamProperties {
  /** Filter messages by the run ID that generated them. */
  run_id?: string;
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListMessagesQueryParam {
  queryParameters?: ListMessagesQueryParamProperties;
}

export type ListMessagesParameters = ListMessagesQueryParam & RequestParameters;
export type GetMessageParameters = RequestParameters;

export interface UpdateMessageBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export type UpdateMessageParameters = UpdateMessageBodyParam &
  RequestParameters;

export interface CreateRunBodyParam {
  body: CreateRunOptions;
}

/** This is the wrapper object for the parameter `include[]` with explode set to false and style set to form. */
export interface CreateRunIncludeQueryParam {
  /** Value of the parameter */
  value: RunAdditionalFieldList[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface CreateRunQueryParamProperties {
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content`
   * to fetch the file search result content.
   */
  "include[]"?: RunAdditionalFieldList[] | CreateRunIncludeQueryParam;
}

export interface CreateRunQueryParam {
  queryParameters?: CreateRunQueryParamProperties;
}

export type CreateRunParameters = CreateRunQueryParam &
  CreateRunBodyParam &
  RequestParameters;

export interface ListRunsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListRunsQueryParam {
  queryParameters?: ListRunsQueryParamProperties;
}

export type ListRunsParameters = ListRunsQueryParam & RequestParameters;
export type GetRunParameters = RequestParameters;

export interface UpdateRunBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export type UpdateRunParameters = UpdateRunBodyParam & RequestParameters;

export interface SubmitToolOutputsToRunBodyParam {
  body: { tool_outputs: Array<ToolOutput>; stream?: boolean | null };
}

export type SubmitToolOutputsToRunParameters = SubmitToolOutputsToRunBodyParam &
  RequestParameters;
export type CancelRunParameters = RequestParameters;

/** This is the wrapper object for the parameter `include[]` with explode set to false and style set to form. */
export interface GetRunStepIncludeQueryParam {
  /** Value of the parameter */
  value: RunAdditionalFieldList[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface GetRunStepQueryParamProperties {
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
   */
  "include[]"?: RunAdditionalFieldList[] | GetRunStepIncludeQueryParam;
}

export interface GetRunStepQueryParam {
  queryParameters?: GetRunStepQueryParamProperties;
}

export type GetRunStepParameters = GetRunStepQueryParam & RequestParameters;

/** This is the wrapper object for the parameter `include[]` with explode set to false and style set to form. */
export interface ListRunStepsIncludeQueryParam {
  /** Value of the parameter */
  value: RunAdditionalFieldList[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface ListRunStepsQueryParamProperties {
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
   */
  "include[]"?: RunAdditionalFieldList[] | ListRunStepsIncludeQueryParam;
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListRunStepsQueryParam {
  queryParameters?: ListRunStepsQueryParamProperties;
}

export type ListRunStepsParameters = ListRunStepsQueryParam & RequestParameters;

export interface ListFilesQueryParamProperties {
  /**
   * The purpose of the file.
   *
   * Possible values: "assistants", "assistants_output", "vision"
   */
  purpose?: FilePurpose;
}

export interface ListFilesQueryParam {
  queryParameters?: ListFilesQueryParamProperties;
}

export type ListFilesParameters = ListFilesQueryParam & RequestParameters;

export interface UploadFileBodyParam {
  /**
   * Multipart body
   *
   * Value may contain any sequence of octets
   */
  body:
    | FormData
    | Array<
        | {
            name: "file";
            body:
              | string
              | Uint8Array
              | ReadableStream<Uint8Array>
              | NodeJS.ReadableStream
              | File;
            filename?: string;
            contentType?: string;
          }
        | {
            name: "purpose";
            body: FilePurpose;
            filename?: string;
            contentType?: string;
          }
        | { name: "filename"; body: string }
      >;
}

export interface UploadFileMediaTypesParam {
  /** The name of the file to upload. */
  contentType: "multipart/form-data";
}

export type UploadFileParameters = UploadFileMediaTypesParam &
  UploadFileBodyParam &
  RequestParameters;
export type DeleteFileParameters = RequestParameters;
export type GetFileParameters = RequestParameters;
export type GetFileContentParameters = RequestParameters;

export interface ListVectorStoresQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListVectorStoresQueryParam {
  queryParameters?: ListVectorStoresQueryParamProperties;
}

export type ListVectorStoresParameters = ListVectorStoresQueryParam &
  RequestParameters;

export interface CreateVectorStoreBodyParam {
  body: VectorStoreOptions;
}

export type CreateVectorStoreParameters = CreateVectorStoreBodyParam &
  RequestParameters;
export type GetVectorStoreParameters = RequestParameters;

export interface ModifyVectorStoreBodyParam {
  body: VectorStoreUpdateOptions;
}

export type ModifyVectorStoreParameters = ModifyVectorStoreBodyParam &
  RequestParameters;
export type DeleteVectorStoreParameters = RequestParameters;

export interface ListVectorStoreFilesQueryParamProperties {
  /**
   * Filter by file status.
   *
   * Possible values: "in_progress", "completed", "failed", "cancelled"
   */
  filter?: VectorStoreFileStatusFilter;
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListVectorStoreFilesQueryParam {
  queryParameters?: ListVectorStoreFilesQueryParamProperties;
}

export type ListVectorStoreFilesParameters = ListVectorStoreFilesQueryParam &
  RequestParameters;

export interface CreateVectorStoreFileBodyParam {
  body: {
    file_id?: string;
    data_source?: VectorStoreDataSource;
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export type CreateVectorStoreFileParameters = CreateVectorStoreFileBodyParam &
  RequestParameters;
export type GetVectorStoreFileParameters = RequestParameters;
export type DeleteVectorStoreFileParameters = RequestParameters;

export interface CreateVectorStoreFileBatchBodyParam {
  body: {
    file_ids?: string[];
    data_sources?: Array<VectorStoreDataSource>;
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export type CreateVectorStoreFileBatchParameters =
  CreateVectorStoreFileBatchBodyParam & RequestParameters;
export type GetVectorStoreFileBatchParameters = RequestParameters;
export type CancelVectorStoreFileBatchParameters = RequestParameters;

export interface ListVectorStoreFileBatchFilesQueryParamProperties {
  /**
   * Filter by file status.
   *
   * Possible values: "in_progress", "completed", "failed", "cancelled"
   */
  filter?: VectorStoreFileStatusFilter;
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
   */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListVectorStoreFileBatchFilesQueryParam {
  queryParameters?: ListVectorStoreFileBatchFilesQueryParamProperties;
}

export type ListVectorStoreFileBatchFilesParameters =
  ListVectorStoreFileBatchFilesQueryParam & RequestParameters;
