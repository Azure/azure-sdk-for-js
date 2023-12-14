// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { AssistantsContext } from "../../api/AssistantsContext.js";
import {
  createAssistant,
  createAssistantFile,
  deleteAssistant,
  deleteAssistantFile,
  listAssistantFiles,
  listAssistants,
  modifyAssistant,
  retrieveAssistant,
  retrieveAssistantFile,
} from "../../api/assistants/index.js";
import {
  Assistant,
  AssistantCreationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
  AssistantModificationOptions,
  ListResponseOf,
} from "../../models/models.js";
import {
  AssistantsCreateAssistantFileOptions,
  AssistantsCreateAssistantOptions,
  AssistantsDeleteAssistantFileOptions,
  AssistantsDeleteAssistantOptions,
  AssistantsListAssistantFilesOptions,
  AssistantsListAssistantsOptions,
  AssistantsModifyAssistantOptions,
  AssistantsRetrieveAssistantFileOptions,
  AssistantsRetrieveAssistantOptions,
} from "../../models/options.js";

export interface AssistantsOperations {
  createAssistant: (
    body: AssistantCreationOptions,
    options?: AssistantsCreateAssistantOptions
  ) => Promise<Assistant>;
  listAssistants: (options?: AssistantsListAssistantsOptions) => Promise<ListResponseOf<Assistant>>;
  retrieveAssistant: (
    assistantId: string,
    options?: AssistantsRetrieveAssistantOptions
  ) => Promise<Assistant>;
  modifyAssistant: (
    assistantId: string,
    modificationOptions: AssistantModificationOptions,
    options?: AssistantsModifyAssistantOptions
  ) => Promise<Assistant>;
  deleteAssistant: (
    assistantId: string,
    options?: AssistantsDeleteAssistantOptions
  ) => Promise<AssistantDeletionStatus>;
  createAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsCreateAssistantFileOptions
  ) => Promise<AssistantFile>;
  listAssistantFiles: (
    assistantId: string,
    options?: AssistantsListAssistantFilesOptions
  ) => Promise<ListResponseOf<AssistantFile>>;
  retrieveAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsRetrieveAssistantFileOptions
  ) => Promise<AssistantFile>;
  deleteAssistantFile: (
    assistantId: string,
    fileId: string,
    options?: AssistantsDeleteAssistantFileOptions
  ) => Promise<AssistantFileDeletionStatus>;
}

export function getAssistants(context: AssistantsContext) {
  return {
    createAssistant: (body: AssistantCreationOptions, options?: AssistantsCreateAssistantOptions) =>
      createAssistant(context, body, options),
    listAssistants: (options?: AssistantsListAssistantsOptions) => listAssistants(context, options),
    retrieveAssistant: (assistantId: string, options?: AssistantsRetrieveAssistantOptions) =>
      retrieveAssistant(context, assistantId, options),
    modifyAssistant: (
      assistantId: string,
      modificationOptions: AssistantModificationOptions,
      options?: AssistantsModifyAssistantOptions
    ) => modifyAssistant(context, assistantId, modificationOptions, options),
    deleteAssistant: (assistantId: string, options?: AssistantsDeleteAssistantOptions) =>
      deleteAssistant(context, assistantId, options),
    createAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsCreateAssistantFileOptions
    ) => createAssistantFile(context, assistantId, fileId, options),
    listAssistantFiles: (assistantId: string, options?: AssistantsListAssistantFilesOptions) =>
      listAssistantFiles(context, assistantId, options),
    retrieveAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsRetrieveAssistantFileOptions
    ) => retrieveAssistantFile(context, assistantId, fileId, options),
    deleteAssistantFile: (
      assistantId: string,
      fileId: string,
      options?: AssistantsDeleteAssistantFileOptions
    ) => deleteAssistantFile(context, assistantId, fileId, options),
  };
}

export function getAssistantsOperations(context: AssistantsContext): AssistantsOperations {
  return {
    ...getAssistants(context),
  };
}
