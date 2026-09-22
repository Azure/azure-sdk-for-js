// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CertificateRegistrationManagementContext } from "../../api/certificateRegistrationManagementContext.js";
import {
  validatePurchaseInformation,
  listCertificates,
  deleteCertificate,
  updateCertificate,
  createOrUpdateCertificate,
  getCertificate,
  retrieveCertificateEmailHistory,
  retrieveCertificateActions,
  verifyDomainOwnership,
  retrieveSiteSeal,
  resendRequestEmails,
  resendEmail,
  renew,
  reissue,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/appServiceCertificateOrders/operations.js";
import type {
  AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams,
  AppServiceCertificateOrdersListCertificatesOptionalParams,
  AppServiceCertificateOrdersDeleteCertificateOptionalParams,
  AppServiceCertificateOrdersUpdateCertificateOptionalParams,
  AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams,
  AppServiceCertificateOrdersGetCertificateOptionalParams,
  AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams,
  AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams,
  AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams,
  AppServiceCertificateOrdersRetrieveSiteSealOptionalParams,
  AppServiceCertificateOrdersResendRequestEmailsOptionalParams,
  AppServiceCertificateOrdersResendEmailOptionalParams,
  AppServiceCertificateOrdersRenewOptionalParams,
  AppServiceCertificateOrdersReissueOptionalParams,
  AppServiceCertificateOrdersListOptionalParams,
  AppServiceCertificateOrdersListByResourceGroupOptionalParams,
  AppServiceCertificateOrdersDeleteOptionalParams,
  AppServiceCertificateOrdersUpdateOptionalParams,
  AppServiceCertificateOrdersCreateOrUpdateOptionalParams,
  AppServiceCertificateOrdersGetOptionalParams,
} from "../../api/appServiceCertificateOrders/options.js";
import type {
  AppServiceCertificateOrder,
  AppServiceCertificateOrderPatchResource,
  ReissueCertificateOrderRequest,
  RenewCertificateOrderRequest,
  NameIdentifier,
  SiteSealRequest,
  SiteSeal,
  CertificateOrderAction,
  CertificateEmail,
  AppServiceCertificateResource,
  AppServiceCertificatePatchResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AppServiceCertificateOrders operations. */
export interface AppServiceCertificateOrdersOperations {
  /** Description for Validate information for a certificate order. */
  validatePurchaseInformation: (
    appServiceCertificateOrder: AppServiceCertificateOrder,
    options?: AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams,
  ) => Promise<void>;
  /** Description for List all certificates associated with a certificate order. */
  listCertificates: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: AppServiceCertificateOrdersListCertificatesOptionalParams,
  ) => PagedAsyncIterableIterator<AppServiceCertificateResource>;
  /** Description for Delete the certificate associated with a certificate order. */
  deleteCertificate: (
    resourceGroupName: string,
    certificateOrderName: string,
    name: string,
    options?: AppServiceCertificateOrdersDeleteCertificateOptionalParams,
  ) => Promise<void>;
  /** Description for Creates or updates a certificate and associates with key vault secret. */
  updateCertificate: (
    resourceGroupName: string,
    certificateOrderName: string,
    name: string,
    keyVaultCertificate: AppServiceCertificatePatchResource,
    options?: AppServiceCertificateOrdersUpdateCertificateOptionalParams,
  ) => Promise<AppServiceCertificateResource>;
  /** Description for Creates or updates a certificate and associates with key vault secret. */
  createOrUpdateCertificate: (
    resourceGroupName: string,
    certificateOrderName: string,
    name: string,
    keyVaultCertificate: AppServiceCertificateResource,
    options?: AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams,
  ) => PollerLike<OperationState<AppServiceCertificateResource>, AppServiceCertificateResource>;
  /** Description for Get the certificate associated with a certificate order. */
  getCertificate: (
    resourceGroupName: string,
    certificateOrderName: string,
    name: string,
    options?: AppServiceCertificateOrdersGetCertificateOptionalParams,
  ) => Promise<AppServiceCertificateResource>;
  /** Description for Retrieve email history. */
  retrieveCertificateEmailHistory: (
    resourceGroupName: string,
    name: string,
    options?: AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams,
  ) => Promise<CertificateEmail[]>;
  /** Description for Retrieve the list of certificate actions. */
  retrieveCertificateActions: (
    resourceGroupName: string,
    name: string,
    options?: AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams,
  ) => Promise<CertificateOrderAction[]>;
  /** Description for Verify domain ownership for this certificate order. */
  verifyDomainOwnership: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams,
  ) => Promise<void>;
  /** This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times. */
  retrieveSiteSeal: (
    resourceGroupName: string,
    certificateOrderName: string,
    siteSealRequest: SiteSealRequest,
    options?: AppServiceCertificateOrdersRetrieveSiteSealOptionalParams,
  ) => Promise<SiteSeal>;
  /** Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order */
  resendRequestEmails: (
    resourceGroupName: string,
    certificateOrderName: string,
    nameIdentifier: NameIdentifier,
    options?: AppServiceCertificateOrdersResendRequestEmailsOptionalParams,
  ) => Promise<void>;
  /** Description for Resend certificate email. */
  resendEmail: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: AppServiceCertificateOrdersResendEmailOptionalParams,
  ) => Promise<void>;
  /** Description for Renew an existing certificate order. */
  renew: (
    resourceGroupName: string,
    certificateOrderName: string,
    renewCertificateOrderRequest: RenewCertificateOrderRequest,
    options?: AppServiceCertificateOrdersRenewOptionalParams,
  ) => Promise<void>;
  /** Description for Reissue an existing certificate order. */
  reissue: (
    resourceGroupName: string,
    certificateOrderName: string,
    reissueCertificateOrderRequest: ReissueCertificateOrderRequest,
    options?: AppServiceCertificateOrdersReissueOptionalParams,
  ) => Promise<void>;
  /** Description for List all certificate orders in a subscription. */
  list: (
    options?: AppServiceCertificateOrdersListOptionalParams,
  ) => PagedAsyncIterableIterator<AppServiceCertificateOrder>;
  /** Description for Get certificate orders in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AppServiceCertificateOrdersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AppServiceCertificateOrder>;
  /** Description for Delete an existing certificate order. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: AppServiceCertificateOrdersDeleteOptionalParams,
  ) => Promise<void>;
  /** Description for Create or update a certificate purchase order. */
  update: (
    resourceGroupName: string,
    certificateOrderName: string,
    certificateDistinguishedName: AppServiceCertificateOrderPatchResource,
    options?: AppServiceCertificateOrdersUpdateOptionalParams,
  ) => Promise<AppServiceCertificateOrder>;
  /** Description for Create or update a certificate purchase order. */
  createOrUpdate: (
    resourceGroupName: string,
    certificateOrderName: string,
    certificateDistinguishedName: AppServiceCertificateOrder,
    options?: AppServiceCertificateOrdersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AppServiceCertificateOrder>, AppServiceCertificateOrder>;
  /** Description for Get a certificate order. */
  get: (
    resourceGroupName: string,
    certificateOrderName: string,
    options?: AppServiceCertificateOrdersGetOptionalParams,
  ) => Promise<AppServiceCertificateOrder>;
}

