// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventHub = require('../index.js');

function onReceiveMessage(eventData) {
	console.log('Message received: ');
	console.log(eventData.Bytes);
	console.log(eventData.SystemProperties)
	console.log('');
}

function onError(error) {
	console.log('Receive error:' + error);
}

var ehClient = new EventHub.Client("Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=yyy;SharedAccessKey=zzz;EntityPath=uuu");
var partitionIds = ehClient.GetPartitionIds().then(function(partitionIds) {
	console.log('PartCount=' + partitionIds.length);
	var receiver = ehClient.CreateReceiver("$Default", "0");
	
	/* start receiving */
	receiver.StartReceive(Date.Now).then(function() {
		receiver.on('error', function(error) {
			console.log('Receive error:' + error);
		});
		receiver.on('messageReceived', function(eventData) {
			console.log('Message received: ');
			console.log(eventData.Bytes);
			console.log(eventData.SystemProperties)
			console.log('');
		});
	});
});
