// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import { ListSortOrder, ToolDefinition, FilePurpose } from "./models.js";

export interface AssistantsCreateAssistantOptions extends OperationOptions {}

export interface AssistantsListAssistantsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface AssistantsRetrieveAssistantOptions extends OperationOptions {}

export interface AssistantsModifyAssistantOptions extends OperationOptions {}

export interface AssistantsDeleteAssistantOptions extends OperationOptions {}

export interface AssistantsCreateAssistantFileOptions
  extends OperationOptions {}

export interface AssistantsListAssistantFilesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface AssistantsRetrieveAssistantFileOptions
  extends OperationOptions {}

export interface AssistantsDeleteAssistantFileOptions
  extends OperationOptions {}

export interface AssistantThreadsCreateThreadOptions extends OperationOptions {}

export interface AssistantThreadsRetrieveThreadOptions
  extends OperationOptions {}

export interface AssistantThreadsModifyThreadOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

export interface AssistantThreadsDeleteThreadOptions extends OperationOptions {}

export interface ThreadMessagesCreateMessageOptions extends OperationOptions {
  /** A list of up to 10 file IDs to associate with the message, as used by tools like 'code_interpreter' or 'retrieval' that can read files. */
  fileIds?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

export interface ThreadMessagesListMessagesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ThreadMessagesRetrieveMessageOptions
  extends OperationOptions {}

export interface ThreadMessagesModifyMessageOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

export interface ThreadMessagesListMessageFilesOptions
  extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ThreadMessagesRetrieveMessageFileOptions
  extends OperationOptions {}

export interface ThreadRunsCreateRunOptions extends OperationOptions {
  /** The overriden model name that the assistant should use to run the thread. */
  model?: string;
  /** The overridden system instructions that the assistant should use to run the thread. */
  instructions?: string;
  /** The overridden list of enabled tools that the assistant should use to run the thread. */
  tools?: ToolDefinition[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

export interface ThreadRunsListRunsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ThreadRunsRetrieveRunOptions extends OperationOptions {}

export interface ThreadRunsModifyRunOptions extends OperationOptions {
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string>;
}

export interface ThreadRunsSubmitRunToolOutputsOptions
  extends OperationOptions {}

export interface ThreadRunsCancelRunOptions extends OperationOptions {}

export interface ThreadRunsCreateThreadAndRunOptions extends OperationOptions {}

export interface RunStepsRetrieveRunStepOptions extends OperationOptions {}

export interface RunStepsListRunStepsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: ListSortOrder;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface FilesListFilesOptions extends OperationOptions {
  /** A value that, when provided, limits list results to files matching the corresponding purpose. */
  purpose?: FilePurpose;
}

export interface FilesUploadFileOptions extends OperationOptions {
  /** The 'content-type' header value, always 'multipart/format-data' for this operation. */
  contentType?: string;
  /** A filename to associate with the uploaded data. */
  filename?: string;
}

export interface FilesDeleteFileOptions extends OperationOptions {}

export interface FilesRetrieveFileOptions extends OperationOptions {}

export interface FilesRetrieveFileContentOptions extends OperationOptions {}
