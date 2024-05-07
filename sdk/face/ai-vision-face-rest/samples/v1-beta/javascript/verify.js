const { readFileSync } = require("fs");
const { AzureKeyCredential } = require("@azure/core-auth");

const createFaceClient = require("@azure-rest/ai-vision-face").default;

const detect = async (client, fileName) => {
  const response = await client.path("/detect").post({
    contentType: "application/octet-stream",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: true,
    },
    body: readFileSync(`samples-dev/data/${fileName}`),
  });
  console.log(`Detect: ${fileName}`);
  console.log(JSON.stringify(response.body, null, 2));
  return response.body.map((face) => face.faceId);
};

const verify = async (client, faceId1, faceId2) => {
  const response = await client.path("/verify").post({
    body: { faceId1, faceId2 },
  });
  console.log("Verify:");
  console.log(JSON.stringify(response.body, null, 2));
};

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */

const main = async () => {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const [id_dad1] = await detect(client, "Family1-Dad1.jpg");
  const [id_dad2] = await detect(client, "Family1-Dad2.jpg");
  await verify(client, id_dad1, id_dad2);

  const [id_man] = await detect(client, "Family3-Man1.jpg");
  await verify(client, id_dad1, id_man);
};

main().catch(console.error);
