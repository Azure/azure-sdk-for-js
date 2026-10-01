// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/certificateOperations/operations.js";
import type {
  CertificateOperationsListByAutomationAccountOptionalParams,
  CertificateOperationsDeleteOptionalParams,
  CertificateOperationsUpdateOptionalParams,
  CertificateOperationsCreateOrUpdateOptionalParams,
  CertificateOperationsGetOptionalParams,
} from "../../api/certificateOperations/options.js";
import type {
  Certificate,
  CertificateCreateOrUpdateParameters,
  CertificateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CertificateOperations operations. */
export interface CertificateOperationsOperations {
  /** Retrieve a list of certificates. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: CertificateOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Delete the certificate. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    options?: CertificateOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a certificate. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    parameters: CertificateUpdateParameters,
    options?: CertificateOperationsUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Create a certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    parameters: CertificateCreateOrUpdateParameters,
    options?: CertificateOperationsCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Retrieve the certificate identified by certificate name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    options?: CertificateOperationsGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getCertificateOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: CertificateOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      options?: CertificateOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, certificateName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      parameters: CertificateUpdateParameters,
      options?: CertificateOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        certificateName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      parameters: CertificateCreateOrUpdateParameters,
      options?: CertificateOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        automationAccountName,
        certificateName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      options?: CertificateOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, certificateName, options),
  };
}

export function _getCertificateOperationsOperations(
  context: AutomationContext,
): CertificateOperationsOperations {
  return {
    ..._getCertificateOperations(context),
  };
}
