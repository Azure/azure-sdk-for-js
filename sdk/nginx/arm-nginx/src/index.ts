// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NginxManagementClient } from "./nginxManagementClient.js";
export { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  NginxDeploymentApiKeyResponse,
  NginxDeploymentApiKeyResponseProperties,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  NginxDeploymentApiKeyRequest,
  NginxDeploymentApiKeyRequestProperties,
  NginxDeployment,
  NginxDeploymentProperties,
  KnownProvisioningState,
  ProvisioningState,
  NginxNetworkProfile,
  NginxFrontendIPConfiguration,
  NginxPublicIPAddress,
  NginxPrivateIPAddress,
  KnownNginxPrivateIPAllocationMethod,
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
  KnownActivationState,
  ActivationState,
  WebApplicationFirewallStatus,
  WebApplicationFirewallPackage,
  WebApplicationFirewallComponentVersions,
  IdentityProperties,
  KnownIdentityType,
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
  KnownNginxDeploymentWafPolicyCompilingStatusCode,
  NginxDeploymentWafPolicyCompilingStatusCode,
  NginxDeploymentWafPolicyApplyingStatus,
  KnownNginxDeploymentWafPolicyApplyingStatusCode,
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
  KnownLevel,
  Level,
  KnownVersions,
} from "./models/index.js";
export { NginxManagementClientOptionalParams } from "./api/index.js";
export {
  ApiKeysListOptionalParams,
  ApiKeysDeleteOptionalParams,
  ApiKeysCreateOrUpdateOptionalParams,
  ApiKeysGetOptionalParams,
} from "./api/apiKeys/index.js";
export {
  CertificatesListOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "./api/certificates/index.js";
export {
  ConfigurationsAnalysisOptionalParams,
  ConfigurationsListOptionalParams,
  ConfigurationsDeleteOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./api/configurations/index.js";
export { DefaultWafPolicyListOptionalParams } from "./api/defaultWafPolicy/index.js";
export {
  DeploymentsListOptionalParams,
  DeploymentsListByResourceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsUpdateOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  WafPolicyDeleteOptionalParams,
  WafPolicyCreateOptionalParams,
  WafPolicyGetOptionalParams,
  WafPolicyListOptionalParams,
} from "./api/wafPolicy/index.js";
export {
  ApiKeysOperations,
  CertificatesOperations,
  ConfigurationsOperations,
  DefaultWafPolicyOperations,
  DeploymentsOperations,
  OperationsOperations,
  WafPolicyOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
