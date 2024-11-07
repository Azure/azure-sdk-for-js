// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to upload, get, list and download files to a dynamic session.
 *
 *
 * @summary session file upload and download.
 */

const createClient = require("@azure-rest/microsoft-app-dynamicsessions-rest").default,
  { isUnexpected } = require("@azure-rest/microsoft-app-dynamicsessions-rest");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const poolManagementEndpoint = "https://<your-pool-management-endpoint>";
  const client = createClient(poolManagementEndpoint, new DefaultAzureCredential());

  const sessionIdentifier = "testSessionIdentifier";

  // 1) Upload a file
  const uploadOptions = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
    contentType: "multipart/form-data", // Add this line
    body: [
      {
        name: "file",
        body: "01010101",
        filename: "file.yaml",
        contentType: "application/octet-stream",
      },
    ],
  };

  const uploadResponse = await client.path("/files").post(uploadOptions);

  if (!isUnexpected(uploadResponse)) {
    const uploadedFile = uploadResponse.body;
    console.log("File uploaded successfully:", uploadedFile.name);
  } else {
    console.error("Failed to upload file:", uploadResponse);
    throw uploadResponse.body.error;
  }

  // 2) List files
  const listOptions = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
  };

  const listResponse = await client.path("/files").get(listOptions);

  if (!isUnexpected(listResponse)) {
    const pagedSessionResourceFileOutput = listResponse.body;
    const filesList = pagedSessionResourceFileOutput.value;
    console.log("Files in the session:");
    filesList.forEach((file) => {
      console.log(`- ${file.name}`);
    });
  } else {
    console.error("Failed to list files:", listResponse);
    throw listResponse.body.error;
  }

  // 3) Get content of the uploaded file
  const fileName = "testfile.yaml";
  const getContentOptions = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
  };

  const getContentResponse = await client
    .path("/files/{name}/content", fileName)
    .get(getContentOptions);

  if (!isUnexpected(getContentResponse)) {
    const fileContent = getContentResponse.body;
    console.log("File content:", fileContent);
  } else {
    console.error("Failed to get file content:", getContentResponse);
    throw getContentResponse.body.error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
