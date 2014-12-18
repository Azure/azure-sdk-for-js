<html>
    <head>
        <title>Windows Azure DocumentDB SDK: nodejs promises.</title>
    </head>
    <body>
        <h2>Windows Azure DocumentDB nodejs promises SDK</h2>
        <p>
            DocumentDB is a purpose built NoSQL JSON document database designed for modern mobile and web applications. DocumentDB supports rich queries over JSON data as well as, <br>
            transactional execution of JavaScript based application logic. DocumentDB is built with a deep commitment to the JSON data model enabling it to offer differentiated query and data <br>
            processing capabilities that scale to meet the needs of the most demanding modern applications.
        </p>
	<p>
            The API uses q promises for all calls where all calls use Q promises for responses ( this one is built on top of the callback model ) and this is exposed in DocumentClientWrapper.
        </p>
        <h4>Installing the library using npm</h4>
        <p><pre>&gt; npm install documentdb-q-promises</pre></p>
<h4>Hello world example code using Q promises</h4>
<p><pre  style="background-color:#eee">
var DocumentClient = require('documentdb').DocumentClientWrapper;

var host = [hostendpoint];                    // Add your endpoint
var masterKey = [database account masterkey]; // Add the massterkey of the endpoint

var client = new DocumentClient(host, {masterKey: masterKey});
var databaseDefinition = { id: "sample database" }
var collectionDefinition = { id: "sample collection" };
var documentDefinition = { id: "hello world doc", content: "Hello World!" };

var database, collection, document;
client.createDatabaseAsync(databaseDefinition)
    .then(function(databaseResponse) {
        database = databaseResponse.resource;
        return client.createCollectionAsync(database._self, collectionDefinition);
    })
    .then(function(collectionResponse) {
        collection = collectionResponse.resource;
        
        return client.createDocumentAsync(collection._self, documentDefinition);
    })
	.then(function(documentResponse) {
		var document = documentResponse.resource;
		console.log('Created Document with content: ', document.content);
        cleanup(client, database);
	})
    .fail(function(error) {
        console.log("An error occured", error);
    });
 
function cleanup(client, database) {
    client.deleteDatabaseAsync(database._self)
        .then(function(response) {
            console.log('clean up completed');
        })
        .fail(function(error){
            console.log(error);
        });
}
        </pre></p>
        
<h4>Running the tests</h4>
<p><pre>  
First You need to install mocha and q
&gt; npm install mocha
&gt; npm install q

From the tests folder run 
&gt; mocha -t 0 -R spec
</p></pre>
    </body>
</html>
