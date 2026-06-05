// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { create, get } from "../../api/fileWorkspacesNoSubscription/operations.js";
import {
  FileWorkspacesNoSubscriptionCreateOptionalParams,
  FileWorkspacesNoSubscriptionGetOptionalParams,
} from "../../api/fileWorkspacesNoSubscription/options.js";
import { FileWorkspaceDetails } from "../../models/models.js";

/** Interface representing a FileWorkspacesNoSubscription operations. */
export interface FileWorkspacesNoSubscriptionOperations {
  /** Creates a new file workspace. */
  create: (
    fileWorkspaceName: string,
    options?: FileWorkspacesNoSubscriptionCreateOptionalParams,
  ) => Promise<FileWorkspaceDetails>;
  /** Gets details for a specific file workspace. */
  get: (
    fileWorkspaceName: string,
    options?: FileWorkspacesNoSubscriptionGetOptionalParams,
  ) => Promise<FileWorkspaceDetails>;
}

function _getFileWorkspacesNoSubscription(context: MicrosoftSupportContext) {
  return {
    create: (
      fileWorkspaceName: string,
      options?: FileWorkspacesNoSubscriptionCreateOptionalParams,
    ) => create(context, fileWorkspaceName, options),
    get: (fileWorkspaceName: string, options?: FileWorkspacesNoSubscriptionGetOptionalParams) =>
      get(context, fileWorkspaceName, options),
  };
}

export function _getFileWorkspacesNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): FileWorkspacesNoSubscriptionOperations {
  return {
    ..._getFileWorkspacesNoSubscription(context),
  };
}
