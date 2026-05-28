// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsContext } from "../../api/deploymentsContext.js";
import {
  calculateTemplateHash,
  exportTemplate,
  whatIf,
  validate,
  cancel,
  listByResourceGroup,
  $delete,
  createOrUpdate,
  checkExistence,
  get,
  exportTemplateAtSubscriptionScope,
  whatIfAtSubscriptionScope,
  validateAtSubscriptionScope,
  cancelAtSubscriptionScope,
  listAtSubscriptionScope,
  deleteAtSubscriptionScope,
  createOrUpdateAtSubscriptionScope,
  checkExistenceAtSubscriptionScope,
  getAtSubscriptionScope,
  exportTemplateAtManagementGroupScope,
  whatIfAtManagementGroupScope,
  validateAtManagementGroupScope,
  cancelAtManagementGroupScope,
  listAtManagementGroupScope,
  deleteAtManagementGroupScope,
  createOrUpdateAtManagementGroupScope,
  checkExistenceAtManagementGroupScope,
  getAtManagementGroupScope,
  listAtTenantScope,
  exportTemplateAtTenantScope,
  whatIfAtTenantScope,
  validateAtTenantScope,
  cancelAtTenantScope,
  deleteAtTenantScope,
  createOrUpdateAtTenantScope,
  checkExistenceAtTenantScope,
  getAtTenantScope,
  exportTemplateAtScope,
  validateAtScope,
  cancelAtScope,
  listAtScope,
  deleteAtScope,
  createOrUpdateAtScope,
  checkExistenceAtScope,
  getAtScope,
} from "../../api/deployments/operations.js";
import {
  DeploymentsCalculateTemplateHashOptionalParams,
  DeploymentsExportTemplateOptionalParams,
  DeploymentsWhatIfOptionalParams,
  DeploymentsValidateOptionalParams,
  DeploymentsCancelOptionalParams,
  DeploymentsListByResourceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsCheckExistenceOptionalParams,
  DeploymentsGetOptionalParams,
  DeploymentsExportTemplateAtSubscriptionScopeOptionalParams,
  DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
  DeploymentsValidateAtSubscriptionScopeOptionalParams,
  DeploymentsCancelAtSubscriptionScopeOptionalParams,
  DeploymentsListAtSubscriptionScopeOptionalParams,
  DeploymentsDeleteAtSubscriptionScopeOptionalParams,
  DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
  DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams,
  DeploymentsGetAtSubscriptionScopeOptionalParams,
  DeploymentsExportTemplateAtManagementGroupScopeOptionalParams,
  DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
  DeploymentsValidateAtManagementGroupScopeOptionalParams,
  DeploymentsCancelAtManagementGroupScopeOptionalParams,
  DeploymentsListAtManagementGroupScopeOptionalParams,
  DeploymentsDeleteAtManagementGroupScopeOptionalParams,
  DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
  DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams,
  DeploymentsGetAtManagementGroupScopeOptionalParams,
  DeploymentsListAtTenantScopeOptionalParams,
  DeploymentsExportTemplateAtTenantScopeOptionalParams,
  DeploymentsWhatIfAtTenantScopeOptionalParams,
  DeploymentsValidateAtTenantScopeOptionalParams,
  DeploymentsCancelAtTenantScopeOptionalParams,
  DeploymentsDeleteAtTenantScopeOptionalParams,
  DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
  DeploymentsCheckExistenceAtTenantScopeOptionalParams,
  DeploymentsGetAtTenantScopeOptionalParams,
  DeploymentsExportTemplateAtScopeOptionalParams,
  DeploymentsValidateAtScopeOptionalParams,
  DeploymentsCancelAtScopeOptionalParams,
  DeploymentsListAtScopeOptionalParams,
  DeploymentsDeleteAtScopeOptionalParams,
  DeploymentsCreateOrUpdateAtScopeOptionalParams,
  DeploymentsCheckExistenceAtScopeOptionalParams,
  DeploymentsGetAtScopeOptionalParams,
} from "../../api/deployments/options.js";
import {
  DeploymentExtended,
  Deployment,
  DeploymentValidateResult,
  DeploymentExportResult,
  ScopedDeployment,
  ScopedDeploymentWhatIf,
  WhatIfOperationResult,
  DeploymentWhatIf,
  TemplateHashResult,
  DeploymentsCheckExistenceResponse,
  DeploymentsCheckExistenceAtSubscriptionScopeResponse,
  DeploymentsCheckExistenceAtManagementGroupScopeResponse,
  DeploymentsCheckExistenceAtTenantScopeResponse,
  DeploymentsCheckExistenceAtScopeResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** Calculate the hash of the given template. */
  calculateTemplateHash: (
    template: any,
    options?: DeploymentsCalculateTemplateHashOptionalParams,
  ) => Promise<TemplateHashResult>;
  /** Exports the template used for specified deployment. */
  exportTemplate: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsExportTemplateOptionalParams,
  ) => Promise<DeploymentExportResult>;
  /** Returns changes that will be made by the deployment if executed at the scope of the resource group. */
  whatIf: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfOptionalParams,
  ) => PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
  /** @deprecated use whatIf instead */
  beginWhatIf: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>>;
  /** @deprecated use whatIf instead */
  beginWhatIfAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfOptionalParams,
  ) => Promise<WhatIfOperationResult>;
  /** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
  validate: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateOptionalParams,
  ) => PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
  /** @deprecated use validate instead */
  beginValidate: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>
  >;
  /** @deprecated use validate instead */
  beginValidateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateOptionalParams,
  ) => Promise<DeploymentValidateResult>;
  /** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resource group partially deployed. */
  cancel: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCancelOptionalParams,
  ) => Promise<void>;
  /** Get all the deployments for a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DeploymentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentExtended>;
  /** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. Deleting a template deployment does not affect the state of the resource group. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** You can provide the template and parameters directly in the request or link to JSON files. */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentExtended>, DeploymentExtended>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Checks whether the deployment exists. */
  checkExistence: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCheckExistenceOptionalParams,
  ) => Promise<DeploymentsCheckExistenceResponse>;
  /** Gets a deployment. */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Exports the template used for specified deployment. */
  exportTemplateAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsExportTemplateAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentExportResult>;
  /** Returns changes that will be made by the deployment if executed at the scope of the subscription. */
  whatIfAtSubscriptionScope: (
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
  ) => PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
  /** @deprecated use whatIfAtSubscriptionScope instead */
  beginWhatIfAtSubscriptionScope: (
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>>;
  /** @deprecated use whatIfAtSubscriptionScope instead */
  beginWhatIfAtSubscriptionScopeAndWait: (
    deploymentName: string,
    parameters: DeploymentWhatIf,
    options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
  ) => Promise<WhatIfOperationResult>;
  /** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
  validateAtSubscriptionScope: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
  /** @deprecated use validateAtSubscriptionScope instead */
  beginValidateAtSubscriptionScope: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>
  >;
  /** @deprecated use validateAtSubscriptionScope instead */
  beginValidateAtSubscriptionScopeAndWait: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentValidateResult>;
  /** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
  cancelAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsCancelAtSubscriptionScopeOptionalParams,
  ) => Promise<void>;
  /** Get all the deployments for a subscription. */
  listAtSubscriptionScope: (
    options?: DeploymentsListAtSubscriptionScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentExtended>;
  /** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
  deleteAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtSubscriptionScope instead */
  beginDeleteAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtSubscriptionScope instead */
  beginDeleteAtSubscriptionScopeAndWait: (
    deploymentName: string,
    options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
  ) => Promise<void>;
  /** You can provide the template and parameters directly in the request or link to JSON files. */
  createOrUpdateAtSubscriptionScope: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
  /** @deprecated use createOrUpdateAtSubscriptionScope instead */
  beginCreateOrUpdateAtSubscriptionScope: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentExtended>, DeploymentExtended>>;
  /** @deprecated use createOrUpdateAtSubscriptionScope instead */
  beginCreateOrUpdateAtSubscriptionScopeAndWait: (
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Checks whether the deployment exists. */
  checkExistenceAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentsCheckExistenceAtSubscriptionScopeResponse>;
  /** Gets a deployment. */
  getAtSubscriptionScope: (
    deploymentName: string,
    options?: DeploymentsGetAtSubscriptionScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Exports the template used for specified deployment. */
  exportTemplateAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsExportTemplateAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentExportResult>;
  /** Returns changes that will be made by the deployment if executed at the scope of the management group. */
  whatIfAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
  ) => PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
  /** @deprecated use whatIfAtManagementGroupScope instead */
  beginWhatIfAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>>;
  /** @deprecated use whatIfAtManagementGroupScope instead */
  beginWhatIfAtManagementGroupScopeAndWait: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
  ) => Promise<WhatIfOperationResult>;
  /** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
  validateAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
  /** @deprecated use validateAtManagementGroupScope instead */
  beginValidateAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>
  >;
  /** @deprecated use validateAtManagementGroupScope instead */
  beginValidateAtManagementGroupScopeAndWait: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentValidateResult>;
  /** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
  cancelAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsCancelAtManagementGroupScopeOptionalParams,
  ) => Promise<void>;
  /** Get all the deployments for a management group. */
  listAtManagementGroupScope: (
    groupId: string,
    options?: DeploymentsListAtManagementGroupScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentExtended>;
  /** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
  deleteAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtManagementGroupScope instead */
  beginDeleteAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtManagementGroupScope instead */
  beginDeleteAtManagementGroupScopeAndWait: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
  ) => Promise<void>;
  /** You can provide the template and parameters directly in the request or link to JSON files. */
  createOrUpdateAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
  /** @deprecated use createOrUpdateAtManagementGroupScope instead */
  beginCreateOrUpdateAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentExtended>, DeploymentExtended>>;
  /** @deprecated use createOrUpdateAtManagementGroupScope instead */
  beginCreateOrUpdateAtManagementGroupScopeAndWait: (
    groupId: string,
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Checks whether the deployment exists. */
  checkExistenceAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentsCheckExistenceAtManagementGroupScopeResponse>;
  /** Gets a deployment. */
  getAtManagementGroupScope: (
    groupId: string,
    deploymentName: string,
    options?: DeploymentsGetAtManagementGroupScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Get all the deployments at the tenant scope. */
  listAtTenantScope: (
    options?: DeploymentsListAtTenantScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentExtended>;
  /** Exports the template used for specified deployment. */
  exportTemplateAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsExportTemplateAtTenantScopeOptionalParams,
  ) => Promise<DeploymentExportResult>;
  /** Returns changes that will be made by the deployment if executed at the scope of the tenant group. */
  whatIfAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
  ) => PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
  /** @deprecated use whatIfAtTenantScope instead */
  beginWhatIfAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>>;
  /** @deprecated use whatIfAtTenantScope instead */
  beginWhatIfAtTenantScopeAndWait: (
    deploymentName: string,
    parameters: ScopedDeploymentWhatIf,
    options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
  ) => Promise<WhatIfOperationResult>;
  /** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
  validateAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtTenantScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
  /** @deprecated use validateAtTenantScope instead */
  beginValidateAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtTenantScopeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>
  >;
  /** @deprecated use validateAtTenantScope instead */
  beginValidateAtTenantScopeAndWait: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsValidateAtTenantScopeOptionalParams,
  ) => Promise<DeploymentValidateResult>;
  /** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
  cancelAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsCancelAtTenantScopeOptionalParams,
  ) => Promise<void>;
  /** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
  deleteAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsDeleteAtTenantScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtTenantScope instead */
  beginDeleteAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsDeleteAtTenantScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtTenantScope instead */
  beginDeleteAtTenantScopeAndWait: (
    deploymentName: string,
    options?: DeploymentsDeleteAtTenantScopeOptionalParams,
  ) => Promise<void>;
  /** You can provide the template and parameters directly in the request or link to JSON files. */
  createOrUpdateAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
  /** @deprecated use createOrUpdateAtTenantScope instead */
  beginCreateOrUpdateAtTenantScope: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentExtended>, DeploymentExtended>>;
  /** @deprecated use createOrUpdateAtTenantScope instead */
  beginCreateOrUpdateAtTenantScopeAndWait: (
    deploymentName: string,
    parameters: ScopedDeployment,
    options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Checks whether the deployment exists. */
  checkExistenceAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsCheckExistenceAtTenantScopeOptionalParams,
  ) => Promise<DeploymentsCheckExistenceAtTenantScopeResponse>;
  /** Gets a deployment. */
  getAtTenantScope: (
    deploymentName: string,
    options?: DeploymentsGetAtTenantScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Exports the template used for specified deployment. */
  exportTemplateAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsExportTemplateAtScopeOptionalParams,
  ) => Promise<DeploymentExportResult>;
  /** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
  validateAtScope: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
  /** @deprecated use validateAtScope instead */
  beginValidateAtScope: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtScopeOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>
  >;
  /** @deprecated use validateAtScope instead */
  beginValidateAtScopeAndWait: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsValidateAtScopeOptionalParams,
  ) => Promise<DeploymentValidateResult>;
  /** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
  cancelAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsCancelAtScopeOptionalParams,
  ) => Promise<void>;
  /** Get all the deployments at the given scope. */
  listAtScope: (
    scope: string,
    options?: DeploymentsListAtScopeOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentExtended>;
  /** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
  deleteAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtScopeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use deleteAtScope instead */
  beginDeleteAtScopeAndWait: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsDeleteAtScopeOptionalParams,
  ) => Promise<void>;
  /** You can provide the template and parameters directly in the request or link to JSON files. */
  createOrUpdateAtScope: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
  ) => PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScope: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentExtended>, DeploymentExtended>>;
  /** @deprecated use createOrUpdateAtScope instead */
  beginCreateOrUpdateAtScopeAndWait: (
    scope: string,
    deploymentName: string,
    parameters: Deployment,
    options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
  /** Checks whether the deployment exists. */
  checkExistenceAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsCheckExistenceAtScopeOptionalParams,
  ) => Promise<DeploymentsCheckExistenceAtScopeResponse>;
  /** Gets a deployment. */
  getAtScope: (
    scope: string,
    deploymentName: string,
    options?: DeploymentsGetAtScopeOptionalParams,
  ) => Promise<DeploymentExtended>;
}

