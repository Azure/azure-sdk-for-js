// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/certificate/operations.js";
import type {
  CertificateListByAutomationAccountOptionalParams,
  CertificateDeleteOptionalParams,
  CertificateUpdateOptionalParams,
  CertificateCreateOrUpdateOptionalParams,
  CertificateGetOptionalParams,
} from "../../api/certificate/options.js";
import type {
  Certificate,
  CertificateCreateOrUpdateParameters,
  CertificateUpdateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Certificate operations. */
export interface CertificateOperations {
  /** Retrieve a list of certificates. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: CertificateListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Delete the certificate. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    options?: CertificateDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a certificate. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    parameters: CertificateUpdateParameters,
    options?: CertificateUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Create a certificate. */
  createOrUpdate: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    parameters: CertificateCreateOrUpdateParameters,
    options?: CertificateCreateOrUpdateOptionalParams,
  ) => Promise<Certificate>;
  /** Retrieve the certificate identified by certificate name. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    certificateName: string,
    options?: CertificateGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getCertificate(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: CertificateListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      options?: CertificateDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, certificateName, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      certificateName: string,
      parameters: CertificateUpdateParameters,
      options?: CertificateUpdateOptionalParams,
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
      options?: CertificateCreateOrUpdateOptionalParams,
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
      options?: CertificateGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, certificateName, options),
  };
}

export function _getCertificateOperations(context: AutomationContext): CertificateOperations {
  return {
    ..._getCertificate(context),
  };
}
