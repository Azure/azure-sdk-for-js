// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import { ToolDefinition, FilePurpose } from "./models.js";

export interface CreateAssistantOptions extends OperationOptions {}

export interface ListAssistantsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface RetrieveAssistantOptions extends OperationOptions {}

export interface ModifyAssistantOptions extends OperationOptions {}

export interface DeleteAssistantOptions extends OperationOptions {}

export interface CreateAssistantFileOptions extends OperationOptions {}

export interface ListAssistantFilesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface RetrieveAssistantFileOptions extends OperationOptions {}

export interface DeleteAssistantFileOptions extends OperationOptions {}

export interface CreateThreadOptions extends OperationOptions {}

export interface RetrieveThreadOptions extends OperationOptions {}

export interface ModifyThreadOptions extends OperationOptions {
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface DeleteThreadOptions extends OperationOptions {}

export interface CreateMessageOptions extends OperationOptions {
  /** A list of File IDs that the message should use. There can be a maximum of 10 files attached to a message. Useful for tools like retrieval and code_interpreter that can access and use files. */
  fileIds?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface ListMessagesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface RetrieveMessageOptions extends OperationOptions {}

export interface ModifyMessageOptions extends OperationOptions {
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface ListMessageFilesOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface RetrieveMessageFileOptions extends OperationOptions {}

export interface CreateRunOptions extends OperationOptions {
  /** The overridden model that the assistant should use to run the thread. */
  model?: string;
  /** The overridden system instructions the assistant should use to run the thread. */
  instructions?: string;
  /** The overriden list of enabled tools the assistant should use to run the thread. */
  tools?: ToolDefinition[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface ListRunsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface RetrieveRunOptions extends OperationOptions {}

export interface ModifyRunOptions extends OperationOptions {
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

export interface SubmitRunToolOutputsOptions extends OperationOptions {}

export interface CancelRunOptions extends OperationOptions {}

export interface CreateThreadAndRunOptions extends OperationOptions {}

export interface RetrieveRunStepOptions extends OperationOptions {}

export interface ListRunStepsOptions extends OperationOptions {
  /** A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20. */
  limit?: number;
  /** Sort order by the created_at timestamp of the objects. asc for ascending order and desc for descending order. */
  order?: string;
  /** A cursor for use in pagination. after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list. */
  after?: string;
  /** A cursor for use in pagination. before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list. */
  before?: string;
}

export interface ListFilesOptions extends OperationOptions {
  /** Limits files in the response to those with the specified purpose. */
  purpose?: FilePurpose;
}

export interface UploadFileOptions extends OperationOptions {
  /** The content-type header for this multipart request. */
  contentType?: string;
  /** The filename to associate with the uploaded data. */
  filename?: string;
}

export interface DeleteFileOptions extends OperationOptions {}

export interface RetrieveFileOptions extends OperationOptions {}

export interface RetrieveFileContentOptions extends OperationOptions {}
