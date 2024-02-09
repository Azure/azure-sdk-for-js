const JobRouter = require("../src").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router jobQueue

async function getJobQueue() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerClient.path("/routing/queues/{queueId}", entityId).get();

  console.log("router jobQueue: " + result);
}

getJobQueue().catch(console.error);
