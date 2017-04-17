# Microsoft Azure DocumentDB Node.js SDK

![](https://img.shields.io/npm/v/documentdb.svg)
![](https://img.shields.io/npm/dm/documentdb.svg)
![](https://img.shields.io/github/issues/azure/azure-documentdb-node.svg)

This project provides a node module that makes it easy to interact with Azure DocumentDB. 

For documentation please see the Microsoft Azure [Node.js Developer Center](http://azure.microsoft.com/en-us/develop/nodejs/) and the [Microsoft Azure DocumentDB Node.js SDK Documentation](http://azure.github.io/azure-documentdb-node/).

## Installation
### Core Module

The core module uses the callbacks model for responses, exposed through the DocumentClient 

    npm install documentdb


## Usage

To use this SDK to call Azure DocumentDB, you need to first [create an account](http://azure.microsoft.com/en-us/documentation/articles/documentdb-create-account/).

You can follow this [tutorial](http://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/) to help you get started.

#### Note:
When connecting to the [emulator](https://docs.microsoft.com/en-us/azure/documentdb/documentdb-nosql-local-emulator) from the SDK, SSL verification is disabled. 

## Examples
### Hello World using Callbacks via the Core Module

```js
var DocumentClient = require('documentdb').DocumentClient;

var host = "[hostendpoint]";                     // Add your endpoint
var masterKey = "[database account masterkey]";  // Add the masterkey of the endpoint
var client = new DocumentClient(host, {masterKey: masterKey});

var databaseDefinition = { id: "sample database" };
var collectionDefinition = { id: "sample collection" };
var documentDefinition = { id: "hello world doc", content: "Hello World!" };

client.createDatabase(databaseDefinition, function(err, database) {
    if(err) return console.log(err);
    console.log('created db');

    client.createCollection(database._self, collectionDefinition, function(err, collection) {
        if(err) return console.log(err);
        console.log('created collection');

        client.createDocument(collection._self, documentDefinition, function(err, document) {
            if(err) return console.log(err);
            console.log('Created Document with content: ', document.content);

            cleanup(client, database);
        });
    });
});

function cleanup(client, database) {
    client.deleteDatabase(database._self, function(err) {
        if(err) console.log(err);
    })
}
```

### Youtube Videos

Getting started with Azure DocumentDB on Node.js:

[![Azure Demo: Getting started with Azure DocumentDB on Node.js](http://img.youtube.com/vi/UAE7h9PCZjA/0.jpg)](http://www.youtube.com/watch?v=UAE7h9PCZjA)

## Need Help?

Be sure to check out the Microsoft Azure [Developer Forums on MSDN](https://social.msdn.microsoft.com/forums/azure/en-US/home?forum=AzureDocumentDB) or the [Developer Forums on Stack Overflow](http://stackoverflow.com/questions/tagged/azure-documentdb) if you have trouble with the provided code.

## Contribute Code or Provide Feedback

If you would like to become an active contributor to this project please follow the instructions provided in [Azure Projects Contribution Guidelines](http://azure.github.io/guidelines.html).

If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/Azure/azure-documentdb-node/issues) section of the project.

## Learn More

* [Azure Developer Center](http://azure.microsoft.com/en-us/develop/nodejs)
* [Azure DocumentDB Node.js SDK Documentation](http://azure.github.io/azure-documentdb-node/)
* [Azure DocumentDB Service](http://azure.microsoft.com/en-us/documentation/services/documentdb/)
* [Azure DocumentDB Community Page](https://azure.microsoft.com/en-us/documentation/articles/documentdb-community/)
