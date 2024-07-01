// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure-tools/test-utils";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { createMockServer } from "../public/utils/mockService";
import { ConnectionContext, createConnectionContext } from "../../src/connectionContext";
import { openCbsSession } from "../../src/withAuth";
import { CbsClient, StandardAbortMessage } from "@azure/core-amqp";
import { AbortController } from "@azure/abort-controller";

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }
  describe("openCbsSession", function () {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME],
    };
    before("validate environment", () => {
      assert.exists(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.",
      );
      assert.exists(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests.",
      );
    });
    let context: ConnectionContext;
    let cbsClient: CbsClient;
    beforeEach("create connection context", function () {
      context = createConnectionContext(service.connectionString, service.path);
      cbsClient = context.cbsSession;
    });

    afterEach("close connection context", function () {
      context.close();
    });

    it("opens the CBS session", async function () {
      assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
      await openCbsSession(cbsClient, 1000);
      assert.isTrue(cbsClient.isOpen(), "Expected the CBS session to be open");
    });

    it("can be aborted", async function () {
      assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open yet");
      const aborter = new AbortController();
      const sessionOpening = openCbsSession(cbsClient, 1000, { abortSignal: aborter.signal });
      aborter.abort();
      await assert.isRejected(sessionOpening, StandardAbortMessage);
      assert.isFalse(cbsClient.isOpen(), "Expected the CBS session to not be open");
    });
  });
});
