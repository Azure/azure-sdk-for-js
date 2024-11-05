// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  CreateAgentOptions,
  ListSortOrder,
  UpdateAgentOptions,
  AgentThreadCreationOptions,
  UpdateAgentThreadOptions,
  ThreadMessageOptions,
  CreateRunOptions,
  ToolOutput,
  CreateAndRunThreadOptions,
  FilePurpose,
  VectorStoreOptions,
  VectorStoreUpdateOptions,
  VectorStoreFileStatusFilter,
  VectorStoreChunkingStrategyRequest,
  ConnectionType,
  Evaluation,
  EvaluationSchedule,
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

export interface CreateThreadBodyParam {
  body: AgentThreadCreationOptions;
}

export type CreateThreadParameters = CreateThreadBodyParam & RequestParameters;
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
  runId?: string;
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

export type CreateRunParameters = CreateRunBodyParam & RequestParameters;

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

export interface CreateThreadAndRunBodyParam {
  body: CreateAndRunThreadOptions;
}

export type CreateThreadAndRunParameters = CreateThreadAndRunBodyParam &
  RequestParameters;
export type GetRunStepParameters = RequestParameters;

export interface ListRunStepsQueryParamProperties {
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
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose?: FilePurpose;
}

export interface ListFilesQueryParam {
  queryParameters?: ListFilesQueryParamProperties;
}

export type ListFilesParameters = ListFilesQueryParam & RequestParameters;

export interface UploadFileBodyParam {
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
    file_id: string;
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export type CreateVectorStoreFileParameters = CreateVectorStoreFileBodyParam &
  RequestParameters;
export type GetVectorStoreFileParameters = RequestParameters;
export type DeleteVectorStoreFileParameters = RequestParameters;

export interface CreateVectorStoreFileBatchBodyParam {
  body: {
    file_ids: string[];
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
export type GetWorkspaceParameters = RequestParameters;

export interface ListConnectionsQueryParamProperties {
  /** Category of the workspace connection. */
  category?: ConnectionType;
  /** Indicates whether to list datastores. Service default: do not list datastores. */
  includeAll?: boolean;
  /** Target of the workspace connection. */
  target?: string;
}

export interface ListConnectionsQueryParam {
  queryParameters?: ListConnectionsQueryParamProperties;
}

export type ListConnectionsParameters = ListConnectionsQueryParam &
  RequestParameters;
export type GetConnectionParameters = RequestParameters;

export interface GetConnectionWithSecretsBodyParam {
  body: { ignored: string };
}

export type GetConnectionWithSecretsParameters =
  GetConnectionWithSecretsBodyParam & RequestParameters;
export type GetAppInsightsParameters = RequestParameters;

export interface GetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetHeaderParam {
  headers?: RawHttpHeadersInput & GetHeaders;
}

export type GetParameters = GetHeaderParam & RequestParameters;

export interface CreateBodyParam {
  /** Evaluation to run. */
  body: Evaluation;
}

export type CreateParameters = CreateBodyParam & RequestParameters;

export interface ListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListQueryParam {
  queryParameters?: ListQueryParamProperties;
}

export interface ListHeaderParam {
  headers?: RawHttpHeadersInput & ListHeaders;
}

export type ListParameters = ListQueryParam &
  ListHeaderParam &
  RequestParameters;

export interface UpdateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type EvaluationResourceMergeAndPatch = Partial<Evaluation>;

export interface UpdateBodyParam {
  /** The resource instance. */
  body: EvaluationResourceMergeAndPatch;
}

export interface UpdateHeaderParam {
  headers?: RawHttpHeadersInput & UpdateHeaders;
}

export interface UpdateMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpdateParameters = UpdateHeaderParam &
  UpdateMediaTypesParam &
  UpdateBodyParam &
  RequestParameters;

export interface GetScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetScheduleHeaderParam {
  headers?: RawHttpHeadersInput & GetScheduleHeaders;
}

export type GetScheduleParameters = GetScheduleHeaderParam & RequestParameters;

export interface CreateOrReplaceScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface CreateOrReplaceScheduleBodyParam {
  /** The resource instance. */
  body: EvaluationSchedule;
}

export interface CreateOrReplaceScheduleHeaderParam {
  headers?: RawHttpHeadersInput & CreateOrReplaceScheduleHeaders;
}

export type CreateOrReplaceScheduleParameters =
  CreateOrReplaceScheduleHeaderParam &
    CreateOrReplaceScheduleBodyParam &
    RequestParameters;

export interface ListScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListScheduleQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListScheduleQueryParam {
  queryParameters?: ListScheduleQueryParamProperties;
}

export interface ListScheduleHeaderParam {
  headers?: RawHttpHeadersInput & ListScheduleHeaders;
}

export type ListScheduleParameters = ListScheduleQueryParam &
  ListScheduleHeaderParam &
  RequestParameters;
export type DisableScheduleParameters = RequestParameters;
