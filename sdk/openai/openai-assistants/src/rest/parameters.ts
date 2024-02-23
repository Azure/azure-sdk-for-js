// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { RequestParameters } from "@azure-rest/core-client";
import {
  AssistantCreationOptions,
  AssistantThreadCreationOptions,
  CreateAndRunThreadOptions,
  ToolDefinition,
  ToolOutput,
  TypeSpecRecord,
  UpdateAssistantOptions,
} from "./models.js";

export interface CreateAssistantBodyParam {
  body?: AssistantCreationOptions;
}

export interface ListAssistantsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface UpdateAssistantBodyParam {
  body?: UpdateAssistantOptions;
}

export interface CreateAssistantFileBodyParam {
  body?: { file_id: string };
}

export interface ListAssistantFilesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface CreateThreadBodyParam {
  body?: AssistantThreadCreationOptions;
}

export interface UpdateThreadBodyParam {
  body?: { metadata?: TypeSpecRecord | null };
}

export interface CreateMessageBodyParam {
  body?: {
    role: string;
    content: string;
    file_ids?: string[];
    metadata?: TypeSpecRecord | null;
  };
}

export interface ListMessagesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface UpdateMessageBodyParam {
  body?: { metadata?: TypeSpecRecord | null };
}

export interface ListMessageFilesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface CreateRunBodyParam {
  body?: {
    assistant_id: string;
    model?: string | null;
    instructions?: string | null;
    additional_instructions?: string | null;
    tools?: Array<ToolDefinition> | null;
    metadata?: Record<string, string> | null;
  };
}

export interface ListRunsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface UpdateRunBodyParam {
  body?: { metadata?: TypeSpecRecord | null };
}

export interface SubmitToolOutputsToRunBodyParam {
  body?: { tool_outputs: Array<ToolOutput> };
}

export interface CreateThreadAndRunBodyParam {
  body?: CreateAndRunThreadOptions;
}

export interface ListRunStepsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /**
   * Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order.
   *
   * Possible values: "asc", "desc"
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

export interface ListFilesQueryParamProperties {
  /**
   * A value that, when provided, limits list results to files matching the corresponding purpose.
   *
   * Possible values: "fine-tune", "fine-tune-results", "assistants", "assistants_output"
   */
  purpose?: string;
}

export interface ListFilesQueryParam {
  queryParameters?: ListFilesQueryParamProperties;
}

export interface UploadFileBodyParam {
  body?: { file: File; purpose: string; filename?: string };
}

export interface UploadFileMediaTypesParam {
  /** The 'content-type' header value, always 'multipart/format-data' for this operation. */
  contentType: "multipart/form-data";
}

export type CreateAssistantParameters = CreateAssistantBodyParam & RequestParameters;
export type ListAssistantsParameters = ListAssistantsQueryParam & RequestParameters;
export type GetAssistantParameters = RequestParameters;
export type UpdateAssistantParameters = UpdateAssistantBodyParam & RequestParameters;
export type DeleteAssistantParameters = RequestParameters;
export type CreateAssistantFileParameters = CreateAssistantFileBodyParam & RequestParameters;
export type ListAssistantFilesParameters = ListAssistantFilesQueryParam & RequestParameters;
export type GetAssistantFileParameters = RequestParameters;
export type DeleteAssistantFileParameters = RequestParameters;
export type CreateThreadParameters = CreateThreadBodyParam & RequestParameters;
export type GetThreadParameters = RequestParameters;
export type UpdateThreadParameters = UpdateThreadBodyParam & RequestParameters;
export type DeleteThreadParameters = RequestParameters;
export type CreateMessageParameters = CreateMessageBodyParam & RequestParameters;
export type ListMessagesParameters = ListMessagesQueryParam & RequestParameters;
export type GetMessageParameters = RequestParameters;
export type UpdateMessageParameters = UpdateMessageBodyParam & RequestParameters;
export type ListMessageFilesParameters = ListMessageFilesQueryParam & RequestParameters;
export type GetMessageFileParameters = RequestParameters;
export type CreateRunParameters = CreateRunBodyParam & RequestParameters;
export type ListRunsParameters = ListRunsQueryParam & RequestParameters;
export type GetRunParameters = RequestParameters;
export type UpdateRunParameters = UpdateRunBodyParam & RequestParameters;
export type SubmitToolOutputsToRunParameters = SubmitToolOutputsToRunBodyParam & RequestParameters;
export type CancelRunParameters = RequestParameters;
export type CreateThreadAndRunParameters = CreateThreadAndRunBodyParam & RequestParameters;
export type GetRunStepParameters = RequestParameters;
export type ListRunStepsParameters = ListRunStepsQueryParam & RequestParameters;
export type ListFilesParameters = ListFilesQueryParam & RequestParameters;
export type UploadFileParameters = UploadFileMediaTypesParam &
  UploadFileBodyParam &
  RequestParameters;
export type DeleteFileParameters = RequestParameters;
export type GetFileParameters = RequestParameters;
