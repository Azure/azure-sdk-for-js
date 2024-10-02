// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  GalleryApplicationVersionsListByGalleryApplicationParameters,
  paginate
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List gallery Application Versions in a gallery Application Definition.
 *
 * @summary List gallery Application Versions in a gallery Application Definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2022-01-03/examples/galleryExamples/GalleryApplicationVersion_ListByGalleryApplication.json
 */
async function listGalleryApplicationVersionsInAGalleryApplicationDefinition() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryApplicationName = "myGalleryApplicationName";
  const options: GalleryApplicationVersionsListByGalleryApplicationParameters = {
    queryParameters: { "api-version": "2022-01-03" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{galleryApplicationName}/versions",
      subscriptionId,
      resourceGroupName,
      galleryName,
      galleryApplicationName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listGalleryApplicationVersionsInAGalleryApplicationDefinition().catch(
  console.error
);
