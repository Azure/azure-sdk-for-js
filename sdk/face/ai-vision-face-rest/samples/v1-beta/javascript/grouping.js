const { readFileSync } = require("fs");
const { AzureKeyCredential } = require("@azure/core-auth");

const createFaceClient = require("@azure-rest/ai-vision-face").default;

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */
async function main() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  // Detect faces from image.
  const fileName = "samples-dev/data/nine-faces.png";
  const detectResponse = await client.path("/detect").post({
    contentType: "application/octet-stream",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: true,
    },
    body: readFileSync(fileName),
  });
  console.log(`Detect: ${fileName}`);
  console.log(JSON.stringify(detectResponse.body, null, 2));

  // Group the faces.
  const groupResponse = await client.path("/group").post({
    body: {
      faceIds: detectResponse.body.map((face) => face.faceId),
    },
  });
  console.log("Group:");
  console.log(JSON.stringify(groupResponse.body, null, 2));
}

main().catch(console.error);
