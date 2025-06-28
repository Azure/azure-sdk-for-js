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

export interface CreateAgentQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateAgentQueryParam {
  queryParameters: CreateAgentQueryParamProperties;
}

export type CreateAgentParameters = CreateAgentQueryParam &
  CreateAgentBodyParam &
  RequestParameters;

export interface ListAgentsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListAgentsQueryParamProperties;
}

export type ListAgentsParameters = ListAgentsQueryParam & RequestParameters;

export interface GetAgentQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetAgentQueryParam {
  queryParameters: GetAgentQueryParamProperties;
}

export type GetAgentParameters = GetAgentQueryParam & RequestParameters;

export interface UpdateAgentBodyParam {
  body: UpdateAgentOptions;
}

export interface UpdateAgentQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface UpdateAgentQueryParam {
  queryParameters: UpdateAgentQueryParamProperties;
}

export type UpdateAgentParameters = UpdateAgentQueryParam &
  UpdateAgentBodyParam &
  RequestParameters;

export interface DeleteAgentQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DeleteAgentQueryParam {
  queryParameters: DeleteAgentQueryParamProperties;
}

export type DeleteAgentParameters = DeleteAgentQueryParam & RequestParameters;

export interface CreateThreadAndRunBodyParam {
  body: CreateAndRunThreadOptions;
}

export interface CreateThreadAndRunQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateThreadAndRunQueryParam {
  queryParameters: CreateThreadAndRunQueryParamProperties;
}

export type CreateThreadAndRunParameters = CreateThreadAndRunQueryParam &
  CreateThreadAndRunBodyParam &
  RequestParameters;

export interface CreateThreadBodyParam {
  body: AgentThreadCreationOptions;
}

export interface CreateThreadQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateThreadQueryParam {
  queryParameters: CreateThreadQueryParamProperties;
}

export type CreateThreadParameters = CreateThreadQueryParam &
  CreateThreadBodyParam &
  RequestParameters;

export interface ListThreadsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListThreadsQueryParamProperties;
}

export type ListThreadsParameters = ListThreadsQueryParam & RequestParameters;

export interface GetThreadQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetThreadQueryParam {
  queryParameters: GetThreadQueryParamProperties;
}

export type GetThreadParameters = GetThreadQueryParam & RequestParameters;

export interface UpdateThreadBodyParam {
  body: UpdateAgentThreadOptions;
}

export interface UpdateThreadQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface UpdateThreadQueryParam {
  queryParameters: UpdateThreadQueryParamProperties;
}

export type UpdateThreadParameters = UpdateThreadQueryParam &
  UpdateThreadBodyParam &
  RequestParameters;

export interface DeleteThreadQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DeleteThreadQueryParam {
  queryParameters: DeleteThreadQueryParamProperties;
}

export type DeleteThreadParameters = DeleteThreadQueryParam & RequestParameters;

export interface CreateMessageBodyParam {
  body: ThreadMessageOptions;
}

export interface CreateMessageQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateMessageQueryParam {
  queryParameters: CreateMessageQueryParamProperties;
}

export type CreateMessageParameters = CreateMessageQueryParam &
  CreateMessageBodyParam &
  RequestParameters;

export interface ListMessagesQueryParamProperties {
  /** Filter messages by the run ID that generated them. */
  run_id?: string;
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListMessagesQueryParamProperties;
}

export type ListMessagesParameters = ListMessagesQueryParam & RequestParameters;

export interface GetMessageQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetMessageQueryParam {
  queryParameters: GetMessageQueryParamProperties;
}

export type GetMessageParameters = GetMessageQueryParam & RequestParameters;

export interface UpdateMessageBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export interface UpdateMessageQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface UpdateMessageQueryParam {
  queryParameters: UpdateMessageQueryParamProperties;
}

