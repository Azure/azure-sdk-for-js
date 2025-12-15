// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a DbSystem
 *
 * @summary create a DbSystem
 * x-ms-original-file: 2025-09-01/DbSystems_CreateOrUpdate_MaximumSet_Gen.json
 */
async function dbSystemsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbSystems.createOrUpdate("rgopenapi", "dbsystem1", {
    properties: {
      databaseEdition: "StandardEdition",
      adminPassword: "********",
      dbVersion: "nuzcyzulicdscaxxleansibdtqxhf",
      source: "None",
      resourceAnchorId:
        "/subscriptions/00000000-0000-4025-0000-000000000000/resourceGroups/rg001/providers/Oracle.Database/resourceAnchors/resourceanchor1",
      networkAnchorId:
        "/subscriptions/00000000-0000-4025-0000-000000000000/resourceGroups/rg001/providers/Oracle.Database/networkAnchors/networkanchor1",
      clusterName: "icshqxm",
      displayName:
        "cpvibowyttzngughrisxfglqnffhtbjacuskwmixpczatxyrmrrgjsokonbolesdufrvuganmokwjkziisezqbvhmxtftldjulyixvmrcpmtlhynhbdlufcjdmmlbvcjdwbumjzdgwrxthntbbzscyrgmcfmkkowpujydlofklcrhdhoefeyl",
      initialDataStorageSizeInGb: 19,
      dbSystemOptions: { storageManagement: "LVM" },
      diskRedundancy: "High",
      gridImageOcid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      hostname: "krixp",
      ocid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
      lifecycleState: "Provisioning",
      nodeCount: 24,
      shape:
        "kcknzpixkpolhxpcvpzwhjjvyafciktxguoljnixmztvkfryxaqogtrefbjbibzlbojjnuhrrxninevocnigpzenshgqozclxyhzwkavncfvekfpmbxhinwqvupoacgascnmqvplqckjrqbxsejzprsvgvmvkbuvncffjv",
      sshPublicKeys: ["qtozhgwrjzkmwvdsggbivnbcwgykjnuvugqwmzompvbyfi"],
      storageVolumePerformanceMode: "Balanced",
      timeZone: "gyrlmvdtseawpykcpwlgexrcffciyavsshsekacwcfkubcqdbrliy",
      computeModel: "ECPU",
      computeCount: 28,
    },
    zones: ["pstozrrpkhlaffxt"],
    tags: { key2549: "orxnddawgxmye" },
    location: "uuh",
  });
  console.log(result);
}

async function main() {
  await dbSystemsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
