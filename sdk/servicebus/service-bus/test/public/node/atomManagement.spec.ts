// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { ServiceBusAdministrationClient } from "../../../src/index.js";
import { EntityNames } from "../utils/testUtils.js";
import { describe, it } from "vitest";
import { should } from "../utils/chai.js";
import { getFullyQualifiedNamespace } from "../../utils/injectables.js";

const managementQueue1 = EntityNames.MANAGEMENT_QUEUE_1;

const managementQueue2 = EntityNames.MANAGEMENT_QUEUE_2;

describe(`ATOM APIs`, () => {
  describe("Atom management - Authentication", function (): void {
    it("Token credential - DefaultAzureCredential from `@azure/identity`", async () => {
      const host = getFullyQualifiedNamespace();
      const endpoint = `sb://${host}/`;
      const serviceBusAdministrationClient = new ServiceBusAdministrationClient(
        host,
        new DefaultAzureCredential({
          // Work around Msi credential issue in live test pipeline by failing
          // its token retrieval
          managedIdentityClientId: "fakeMsiClientId",
        }),
      );

      should.equal(
        (await serviceBusAdministrationClient.createQueue(managementQueue1)).name,
        managementQueue1,
        "Unexpected queue name in the createQueue response",
      );
      const createQueue2Response = await serviceBusAdministrationClient.createQueue(
        managementQueue2,
        {
          forwardTo: managementQueue1,
        },
      );
      should.equal(
        createQueue2Response.name,
        managementQueue2,
        "Unexpected queue name in the createQueue response",
      );
      should.equal(
        createQueue2Response.forwardTo,
        endpoint + managementQueue1,
        "Unexpected name in the `forwardTo` field of createQueue response",
      );
      const getQueueResponse = await serviceBusAdministrationClient.getQueue(managementQueue1);
      should.equal(
        getQueueResponse.name,
        managementQueue1,
        "Unexpected queue name in the getQueue response",
      );
      should.equal(
        (await serviceBusAdministrationClient.updateQueue(getQueueResponse)).name,
        managementQueue1,
        "Unexpected queue name in the updateQueue response",
      );
      should.equal(
        (await serviceBusAdministrationClient.getQueueRuntimeProperties(managementQueue1)).name,
        managementQueue1,
        "Unexpected queue name in the getQueueRuntimeProperties response",
      );
      should.equal(
        (await serviceBusAdministrationClient.getNamespaceProperties()).name,
        (host.match("(.*).servicebus.(windows.net|usgovcloudapi.net|chinacloudapi.cn)") || [])[1],
        "Unexpected namespace name in the getNamespaceProperties response",
      );
      await serviceBusAdministrationClient.deleteQueue(managementQueue1);
      await serviceBusAdministrationClient.deleteQueue(managementQueue2);
    });
  });
});
