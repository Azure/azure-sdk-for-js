const { readFileSync } = require("fs");
const { AzureKeyCredential } = require("@azure/core-auth");

const createFaceClient = require("@azure-rest/ai-vision-face").default,
  { getLongRunningPoller } = require("@azure-rest/ai-vision-face");

const poll = async (client, initialResponse) => {
  const poller = await getLongRunningPoller(client, initialResponse);
  await poller.pollUntilDone();
  console.log(`Long running operation: ${poller.getOperationState().status}`);
};

const createPersonWithFaces = async (client, personData, faceData) => {
  const createPerson = async (data) => {
    const { name, userData } = data;
    const response = await client.path("/persons").post({
      body: { name, userData },
    });
    console.log("Create person:");
    console.log(JSON.stringify(response.body, null, 2));
    return response;
  };

  const addPersonFace = async (personId, data) => {
    const { fileName, userData } = data;
    const response = await client
      .path(
        "/persons/{personId}/recognitionModels/{recognitionModel}/persistedfaces",
        personId,
        "recognition_04",
      )
      .post({
        contentType: "application/octet-stream",
        queryParameters: { userData },
        body: readFileSync(`samples-dev/data/${fileName}`),
      });
    console.log(`Add person face: ${fileName}`);
    console.log(JSON.stringify(response.body, null, 2));
    return response;
  };

  const person = {};
  person.person = await createPerson(personData);
  // You can directly add faces to the person before the Person async operation is completed.
  person.faces = await Promise.all(
    faceData.map((data) => addPersonFace(person.person.body.personId, data)),
  );
  return person;
};

const deletePerson = async (client, personId) => {
  const response = await client.path("/persons/{personId}", personId).delete();
  console.log("Delete person:");
  console.log(JSON.stringify(response.body, null, 2));
  await poll(client, response);
};

const createDynamicPersonGroup = async (client, dynamicPersonGroupId, userData, addPersonIds) => {
  const response = await client
    .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
    .put({
      body: { name: dynamicPersonGroupId, userData, addPersonIds },
    });
  console.log("Create dynamic person group:");
  console.log(JSON.stringify(response.body, null, 2));
  return response;
};

const deleteDynamicPersonGroup = async (client, dynamicPersonGroupId) => {
  const response = await client
    .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
    .delete();
  console.log("Delete dynamic person group:");
  console.log(JSON.stringify(response.body, null, 2));
  await poll(client, response);
};

const updateDynamicPersonGroup = async (client, dynamicPersonGroupId, params) => {
  const response = await client
    .path("/dynamicpersongroups/{dynamicPersonGroupId}", dynamicPersonGroupId)
    .patch(params);
  console.log("Update dynamic person group:");
  console.log(JSON.stringify(response.body, null, 2));
  return response;
};

const getDynamicPersonGroupReferences = async (client, personId) => {
  const response = await client
    .path("/persons/{personId}/dynamicPersonGroupReferences", personId)
    .get();
  console.log("Get dynamic person group references:");
  console.log(JSON.stringify(response.body, null, 2));
};

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

const identify = async (client, faceIds, body) => {
  const response = await client.path("/identify").post({
    body: { faceIds, ...body },
  });
  console.log("Identify:");
  console.log(JSON.stringify(response.body, null, 2));
};

async function verify() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  const verify = async (faceId, personId) => {
    const response = await client.path("/verify").post({
      body: { faceId, personId },
    });
    console.log("Verify:");
    console.log(JSON.stringify(response.body, null, 2));
  };

  // Detect an image to get a faceId.
  const [id_dad] = await detect(client, "Family1-Dad3.jpg");

  // Create persons with faces.
  const bill = await createPersonWithFaces(client, { name: "Bill", userData: "Family1,singing" }, [
    { fileName: "Family1-Dad1.jpg", userData: "0001" },
    { fileName: "Family1-Dad2.jpg", userData: "0002" },
  ]);
  const ron = await createPersonWithFaces(client, { name: "Ron", userData: "Family1" }, [
    { fileName: "Family1-Son1.jpg", userData: "0001" },
    { fileName: "Family1-Son2.jpg", userData: "0002" },
  ]);

  // Verify.
  // Verify calls will work immediately after faces are successfully added to the Person.
  await verify(id_dad, bill.person.body.personId);
  await verify(id_dad, ron.person.body.personId);

  // Clean up.
  await Promise.all([
    deletePerson(client, bill.person.body.personId),
    deletePerson(client, ron.person.body.personId),
  ]);
}

async function identifyPersons() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  // Detect an image to get a faceId.
  const id_gill = await detect(client, "Family1-Daughter3.jpg");

  // Create persons with faces.
  const ron = await createPersonWithFaces(client, { name: "Ron", userData: "Family1" }, [
    { fileName: "Family1-Son1.jpg", userData: "0001" },
    { fileName: "Family1-Son2.jpg", userData: "0002" },
  ]);
  const gill = await createPersonWithFaces(client, { name: "Gill", userData: "Family1" }, [
    { fileName: "Family1-Daughter1.jpg", userData: "0001" },
    { fileName: "Family1-Daughter2.jpg", userData: "0002" },
  ]);
  const anna = await createPersonWithFaces(client, { name: "Anna", userData: "Family3,singing" }, [
    { fileName: "Family2-Lady1.jpg", userData: "0001" },
    { fileName: "Family2-Lady2.jpg", userData: "0002" },
  ]);

  // We have to wait for the face operations to be finished before calling Identify.
  // An optimization is to wait till the last added face is finished processing in a series as all faces for person are processed in series.
  await Promise.all(
    [ron, gill, anna]
      .map((person) => [person.person, person.faces[person.faces.length - 1]]) // get person operation and the last face operation
      .flat()
      .map((response) => poll(client, response)),
  );

  // Identify.
  await identify(client, id_gill, {
    personIds: [ron, gill, anna].map((person) => person.person.body.personId),
  });
  //await identify(client, id_gill, { personIds: ['*'] }); // the entire person directory

  // Clean up.
  await Promise.all([
    deletePerson(client, ron.person.body.personId),
    deletePerson(client, gill.person.body.personId),
    deletePerson(client, anna.person.body.personId),
  ]);
}

