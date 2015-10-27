// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventHub = require('../index.js');

var ehClient = new EventHub.Client("Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=yyy;SharedAccessKey=zzz;EntityPath=uuu");
var eventData = new EventHub.EventData(new Buffer("test"));
ehClient.Send(eventData).then(function() {
});
