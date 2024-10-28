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

export interface AgentsCreateAgentBodyParam {
  body: CreateAgentOptions;
}

export type AgentsCreateAgentParameters = AgentsCreateAgentBodyParam &
  RequestParameters;

export interface AgentsListAgentsQueryParamProperties {
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

export interface AgentsListAgentsQueryParam {
  queryParameters?: AgentsListAgentsQueryParamProperties;
}

export type AgentsListAgentsParameters = AgentsListAgentsQueryParam &
  RequestParameters;
export type AgentsGetAgentParameters = RequestParameters;

export interface AgentsUpdateAgentBodyParam {
  body: UpdateAgentOptions;
}

export type AgentsUpdateAgentParameters = AgentsUpdateAgentBodyParam &
  RequestParameters;
export type AgentsDeleteAgentParameters = RequestParameters;

export interface AgentsCreateThreadBodyParam {
  body: AgentThreadCreationOptions;
}

export type AgentsCreateThreadParameters = AgentsCreateThreadBodyParam &
  RequestParameters;
export type AgentsGetThreadParameters = RequestParameters;

export interface AgentsUpdateThreadBodyParam {
  body: UpdateAgentThreadOptions;
}

export type AgentsUpdateThreadParameters = AgentsUpdateThreadBodyParam &
  RequestParameters;
export type AgentsDeleteThreadParameters = RequestParameters;

export interface AgentsCreateMessageBodyParam {
  body: ThreadMessageOptions;
}

export type AgentsCreateMessageParameters = AgentsCreateMessageBodyParam &
  RequestParameters;

export interface AgentsListMessagesQueryParamProperties {
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

export interface AgentsListMessagesQueryParam {
  queryParameters?: AgentsListMessagesQueryParamProperties;
}

export type AgentsListMessagesParameters = AgentsListMessagesQueryParam &
  RequestParameters;
export type AgentsGetMessageParameters = RequestParameters;

export interface AgentsUpdateMessageBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export type AgentsUpdateMessageParameters = AgentsUpdateMessageBodyParam &
  RequestParameters;

export interface AgentsCreateRunBodyParam {
  body: CreateRunOptions;
}

export type AgentsCreateRunParameters = AgentsCreateRunBodyParam &
  RequestParameters;

export interface AgentsListRunsQueryParamProperties {
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

export interface AgentsListRunsQueryParam {
  queryParameters?: AgentsListRunsQueryParamProperties;
}

export type AgentsListRunsParameters = AgentsListRunsQueryParam &
  RequestParameters;
export type AgentsGetRunParameters = RequestParameters;

export interface AgentsUpdateRunBodyParam {
  body: { metadata?: Record<string, string> | null };
}

export type AgentsUpdateRunParameters = AgentsUpdateRunBodyParam &
  RequestParameters;

export interface AgentsSubmitToolOutputsToRunBodyParam {
  body: { tool_outputs: Array<ToolOutput>; stream?: boolean | null };
}

export type AgentsSubmitToolOutputsToRunParameters =
  AgentsSubmitToolOutputsToRunBodyParam & RequestParameters;
export type AgentsCancelRunParameters = RequestParameters;

export interface AgentsCreateThreadAndRunBodyParam {
  body: CreateAndRunThreadOptions;
}

export type AgentsCreateThreadAndRunParameters =
  AgentsCreateThreadAndRunBodyParam & RequestParameters;
export type AgentsGetRunStepParameters = RequestParameters;

export interface AgentsListRunStepsQueryParamProperties {
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

export interface AgentsListRunStepsQueryParam {
  queryParameters?: AgentsListRunStepsQueryParamProperties;
}

export type AgentsListRunStepsParameters = AgentsListRunStepsQueryParam &
  RequestParameters;

export interface AgentsListFilesQueryParamProperties {
  /**
   * The purpose of the file.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output", "batch", "batch_output", "vision"
   */
  purpose?: FilePurpose;
}

export interface AgentsListFilesQueryParam {
  queryParameters?: AgentsListFilesQueryParamProperties;
}

export type AgentsListFilesParameters = AgentsListFilesQueryParam &
  RequestParameters;

export interface AgentsUploadFileBodyParam {
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

export interface AgentsUploadFileMediaTypesParam {
  /** The name of the file to upload. */
  contentType: "multipart/form-data";
}

export type AgentsUploadFileParameters = AgentsUploadFileMediaTypesParam &
  AgentsUploadFileBodyParam &
  RequestParameters;
export type AgentsDeleteFileParameters = RequestParameters;
export type AgentsGetFileParameters = RequestParameters;
export type AgentsGetFileContentParameters = RequestParameters;

export interface AgentsListVectorStoresQueryParamProperties {
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

export interface AgentsListVectorStoresQueryParam {
  queryParameters?: AgentsListVectorStoresQueryParamProperties;
}

export type AgentsListVectorStoresParameters =
  AgentsListVectorStoresQueryParam & RequestParameters;

export interface AgentsCreateVectorStoreBodyParam {
  body: VectorStoreOptions;
}

export type AgentsCreateVectorStoreParameters =
  AgentsCreateVectorStoreBodyParam & RequestParameters;
export type AgentsGetVectorStoreParameters = RequestParameters;

export interface AgentsModifyVectorStoreBodyParam {
  body: VectorStoreUpdateOptions;
}

export type AgentsModifyVectorStoreParameters =
  AgentsModifyVectorStoreBodyParam & RequestParameters;
export type AgentsDeleteVectorStoreParameters = RequestParameters;

export interface AgentsListVectorStoreFilesQueryParamProperties {
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

export interface AgentsListVectorStoreFilesQueryParam {
  queryParameters?: AgentsListVectorStoreFilesQueryParamProperties;
}

export type AgentsListVectorStoreFilesParameters =
  AgentsListVectorStoreFilesQueryParam & RequestParameters;

export interface AgentsCreateVectorStoreFileBodyParam {
  body: {
    file_id: string;
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export type AgentsCreateVectorStoreFileParameters =
  AgentsCreateVectorStoreFileBodyParam & RequestParameters;
export type AgentsGetVectorStoreFileParameters = RequestParameters;
export type AgentsDeleteVectorStoreFileParameters = RequestParameters;

export interface AgentsCreateVectorStoreFileBatchBodyParam {
  body: {
    file_ids: string[];
    chunking_strategy?: VectorStoreChunkingStrategyRequest;
  };
}

export type AgentsCreateVectorStoreFileBatchParameters =
  AgentsCreateVectorStoreFileBatchBodyParam & RequestParameters;
export type AgentsGetVectorStoreFileBatchParameters = RequestParameters;
export type AgentsCancelVectorStoreFileBatchParameters = RequestParameters;

export interface AgentsListVectorStoreFileBatchFilesQueryParamProperties {
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

export interface AgentsListVectorStoreFileBatchFilesQueryParam {
  queryParameters?: AgentsListVectorStoreFileBatchFilesQueryParamProperties;
}

export type AgentsListVectorStoreFileBatchFilesParameters =
  AgentsListVectorStoreFileBatchFilesQueryParam & RequestParameters;

export interface ConnectionsListQueryParamProperties {
  /** Category of the workspace connection. */
  category?: ConnectionType;
  /** Indicates whether to list datastores. Service default: do not list datastores. */
  includeAll?: boolean;
  /** Target of the workspace connection. */
  target?: string;
}

export interface ConnectionsListQueryParam {
  queryParameters?: ConnectionsListQueryParamProperties;
}

export type ConnectionsListParameters = ConnectionsListQueryParam &
  RequestParameters;
export type ConnectionsGetParameters = RequestParameters;

export interface ConnectionsListSecretsBodyParam {
  body: { ignored: string };
}

export type ConnectionsListSecretsParameters = ConnectionsListSecretsBodyParam &
  RequestParameters;

export interface EvaluationsGetHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsGetHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsGetHeaders;
}

export type EvaluationsGetParameters = EvaluationsGetHeaderParam &
  RequestParameters;

export interface EvaluationsCreateBodyParam {
  /** Evaluation to run. */
  body: Evaluation;
}

export type EvaluationsCreateParameters = EvaluationsCreateBodyParam &
  RequestParameters;

export interface EvaluationsListHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsListQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface EvaluationsListQueryParam {
  queryParameters?: EvaluationsListQueryParamProperties;
}

export interface EvaluationsListHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsListHeaders;
}

export type EvaluationsListParameters = EvaluationsListQueryParam &
  EvaluationsListHeaderParam &
  RequestParameters;

export interface EvaluationsUpdateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type EvaluationResourceMergeAndPatch = Partial<Evaluation>;

export interface EvaluationsUpdateBodyParam {
  /** The resource instance. */
  body: EvaluationResourceMergeAndPatch;
}

export interface EvaluationsUpdateHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsUpdateHeaders;
}

export interface EvaluationsUpdateMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type EvaluationsUpdateParameters = EvaluationsUpdateHeaderParam &
  EvaluationsUpdateMediaTypesParam &
  EvaluationsUpdateBodyParam &
  RequestParameters;

export interface EvaluationsGetScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsGetScheduleHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsGetScheduleHeaders;
}

export type EvaluationsGetScheduleParameters =
  EvaluationsGetScheduleHeaderParam & RequestParameters;

export interface EvaluationsCreateOrReplaceScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsCreateOrReplaceScheduleBodyParam {
  /** The resource instance. */
  body: EvaluationSchedule;
}

export interface EvaluationsCreateOrReplaceScheduleHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsCreateOrReplaceScheduleHeaders;
}

export type EvaluationsCreateOrReplaceScheduleParameters =
  EvaluationsCreateOrReplaceScheduleHeaderParam &
    EvaluationsCreateOrReplaceScheduleBodyParam &
    RequestParameters;

export interface EvaluationsListScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsListScheduleQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface EvaluationsListScheduleQueryParam {
  queryParameters?: EvaluationsListScheduleQueryParamProperties;
}

export interface EvaluationsListScheduleHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsListScheduleHeaders;
}

export type EvaluationsListScheduleParameters =
  EvaluationsListScheduleQueryParam &
    EvaluationsListScheduleHeaderParam &
    RequestParameters;

export interface EvaluationsDeleteScheduleHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface EvaluationsDeleteScheduleHeaderParam {
  headers?: RawHttpHeadersInput & EvaluationsDeleteScheduleHeaders;
}

export type EvaluationsDeleteScheduleParameters =
  EvaluationsDeleteScheduleHeaderParam & RequestParameters;
