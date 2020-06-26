// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import * as dotenv from "dotenv";
import { ServiceBusManagementClient } from "../src/serviceBusAtomManagementClient";
import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
import { AbortController } from "@azure/abort-controller";

chai.use(chaiAsPromised);
chai.use(chaiExclude);
const assert = chai.assert;

dotenv.config();

const env = getEnvVars();

const serviceBusAtomManagementClient: ServiceBusManagementClient = new ServiceBusManagementClient(
  env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]
);

describe.only("Operation Options", () => {
  describe("Abort Signal", () => {
    const queueName = "random-name";
    it("abortSignal should work", async () => {
      try {
        await serviceBusAtomManagementClient.createQueue(queueName, {
          abortSignal: AbortController.timeout(1)
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
      }
    });
  });

  describe("RequestOptions timeout", () => {
    const queueName = "random-name";
    it("requestOptions.timeout should work", async () => {
      try {
        await serviceBusAtomManagementClient.createQueue(queueName, {
          requestOptions: { timeout: 1 }
        });
        assert.fail();
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
      }
    });
  });

  describe("RequestOptions custom headers", () => {
    const queueName = "random-name";
    it("requestOptions.customHeaders should work", async () => {
      console.log(
        (
          await serviceBusAtomManagementClient.createQueue(queueName, {
            requestOptions: { customHeaders: { hello: "world" } }
          })
        )._response.headers
      );
      await serviceBusAtomManagementClient.deleteQueue(queueName);
    });
  });
});