function _getDeployments(context: DeploymentsContext) {
  return {
    calculateTemplateHash: (
      template: any,
      options?: DeploymentsCalculateTemplateHashOptionalParams,
    ) => calculateTemplateHash(context, template, options),
    exportTemplate: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsExportTemplateOptionalParams,
    ) => exportTemplate(context, resourceGroupName, deploymentName, options),
    whatIf: (
      resourceGroupName: string,
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfOptionalParams,
    ) => whatIf(context, resourceGroupName, deploymentName, parameters, options),
    beginWhatIf: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfOptionalParams,
    ) => {
      const poller = whatIf(context, resourceGroupName, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfOptionalParams,
    ) => {
      return await whatIf(context, resourceGroupName, deploymentName, parameters, options);
    },
    validate: (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateOptionalParams,
    ) => validate(context, resourceGroupName, deploymentName, parameters, options),
    beginValidate: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateOptionalParams,
    ) => {
      const poller = validate(context, resourceGroupName, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateOptionalParams,
    ) => {
      return await validate(context, resourceGroupName, deploymentName, parameters, options);
    },
    cancel: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, deploymentName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DeploymentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, deploymentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        deploymentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, deploymentName, parameters, options);
    },
    checkExistence: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCheckExistenceOptionalParams,
    ) => checkExistence(context, resourceGroupName, deploymentName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, options),
    exportTemplateAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentsExportTemplateAtSubscriptionScopeOptionalParams,
    ) => exportTemplateAtSubscriptionScope(context, deploymentName, options),
    whatIfAtSubscriptionScope: (
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
    ) => whatIfAtSubscriptionScope(context, deploymentName, parameters, options),
    beginWhatIfAtSubscriptionScope: async (
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
    ) => {
      const poller = whatIfAtSubscriptionScope(context, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAtSubscriptionScopeAndWait: async (
      deploymentName: string,
      parameters: DeploymentWhatIf,
      options?: DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
    ) => {
      return await whatIfAtSubscriptionScope(context, deploymentName, parameters, options);
    },
    validateAtSubscriptionScope: (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
    ) => validateAtSubscriptionScope(context, deploymentName, parameters, options),
    beginValidateAtSubscriptionScope: async (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
    ) => {
      const poller = validateAtSubscriptionScope(context, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAtSubscriptionScopeAndWait: async (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtSubscriptionScopeOptionalParams,
    ) => {
      return await validateAtSubscriptionScope(context, deploymentName, parameters, options);
    },
    cancelAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentsCancelAtSubscriptionScopeOptionalParams,
    ) => cancelAtSubscriptionScope(context, deploymentName, options),
    listAtSubscriptionScope: (options?: DeploymentsListAtSubscriptionScopeOptionalParams) =>
      listAtSubscriptionScope(context, options),
    deleteAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
    ) => deleteAtSubscriptionScope(context, deploymentName, options),
    beginDeleteAtSubscriptionScope: async (
      deploymentName: string,
      options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
    ) => {
      const poller = deleteAtSubscriptionScope(context, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtSubscriptionScopeAndWait: async (
      deploymentName: string,
      options?: DeploymentsDeleteAtSubscriptionScopeOptionalParams,
    ) => {
      return await deleteAtSubscriptionScope(context, deploymentName, options);
    },
    createOrUpdateAtSubscriptionScope: (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
    ) => createOrUpdateAtSubscriptionScope(context, deploymentName, parameters, options),
    beginCreateOrUpdateAtSubscriptionScope: async (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtSubscriptionScope(
        context,
        deploymentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtSubscriptionScopeAndWait: async (
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
    ) => {
      return await createOrUpdateAtSubscriptionScope(context, deploymentName, parameters, options);
    },
    checkExistenceAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams,
    ) => checkExistenceAtSubscriptionScope(context, deploymentName, options),
    getAtSubscriptionScope: (
      deploymentName: string,
      options?: DeploymentsGetAtSubscriptionScopeOptionalParams,
    ) => getAtSubscriptionScope(context, deploymentName, options),
    exportTemplateAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsExportTemplateAtManagementGroupScopeOptionalParams,
    ) => exportTemplateAtManagementGroupScope(context, groupId, deploymentName, options),
    whatIfAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
    ) => whatIfAtManagementGroupScope(context, groupId, deploymentName, parameters, options),
    beginWhatIfAtManagementGroupScope: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
    ) => {
      const poller = whatIfAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAtManagementGroupScopeAndWait: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
    ) => {
      return await whatIfAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
    },
    validateAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
    ) => validateAtManagementGroupScope(context, groupId, deploymentName, parameters, options),
    beginValidateAtManagementGroupScope: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
    ) => {
      const poller = validateAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAtManagementGroupScopeAndWait: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtManagementGroupScopeOptionalParams,
    ) => {
      return await validateAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
    },
    cancelAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsCancelAtManagementGroupScopeOptionalParams,
    ) => cancelAtManagementGroupScope(context, groupId, deploymentName, options),
    listAtManagementGroupScope: (
      groupId: string,
      options?: DeploymentsListAtManagementGroupScopeOptionalParams,
    ) => listAtManagementGroupScope(context, groupId, options),
    deleteAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
    ) => deleteAtManagementGroupScope(context, groupId, deploymentName, options),
    beginDeleteAtManagementGroupScope: async (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
    ) => {
      const poller = deleteAtManagementGroupScope(context, groupId, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtManagementGroupScopeAndWait: async (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtManagementGroupScopeOptionalParams,
    ) => {
      return await deleteAtManagementGroupScope(context, groupId, deploymentName, options);
    },
    createOrUpdateAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
    ) =>
      createOrUpdateAtManagementGroupScope(context, groupId, deploymentName, parameters, options),
    beginCreateOrUpdateAtManagementGroupScope: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtManagementGroupScopeAndWait: async (
      groupId: string,
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
    ) => {
      return await createOrUpdateAtManagementGroupScope(
        context,
        groupId,
        deploymentName,
        parameters,
        options,
      );
    },
    checkExistenceAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams,
    ) => checkExistenceAtManagementGroupScope(context, groupId, deploymentName, options),
    getAtManagementGroupScope: (
      groupId: string,
      deploymentName: string,
      options?: DeploymentsGetAtManagementGroupScopeOptionalParams,
    ) => getAtManagementGroupScope(context, groupId, deploymentName, options),
    listAtTenantScope: (options?: DeploymentsListAtTenantScopeOptionalParams) =>
      listAtTenantScope(context, options),
    exportTemplateAtTenantScope: (
      deploymentName: string,
      options?: DeploymentsExportTemplateAtTenantScopeOptionalParams,
    ) => exportTemplateAtTenantScope(context, deploymentName, options),
    whatIfAtTenantScope: (
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
    ) => whatIfAtTenantScope(context, deploymentName, parameters, options),
    beginWhatIfAtTenantScope: async (
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
    ) => {
      const poller = whatIfAtTenantScope(context, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAtTenantScopeAndWait: async (
      deploymentName: string,
      parameters: ScopedDeploymentWhatIf,
      options?: DeploymentsWhatIfAtTenantScopeOptionalParams,
    ) => {
      return await whatIfAtTenantScope(context, deploymentName, parameters, options);
    },
    validateAtTenantScope: (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtTenantScopeOptionalParams,
    ) => validateAtTenantScope(context, deploymentName, parameters, options),
    beginValidateAtTenantScope: async (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtTenantScopeOptionalParams,
    ) => {
      const poller = validateAtTenantScope(context, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAtTenantScopeAndWait: async (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsValidateAtTenantScopeOptionalParams,
    ) => {
      return await validateAtTenantScope(context, deploymentName, parameters, options);
    },
    cancelAtTenantScope: (
      deploymentName: string,
      options?: DeploymentsCancelAtTenantScopeOptionalParams,
    ) => cancelAtTenantScope(context, deploymentName, options),
    deleteAtTenantScope: (
      deploymentName: string,
      options?: DeploymentsDeleteAtTenantScopeOptionalParams,
    ) => deleteAtTenantScope(context, deploymentName, options),
    beginDeleteAtTenantScope: async (
      deploymentName: string,
      options?: DeploymentsDeleteAtTenantScopeOptionalParams,
    ) => {
      const poller = deleteAtTenantScope(context, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtTenantScopeAndWait: async (
      deploymentName: string,
      options?: DeploymentsDeleteAtTenantScopeOptionalParams,
    ) => {
      return await deleteAtTenantScope(context, deploymentName, options);
    },
    createOrUpdateAtTenantScope: (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
    ) => createOrUpdateAtTenantScope(context, deploymentName, parameters, options),
    beginCreateOrUpdateAtTenantScope: async (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtTenantScope(context, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtTenantScopeAndWait: async (
      deploymentName: string,
      parameters: ScopedDeployment,
      options?: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
    ) => {
      return await createOrUpdateAtTenantScope(context, deploymentName, parameters, options);
    },
    checkExistenceAtTenantScope: (
      deploymentName: string,
      options?: DeploymentsCheckExistenceAtTenantScopeOptionalParams,
    ) => checkExistenceAtTenantScope(context, deploymentName, options),
    getAtTenantScope: (
      deploymentName: string,
      options?: DeploymentsGetAtTenantScopeOptionalParams,
    ) => getAtTenantScope(context, deploymentName, options),
    exportTemplateAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentsExportTemplateAtScopeOptionalParams,
    ) => exportTemplateAtScope(context, scope, deploymentName, options),
    validateAtScope: (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtScopeOptionalParams,
    ) => validateAtScope(context, scope, deploymentName, parameters, options),
    beginValidateAtScope: async (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtScopeOptionalParams,
    ) => {
      const poller = validateAtScope(context, scope, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAtScopeAndWait: async (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsValidateAtScopeOptionalParams,
    ) => {
      return await validateAtScope(context, scope, deploymentName, parameters, options);
    },
    cancelAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentsCancelAtScopeOptionalParams,
    ) => cancelAtScope(context, scope, deploymentName, options),
    listAtScope: (scope: string, options?: DeploymentsListAtScopeOptionalParams) =>
      listAtScope(context, scope, options),
    deleteAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtScopeOptionalParams,
    ) => deleteAtScope(context, scope, deploymentName, options),
    beginDeleteAtScope: async (
      scope: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtScopeOptionalParams,
    ) => {
      const poller = deleteAtScope(context, scope, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAtScopeAndWait: async (
      scope: string,
      deploymentName: string,
      options?: DeploymentsDeleteAtScopeOptionalParams,
    ) => {
      return await deleteAtScope(context, scope, deploymentName, options);
    },
    createOrUpdateAtScope: (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
    ) => createOrUpdateAtScope(context, scope, deploymentName, parameters, options),
    beginCreateOrUpdateAtScope: async (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      const poller = createOrUpdateAtScope(context, scope, deploymentName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAtScopeAndWait: async (
      scope: string,
      deploymentName: string,
      parameters: Deployment,
      options?: DeploymentsCreateOrUpdateAtScopeOptionalParams,
    ) => {
      return await createOrUpdateAtScope(context, scope, deploymentName, parameters, options);
    },
    checkExistenceAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentsCheckExistenceAtScopeOptionalParams,
    ) => checkExistenceAtScope(context, scope, deploymentName, options),
    getAtScope: (
      scope: string,
      deploymentName: string,
      options?: DeploymentsGetAtScopeOptionalParams,
    ) => getAtScope(context, scope, deploymentName, options),
  };
}

export function _getDeploymentsOperations(context: DeploymentsContext): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
