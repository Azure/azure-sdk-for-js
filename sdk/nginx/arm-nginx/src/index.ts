// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NginxManagementClient } from "./nginxManagementClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  NginxDeploymentWafPolicyAnalysisCreateRequest,
  NginxDeploymentWafPolicyAnalysisResponse,
  NginxDeploymentWafPolicyAnalysisData,
  NginxDeploymentWafPolicyError,
  NginxDeploymentApiKeyResponse,
  NginxDeploymentApiKeyResponseProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  NginxDeploymentApiKeyRequest,
  NginxDeploymentApiKeyRequestProperties,
  NginxDeployment,
  NginxDeploymentProperties,
  ProvisioningState,
  NginxNetworkProfile,
  NginxFrontendIPConfiguration,
  NginxPublicIPAddress,
  NginxPrivateIPAddress,
  NginxPrivateIPAllocationMethod,
  NginxNetworkInterfaceConfiguration,
  NginxLogging,
  NginxStorageAccount,
  NginxDeploymentScalingProperties,
  NginxDeploymentScalingPropertiesAutoScaleSettings,
  ScaleProfile,
  ScaleProfileCapacity,
  AutoUpgradeProfile,
  NginxDeploymentUserProfile,
  NginxDeploymentPropertiesNginxAppProtect,
  WebApplicationFirewallSettings,
  ActivationState,
  WebApplicationFirewallStatus,
  WebApplicationFirewallPackage,
  WebApplicationFirewallComponentVersions,
  IdentityProperties,
  IdentityType,
  UserIdentityProperties,
  ResourceSku,
  TrackedResource,
  NginxDeploymentUpdateParameters,
  NginxDeploymentUpdateProperties,
  NginxDeploymentUpdatePropertiesNginxAppProtect,
  NginxDeploymentWafPolicyMetadata,
  NginxDeploymentWafPolicyMetadataProperties,
  NginxDeploymentWafPolicyCompilingStatus,
  NginxDeploymentWafPolicyCompilingStatusCode,
  NginxDeploymentWafPolicyApplyingStatus,
  NginxDeploymentWafPolicyApplyingStatusCode,
  NginxDeploymentWafPolicy,
  NginxDeploymentWafPolicyProperties,
  NginxDeploymentDefaultWafPolicyListResponse,
  NginxDeploymentDefaultWafPolicyProperties,
  NginxCertificate,
  NginxCertificateProperties,
  NginxCertificateErrorResponseBody,
  NginxConfiguration,
  NginxConfigurationProperties,
  NginxConfigurationFile,
  NginxConfigurationProtectedFileResponse,
  NginxConfigurationPackage,
  NginxConfigurationRequest,
  NginxConfigurationRequestProperties,
  NginxConfigurationProtectedFileRequest,
  AnalysisCreate,
  AnalysisCreateConfig,
  AnalysisResult,
  AnalysisResultData,
  AnalysisDiagnostic,
  DiagnosticItem,
  Level,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownProvisioningState,
  KnownNginxPrivateIPAllocationMethod,
  KnownActivationState,
  KnownIdentityType,
  KnownNginxDeploymentWafPolicyCompilingStatusCode,
  KnownNginxDeploymentWafPolicyApplyingStatusCode,
  KnownLevel,
  KnownVersions,
} from "./models/index.js";
export type { NginxManagementClientOptionalParams } from "./api/index.js";
export type {
  ApiKeysListOptionalParams,
  ApiKeysDeleteOptionalParams,
  ApiKeysCreateOrUpdateOptionalParams,
  ApiKeysGetOptionalParams,
} from "./api/apiKeys/index.js";
export type {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "./api/certificates/index.js";
export type {
  ConfigurationsAnalysisOptionalParams,
  ConfigurationsListOptionalParams,
  ConfigurationsDeleteOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./api/configurations/index.js";
export type { DefaultWafPolicyListOptionalParams } from "./api/defaultWafPolicy/index.js";
export type {
  DeploymentsListOptionalParams,
  DeploymentsListByResourceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsUpdateOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export type { NginxDeploymentWafPoliciesAnalysisOptionalParams } from "./api/nginxDeploymentWafPolicies/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  WafPolicyDeleteOptionalParams,
  WafPolicyCreateOptionalParams,
  WafPolicyGetOptionalParams,
  WafPolicyListOptionalParams,
} from "./api/wafPolicy/index.js";
export type {
  ApiKeysOperations,
  CertificatesOperations,
  ConfigurationsOperations,
  DefaultWafPolicyOperations,
  DeploymentsOperations,
  NginxDeploymentWafPoliciesOperations,
  OperationsOperations,
  WafPolicyOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
