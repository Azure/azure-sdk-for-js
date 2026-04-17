// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { CertificateRegistrationManagementClient } from "./certificateRegistrationManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  AppServiceCertificateOrder,
  AppServiceCertificateOrderProperties,
  AppServiceCertificate,
  KeyVaultSecretStatus,
  CertificateProductType,
  ProvisioningState,
  CertificateOrderStatus,
  CertificateDetails,
  ResourceNotRenewableReason,
  CertificateOrderContact,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  DefaultErrorResponse,
  DefaultErrorResponseError,
  DefaultErrorResponseErrorDetailsItem,
  AppServiceCertificateOrderPatchResource,
  AppServiceCertificateOrderPatchResourceProperties,
  ProxyOnlyResource,
  ReissueCertificateOrderRequest,
  ReissueCertificateOrderRequestProperties,
  RenewCertificateOrderRequest,
  RenewCertificateOrderRequestProperties,
  NameIdentifier,
  SiteSealRequest,
  SiteSeal,
  CertificateOrderAction,
  CertificateOrderActionType,
  CertificateEmail,
  AppServiceCertificateResource,
  AppServiceCertificatePatchResource,
  DetectorResponse,
  DetectorResponseProperties,
  DetectorInfo,
  SupportTopic,
  DetectorType,
  DiagnosticData,
  DataTableResponseObject,
  DataTableResponseColumn,
  Rendering,
  RenderingType,
  Status,
  InsightStatus,
  DataProviderMetadata,
  KeyValuePairStringObject,
  QueryUtterancesResults,
  QueryUtterancesResult,
  SampleUtterance,
  ProxyResource,
  CsmOperationDescription,
  CsmOperationDisplay,
  CsmOperationDescriptionProperties,
  ServiceSpecification,
  MetricSpecification,
  Dimension,
  MetricAvailability,
  LogSpecification,
} from "./models/index.js";
export {
  KnownResourceNotRenewableReason,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { CertificateRegistrationManagementClientOptionalParams } from "./api/index.js";
export type {
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
} from "./api/appServiceCertificateOrders/index.js";
export type {
  CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams,
  CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams,
} from "./api/certificateOrdersDiagnostics/index.js";
export type { CertificateRegistrationProviderListOperationsOptionalParams } from "./api/certificateRegistrationProvider/index.js";
export type {
  AppServiceCertificateOrdersOperations,
  CertificateOrdersDiagnosticsOperations,
  CertificateRegistrationProviderOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
