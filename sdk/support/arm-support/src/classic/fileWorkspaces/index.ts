// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { create, get } from "../../api/fileWorkspaces/operations.js";
import {
  FileWorkspacesCreateOptionalParams,
  FileWorkspacesGetOptionalParams,
} from "../../api/fileWorkspaces/options.js";
import { FileWorkspaceDetails } from "../../models/models.js";

/** Interface representing a FileWorkspaces operations. */
export interface FileWorkspacesOperations {
  /** Creates a new file workspace for the specified subscription. */
  create: (
    fileWorkspaceName: string,
    options?: FileWorkspacesCreateOptionalParams,
  ) => Promise<FileWorkspaceDetails>;
  /** Gets details for a specific file workspace in an Azure subscription. */
  get: (
    fileWorkspaceName: string,
    options?: FileWorkspacesGetOptionalParams,
  ) => Promise<FileWorkspaceDetails>;
}

function _getFileWorkspaces(context: MicrosoftSupportContext) {
  return {
    create: (fileWorkspaceName: string, options?: FileWorkspacesCreateOptionalParams) =>
      create(context, fileWorkspaceName, options),
    get: (fileWorkspaceName: string, options?: FileWorkspacesGetOptionalParams) =>
      get(context, fileWorkspaceName, options),
  };
}

export function _getFileWorkspacesOperations(
  context: MicrosoftSupportContext,
): FileWorkspacesOperations {
  return {
    ..._getFileWorkspaces(context),
  };
}
