// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/credentialOperations/operations.js";
import type {
  CredentialOperationsListByAutomationAccountOptionalParams,
  CredentialOperationsDeleteOptionalParams,
  CredentialOperationsUpdateOptionalParams,
  CredentialOperationsCreateOrUpdateOptionalParams,
  CredentialOperationsGetOptionalParams,
} from "../../api/credentialOperations/options.js";
import type {
  Credential,
  CredentialCreateOrUpdateParameters,
  CredentialUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CredentialOperations operations. */
export interface CredentialOperationsOperations {
  /** Retrieve a list of credentials. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: CredentialOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Credential>;
  /** Delete the credential. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    options?: CredentialOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a credential. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    parameters: CredentialUpdateParameters,
    options?: CredentialOperationsUpdateOptionalParams,
  ) => Promise<Credential>;
  /** Create a credential. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    parameters: CredentialCreateOrUpdateParameters,
    options?: CredentialOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Credential>;
  /** Retrieve the credential identified by credential name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    options?: CredentialOperationsGetOptionalParams,
  ) => Promise<Credential>;
}

function _getCredentialOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: CredentialOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      options?: CredentialOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, credentialName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      parameters: CredentialUpdateParameters,
      options?: CredentialOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        credentialName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      parameters: CredentialCreateOrUpdateParameters,
      options?: CredentialOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        credentialName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      options?: CredentialOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, credentialName, options),
  };
}

export function _getCredentialOperationsOperations(
  context: AutomationContext,
): CredentialOperationsOperations {
  return {
    ..._getCredentialOperations(context),
  };
}
