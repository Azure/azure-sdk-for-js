// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var EventHub = require('../index.js');

var ehClient = new EventHub.Client("Endpoint=sb://xxx.servicebus.windows.net/;SharedAccessKeyName=yyy;SharedAccessKey=zzz;EntityPath=uuu");
	ehClient.GetPartitionIds().then(function(partitionIds) {
	console.log('PartCount=' + partitionIds.length);
	var receiver = ehClient.CreateReceiver("$Default", "0");
	
	/* start receiving */
	receiver.StartReceive(Date.Now).then(function() {
		receiver.on('error', function(error) {
			console.log('Receive error:' + error);
		});
		receiver.on('eventReceived', function(eventData) {
			console.log('Event received: ');
			console.log(eventData.Bytes);
			console.log(eventData.SystemProperties);
			console.log('');
		});
	});
});
