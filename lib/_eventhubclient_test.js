// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var assert = require('chai').assert;

var EventHubClient = require('./eventhubclient.js');

var goodConnString = "Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=yyy;SharedAccessKey=zzz;EntityPath=uuu";

describe('EventHubClient', function () {
    describe('#StartReceive', function () {
        it('starts receiving', function () {
            var eventhubclient = new EventHubClient(goodConnString);
            assert.isNotNull(eventhubclient);
        });
    });
});
