// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to upload a file to a session, get file and get content of a file.
 *
 *
 * @summary session file upload and download.
 * @azsdk-weight 100
 */

import createClient, {
  SessionResourceFilesUploadParameters,
  SessionResourceFilesListParameters,
  SessionResourceFilesGetContentParameters,
  SessionResourceFileOutput,
} from "@azure-rest/microsoft-app-dynamicsessions-rest";
import { DefaultAzureCredential } from "@azure/identity";
import { readFileSync } from "fs";

async function main() {
  const endpoint = "https://<REGION>.dynamicsessions.io/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/sessionPools/<SESSION_POOL_NAME>";
  const client = createClient(endpoint, new DefaultAzureCredential());

  const sessionIdentifier = "testSessionIdentifier";

  // 1) Upload a file
  const uploadOptions: SessionResourceFilesUploadParameters = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
    contentType: "multipart/form-data", // Add this line
    body: [
      {
        name: "file",
        body: createReadStream("path/to/your/file.yaml"),
        filename: "file.yaml",
        contentType: "application/octet-stream",
      },
    ],
  };

  const uploadResponse = await client.path("/files").post(uploadOptions);

  if (uploadResponse.status === "200") {
    const uploadedFile = uploadResponse.body as SessionResourceFileOutput;
    console.log("File uploaded successfully:", uploadedFile.name);
  } else {
    console.error("Failed to upload file:", uploadResponse);
  }

  // 2) List files
  const listOptions: SessionResourceFilesListParameters = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
  };

  const listResponse = await client.path("/files").get(listOptions);

  if (listResponse.status === "200") {
    const filesList = listResponse.body.value as SessionResourceFileOutput[];
    console.log("Files in the session:");
    filesList.forEach((file) => {
      console.log(`- ${file.name}`);
    });
  } else {
    console.error("Failed to list files:", listResponse);
  }

  // 3) Get content of the uploaded file
  const fileName = "testfile.yaml";
  const getContentOptions: SessionResourceFilesGetContentParameters = {
    queryParameters: {
      identifier: sessionIdentifier,
      path: "/",
    },
  };

  const getContentResponse = await client.path("/files/{name}/content", fileName).get(getContentOptions);

  if (getContentResponse.status === "200") {
    const fileContent = getContentResponse.body as string;
    console.log("File content:", fileContent);
  } else {
    console.error("Failed to get file content:", getContentResponse);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
