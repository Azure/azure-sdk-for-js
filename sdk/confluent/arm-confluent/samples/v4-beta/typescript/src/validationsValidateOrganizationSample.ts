// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization Validate proxy resource
 *
 * @summary organization Validate proxy resource
 * x-ms-original-file: 2025-08-18-preview/Validations_ValidateOrganization_MaximumSet_Gen.json
 */
async function organizationValidateProxyResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.validations.validateOrganization("rgconfluent", "bqmqthdyixbkhlgw", {
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
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationValidateProxyResource();
}

main().catch(console.error);
