// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesConfigurationClient } from "@azure/arm-kubernetesconfiguration-fluxconfigurations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Kubernetes Flux Configuration.
 *
 * @summary create a new Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/CreateFluxConfiguration.json
 */
async function createFluxConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.createOrUpdate(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    {
      gitRepository: {
        httpsCACert: "ZXhhbXBsZWNlcnRpZmljYXRl",
        repositoryRef: { branch: "master" },
        syncIntervalInSeconds: 600,
        timeoutInSeconds: 600,
        url: "https://github.com/Azure/arc-k8s-demo",
      },
      kustomizations: {
        "srs-kustomization1": {
          path: "./test/path",
          dependsOn: [],
          postBuild: {
            substitute: { cluster_env: "prod", replica_count: "2" },
            substituteFrom: [{ name: "cluster-test", kind: "ConfigMap", optional: true }],
          },
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
          wait: true,
        },
        "srs-kustomization2": {
          path: "./other/test/path",
          dependsOn: ["srs-kustomization1"],
          postBuild: {
            substituteFrom: [
              { name: "cluster-values", kind: "ConfigMap", optional: true },
              { name: "secret-name", kind: "Secret", optional: false },
            ],
          },
          prune: false,
          retryIntervalInSeconds: 600,
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
          wait: false,
        },
      },
      namespace: "srs-namespace",
      reconciliationWaitDuration: "PT30M",
      scope: "cluster",
      sourceKind: "GitRepository",
      suspend: false,
      waitForReconciliation: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes Flux Configuration.
 *
 * @summary create a new Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/CreateFluxConfigurationWithBucket.json
 */
async function createFluxConfigurationWithBucketSourceKind(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.createOrUpdate(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    {
      bucket: {
        accessKey: "fluxminiotest",
        bucketName: "flux",
        syncIntervalInSeconds: 1000,
        timeoutInSeconds: 1000,
        url: "https://fluxminiotest.az.minio.io",
      },
      kustomizations: {
        "srs-kustomization1": {
          path: "./test/path",
          dependsOn: [],
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
        },
        "srs-kustomization2": {
          path: "./other/test/path",
          dependsOn: ["srs-kustomization1"],
          prune: false,
          retryIntervalInSeconds: 600,
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
        },
      },
      namespace: "srs-namespace",
      scope: "cluster",
      sourceKind: "Bucket",
      suspend: false,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes Flux Configuration.
 *
 * @summary create a new Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/CreateFluxConfigurationWithOCIRepository.json
 */
async function createFluxConfigurationWithOCIRepositorySourceKind(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.createOrUpdate(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    {
      kustomizations: {
        "srs-kustomization1": {
          path: "./test/path",
          dependsOn: [],
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
        },
        "srs-kustomization2": {
          path: "./other/test/path",
          dependsOn: ["srs-kustomization1"],
          prune: false,
          retryIntervalInSeconds: 600,
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
        },
      },
      namespace: "srs-namespace",
      ociRepository: {
        serviceAccountName: "testserviceaccount",
        syncIntervalInSeconds: 1000,
        timeoutInSeconds: 1000,
        url: "oci://ghcr.io/stefanprodan/manifests/podinfo",
      },
      scope: "cluster",
      sourceKind: "OCIRepository",
      suspend: false,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a new Kubernetes Flux Configuration.
 *
 * @summary create a new Kubernetes Flux Configuration.
 * x-ms-original-file: 2025-04-01/CreateFluxConfigurationWithProvider.json
 */
async function createFluxConfigurationWithGitRepositoryProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.fluxConfigurations.createOrUpdate(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "srs-fluxconfig",
    {
      gitRepository: {
        httpsCACert: "ZXhhbXBsZWNlcnRpZmljYXRl",
        provider: "Azure",
        repositoryRef: { branch: "master" },
        syncIntervalInSeconds: 600,
        timeoutInSeconds: 600,
        url: "https://dev.azure.com/org/proj/_git/arc-k8s-demo",
      },
      kustomizations: {
        "srs-kustomization1": {
          path: "./test/path",
          dependsOn: [],
          postBuild: {
            substitute: { cluster_env: "prod", replica_count: "2" },
            substituteFrom: [{ name: "cluster-test", kind: "ConfigMap", optional: true }],
          },
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
          wait: true,
        },
        "srs-kustomization2": {
          path: "./other/test/path",
          dependsOn: ["srs-kustomization1"],
          postBuild: {
            substituteFrom: [
              { name: "cluster-values", kind: "ConfigMap", optional: true },
              { name: "secret-name", kind: "Secret", optional: false },
            ],
          },
          prune: false,
          retryIntervalInSeconds: 600,
          syncIntervalInSeconds: 600,
          timeoutInSeconds: 600,
          wait: false,
        },
      },
      namespace: "srs-namespace",
      reconciliationWaitDuration: "PT30M",
      scope: "cluster",
      sourceKind: "GitRepository",
      suspend: false,
      waitForReconciliation: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createFluxConfiguration();
  await createFluxConfigurationWithBucketSourceKind();
  await createFluxConfigurationWithOCIRepositorySourceKind();
  await createFluxConfigurationWithGitRepositoryProvider();
}

main().catch(console.error);
