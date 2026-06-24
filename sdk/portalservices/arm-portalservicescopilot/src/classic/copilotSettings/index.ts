// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PortalServicesContext } from "../../api/portalServicesContext.js";
import { $delete, update, createOrUpdate, get } from "../../api/copilotSettings/operations.js";
import {
  CopilotSettingsDeleteOptionalParams,
  CopilotSettingsUpdateOptionalParams,
  CopilotSettingsCreateOrUpdateOptionalParams,
  CopilotSettingsGetOptionalParams,
} from "../../api/copilotSettings/options.js";
import { CopilotSettingsResource, CopilotSettingsResourceUpdate } from "../../models/models.js";

/** Interface representing a CopilotSettings operations. */
export interface CopilotSettingsOperations {
  /** Delete a CopilotSettingsResource */
  delete: (options?: CopilotSettingsDeleteOptionalParams) => Promise<void>;
  /** Update a CopilotSettingsResource */
  update: (
    properties: CopilotSettingsResourceUpdate,
    options?: CopilotSettingsUpdateOptionalParams,
  ) => Promise<CopilotSettingsResource>;
  /** Create a CopilotSettingsResource */
  createOrUpdate: (
    resource: CopilotSettingsResource,
    options?: CopilotSettingsCreateOrUpdateOptionalParams,
  ) => Promise<CopilotSettingsResource>;
  /** Get a CopilotSettingsResource */
  get: (options?: CopilotSettingsGetOptionalParams) => Promise<CopilotSettingsResource>;
}

function _getCopilotSettings(context: PortalServicesContext) {
  return {
    delete: (options?: CopilotSettingsDeleteOptionalParams) => $delete(context, options),
    update: (
      properties: CopilotSettingsResourceUpdate,
      options?: CopilotSettingsUpdateOptionalParams,
    ) => update(context, properties, options),
    createOrUpdate: (
      resource: CopilotSettingsResource,
      options?: CopilotSettingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resource, options),
    get: (options?: CopilotSettingsGetOptionalParams) => get(context, options),
  };
}

export function _getCopilotSettingsOperations(
  context: PortalServicesContext,
): CopilotSettingsOperations {
  return {
    ..._getCopilotSettings(context),
  };
}
