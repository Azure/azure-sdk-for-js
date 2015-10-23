// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventHub = require('../index.js');

function onReceiveMessage(message) {
	console.log('Message received: ');
	console.log(message.body);
	if (message.annotations) {
		console.log('Annotations:');
		console.log(message.annotations);
	}
	console.log('');
}

function onError(error) {
	console.log('Receive error:' + error);
}

var ehClient = new EventHub.Client("Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=yyy;SharedAccessKey=zzz;EntityPath=uuu");
var eventData = new EventHub.EventData(new Buffer("test"));
ehClient.Send(eventData).then(function() {
});
