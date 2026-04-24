// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { $delete, createOrUpdate, get } from "../../api/application/operations.js";
import type {
  ApplicationDeleteOptionalParams,
  ApplicationCreateOrUpdateOptionalParams,
  ApplicationGetOptionalParams,
} from "../../api/application/options.js";
import type { ApplicationsAPIApplication } from "../../models/applicationsAPI/models.js";

/** Interface representing a Application operations. */
export interface ApplicationOperations {
  /** Delete an Application over a given scope */
  delete: (applicationId: string, options?: ApplicationDeleteOptionalParams) => Promise<void>;
  /** Creates or update a security application on the given subscription. */
  createOrUpdate: (
    applicationId: string,
    application: ApplicationsAPIApplication,
    options?: ApplicationCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationsAPIApplication>;
  /** Get a specific application for the requested scope by applicationId */
  get: (
    applicationId: string,
    options?: ApplicationGetOptionalParams,
  ) => Promise<ApplicationsAPIApplication>;
}

function _getApplication(context: SecurityCenterContext) {
  return {
    delete: (applicationId: string, options?: ApplicationDeleteOptionalParams) =>
      $delete(context, applicationId, options),
    createOrUpdate: (
      applicationId: string,
      application: ApplicationsAPIApplication,
      options?: ApplicationCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, applicationId, application, options),
    get: (applicationId: string, options?: ApplicationGetOptionalParams) =>
      get(context, applicationId, options),
  };
}

export function _getApplicationOperations(context: SecurityCenterContext): ApplicationOperations {
  return {
    ..._getApplication(context),
  };
}
