const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete router jobQueue
async function deleteJobQueue() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "queue-123";

  const result = await routerClient.path("/routing/queues/{queueId}", entityId).delete();

  console.log("router jobQueue: " + result);
}

deleteJobQueue().catch(console.error);
