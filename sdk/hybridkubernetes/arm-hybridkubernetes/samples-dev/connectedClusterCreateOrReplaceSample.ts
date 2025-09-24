// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 *
 * @summary API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/CreateClusterAgentless_KindAWSExample.json
 */

import type { ConnectedCluster } from "@azure/arm-hybridkubernetes";
import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createClusterAgentlessKindAwsExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const connectedCluster: ConnectedCluster = {
    identity: { type: "None" },
    kind: "AWS",
    location: "East US",
    properties: {
      agentPublicKeyCertificate: "",
      distribution: "eks",
      infrastructure: "aws",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result =
    await client.connectedClusterOperations.beginCreateOrReplaceAndWait(
      resourceGroupName,
      clusterName,
      connectedCluster,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 *
 * @summary API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/CreateClusterExample.json
 */
async function createClusterExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const connectedCluster: ConnectedCluster = {
    identity: { type: "SystemAssigned" },
    location: "East US",
    properties: {
      agentPublicKeyCertificate:
        "MIICYzCCAcygAwIBAgIBADANBgkqhkiG9w0BAQUFADAuMQswCQYDVQQGEwJVUzEMMAoGA1UEChMDSUJNMREwDwYDVQQLEwhMb2NhbCBDQTAeFw05OTEyMjIwNTAwMDBaFw0wMDEyMjMwNDU5NTlaMC4xCzAJBgNVBAYTAlVTMQwwCgYDVQQKEwNJQk0xETAPBgNVBAsTCExvY2FsIENBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD2bZEo7xGaX2/0GHkrNFZvlxBou9v1Jmt/PDiTMPve8r9FeJAQ0QdvFST/0JPQYD20rH0bimdDLgNdNynmyRoS2S/IInfpmf69iyc2G0TPyRvmHIiOZbdCd+YBHQi1adkj17NDcWj6S14tVurFX73zx0sNoMS79q3tuXKrDsxeuwIDAQABo4GQMIGNMEsGCVUdDwGG+EIBDQQ+EzxHZW5lcmF0ZWQgYnkgdGhlIFNlY3VyZVdheSBTZWN1cml0eSBTZXJ2ZXIgZm9yIE9TLzM5MCAoUkFDRikwDgYDVR0PAQH/BAQDAgAGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJ3+ocRyCTJw067dLSwr/nalx6YMMA0GCSqGSIb3DQEBBQUAA4GBAMaQzt+zaj1GU77yzlr8iiMBXgdQrwsZZWJo5exnAucJAEYQZmOfyLiM D6oYq+ZnfvM0n8G/Y79q8nhwvuxpYOnRSAXFp6xSkrIOeZtJMY1h00LKp/JX3Ng1svZ2agE126JHsQ0bhzN5TKsYfbwfTwfjdWAGy6Vf1nYi/rO+ryMO",
      azureHybridBenefit: "NotApplicable",
      distribution: "AKS",
      distributionVersion: "1.0",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result =
    await client.connectedClusterOperations.beginCreateOrReplaceAndWait(
      resourceGroupName,
      clusterName,
      connectedCluster,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 *
 * @summary API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/CreateClusterPrivateLinkExample.json
 */
async function createClusterPrivateLinkExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const connectedCluster: ConnectedCluster = {
    identity: { type: "SystemAssigned" },
    location: "East US",
    properties: {
      agentPublicKeyCertificate:
        "MIICYzCCAcygAwIBAgIBADANBgkqhkiG9w0BAQUFADAuMQswCQYDVQQGEwJVUzEMMAoGA1UEChMDSUJNMREwDwYDVQQLEwhMb2NhbCBDQTAeFw05OTEyMjIwNTAwMDBaFw0wMDEyMjMwNDU5NTlaMC4xCzAJBgNVBAYTAlVTMQwwCgYDVQQKEwNJQk0xETAPBgNVBAsTCExvY2FsIENBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD2bZEo7xGaX2/0GHkrNFZvlxBou9v1Jmt/PDiTMPve8r9FeJAQ0QdvFST/0JPQYD20rH0bimdDLgNdNynmyRoS2S/IInfpmf69iyc2G0TPyRvmHIiOZbdCd+YBHQi1adkj17NDcWj6S14tVurFX73zx0sNoMS79q3tuXKrDsxeuwIDAQABo4GQMIGNMEsGCVUdDwGG+EIBDQQ+EzxHZW5lcmF0ZWQgYnkgdGhlIFNlY3VyZVdheSBTZWN1cml0eSBTZXJ2ZXIgZm9yIE9TLzM5MCAoUkFDRikwDgYDVR0PAQH/BAQDAgAGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJ3+ocRyCTJw067dLSwr/nalx6YMMA0GCSqGSIb3DQEBBQUAA4GBAMaQzt+zaj1GU77yzlr8iiMBXgdQrwsZZWJo5exnAucJAEYQZmOfyLiM D6oYq+ZnfvM0n8G/Y79q8nhwvuxpYOnRSAXFp6xSkrIOeZtJMY1h00LKp/JX3Ng1svZ2agE126JHsQ0bhzN5TKsYfbwfTwfjdWAGy6Vf1nYi/rO+ryMO",
      azureHybridBenefit: "NotApplicable",
      distribution: "AKS",
      distributionVersion: "1.0",
      privateLinkScopeResourceId:
        "/subscriptions/{subscriptionId}/resourceGroups/myResourceGroup/providers/Microsoft.HybridCompute/privateLinkScopes/privateLinkScopeName",
      privateLinkState: "Enabled",
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result =
    await client.connectedClusterOperations.beginCreateOrReplaceAndWait(
      resourceGroupName,
      clusterName,
      connectedCluster,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 *
 * @summary API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/CreateCluster_KindExample.json
 */
async function createClusterKindExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const connectedCluster: ConnectedCluster = {
    identity: { type: "SystemAssigned" },
    kind: "ProvisionedCluster",
    location: "East US",
    properties: {
      aadProfile: {
        adminGroupObjectIDs: ["56f988bf-86f1-41af-91ab-2d7cd011db47"],
        enableAzureRbac: true,
        tenantID: "82f988bf-86f1-41af-91ab-2d7cd011db47",
      },
      agentPublicKeyCertificate: "",
      arcAgentProfile: {
        agentAutoUpgrade: "Enabled",
        desiredAgentVersion: "0.1.0",
        systemComponents: [
          { type: "Strato", majorVersion: 0, userSpecifiedVersion: "0.1.1" },
        ],
      },
      azureHybridBenefit: "NotApplicable",
      distribution: "AKS",
      distributionVersion: "1.0",
      oidcIssuerProfile: { enabled: true },
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result =
    await client.connectedClusterOperations.beginCreateOrReplaceAndWait(
      resourceGroupName,
      clusterName,
      connectedCluster,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 *
 * @summary API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/UpdateClusterByPutExample.json
 */
async function updateClusterByPutExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const resourceGroupName =
    process.env["HYBRIDKUBERNETES_RESOURCE_GROUP"] || "k8sc-rg";
  const clusterName = "testCluster";
  const connectedCluster: ConnectedCluster = {
    identity: { type: "SystemAssigned" },
    location: "East US",
    properties: {
      agentPublicKeyCertificate:
        "MIICYzCCAcygAwIBAgIBADANBgkqhkiG9w0BAQUFADAuMQswCQYDVQQGEwJVUzEMMAoGA1UEChMDSUJNMREwDwYDVQQLEwhMb2NhbCBDQTAeFw05OTEyMjIwNTAwMDBaFw0wMDEyMjMwNDU5NTlaMC4xCzAJBgNVBAYTAlVTMQwwCgYDVQQKEwNJQk0xETAPBgNVBAsTCExvY2FsIENBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD2bZEo7xGaX2/0GHkrNFZvlxBou9v1Jmt/PDiTMPve8r9FeJAQ0QdvFST/0JPQYD20rH0bimdDLgNdNynmyRoS2S/IInfpmf69iyc2G0TPyRvmHIiOZbdCd+YBHQi1adkj17NDcWj6S14tVurFX73zx0sNoMS79q3tuXKrDsxeuwIDAQABo4GQMIGNMEsGCVUdDwGG+EIBDQQ+EzxHZW5lcmF0ZWQgYnkgdGhlIFNlY3VyZVdheSBTZWN1cml0eSBTZXJ2ZXIgZm9yIE9TLzM5MCAoUkFDRikwDgYDVR0PAQH/BAQDAgAGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJ3+ocRyCTJw067dLSwr/nalx6YMMA0GCSqGSIb3DQEBBQUAA4GBAMaQzt+zaj1GU77yzlr8iiMBXgdQrwsZZWJo5exnAucJAEYQZmOfyLiM D6oYq+ZnfvM0n8G/Y79q8nhwvuxpYOnRSAXFp6xSkrIOeZtJMY1h00LKp/JX3Ng1svZ2agE126JHsQ0bhzN5TKsYfbwfTwfjdWAGy6Vf1nYi/rO+ryMO",
      azureHybridBenefit: "NotApplicable",
      distribution: "AKS",
      distributionVersion: "1.0",
      gateway: {
        enabled: true,
        resourceId:
          "/subscriptions/1bfbb5d0-917e-4346-9026-1d3b344417f5/resourceGroups/akkeshar/providers/Microsoft.HybridCompute/gateways/gateway1",
      },
    },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result =
    await client.connectedClusterOperations.beginCreateOrReplaceAndWait(
      resourceGroupName,
      clusterName,
      connectedCluster,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createClusterAgentlessKindAwsExample();
  await createClusterExample();
  await createClusterPrivateLinkExample();
  await createClusterKindExample();
  await updateClusterByPutExample();
}

main().catch(console.error);
