// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext } from "../../api/azureSiteRecoveryManagementServiceAPIContext.js";
import { EmailConfigurationModel } from "../../models/models.js";
import {
  EmailConfigurationListOptionalParams,
  EmailConfigurationCreateOptionalParams,
  EmailConfigurationGetOptionalParams,
} from "../../api/emailConfiguration/options.js";
import { list, create, get } from "../../api/emailConfiguration/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EmailConfiguration operations. */
export interface EmailConfigurationOperations {
  /** Gets the list of alert configuration settings for the given vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: EmailConfigurationListOptionalParams,
  ) => PagedAsyncIterableIterator<EmailConfigurationModel>;
  /** Creates an alert configuration setting for the given vault. */
  create: (
    resourceGroupName: string,
    vaultName: string,
    emailConfigurationName: string,
    resource: EmailConfigurationModel,
    options?: EmailConfigurationCreateOptionalParams,
  ) => Promise<EmailConfigurationModel>;
  /** Gets the details of the alert configuration setting. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    emailConfigurationName: string,
    options?: EmailConfigurationGetOptionalParams,
  ) => Promise<EmailConfigurationModel>;
}

function _getEmailConfiguration(context: AzureSiteRecoveryManagementServiceAPIContext) {
  return {
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: EmailConfigurationListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    create: (
      resourceGroupName: string,
      vaultName: string,
      emailConfigurationName: string,
      resource: EmailConfigurationModel,
      options?: EmailConfigurationCreateOptionalParams,
    ) => create(context, resourceGroupName, vaultName, emailConfigurationName, resource, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      emailConfigurationName: string,
      options?: EmailConfigurationGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, emailConfigurationName, options),
  };
}

export function _getEmailConfigurationOperations(
  context: AzureSiteRecoveryManagementServiceAPIContext,
): EmailConfigurationOperations {
  return {
    ..._getEmailConfiguration(context),
  };
}
