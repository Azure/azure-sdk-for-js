const { readFileSync } = require("fs");
const { DefaultAzureCredential } = require("@azure/identity");

const createFaceClient = require("@azure-rest/ai-vision-face").default;

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */
async function main() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const credential = new DefaultAzureCredential();
  const client = createFaceClient(endpoint, credential);

  const fileName = "samples-dev/data/detection1.jpg";
  const detectResponse = await client.path("/detect").post({
    contentType: "application/octet-stream",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: false,
    },
    body: readFileSync(fileName),
  });
  console.log(`Detect: ${fileName}`);
  console.log(JSON.stringify(detectResponse.body, null, 2));
}

main().catch(console.error);
