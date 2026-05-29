// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiManagementContext,
  ApiManagementClientOptionalParams,
  createApiManagement,
} from "./api/index.js";
import { AllPoliciesOperations, _getAllPoliciesOperations } from "./classic/allPolicies/index.js";
import { ApiOperations, _getApiOperations } from "./classic/api/index.js";
import {
  ApiDiagnosticOperations,
  _getApiDiagnosticOperations,
} from "./classic/apiDiagnostic/index.js";
import { ApiExportOperations, _getApiExportOperations } from "./classic/apiExport/index.js";
import { ApiGatewayOperations, _getApiGatewayOperations } from "./classic/apiGateway/index.js";
import {
  ApiGatewayConfigConnectionOperations,
  _getApiGatewayConfigConnectionOperations,
} from "./classic/apiGatewayConfigConnection/index.js";
import {
  ApiGatewayHostnameBindingOperations,
  _getApiGatewayHostnameBindingOperations,
} from "./classic/apiGatewayHostnameBinding/index.js";
import { ApiIssueOperations, _getApiIssueOperations } from "./classic/apiIssue/index.js";
import {
  ApiIssueAttachmentOperations,
  _getApiIssueAttachmentOperations,
} from "./classic/apiIssueAttachment/index.js";
import {
  ApiIssueCommentOperations,
  _getApiIssueCommentOperations,
} from "./classic/apiIssueComment/index.js";
import {
  ApiManagementGatewaySkusOperations,
  _getApiManagementGatewaySkusOperations,
} from "./classic/apiManagementGatewaySkus/index.js";
import {
  ApiManagementOperationsOperations,
  _getApiManagementOperationsOperations,
} from "./classic/apiManagementOperations/index.js";
import {
  ApiManagementServiceOperations,
  _getApiManagementServiceOperations,
} from "./classic/apiManagementService/index.js";
import {
  ApiManagementServiceResourcesOperations,
  _getApiManagementServiceResourcesOperations,
} from "./classic/apiManagementServiceResources/index.js";
import {
  ApiManagementServiceSkusOperations,
  _getApiManagementServiceSkusOperations,
} from "./classic/apiManagementServiceSkus/index.js";
import {
  ApiManagementSkusOperations,
  _getApiManagementSkusOperations,
} from "./classic/apiManagementSkus/index.js";
import {
  ApiManagementWorkspaceLinkOperations,
  _getApiManagementWorkspaceLinkOperations,
} from "./classic/apiManagementWorkspaceLink/index.js";
import {
  ApiManagementWorkspaceLinksOperations,
  _getApiManagementWorkspaceLinksOperations,
} from "./classic/apiManagementWorkspaceLinks/index.js";
import {
  ApiOperationOperations,
  _getApiOperationOperations,
} from "./classic/apiOperation/index.js";
import {
  ApiOperationPolicyOperations,
  _getApiOperationPolicyOperations,
} from "./classic/apiOperationPolicy/index.js";
import { ApiPolicyOperations, _getApiPolicyOperations } from "./classic/apiPolicy/index.js";
import { ApiProductOperations, _getApiProductOperations } from "./classic/apiProduct/index.js";
import { ApiReleaseOperations, _getApiReleaseOperations } from "./classic/apiRelease/index.js";
import { ApiRevisionOperations, _getApiRevisionOperations } from "./classic/apiRevision/index.js";
import { ApiSchemaOperations, _getApiSchemaOperations } from "./classic/apiSchema/index.js";
import {
  ApiTagDescriptionOperations,
  _getApiTagDescriptionOperations,
} from "./classic/apiTagDescription/index.js";
import { ApiToolOperations, _getApiToolOperations } from "./classic/apiTool/index.js";
import {
  ApiVersionSetOperations,
  _getApiVersionSetOperations,
} from "./classic/apiVersionSet/index.js";
import { ApiWikiOperations, _getApiWikiOperations } from "./classic/apiWiki/index.js";
import { ApiWikisOperations, _getApiWikisOperations } from "./classic/apiWikis/index.js";
import {
  AuthorizationOperations,
  _getAuthorizationOperations,
} from "./classic/authorization/index.js";
import {
  AuthorizationAccessPolicyOperations,
  _getAuthorizationAccessPolicyOperations,
} from "./classic/authorizationAccessPolicy/index.js";
import {
  AuthorizationLoginLinksOperations,
  _getAuthorizationLoginLinksOperations,
} from "./classic/authorizationLoginLinks/index.js";
import {
  AuthorizationProviderOperations,
  _getAuthorizationProviderOperations,
} from "./classic/authorizationProvider/index.js";
import {
  AuthorizationServerOperations,
  _getAuthorizationServerOperations,
} from "./classic/authorizationServer/index.js";
import { BackendOperations, _getBackendOperations } from "./classic/backend/index.js";
import { CacheOperations, _getCacheOperations } from "./classic/cache/index.js";
import { CertificateOperations, _getCertificateOperations } from "./classic/certificate/index.js";
import {
  ClientApplicationOperations,
  _getClientApplicationOperations,
} from "./classic/clientApplication/index.js";
import {
  ClientApplicationProductLinkOperations,
  _getClientApplicationProductLinkOperations,
} from "./classic/clientApplicationProductLink/index.js";
import { ContentItemOperations, _getContentItemOperations } from "./classic/contentItem/index.js";
import { ContentTypeOperations, _getContentTypeOperations } from "./classic/contentType/index.js";
import {
  DelegationSettingsOperations,
  _getDelegationSettingsOperations,
} from "./classic/delegationSettings/index.js";
import {
  DeletedServicesOperations,
  _getDeletedServicesOperations,
} from "./classic/deletedServices/index.js";
import { DiagnosticOperations, _getDiagnosticOperations } from "./classic/diagnostic/index.js";
import {
  DocumentationOperations,
  _getDocumentationOperations,
} from "./classic/documentation/index.js";
import {
  EmailTemplateOperations,
  _getEmailTemplateOperations,
} from "./classic/emailTemplate/index.js";
import { GatewayOperations, _getGatewayOperations } from "./classic/gateway/index.js";
import { GatewayApiOperations, _getGatewayApiOperations } from "./classic/gatewayApi/index.js";
import {
  GatewayCertificateAuthorityOperations,
  _getGatewayCertificateAuthorityOperations,
} from "./classic/gatewayCertificateAuthority/index.js";
import {
  GatewayHostnameConfigurationOperations,
  _getGatewayHostnameConfigurationOperations,
} from "./classic/gatewayHostnameConfiguration/index.js";
import {
  GlobalSchemaOperations,
  _getGlobalSchemaOperations,
} from "./classic/globalSchema/index.js";
import {
  GraphQLApiResolverOperations,
  _getGraphQLApiResolverOperations,
} from "./classic/graphQLApiResolver/index.js";
import {
  GraphQLApiResolverPolicyOperations,
  _getGraphQLApiResolverPolicyOperations,
} from "./classic/graphQLApiResolverPolicy/index.js";
import { GroupOperations, _getGroupOperations } from "./classic/group/index.js";
import { GroupUserOperations, _getGroupUserOperations } from "./classic/groupUser/index.js";
import {
  IdentityProviderOperations,
  _getIdentityProviderOperations,
} from "./classic/identityProvider/index.js";
import { IssueOperations, _getIssueOperations } from "./classic/issue/index.js";
import { LoggerOperations, _getLoggerOperations } from "./classic/logger/index.js";
import { NamedValueOperations, _getNamedValueOperations } from "./classic/namedValue/index.js";
import {
  NetworkStatusOperations,
  _getNetworkStatusOperations,
} from "./classic/networkStatus/index.js";
import {
  NotificationOperations,
  _getNotificationOperations,
} from "./classic/notification/index.js";
import {
  NotificationRecipientEmailOperations,
  _getNotificationRecipientEmailOperations,
} from "./classic/notificationRecipientEmail/index.js";
import {
  NotificationRecipientUserOperations,
  _getNotificationRecipientUserOperations,
} from "./classic/notificationRecipientUser/index.js";
import {
  OpenIdConnectProviderOperations,
  _getOpenIdConnectProviderOperations,
} from "./classic/openIdConnectProvider/index.js";
import { OperationOperations, _getOperationOperations } from "./classic/operation/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import {
  OperationsResultsOperations,
  _getOperationsResultsOperations,
} from "./classic/operationsResults/index.js";
import {
  OutboundNetworkDependenciesEndpointsOperations,
  _getOutboundNetworkDependenciesEndpointsOperations,
} from "./classic/outboundNetworkDependenciesEndpoints/index.js";
import { PolicyOperations, _getPolicyOperations } from "./classic/policy/index.js";
import {
  PolicyDescriptionOperations,
  _getPolicyDescriptionOperations,
} from "./classic/policyDescription/index.js";
import {
  PolicyFragmentOperations,
  _getPolicyFragmentOperations,
} from "./classic/policyFragment/index.js";
import {
  PolicyRestrictionOperations,
  _getPolicyRestrictionOperations,
} from "./classic/policyRestriction/index.js";
import {
  PolicyRestrictionValidationsOperations,
  _getPolicyRestrictionValidationsOperations,
} from "./classic/policyRestrictionValidations/index.js";
import {
  PortalConfigOperations,
  _getPortalConfigOperations,
} from "./classic/portalConfig/index.js";
import {
  PortalRevisionOperations,
  _getPortalRevisionOperations,
} from "./classic/portalRevision/index.js";
import {
  PortalSettingsOperations,
  _getPortalSettingsOperations,
} from "./classic/portalSettings/index.js";
import {
  PrivateEndpointConnectionOperations,
  _getPrivateEndpointConnectionOperations,
} from "./classic/privateEndpointConnection/index.js";
import { ProductOperations, _getProductOperations } from "./classic/product/index.js";
import { ProductApiOperations, _getProductApiOperations } from "./classic/productApi/index.js";
import {
  ProductApiLinkOperations,
  _getProductApiLinkOperations,
} from "./classic/productApiLink/index.js";
import {
  ProductGroupOperations,
  _getProductGroupOperations,
} from "./classic/productGroup/index.js";
import {
  ProductGroupLinkOperations,
  _getProductGroupLinkOperations,
} from "./classic/productGroupLink/index.js";
import {
  ProductPolicyOperations,
  _getProductPolicyOperations,
} from "./classic/productPolicy/index.js";
import {
  ProductSubscriptionsOperations,
  _getProductSubscriptionsOperations,
} from "./classic/productSubscriptions/index.js";
import { ProductWikiOperations, _getProductWikiOperations } from "./classic/productWiki/index.js";
import {
  ProductWikisOperations,
  _getProductWikisOperations,
} from "./classic/productWikis/index.js";
import {
  QuotaByCounterKeysOperations,
  _getQuotaByCounterKeysOperations,
} from "./classic/quotaByCounterKeys/index.js";
import {
  QuotaByPeriodKeysOperations,
  _getQuotaByPeriodKeysOperations,
} from "./classic/quotaByPeriodKeys/index.js";
import { RegionOperations, _getRegionOperations } from "./classic/region/index.js";
import { ReportsOperations, _getReportsOperations } from "./classic/reports/index.js";
import {
  SignInSettingsOperations,
  _getSignInSettingsOperations,
} from "./classic/signInSettings/index.js";
import {
  SignUpSettingsOperations,
  _getSignUpSettingsOperations,
} from "./classic/signUpSettings/index.js";
import {
  SubscriptionOperations,
  _getSubscriptionOperations,
} from "./classic/subscription/index.js";
import { TagOperations, _getTagOperations } from "./classic/tag/index.js";
import { TagApiLinkOperations, _getTagApiLinkOperations } from "./classic/tagApiLink/index.js";
import {
  TagOperationLinkOperations,
  _getTagOperationLinkOperations,
} from "./classic/tagOperationLink/index.js";
import {
  TagProductLinkOperations,
  _getTagProductLinkOperations,
} from "./classic/tagProductLink/index.js";
import { TagResourceOperations, _getTagResourceOperations } from "./classic/tagResource/index.js";
import {
  TenantAccessOperations,
  _getTenantAccessOperations,
} from "./classic/tenantAccess/index.js";
import {
  TenantAccessGitOperations,
  _getTenantAccessGitOperations,
} from "./classic/tenantAccessGit/index.js";
import {
  TenantConfigurationOperations,
  _getTenantConfigurationOperations,
} from "./classic/tenantConfiguration/index.js";
import {
  TenantSettingsOperations,
  _getTenantSettingsOperations,
} from "./classic/tenantSettings/index.js";
import { UserOperations, _getUserOperations } from "./classic/user/index.js";
import {
  UserConfirmationPasswordOperations,
  _getUserConfirmationPasswordOperations,
} from "./classic/userConfirmationPassword/index.js";
import { UserGroupOperations, _getUserGroupOperations } from "./classic/userGroup/index.js";
import {
  UserIdentitiesOperations,
  _getUserIdentitiesOperations,
} from "./classic/userIdentities/index.js";
import {
  UserSubscriptionOperations,
  _getUserSubscriptionOperations,
} from "./classic/userSubscription/index.js";
import { WorkspaceOperations, _getWorkspaceOperations } from "./classic/workspace/index.js";
import {
  WorkspaceApiOperations,
  _getWorkspaceApiOperations,
} from "./classic/workspaceApi/index.js";
import {
  WorkspaceApiDiagnosticOperations,
  _getWorkspaceApiDiagnosticOperations,
} from "./classic/workspaceApiDiagnostic/index.js";
import {
  WorkspaceApiExportOperations,
  _getWorkspaceApiExportOperations,
} from "./classic/workspaceApiExport/index.js";
import {
  WorkspaceApiOperationOperations,
  _getWorkspaceApiOperationOperations,
} from "./classic/workspaceApiOperation/index.js";
import {
  WorkspaceApiOperationPolicyOperations,
  _getWorkspaceApiOperationPolicyOperations,
} from "./classic/workspaceApiOperationPolicy/index.js";
import {
  WorkspaceApiPolicyOperations,
  _getWorkspaceApiPolicyOperations,
} from "./classic/workspaceApiPolicy/index.js";
import {
  WorkspaceApiReleaseOperations,
  _getWorkspaceApiReleaseOperations,
} from "./classic/workspaceApiRelease/index.js";
import {
  WorkspaceApiRevisionOperations,
  _getWorkspaceApiRevisionOperations,
} from "./classic/workspaceApiRevision/index.js";
import {
  WorkspaceApiSchemaOperations,
  _getWorkspaceApiSchemaOperations,
} from "./classic/workspaceApiSchema/index.js";
import {
  WorkspaceApiVersionSetOperations,
  _getWorkspaceApiVersionSetOperations,
} from "./classic/workspaceApiVersionSet/index.js";
import {
  WorkspaceBackendOperations,
  _getWorkspaceBackendOperations,
} from "./classic/workspaceBackend/index.js";
import {
  WorkspaceCertificateOperations,
  _getWorkspaceCertificateOperations,
} from "./classic/workspaceCertificate/index.js";
import {
  WorkspaceDiagnosticOperations,
  _getWorkspaceDiagnosticOperations,
} from "./classic/workspaceDiagnostic/index.js";
import {
  WorkspaceGlobalSchemaOperations,
  _getWorkspaceGlobalSchemaOperations,
} from "./classic/workspaceGlobalSchema/index.js";
import {
  WorkspaceGroupOperations,
  _getWorkspaceGroupOperations,
} from "./classic/workspaceGroup/index.js";
import {
  WorkspaceGroupUserOperations,
  _getWorkspaceGroupUserOperations,
} from "./classic/workspaceGroupUser/index.js";
import {
  WorkspaceLoggerOperations,
  _getWorkspaceLoggerOperations,
} from "./classic/workspaceLogger/index.js";
import {
  WorkspaceNamedValueOperations,
  _getWorkspaceNamedValueOperations,
} from "./classic/workspaceNamedValue/index.js";
import {
  WorkspaceNotificationOperations,
  _getWorkspaceNotificationOperations,
} from "./classic/workspaceNotification/index.js";
import {
  WorkspaceNotificationRecipientEmailOperations,
  _getWorkspaceNotificationRecipientEmailOperations,
} from "./classic/workspaceNotificationRecipientEmail/index.js";
import {
  WorkspaceNotificationRecipientUserOperations,
  _getWorkspaceNotificationRecipientUserOperations,
} from "./classic/workspaceNotificationRecipientUser/index.js";
import {
  WorkspacePolicyOperations,
  _getWorkspacePolicyOperations,
} from "./classic/workspacePolicy/index.js";
import {
  WorkspacePolicyFragmentOperations,
  _getWorkspacePolicyFragmentOperations,
} from "./classic/workspacePolicyFragment/index.js";
import {
  WorkspaceProductOperations,
  _getWorkspaceProductOperations,
} from "./classic/workspaceProduct/index.js";
import {
  WorkspaceProductApiLinkOperations,
  _getWorkspaceProductApiLinkOperations,
} from "./classic/workspaceProductApiLink/index.js";
import {
  WorkspaceProductGroupLinkOperations,
  _getWorkspaceProductGroupLinkOperations,
} from "./classic/workspaceProductGroupLink/index.js";
import {
  WorkspaceProductPolicyOperations,
  _getWorkspaceProductPolicyOperations,
} from "./classic/workspaceProductPolicy/index.js";
import {
  WorkspaceSubscriptionOperations,
  _getWorkspaceSubscriptionOperations,
} from "./classic/workspaceSubscription/index.js";
import {
  WorkspaceTagOperations,
  _getWorkspaceTagOperations,
} from "./classic/workspaceTag/index.js";
import {
  WorkspaceTagApiLinkOperations,
  _getWorkspaceTagApiLinkOperations,
} from "./classic/workspaceTagApiLink/index.js";
import {
  WorkspaceTagOperationLinkOperations,
  _getWorkspaceTagOperationLinkOperations,
} from "./classic/workspaceTagOperationLink/index.js";
import {
  WorkspaceTagProductLinkOperations,
  _getWorkspaceTagProductLinkOperations,
} from "./classic/workspaceTagProductLink/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
