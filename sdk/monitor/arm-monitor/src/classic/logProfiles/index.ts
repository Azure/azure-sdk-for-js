// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/logProfiles/operations.js";
import type {
  LogProfilesListOptionalParams,
  LogProfilesDeleteOptionalParams,
  LogProfilesUpdateOptionalParams,
  LogProfilesCreateOrUpdateOptionalParams,
  LogProfilesGetOptionalParams,
} from "../../api/logProfiles/options.js";
import type {
  MicrosoftLogProfilesLogProfileResource,
  MicrosoftLogProfilesLogProfileResourcePatch,
} from "../../models/microsoft/logProfiles/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a LogProfiles operations. */
export interface LogProfilesOperations {
  /** List the log profiles. */
  list: (
    options?: LogProfilesListOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftLogProfilesLogProfileResource>;
  /** Deletes the log profile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (logProfileName: string, options?: LogProfilesDeleteOptionalParams) => Promise<void>;
  /** Updates an existing LogProfilesResource. To update other fields use the CreateOrUpdate method. */
  update: (
    logProfileName: string,
    logProfilesResource: MicrosoftLogProfilesLogProfileResourcePatch,
    options?: LogProfilesUpdateOptionalParams,
  ) => Promise<MicrosoftLogProfilesLogProfileResource>;
  /** Create or update a log profile in Azure Monitoring REST API. */
  createOrUpdate: (
    logProfileName: string,
    parameters: MicrosoftLogProfilesLogProfileResource,
    options?: LogProfilesCreateOrUpdateOptionalParams,
  ) => Promise<MicrosoftLogProfilesLogProfileResource>;
  /** Gets the log profile. */
  get: (
    logProfileName: string,
    options?: LogProfilesGetOptionalParams,
  ) => Promise<MicrosoftLogProfilesLogProfileResource>;
}

function _getLogProfiles(context: MonitorContext) {
  return {
    list: (options?: LogProfilesListOptionalParams) => list(context, options),
    delete: (logProfileName: string, options?: LogProfilesDeleteOptionalParams) =>
      $delete(context, logProfileName, options),
    update: (
      logProfileName: string,
      logProfilesResource: MicrosoftLogProfilesLogProfileResourcePatch,
      options?: LogProfilesUpdateOptionalParams,
    ) => update(context, logProfileName, logProfilesResource, options),
    createOrUpdate: (
      logProfileName: string,
      parameters: MicrosoftLogProfilesLogProfileResource,
      options?: LogProfilesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, logProfileName, parameters, options),
    get: (logProfileName: string, options?: LogProfilesGetOptionalParams) =>
      get(context, logProfileName, options),
  };
}

export function _getLogProfilesOperations(context: MonitorContext): LogProfilesOperations {
  return {
    ..._getLogProfiles(context),
  };
}
