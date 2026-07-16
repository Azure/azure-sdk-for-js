// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext } from "../../api/microsoftElasticContext.js";
import { createOrUpdate } from "../../api/externalUser/operations.js";
import type { ExternalUserCreateOrUpdateOptionalParams } from "../../api/externalUser/options.js";
import type { ExternalUserCreationResponse } from "../../models/models.js";

/** Interface representing a ExternalUser operations. */
export interface ExternalUserOperations {
  /** Create or update external user configurations for your Elastic monitor resource, enabling access and management by external users. */
  createOrUpdate: (
    resourceGroupName: string,
    monitorName: string,
    options?: ExternalUserCreateOrUpdateOptionalParams,
  ) => Promise<ExternalUserCreationResponse>;
}

function _getExternalUser(context: MicrosoftElasticContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      monitorName: string,
      options?: ExternalUserCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, monitorName, options),
  };
}

export function _getExternalUserOperations(
  context: MicrosoftElasticContext,
): ExternalUserOperations {
  return {
    ..._getExternalUser(context),
  };
}
