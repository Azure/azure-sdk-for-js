// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, create, get } from "../../api/fileImports/operations.js";
import type {
  FileImportsListOptionalParams,
  FileImportsDeleteOptionalParams,
  FileImportsCreateOptionalParams,
  FileImportsGetOptionalParams,
} from "../../api/fileImports/options.js";
import type { FileImport } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FileImports operations. */
export interface FileImportsOperations {
  /** Gets all file imports. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: FileImportsListOptionalParams,
  ) => PagedAsyncIterableIterator<FileImport>;
  /** Delete the file import. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    fileImportId: string,
    options?: FileImportsDeleteOptionalParams,
  ) => PollerLike<OperationState<FileImport>, FileImport>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    fileImportId: string,
    options?: FileImportsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<FileImport>, FileImport>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    fileImportId: string,
    options?: FileImportsDeleteOptionalParams,
  ) => Promise<FileImport>;
  /** Creates the file import. */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    fileImportId: string,
    fileImport: FileImport,
    options?: FileImportsCreateOptionalParams,
  ) => Promise<FileImport>;
  /** Gets a file import. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    fileImportId: string,
    options?: FileImportsGetOptionalParams,
  ) => Promise<FileImport>;
}

function _getFileImports(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: FileImportsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      fileImportId: string,
      options?: FileImportsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, fileImportId, options),
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      fileImportId: string,
      options?: FileImportsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, fileImportId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      fileImportId: string,
      options?: FileImportsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, fileImportId, options);
    },
    create: (
      resourceGroupName: string,
      workspaceName: string,
      fileImportId: string,
      fileImport: FileImport,
      options?: FileImportsCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, fileImportId, fileImport, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      fileImportId: string,
      options?: FileImportsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, fileImportId, options),
  };
}

export function _getFileImportsOperations(context: SecurityInsightsContext): FileImportsOperations {
  return {
    ..._getFileImports(context),
  };
}
