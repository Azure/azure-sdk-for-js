// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import { $delete, createOrUpdate, get } from "../../api/securityConnectorApplication/operations.js";
import type {
  SecurityConnectorApplicationDeleteOptionalParams,
  SecurityConnectorApplicationCreateOrUpdateOptionalParams,
  SecurityConnectorApplicationGetOptionalParams,
} from "../../api/securityConnectorApplication/options.js";
import type { ApplicationsAPIApplication } from "../../models/applicationsAPI/models.js";

/** Interface representing a SecurityConnectorApplication operations. */
export interface SecurityConnectorApplicationOperations {
  /** Delete an Application over a given scope */
  delete: (
    resourceGroupName: string,
    securityConnectorName: string,
    applicationId: string,
    options?: SecurityConnectorApplicationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or update a security Application on the given security connector. */
  createOrUpdate: (
    resourceGroupName: string,
    securityConnectorName: string,
    applicationId: string,
    application: ApplicationsAPIApplication,
    options?: SecurityConnectorApplicationCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationsAPIApplication>;
  /** Get a specific application for the requested scope by applicationId */
  get: (
    resourceGroupName: string,
    securityConnectorName: string,
    applicationId: string,
    options?: SecurityConnectorApplicationGetOptionalParams,
  ) => Promise<ApplicationsAPIApplication>;
}

function _getSecurityConnectorApplication(context: SecurityCenterContext) {
  return {
    delete: (
      resourceGroupName: string,
      securityConnectorName: string,
      applicationId: string,
      options?: SecurityConnectorApplicationDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, securityConnectorName, applicationId, options),
    createOrUpdate: (
      resourceGroupName: string,
      securityConnectorName: string,
      applicationId: string,
      application: ApplicationsAPIApplication,
      options?: SecurityConnectorApplicationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        securityConnectorName,
        applicationId,
        application,
        options,
      ),
    get: (
      resourceGroupName: string,
      securityConnectorName: string,
      applicationId: string,
      options?: SecurityConnectorApplicationGetOptionalParams,
    ) => get(context, resourceGroupName, securityConnectorName, applicationId, options),
  };
}

export function _getSecurityConnectorApplicationOperations(
  context: SecurityCenterContext,
): SecurityConnectorApplicationOperations {
  return {
    ..._getSecurityConnectorApplication(context),
  };
}
