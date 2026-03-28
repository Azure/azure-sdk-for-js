// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * @summary creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 * x-ms-original-file: 2025-12-01/Job/AutoMLJob/createOrUpdate.json
 */
async function createOrUpdateAutoMLJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "string",
      computeId: "string",
      displayName: "string",
      environmentId: "string",
      environmentVariables: { string: "string" },
      experimentName: "string",
      identity: { identityType: "AMLToken" },
      isArchived: false,
      jobType: "AutoML",
      outputs: {
        string: {
          description: "string",
          jobOutputType: "uri_file",
          mode: "ReadWriteMount",
          uri: "string",
        },
      },
      properties: { string: "string" },
      resources: {
        instanceCount: 1,
        instanceType: "string",
        properties: { string: { "9bec0ab0-c62f-4fa9-a97c-7b24bbcc90ad": null } },
      },
      services: {
        string: {
          endpoint: "string",
          jobServiceType: "string",
          port: 1,
          properties: { string: "string" },
        },
      },
      tags: { string: "string" },
      taskDetails: {
        limitSettings: { maxTrials: 2 },
        modelSettings: { validationCropSize: 2 },
        searchSpace: [{ validationCropSize: "choice(2, 360)" }],
        targetColumnName: "string",
        taskType: "ImageClassification",
        trainingData: { jobInputType: "mltable", uri: "string" },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * @summary creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 * x-ms-original-file: 2025-12-01/Job/CommandJob/createOrUpdate.json
 */
async function createOrUpdateCommandJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "string",
      codeId: "string",
      command: "string",
      computeId: "string",
      displayName: "string",
      distribution: { distributionType: "TensorFlow", parameterServerCount: 1, workerCount: 1 },
      environmentId: "string",
      environmentVariables: { string: "string" },
      experimentName: "string",
      identity: { identityType: "AMLToken" },
      inputs: { string: { description: "string", jobInputType: "literal", value: "string" } },
      jobType: "Command",
      limits: { jobLimitsType: "Command", timeout: "PT5M" },
      outputs: {
        string: {
          description: "string",
          jobOutputType: "uri_file",
          mode: "ReadWriteMount",
          uri: "string",
        },
      },
      properties: { string: "string" },
      resources: {
        instanceCount: 1,
        instanceType: "string",
        properties: { string: { "e6b6493e-7d5e-4db3-be1e-306ec641327e": null } },
      },
      services: {
        string: {
          endpoint: "string",
          jobServiceType: "string",
          port: 1,
          properties: { string: "string" },
        },
      },
      tags: { string: "string" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * @summary creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 * x-ms-original-file: 2025-12-01/Job/PipelineJob/createOrUpdate.json
 */
async function createOrUpdatePipelineJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "string",
      computeId: "string",
      displayName: "string",
      experimentName: "string",
      inputs: { string: { description: "string", jobInputType: "literal", value: "string" } },
      jobType: "Pipeline",
      outputs: {
        string: { description: "string", jobOutputType: "uri_file", mode: "Upload", uri: "string" },
      },
      properties: { string: "string" },
      services: {
        string: {
          endpoint: "string",
          jobServiceType: "string",
          port: 1,
          properties: { string: "string" },
        },
      },
      settings: {},
      tags: { string: "string" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * @summary creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 * x-ms-original-file: 2025-12-01/Job/SweepJob/createOrUpdate.json
 */
async function createOrUpdateSweepJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "string",
      computeId: "string",
      displayName: "string",
      earlyTermination: { delayEvaluation: 1, evaluationInterval: 1, policyType: "MedianStopping" },
      experimentName: "string",
      jobType: "Sweep",
      limits: {
        jobLimitsType: "Sweep",
        maxConcurrentTrials: 1,
        maxTotalTrials: 1,
        trialTimeout: "PT1S",
      },
      objective: { goal: "Minimize", primaryMetric: "string" },
      properties: { string: "string" },
      samplingAlgorithm: { samplingAlgorithmType: "Grid" },
      searchSpace: { string: {} },
      services: {
        string: {
          endpoint: "string",
          jobServiceType: "string",
          port: 1,
          properties: { string: "string" },
        },
      },
      tags: { string: "string" },
      trial: {
        codeId: "string",
        command: "string",
        distribution: { distributionType: "Mpi", processCountPerInstance: 1 },
        environmentId: "string",
        environmentVariables: { string: "string" },
        resources: {
          instanceCount: 1,
          instanceType: "string",
          properties: { string: { "e6b6493e-7d5e-4db3-be1e-306ec641327e": null } },
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAutoMLJob();
  await createOrUpdateCommandJob();
  await createOrUpdatePipelineJob();
  await createOrUpdateSweepJob();
}

main().catch(console.error);
