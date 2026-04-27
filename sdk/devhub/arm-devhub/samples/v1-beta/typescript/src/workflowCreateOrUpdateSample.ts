// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workflow
 *
 * @summary creates or updates a workflow
 * x-ms-original-file: 2025-03-01-preview/Workflow_CreateOrUpdate.json
 */
async function createWorkflow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.createOrUpdate("resourceGroup1", "workflow1", {
    location: "location1",
    properties: {
      githubWorkflowProfile: {
        acr: {
          acrRegistryName: "registry1",
          acrRepositoryName: "repo1",
          acrResourceGroup: "resourceGroup1",
          acrSubscriptionId: "00000000-0000-0000-0000-000000000000",
        },
        aksResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resourceGroup1/providers/Microsoft.ContainerService/managedClusters/cluster1",
        branchName: "branch1",
        deploymentProperties: {
          kubeManifestLocations: ["/src/manifests/"],
          manifestType: "kube",
          overrides: { key1: "value1" },
        },
        dockerBuildContext: "repo1/src/",
        dockerfile: "repo1/images/Dockerfile",
        namespace: "namespace1",
        oidcCredentials: {
          azureClientId: "12345678-3456-7890-5678-012345678901",
          azureTenantId: "66666666-3456-7890-5678-012345678901",
        },
        repositoryName: "repo1",
        repositoryOwner: "owner1",
      },
    },
    tags: { appname: "testApp" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a workflow
 *
 * @summary creates or updates a workflow
 * x-ms-original-file: 2025-03-01-preview/Workflow_CreateOrUpdate_WithArtifactGen.json
 */
async function createWorkflowWithArtifactGeneration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.createOrUpdate("resourceGroup1", "workflow1", {
    location: "location1",
    properties: {
      artifactGenerationProperties: {
        appName: "my-app",
        dockerfileGenerationMode: "enabled",
        dockerfileOutputDirectory: "./",
        generationLanguage: "javascript",
        imageName: "myimage",
        imageTag: "latest",
        languageVersion: "14",
        manifestGenerationMode: "enabled",
        manifestOutputDirectory: "./",
        manifestType: "kube",
        namespace: "my-namespace",
        port: "80",
      },
      githubWorkflowProfile: {
        acr: {
          acrRegistryName: "registry1",
          acrRepositoryName: "repo1",
          acrResourceGroup: "resourceGroup1",
          acrSubscriptionId: "00000000-0000-0000-0000-000000000000",
        },
        aksResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/resourceGroup1/providers/Microsoft.ContainerService/managedClusters/cluster1",
        branchName: "branch1",
        deploymentProperties: {
          kubeManifestLocations: ["/src/manifests/"],
          manifestType: "kube",
          overrides: { key1: "value1" },
        },
        dockerBuildContext: "repo1/src/",
        dockerfile: "repo1/images/Dockerfile",
        oidcCredentials: {
          azureClientId: "12345678-3456-7890-5678-012345678901",
          azureTenantId: "66666666-3456-7890-5678-012345678901",
        },
        repositoryName: "repo1",
        repositoryOwner: "owner1",
      },
    },
    tags: { appname: "testApp" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a workflow
 *
 * @summary creates or updates a workflow
 * x-ms-original-file: 2025-03-01-preview/Workflow_CreateOrUpdate_WithTemplateWorkflow.json
 */
async function createTemplateWorkflow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.workflow.createOrUpdate("resourceGroup1", "workflow1", {
    location: "location1",
    properties: {
      templateWorkflowProfile: {
        deploymentTemplate: {
          destination: ".",
          parameters: { key1: "value1" },
          templateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.DevHub/templates/test-template/versions/0.0.1",
        },
        dockerfileTemplate: {
          destination: ".",
          parameters: { key1: "value1" },
          templateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.DevHub/templates/test-template/versions/0.0.1",
        },
        gitHubProviderProfile: {
          oidcCredentials: { azureClientId: "test-client-id", azureTenantId: "test" },
          repository: {
            branchName: "main",
            repositoryName: "test-repo",
            repositoryOwner: "test-owner",
          },
        },
        manifestTemplates: [
          {
            destination: ".",
            parameters: { key1: "value1" },
            templateId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.DevHub/templates/test-template/versions/0.0.1",
          },
        ],
        repositoryProvider: "github",
        workflowTemplate: {
          destination: ".",
          parameters: { key1: "value1" },
          templateId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/providers/Microsoft.DevHub/templates/test-template/versions/0.0.1",
        },
      },
    },
    tags: { appname: "testApp" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createWorkflow();
  await createWorkflowWithArtifactGeneration();
  await createTemplateWorkflow();
}

main().catch(console.error);
