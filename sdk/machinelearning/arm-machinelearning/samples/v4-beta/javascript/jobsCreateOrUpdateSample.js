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
 * x-ms-original-file: 2026-03-15-preview/Job/AutoMLJob/createOrUpdate.json
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
 * x-ms-original-file: 2026-03-15-preview/Job/CommandJob/createOrUpdate.json
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
      parentJobName: "ParentRun",
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
 * x-ms-original-file: 2026-03-15-preview/Job/CommandJob/createOrUpdateRayDistribution.json
 */
async function createOrUpdateCommandJobWithRayDistribution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      description: "Ray distributed command job",
      codeId: "string",
      command: "python train.py",
      computeId: "string",
      displayName: "ray-multi-node-job",
      distribution: {
        distributionType: "Ray",
        port: 6379,
        includeDashboard: true,
        dashboardPort: 8265,
      },
      environmentId: "string",
      environmentVariables: { string: "string" },
      experimentName: "ray-experiment",
      identity: { identityType: "AMLToken" },
      jobType: "Command",
      resources: { instanceCount: 2, instanceType: "string", properties: {} },
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
 * x-ms-original-file: 2026-03-15-preview/Job/DistillationJob/createOrUpdate.json
 */
async function createOrUpdateDistillationJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      computeId: "gpu-compute",
      dataGenerationDetails: {
        dataGenerationTaskType: "Conversation",
        dataGenerationType: "LabelGeneration",
        teacherModelEndpoint: { endpointName: "newfinetuneinttesting-jbuob" },
        trainingData: {
          description: undefined,
          jobInputType: "uri_file",
          mode: "ReadOnlyMount",
          uri: "azureml://registries/azureml-meta/models/Llama-2-7b/versions/11",
        },
      },
      experimentName: "llm-finetuning",
      finetuningDetails: {
        studentModel: {
          description: undefined,
          jobInputType: "mlflow_model",
          mode: "ReadOnlyMount",
          uri: "azureml://registries/azureml-meta/models/Meta-Llama-3.1-8B-Instruct/versions/1",
        },
      },
      jobType: "Distillation",
      outputs: {
        string: {
          description: "string",
          jobOutputType: "mlflow_model",
          mode: "ReadWriteMount",
          uri: "string",
        },
      },
      queueSettings: { jobTier: "Standard" },
      resources: { instanceTypes: ["Standard_NC6"] },
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
 * x-ms-original-file: 2026-03-15-preview/Job/FineTuningJob/createOrUpdate.json
 */
async function createOrUpdateFineTuningJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.jobs.createOrUpdate("test-rg", "my-aml-workspace", "string", {
    properties: {
      computeId: "gpu-compute",
      experimentName: "llm-finetuning",
      fineTuningDetails: {
        model: {
          description: undefined,
          jobInputType: "mlflow_model",
          mode: "ReadOnlyMount",
          uri: "azureml://registries/azureml-meta/models/Llama-2-7b/versions/11",
        },
        modelProvider: "Custom",
        taskType: "TextCompletion",
        trainingData: {
          description: undefined,
          jobInputType: "uri_file",
          mode: "ReadOnlyMount",
          uri: "azureml://registries/azureml-meta/models/Llama-2-7b/versions/11",
        },
      },
      jobType: "FineTuning",
      outputs: {
        string: {
          description: "string",
          jobOutputType: "mlflow_model",
          mode: "ReadWriteMount",
          uri: "string",
        },
      },
      queueSettings: { jobTier: "Standard" },
      resources: { instanceTypes: ["Standard_NC6"] },
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
 * x-ms-original-file: 2026-03-15-preview/Job/PipelineJob/createOrUpdate.json
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
 * x-ms-original-file: 2026-03-15-preview/Job/SweepJob/createOrUpdate.json
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
  await createOrUpdateCommandJobWithRayDistribution();
  await createOrUpdateDistillationJob();
  await createOrUpdateFineTuningJob();
  await createOrUpdatePipelineJob();
  await createOrUpdateSweepJob();
}

main().catch(console.error);
