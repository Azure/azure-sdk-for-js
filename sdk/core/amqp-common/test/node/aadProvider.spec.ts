// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
  ApplicationTokenCredentials,
  MSIVmTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials
} from "@azure/ms-rest-nodeauth";
import { AadTokenProvider } from "../../src";
import * as chai from "chai";
chai.should();

describe("AadTokenProvider", function() {
  describe("compiles when given an AAD", function() {
    it("ApplicationTokenCredentials", function() {
      const credentials = new ApplicationTokenCredentials("id", "domain", "secret");
      const provider = new AadTokenProvider(credentials);
      provider.should.exist;
    });

    it("MSIVmTokenCredentials", function() {
      const credentials = new MSIVmTokenCredentials();
      const provider = new AadTokenProvider(credentials);
      provider.should.exist;
    });

    it("DeviceTokenCredentials", function() {
      const credentials = new DeviceTokenCredentials();
      const provider = new AadTokenProvider(credentials);
      provider.should.exist;
    });

    it("UserTokenCredentials", function() {
      const credentials = new UserTokenCredentials("id", "domain", "username", "password");
      const provider = new AadTokenProvider(credentials);
      provider.should.exist;
    });
  });
});
