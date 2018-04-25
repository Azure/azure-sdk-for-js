// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import * as debugModule from "debug";
const debug = debugModule("azure:event-hubs:client-spec");
import { EventProcessorHost } from "../lib/eph"
import * as dotenv from "dotenv";
dotenv.config();

describe("EPH", function () {
  before("validate environment", function () {
    should.exist(process.env.STORAGE_CONNECTION_STRING,
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_CONNECTION_STRING,
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests.");
    should.exist(process.env.EVENTHUB_NAME,
      "define EVENTHUB_NAME in your environment before running integration tests.");
  });
  const ehConnString = process.env.EVENTHUB_CONNECTION_STRING;
  const storageConnString = process.env.STORAGE_CONNECTION_STRING;
  const hubName = process.env.EVENTHUB_NAME;
  let host: EventProcessorHost;
  beforeEach('create the event processor host', function () {
    host = EventProcessorHost.createFromConnectionString(
      EventProcessorHost.createHostName(),
      storageConnString as string,
      ehConnString as string,
      {
        eventHubPath: hubName as string
      }
    );
  });

  afterEach('stop the event processor host', async function () {
    await host.stop();
  });
  describe('#start', function () {
    it('starts an Event Processor Host', function () {
      debug("");
      return host.start().should.be.fulfilled;
    });
  });
});