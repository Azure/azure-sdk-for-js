const { randomUUID } = require("crypto");

const { AzureKeyCredential } = require("@azure/core-auth");

const createFaceClient = require("@azure-rest/ai-vision-face").default,
  { isUnexpected } = require("@azure-rest/ai-vision-face");

require("dotenv/config");

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary Liveness detection.
 */

const pressAnyKeyToContinue = () =>
  new Promise((resolve) => {
    const { stdin } = process;
    const { isRaw } = stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.once("data", () => {
      stdin.pause();
      stdin.setRawMode(isRaw);
      resolve();
    });
  });

const waitForLivenessRequest = async () => {
  // Wait for request from client device.
};

const sendTokenToClientDevices = async (_token) => {
  // Send the token to client devices.
};

const waitForLivenessSessionComplete = async () => {
  console.log(
    "Please refer to https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness and use the mobile client SDK to perform liveness detection on your mobile application.",
  );
  console.log(
    "Press any key to continue when you complete these steps to run sample to get session results...",
  );
  await pressAnyKeyToContinue();
};

async function main() {
  // This sample follows the documentation: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness
  // We will follow the steps in https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness#orchestrate-the-liveness-solution to demo the sample code in app server.

  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  // 1. A client device will send a request to start liveness check to us.
  await waitForLivenessRequest();

  // 2.Send a request to Face API to create a liveness detection session.
  const createLivenessSessionResponse = await client.path("/detectLiveness-sessions").post({
    body: {
      livenessOperationMode: "Passive",
      deviceCorrelationId: randomUUID(),
    },
  });
  if (isUnexpected(createLivenessSessionResponse)) {
    throw new Error(createLivenessSessionResponse.body.error.message);
  }
  console.log("Create liveness session:");
  console.log(JSON.stringify(createLivenessSessionResponse.body, null, 2));

  const { sessionId, authToken } = createLivenessSessionResponse.body;

  // 3. Pass the AuthToken to client device.
  // Client device will process the step 4, 5, 6 in the documentation 'Orchestrate the liveness solution'
  await sendTokenToClientDevices(authToken);

  // 7. wait for client device notifyus us that liveness session completed.
  await waitForLivenessSessionComplete();

  // 8. After client devices perform the action, we can get the result from the following APIs.
  // Get session results.
  const getLivenessSessionResultResponse = await client
    .path("/detectLiveness-sessions/{sessionId}", sessionId)
    .get();
  if (isUnexpected(getLivenessSessionResultResponse)) {
    throw new Error(getLivenessSessionResultResponse.body.error.message);
  }
  console.log("Get liveness detection results:");
  console.log(JSON.stringify(getLivenessSessionResultResponse.body, null, 2));

  // Delete session.
  const deleteLivenessSessionResponse = await client
    .path("/detectLiveness-sessions/{sessionId}", sessionId)
    .delete();
  if (isUnexpected(deleteLivenessSessionResponse)) {
    throw new Error(deleteLivenessSessionResponse.body.error.message);
  }
  console.log("Delete liveness session:");
  console.log(JSON.stringify(deleteLivenessSessionResponse.body, null, 2));
}

main().catch(console.error);
