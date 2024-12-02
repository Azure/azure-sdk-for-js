const { readFileSync } = require("fs");
const { DefaultAzureCredential } = require("@azure/identity");

const createFaceClient = require("@azure-rest/ai-vision-face").default,
  { isUnexpected } = require("@azure-rest/ai-vision-face");

/**
 * This sample demonstrates how to authenticate FaceClient using Microsoft Entra ID.
 *
 * @summary Microsoft Entra ID authentication.
 */

const main = async () => {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const credential = new DefaultAzureCredential();
  const client = createFaceClient(endpoint, credential);

  const fileName = "data/detection1.jpg";
  const detectResponse = await client.path("/detect").post({
    contentType: "application/octet-stream",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: false,
    },
    body: readFileSync(fileName),
  });
  if (isUnexpected(detectResponse)) {
    throw new Error(detectResponse.body.error.message);
  }
  console.log(`Detect: ${fileName}`);
  console.log(JSON.stringify(detectResponse.body, null, 2));
};

main().catch(console.error);
