// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

var EventHubClient = require('../lib/client.js');

describe('EventHubClient', function () {
  describe('#getPartitionIds', function () {
    it('returns an array of partition IDs', function () {
      this.timeout(15000);
      var client = EventHubClient.fromConnectionString(process.env.EVENT_HUB_CONNECTION_STRING, process.env.EVENT_HUB_PATH);
      var partitionIds = client.getPartitionIds();
      return partitionIds.should.eventually.not.be.empty;
    });
  });
});