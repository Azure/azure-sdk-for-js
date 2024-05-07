const { readFileSync } = require("fs");
const { AzureKeyCredential } = require("@azure/core-auth");

const createFaceClient = require("@azure-rest/ai-vision-face").default,
  { getLongRunningPoller } = require("@azure-rest/ai-vision-face");

/**
 * This sample demonstrates how to create a liveness detection session.
 *
 * @summary creates a liveness detection session
 */

async function findSimilarsFromFaceIds() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const detect = async (fileName) => {
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

  // Detect faces.
  const id_findsimilars = await detect("findsimilar-sample.jpg");
  const faceIds = await detect("nine-faces.png");

  // Find similars from face IDs.
  for (const faceId of id_findsimilars) {
    const findSimilarsResponse = await client.path("/findsimilars").post({
      body: { faceId, faceIds, mode: "matchPerson" },
    });
    console.log("Find Similars:");
    console.log(JSON.stringify(findSimilarsResponse.body, null, 2));
  }
}

async function findSimilarsFromLargeFaceList() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const addFace = async (largeFaceListId, fileName, userData) => {
    const response = await client
      .path("/largefacelists/{largeFaceListId}/persistedfaces", largeFaceListId)
      .post({
        queryParameters: {
          userData,
          detectionModel: "detection_02",
        },
        contentType: "application/octet-stream",
        body: readFileSync(`samples-dev/data/${fileName}`),
      });
    console.log(`Add Face: ${fileName}`);
    console.log(JSON.stringify(response.body, null, 2));
  };

  // Create large face list and add faces.
  const largeFaceListId = "lfl01";
  const createLargeFaceListResponse = await client
    .path("/largefacelists/{largeFaceListId}", largeFaceListId)
    .put({
      body: {
        name: "List of Faces",
        userData: "Large Face List for Test",
        recognitionModel: "recognition_04",
      },
    });
  console.log("Create Face List:");
  console.log(JSON.stringify(createLargeFaceListResponse.body, null, 2));
  await addFace(largeFaceListId, "Family1-Mom1.jpg", "Lady1-1");
  await addFace(largeFaceListId, "Family1-Mom2.jpg", "Lady1-2");
  await addFace(largeFaceListId, "Family2-Lady1.jpg", "Lady2-1");
  await addFace(largeFaceListId, "Family2-Lady2.jpg", "Lady2-2");
  await addFace(largeFaceListId, "Family3-Lady1.jpg", "Lady3-1");

  // Train large face list.
  const trainLargeFaceListResponse = await client
    .path("/largefacelists/{largeFaceListId}/train", largeFaceListId)
    .post();
  console.log("Train Face List:");
  console.log(JSON.stringify(trainLargeFaceListResponse.body, null, 2));
  const trainLargeFaceListPoller = await getLongRunningPoller(client, trainLargeFaceListResponse);
  await trainLargeFaceListPoller.pollUntilDone();
  console.log(`Long running operation: ${trainLargeFaceListPoller.getOperationState().status}`);

  // Detect faces from image.
  const detectResponse = await client.path("/detect").post({
    contentType: "application/octet-stream",
    queryParameters: {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceId: true,
    },
    body: readFileSync("samples-dev/data/nine-faces.png"),
  });
  console.log("Detect: nine-faces.png");
  console.log(JSON.stringify(detectResponse.body, null, 2));

  // Find similars from large face list.
  for (const faceId of detectResponse.body.map((face) => face.faceId)) {
    const findSimilarsResponse = await client.path("/findsimilars").post({
      body: {
        faceId,
        largeFaceListId,
        mode: "matchFace",
      },
    });
    console.log("Find Similars:");
    console.log(JSON.stringify(findSimilarsResponse.body, null, 2));
  }

  // Delete large face list.
  const deleteFaceListResponse = await client
    .path("/largefacelists/{largeFaceListId}", largeFaceListId)
    .delete();
  console.log("Delete Face List:");
  console.log(JSON.stringify(deleteFaceListResponse.body, null, 2));
}

async function main() {
  await findSimilarsFromFaceIds();
  await findSimilarsFromLargeFaceList();
}

main().catch(console.error);
