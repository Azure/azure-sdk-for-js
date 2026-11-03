// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext } from "../../api/eventGridManagementContext.js";
import { get } from "../../api/extensionTopics/operations.js";
import type { ExtensionTopicsGetOptionalParams } from "../../api/extensionTopics/options.js";
import type { ExtensionTopic } from "../../models/models.js";

/** Interface representing a ExtensionTopics operations. */
export interface ExtensionTopicsOperations {
  /** Get the properties of an extension topic. */
  get: (scope: string, options?: ExtensionTopicsGetOptionalParams) => Promise<ExtensionTopic>;
}

function _getExtensionTopics(context: EventGridManagementContext) {
  return {
    get: (scope: string, options?: ExtensionTopicsGetOptionalParams) =>
      get(context, scope, options),
  };
}

export function _getExtensionTopicsOperations(
  context: EventGridManagementContext,
): ExtensionTopicsOperations {
  return {
    ..._getExtensionTopics(context),
  };
}
