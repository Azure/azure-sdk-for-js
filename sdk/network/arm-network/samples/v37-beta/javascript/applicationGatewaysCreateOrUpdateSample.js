// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified application gateway.
 *
 * @summary creates or updates the specified application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayCreate.json
 */
async function createApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.createOrUpdate("rg1", "appgw", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "eastus",
    backendAddressPools: [
      {
        name: "appgwpool",
        backendAddresses: [{ ipAddress: "10.0.1.1" }, { ipAddress: "10.0.1.2" }],
      },
      {
        name: "appgwpool1",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendAddressPools/appgwpool1",
        backendAddresses: [{ ipAddress: "10.0.0.1" }, { ipAddress: "10.0.0.2" }],
      },
    ],
    backendHttpSettingsCollection: [
      {
        name: "appgwbhs",
        cookieBasedAffinity: "Disabled",
        port: 80,
        requestTimeout: 30,
        protocol: "Http",
      },
    ],
    entraJWTValidationConfigs: [
      {
        name: "entraJWTValidationConfig1",
        clientId: "37293f5a-97b3-451d-b786-f532d711c9ff",
        tenantId: "70a036f6-8e4d-4615-bad6-149c02e7720d",
        unAuthorizedRequestAction: "Deny",
      },
    ],
    frontendIPConfigurations: [
      {
        name: "appgwfip",
        publicIPAddress: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/publicIPAddresses/appgwpip",
        },
      },
    ],
    frontendPorts: [
      { name: "appgwfp", port: 443 },
      { name: "appgwfp80", port: 80 },
    ],
    gatewayIPConfigurations: [
      {
        name: "appgwipc",
        subnet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet/subnets/appgwsubnet",
        },
      },
    ],
    globalConfiguration: { enableRequestBuffering: true, enableResponseBuffering: true },
    httpListeners: [
      {
        name: "appgwhl",
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/frontendIPConfigurations/appgwfip",
        },
        frontendPort: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/frontendPorts/appgwfp",
        },
        requireServerNameIndication: false,
        sslCertificate: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/sslCertificates/sslcert",
        },
        sslProfile: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/sslProfiles/sslProfile1",
        },
        protocol: "Https",
      },
      {
        name: "appgwhttplistener",
        frontendIPConfiguration: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/frontendIPConfigurations/appgwfip",
        },
        frontendPort: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/frontendPorts/appgwfp80",
        },
        protocol: "Http",
      },
    ],
    requestRoutingRules: [
      {
        name: "appgwrule",
        backendAddressPool: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendAddressPools/appgwpool",
        },
        backendHttpSettings: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/backendHttpSettingsCollection/appgwbhs",
        },
        entraJWTValidationConfig: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/entraJWTValidationConfigs/entraJWTValidationConfig1",
        },
        httpListener: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/httpListeners/appgwhl",
        },
        priority: 10,
        rewriteRuleSet: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/rewriteRuleSets/rewriteRuleSet1",
        },
        ruleType: "Basic",
      },
    ],
    rewriteRuleSets: [
      {
        name: "rewriteRuleSet1",
        rewriteRules: [
          {
            name: "Set X-Forwarded-For",
            actionSet: {
              requestHeaderConfigurations: [
                { headerName: "X-Forwarded-For", headerValue: "{var_add_x_forwarded_for_proxy}" },
              ],
              responseHeaderConfigurations: [
                { headerName: "Strict-Transport-Security", headerValue: "max-age=31536000" },
              ],
              urlConfiguration: { modifiedPath: "/abc" },
            },
            conditions: [
              {
                ignoreCase: true,
                negate: false,
                pattern: "^Bearer",
                variable: "http_req_Authorization",
              },
            ],
            ruleSequence: 102,
          },
        ],
      },
    ],
    sku: { name: "Standard_v2", capacity: 3, tier: "Standard_v2" },
    sslCertificates: [
      { name: "sslcert", data: "****", password: "****" },
      { name: "sslcert2", keyVaultSecretId: "https://kv/secret" },
    ],
    sslProfiles: [
      {
        name: "sslProfile1",
        clientAuthConfiguration: { verifyClientCertIssuerDN: true },
        sslPolicy: {
          cipherSuites: ["TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"],
          minProtocolVersion: "TLSv1_1",
          policyType: "Custom",
        },
        trustedClientCertificates: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/applicationGateways/appgw/trustedClientCertificates/clientcert",
          },
        ],
      },
    ],
    trustedClientCertificates: [{ name: "clientcert", data: "****" }],
    trustedRootCertificates: [
      { name: "rootcert", data: "****" },
      { name: "rootcert1", keyVaultSecretId: "https://kv/secret" },
    ],
  });
  console.log(result);
}

async function main() {
  await createApplicationGateway();
}

main().catch(console.error);
