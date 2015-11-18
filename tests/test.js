// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var chai = require('chai');
// var Promise = require('bluebird');
var chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

function EventHubClient() {}
EventHubClient.fromConnectionString = function () {
	return new EventHubClient();
};

describe('EventHubClient', function () {
  describe('#fromConnectionString', function () {
	it('creates an EventHubClient', function () {
		var client = EventHubClient.fromConnectionString();
		client.should.be.an.instanceof(EventHubClient);
	});
  });
});