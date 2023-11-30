// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import { ToolDefinition, FilePurpose } from "./models.js";

export interface AssistantsCreateAssistantOptions extends OperationOptions {}

export interface AssistantsListAssistantsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
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
  order?: string;
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
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface AssistantThreadsDeleteThreadOptions extends OperationOptions {}

export interface AssistantMessagesCreateMessageOptions
  extends OperationOptions {
  /** A list of File IDs that the message should use. There can be a maximum of 10 files attached to a message. Useful for tools like retrieval and code_interpreter that can access and use files. */
  fileIds?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface AssistantMessagesListMessagesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface AssistantMessagesRetrieveMessageOptions
  extends OperationOptions {}

export interface AssistantMessagesModifyMessageOptions
  extends OperationOptions {
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface AssistantMessagesListMessageFilesOptions
  extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface AssistantMessagesRetrieveMessageFileOptions
  extends OperationOptions {}

export interface AssistantRunsCreateRunOptions extends OperationOptions {
  /** The overridden model that the assistant should use to run the thread. */
  model?: string;
  /** The overridden system instructions the assistant should use to run the thread. */
  instructions?: string;
  /** The overriden list of enabled tools the assistant should use to run the thread. */
  tools?: ToolDefinition[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface AssistantRunsListRunsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface AssistantRunsRetrieveRunOptions extends OperationOptions {}

export interface AssistantRunsModifyRunOptions extends OperationOptions {
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface AssistantRunsSubmitRunToolOutputsOptions
  extends OperationOptions {}

export interface AssistantRunsCancelRunOptions extends OperationOptions {}

export interface AssistantRunsCreateThreadAndRunOptions
  extends OperationOptions {}

export interface RunStepsRetrieveRunStepOptions extends OperationOptions {}

export interface RunStepsListRunStepsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface FilesListFilesOptions extends OperationOptions {
  /** Limits files in the response to those with the specified purpose. */
  purpose?: FilePurpose;
}

export interface FilesUploadFileOptions extends OperationOptions {
  /** The content-type header for this multipart request. */
  contentType?: string;
  /** The filename to associate with the uploaded data. */
  filename?: string;
}

export interface FilesDeleteFileOptions extends OperationOptions {}

export interface FilesRetrieveFileOptions extends OperationOptions {}

export interface FilesRetrieveFileContentOptions extends OperationOptions {}
