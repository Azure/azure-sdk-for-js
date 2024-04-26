// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { OperationOptions } from "@azure-rest/core-client";
import { ListSortOrder, FilePurpose } from "./models.js";

/** The details used to create an assistant. */
export interface CreateAssistantOptions extends OperationOptions {}

/** The details used to list assistants. */
export interface ListAssistantsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to get an assistant. */
export interface GetAssistantOptions extends OperationOptions {}

/** The details used to update an assistant. */
export interface UpdateAssistantRequestOptions extends OperationOptions {}

/** The details used to delete an assistant. */
export interface DeleteAssistantOptions extends OperationOptions {}

/** The details used to create an assistant file. */
export interface CreateAssistantFileOptions extends OperationOptions {}

/** The details used to list assistant files. */
export interface ListAssistantFilesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to get an assistant file. */
export interface GetAssistantFileOptions extends OperationOptions {}

/** The details used to delete an assistant file. */
export interface DeleteAssistantFileOptions extends OperationOptions {}

/** The details used to create a thread. */
export interface CreateThreadOptions extends OperationOptions {}

/** The details used to get a thread. */
export interface GetThreadOptions extends OperationOptions {}

/** The details used to update a thread. */
export interface UpdateThreadOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

/** The details used to delete a thread. */
export interface DeleteThreadOptions extends OperationOptions {}

/** The details used to create a message. */
export interface CreateMessageOptions extends OperationOptions {
  /** A list of up to 10 file IDs to associate with the message, as used by tools like 'code_interpreter' or 'retrieval' that can read files. */
  fileIds?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

/** The details used to list messages. */
export interface ListMessagesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to get a message. */
export interface GetMessageOptions extends OperationOptions {}

/** The details used to update a message. */
export interface UpdateMessageOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

/** The details used to list message files. */
export interface ListMessageFilesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to get a message file. */
export interface GetMessageFileOptions extends OperationOptions {}

/** The details used to create a run request. */
export interface CreateRunRequestOptions extends OperationOptions {}

/** The details used to list runs. */
export interface ListRunsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to get a run. */
export interface GetRunOptions extends OperationOptions {}

/** The details used to update a run. */
export interface UpdateRunOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

/** The details used to submit tool outputs to a run. */
export interface SubmitToolOutputsToRunOptions extends OperationOptions {}

/** The details used to cancel a run. */
export interface CancelRunOptions extends OperationOptions {}

/** The details used to create and run a thread. */
export interface CreateThreadAndRunOptions extends OperationOptions {}

/** The details used to get a run step. */
export interface GetRunStepOptions extends OperationOptions {}

/** The details used to list run steps. */
export interface ListRunStepsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

/** The details used to list files. */
export interface ListFilesOptions extends OperationOptions {
  /** A value that, when provided, limits list results to files matching the corresponding purpose. */
  purpose?: FilePurpose;
}

/** The details used to upload files. */
export interface UploadFileOptions extends OperationOptions {
  /** The 'content-type' header value, always 'multipart/format-data' for this operation. */
  contentType?: string;
  /** A filename to associate with the uploaded data. */
  filename?: string;
}

/** The details used to delete files. */
export interface DeleteFileOptions extends OperationOptions {}

/** The details used to get files. */
export interface GetFileOptions extends OperationOptions {}
