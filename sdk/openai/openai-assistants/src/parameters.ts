// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AssistantCreationOptions,
  AssistantModificationOptions,
  AssistantThreadCreationOptions,
  AssistantTool,
  AssistantThreadRunToolOutput,
  AssistantThreadCreateAndRunOptions,
} from "./models";

export interface CreateAssistantBodyParam {
  body?: AssistantCreationOptions;
}

export type CreateAssistantParameters = CreateAssistantBodyParam &
  RequestParameters;

export interface ListAssistantsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
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
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
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
  body?: { metadata?: Record<string, string> };
}

export type ModifyThreadParameters = ModifyThreadBodyParam & RequestParameters;
export type DeleteThreadParameters = RequestParameters;

export interface CreateThreadMessageBodyParam {
  body?: {
    role: string;
    content: string;
    file_ids?: string[];
    metadata?: Record<string, string>;
  };
}

export type CreateThreadMessageParameters = CreateThreadMessageBodyParam &
  RequestParameters;

export interface ListThreadMessagesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListThreadMessagesQueryParam {
  queryParameters?: ListThreadMessagesQueryParamProperties;
}

export type ListThreadMessagesParameters = ListThreadMessagesQueryParam &
  RequestParameters;
export type RetrieveThreadMessageParameters = RequestParameters;

export interface ModifyThreadMessageBodyParam {
  body?: { metadata?: Record<string, string> };
}

export type ModifyThreadMessageParameters = ModifyThreadMessageBodyParam &
  RequestParameters;

export interface ListThreadMessageFilesQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListThreadMessageFilesQueryParam {
  queryParameters?: ListThreadMessageFilesQueryParamProperties;
}

export type ListThreadMessageFilesParameters =
  ListThreadMessageFilesQueryParam & RequestParameters;
export type RetrieveThreadMessageFileParameters = RequestParameters;

export interface CreateRunBodyParam {
  body?: {
    assistant_id: assistant_id;
    model?: string;
    instructions?: string;
    tools?: Array<AssistantTool>;
    metadata?: Record<string, string>;
  };
}

export type CreateRunParameters = CreateRunBodyParam & RequestParameters;

export interface ListRunsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
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
  body?: { metadata?: Record<string, string> };
}

export type ModifyRunParameters = ModifyRunBodyParam & RequestParameters;

export interface SubmitRunToolOutputsBodyParam {
  body?: { tool_outputs: Array<AssistantThreadRunToolOutput> };
}

export type SubmitRunToolOutputsParameters = SubmitRunToolOutputsBodyParam &
  RequestParameters;
export type CancelRunParameters = RequestParameters;

export interface CreateThreadAndRunBodyParam {
  body?: AssistantThreadCreateAndRunOptions;
}

export type CreateThreadAndRunParameters = CreateThreadAndRunBodyParam &
  RequestParameters;
export type RetrieveRunStepParameters = RequestParameters;

export interface ListRunStepsQueryParamProperties {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
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
