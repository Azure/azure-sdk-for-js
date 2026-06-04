// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/credential/operations.js";
import type {
  CredentialListByAutomationAccountOptionalParams,
  CredentialDeleteOptionalParams,
  CredentialUpdateOptionalParams,
  CredentialCreateOrUpdateOptionalParams,
  CredentialGetOptionalParams,
} from "../../api/credential/options.js";
import type {
  Credential,
  CredentialCreateOrUpdateParameters,
  CredentialUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Credential operations. */
export interface CredentialOperations {
  /** Retrieve a list of credentials. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: CredentialListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Credential>;
  /** Delete the credential. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    options?: CredentialDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a credential. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    parameters: CredentialUpdateParameters,
    options?: CredentialUpdateOptionalParams,
  ) => Promise<Credential>;
  /** Create a credential. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    parameters: CredentialCreateOrUpdateParameters,
    options?: CredentialCreateOrUpdateOptionalParams,
  ) => Promise<Credential>;
  /** Retrieve the credential identified by credential name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    credentialName: string,
    options?: CredentialGetOptionalParams,
  ) => Promise<Credential>;
}

function _getCredential(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: CredentialListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      options?: CredentialDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, credentialName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      credentialName: string,
      parameters: CredentialUpdateParameters,
      options?: CredentialUpdateOptionalParams,
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
      options?: CredentialCreateOrUpdateOptionalParams,
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
      options?: CredentialGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, credentialName, options),
  };
}

export function _getCredentialOperations(context: AutomationContext): CredentialOperations {
  return {
    ..._getCredential(context),
  };
}
