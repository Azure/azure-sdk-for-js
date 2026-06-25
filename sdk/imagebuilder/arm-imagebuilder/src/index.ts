// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ImageBuilderClient } from "./imageBuilderClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Trigger,
  TriggerProperties,
  TriggerPropertiesUnion,
  TriggerStatus,
  ProvisioningState,
  SourceImageTriggerProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ImageTemplate,
  ImageTemplateProperties,
  ImageTemplateSource,
  ImageTemplateSourceUnion,
  ImageTemplatePlatformImageSource,
  PlatformImagePurchasePlan,
  ImageTemplateManagedImageSource,
  ImageTemplateSharedImageVersionSource,
  ImageTemplateCustomizer,
  ImageTemplateCustomizerUnion,
  ImageTemplateShellCustomizer,
  ImageTemplateRestartCustomizer,
  ImageTemplateWindowsUpdateCustomizer,
  ImageTemplatePowerShellCustomizer,
  ImageTemplateFileCustomizer,
  ImageTemplatePropertiesOptimize,
  ImageTemplatePropertiesOptimizeVmBoot,
  VMBootOptimizationState,
  ImageTemplatePropertiesOptimizeWorkload,
  WorkloadOptimizationState,
  ImageTemplatePropertiesValidate,
  ImageTemplateInVMValidator,
  ImageTemplateInVMValidatorUnion,
  ImageTemplateShellValidator,
  ImageTemplatePowerShellValidator,
  ImageTemplateFileValidator,
  ImageTemplateDistributor,
  ImageTemplateDistributorUnion,
  ImageTemplateManagedImageDistributor,
  ImageTemplateSharedImageDistributor,
  SharedImageStorageAccountType,
  TargetRegion,
  DistributeVersioner,
  DistributeVersionerUnion,
  DistributeVersionerLatest,
  DistributeVersionerSource,
  ReplicationMode,
  ImageTemplateVhdDistributor,
  ImageTemplatePropertiesErrorHandling,
  OnBuildError,
  ProvisioningError,
  ProvisioningErrorCode,
  ImageTemplateLastRunStatus,
  RunState,
  RunSubState,
  ImageTemplateVmProfile,
  VirtualNetworkConfig,
  DataDisk,
  ImageTemplateAutoRun,
  AutoRunState,
  ImageTemplateIdentity,
  ResourceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  ImageTemplateUpdateParameters,
  ImageTemplateUpdateParametersProperties,
  RunOutput,
  RunOutputProperties,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownSharedImageStorageAccountType,
  KnownReplicationMode,
  KnownOnBuildError,
  KnownProvisioningErrorCode,
  KnownVersions,
} from "./models/index.js";
export type { ImageBuilderClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  TriggersListByImageTemplateOptionalParams,
  TriggersDeleteOptionalParams,
  TriggersCreateOrUpdateOptionalParams,
  TriggersGetOptionalParams,
} from "./api/triggers/index.js";
export type {
  VirtualMachineImageTemplatesListRunOutputsOptionalParams,
  VirtualMachineImageTemplatesGetRunOutputOptionalParams,
  VirtualMachineImageTemplatesCancelOptionalParams,
  VirtualMachineImageTemplatesRunOptionalParams,
  VirtualMachineImageTemplatesListOptionalParams,
  VirtualMachineImageTemplatesListByResourceGroupOptionalParams,
  VirtualMachineImageTemplatesDeleteOptionalParams,
  VirtualMachineImageTemplatesUpdateOptionalParams,
  VirtualMachineImageTemplatesCreateOrUpdateOptionalParams,
  VirtualMachineImageTemplatesGetOptionalParams,
} from "./api/virtualMachineImageTemplates/index.js";
export type {
  OperationsOperations,
  TriggersOperations,
  VirtualMachineImageTemplatesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
