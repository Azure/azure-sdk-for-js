// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-gallery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a gallery inVMAccessControlProfile version.
 *
 * @summary create or update a gallery inVMAccessControlProfile version.
 * x-ms-original-file: 2024-03-03/galleryResourceProfileExamples/GalleryInVMAccessControlProfileVersion_Create.json
 */
async function createOrUpdateAGalleryInVMAccessControlProfileVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.galleryInVMAccessControlProfileVersions.createOrUpdate(
    "myResourceGroup",
    "myGalleryName",
    "myInVMAccessControlProfileName",
    "1.0.0",
    {
      location: "West US",
      properties: {
        mode: "Audit",
        defaultAccess: "Allow",
        rules: {
          privileges: [
            {
              name: "GoalState",
              path: "/machine",
              queryParameters: { comp: "goalstate" },
            },
          ],
          roles: [{ name: "Provisioning", privileges: ["GoalState"] }],
          identities: [
            {
              name: "WinPA",
              userName: "SYSTEM",
              groupName: "Administrators",
              exePath: "C:\\Windows\\System32\\cscript.exe",
              processName: "cscript",
            },
          ],
          roleAssignments: [{ role: "Provisioning", identities: ["WinPA"] }],
        },
        targetLocations: [{ name: "West US" }, { name: "South Central US" }],
        excludeFromLatest: false,
      },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateAGalleryInVMAccessControlProfileVersion();
}

main().catch(console.error);
