azure-event-hubs
================

[![npm version](https://badge.fury.io/js/azure-event-hubs.svg)](http://badge.fury.io/js/azure-event-hubs)

## Usage ##

This library is primarily promise-based (for now, using [Bluebird](http://bluebirdjs.com/docs/getting-started.html)). See `tests/sender_test.js` or `tests/receiver_test.js` for some basic examples. 

The simplest usage is to instantiate the main `EventHubClient` class with a `ConnectionConfig`, or use the static factory method `EventHubClient.fromConnectionString(_connection-string_, _event-hub-path_)`. Once you have a client, you can use it to create senders and/or receivers using the `client.createSender` or `client.createReceiver` methods. Receivers emit `message` events when new messages come in, while senders have a simple `send` method that allows you to easily send messages (with an optional partition key). 
 
## Example 1 - Get the partition IDs. ##

```js
var EventHubClient = require('azure-event-hubs').Client;

var client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub')
client.getPartitionIds().then(function(ids) {
    ids.forEach(function(id) { console.log(id); });
});
```

## Example 2 - Create a receiver ##

Creates a receiver on partition ID 10, for messages that come in after "now".

```js
var EventHubClient = require('azure-event-hubs').Client;

var client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub')
client.createReceiver('$Default', '10', { startAfterTime: Date.now() })
    .then(function (rx) {
        rx.on('errorReceived', function (err) { console.log(err); }); 
        rx.on('message', function (message) {
            var body = message.body;
            // See https://github.com/Azure/amqpnetlite/wiki/Azure-Service-Bus-Event-Hubs for details on message annotation properties from EH.
            var enqueuedTime = Date.parse(message.systemProperties['x-opt-enqueued-time']);
        });
    });

```

## Example 3 - Create a sender v1 ##

Creates a sender, sends to a given partition "key" which is then hashed to a partition ID (so all messages with the same key will go to the same ID, but load is balanced between partitions). 

```js
var EventHubClient = require('azure-event-hubs').Client;

var client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub')
client.createSender()
    .then(function (tx) {
        tx.on('errorReceived', function (err) { console.log(err); });
        tx.send({ contents: 'Here is some text sent to partition key my-pk.' }, 'my-pk'); 
    });
```

## Example 4 - Create a sender v2 ##

Creates a sender against a given partition ID (10). You _should_ use send to a given partition _key_, but if you _need_ to send to a given partition ID we'll let you do it. 

```js
var EventHubClient = require('azure-event-hubs').Client;

var client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub')
client.createSender('10')
    .then(function (tx) {
        tx.on('errorReceived', function (err) { console.log(err); });
        tx.send({ contents: 'Here is some text sent to partition 10.' }); 
    });
```
