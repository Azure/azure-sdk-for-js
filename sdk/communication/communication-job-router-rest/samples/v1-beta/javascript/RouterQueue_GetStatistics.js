const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router jobQueue's statistics

async function getJobQueueStatistics() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerClient.path("/routing/queues/{queueId}/statistics", entityId).get();

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
