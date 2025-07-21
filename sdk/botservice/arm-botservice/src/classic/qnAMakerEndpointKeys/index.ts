// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext } from "../../api/botServiceContext.js";
import {
  QnAMakerEndpointKeysRequestBody,
  QnAMakerEndpointKeysResponse,
} from "../../models/models.js";
import { QnAMakerEndpointKeysGetOptionalParams } from "../../api/qnAMakerEndpointKeys/options.js";
import { get } from "../../api/qnAMakerEndpointKeys/operations.js";

/** Interface representing a QnAMakerEndpointKeys operations. */
export interface QnAMakerEndpointKeysOperations {
  /** Lists the QnA Maker endpoint keys */
  get: (
    parameters: QnAMakerEndpointKeysRequestBody,
    options?: QnAMakerEndpointKeysGetOptionalParams,
  ) => Promise<QnAMakerEndpointKeysResponse>;
}

function _getQnAMakerEndpointKeys(context: BotServiceContext) {
  return {
    get: (
      parameters: QnAMakerEndpointKeysRequestBody,
      options?: QnAMakerEndpointKeysGetOptionalParams,
    ) => get(context, parameters, options),
  };
}

export function _getQnAMakerEndpointKeysOperations(
  context: BotServiceContext,
): QnAMakerEndpointKeysOperations {
  return {
    ..._getQnAMakerEndpointKeys(context),
  };
}
