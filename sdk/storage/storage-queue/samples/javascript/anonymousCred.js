/*
 Setup: Enter your storage account name and SAS in main()
*/

const { QueueServiceClient, AnonymousCredential } = require("../.."); // Change to "@azure/storage-queue" in your package

async function main() {
  // Enter your storage account name and SAS
  const account = process.env.ACCOUNT_NAME || "";
  const accountSas = process.env.ACCOUNT_SAS || "";

  // Use AnonymousCredential when url already includes a SAS signature
  const anonymousCredential = new AnonymousCredential();

  const queueServiceClient = new QueueServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${account}.queue.core.windows.net${accountSas}`,
    anonymousCredential
  );

  // Create a new queue
  const queueName = `newqueue${new Date().getTime()}`;
  const queueClient = queueServiceClient.getQueueClient(queueName);
  const createQueueResponse = await queueClient.create();
  console.log(
    `Create queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
  );

  // Delete the queue.
  const deleteQueueResponse = await queueClient.delete();
  console.log(
    `Delete queue successfully, service assigned request Id: ${deleteQueueResponse.requestId}`
  );
}

// An async method returns a Promise object, which is compatible with then().catch() coding style.
main()
  .then(() => {
    console.log("Successfully executed sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
