// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NameAvailabilityRequest } from "@azure/arm-mariadb";
import { MariaDBManagementClient } from "@azure/arm-mariadb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/mariadb/resource-manager/Microsoft.DBforMariaDB/stable/2018-06-01/examples/CheckNameAvailability.json
 */
async function nameAvailability(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const nameAvailabilityRequest: NameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DBforMariaDB",
  };
  const credential = new DefaultAzureCredential();
  const client = new MariaDBManagementClient(credential, subscriptionId);
  const result = await client.checkNameAvailability.execute(nameAvailabilityRequest);
  console.log(result);
}

nameAvailability().catch(console.error);