function _getAppServiceCertificateOrders(context: CertificateRegistrationManagementContext) {
  return {
    validatePurchaseInformation: (
      appServiceCertificateOrder: AppServiceCertificateOrder,
      options?: AppServiceCertificateOrdersValidatePurchaseInformationOptionalParams,
    ) => validatePurchaseInformation(context, appServiceCertificateOrder, options),
    listCertificates: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: AppServiceCertificateOrdersListCertificatesOptionalParams,
    ) => listCertificates(context, resourceGroupName, certificateOrderName, options),
    deleteCertificate: (
      resourceGroupName: string,
      certificateOrderName: string,
      name: string,
      options?: AppServiceCertificateOrdersDeleteCertificateOptionalParams,
    ) => deleteCertificate(context, resourceGroupName, certificateOrderName, name, options),
    updateCertificate: (
      resourceGroupName: string,
      certificateOrderName: string,
      name: string,
      keyVaultCertificate: AppServiceCertificatePatchResource,
      options?: AppServiceCertificateOrdersUpdateCertificateOptionalParams,
    ) =>
      updateCertificate(
        context,
        resourceGroupName,
        certificateOrderName,
        name,
        keyVaultCertificate,
        options,
      ),
    createOrUpdateCertificate: (
      resourceGroupName: string,
      certificateOrderName: string,
      name: string,
      keyVaultCertificate: AppServiceCertificateResource,
      options?: AppServiceCertificateOrdersCreateOrUpdateCertificateOptionalParams,
    ) =>
      createOrUpdateCertificate(
        context,
        resourceGroupName,
        certificateOrderName,
        name,
        keyVaultCertificate,
        options,
      ),
    getCertificate: (
      resourceGroupName: string,
      certificateOrderName: string,
      name: string,
      options?: AppServiceCertificateOrdersGetCertificateOptionalParams,
    ) => getCertificate(context, resourceGroupName, certificateOrderName, name, options),
    retrieveCertificateEmailHistory: (
      resourceGroupName: string,
      name: string,
      options?: AppServiceCertificateOrdersRetrieveCertificateEmailHistoryOptionalParams,
    ) => retrieveCertificateEmailHistory(context, resourceGroupName, name, options),
    retrieveCertificateActions: (
      resourceGroupName: string,
      name: string,
      options?: AppServiceCertificateOrdersRetrieveCertificateActionsOptionalParams,
    ) => retrieveCertificateActions(context, resourceGroupName, name, options),
    verifyDomainOwnership: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: AppServiceCertificateOrdersVerifyDomainOwnershipOptionalParams,
    ) => verifyDomainOwnership(context, resourceGroupName, certificateOrderName, options),
    retrieveSiteSeal: (
      resourceGroupName: string,
      certificateOrderName: string,
      siteSealRequest: SiteSealRequest,
      options?: AppServiceCertificateOrdersRetrieveSiteSealOptionalParams,
    ) =>
      retrieveSiteSeal(context, resourceGroupName, certificateOrderName, siteSealRequest, options),
    resendRequestEmails: (
      resourceGroupName: string,
      certificateOrderName: string,
      nameIdentifier: NameIdentifier,
      options?: AppServiceCertificateOrdersResendRequestEmailsOptionalParams,
    ) =>
      resendRequestEmails(
        context,
        resourceGroupName,
        certificateOrderName,
        nameIdentifier,
        options,
      ),
    resendEmail: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: AppServiceCertificateOrdersResendEmailOptionalParams,
    ) => resendEmail(context, resourceGroupName, certificateOrderName, options),
    renew: (
      resourceGroupName: string,
      certificateOrderName: string,
      renewCertificateOrderRequest: RenewCertificateOrderRequest,
      options?: AppServiceCertificateOrdersRenewOptionalParams,
    ) =>
      renew(
        context,
        resourceGroupName,
        certificateOrderName,
        renewCertificateOrderRequest,
        options,
      ),
    reissue: (
      resourceGroupName: string,
      certificateOrderName: string,
      reissueCertificateOrderRequest: ReissueCertificateOrderRequest,
      options?: AppServiceCertificateOrdersReissueOptionalParams,
    ) =>
      reissue(
        context,
        resourceGroupName,
        certificateOrderName,
        reissueCertificateOrderRequest,
        options,
      ),
    list: (options?: AppServiceCertificateOrdersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AppServiceCertificateOrdersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: AppServiceCertificateOrdersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, certificateOrderName, options),
    update: (
      resourceGroupName: string,
      certificateOrderName: string,
      certificateDistinguishedName: AppServiceCertificateOrderPatchResource,
      options?: AppServiceCertificateOrdersUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        certificateOrderName,
        certificateDistinguishedName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      certificateOrderName: string,
      certificateDistinguishedName: AppServiceCertificateOrder,
      options?: AppServiceCertificateOrdersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        certificateOrderName,
        certificateDistinguishedName,
        options,
      ),
    get: (
      resourceGroupName: string,
      certificateOrderName: string,
      options?: AppServiceCertificateOrdersGetOptionalParams,
    ) => get(context, resourceGroupName, certificateOrderName, options),
  };
}

export function _getAppServiceCertificateOrdersOperations(
  context: CertificateRegistrationManagementContext,
): AppServiceCertificateOrdersOperations {
  return {
    ..._getAppServiceCertificateOrders(context),
  };
}
