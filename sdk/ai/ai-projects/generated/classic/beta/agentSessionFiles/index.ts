// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { $delete, list, download, upload } from "../../../api/beta/agentSessionFiles/operations.js";
import {
  BetaAgentSessionFilesDeleteOptionalParams,
  BetaAgentSessionFilesListOptionalParams,
  BetaAgentSessionFilesDownloadOptionalParams,
  BetaAgentSessionFilesUploadOptionalParams,
} from "../../../api/beta/agentSessionFiles/options.js";
import {
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  BetaAgentSessionFilesDownloadResponse,
} from "../../../models/models.js";

/** Interface representing a BetaAgentSessionFiles operations. */
export interface BetaAgentSessionFilesOperations {
  /**
   * Delete a file or directory from the session sandbox.
   * If `recursive` is false (default) and the target is a non-empty directory, the API returns 409 Conflict.
   */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentSessionFilesDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * List files and directories at a given path in the session sandbox.
   * Returns only the immediate children of the specified directory (non-recursive).
   */
  list: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentSessionFilesListOptionalParams,
  ) => Promise<SessionDirectoryListResponse>;
  /** Download a file from the session sandbox as a binary stream. */
  download: (
    agentName: string,
    sessionId: string,
    path: string,
    options?: BetaAgentSessionFilesDownloadOptionalParams,
  ) => Promise<BetaAgentSessionFilesDownloadResponse>;
  /**
   * Upload a file to the session sandbox via binary stream.
   * Maximum file size is 50 MB. Uploads exceeding this limit return 413 Payload Too Large.
   */
  upload: (
    agentName: string,
    sessionId: string,
    path: string,
    content: Uint8Array,
    options?: BetaAgentSessionFilesUploadOptionalParams,
  ) => Promise<SessionFileWriteResponse>;
}

function _getBetaAgentSessionFiles(context: AIProjectContext) {
  return {
    delete: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentSessionFilesDeleteOptionalParams,
    ) => $delete(context, agentName, sessionId, path, options),
    list: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentSessionFilesListOptionalParams,
    ) => list(context, agentName, sessionId, path, options),
    download: (
      agentName: string,
      sessionId: string,
      path: string,
      options?: BetaAgentSessionFilesDownloadOptionalParams,
    ) => download(context, agentName, sessionId, path, options),
    upload: (
      agentName: string,
      sessionId: string,
      path: string,
      content: Uint8Array,
      options?: BetaAgentSessionFilesUploadOptionalParams,
    ) => upload(context, agentName, sessionId, path, content, options),
  };
}

export function _getBetaAgentSessionFilesOperations(
  context: AIProjectContext,
): BetaAgentSessionFilesOperations {
  return {
    ..._getBetaAgentSessionFiles(context),
  };
}
