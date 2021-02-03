// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient, BlockBlobClient } = require("@azure/storage-blob");
const { QuantumJobClient } = require("../dist-esm/src");
const fs = require('fs');

class TestTokenCredential {
  constructor(token, expiresOn) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn.getTime() : Date.now() + 60*60*1000;
  }
  async getToken(_scopes,_options) {
    return {
      token : this.token,
      expiresOnTimestamp : this.expiresOn
    }
  }
}

// Simple example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
async function main() {
  // Environment variables have to be set
  try {
    // DefaultAzureCredential supports different authentication mechanisms and determines the appropriate credential type based of the environment it is executing in.
    // It attempts to use multiple credential types in an order until it finds a working credential.
    // DefaultAzureCredential expects the following three environment variables:
    // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // - AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();

    // Create a QuantumJobClient
    const subscriptionId = "677fc922-91d0-4bf6-9b06-4274d319a0fa"; //"your_subscription_id";
    const resourceGroupName = "sdk-review-rg"; //"your_resource_group_name";
    const workspaceName = "workspace-ms"; //"your_quantum_workspace_name";
    const storageContainerName = "mycontainer";
    const location = "westus"; //"your_location";
    const endpoint = "https://" + location + ".quantum.azure.com";

    const quantumJobClient = new QuantumJobClient(
      credential,
      subscriptionId,
      resourceGroupName,
      workspaceName,
      {
        endpoint: endpoint,
        credentialScopes: "https://quantum.microsoft.com/.default"
      }
    );

    console.log(`Created QuantumJobClient for:
  SubscriptionId: ${subscriptionId}
  ResourceGroup: ${resourceGroupName}
  WorkspaceName: ${workspaceName}
  Location: ${location}
`);

    console.log(`Getting Container Uri with SAS key...`);

    // Get container Uri with SAS key
    const containerUri = (
      await quantumJobClient.storage.sasUri({
        containerName: storageContainerName
      })
    ).sasUri;

    console.log(`Container Uri with SAS key:
  ${containerUri}
`);

    console.log(`Creating Container if not exist...`);

    // Create container if not exists
    const containerClient = new ContainerClient(containerUri);
    containerClient.createIfNotExists();

    console.log(`Uploading data into a blob...`);

    // Get input data blob Uri with SAS key
    const blobName = "myjobinput.json";
    const inputDataUri = (
      await quantumJobClient.storage.sasUri({
        containerName: storageContainerName,
        blobName: blobName
      })
    ).sasUri;

    // Upload input data to blob
    const blobClient = new BlockBlobClient(inputDataUri);
    const problemFilename = "problem.json";
    const fileContent = fs.readFileSync(problemFilename, "utf8");
    await blobClient.upload(fileContent, Buffer.byteLength(fileContent));

    console.log(`Input data Uri with SAS key:
  ${inputDataUri}
`);

    console.log(`Creating Quantum job...`);

    const randomId = `${Math.floor(Math.random() * 10000 + 1)}`;

    // Submit job
    const jobId = `job-${randomId}`;
    const jobName = `jobName-${randomId}`;
    const inputDataFormat = "microsoft.qio.v2";
    const outputDataFormat = "microsoft.qio-results.v2";
    const providerId = "microsoft";
    const target = "microsoft.paralleltempering-parameterfree.cpu";
    const createJobDetails = {
      containerUri: containerUri,
      inputDataFormat: inputDataFormat,
      providerId: providerId,
      target: target,
      id: jobId,
      inputDataUri: inputDataUri,
      name: jobName,
      outputDataFormat: outputDataFormat
    };
    const createdJob = await quantumJobClient.jobs.create(jobId, createJobDetails);

    console.log(`Job created:
  Id: ${createdJob.id}
  Name: ${createdJob.name}
  CreationTime: ${createdJob.creationTime}
  Status: ${createdJob.status}
`);

    console.log(`Getting Quantum job...`);

    // Get the job that we've just created based on its jobId
    const myJob = await quantumJobClient.jobs.get(jobId);

    console.log(`Job obtained:
  Id: ${myJob.id}
  Name: ${myJob.name}
  CreationTime: ${myJob.creationTime}
  Status: ${myJob.status}
  BeginExecutionTime: ${myJob.beginExecutionTime}
  EndExecutionTime: ${myJob.endExecutionTime}
  CancellationTime: ${myJob.cancellationTime}
  OutputDataFormat: ${myJob.outputDataFormat}
  OutputDataUri: ${myJob.outputDataUri}
`);

    console.log(`Getting list of Quantum jobs...`);
    let jobListResult = await quantumJobClient.jobs.list();
    let listOfJobs = await jobListResult.next();
    while (!listOfJobs.done) {
      let job = listOfJobs.value;
      console.log(`  ${job.name}`);
      listOfJobs = await jobListResult.next();
    }

    console.log();
  } catch (err) {
    console.log(err);
  }
}

main();
