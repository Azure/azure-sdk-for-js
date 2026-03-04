// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NginxManagementClient } from "./nginxManagementClient.js";
export { type SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type NginxDeploymentApiKeyResponse,
  type NginxDeploymentApiKeyResponseProperties,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type NginxDeploymentApiKeyRequest,
  type NginxDeploymentApiKeyRequestProperties,
  type NginxDeployment,
  type NginxDeploymentProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type NginxNetworkProfile,
  type NginxFrontendIPConfiguration,
  type NginxPublicIPAddress,
  type NginxPrivateIPAddress,
  KnownNginxPrivateIPAllocationMethod,
  type NginxPrivateIPAllocationMethod,
  type NginxNetworkInterfaceConfiguration,
  type NginxLogging,
  type NginxStorageAccount,
  type NginxDeploymentScalingProperties,
  type NginxDeploymentScalingPropertiesAutoScaleSettings,
  type ScaleProfile,
  type ScaleProfileCapacity,
  type AutoUpgradeProfile,
  type NginxDeploymentUserProfile,
  type NginxDeploymentPropertiesNginxAppProtect,
  type WebApplicationFirewallSettings,
  KnownActivationState,
  type ActivationState,
  type WebApplicationFirewallStatus,
  type WebApplicationFirewallPackage,
  type WebApplicationFirewallComponentVersions,
  type IdentityProperties,
  KnownIdentityType,
  type IdentityType,
  type UserIdentityProperties,
  type ResourceSku,
  type TrackedResource,
  type NginxDeploymentUpdateParameters,
  type NginxDeploymentUpdateProperties,
  type NginxDeploymentUpdatePropertiesNginxAppProtect,
  type NginxDeploymentWafPolicyMetadata,
  type NginxDeploymentWafPolicyMetadataProperties,
  type NginxDeploymentWafPolicyCompilingStatus,
  KnownNginxDeploymentWafPolicyCompilingStatusCode,
  type NginxDeploymentWafPolicyCompilingStatusCode,
  type NginxDeploymentWafPolicyApplyingStatus,
  KnownNginxDeploymentWafPolicyApplyingStatusCode,
  type NginxDeploymentWafPolicyApplyingStatusCode,
  type NginxDeploymentWafPolicy,
  type NginxDeploymentWafPolicyProperties,
  type NginxDeploymentDefaultWafPolicyListResponse,
  type NginxDeploymentDefaultWafPolicyProperties,
  type NginxCertificate,
  type NginxCertificateProperties,
  type NginxCertificateErrorResponseBody,
  type NginxConfiguration,
  type NginxConfigurationProperties,
  type NginxConfigurationFile,
  type NginxConfigurationProtectedFileResponse,
  type NginxConfigurationPackage,
  type NginxConfigurationRequest,
  type NginxConfigurationRequestProperties,
  type NginxConfigurationProtectedFileRequest,
  type AnalysisCreate,
  type AnalysisCreateConfig,
  type AnalysisResult,
  type AnalysisResultData,
  type AnalysisDiagnostic,
  type DiagnosticItem,
  KnownLevel,
  type Level,
  KnownVersions,
} from "./models/index.js";
export { type NginxManagementClientOptionalParams } from "./api/index.js";
export {
  type ApiKeysListOptionalParams,
  type ApiKeysDeleteOptionalParams,
  type ApiKeysCreateOrUpdateOptionalParams,
  type ApiKeysGetOptionalParams,
} from "./api/apiKeys/index.js";
export {
  type CertificatesListOptionalParams,
  type CertificatesDeleteOptionalParams,
  type CertificatesCreateOrUpdateOptionalParams,
  type CertificatesGetOptionalParams,
} from "./api/certificates/index.js";
export {
  type ConfigurationsAnalysisOptionalParams,
  type ConfigurationsListOptionalParams,
  type ConfigurationsDeleteOptionalParams,
  type ConfigurationsCreateOrUpdateOptionalParams,
  type ConfigurationsGetOptionalParams,
} from "./api/configurations/index.js";
export { type DefaultWafPolicyListOptionalParams } from "./api/defaultWafPolicy/index.js";
export {
  type DeploymentsListOptionalParams,
  type DeploymentsListByResourceGroupOptionalParams,
  type DeploymentsDeleteOptionalParams,
  type DeploymentsUpdateOptionalParams,
  type DeploymentsCreateOrUpdateOptionalParams,
  type DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type WafPolicyDeleteOptionalParams,
  type WafPolicyCreateOptionalParams,
  type WafPolicyGetOptionalParams,
  type WafPolicyListOptionalParams,
} from "./api/wafPolicy/index.js";
export {
  type ApiKeysOperations,
  type CertificatesOperations,
  type ConfigurationsOperations,
  type DefaultWafPolicyOperations,
  type DeploymentsOperations,
  type OperationsOperations,
  type WafPolicyOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
