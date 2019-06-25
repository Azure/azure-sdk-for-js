/*
 Setup: Enter your Azure Active Directory credentials as described in main()
*/

const {
  QueueServiceClient,
  newPipeline,
} = require("../.."); // Change to "@azure/storage-queue" in your package

const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // Enter your storage account name and shared key
  const account = "";

  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  const defaultAzureCredential = new DefaultAzureCredential();

  const pipeline = newPipeline(defaultAzureCredential, {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    // logger: MyLogger, // A customized logger implementing IHttpPipelineLogger interface
    retryOptions: {
      maxTries: 4
    }, // Retry options
    telemetry: {
      value: "BasicSample/V11.0.0"
    } // Customized telemetry string
  });

  // List queues
  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net`,
    pipeline
  );

  console.log(`List queues`);
  let marker;
  do {
    const listQueuesResponse = await queueServiceClient.listQueuesSegment(
      marker
    );

    marker = listQueuesResponse.nextMarker;
    for (const queue of listQueuesResponse.queueItems) {
      console.log(`Queue: ${queue.name}`);
    }
  } while (marker);
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