export type UpdateMessageParameters = UpdateMessageQueryParam &
  UpdateMessageBodyParam &
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
  /** The API version to use for this operation. */
  "api-version": string;
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content`
   * to fetch the file search result content.
   */
  "include[]"?: RunAdditionalFieldList[] | CreateRunIncludeQueryParam;
}

export interface CreateRunQueryParam {
  queryParameters: CreateRunQueryParamProperties;
}

export type CreateRunParameters = CreateRunQueryParam &
  CreateRunBodyParam &
  RequestParameters;

export interface ListRunsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListRunsQueryParamProperties;
}

export type ListRunsParameters = ListRunsQueryParam & RequestParameters;

export interface GetRunQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetRunQueryParam {
  queryParameters: GetRunQueryParamProperties;
}

export type GetRunParameters = GetRunQueryParam & RequestParameters;

export interface UpdateRunBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export interface UpdateRunQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface UpdateRunQueryParam {
  queryParameters: UpdateRunQueryParamProperties;
}

export type UpdateRunParameters = UpdateRunQueryParam &
  UpdateRunBodyParam &
  RequestParameters;

export interface SubmitToolOutputsToRunBodyParam {
  body: { tool_outputs: Array<ToolOutput>; stream?: boolean | null };
}

export interface SubmitToolOutputsToRunQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface SubmitToolOutputsToRunQueryParam {
  queryParameters: SubmitToolOutputsToRunQueryParamProperties;
}

export type SubmitToolOutputsToRunParameters =
  SubmitToolOutputsToRunQueryParam &
    SubmitToolOutputsToRunBodyParam &
    RequestParameters;

export interface CancelRunQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CancelRunQueryParam {
  queryParameters: CancelRunQueryParamProperties;
}

export type CancelRunParameters = CancelRunQueryParam & RequestParameters;

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
  /** The API version to use for this operation. */
  "api-version": string;
  /**
   * A list of additional fields to include in the response.
   * Currently the only supported value is `step_details.tool_calls[*].file_search.results[*].content` to fetch the file search result content.
   */
  "include[]"?: RunAdditionalFieldList[] | GetRunStepIncludeQueryParam;
}

export interface GetRunStepQueryParam {
  queryParameters: GetRunStepQueryParamProperties;
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
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListRunStepsQueryParamProperties;
}

export type ListRunStepsParameters = ListRunStepsQueryParam & RequestParameters;

export interface ListFilesQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
  /**
   * The purpose of the file.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose?: FilePurpose;
}

export interface ListFilesQueryParam {
  queryParameters: ListFilesQueryParamProperties;
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

export interface UploadFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface UploadFileQueryParam {
  queryParameters: UploadFileQueryParamProperties;
}

export interface UploadFileMediaTypesParam {
  /** The name of the file to upload. */
  contentType: "multipart/form-data";
}

export type UploadFileParameters = UploadFileQueryParam &
  UploadFileMediaTypesParam &
  UploadFileBodyParam &
  RequestParameters;

export interface DeleteFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DeleteFileQueryParam {
  queryParameters: DeleteFileQueryParamProperties;
}

export type DeleteFileParameters = DeleteFileQueryParam & RequestParameters;

export interface GetFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetFileQueryParam {
  queryParameters: GetFileQueryParamProperties;
}

export type GetFileParameters = GetFileQueryParam & RequestParameters;

export interface GetFileContentQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetFileContentQueryParam {
  queryParameters: GetFileContentQueryParamProperties;
}

export type GetFileContentParameters = GetFileContentQueryParam &
  RequestParameters;

export interface ListVectorStoresQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListVectorStoresQueryParamProperties;
}

export type ListVectorStoresParameters = ListVectorStoresQueryParam &
  RequestParameters;

export interface CreateVectorStoreBodyParam {
  body: VectorStoreOptions;
}

export interface CreateVectorStoreQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateVectorStoreQueryParam {
  queryParameters: CreateVectorStoreQueryParamProperties;
}

export type CreateVectorStoreParameters = CreateVectorStoreQueryParam &
  CreateVectorStoreBodyParam &
  RequestParameters;

export interface GetVectorStoreQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetVectorStoreQueryParam {
  queryParameters: GetVectorStoreQueryParamProperties;
}

export type GetVectorStoreParameters = GetVectorStoreQueryParam &
  RequestParameters;

export interface ModifyVectorStoreBodyParam {
  body: VectorStoreUpdateOptions;
}

export interface ModifyVectorStoreQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface ModifyVectorStoreQueryParam {
  queryParameters: ModifyVectorStoreQueryParamProperties;
}

export type ModifyVectorStoreParameters = ModifyVectorStoreQueryParam &
  ModifyVectorStoreBodyParam &
  RequestParameters;

export interface DeleteVectorStoreQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DeleteVectorStoreQueryParam {
  queryParameters: DeleteVectorStoreQueryParamProperties;
}

export type DeleteVectorStoreParameters = DeleteVectorStoreQueryParam &
  RequestParameters;

export interface ListVectorStoreFilesQueryParamProperties {
  /**
   * Filter by file status.
   *
   * Possible values: "in_progress", "completed", "failed", "cancelled"
   */
  filter?: VectorStoreFileStatusFilter;
  /** The API version to use for this operation. */
  "api-version": string;
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
  queryParameters: ListVectorStoreFilesQueryParamProperties;
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

export interface CreateVectorStoreFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateVectorStoreFileQueryParam {
  queryParameters: CreateVectorStoreFileQueryParamProperties;
}

export type CreateVectorStoreFileParameters = CreateVectorStoreFileQueryParam &
  CreateVectorStoreFileBodyParam &
  RequestParameters;

export interface GetVectorStoreFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetVectorStoreFileQueryParam {
  queryParameters: GetVectorStoreFileQueryParamProperties;
}

export type GetVectorStoreFileParameters = GetVectorStoreFileQueryParam &
  RequestParameters;

export interface DeleteVectorStoreFileQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface DeleteVectorStoreFileQueryParam {
  queryParameters: DeleteVectorStoreFileQueryParamProperties;
}

export type DeleteVectorStoreFileParameters = DeleteVectorStoreFileQueryParam &
  RequestParameters;

export interface CreateVectorStoreFileBatchBodyParam {
  body: {
    file_ids?: string[];
    data_sources?: Array<VectorStoreDataSource>;
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export interface CreateVectorStoreFileBatchQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CreateVectorStoreFileBatchQueryParam {
  queryParameters: CreateVectorStoreFileBatchQueryParamProperties;
}

export type CreateVectorStoreFileBatchParameters =
  CreateVectorStoreFileBatchQueryParam &
    CreateVectorStoreFileBatchBodyParam &
    RequestParameters;

export interface GetVectorStoreFileBatchQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetVectorStoreFileBatchQueryParam {
  queryParameters: GetVectorStoreFileBatchQueryParamProperties;
}

export type GetVectorStoreFileBatchParameters =
  GetVectorStoreFileBatchQueryParam & RequestParameters;

export interface CancelVectorStoreFileBatchQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface CancelVectorStoreFileBatchQueryParam {
  queryParameters: CancelVectorStoreFileBatchQueryParamProperties;
}

export type CancelVectorStoreFileBatchParameters =
  CancelVectorStoreFileBatchQueryParam & RequestParameters;

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
