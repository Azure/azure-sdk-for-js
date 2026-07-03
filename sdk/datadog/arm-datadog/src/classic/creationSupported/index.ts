// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext } from "../../api/microsoftDatadogContext.js";
import { get, list } from "../../api/creationSupported/operations.js";
import type {
  CreationSupportedGetOptionalParams,
  CreationSupportedListOptionalParams,
} from "../../api/creationSupported/options.js";
import type { CreateResourceSupportedResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CreationSupported operations. */
export interface CreationSupportedOperations {
  /** Informs if the current subscription is being already monitored for selected Datadog organization. */
  get: (
    datadogOrganizationId: string,
    options?: CreationSupportedGetOptionalParams,
  ) => Promise<CreateResourceSupportedResponse>;
  /** Informs if the current subscription is being already monitored for selected Datadog organization. */
  list: (
    datadogOrganizationId: string,
    options?: CreationSupportedListOptionalParams,
  ) => PagedAsyncIterableIterator<CreateResourceSupportedResponse>;
}

function _getCreationSupported(context: MicrosoftDatadogContext) {
  return {
    get: (datadogOrganizationId: string, options?: CreationSupportedGetOptionalParams) =>
      get(context, datadogOrganizationId, options),
    list: (datadogOrganizationId: string, options?: CreationSupportedListOptionalParams) =>
      list(context, datadogOrganizationId, options),
  };
}

export function _getCreationSupportedOperations(
  context: MicrosoftDatadogContext,
): CreationSupportedOperations {
  return {
    ..._getCreationSupported(context),
  };
}
