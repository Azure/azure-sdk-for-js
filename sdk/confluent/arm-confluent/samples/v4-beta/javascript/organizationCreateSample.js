// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Organization resource
 *
 * @summary create Organization resource
 * x-ms-original-file: 2025-08-18-preview/Organization_Create_MaximumSet_Gen.json
 */
async function organizationCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.create("rgconfluent", "qcqrbyx", {
    body: {
      offerDetail: {
        publisherId: "jvmchwpbqvavlgmuwquhqrnacgpvlobkkavwppwvhjfqcy",
        id: "ufewkfngssvswmxfurnchnvgmnjuzzsoys",
        planId: "l",
        planName:
          "ycpeesrtyybhvmkdenugbkffjwistugfertrprgevcczlsnbcinotsdtsmealomyzsinypzimyyubepkuewirtcxhvxhsmwhwptvzuhirckvrgogahfwchvxnfkgfwqxqy",
        termUnit: "ipefrkgclpjaswyxpyjkppo",
        termId: "vujdve",
        privateOfferId:
          "goshpcnjukfzfhubmynjxiulurrwplzcjpjstebtsiigbkovchcrlfmgoymqfuayhihnxruthwjywtedlcsqqsgaelqthvfzvafyjhsfzfjwotsiajpcogwrwylgcphxfhvvwemynoyovnvqcetftiofkthgdzfvybvhpviqlwlslaupndcxlvjssdap",
        privateOfferIds: ["nrbzkbcpvsakewlgubfmej"],
        status: "Started",
      },
      userDetail: {
        firstName: "gqxqhtniapwvnsliaifhvmbtvvrciebktpeadanapfcqzflomz",
        lastName: "vhdbyshxnnxivxbgzxscscdsvlwbsukqmcw",
        emailAddress: "user@example.com",
        userPrincipalName: "g",
        aadEmail: "swugcwecfnkp",
      },
      linkOrganization: { token: "yvynviychdid" },
      tags: { key2047: "maumzdwvkwd" },
      location: "ogifpylahax",
    },
  });
  console.log(result);
}

async function main() {
  await organizationCreateMaximumSet();
}

main().catch(console.error);
