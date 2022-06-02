// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { WebSiteManagementClient } from "./clientDefinitions";

export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {}
): WebSiteManagementClient {
  const baseUrl = options.baseUrl ?? "https://management.azure.com";
  options.apiVersion = options.apiVersion ?? "2021-03-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://management.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-arm-appservice-rest/1.0.0`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, credentials, options) as WebSiteManagementClient;

  return {
    ...client,
    appServiceCertificateOrders: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.CertificateRegistration/certificateOrders",
            subscriptionId
          )
          .get(options);
      },
      validatePurchaseInformation: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.CertificateRegistration/validateCertificateRegistrationInformation",
            subscriptionId
          )
          .post(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .patch(options);
      },
      listCertificates: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .get(options);
      },
      getCertificate: (subscriptionId, resourceGroupName, certificateOrderName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName,
            name
          )
          .get(options);
      },
      createOrUpdateCertificate: (
        subscriptionId,
        resourceGroupName,
        certificateOrderName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName,
            name
          )
          .put(options);
      },
      deleteCertificate: (
        subscriptionId,
        resourceGroupName,
        certificateOrderName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName,
            name
          )
          .delete(options);
      },
      updateCertificate: (
        subscriptionId,
        resourceGroupName,
        certificateOrderName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName,
            name
          )
          .patch(options);
      },
      reissue: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/reissue",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      renew: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/renew",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      resendEmail: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/resendEmail",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      resendRequestEmails: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/resendRequestEmails",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      retrieveSiteSeal: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/retrieveSiteSeal",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      verifyDomainOwnership: (subscriptionId, resourceGroupName, certificateOrderName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/verifyDomainOwnership",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .post(options);
      },
      retrieveCertificateActions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{name}/retrieveCertificateActions",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      retrieveCertificateEmailHistory: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{name}/retrieveEmailHistory",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
    },
    certificateOrdersDiagnostics: {
      listAppServiceCertificateOrderDetectorResponse: (
        subscriptionId,
        resourceGroupName,
        certificateOrderName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/detectors",
            subscriptionId,
            resourceGroupName,
            certificateOrderName
          )
          .get(options);
      },
      getAppServiceCertificateOrderDetectorResponse: (
        subscriptionId,
        resourceGroupName,
        certificateOrderName,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/{certificateOrderName}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            certificateOrderName,
            detectorName
          )
          .get(options);
      },
    },
    certificateRegistrationProvider: {
      listOperations: (options) => {
        return client.path("/providers/Microsoft.CertificateRegistration/operations").get(options);
      },
    },
    domains: {
      checkAvailability: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/checkDomainAvailability",
            subscriptionId
          )
          .post(options);
      },
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/domains",
            subscriptionId
          )
          .get(options);
      },
      getControlCenterSsoRequest: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/generateSsoRequest",
            subscriptionId
          )
          .post(options);
      },
      listRecommendations: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/listDomainRecommendations",
            subscriptionId
          )
          .post(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .patch(options);
      },
      listOwnershipIdentifiers: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .get(options);
      },
      getOwnershipIdentifier: (subscriptionId, resourceGroupName, domainName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
            subscriptionId,
            resourceGroupName,
            domainName,
            name
          )
          .get(options);
      },
      createOrUpdateOwnershipIdentifier: (
        subscriptionId,
        resourceGroupName,
        domainName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
            subscriptionId,
            resourceGroupName,
            domainName,
            name
          )
          .put(options);
      },
      deleteOwnershipIdentifier: (subscriptionId, resourceGroupName, domainName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
            subscriptionId,
            resourceGroupName,
            domainName,
            name
          )
          .delete(options);
      },
      updateOwnershipIdentifier: (subscriptionId, resourceGroupName, domainName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/domainOwnershipIdentifiers/{name}",
            subscriptionId,
            resourceGroupName,
            domainName,
            name
          )
          .patch(options);
      },
      renew: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/renew",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .post(options);
      },
      transferOut: (subscriptionId, resourceGroupName, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DomainRegistration/domains/{domainName}/transferOut",
            subscriptionId,
            resourceGroupName,
            domainName
          )
          .put(options);
      },
    },
    topLevelDomains: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains",
            subscriptionId
          )
          .get(options);
      },
      get: (subscriptionId, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}",
            subscriptionId,
            name
          )
          .get(options);
      },
      listAgreements: (subscriptionId, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}/listAgreements",
            subscriptionId,
            name
          )
          .post(options);
      },
    },
    domainRegistrationProvider: {
      listOperations: (options) => {
        return client.path("/providers/Microsoft.DomainRegistration/operations").get(options);
      },
    },
    appServiceEnvironments: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/hostingEnvironments",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listCapacities: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/capacities/compute",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getVipInfo: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/capacities/virtualip",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      changeVnet: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/changeVirtualNetwork",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getAseV3NetworkingConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/networking",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateAseNetworkingConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/configurations/networking",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listDiagnostics: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/diagnostics",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getDiagnosticsItem: (subscriptionId, resourceGroupName, name, diagnosticsName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/diagnostics/{diagnosticsName}",
            subscriptionId,
            resourceGroupName,
            name,
            diagnosticsName
          )
          .get(options);
      },
      getInboundNetworkDependenciesEndpoints: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/inboundNetworkDependenciesEndpoints",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listMultiRolePools: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getMultiRolePool: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdateMultiRolePool: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      updateMultiRolePool: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listMultiRolePoolInstanceMetricDefinitions: (
        subscriptionId,
        resourceGroupName,
        name,
        instance,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/instances/{instance}/metricdefinitions",
            subscriptionId,
            resourceGroupName,
            name,
            instance
          )
          .get(options);
      },
      listMultiRoleMetricDefinitions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/metricdefinitions",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listMultiRolePoolSkus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/skus",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listMultiRoleUsages: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/multiRolePools/default/usages",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listOperations: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/operations",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getOutboundNetworkDependenciesEndpoints: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/outboundNetworkDependenciesEndpoints",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPrivateEndpointConnectionList: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .get(options);
      },
      approveOrRejectPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .put(options);
      },
      deletePrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .delete(options);
      },
      getPrivateLinkResources: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/privateLinkResources",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      reboot: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/reboot",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      resume: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/resume",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listAppServicePlans: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/serverfarms",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listWebApps: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/sites",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      suspend: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/suspend",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listUsages: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/usages",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listWorkerPools: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getWorkerPool: (subscriptionId, resourceGroupName, name, workerPoolName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .get(options);
      },
      createOrUpdateWorkerPool: (
        subscriptionId,
        resourceGroupName,
        name,
        workerPoolName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .put(options);
      },
      updateWorkerPool: (subscriptionId, resourceGroupName, name, workerPoolName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .patch(options);
      },
      listWorkerPoolInstanceMetricDefinitions: (
        subscriptionId,
        resourceGroupName,
        name,
        workerPoolName,
        instance,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/instances/{instance}/metricdefinitions",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName,
            instance
          )
          .get(options);
      },
      listWebWorkerMetricDefinitions: (
        subscriptionId,
        resourceGroupName,
        name,
        workerPoolName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/metricdefinitions",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .get(options);
      },
      listWorkerPoolSkus: (subscriptionId, resourceGroupName, name, workerPoolName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/skus",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .get(options);
      },
      listWebWorkerUsages: (subscriptionId, resourceGroupName, name, workerPoolName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/workerPools/{workerPoolName}/usages",
            subscriptionId,
            resourceGroupName,
            name,
            workerPoolName
          )
          .get(options);
      },
    },
    appServicePlans: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/serverfarms",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listCapabilities: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/capabilities",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .get(options);
      },
      deleteHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .delete(options);
      },
      listHybridConnectionKeys: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}/listKeys",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .post(options);
      },
      listWebAppsByHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}/sites",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .get(options);
      },
      getHybridConnectionPlanLimit: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionPlanLimits/limit",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listHybridConnections: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/hybridConnectionRelays",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      restartWebApps: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/restartSites",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listWebApps: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/sites",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getServerFarmSkus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/skus",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listUsages: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/usages",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listVnets: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getVnetFromServerFarm: (subscriptionId, resourceGroupName, name, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .get(options);
      },
      getVnetGateway: (subscriptionId, resourceGroupName, name, vnetName, gatewayName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            gatewayName
          )
          .get(options);
      },
      updateVnetGateway: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            gatewayName
          )
          .put(options);
      },
      listRoutesForVnet: (subscriptionId, resourceGroupName, name, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .get(options);
      },
      getRouteForVnet: (subscriptionId, resourceGroupName, name, vnetName, routeName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            routeName
          )
          .get(options);
      },
      createOrUpdateVnetRoute: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        routeName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            routeName
          )
          .put(options);
      },
      deleteVnetRoute: (subscriptionId, resourceGroupName, name, vnetName, routeName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            routeName
          )
          .delete(options);
      },
      updateVnetRoute: (subscriptionId, resourceGroupName, name, vnetName, routeName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/virtualNetworkConnections/{vnetName}/routes/{routeName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            routeName
          )
          .patch(options);
      },
      rebootWorker: (subscriptionId, resourceGroupName, name, workerName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/workers/{workerName}/reboot",
            subscriptionId,
            resourceGroupName,
            name,
            workerName
          )
          .post(options);
      },
    },
    certificates: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/certificates",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/certificates/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
    },
    containerApps: {
      listBySubscription: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/containerApps",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      listSecrets: (subscriptionId, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/containerApps/{name}/listSecrets",
            subscriptionId,
            name
          )
          .post(options);
      },
    },
    containerAppsRevisions: {
      listRevisions: (subscriptionId, resourceGroupName, containerAppName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{containerAppName}/revisions",
            subscriptionId,
            resourceGroupName,
            containerAppName
          )
          .get(options);
      },
      getRevision: (subscriptionId, resourceGroupName, containerAppName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{containerAppName}/revisions/{name}",
            subscriptionId,
            resourceGroupName,
            containerAppName,
            name
          )
          .get(options);
      },
      activateRevision: (subscriptionId, resourceGroupName, containerAppName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{containerAppName}/revisions/{name}/activate",
            subscriptionId,
            resourceGroupName,
            containerAppName,
            name
          )
          .post(options);
      },
      deactivateRevision: (subscriptionId, resourceGroupName, containerAppName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{containerAppName}/revisions/{name}/deactivate",
            subscriptionId,
            resourceGroupName,
            containerAppName,
            name
          )
          .post(options);
      },
      restartRevision: (subscriptionId, resourceGroupName, containerAppName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/containerApps/{containerAppName}/revisions/{name}/restart",
            subscriptionId,
            resourceGroupName,
            containerAppName,
            name
          )
          .post(options);
      },
    },
    deletedWebApps: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites",
            subscriptionId
          )
          .get(options);
      },
      listByLocation: (subscriptionId, location, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites",
            subscriptionId,
            location
          )
          .get(options);
      },
      getDeletedWebAppByLocation: (subscriptionId, location, deletedSiteId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites/{deletedSiteId}",
            subscriptionId,
            location,
            deletedSiteId
          )
          .get(options);
      },
    },
    diagnostics: {
      listHostingEnvironmentDetectorResponses: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/detectors",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getHostingEnvironmentDetectorResponse: (
        subscriptionId,
        resourceGroupName,
        name,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{name}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            name,
            detectorName
          )
          .get(options);
      },
      listSiteDetectorResponses: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/detectors",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .get(options);
      },
      getSiteDetectorResponse: (
        subscriptionId,
        resourceGroupName,
        siteName,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            detectorName
          )
          .get(options);
      },
      listSiteDiagnosticCategories: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .get(options);
      },
      getSiteDiagnosticCategory: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory
          )
          .get(options);
      },
      listSiteAnalyses: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory
          )
          .get(options);
      },
      getSiteAnalysis: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses/{analysisName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory,
            analysisName
          )
          .get(options);
      },
      executeSiteAnalysis: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        analysisName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/analyses/{analysisName}/execute",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory,
            analysisName
          )
          .post(options);
      },
      listSiteDetectors: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory
          )
          .get(options);
      },
      getSiteDetector: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory,
            detectorName
          )
          .get(options);
      },
      executeSiteDetector: (
        subscriptionId,
        resourceGroupName,
        siteName,
        diagnosticCategory,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/diagnostics/{diagnosticCategory}/detectors/{detectorName}/execute",
            subscriptionId,
            resourceGroupName,
            siteName,
            diagnosticCategory,
            detectorName
          )
          .post(options);
      },
      listSiteDetectorResponsesSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/detectors",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot
          )
          .get(options);
      },
      getSiteDetectorResponseSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            detectorName
          )
          .get(options);
      },
      listSiteDiagnosticCategoriesSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot
          )
          .get(options);
      },
      getSiteDiagnosticCategorySlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory
          )
          .get(options);
      },
      listSiteAnalysesSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory
          )
          .get(options);
      },
      getSiteAnalysisSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        analysisName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses/{analysisName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory,
            analysisName
          )
          .get(options);
      },
      executeSiteAnalysisSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        analysisName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/analyses/{analysisName}/execute",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory,
            analysisName
          )
          .post(options);
      },
      listSiteDetectorsSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory
          )
          .get(options);
      },
      getSiteDetectorSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors/{detectorName}",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory,
            detectorName
          )
          .get(options);
      },
      executeSiteDetectorSlot: (
        subscriptionId,
        resourceGroupName,
        siteName,
        slot,
        diagnosticCategory,
        detectorName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slot}/diagnostics/{diagnosticCategory}/detectors/{detectorName}/execute",
            subscriptionId,
            resourceGroupName,
            siteName,
            slot,
            diagnosticCategory,
            detectorName
          )
          .post(options);
      },
    },
    global: {
      getDeletedWebApp: (subscriptionId, deletedSiteId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}",
            subscriptionId,
            deletedSiteId
          )
          .get(options);
      },
      getDeletedWebAppSnapshots: (subscriptionId, deletedSiteId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}/snapshots",
            subscriptionId,
            deletedSiteId
          )
          .get(options);
      },
      getSubscriptionOperationWithAsyncResponse: (
        subscriptionId,
        location,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/operations/{operationId}",
            subscriptionId,
            location,
            operationId
          )
          .get(options);
      },
    },
    kubeEnvironments: {
      listBySubscription: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/kubeEnvironments",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/kubeEnvironments/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
    },
    provider: {
      getAvailableStacks: (options) => {
        return client.path("/providers/Microsoft.Web/availableStacks").get(options);
      },
      getFunctionAppStacks: (options) => {
        return client.path("/providers/Microsoft.Web/functionAppStacks").get(options);
      },
      getFunctionAppStacksForLocation: (location, options) => {
        return client
          .path("/providers/Microsoft.Web/locations/{location}/functionAppStacks", location)
          .get(options);
      },
      getWebAppStacksForLocation: (location, options) => {
        return client
          .path("/providers/Microsoft.Web/locations/{location}/webAppStacks", location)
          .get(options);
      },
      listOperations: (options) => {
        return client.path("/providers/Microsoft.Web/operations").get(options);
      },
      getWebAppStacks: (options) => {
        return client.path("/providers/Microsoft.Web/webAppStacks").get(options);
      },
      getAvailableStacksOnPrem: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/availableStacks",
            subscriptionId
          )
          .get(options);
      },
    },
    recommendations: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations",
            subscriptionId
          )
          .get(options);
      },
      resetAllFilters: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations/reset",
            subscriptionId
          )
          .post(options);
      },
      disableRecommendationForSubscription: (subscriptionId, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/recommendations/{name}/disable",
            subscriptionId,
            name
          )
          .post(options);
      },
      listHistoryForHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendationHistory",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName
          )
          .get(options);
      },
      listRecommendedRulesForHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName
          )
          .get(options);
      },
      disableAllForHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/disable",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName
          )
          .post(options);
      },
      resetAllFiltersForHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/reset",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName
          )
          .post(options);
      },
      getRuleDetailsByHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/{name}",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName,
            name
          )
          .get(options);
      },
      disableRecommendationForHostingEnvironment: (
        subscriptionId,
        resourceGroupName,
        hostingEnvironmentName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/{hostingEnvironmentName}/recommendations/{name}/disable",
            subscriptionId,
            resourceGroupName,
            hostingEnvironmentName,
            name
          )
          .post(options);
      },
      listHistoryForWebApp: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendationHistory",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .get(options);
      },
      listRecommendedRulesForWebApp: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .get(options);
      },
      disableAllForWebApp: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/disable",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .post(options);
      },
      resetAllFiltersForWebApp: (subscriptionId, resourceGroupName, siteName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/reset",
            subscriptionId,
            resourceGroupName,
            siteName
          )
          .post(options);
      },
      getRuleDetailsByWebApp: (subscriptionId, resourceGroupName, siteName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/{name}",
            subscriptionId,
            resourceGroupName,
            siteName,
            name
          )
          .get(options);
      },
      disableRecommendationForSite: (
        subscriptionId,
        resourceGroupName,
        siteName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/recommendations/{name}/disable",
            subscriptionId,
            resourceGroupName,
            siteName,
            name
          )
          .post(options);
      },
    },
    resourceHealthMetadata: {
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/resourceHealthMetadata",
            subscriptionId
          )
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/resourceHealthMetadata",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      listBySite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resourceHealthMetadata",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getBySite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resourceHealthMetadata/default",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listBySiteSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resourceHealthMetadata",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getBySiteSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resourceHealthMetadata/default",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
    },
    ...{
      getPublishingUser: (options) => {
        return client.path("/providers/Microsoft.Web/publishingUsers/web").get(options);
      },
      updatePublishingUser: (options) => {
        return client.path("/providers/Microsoft.Web/publishingUsers/web").put(options);
      },
      listSourceControls: (options) => {
        return client.path("/providers/Microsoft.Web/sourcecontrols").get(options);
      },
      getSourceControl: (sourceControlType, options) => {
        return client
          .path("/providers/Microsoft.Web/sourcecontrols/{sourceControlType}", sourceControlType)
          .get(options);
      },
      updateSourceControl: (sourceControlType, options) => {
        return client
          .path("/providers/Microsoft.Web/sourcecontrols/{sourceControlType}", sourceControlType)
          .put(options);
      },
      listBillingMeters: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/billingMeters",
            subscriptionId
          )
          .get(options);
      },
      checkNameAvailability: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/checknameavailability",
            subscriptionId
          )
          .post(options);
      },
      listCustomHostNameSites: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/customhostnameSites",
            subscriptionId
          )
          .get(options);
      },
      getSubscriptionDeploymentLocations: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deploymentLocations",
            subscriptionId
          )
          .get(options);
      },
      listGeoRegions: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/geoRegions",
            subscriptionId
          )
          .get(options);
      },
      listSiteIdentifiersAssignedToHostName: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/listSitesAssignedToHostName",
            subscriptionId
          )
          .post(options);
      },
      listPremierAddOnOffers: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/premieraddonoffers",
            subscriptionId
          )
          .get(options);
      },
      listSkus: (subscriptionId, options) => {
        return client
          .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/skus", subscriptionId)
          .get(options);
      },
      verifyHostingEnvironmentVnet: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/verifyHostingEnvironmentVnet",
            subscriptionId
          )
          .post(options);
      },
      move: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/moveResources",
            subscriptionId,
            resourceGroupName
          )
          .post(options);
      },
      validate: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/validate",
            subscriptionId,
            resourceGroupName
          )
          .post(options);
      },
      validateMove: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/validateMoveResources",
            subscriptionId,
            resourceGroupName
          )
          .post(options);
      },
    },
    staticSites: {
      previewWorkflow: (subscriptionId, location, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/previewStaticSiteWorkflowFile",
            subscriptionId,
            location
          )
          .post(options);
      },
      list: (subscriptionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/providers/Microsoft.Web/staticSites",
            subscriptionId
          )
          .get(options);
      },
      getStaticSitesByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      getStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdateStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      deleteStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      updateStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listStaticSiteUsers: (subscriptionId, resourceGroupName, name, authprovider, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/authproviders/{authprovider}/listUsers",
            subscriptionId,
            resourceGroupName,
            name,
            authprovider
          )
          .post(options);
      },
      deleteStaticSiteUser: (
        subscriptionId,
        resourceGroupName,
        name,
        authprovider,
        userid,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/authproviders/{authprovider}/users/{userid}",
            subscriptionId,
            resourceGroupName,
            name,
            authprovider,
            userid
          )
          .delete(options);
      },
      updateStaticSiteUser: (
        subscriptionId,
        resourceGroupName,
        name,
        authprovider,
        userid,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/authproviders/{authprovider}/users/{userid}",
            subscriptionId,
            resourceGroupName,
            name,
            authprovider,
            userid
          )
          .patch(options);
      },
      getStaticSiteBuilds: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getStaticSiteBuild: (subscriptionId, resourceGroupName, name, environmentName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .get(options);
      },
      deleteStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .delete(options);
      },
      createOrUpdateStaticSiteBuildAppSettings: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/config/appsettings",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .put(options);
      },
      createOrUpdateStaticSiteBuildFunctionAppSettings: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/config/functionappsettings",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .put(options);
      },
      listStaticSiteBuildFunctions: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/functions",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .get(options);
      },
      listStaticSiteBuildAppSettings: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/listAppSettings",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .post(options);
      },
      listStaticSiteBuildFunctionAppSettings: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/listFunctionAppSettings",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .post(options);
      },
      getUserProvidedFunctionAppsForStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .get(options);
      },
      getUserProvidedFunctionAppForStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName,
            functionAppName
          )
          .get(options);
      },
      registerUserProvidedFunctionAppWithStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName,
            functionAppName
          )
          .put(options);
      },
      detachUserProvidedFunctionAppFromStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName,
            functionAppName
          )
          .delete(options);
      },
      createZipDeploymentForStaticSiteBuild: (
        subscriptionId,
        resourceGroupName,
        name,
        environmentName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/builds/{environmentName}/zipdeploy",
            subscriptionId,
            resourceGroupName,
            name,
            environmentName
          )
          .post(options);
      },
      createOrUpdateStaticSiteAppSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/config/appsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      createOrUpdateStaticSiteFunctionAppSettings: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/config/functionappsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      createUserRolesInvitationLink: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/createUserInvitation",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listStaticSiteCustomDomains: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getStaticSiteCustomDomain: (subscriptionId, resourceGroupName, name, domainName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainName
          )
          .get(options);
      },
      createOrUpdateStaticSiteCustomDomain: (
        subscriptionId,
        resourceGroupName,
        name,
        domainName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainName
          )
          .put(options);
      },
      deleteStaticSiteCustomDomain: (
        subscriptionId,
        resourceGroupName,
        name,
        domainName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainName
          )
          .delete(options);
      },
      validateCustomDomainCanBeAddedToStaticSite: (
        subscriptionId,
        resourceGroupName,
        name,
        domainName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/customDomains/{domainName}/validate",
            subscriptionId,
            resourceGroupName,
            name,
            domainName
          )
          .post(options);
      },
      detachStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/detach",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listStaticSiteFunctions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/functions",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listStaticSiteAppSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listAppSettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listStaticSiteConfiguredRoles: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listConfiguredRoles",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listStaticSiteFunctionAppSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listFunctionAppSettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listStaticSiteSecrets: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/listSecrets",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getPrivateEndpointConnectionList: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .get(options);
      },
      approveOrRejectPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .put(options);
      },
      deletePrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .delete(options);
      },
      getPrivateLinkResources: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/privateLinkResources",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      resetStaticSiteApiKey: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/resetapikey",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getUserProvidedFunctionAppsForStaticSite: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getUserProvidedFunctionAppForStaticSite: (
        subscriptionId,
        resourceGroupName,
        name,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionAppName
          )
          .get(options);
      },
      registerUserProvidedFunctionAppWithStaticSite: (
        subscriptionId,
        resourceGroupName,
        name,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionAppName
          )
          .put(options);
      },
      detachUserProvidedFunctionAppFromStaticSite: (
        subscriptionId,
        resourceGroupName,
        name,
        functionAppName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/userProvidedFunctionApps/{functionAppName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionAppName
          )
          .delete(options);
      },
      createZipDeploymentForStaticSite: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/staticSites/{name}/zipdeploy",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
    },
    webApps: {
      list: (subscriptionId, options) => {
        return client
          .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites", subscriptionId)
          .get(options);
      },
      listByResourceGroup: (subscriptionId, resourceGroupName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites",
            subscriptionId,
            resourceGroupName
          )
          .get(options);
      },
      get: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdate: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      delete: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      update: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      analyzeCustomHostname: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/analyzeCustomHostname",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      applySlotConfigToProduction: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/applySlotConfig",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      backup: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backup",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listBackups: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getBackupStatus: (subscriptionId, resourceGroupName, name, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}",
            subscriptionId,
            resourceGroupName,
            name,
            backupId
          )
          .get(options);
      },
      deleteBackup: (subscriptionId, resourceGroupName, name, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}",
            subscriptionId,
            resourceGroupName,
            name,
            backupId
          )
          .delete(options);
      },
      listBackupStatusSecrets: (subscriptionId, resourceGroupName, name, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}/list",
            subscriptionId,
            resourceGroupName,
            name,
            backupId
          )
          .post(options);
      },
      restore: (subscriptionId, resourceGroupName, name, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/backups/{backupId}/restore",
            subscriptionId,
            resourceGroupName,
            name,
            backupId
          )
          .post(options);
      },
      listBasicPublishingCredentialsPolicies: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getFtpAllowed: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/ftp",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateFtpAllowed: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/ftp",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getScmAllowed: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/scm",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateScmAllowed: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/basicPublishingCredentialsPolicies/scm",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listConfigurations: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateApplicationSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/appsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listApplicationSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/appsettings/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      updateAuthSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getAuthSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettings/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getAuthSettingsV2WithoutSecrets: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateAuthSettingsV2: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getAuthSettingsV2: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/authsettingsV2/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateAzureStorageAccounts: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/azurestorageaccounts",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listAzureStorageAccounts: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/azurestorageaccounts/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      updateBackupConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      deleteBackupConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      getBackupConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/backup/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getAppSettingsKeyVaultReferences: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/appsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getAppSettingKeyVaultReference: (
        subscriptionId,
        resourceGroupName,
        name,
        appSettingKey,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/appsettings/{appSettingKey}",
            subscriptionId,
            resourceGroupName,
            name,
            appSettingKey
          )
          .get(options);
      },
      getSiteConnectionStringKeyVaultReferences: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/connectionstrings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSiteConnectionStringKeyVaultReference: (
        subscriptionId,
        resourceGroupName,
        name,
        connectionStringKey,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/configreferences/connectionstrings/{connectionStringKey}",
            subscriptionId,
            resourceGroupName,
            name,
            connectionStringKey
          )
          .get(options);
      },
      updateConnectionStrings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/connectionstrings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listConnectionStrings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/connectionstrings/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getDiagnosticLogsConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/logs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateDiagnosticLogsConfig: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/logs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      updateMetadata: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/metadata",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listMetadata: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/metadata/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listPublishingCredentials: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/publishingcredentials/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      updateSitePushSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/pushsettings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listSitePushSettings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/pushsettings/list",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSlotConfigurationNames: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/slotConfigNames",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      updateSlotConfigurationNames: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/slotConfigNames",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdateConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      updateConfiguration: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listConfigurationSnapshotInfo: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getConfigurationSnapshot: (subscriptionId, resourceGroupName, name, snapshotId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots/{snapshotId}",
            subscriptionId,
            resourceGroupName,
            name,
            snapshotId
          )
          .get(options);
      },
      recoverSiteConfigurationSnapshot: (
        subscriptionId,
        resourceGroupName,
        name,
        snapshotId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/config/web/snapshots/{snapshotId}/recover",
            subscriptionId,
            resourceGroupName,
            name,
            snapshotId
          )
          .post(options);
      },
      getWebSiteContainerLogs: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/containerlogs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getContainerLogsZip: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/containerlogs/zip/download",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listContinuousWebJobs: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getContinuousWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .get(options);
      },
      deleteContinuousWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .delete(options);
      },
      startContinuousWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}/start",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .post(options);
      },
      stopContinuousWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/continuouswebjobs/{webJobName}/stop",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .post(options);
      },
      listDeployments: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getDeployment: (subscriptionId, resourceGroupName, id, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name
          )
          .get(options);
      },
      createDeployment: (subscriptionId, resourceGroupName, id, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name
          )
          .put(options);
      },
      deleteDeployment: (subscriptionId, resourceGroupName, id, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name
          )
          .delete(options);
      },
      listDeploymentLog: (subscriptionId, resourceGroupName, id, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/deployments/{id}/log",
            subscriptionId,
            resourceGroupName,
            id,
            name
          )
          .get(options);
      },
      discoverBackup: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/discoverbackup",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listDomainOwnershipIdentifiers: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getDomainOwnershipIdentifier: (
        subscriptionId,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainOwnershipIdentifierName
          )
          .get(options);
      },
      createOrUpdateDomainOwnershipIdentifier: (
        subscriptionId,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainOwnershipIdentifierName
          )
          .put(options);
      },
      deleteDomainOwnershipIdentifier: (
        subscriptionId,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainOwnershipIdentifierName
          )
          .delete(options);
      },
      updateDomainOwnershipIdentifier: (
        subscriptionId,
        resourceGroupName,
        name,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            domainOwnershipIdentifierName
          )
          .patch(options);
      },
      getMSDeployStatus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createMSDeployOperation: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getMSDeployLog: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/MSDeploy/log",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getOneDeployStatus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/onedeploy",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOneDeployOperation: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/extensions/onedeploy",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      listFunctions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getFunctionsAdminToken: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/admin/token",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getFunction: (subscriptionId, resourceGroupName, name, functionName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionName
          )
          .get(options);
      },
      createFunction: (subscriptionId, resourceGroupName, name, functionName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionName
          )
          .put(options);
      },
      deleteFunction: (subscriptionId, resourceGroupName, name, functionName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionName
          )
          .delete(options);
      },
      createOrUpdateFunctionSecret: (
        subscriptionId,
        resourceGroupName,
        name,
        functionName,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/keys/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionName,
            keyName
          )
          .put(options);
      },
      deleteFunctionSecret: (
        subscriptionId,
        resourceGroupName,
        name,
        functionName,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/keys/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            functionName,
            keyName
          )
          .delete(options);
      },
      listFunctionKeys: (subscriptionId, resourceGroupName, name, functionName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/listkeys",
            subscriptionId,
            resourceGroupName,
            name,
            functionName
          )
          .post(options);
      },
      listFunctionSecrets: (subscriptionId, resourceGroupName, name, functionName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/functions/{functionName}/listsecrets",
            subscriptionId,
            resourceGroupName,
            name,
            functionName
          )
          .post(options);
      },
      listHostKeys: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/listkeys",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSyncStatus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/listsyncstatus",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      syncFunctions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/sync",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      createOrUpdateHostSecret: (
        subscriptionId,
        resourceGroupName,
        name,
        keyType,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/{keyType}/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            keyType,
            keyName
          )
          .put(options);
      },
      deleteHostSecret: (subscriptionId, resourceGroupName, name, keyType, keyName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/host/default/{keyType}/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            keyType,
            keyName
          )
          .delete(options);
      },
      listHostNameBindings: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getHostNameBinding: (subscriptionId, resourceGroupName, name, hostName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            hostName
          )
          .get(options);
      },
      createOrUpdateHostNameBinding: (
        subscriptionId,
        resourceGroupName,
        name,
        hostName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            hostName
          )
          .put(options);
      },
      deleteHostNameBinding: (subscriptionId, resourceGroupName, name, hostName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            hostName
          )
          .delete(options);
      },
      getHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .get(options);
      },
      createOrUpdateHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .put(options);
      },
      deleteHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .delete(options);
      },
      updateHybridConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            namespaceName,
            relayName
          )
          .patch(options);
      },
      listHybridConnections: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridConnectionRelays",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listRelayServiceConnections: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getRelayServiceConnection: (subscriptionId, resourceGroupName, name, entityName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            entityName
          )
          .get(options);
      },
      createOrUpdateRelayServiceConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            entityName
          )
          .put(options);
      },
      deleteRelayServiceConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            entityName
          )
          .delete(options);
      },
      updateRelayServiceConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            entityName
          )
          .patch(options);
      },
      listInstanceIdentifiers: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getInstanceInfo: (subscriptionId, resourceGroupName, name, instanceId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId
          )
          .get(options);
      },
      getInstanceMsDeployStatus: (subscriptionId, resourceGroupName, name, instanceId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId
          )
          .get(options);
      },
      createInstanceMSDeployOperation: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId
          )
          .put(options);
      },
      getInstanceMSDeployLog: (subscriptionId, resourceGroupName, name, instanceId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/extensions/MSDeploy/log",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId
          )
          .get(options);
      },
      listInstanceProcesses: (subscriptionId, resourceGroupName, name, instanceId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId
          )
          .get(options);
      },
      getInstanceProcess: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId
          )
          .get(options);
      },
      deleteInstanceProcess: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId
          )
          .delete(options);
      },
      getInstanceProcessDump: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/dump",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId
          )
          .get(options);
      },
      listInstanceProcessModules: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/modules",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId
          )
          .get(options);
      },
      getInstanceProcessModule: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        baseAddress,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/modules/{baseAddress}",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId,
            baseAddress
          )
          .get(options);
      },
      listInstanceProcessThreads: (
        subscriptionId,
        resourceGroupName,
        name,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/instances/{instanceId}/processes/{processId}/threads",
            subscriptionId,
            resourceGroupName,
            name,
            instanceId,
            processId
          )
          .get(options);
      },
      isCloneable: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/iscloneable",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSiteBackups: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/listbackups",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSyncFunctionTriggers: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/listsyncfunctiontriggerstatus",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      migrateStorage: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migrate",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      migrateMySql: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migratemysql",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getMigrateMySqlStatus: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/migratemysql/status",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSwiftVirtualNetworkConnection: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdateSwiftVirtualNetworkConnectionWithCheck: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      deleteSwiftVirtualNetwork: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      updateSwiftVirtualNetworkConnectionWithCheck: (
        subscriptionId,
        resourceGroupName,
        name,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      listNetworkFeatures: (subscriptionId, resourceGroupName, name, view, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkFeatures/{view}",
            subscriptionId,
            resourceGroupName,
            name,
            view
          )
          .get(options);
      },
      getNetworkTraceOperation: (subscriptionId, resourceGroupName, name, operationId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/operationresults/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            operationId
          )
          .get(options);
      },
      startWebSiteNetworkTrace: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/start",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      startWebSiteNetworkTraceOperation: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/startOperation",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      stopWebSiteNetworkTrace: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/stop",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      getNetworkTraces: (subscriptionId, resourceGroupName, name, operationId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTrace/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            operationId
          )
          .get(options);
      },
      getNetworkTraceOperationV2: (
        subscriptionId,
        resourceGroupName,
        name,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTraces/current/operationresults/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            operationId
          )
          .get(options);
      },
      getNetworkTracesV2: (subscriptionId, resourceGroupName, name, operationId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/networkTraces/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            operationId
          )
          .get(options);
      },
      generateNewSitePublishingPassword: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/newpassword",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listPerfMonCounters: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/perfcounters",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSitePhpErrorLogFlag: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/phplogging",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listPremierAddOns: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPremierAddOn: (subscriptionId, resourceGroupName, name, premierAddOnName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            premierAddOnName
          )
          .get(options);
      },
      addPremierAddOn: (subscriptionId, resourceGroupName, name, premierAddOnName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            premierAddOnName
          )
          .put(options);
      },
      deletePremierAddOn: (subscriptionId, resourceGroupName, name, premierAddOnName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            premierAddOnName
          )
          .delete(options);
      },
      updatePremierAddOn: (subscriptionId, resourceGroupName, name, premierAddOnName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            premierAddOnName
          )
          .patch(options);
      },
      getPrivateAccess: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateAccess/virtualNetworks",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      putPrivateAccessVnet: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateAccess/virtualNetworks",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      getPrivateEndpointConnectionList: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .get(options);
      },
      approveOrRejectPrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .put(options);
      },
      deletePrivateEndpointConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            privateEndpointConnectionName
          )
          .delete(options);
      },
      getPrivateLinkResources: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/privateLinkResources",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listProcesses: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getProcess: (subscriptionId, resourceGroupName, name, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            processId
          )
          .get(options);
      },
      deleteProcess: (subscriptionId, resourceGroupName, name, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            processId
          )
          .delete(options);
      },
      getProcessDump: (subscriptionId, resourceGroupName, name, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/dump",
            subscriptionId,
            resourceGroupName,
            name,
            processId
          )
          .get(options);
      },
      listProcessModules: (subscriptionId, resourceGroupName, name, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/modules",
            subscriptionId,
            resourceGroupName,
            name,
            processId
          )
          .get(options);
      },
      getProcessModule: (
        subscriptionId,
        resourceGroupName,
        name,
        processId,
        baseAddress,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/modules/{baseAddress}",
            subscriptionId,
            resourceGroupName,
            name,
            processId,
            baseAddress
          )
          .get(options);
      },
      listProcessThreads: (subscriptionId, resourceGroupName, name, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/processes/{processId}/threads",
            subscriptionId,
            resourceGroupName,
            name,
            processId
          )
          .get(options);
      },
      listPublicCertificates: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getPublicCertificate: (
        subscriptionId,
        resourceGroupName,
        name,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            publicCertificateName
          )
          .get(options);
      },
      createOrUpdatePublicCertificate: (
        subscriptionId,
        resourceGroupName,
        name,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            publicCertificateName
          )
          .put(options);
      },
      deletePublicCertificate: (
        subscriptionId,
        resourceGroupName,
        name,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            publicCertificateName
          )
          .delete(options);
      },
      listPublishingProfileXmlWithSecrets: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/publishxml",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      resetProductionSlotConfig: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/resetSlotConfig",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      restart: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restart",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      restoreFromBackupBlob: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromBackupBlob",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      restoreFromDeletedApp: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreFromDeletedApp",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      restoreSnapshot: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/restoreSnapshot",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSiteExtensions: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSiteExtension: (subscriptionId, resourceGroupName, name, siteExtensionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            siteExtensionId
          )
          .get(options);
      },
      installSiteExtension: (subscriptionId, resourceGroupName, name, siteExtensionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            siteExtensionId
          )
          .put(options);
      },
      deleteSiteExtension: (subscriptionId, resourceGroupName, name, siteExtensionId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            siteExtensionId
          )
          .delete(options);
      },
      listSlots: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      createOrUpdateSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      deleteSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .delete(options);
      },
      updateSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .patch(options);
      },
      analyzeCustomHostnameSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/analyzeCustomHostname",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      applySlotConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/applySlotConfig",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      backupSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backup",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listBackupsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getBackupStatusSlot: (subscriptionId, resourceGroupName, name, slot, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            backupId
          )
          .get(options);
      },
      deleteBackupSlot: (subscriptionId, resourceGroupName, name, slot, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            backupId
          )
          .delete(options);
      },
      listBackupStatusSecretsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        backupId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            backupId
          )
          .post(options);
      },
      restoreSlot: (subscriptionId, resourceGroupName, name, slot, backupId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/backups/{backupId}/restore",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            backupId
          )
          .post(options);
      },
      listBasicPublishingCredentialsPoliciesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getFtpAllowedSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/ftp",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateFtpAllowedSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/ftp",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      getScmAllowedSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/scm",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateScmAllowedSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/basicPublishingCredentialsPolicies/scm",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listConfigurationsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateApplicationSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/appsettings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listApplicationSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/appsettings/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      updateAuthSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      getAuthSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettings/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getAuthSettingsV2WithoutSecretsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateAuthSettingsV2Slot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      getAuthSettingsV2Slot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/authsettingsV2/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateAzureStorageAccountsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/azurestorageaccounts",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listAzureStorageAccountsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/azurestorageaccounts/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      updateBackupConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      deleteBackupConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .delete(options);
      },
      getBackupConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/backup/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getAppSettingsKeyVaultReferencesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/appsettings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getAppSettingKeyVaultReferenceSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        appSettingKey,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/appsettings/{appSettingKey}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            appSettingKey
          )
          .get(options);
      },
      getSiteConnectionStringKeyVaultReferencesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/connectionstrings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getSiteConnectionStringKeyVaultReferenceSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        connectionStringKey,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/configreferences/connectionstrings/{connectionStringKey}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            connectionStringKey
          )
          .get(options);
      },
      updateConnectionStringsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/connectionstrings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listConnectionStringsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/connectionstrings/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getDiagnosticLogsConfigurationSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/logs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      updateDiagnosticLogsConfigSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/logs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      updateMetadataSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/metadata",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listMetadataSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/metadata/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listPublishingCredentialsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/publishingcredentials/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      updateSitePushSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/pushsettings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      listSitePushSettingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/pushsettings/list",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      createOrUpdateConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      updateConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .patch(options);
      },
      listConfigurationSnapshotInfoSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getConfigurationSnapshotSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        snapshotId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots/{snapshotId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            snapshotId
          )
          .get(options);
      },
      recoverSiteConfigurationSnapshotSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        snapshotId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/config/web/snapshots/{snapshotId}/recover",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            snapshotId
          )
          .post(options);
      },
      getWebSiteContainerLogsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/containerlogs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getContainerLogsZipSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/containerlogs/zip/download",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listContinuousWebJobsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getContinuousWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .get(options);
      },
      deleteContinuousWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .delete(options);
      },
      startContinuousWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}/start",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .post(options);
      },
      stopContinuousWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/continuouswebjobs/{webJobName}/stop",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .post(options);
      },
      listDeploymentsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getDeploymentSlot: (subscriptionId, resourceGroupName, id, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            slot
          )
          .get(options);
      },
      createDeploymentSlot: (subscriptionId, resourceGroupName, id, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            slot
          )
          .put(options);
      },
      deleteDeploymentSlot: (subscriptionId, resourceGroupName, id, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            slot
          )
          .delete(options);
      },
      listDeploymentLogSlot: (subscriptionId, resourceGroupName, id, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/deployments/{id}/log",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            slot
          )
          .get(options);
      },
      discoverBackupSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/discoverbackup",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listDomainOwnershipIdentifiersSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getDomainOwnershipIdentifierSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            domainOwnershipIdentifierName
          )
          .get(options);
      },
      createOrUpdateDomainOwnershipIdentifierSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            domainOwnershipIdentifierName
          )
          .put(options);
      },
      deleteDomainOwnershipIdentifierSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            domainOwnershipIdentifierName
          )
          .delete(options);
      },
      updateDomainOwnershipIdentifierSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        domainOwnershipIdentifierName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/domainOwnershipIdentifiers/{domainOwnershipIdentifierName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            domainOwnershipIdentifierName
          )
          .patch(options);
      },
      getMSDeployStatusSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      createMSDeployOperationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      getMSDeployLogSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/extensions/MSDeploy/log",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listInstanceFunctionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getFunctionsAdminTokenSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/admin/token",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getInstanceFunctionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName
          )
          .get(options);
      },
      createInstanceFunctionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName
          )
          .put(options);
      },
      deleteInstanceFunctionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName
          )
          .delete(options);
      },
      createOrUpdateFunctionSecretSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/keys/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName,
            keyName
          )
          .put(options);
      },
      deleteFunctionSecretSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/keys/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName,
            keyName
          )
          .delete(options);
      },
      listFunctionKeysSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/listkeys",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName
          )
          .post(options);
      },
      listFunctionSecretsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        functionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/functions/{functionName}/listsecrets",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            functionName
          )
          .post(options);
      },
      listHostKeysSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/listkeys",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listSyncStatusSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/listsyncstatus",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      syncFunctionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/sync",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      createOrUpdateHostSecretSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        keyType,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/{keyType}/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            keyType,
            keyName
          )
          .put(options);
      },
      deleteHostSecretSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        keyType,
        keyName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/host/default/{keyType}/{keyName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            keyType,
            keyName
          )
          .delete(options);
      },
      listHostNameBindingsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getHostNameBindingSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        hostName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            hostName
          )
          .get(options);
      },
      createOrUpdateHostNameBindingSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        hostName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            hostName
          )
          .put(options);
      },
      deleteHostNameBindingSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        hostName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hostNameBindings/{hostName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            hostName
          )
          .delete(options);
      },
      getHybridConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            namespaceName,
            relayName
          )
          .get(options);
      },
      createOrUpdateHybridConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            namespaceName,
            relayName
          )
          .put(options);
      },
      deleteHybridConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            namespaceName,
            relayName
          )
          .delete(options);
      },
      updateHybridConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        namespaceName,
        relayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionNamespaces/{namespaceName}/relays/{relayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            namespaceName,
            relayName
          )
          .patch(options);
      },
      listHybridConnectionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridConnectionRelays",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listRelayServiceConnectionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getRelayServiceConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            entityName
          )
          .get(options);
      },
      createOrUpdateRelayServiceConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            entityName
          )
          .put(options);
      },
      deleteRelayServiceConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            entityName
          )
          .delete(options);
      },
      updateRelayServiceConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        entityName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/hybridconnection/{entityName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            entityName
          )
          .patch(options);
      },
      listInstanceIdentifiersSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getInstanceInfoSlot: (subscriptionId, resourceGroupName, name, slot, instanceId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId
          )
          .get(options);
      },
      getInstanceMsDeployStatusSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId
          )
          .get(options);
      },
      createInstanceMSDeployOperationSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId
          )
          .put(options);
      },
      getInstanceMSDeployLogSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/extensions/MSDeploy/log",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId
          )
          .get(options);
      },
      listInstanceProcessesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId
          )
          .get(options);
      },
      getInstanceProcessSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId
          )
          .get(options);
      },
      deleteInstanceProcessSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId
          )
          .delete(options);
      },
      getInstanceProcessDumpSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/dump",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId
          )
          .get(options);
      },
      listInstanceProcessModulesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/modules",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId
          )
          .get(options);
      },
      getInstanceProcessModuleSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        baseAddress,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/modules/{baseAddress}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId,
            baseAddress
          )
          .get(options);
      },
      listInstanceProcessThreadsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        instanceId,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/instances/{instanceId}/processes/{processId}/threads",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            instanceId,
            processId
          )
          .get(options);
      },
      isCloneableSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/iscloneable",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listSiteBackupsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/listbackups",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listSyncFunctionTriggersSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/listsyncfunctiontriggerstatus",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getMigrateMySqlStatusSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/migratemysql/status",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getSwiftVirtualNetworkConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      createOrUpdateSwiftVirtualNetworkConnectionWithCheckSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      deleteSwiftVirtualNetworkSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .delete(options);
      },
      updateSwiftVirtualNetworkConnectionWithCheckSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkConfig/virtualNetwork",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .patch(options);
      },
      listNetworkFeaturesSlot: (subscriptionId, resourceGroupName, name, slot, view, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkFeatures/{view}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            view
          )
          .get(options);
      },
      getNetworkTraceOperationSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/operationresults/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            operationId
          )
          .get(options);
      },
      startWebSiteNetworkTraceSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/start",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      startWebSiteNetworkTraceOperationSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/startOperation",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      stopWebSiteNetworkTraceSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/stop",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      getNetworkTracesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTrace/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            operationId
          )
          .get(options);
      },
      getNetworkTraceOperationSlotV2: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTraces/current/operationresults/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            operationId
          )
          .get(options);
      },
      getNetworkTracesSlotV2: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        operationId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/networkTraces/{operationId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            operationId
          )
          .get(options);
      },
      generateNewSitePublishingPasswordSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/newpassword",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listPerfMonCountersSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/perfcounters",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getSitePhpErrorLogFlagSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/phplogging",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listPremierAddOnsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getPremierAddOnSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        premierAddOnName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            premierAddOnName
          )
          .get(options);
      },
      addPremierAddOnSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        premierAddOnName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            premierAddOnName
          )
          .put(options);
      },
      deletePremierAddOnSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        premierAddOnName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            premierAddOnName
          )
          .delete(options);
      },
      updatePremierAddOnSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        premierAddOnName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/premieraddons/{premierAddOnName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            premierAddOnName
          )
          .patch(options);
      },
      getPrivateAccessSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateAccess/virtualNetworks",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      putPrivateAccessVnetSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateAccess/virtualNetworks",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      getPrivateEndpointConnectionListSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getPrivateEndpointConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            privateEndpointConnectionName
          )
          .get(options);
      },
      approveOrRejectPrivateEndpointConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            privateEndpointConnectionName
          )
          .put(options);
      },
      deletePrivateEndpointConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        privateEndpointConnectionName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateEndpointConnections/{privateEndpointConnectionName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            privateEndpointConnectionName
          )
          .delete(options);
      },
      getPrivateLinkResourcesSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/privateLinkResources",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listProcessesSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getProcessSlot: (subscriptionId, resourceGroupName, name, slot, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId
          )
          .get(options);
      },
      deleteProcessSlot: (subscriptionId, resourceGroupName, name, slot, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId
          )
          .delete(options);
      },
      getProcessDumpSlot: (subscriptionId, resourceGroupName, name, slot, processId, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/dump",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId
          )
          .get(options);
      },
      listProcessModulesSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/modules",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId
          )
          .get(options);
      },
      getProcessModuleSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        processId,
        baseAddress,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/modules/{baseAddress}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId,
            baseAddress
          )
          .get(options);
      },
      listProcessThreadsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        processId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/processes/{processId}/threads",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            processId
          )
          .get(options);
      },
      listPublicCertificatesSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getPublicCertificateSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            publicCertificateName
          )
          .get(options);
      },
      createOrUpdatePublicCertificateSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            publicCertificateName
          )
          .put(options);
      },
      deletePublicCertificateSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        publicCertificateName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publicCertificates/{publicCertificateName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            publicCertificateName
          )
          .delete(options);
      },
      listPublishingProfileXmlWithSecretsSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/publishxml",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      resetSlotConfigurationSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/resetSlotConfig",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      restartSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restart",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      restoreFromBackupBlobSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromBackupBlob",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      restoreFromDeletedAppSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreFromDeletedApp",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      restoreSnapshotSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/restoreSnapshot",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listSiteExtensionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getSiteExtensionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        siteExtensionId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            siteExtensionId
          )
          .get(options);
      },
      installSiteExtensionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        siteExtensionId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            siteExtensionId
          )
          .put(options);
      },
      deleteSiteExtensionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        siteExtensionId,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/siteextensions/{siteExtensionId}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            siteExtensionId
          )
          .delete(options);
      },
      listSlotDifferencesSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/slotsdiffs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      swapSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/slotsswap",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listSnapshotsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/snapshots",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listSnapshotsFromDRSecondarySlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/snapshotsdr",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getSourceControlSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      createOrUpdateSourceControlSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .put(options);
      },
      deleteSourceControlSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .delete(options);
      },
      updateSourceControlSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .patch(options);
      },
      startSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/start",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      startNetworkTraceSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/startNetworkTrace",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      stopSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/stop",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      stopNetworkTraceSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/stopNetworkTrace",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      syncRepositorySlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/sync",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      syncFunctionTriggersSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/syncfunctiontriggers",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .post(options);
      },
      listTriggeredWebJobsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getTriggeredWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .get(options);
      },
      deleteTriggeredWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .delete(options);
      },
      listTriggeredWebJobHistorySlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/history",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .get(options);
      },
      getTriggeredWebJobHistorySlot: (
        subscriptionId,
        resourceGroupName,
        id,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/history/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            slot,
            webJobName
          )
          .get(options);
      },
      runTriggeredWebJobSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/triggeredwebjobs/{webJobName}/run",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .post(options);
      },
      listUsagesSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/usages",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      listVnetConnectionsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getVnetConnectionSlot: (subscriptionId, resourceGroupName, name, slot, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName
          )
          .get(options);
      },
      createOrUpdateVnetConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName
          )
          .put(options);
      },
      deleteVnetConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName
          )
          .delete(options);
      },
      updateVnetConnectionSlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName
          )
          .patch(options);
      },
      getVnetConnectionGatewaySlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName,
            gatewayName
          )
          .get(options);
      },
      createOrUpdateVnetConnectionGatewaySlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName,
            gatewayName
          )
          .put(options);
      },
      updateVnetConnectionGatewaySlot: (
        subscriptionId,
        resourceGroupName,
        name,
        slot,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            vnetName,
            gatewayName
          )
          .patch(options);
      },
      listWebJobsSlot: (subscriptionId, resourceGroupName, name, slot, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/webjobs",
            subscriptionId,
            resourceGroupName,
            name,
            slot
          )
          .get(options);
      },
      getWebJobSlot: (subscriptionId, resourceGroupName, name, slot, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slots/{slot}/webjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            slot,
            webJobName
          )
          .get(options);
      },
      listSlotDifferencesFromProduction: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slotsdiffs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      swapSlotWithProduction: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/slotsswap",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listSnapshots: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/snapshots",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listSnapshotsFromDRSecondary: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/snapshotsdr",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getSourceControl: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      createOrUpdateSourceControl: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .put(options);
      },
      deleteSourceControl: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .delete(options);
      },
      updateSourceControl: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sourcecontrols/web",
            subscriptionId,
            resourceGroupName,
            name
          )
          .patch(options);
      },
      start: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/start",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      startNetworkTrace: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/startNetworkTrace",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      stop: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/stop",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      stopNetworkTrace: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/stopNetworkTrace",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      syncRepository: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/sync",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      syncFunctionTriggers: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/syncfunctiontriggers",
            subscriptionId,
            resourceGroupName,
            name
          )
          .post(options);
      },
      listTriggeredWebJobs: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getTriggeredWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .get(options);
      },
      deleteTriggeredWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .delete(options);
      },
      listTriggeredWebJobHistory: (
        subscriptionId,
        resourceGroupName,
        name,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/history",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .get(options);
      },
      getTriggeredWebJobHistory: (
        subscriptionId,
        resourceGroupName,
        id,
        name,
        webJobName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/history/{id}",
            subscriptionId,
            resourceGroupName,
            id,
            name,
            webJobName
          )
          .get(options);
      },
      runTriggeredWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/triggeredwebjobs/{webJobName}/run",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .post(options);
      },
      listUsages: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/usages",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      listVnetConnections: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getVnetConnection: (subscriptionId, resourceGroupName, name, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .get(options);
      },
      createOrUpdateVnetConnection: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .put(options);
      },
      deleteVnetConnection: (subscriptionId, resourceGroupName, name, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .delete(options);
      },
      updateVnetConnection: (subscriptionId, resourceGroupName, name, vnetName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName
          )
          .patch(options);
      },
      getVnetConnectionGateway: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            gatewayName
          )
          .get(options);
      },
      createOrUpdateVnetConnectionGateway: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            gatewayName
          )
          .put(options);
      },
      updateVnetConnectionGateway: (
        subscriptionId,
        resourceGroupName,
        name,
        vnetName,
        gatewayName,
        options
      ) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/virtualNetworkConnections/{vnetName}/gateways/{gatewayName}",
            subscriptionId,
            resourceGroupName,
            name,
            vnetName,
            gatewayName
          )
          .patch(options);
      },
      listWebJobs: (subscriptionId, resourceGroupName, name, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/webjobs",
            subscriptionId,
            resourceGroupName,
            name
          )
          .get(options);
      },
      getWebJob: (subscriptionId, resourceGroupName, name, webJobName, options) => {
        return client
          .path(
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/webjobs/{webJobName}",
            subscriptionId,
            resourceGroupName,
            name,
            webJobName
          )
          .get(options);
      },
    },
  };
}