async function identifyDynamicPersonGroup() {
  const endpoint = process.env["FACE_ENDPOINT"] ?? "<endpoint>";
  const apikey = process.env["FACE_APIKEY"] ?? "<apikey>";
  const credential = new AzureKeyCredential(apikey);
  const client = createFaceClient(endpoint, credential);

  // Detect an image to get faceIds.
  const id_families = await detect(client, "identification1.jpg");

  // Create persons with faces.
  const bill = await createPersonWithFaces(client, { name: "Bill", userData: "Family1,singing" }, [
    { fileName: "Family1-Dad1.jpg", userData: "0001" },
    { fileName: "Family1-Dad2.jpg", userData: "0002" },
  ]);
  const clare = await createPersonWithFaces(
    client,
    { name: "Clare", userData: "Family1.singing" },
    [
      { fileName: "Family1-Mom1.jpg", userData: "0001" },
      { fileName: "Family1-Mom2.jpg", userData: "0002" },
    ],
  );
  const ron = await createPersonWithFaces(client, { name: "Ron", userData: "Family1" }, [
    { fileName: "Family1-Son1.jpg", userData: "0001" },
    { fileName: "Family1-Son2.jpg", userData: "0002" },
  ]);
  const anna = await createPersonWithFaces(client, { name: "Anna", userData: "Family3,singing" }, [
    { fileName: "Family2-Lady1.jpg", userData: "0001" },
    { fileName: "Family2-Lady2.jpg", userData: "0002" },
  ]);

  // Create two Dynamic Person Group with Persons.

  // Wait for only Person operation completed before calling Create/Update Dynamic Person Group with these personIds.
  await Promise.all([bill, clare, ron].map((person) => poll(client, person.person)));
  const dpgOperation1 = await createDynamicPersonGroup(
    client,
    "pd_family1",
    "Dynamic Person Group for Family 1",
    [bill, clare, ron].map((person) => person.person.body.personId),
  );

  // Wait for only Person operation completed before calling Create/Update Dynamic Person Group with these personIds.
  // We only need to check the status of Anna as we already checked Clare before.
  await poll(client, anna.person);
  await createDynamicPersonGroup(
    client,
    "pd_hiking_club",
    "Dynamic Person Group for hiking club",
    [clare, anna].map((person) => person.person.body.personId),
  );

  // Identify.
  // Identify calls will work immediately after dpg is successfully created or updated.
  await identify(client, id_families, { dynamicPersonGroupId: "pd_family1" });
  await identify(client, id_families, { dynamicPersonGroupId: "pd_hiking_club" });

  // Update Dynamic Person Group.
  const gill = await createPersonWithFaces(client, { name: "Gill", userData: "Family1" }, [
    { fileName: "Family1-Daughter1.jpg", userData: "0001" },
    { fileName: "Family1-Daughter2.jpg", userData: "0002" },
  ]);
  // Wait for only Person operation completed before calling Create/Update Dynamic Person Group with these personIds.
  await poll(client, gill.person);
  // You don't need to wait for the completion of the Create/Update operation before making further Update calls to the group
  const dpgOperation2 = await updateDynamicPersonGroup(client, "pd_family1", {
    body: {
      addPersonIds: [gill.person.body.personId],
      removePersonIds: [bill.person.body.personId],
    },
  });
  const dpgOperation3 = await updateDynamicPersonGroup(client, "pd_family1", {
    body: {
      addPersonIds: [bill.person.body.personId],
    },
  });

  // Identify.
  // Identify calls will work immediately after dpg is successfully created or updated.
  await identify(client, id_families, { dynamicPersonGroupId: "pd_family1" });

  // Check person relationship.
  // The LRO of dynamicPersonGroup Create/Update is only used for creating DynamicPersonGroupReferences. This is useful if you want to determine which groups a person is referenced in.
  // An optimization is to wait till the last update operation is finished processing in a series as all DPG changes are processed in series.
  await poll(client, dpgOperation3);
  await getDynamicPersonGroupReferences(client, bill.person.body.personId);
  await getDynamicPersonGroupReferences(client, clare.person.body.personId);

  // Clean up.
  await Promise.all([
    deletePerson(client, bill.person.body.personId),
    deletePerson(client, clare.person.body.personId),
    deletePerson(client, ron.person.body.personId),
    deletePerson(client, gill.person.body.personId),
    deletePerson(client, anna.person.body.personId),
  ]);
  await Promise.all([
    deleteDynamicPersonGroup(client, "pd_family1"),
    deleteDynamicPersonGroup(client, "pd_hiking_club"),
  ]);
}

async function main() {
  await verify();
  await identifyPersons();
  await identifyDynamicPersonGroup();
}

main().catch(console.error);
