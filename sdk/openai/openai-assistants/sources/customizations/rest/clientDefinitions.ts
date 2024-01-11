// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Routes,
  ListFiles,
  DeleteFile,
  RetrieveFileContent
} from "../../generated/src/rest/index.js";
import { Client } from "@azure-rest/core-client";

export interface AzureRoutes {
  /** Resource for '/files' has methods for the following verbs: get, post */
  (path: "{azurePath}/files", azurePath: string): ListFiles;
  /** Resource for '/files/\{fileId\}' has methods for the following verbs: delete, get */
  (path: "{azurePath}/files/{fileId}", azurePath: string, fileId: string): DeleteFile;
  /** Resource for '/files/\{fileId\}/content' has methods for the following verbs: get */
  (path: "{azurePath}/files/{fileId}/content", azurePath: string, fileId: string): RetrieveFileContent;
}

export type CustomRoutes = Routes & AzureRoutes;

export type AssistantsContext = Client & {
  path: CustomRoutes;
  isAzure: boolean;
};
