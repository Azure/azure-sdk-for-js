// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient, BlockBlobClient } = require("@azure/storage-blob");
const { QuantumJobClient } = require("@azure/quantum-jobs");
const { inspect } = require("util");

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
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
    const location = "your_location";
    const storageContainerName = "your_container_name";

    const quantumJobClient =
        new QuantumJobClient(
            subscriptionId,
            resourceGroupName,
            workspaceName,
            location,
            credential);

    console.log(`Created QuantumJobClient for:
SubscriptionId: ${subscriptionId}
ResourceGroup: ${resourceGroupName}
workspaceName: ${workspaceName}
location: ${location}
`);

    console.log(`Getting Container Uri with SAS key...`);

    // Get container Uri with SAS key
    const containerUri = (await client.storage.sasUri(
        {
          containerName: storageContainerName
        })).sasUri;

    console.log(`Container Uri with SAS key:
${containerUri}
`);

    console.log(`Creating Container if not exist...`);

    // Create container if not exists
    const containerClient = new ContainerClient(new Uri(containerUri));
    containerClient.CreateIfNotExists();

    console.log(`Uploading data into a blob...`);

    // Get input data blob Uri with SAS key
    const blobName = "myjobinput.json";
    const inputDataUri = (await client.storage.sasUri(
        {
          containerName: containerName,
          blobName: blobName
        })).sasUri;

    // Upload input data to blob
    const blobClient = new BlockBlobClient(inputDataUri, credentials);
    const problemFilename = "problem.json";
    const fileContent = fs.readFileSync(problemFilename, 'utf8');
    await blobClient.upload(fileContent, Buffer.byteLength(fileContent));

    console.log(`Input data Uri with SAS key:
${inputDataUri}
`);

    console.log(`Creating Quantum job...`);

    const randomId = `${Math.floor((Math.random() * 10000) + 1)}`;

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
Id: ${createdJob.Id}
Name: ${createdJob.Name}
CreationTime: ${createdJob.CreationTime}
Status: ${createdJob.Status}
`);

    console.log(`Getting Quantum job...`);

    // Get the job that we've just created based on its jobId
    const myJob = await quantumJobClient.jobs.get(jobId);

    console.log(`Job obtained:
Id: ${myJob.Id}
Name: ${myJob.Name}
CreationTime: ${myJob.CreationTime}
Status: ${myJob.Status}
BeginExecutionTime: ${myJob.BeginExecutionTime}
EndExecutionTime: ${myJob.EndExecutionTime}
CancellationTime: ${myJob.CancellationTime}
OutputDataFormat: ${myJob.OutputDataFormat}
OutputDataUri: ${myJob.OutputDataUri}
`);

    console.log(`Getting list of Quantum jobs...`);

    // Get all jobs from the workspace (.ToList() will force all pages to be fetched)
    var allJobs = await quantumJobClient.jobs.list();

    console.log(`${allJobs.Count} jobs found. Listing the first 10...`);
    allJobs.forEach(function (job) {
      console.log(`  ${job.Name}`);
    }); 
    console.log();

  } catch (err) {
    console.log(err);
  }
}

main();