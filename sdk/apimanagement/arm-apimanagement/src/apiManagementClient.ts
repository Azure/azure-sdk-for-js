// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext, ApiManagementClientOptionalParams } from "./api/index.js";
import { createApiManagement } from "./api/index.js";
import type { AllPoliciesOperations } from "./classic/allPolicies/index.js";
import { _getAllPoliciesOperations } from "./classic/allPolicies/index.js";
import type { ApiOperations } from "./classic/api/index.js";
import { _getApiOperations } from "./classic/api/index.js";
import type { ApiDiagnosticOperations } from "./classic/apiDiagnostic/index.js";
import { _getApiDiagnosticOperations } from "./classic/apiDiagnostic/index.js";
import type { ApiExportOperations } from "./classic/apiExport/index.js";
import { _getApiExportOperations } from "./classic/apiExport/index.js";
import type { ApiGatewayOperations } from "./classic/apiGateway/index.js";
import { _getApiGatewayOperations } from "./classic/apiGateway/index.js";
import type { ApiGatewayConfigConnectionOperations } from "./classic/apiGatewayConfigConnection/index.js";
import { _getApiGatewayConfigConnectionOperations } from "./classic/apiGatewayConfigConnection/index.js";
import type { ApiGatewayHostnameBindingOperations } from "./classic/apiGatewayHostnameBinding/index.js";
import { _getApiGatewayHostnameBindingOperations } from "./classic/apiGatewayHostnameBinding/index.js";
import type { ApiIssueOperations } from "./classic/apiIssue/index.js";
import { _getApiIssueOperations } from "./classic/apiIssue/index.js";
import type { ApiIssueAttachmentOperations } from "./classic/apiIssueAttachment/index.js";
import { _getApiIssueAttachmentOperations } from "./classic/apiIssueAttachment/index.js";
import type { ApiIssueCommentOperations } from "./classic/apiIssueComment/index.js";
import { _getApiIssueCommentOperations } from "./classic/apiIssueComment/index.js";
import type { ApiManagementGatewaySkusOperations } from "./classic/apiManagementGatewaySkus/index.js";
import { _getApiManagementGatewaySkusOperations } from "./classic/apiManagementGatewaySkus/index.js";
import type { ApiManagementOperationsOperations } from "./classic/apiManagementOperations/index.js";
import { _getApiManagementOperationsOperations } from "./classic/apiManagementOperations/index.js";
import type { ApiManagementServiceOperations } from "./classic/apiManagementService/index.js";
import { _getApiManagementServiceOperations } from "./classic/apiManagementService/index.js";
import type { ApiManagementServiceResourcesOperations } from "./classic/apiManagementServiceResources/index.js";
import { _getApiManagementServiceResourcesOperations } from "./classic/apiManagementServiceResources/index.js";
import type { ApiManagementServiceSkusOperations } from "./classic/apiManagementServiceSkus/index.js";
import { _getApiManagementServiceSkusOperations } from "./classic/apiManagementServiceSkus/index.js";
import type { ApiManagementSkusOperations } from "./classic/apiManagementSkus/index.js";
import { _getApiManagementSkusOperations } from "./classic/apiManagementSkus/index.js";
import type { ApiManagementWorkspaceLinkOperations } from "./classic/apiManagementWorkspaceLink/index.js";
import { _getApiManagementWorkspaceLinkOperations } from "./classic/apiManagementWorkspaceLink/index.js";
import type { ApiManagementWorkspaceLinksOperations } from "./classic/apiManagementWorkspaceLinks/index.js";
import { _getApiManagementWorkspaceLinksOperations } from "./classic/apiManagementWorkspaceLinks/index.js";
import type { ApiOperationOperations } from "./classic/apiOperation/index.js";
import { _getApiOperationOperations } from "./classic/apiOperation/index.js";
import type { ApiOperationPolicyOperations } from "./classic/apiOperationPolicy/index.js";
import { _getApiOperationPolicyOperations } from "./classic/apiOperationPolicy/index.js";
import type { ApiPolicyOperations } from "./classic/apiPolicy/index.js";
import { _getApiPolicyOperations } from "./classic/apiPolicy/index.js";
import type { ApiProductOperations } from "./classic/apiProduct/index.js";
import { _getApiProductOperations } from "./classic/apiProduct/index.js";
import type { ApiReleaseOperations } from "./classic/apiRelease/index.js";
import { _getApiReleaseOperations } from "./classic/apiRelease/index.js";
import type { ApiRevisionOperations } from "./classic/apiRevision/index.js";
import { _getApiRevisionOperations } from "./classic/apiRevision/index.js";
import type { ApiSchemaOperations } from "./classic/apiSchema/index.js";
import { _getApiSchemaOperations } from "./classic/apiSchema/index.js";
import type { ApiTagDescriptionOperations } from "./classic/apiTagDescription/index.js";
import { _getApiTagDescriptionOperations } from "./classic/apiTagDescription/index.js";
import type { ApiToolOperations } from "./classic/apiTool/index.js";
import { _getApiToolOperations } from "./classic/apiTool/index.js";
import type { ApiVersionSetOperations } from "./classic/apiVersionSet/index.js";
import { _getApiVersionSetOperations } from "./classic/apiVersionSet/index.js";
import type { ApiWikiOperations } from "./classic/apiWiki/index.js";
import { _getApiWikiOperations } from "./classic/apiWiki/index.js";
import type { ApiWikisOperations } from "./classic/apiWikis/index.js";
import { _getApiWikisOperations } from "./classic/apiWikis/index.js";
import type { AuthorizationOperations } from "./classic/authorization/index.js";
import { _getAuthorizationOperations } from "./classic/authorization/index.js";
import type { AuthorizationAccessPolicyOperations } from "./classic/authorizationAccessPolicy/index.js";
import { _getAuthorizationAccessPolicyOperations } from "./classic/authorizationAccessPolicy/index.js";
import type { AuthorizationLoginLinksOperations } from "./classic/authorizationLoginLinks/index.js";
import { _getAuthorizationLoginLinksOperations } from "./classic/authorizationLoginLinks/index.js";
import type { AuthorizationProviderOperations } from "./classic/authorizationProvider/index.js";
import { _getAuthorizationProviderOperations } from "./classic/authorizationProvider/index.js";
import type { AuthorizationServerOperations } from "./classic/authorizationServer/index.js";
import { _getAuthorizationServerOperations } from "./classic/authorizationServer/index.js";
import type { BackendOperations } from "./classic/backend/index.js";
import { _getBackendOperations } from "./classic/backend/index.js";
import type { CacheOperations } from "./classic/cache/index.js";
import { _getCacheOperations } from "./classic/cache/index.js";
import type { CertificateOperations } from "./classic/certificate/index.js";
import { _getCertificateOperations } from "./classic/certificate/index.js";
import type { ClientApplicationOperations } from "./classic/clientApplication/index.js";
import { _getClientApplicationOperations } from "./classic/clientApplication/index.js";
import type { ClientApplicationProductLinkOperations } from "./classic/clientApplicationProductLink/index.js";
import { _getClientApplicationProductLinkOperations } from "./classic/clientApplicationProductLink/index.js";
import type { ContentItemOperations } from "./classic/contentItem/index.js";
import { _getContentItemOperations } from "./classic/contentItem/index.js";
import type { ContentTypeOperations } from "./classic/contentType/index.js";
import { _getContentTypeOperations } from "./classic/contentType/index.js";
import type { DelegationSettingsOperations } from "./classic/delegationSettings/index.js";
import { _getDelegationSettingsOperations } from "./classic/delegationSettings/index.js";
import type { DeletedServicesOperations } from "./classic/deletedServices/index.js";
import { _getDeletedServicesOperations } from "./classic/deletedServices/index.js";
import type { DiagnosticOperations } from "./classic/diagnostic/index.js";
import { _getDiagnosticOperations } from "./classic/diagnostic/index.js";
import type { DocumentationOperations } from "./classic/documentation/index.js";
import { _getDocumentationOperations } from "./classic/documentation/index.js";
import type { EmailTemplateOperations } from "./classic/emailTemplate/index.js";
import { _getEmailTemplateOperations } from "./classic/emailTemplate/index.js";
import type { GatewayOperations } from "./classic/gateway/index.js";
import { _getGatewayOperations } from "./classic/gateway/index.js";
import type { GatewayApiOperations } from "./classic/gatewayApi/index.js";
import { _getGatewayApiOperations } from "./classic/gatewayApi/index.js";
import type { GatewayCertificateAuthorityOperations } from "./classic/gatewayCertificateAuthority/index.js";
import { _getGatewayCertificateAuthorityOperations } from "./classic/gatewayCertificateAuthority/index.js";
import type { GatewayHostnameConfigurationOperations } from "./classic/gatewayHostnameConfiguration/index.js";
import { _getGatewayHostnameConfigurationOperations } from "./classic/gatewayHostnameConfiguration/index.js";
import type { GlobalSchemaOperations } from "./classic/globalSchema/index.js";
import { _getGlobalSchemaOperations } from "./classic/globalSchema/index.js";
import type { GraphQLApiResolverOperations } from "./classic/graphQLApiResolver/index.js";
import { _getGraphQLApiResolverOperations } from "./classic/graphQLApiResolver/index.js";
import type { GraphQLApiResolverPolicyOperations } from "./classic/graphQLApiResolverPolicy/index.js";
import { _getGraphQLApiResolverPolicyOperations } from "./classic/graphQLApiResolverPolicy/index.js";
import type { GroupOperations } from "./classic/group/index.js";
import { _getGroupOperations } from "./classic/group/index.js";
import type { GroupUserOperations } from "./classic/groupUser/index.js";
import { _getGroupUserOperations } from "./classic/groupUser/index.js";
import type { IdentityProviderOperations } from "./classic/identityProvider/index.js";
import { _getIdentityProviderOperations } from "./classic/identityProvider/index.js";
import type { IssueOperations } from "./classic/issue/index.js";
import { _getIssueOperations } from "./classic/issue/index.js";
import type { LoggerOperations } from "./classic/logger/index.js";
import { _getLoggerOperations } from "./classic/logger/index.js";
import type { NamedValueOperations } from "./classic/namedValue/index.js";
import { _getNamedValueOperations } from "./classic/namedValue/index.js";
import type { NetworkStatusOperations } from "./classic/networkStatus/index.js";
import { _getNetworkStatusOperations } from "./classic/networkStatus/index.js";
import type { NotificationOperations } from "./classic/notification/index.js";
import { _getNotificationOperations } from "./classic/notification/index.js";
import type { NotificationRecipientEmailOperations } from "./classic/notificationRecipientEmail/index.js";
import { _getNotificationRecipientEmailOperations } from "./classic/notificationRecipientEmail/index.js";
import type { NotificationRecipientUserOperations } from "./classic/notificationRecipientUser/index.js";
import { _getNotificationRecipientUserOperations } from "./classic/notificationRecipientUser/index.js";
import type { OpenIdConnectProviderOperations } from "./classic/openIdConnectProvider/index.js";
import { _getOpenIdConnectProviderOperations } from "./classic/openIdConnectProvider/index.js";
import type { OperationOperations } from "./classic/operation/index.js";
import { _getOperationOperations } from "./classic/operation/index.js";
import type { OperationStatusOperations } from "./classic/operationStatus/index.js";
import { _getOperationStatusOperations } from "./classic/operationStatus/index.js";
import type { OperationsResultsOperations } from "./classic/operationsResults/index.js";
import { _getOperationsResultsOperations } from "./classic/operationsResults/index.js";
import type { OutboundNetworkDependenciesEndpointsOperations } from "./classic/outboundNetworkDependenciesEndpoints/index.js";
import { _getOutboundNetworkDependenciesEndpointsOperations } from "./classic/outboundNetworkDependenciesEndpoints/index.js";
import type { PolicyOperations } from "./classic/policy/index.js";
import { _getPolicyOperations } from "./classic/policy/index.js";
import type { PolicyDescriptionOperations } from "./classic/policyDescription/index.js";
import { _getPolicyDescriptionOperations } from "./classic/policyDescription/index.js";
import type { PolicyFragmentOperations } from "./classic/policyFragment/index.js";
import { _getPolicyFragmentOperations } from "./classic/policyFragment/index.js";
import type { PolicyRestrictionOperations } from "./classic/policyRestriction/index.js";
import { _getPolicyRestrictionOperations } from "./classic/policyRestriction/index.js";
import type { PolicyRestrictionValidationsOperations } from "./classic/policyRestrictionValidations/index.js";
import { _getPolicyRestrictionValidationsOperations } from "./classic/policyRestrictionValidations/index.js";
import type { PortalConfigOperations } from "./classic/portalConfig/index.js";
import { _getPortalConfigOperations } from "./classic/portalConfig/index.js";
import type { PortalRevisionOperations } from "./classic/portalRevision/index.js";
import { _getPortalRevisionOperations } from "./classic/portalRevision/index.js";
import type { PortalSettingsOperations } from "./classic/portalSettings/index.js";
import { _getPortalSettingsOperations } from "./classic/portalSettings/index.js";
import type { PrivateEndpointConnectionOperations } from "./classic/privateEndpointConnection/index.js";
import { _getPrivateEndpointConnectionOperations } from "./classic/privateEndpointConnection/index.js";
import type { ProductOperations } from "./classic/product/index.js";
import { _getProductOperations } from "./classic/product/index.js";
import type { ProductApiOperations } from "./classic/productApi/index.js";
import { _getProductApiOperations } from "./classic/productApi/index.js";
import type { ProductApiLinkOperations } from "./classic/productApiLink/index.js";
import { _getProductApiLinkOperations } from "./classic/productApiLink/index.js";
import type { ProductGroupOperations } from "./classic/productGroup/index.js";
import { _getProductGroupOperations } from "./classic/productGroup/index.js";
import type { ProductGroupLinkOperations } from "./classic/productGroupLink/index.js";
import { _getProductGroupLinkOperations } from "./classic/productGroupLink/index.js";
import type { ProductPolicyOperations } from "./classic/productPolicy/index.js";
import { _getProductPolicyOperations } from "./classic/productPolicy/index.js";
import type { ProductSubscriptionsOperations } from "./classic/productSubscriptions/index.js";
import { _getProductSubscriptionsOperations } from "./classic/productSubscriptions/index.js";
import type { ProductWikiOperations } from "./classic/productWiki/index.js";
import { _getProductWikiOperations } from "./classic/productWiki/index.js";
import type { ProductWikisOperations } from "./classic/productWikis/index.js";
import { _getProductWikisOperations } from "./classic/productWikis/index.js";
import type { QuotaByCounterKeysOperations } from "./classic/quotaByCounterKeys/index.js";
import { _getQuotaByCounterKeysOperations } from "./classic/quotaByCounterKeys/index.js";
import type { QuotaByPeriodKeysOperations } from "./classic/quotaByPeriodKeys/index.js";
import { _getQuotaByPeriodKeysOperations } from "./classic/quotaByPeriodKeys/index.js";
import type { RegionOperations } from "./classic/region/index.js";
import { _getRegionOperations } from "./classic/region/index.js";
import type { ReportsOperations } from "./classic/reports/index.js";
import { _getReportsOperations } from "./classic/reports/index.js";
import type { SignInSettingsOperations } from "./classic/signInSettings/index.js";
import { _getSignInSettingsOperations } from "./classic/signInSettings/index.js";
import type { SignUpSettingsOperations } from "./classic/signUpSettings/index.js";
import { _getSignUpSettingsOperations } from "./classic/signUpSettings/index.js";
import type { SubscriptionOperations } from "./classic/subscription/index.js";
import { _getSubscriptionOperations } from "./classic/subscription/index.js";
import type { TagOperations } from "./classic/tag/index.js";
import { _getTagOperations } from "./classic/tag/index.js";
import type { TagApiLinkOperations } from "./classic/tagApiLink/index.js";
import { _getTagApiLinkOperations } from "./classic/tagApiLink/index.js";
import type { TagOperationLinkOperations } from "./classic/tagOperationLink/index.js";
import { _getTagOperationLinkOperations } from "./classic/tagOperationLink/index.js";
import type { TagProductLinkOperations } from "./classic/tagProductLink/index.js";
import { _getTagProductLinkOperations } from "./classic/tagProductLink/index.js";
import type { TagResourceOperations } from "./classic/tagResource/index.js";
import { _getTagResourceOperations } from "./classic/tagResource/index.js";
import type { TenantAccessOperations } from "./classic/tenantAccess/index.js";
import { _getTenantAccessOperations } from "./classic/tenantAccess/index.js";
import type { TenantAccessGitOperations } from "./classic/tenantAccessGit/index.js";
import { _getTenantAccessGitOperations } from "./classic/tenantAccessGit/index.js";
import type { TenantConfigurationOperations } from "./classic/tenantConfiguration/index.js";
import { _getTenantConfigurationOperations } from "./classic/tenantConfiguration/index.js";
import type { TenantSettingsOperations } from "./classic/tenantSettings/index.js";
import { _getTenantSettingsOperations } from "./classic/tenantSettings/index.js";
import type { UserOperations } from "./classic/user/index.js";
import { _getUserOperations } from "./classic/user/index.js";
import type { UserConfirmationPasswordOperations } from "./classic/userConfirmationPassword/index.js";
import { _getUserConfirmationPasswordOperations } from "./classic/userConfirmationPassword/index.js";
import type { UserGroupOperations } from "./classic/userGroup/index.js";
import { _getUserGroupOperations } from "./classic/userGroup/index.js";
import type { UserIdentitiesOperations } from "./classic/userIdentities/index.js";
import { _getUserIdentitiesOperations } from "./classic/userIdentities/index.js";
import type { UserSubscriptionOperations } from "./classic/userSubscription/index.js";
import { _getUserSubscriptionOperations } from "./classic/userSubscription/index.js";
import type { WorkspaceOperations } from "./classic/workspace/index.js";
import { _getWorkspaceOperations } from "./classic/workspace/index.js";
import type { WorkspaceApiOperations } from "./classic/workspaceApi/index.js";
import { _getWorkspaceApiOperations } from "./classic/workspaceApi/index.js";
import type { WorkspaceApiDiagnosticOperations } from "./classic/workspaceApiDiagnostic/index.js";
import { _getWorkspaceApiDiagnosticOperations } from "./classic/workspaceApiDiagnostic/index.js";
import type { WorkspaceApiExportOperations } from "./classic/workspaceApiExport/index.js";
import { _getWorkspaceApiExportOperations } from "./classic/workspaceApiExport/index.js";
import type { WorkspaceApiOperationOperations } from "./classic/workspaceApiOperation/index.js";
import { _getWorkspaceApiOperationOperations } from "./classic/workspaceApiOperation/index.js";
import type { WorkspaceApiOperationPolicyOperations } from "./classic/workspaceApiOperationPolicy/index.js";
import { _getWorkspaceApiOperationPolicyOperations } from "./classic/workspaceApiOperationPolicy/index.js";
import type { WorkspaceApiPolicyOperations } from "./classic/workspaceApiPolicy/index.js";
import { _getWorkspaceApiPolicyOperations } from "./classic/workspaceApiPolicy/index.js";
import type { WorkspaceApiReleaseOperations } from "./classic/workspaceApiRelease/index.js";
import { _getWorkspaceApiReleaseOperations } from "./classic/workspaceApiRelease/index.js";
import type { WorkspaceApiRevisionOperations } from "./classic/workspaceApiRevision/index.js";
import { _getWorkspaceApiRevisionOperations } from "./classic/workspaceApiRevision/index.js";
import type { WorkspaceApiSchemaOperations } from "./classic/workspaceApiSchema/index.js";
import { _getWorkspaceApiSchemaOperations } from "./classic/workspaceApiSchema/index.js";
import type { WorkspaceApiVersionSetOperations } from "./classic/workspaceApiVersionSet/index.js";
import { _getWorkspaceApiVersionSetOperations } from "./classic/workspaceApiVersionSet/index.js";
import type { WorkspaceBackendOperations } from "./classic/workspaceBackend/index.js";
import { _getWorkspaceBackendOperations } from "./classic/workspaceBackend/index.js";
import type { WorkspaceCertificateOperations } from "./classic/workspaceCertificate/index.js";
import { _getWorkspaceCertificateOperations } from "./classic/workspaceCertificate/index.js";
import type { WorkspaceDiagnosticOperations } from "./classic/workspaceDiagnostic/index.js";
import { _getWorkspaceDiagnosticOperations } from "./classic/workspaceDiagnostic/index.js";
import type { WorkspaceGlobalSchemaOperations } from "./classic/workspaceGlobalSchema/index.js";
import { _getWorkspaceGlobalSchemaOperations } from "./classic/workspaceGlobalSchema/index.js";
import type { WorkspaceGroupOperations } from "./classic/workspaceGroup/index.js";
import { _getWorkspaceGroupOperations } from "./classic/workspaceGroup/index.js";
import type { WorkspaceGroupUserOperations } from "./classic/workspaceGroupUser/index.js";
import { _getWorkspaceGroupUserOperations } from "./classic/workspaceGroupUser/index.js";
import type { WorkspaceLoggerOperations } from "./classic/workspaceLogger/index.js";
import { _getWorkspaceLoggerOperations } from "./classic/workspaceLogger/index.js";
import type { WorkspaceNamedValueOperations } from "./classic/workspaceNamedValue/index.js";
import { _getWorkspaceNamedValueOperations } from "./classic/workspaceNamedValue/index.js";
import type { WorkspaceNotificationOperations } from "./classic/workspaceNotification/index.js";
import { _getWorkspaceNotificationOperations } from "./classic/workspaceNotification/index.js";
import type { WorkspaceNotificationRecipientEmailOperations } from "./classic/workspaceNotificationRecipientEmail/index.js";
import { _getWorkspaceNotificationRecipientEmailOperations } from "./classic/workspaceNotificationRecipientEmail/index.js";
import type { WorkspaceNotificationRecipientUserOperations } from "./classic/workspaceNotificationRecipientUser/index.js";
import { _getWorkspaceNotificationRecipientUserOperations } from "./classic/workspaceNotificationRecipientUser/index.js";
import type { WorkspacePolicyOperations } from "./classic/workspacePolicy/index.js";
import { _getWorkspacePolicyOperations } from "./classic/workspacePolicy/index.js";
import type { WorkspacePolicyFragmentOperations } from "./classic/workspacePolicyFragment/index.js";
import { _getWorkspacePolicyFragmentOperations } from "./classic/workspacePolicyFragment/index.js";
import type { WorkspaceProductOperations } from "./classic/workspaceProduct/index.js";
import { _getWorkspaceProductOperations } from "./classic/workspaceProduct/index.js";
import type { WorkspaceProductApiLinkOperations } from "./classic/workspaceProductApiLink/index.js";
import { _getWorkspaceProductApiLinkOperations } from "./classic/workspaceProductApiLink/index.js";
import type { WorkspaceProductGroupLinkOperations } from "./classic/workspaceProductGroupLink/index.js";
import { _getWorkspaceProductGroupLinkOperations } from "./classic/workspaceProductGroupLink/index.js";
import type { WorkspaceProductPolicyOperations } from "./classic/workspaceProductPolicy/index.js";
import { _getWorkspaceProductPolicyOperations } from "./classic/workspaceProductPolicy/index.js";
import type { WorkspaceSubscriptionOperations } from "./classic/workspaceSubscription/index.js";
import { _getWorkspaceSubscriptionOperations } from "./classic/workspaceSubscription/index.js";
import type { WorkspaceTagOperations } from "./classic/workspaceTag/index.js";
import { _getWorkspaceTagOperations } from "./classic/workspaceTag/index.js";
import type { WorkspaceTagApiLinkOperations } from "./classic/workspaceTagApiLink/index.js";
import { _getWorkspaceTagApiLinkOperations } from "./classic/workspaceTagApiLink/index.js";
import type { WorkspaceTagOperationLinkOperations } from "./classic/workspaceTagOperationLink/index.js";
import { _getWorkspaceTagOperationLinkOperations } from "./classic/workspaceTagOperationLink/index.js";
import type { WorkspaceTagProductLinkOperations } from "./classic/workspaceTagProductLink/index.js";
import { _getWorkspaceTagProductLinkOperations } from "./classic/workspaceTagProductLink/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ApiManagementClientOptionalParams } from "./api/apiManagementContext.js";

