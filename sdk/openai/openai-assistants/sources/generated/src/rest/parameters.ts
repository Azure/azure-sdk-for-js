// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AssistantCreationOptions,
  AssistantModificationOptions,
  AssistantThreadCreationOptions,
  TypeSpecRecord,
  ToolDefinition,
  ToolOutput,
  CreateAndRunThreadOptions,
} from "./models.js";

export interface CreateAssistantBodyParam {
  body?: AssistantCreationOptions;
}

export type CreateAssistantParameters = CreateAssistantBodyParam &
  RequestParameters;

export interface ListAssistantsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListAssistantsQueryParam {
  queryParameters?: ListAssistantsQueryParamProperties;
}

export type ListAssistantsParameters = ListAssistantsQueryParam &
  RequestParameters;
export type RetrieveAssistantParameters = RequestParameters;

export interface ModifyAssistantBodyParam {
  /** The details of the modification to perform on the specified assistant. */
  body: AssistantModificationOptions;
}

export type ModifyAssistantParameters = ModifyAssistantBodyParam &
  RequestParameters;
export type DeleteAssistantParameters = RequestParameters;

export interface CreateAssistantFileBodyParam {
  body?: { file_id: file_id };
}

export type CreateAssistantFileParameters = CreateAssistantFileBodyParam &
  RequestParameters;

export interface ListAssistantFilesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListAssistantFilesQueryParam {
  queryParameters?: ListAssistantFilesQueryParamProperties;
}

export type ListAssistantFilesParameters = ListAssistantFilesQueryParam &
  RequestParameters;
export type RetrieveAssistantFileParameters = RequestParameters;
export type DeleteAssistantFileParameters = RequestParameters;

export interface CreateThreadBodyParam {
  body?: AssistantThreadCreationOptions;
}

export type CreateThreadParameters = CreateThreadBodyParam & RequestParameters;
export type RetrieveThreadParameters = RequestParameters;

export interface ModifyThreadBodyParam {
  body?: { metadata?: TypeSpecRecord };
}

export type ModifyThreadParameters = ModifyThreadBodyParam & RequestParameters;
export type DeleteThreadParameters = RequestParameters;

export interface CreateMessageBodyParam {
  body?: {
    role: string;
    content: string;
    file_ids?: string[];
    metadata?: TypeSpecRecord;
  };
}

export type CreateMessageParameters = CreateMessageBodyParam &
  RequestParameters;

export interface ListMessagesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListMessagesQueryParam {
  queryParameters?: ListMessagesQueryParamProperties;
}

export type ListMessagesParameters = ListMessagesQueryParam & RequestParameters;
export type RetrieveMessageParameters = RequestParameters;

export interface ModifyMessageBodyParam {
  body?: { metadata?: TypeSpecRecord };
}

export type ModifyMessageParameters = ModifyMessageBodyParam &
  RequestParameters;

export interface ListMessageFilesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListMessageFilesQueryParam {
  queryParameters?: ListMessageFilesQueryParamProperties;
}

export type ListMessageFilesParameters = ListMessageFilesQueryParam &
  RequestParameters;
export type RetrieveMessageFileParameters = RequestParameters;

export interface CreateRunBodyParam {
  body?: {
    assistant_id: assistant_id;
    model?: string;
    instructions?: string;
    tools?: Array<ToolDefinition>;
    metadata?: TypeSpecRecord;
  };
}

export type CreateRunParameters = CreateRunBodyParam & RequestParameters;

export interface ListRunsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListRunsQueryParam {
  queryParameters?: ListRunsQueryParamProperties;
}

export type ListRunsParameters = ListRunsQueryParam & RequestParameters;
export type RetrieveRunParameters = RequestParameters;

export interface ModifyRunBodyParam {
  body?: { metadata?: TypeSpecRecord };
}

export type ModifyRunParameters = ModifyRunBodyParam & RequestParameters;

export interface SubmitRunToolOutputsBodyParam {
  body?: { tool_outputs: Array<ToolOutput> };
}

export type SubmitRunToolOutputsParameters = SubmitRunToolOutputsBodyParam &
  RequestParameters;
export type CancelRunParameters = RequestParameters;

export interface CreateThreadAndRunBodyParam {
  body?: CreateAndRunThreadOptions;
}

export type CreateThreadAndRunParameters = CreateThreadAndRunBodyParam &
  RequestParameters;
export type RetrieveRunStepParameters = RequestParameters;

export interface ListRunStepsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: asc, desc
   */
  order?: string;
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
   * A value that, when provided, limits list results to files matching the corresponding purpose.
   *
   * Possible values: fine-tune, fine-tune-results, assistants, assistants_output
   */
  purpose?: string;
}

export interface ListFilesQueryParam {
  queryParameters?: ListFilesQueryParamProperties;
}

export type ListFilesParameters = ListFilesQueryParam & RequestParameters;

export interface UploadFileBodyParam {
  body?: { file: string; purpose: string; filename?: string };
}

export interface UploadFileMediaTypesParam {
  /** The 'content-type' header value, always 'multipart/format-data' for this operation. */
  contentType: "multipart/form-data";
}

export type UploadFileParameters = UploadFileMediaTypesParam &
  UploadFileBodyParam &
  RequestParameters;
export type DeleteFileParameters = RequestParameters;
export type RetrieveFileParameters = RequestParameters;
export type RetrieveFileContentParameters = RequestParameters;
