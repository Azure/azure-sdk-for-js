## Azure Quantum Jobs client library for JavaScript

This package contains an isomorphic SDK for QuantumJobClient.

Azure Quantum is a Microsoft Azure service that you can use to run quantum computing programs or solve optimization problems in the cloud.  Using the Azure Quantum tools and SDKs, you can create quantum programs and run them against different quantum simulators and machines.  You can use the Azure.Quantum.Jobs client library to:
- Create, enumerate, and cancel quantum jobs
- Enumerate provider status and quotas

  [Source code][source] | [API reference documentation](https://docs.microsoft.com/qsharp/api/) | [Product documentation](https://docs.microsoft.com/azure/quantum/)

## Getting started

This section includes everything a developer needs to install and create their first client connection *very quickly*.

### Install the package

Install the Azure Quantum Jobs client library for Javascript with `npm`:

```bash
npm install @azure/quantum-jobs
```

### Prerequisites

- Node.js version 8.x.x or higher
- [Azure subscription](https://azure.microsoft.com/free/)
- [Azure Quantum Workspace][workspaces]

### Authenticate the client

To authenticate with the service, you can use [DefaultAzureCredential](https://docs.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet). This will try different authentication mechanisms based on the environment (e.g. Environment Variables, ManagedIdentity, CachedTokens) and finally it will fallback to InteractiveBrowserCredential.

The client also allows the user to override the above behavior by passing their own [TokenCredential](https://docs.microsoft.com/dotnet/api/azure.core.tokencredential?view=azure-dotnet).

`TokenCredential` is the default Authentication mechanism used by Azure SDKs.

## Key concepts

`QuantumJobClient` is the root class to be used to authenticate, and create, enumerate, and cancel jobs.

`JobDetails` contains all the properties of a job.

`ProviderStatus` contains status information for a provider.

`QuantumJobQuota` contains quota properties.

## Examples

### Create the client

Create an instance of the QuantumJobClient by passing in these parameters:
- [Subscription Id][subscriptions] - looks like XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX and can be found in your list of subscriptions on azure
- [Resource Group Name][resource-groups] - a container that holds related resources for an Azure solution 
- [Workspace Name][workspaces] - a collection of assets associated with running quantum or optimization applications
- [Location][location] - choose the best data center by geographical region 
- [Storage Container Name][blob-storage] - your blob storage 
- [Credential][credentials] - used to authenticate 

```Javascript Snippet
    const credential = new DefaultAzureCredential();

    // Create a QuantumJobClient
    const subscriptionId = "your_subscription_id";
    const resourceGroupName = "your_resource_group_name";
    const workspaceName = "your_quantum_workspace_name";
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
```

### Get Container SAS URI

Create a storage container where to put your data.

```Javascript Snippet
    // Get container Uri with SAS key
    const containerUri = (
      await quantumJobClient.storage.sasUri({
        containerName: storageContainerName
      })
    ).sasUri;

    // Create container if not exists
    const containerClient = new ContainerClient(containerUri);
    containerClient.createIfNotExists();
```

### Upload Input Data

Using the SAS URI, upload the json input data to the blob client.
This contains the parameters to be used with [Quantum Inspired Optimizations](https://docs.microsoft.com/azure/quantum/optimization-overview-introduction)

```Javascript Snippet
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
```

### Create The Job

Now that you've uploaded your problem definition to Azure Storage, you can use `jobs.create` to define an Azure Quantum job.

```Javascript Snippet
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
```

### Get Job

`GetJob` retrieves a specific job by its id.

```Javascript Snippet
    // Get the job that we've just created based on its jobId
    const myJob = await quantumJobClient.jobs.get(jobId);
```

### Get Jobs

To enumerate all the jobs in the workspace, use the `jobs.list` method.

```Javascript Snippet
    let jobListResult = await quantumJobClient.jobs.list();
    let listOfJobs = await jobListResult.next();
    while (!listOfJobs.done) {
      let job = listOfJobs.value;
      console.log(`  ${job.name}`);
      listOfJobs = await jobListResult.next();
    }
```


## Next steps

*  Visit our [Product documentation](https://docs.microsoft.com/azure/quantum/) to learn more about Azure Quantum.

## Contributing

See the [CONTRIBUTING.md][contributing] for details on building,
testing, and contributing to this library.

This project welcomes contributions and suggestions.  Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution. For
details, visit [cla.microsoft.com](cla.microsoft.com).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any
additional questions or comments.

## Troubleshooting

All Quantum Jobs service operations will throw a RequestFailedException on failure with helpful ErrorCodes. Many of these errors are recoverable.

<!-- LINKS -->
[source]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/quantum/quantum-jobs/src
[resource-groups]: https://docs.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal
[workspaces]: https://docs.microsoft.com/azure/quantum/how-to-create-quantum-workspaces-with-the-azure-portal
[location]: https://azure.microsoft.com/global-infrastructure/services/?products=quantum
[blob-storage]: https://docs.microsoft.com/azure/storage/blobs/storage-blobs-introduction
[contributing]: https://github.com/Azure/azure-sdk-for-js/tree/master/CONTRIBUTING.md
[subscriptions]: https://ms.portal.azure.com/#blade/Microsoft_Azure_Billing/SubscriptionsBlade
[credentials]: https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest#credentials
[style-guide-msft]: https://docs.microsoft.com/style-guide/capitalization
[style-guide-cloud]: https://aka.ms/azsdk/cloud-style-guide

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fappconfiguration%2Fapp-configuration%2FREADME.png)
