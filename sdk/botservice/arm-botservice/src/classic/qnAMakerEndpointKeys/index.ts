// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { get } from "../../api/qnAMakerEndpointKeys/operations.js";
import type { QnAMakerEndpointKeysGetOptionalParams } from "../../api/qnAMakerEndpointKeys/options.js";
import type {
  QnAMakerEndpointKeysRequestBody,
  QnAMakerEndpointKeysResponse,
} from "../../models/models.js";

/** Interface representing a QnAMakerEndpointKeys operations. */
export interface QnAMakerEndpointKeysOperations {
  /** Lists the QnA Maker endpoint keys */
  get: (
    parameters: QnAMakerEndpointKeysRequestBody,
    options?: QnAMakerEndpointKeysGetOptionalParams,
  ) => Promise<QnAMakerEndpointKeysResponse>;
}

function _getQnAMakerEndpointKeys(context: AzureBotServiceContext) {
  return {
    get: (
      parameters: QnAMakerEndpointKeysRequestBody,
      options?: QnAMakerEndpointKeysGetOptionalParams,
    ) => get(context, parameters, options),
  };
}

export function _getQnAMakerEndpointKeysOperations(
  context: AzureBotServiceContext,
): QnAMakerEndpointKeysOperations {
  return {
    ..._getQnAMakerEndpointKeys(context),
  };
}
