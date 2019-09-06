/* 
 Setup: Enter your storage account name and shared key in main()
*/

import { SharedKeyCredential, QueueServiceClient } from "../../src"; // Change to "@azure/storage-queue" in your package

async function main() {
  // Enter your storage account name and shared key
  const account = "";
  const accountKey = "";

  // Use SharedKeyCredential with storage account and account key
  // SharedKeyCredential is only avaiable in Node.js runtime, not in browsers
  const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net`,
    sharedKeyCredential,
    {
      // proxy can either be a URL like "http://localhost:3128"
      // or
      // an option bag consisting {host, port, username, password }
      proxy: { host: "http://localhost", port: 3128, username: "username", password: "password" }
    }
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
    console.log("Successfully executed the sample.");
  })
  .catch((err) => {
    console.log(err.message);
  });
