// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessagingConnectorsContext } from "../../api/messagingConnectorsContext.js";
import { preview } from "../../api/dataPreviewOperations/operations.js";
import { DataPreviewOperationsPreviewOptionalParams } from "../../api/dataPreviewOperations/options.js";
import {
  DataPreviewRequest,
  DataPreviewResults,
} from "../../models/azure/mgmt/placeholder/models.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataPreviewOperations operations. */
export interface DataPreviewOperationsOperations {
  /** create one dataPreview task */
  preview: (
    location: string,
    body: DataPreviewRequest,
    options?: DataPreviewOperationsPreviewOptionalParams,
  ) => PollerLike<OperationState<DataPreviewResults>, DataPreviewResults>;
}

function _getDataPreviewOperations(context: MessagingConnectorsContext) {
  return {
    preview: (
      location: string,
      body: DataPreviewRequest,
      options?: DataPreviewOperationsPreviewOptionalParams,
    ) => preview(context, location, body, options),
  };
}

export function _getDataPreviewOperationsOperations(
  context: MessagingConnectorsContext,
): DataPreviewOperationsOperations {
  return {
    ..._getDataPreviewOperations(context),
  };
}
