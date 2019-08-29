import { ServiceBusAtomManagementClient } from "../src";
import { ServiceClientOptions } from "@azure/core-http";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { EnvVarKeys, getEnvVars } from "./utils/envVarUtils";
const env = getEnvVars();
const should = chai.should();

let entityType: any;

const clientOptions: ServiceClientOptions = {
  requestPolicyFactories: []
};

const serviceBusAtomManagementClient: ServiceBusAtomManagementClient = new ServiceBusAtomManagementClient(
  env[EnvVarKeys.SERVICEBUS_CONNECTION_STRING],
  clientOptions
);

const alwaysBeExistingQueue = "alwaysBeExistingQueue";
const alwaysBeDeletedQueue = "alwaysBeDeletedQueue";

function prettyPrint(result: any) {
  console.log(`\n\nOperation result -> ${JSON.stringify(result, undefined, 2)}\n\n`);
}

entityType = "Queue";
describe(`Atom management - Basic CRUD on ${entityType} entities #RunInBrowser`, function(): void {
  it(`Creates a non-existent ${entityType} entity successfully`, async () => {
    await serviceBusAtomManagementClient.deleteQueue(alwaysBeExistingQueue);

    const response = await serviceBusAtomManagementClient.createQueue(alwaysBeExistingQueue, {
      LockDuration: "PT1M",
      MaxSizeInMegabytes: "1024",
      RequiresDuplicateDetection: "false",
      RequiresSession: "false",
      DeadLetteringOnMessageExpiration: "false",
      MaxDeliveryCount: "10",
      EnableBatchedOperations: "true",
      EnablePartitioning: "false"
    });
    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(result.result, undefined, "Result must be undefined for create requests");
    prettyPrint(result);
  });

  it(`Creating an existent ${entityType} entity throws an error`, async () => {
    const response = await serviceBusAtomManagementClient.createQueue(alwaysBeExistingQueue, {
      LockDuration: "PT1M",
      MaxSizeInMegabytes: "1024",
      RequiresDuplicateDetection: "false",
      RequiresSession: "false",
      DeadLetteringOnMessageExpiration: "false",
      MaxDeliveryCount: "10",
      EnableBatchedOperations: "true",
      EnablePartitioning: "false"
    });
    const result = response.parsedBody;
    should.equal(result.error == undefined, false, "Error must not be undefined");
    prettyPrint(result);
  });

  it(`Lists available ${entityType} entities successfully`, async () => {
    const response = await serviceBusAtomManagementClient.listQueues({ top: 10 });

    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(Array.isArray(result.result), true, "Result must be any array for list requests");
    prettyPrint(result);
  });

  it(`Updates an existent ${entityType} entity successfully`, async () => {
    const response = await serviceBusAtomManagementClient.updateQueue(alwaysBeExistingQueue, {
      LockDuration: "PT1M",
      MaxSizeInMegabytes: "1024",
      RequiresDuplicateDetection: "false",
      RequiresSession: "false",
      DeadLetteringOnMessageExpiration: "false",
      MaxDeliveryCount: "10",
      EnableBatchedOperations: "true",
      EnablePartitioning: "false"
    });

    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(result.result, undefined, "Result must be undefined for update() requests");
    prettyPrint(result);
  });

  it(`Gets an existent ${entityType} entity successfully`, async () => {
    const response = await serviceBusAtomManagementClient.getQueue(alwaysBeExistingQueue);

    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(
      result.result == undefined,
      false,
      "Result must be NOT undefined for successful get request"
    );
    prettyPrint(result);
  });

  it(`Deletes a non-existent ${entityType} entity returns an error`, async () => {
    const response = await serviceBusAtomManagementClient.deleteQueue("notexisting");

    const result = response.parsedBody;
    should.equal(result.error == undefined, false, "Error must be NOT undefined");
    should.equal(result.result, undefined, "Result must be undefined for create() requests");
    prettyPrint(result);
  });

  it(`Deletes an existent ${entityType} entity successfully`, async () => {
    await serviceBusAtomManagementClient.createQueue(alwaysBeDeletedQueue, {
      LockDuration: "PT1M",
      MaxSizeInMegabytes: "1024",
      RequiresDuplicateDetection: "false",
      RequiresSession: "false",
      DeadLetteringOnMessageExpiration: "false",
      MaxDeliveryCount: "10",
      EnableBatchedOperations: "true",
      EnablePartitioning: "false"
    });
    const response = await serviceBusAtomManagementClient.deleteQueue(alwaysBeDeletedQueue);

    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(result.result, undefined, "Result must be undefined for delete() requests");
    prettyPrint(result);
  });

  it(`Get on non-existent ${entityType} entity returns empty response`, async () => {
    const response = await serviceBusAtomManagementClient.getQueue("notexisting");

    const result = response.parsedBody;
    should.equal(result.error, undefined, "Error must be undefined");
    should.equal(Array.isArray(result.result), true, "Result is array for empty get requests");
    should.equal(result.result.length, 0, "Array must be empty");
    prettyPrint(result);
  });
});