export class ApiManagementClient {
  private _client: ApiManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ApiManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ApiManagementClientOptionalParams,
  );
  /** Resource provider operation status. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ApiManagementClientOptionalParams,
    options?: ApiManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createApiManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationsResults = _getOperationsResultsOperations(this._client);
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.workspaceApiExport = _getWorkspaceApiExportOperations(this._client);
    this.apiManagementSkus = _getApiManagementSkusOperations(this._client);
    this.apiExport = _getApiExportOperations(this._client);
    this.workspace = _getWorkspaceOperations(this._client);
    this.apiManagementWorkspaceLinks = _getApiManagementWorkspaceLinksOperations(this._client);
    this.apiManagementWorkspaceLink = _getApiManagementWorkspaceLinkOperations(this._client);
    this.userConfirmationPassword = _getUserConfirmationPasswordOperations(this._client);
    this.userIdentities = _getUserIdentitiesOperations(this._client);
    this.userGroup = _getUserGroupOperations(this._client);
    this.user = _getUserOperations(this._client);
    this.tenantConfiguration = _getTenantConfigurationOperations(this._client);
    this.tenantAccessGit = _getTenantAccessGitOperations(this._client);
    this.tenantAccess = _getTenantAccessOperations(this._client);
    this.tagProductLink = _getTagProductLinkOperations(this._client);
    this.tagOperationLink = _getTagOperationLinkOperations(this._client);
    this.tagApiLink = _getTagApiLinkOperations(this._client);
    this.subscription = _getSubscriptionOperations(this._client);
    this.tenantSettings = _getTenantSettingsOperations(this._client);
    this.globalSchema = _getGlobalSchemaOperations(this._client);
    this.productGroupLink = _getProductGroupLinkOperations(this._client);
    this.productApiLink = _getProductApiLinkOperations(this._client);
    this.productSubscriptions = _getProductSubscriptionsOperations(this._client);
    this.productGroup = _getProductGroupOperations(this._client);
    this.productApi = _getProductApiOperations(this._client);
    this.privateEndpointConnection = _getPrivateEndpointConnectionOperations(this._client);
    this.portalRevision = _getPortalRevisionOperations(this._client);
    this.clientApplicationProductLink = _getClientApplicationProductLinkOperations(this._client);
    this.clientApplication = _getClientApplicationOperations(this._client);
    this.portalConfig = _getPortalConfigOperations(this._client);
    this.policyRestriction = _getPolicyRestrictionOperations(this._client);
    this.policyFragment = _getPolicyFragmentOperations(this._client);
    this.openIdConnectProvider = _getOpenIdConnectProviderOperations(this._client);
    this.workspaceNotificationRecipientEmail = _getWorkspaceNotificationRecipientEmailOperations(
      this._client,
    );
    this.workspaceNotificationRecipientUser = _getWorkspaceNotificationRecipientUserOperations(
      this._client,
    );
    this.notificationRecipientEmail = _getNotificationRecipientEmailOperations(this._client);
    this.notificationRecipientUser = _getNotificationRecipientUserOperations(this._client);
    this.notification = _getNotificationOperations(this._client);
    this.namedValue = _getNamedValueOperations(this._client);
    this.logger = _getLoggerOperations(this._client);
    this.identityProvider = _getIdentityProviderOperations(this._client);
    this.workspaceGroupUser = _getWorkspaceGroupUserOperations(this._client);
    this.groupUser = _getGroupUserOperations(this._client);
    this.group = _getGroupOperations(this._client);
    this.gatewayCertificateAuthority = _getGatewayCertificateAuthorityOperations(this._client);
    this.gatewayHostnameConfiguration = _getGatewayHostnameConfigurationOperations(this._client);
    this.gatewayApi = _getGatewayApiOperations(this._client);
    this.gateway = _getGatewayOperations(this._client);
    this.apiGatewayHostnameBinding = _getApiGatewayHostnameBindingOperations(this._client);
    this.apiGatewayConfigConnection = _getApiGatewayConfigConnectionOperations(this._client);
    this.emailTemplate = _getEmailTemplateOperations(this._client);
    this.documentation = _getDocumentationOperations(this._client);
    this.deletedServices = _getDeletedServicesOperations(this._client);
    this.contentItem = _getContentItemOperations(this._client);
    this.contentType = _getContentTypeOperations(this._client);
    this.certificate = _getCertificateOperations(this._client);
    this.cache = _getCacheOperations(this._client);
    this.backend = _getBackendOperations(this._client);
    this.authorizationServer = _getAuthorizationServerOperations(this._client);
    this.authorizationAccessPolicy = _getAuthorizationAccessPolicyOperations(this._client);
    this.authorizationLoginLinks = _getAuthorizationLoginLinksOperations(this._client);
    this.authorization = _getAuthorizationOperations(this._client);
    this.authorizationProvider = _getAuthorizationProviderOperations(this._client);
    this.apiVersionSet = _getApiVersionSetOperations(this._client);
    this.apiTool = _getApiToolOperations(this._client);
    this.productWikis = _getProductWikisOperations(this._client);
    this.apiWikis = _getApiWikisOperations(this._client);
    this.apiWiki = _getApiWikiOperations(this._client);
    this.apiTagDescription = _getApiTagDescriptionOperations(this._client);
    this.apiIssueAttachment = _getApiIssueAttachmentOperations(this._client);
    this.apiIssueComment = _getApiIssueCommentOperations(this._client);
    this.apiIssue = _getApiIssueOperations(this._client);
    this.apiDiagnostic = _getApiDiagnosticOperations(this._client);
    this.apiSchema = _getApiSchemaOperations(this._client);
    this.graphQLApiResolver = _getGraphQLApiResolverOperations(this._client);
    this.apiOperationPolicy = _getApiOperationPolicyOperations(this._client);
    this.apiOperation = _getApiOperationOperations(this._client);
    this.apiRelease = _getApiReleaseOperations(this._client);
    this.tagResource = _getTagResourceOperations(this._client);
    this.reports = _getReportsOperations(this._client);
    this.region = _getRegionOperations(this._client);
    this.quotaByPeriodKeys = _getQuotaByPeriodKeysOperations(this._client);
    this.quotaByCounterKeys = _getQuotaByCounterKeysOperations(this._client);
    this.product = _getProductOperations(this._client);
    this.portalSettings = _getPortalSettingsOperations(this._client);
    this.policyRestrictionValidations = _getPolicyRestrictionValidationsOperations(this._client);
    this.policyDescription = _getPolicyDescriptionOperations(this._client);
    this.outboundNetworkDependenciesEndpoints = _getOutboundNetworkDependenciesEndpointsOperations(
      this._client,
    );
    this.networkStatus = _getNetworkStatusOperations(this._client);
    this.apiManagementServiceSkus = _getApiManagementServiceSkusOperations(this._client);
    this.allPolicies = _getAllPoliciesOperations(this._client);
    this.apiManagementService = _getApiManagementServiceOperations(this._client);
    this.workspaceApiRevision = _getWorkspaceApiRevisionOperations(this._client);
    this.operation = _getOperationOperations(this._client);
    this.apiProduct = _getApiProductOperations(this._client);
    this.apiRevision = _getApiRevisionOperations(this._client);
    this.api = _getApiOperations(this._client);
    this.apiManagementGatewaySkus = _getApiManagementGatewaySkusOperations(this._client);
    this.apiGateway = _getApiGatewayOperations(this._client);
    this.apiManagementOperations = _getApiManagementOperationsOperations(this._client);
    this.workspaceTagProductLink = _getWorkspaceTagProductLinkOperations(this._client);
    this.workspaceTagOperationLink = _getWorkspaceTagOperationLinkOperations(this._client);
    this.workspaceTagApiLink = _getWorkspaceTagApiLinkOperations(this._client);
    this.workspaceSubscription = _getWorkspaceSubscriptionOperations(this._client);
    this.userSubscription = _getUserSubscriptionOperations(this._client);
    this.workspaceGlobalSchema = _getWorkspaceGlobalSchemaOperations(this._client);
    this.workspaceProductGroupLink = _getWorkspaceProductGroupLinkOperations(this._client);
    this.workspaceProductApiLink = _getWorkspaceProductApiLinkOperations(this._client);
    this.workspaceProduct = _getWorkspaceProductOperations(this._client);
    this.delegationSettings = _getDelegationSettingsOperations(this._client);
    this.signUpSettings = _getSignUpSettingsOperations(this._client);
    this.signInSettings = _getSignInSettingsOperations(this._client);
    this.workspacePolicyFragment = _getWorkspacePolicyFragmentOperations(this._client);
    this.workspaceNotification = _getWorkspaceNotificationOperations(this._client);
    this.workspaceNamedValue = _getWorkspaceNamedValueOperations(this._client);
    this.workspaceLogger = _getWorkspaceLoggerOperations(this._client);
    this.workspaceGroup = _getWorkspaceGroupOperations(this._client);
    this.workspaceCertificate = _getWorkspaceCertificateOperations(this._client);
    this.workspaceBackend = _getWorkspaceBackendOperations(this._client);
    this.workspaceApiVersionSet = _getWorkspaceApiVersionSetOperations(this._client);
    this.productWiki = _getProductWikiOperations(this._client);
    this.issue = _getIssueOperations(this._client);
    this.workspaceApiDiagnostic = _getWorkspaceApiDiagnosticOperations(this._client);
    this.workspaceDiagnostic = _getWorkspaceDiagnosticOperations(this._client);
    this.diagnostic = _getDiagnosticOperations(this._client);
    this.workspaceApiSchema = _getWorkspaceApiSchemaOperations(this._client);
    this.workspaceTag = _getWorkspaceTagOperations(this._client);
    this.tag = _getTagOperations(this._client);
    this.workspaceProductPolicy = _getWorkspaceProductPolicyOperations(this._client);
    this.workspaceApiPolicy = _getWorkspaceApiPolicyOperations(this._client);
    this.workspaceApiOperationPolicy = _getWorkspaceApiOperationPolicyOperations(this._client);
    this.workspacePolicy = _getWorkspacePolicyOperations(this._client);
    this.productPolicy = _getProductPolicyOperations(this._client);
    this.policy = _getPolicyOperations(this._client);
    this.apiPolicy = _getApiPolicyOperations(this._client);
    this.graphQLApiResolverPolicy = _getGraphQLApiResolverPolicyOperations(this._client);
    this.workspaceApiOperation = _getWorkspaceApiOperationOperations(this._client);
    this.workspaceApiRelease = _getWorkspaceApiReleaseOperations(this._client);
    this.apiManagementServiceResources = _getApiManagementServiceResourcesOperations(this._client);
    this.workspaceApi = _getWorkspaceApiOperations(this._client);
  }

  /** The operation groups for operationsResults */
  public readonly operationsResults: OperationsResultsOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for workspaceApiExport */
  public readonly workspaceApiExport: WorkspaceApiExportOperations;
  /** The operation groups for apiManagementSkus */
  public readonly apiManagementSkus: ApiManagementSkusOperations;
  /** The operation groups for apiExport */
  public readonly apiExport: ApiExportOperations;
  /** The operation groups for workspace */
  public readonly workspace: WorkspaceOperations;
  /** The operation groups for apiManagementWorkspaceLinks */
  public readonly apiManagementWorkspaceLinks: ApiManagementWorkspaceLinksOperations;
  /** The operation groups for apiManagementWorkspaceLink */
  public readonly apiManagementWorkspaceLink: ApiManagementWorkspaceLinkOperations;
  /** The operation groups for userConfirmationPassword */
  public readonly userConfirmationPassword: UserConfirmationPasswordOperations;
  /** The operation groups for userIdentities */
  public readonly userIdentities: UserIdentitiesOperations;
  /** The operation groups for userGroup */
  public readonly userGroup: UserGroupOperations;
  /** The operation groups for user */
  public readonly user: UserOperations;
  /** The operation groups for tenantConfiguration */
  public readonly tenantConfiguration: TenantConfigurationOperations;
  /** The operation groups for tenantAccessGit */
  public readonly tenantAccessGit: TenantAccessGitOperations;
  /** The operation groups for tenantAccess */
  public readonly tenantAccess: TenantAccessOperations;
  /** The operation groups for tagProductLink */
  public readonly tagProductLink: TagProductLinkOperations;
  /** The operation groups for tagOperationLink */
  public readonly tagOperationLink: TagOperationLinkOperations;
  /** The operation groups for tagApiLink */
  public readonly tagApiLink: TagApiLinkOperations;
  /** The operation groups for subscription */
  public readonly subscription: SubscriptionOperations;
  /** The operation groups for tenantSettings */
  public readonly tenantSettings: TenantSettingsOperations;
  /** The operation groups for globalSchema */
  public readonly globalSchema: GlobalSchemaOperations;
  /** The operation groups for productGroupLink */
  public readonly productGroupLink: ProductGroupLinkOperations;
  /** The operation groups for productApiLink */
  public readonly productApiLink: ProductApiLinkOperations;
  /** The operation groups for productSubscriptions */
  public readonly productSubscriptions: ProductSubscriptionsOperations;
  /** The operation groups for productGroup */
  public readonly productGroup: ProductGroupOperations;
  /** The operation groups for productApi */
  public readonly productApi: ProductApiOperations;
  /** The operation groups for privateEndpointConnection */
  public readonly privateEndpointConnection: PrivateEndpointConnectionOperations;
  /** The operation groups for portalRevision */
  public readonly portalRevision: PortalRevisionOperations;
  /** The operation groups for clientApplicationProductLink */
  public readonly clientApplicationProductLink: ClientApplicationProductLinkOperations;
  /** The operation groups for clientApplication */
  public readonly clientApplication: ClientApplicationOperations;
  /** The operation groups for portalConfig */
  public readonly portalConfig: PortalConfigOperations;
  /** The operation groups for policyRestriction */
  public readonly policyRestriction: PolicyRestrictionOperations;
  /** The operation groups for policyFragment */
  public readonly policyFragment: PolicyFragmentOperations;
  /** The operation groups for openIdConnectProvider */
  public readonly openIdConnectProvider: OpenIdConnectProviderOperations;
  /** The operation groups for workspaceNotificationRecipientEmail */
  public readonly workspaceNotificationRecipientEmail: WorkspaceNotificationRecipientEmailOperations;
  /** The operation groups for workspaceNotificationRecipientUser */
  public readonly workspaceNotificationRecipientUser: WorkspaceNotificationRecipientUserOperations;
  /** The operation groups for notificationRecipientEmail */
  public readonly notificationRecipientEmail: NotificationRecipientEmailOperations;
  /** The operation groups for notificationRecipientUser */
  public readonly notificationRecipientUser: NotificationRecipientUserOperations;
  /** The operation groups for notification */
  public readonly notification: NotificationOperations;
  /** The operation groups for namedValue */
  public readonly namedValue: NamedValueOperations;
  /** The operation groups for logger */
  public readonly logger: LoggerOperations;
  /** The operation groups for identityProvider */
  public readonly identityProvider: IdentityProviderOperations;
  /** The operation groups for workspaceGroupUser */
  public readonly workspaceGroupUser: WorkspaceGroupUserOperations;
  /** The operation groups for groupUser */
  public readonly groupUser: GroupUserOperations;
  /** The operation groups for group */
  public readonly group: GroupOperations;
  /** The operation groups for gatewayCertificateAuthority */
  public readonly gatewayCertificateAuthority: GatewayCertificateAuthorityOperations;
  /** The operation groups for gatewayHostnameConfiguration */
  public readonly gatewayHostnameConfiguration: GatewayHostnameConfigurationOperations;
  /** The operation groups for gatewayApi */
  public readonly gatewayApi: GatewayApiOperations;
  /** The operation groups for gateway */
  public readonly gateway: GatewayOperations;
  /** The operation groups for apiGatewayHostnameBinding */
  public readonly apiGatewayHostnameBinding: ApiGatewayHostnameBindingOperations;
  /** The operation groups for apiGatewayConfigConnection */
  public readonly apiGatewayConfigConnection: ApiGatewayConfigConnectionOperations;
  /** The operation groups for emailTemplate */
  public readonly emailTemplate: EmailTemplateOperations;
  /** The operation groups for documentation */
  public readonly documentation: DocumentationOperations;
  /** The operation groups for deletedServices */
  public readonly deletedServices: DeletedServicesOperations;
  /** The operation groups for contentItem */
  public readonly contentItem: ContentItemOperations;
  /** The operation groups for contentType */
  public readonly contentType: ContentTypeOperations;
  /** The operation groups for certificate */
  public readonly certificate: CertificateOperations;
  /** The operation groups for cache */
  public readonly cache: CacheOperations;
  /** The operation groups for backend */
  public readonly backend: BackendOperations;
  /** The operation groups for authorizationServer */
  public readonly authorizationServer: AuthorizationServerOperations;
  /** The operation groups for authorizationAccessPolicy */
  public readonly authorizationAccessPolicy: AuthorizationAccessPolicyOperations;
  /** The operation groups for authorizationLoginLinks */
  public readonly authorizationLoginLinks: AuthorizationLoginLinksOperations;
  /** The operation groups for authorization */
  public readonly authorization: AuthorizationOperations;
  /** The operation groups for authorizationProvider */
  public readonly authorizationProvider: AuthorizationProviderOperations;
  /** The operation groups for apiVersionSet */
  public readonly apiVersionSet: ApiVersionSetOperations;
  /** The operation groups for apiTool */
  public readonly apiTool: ApiToolOperations;
  /** The operation groups for productWikis */
  public readonly productWikis: ProductWikisOperations;
  /** The operation groups for apiWikis */
  public readonly apiWikis: ApiWikisOperations;
  /** The operation groups for apiWiki */
  public readonly apiWiki: ApiWikiOperations;
  /** The operation groups for apiTagDescription */
  public readonly apiTagDescription: ApiTagDescriptionOperations;
  /** The operation groups for apiIssueAttachment */
  public readonly apiIssueAttachment: ApiIssueAttachmentOperations;
  /** The operation groups for apiIssueComment */
  public readonly apiIssueComment: ApiIssueCommentOperations;
  /** The operation groups for apiIssue */
  public readonly apiIssue: ApiIssueOperations;
  /** The operation groups for apiDiagnostic */
  public readonly apiDiagnostic: ApiDiagnosticOperations;
  /** The operation groups for apiSchema */
  public readonly apiSchema: ApiSchemaOperations;
  /** The operation groups for graphQLApiResolver */
  public readonly graphQLApiResolver: GraphQLApiResolverOperations;
  /** The operation groups for apiOperationPolicy */
  public readonly apiOperationPolicy: ApiOperationPolicyOperations;
  /** The operation groups for apiOperation */
  public readonly apiOperation: ApiOperationOperations;
  /** The operation groups for apiRelease */
  public readonly apiRelease: ApiReleaseOperations;
  /** The operation groups for tagResource */
  public readonly tagResource: TagResourceOperations;
  /** The operation groups for reports */
  public readonly reports: ReportsOperations;
  /** The operation groups for region */
  public readonly region: RegionOperations;
  /** The operation groups for quotaByPeriodKeys */
  public readonly quotaByPeriodKeys: QuotaByPeriodKeysOperations;
  /** The operation groups for quotaByCounterKeys */
  public readonly quotaByCounterKeys: QuotaByCounterKeysOperations;
  /** The operation groups for product */
  public readonly product: ProductOperations;
  /** The operation groups for portalSettings */
  public readonly portalSettings: PortalSettingsOperations;
  /** The operation groups for policyRestrictionValidations */
  public readonly policyRestrictionValidations: PolicyRestrictionValidationsOperations;
  /** The operation groups for policyDescription */
  public readonly policyDescription: PolicyDescriptionOperations;
  /** The operation groups for outboundNetworkDependenciesEndpoints */
  public readonly outboundNetworkDependenciesEndpoints: OutboundNetworkDependenciesEndpointsOperations;
  /** The operation groups for networkStatus */
  public readonly networkStatus: NetworkStatusOperations;
  /** The operation groups for apiManagementServiceSkus */
  public readonly apiManagementServiceSkus: ApiManagementServiceSkusOperations;
  /** The operation groups for allPolicies */
  public readonly allPolicies: AllPoliciesOperations;
  /** The operation groups for apiManagementService */
  public readonly apiManagementService: ApiManagementServiceOperations;
  /** The operation groups for workspaceApiRevision */
  public readonly workspaceApiRevision: WorkspaceApiRevisionOperations;
  /** The operation groups for operation */
  public readonly operation: OperationOperations;
  /** The operation groups for apiProduct */
  public readonly apiProduct: ApiProductOperations;
  /** The operation groups for apiRevision */
  public readonly apiRevision: ApiRevisionOperations;
  /** The operation groups for api */
  public readonly api: ApiOperations;
  /** The operation groups for apiManagementGatewaySkus */
  public readonly apiManagementGatewaySkus: ApiManagementGatewaySkusOperations;
  /** The operation groups for apiGateway */
  public readonly apiGateway: ApiGatewayOperations;
  /** The operation groups for apiManagementOperations */
  public readonly apiManagementOperations: ApiManagementOperationsOperations;
  /** The operation groups for workspaceTagProductLink */
  public readonly workspaceTagProductLink: WorkspaceTagProductLinkOperations;
  /** The operation groups for workspaceTagOperationLink */
  public readonly workspaceTagOperationLink: WorkspaceTagOperationLinkOperations;
  /** The operation groups for workspaceTagApiLink */
  public readonly workspaceTagApiLink: WorkspaceTagApiLinkOperations;
  /** The operation groups for workspaceSubscription */
  public readonly workspaceSubscription: WorkspaceSubscriptionOperations;
  /** The operation groups for userSubscription */
  public readonly userSubscription: UserSubscriptionOperations;
  /** The operation groups for workspaceGlobalSchema */
  public readonly workspaceGlobalSchema: WorkspaceGlobalSchemaOperations;
  /** The operation groups for workspaceProductGroupLink */
  public readonly workspaceProductGroupLink: WorkspaceProductGroupLinkOperations;
  /** The operation groups for workspaceProductApiLink */
  public readonly workspaceProductApiLink: WorkspaceProductApiLinkOperations;
  /** The operation groups for workspaceProduct */
  public readonly workspaceProduct: WorkspaceProductOperations;
  /** The operation groups for delegationSettings */
  public readonly delegationSettings: DelegationSettingsOperations;
  /** The operation groups for signUpSettings */
  public readonly signUpSettings: SignUpSettingsOperations;
  /** The operation groups for signInSettings */
  public readonly signInSettings: SignInSettingsOperations;
  /** The operation groups for workspacePolicyFragment */
  public readonly workspacePolicyFragment: WorkspacePolicyFragmentOperations;
  /** The operation groups for workspaceNotification */
  public readonly workspaceNotification: WorkspaceNotificationOperations;
  /** The operation groups for workspaceNamedValue */
  public readonly workspaceNamedValue: WorkspaceNamedValueOperations;
  /** The operation groups for workspaceLogger */
  public readonly workspaceLogger: WorkspaceLoggerOperations;
  /** The operation groups for workspaceGroup */
  public readonly workspaceGroup: WorkspaceGroupOperations;
  /** The operation groups for workspaceCertificate */
  public readonly workspaceCertificate: WorkspaceCertificateOperations;
  /** The operation groups for workspaceBackend */
  public readonly workspaceBackend: WorkspaceBackendOperations;
  /** The operation groups for workspaceApiVersionSet */
  public readonly workspaceApiVersionSet: WorkspaceApiVersionSetOperations;
  /** The operation groups for productWiki */
  public readonly productWiki: ProductWikiOperations;
  /** The operation groups for issue */
  public readonly issue: IssueOperations;
  /** The operation groups for workspaceApiDiagnostic */
  public readonly workspaceApiDiagnostic: WorkspaceApiDiagnosticOperations;
  /** The operation groups for workspaceDiagnostic */
  public readonly workspaceDiagnostic: WorkspaceDiagnosticOperations;
  /** The operation groups for diagnostic */
  public readonly diagnostic: DiagnosticOperations;
  /** The operation groups for workspaceApiSchema */
  public readonly workspaceApiSchema: WorkspaceApiSchemaOperations;
  /** The operation groups for workspaceTag */
  public readonly workspaceTag: WorkspaceTagOperations;
  /** The operation groups for tag */
  public readonly tag: TagOperations;
  /** The operation groups for workspaceProductPolicy */
  public readonly workspaceProductPolicy: WorkspaceProductPolicyOperations;
  /** The operation groups for workspaceApiPolicy */
  public readonly workspaceApiPolicy: WorkspaceApiPolicyOperations;
  /** The operation groups for workspaceApiOperationPolicy */
  public readonly workspaceApiOperationPolicy: WorkspaceApiOperationPolicyOperations;
  /** The operation groups for workspacePolicy */
  public readonly workspacePolicy: WorkspacePolicyOperations;
  /** The operation groups for productPolicy */
  public readonly productPolicy: ProductPolicyOperations;
  /** The operation groups for policy */
  public readonly policy: PolicyOperations;
  /** The operation groups for apiPolicy */
  public readonly apiPolicy: ApiPolicyOperations;
  /** The operation groups for graphQLApiResolverPolicy */
  public readonly graphQLApiResolverPolicy: GraphQLApiResolverPolicyOperations;
  /** The operation groups for workspaceApiOperation */
  public readonly workspaceApiOperation: WorkspaceApiOperationOperations;
  /** The operation groups for workspaceApiRelease */
  public readonly workspaceApiRelease: WorkspaceApiReleaseOperations;
  /** The operation groups for apiManagementServiceResources */
  public readonly apiManagementServiceResources: ApiManagementServiceResourcesOperations;
  /** The operation groups for workspaceApi */
  public readonly workspaceApi: WorkspaceApiOperations;
}
