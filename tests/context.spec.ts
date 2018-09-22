// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import {
  ConnectionConfig, ConnectionContextBase, SasTokenProvider, DefaultDataTransformer, CbsClient
} from "../lib";
import { Connection } from "rhea-promise";


describe("ConnectionContextBase", function () {
  it("should be created with required parameters", function (done) {
    const connectionString = "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0"
      }
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    should.exist(context.tokenProvider);
    should.exist(context.dataTransformer);
    context.wasConnectionCloseCalled.should.equal(false);
    context.tokenProvider.should.instanceOf(SasTokenProvider);
    context.connection.should.instanceOf(Connection);
    context.cbsSession.should.instanceOf(CbsClient);
    context.dataTransformer.should.instanceOf(DefaultDataTransformer);
    done();
  });
});
