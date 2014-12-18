<html>
    <head>
        <title>Windows Azure DocumentDB SDK: node.js</title>
    </head>
    <body>
        <h2>Windows Azure DocumentDB nodejs SDK</h2>
        <p>
            DocumentDB is a purpose built NoSQL JSON document database designed for modern mobile and web applications. DocumentDB supports rich queries over JSON data as well as, <br>
            transactional execution of JavaScript based application logic. DocumentDB is built with a deep commitment to the JSON data model enabling it to offer differentiated query and data <br>
            processing capabilities that scale to meet the needs of the most demanding modern applications.
        </p>
	<p>
            The Nodejs sdk uses callbacks model for responses and this is exposed in DocumentClient <br>
        </p>
        <h4>Installing the library using npm</h4>
        <p><pre>&gt; npm install documentdb</pre></p>
        <h4>Hello world example code using callbacks</h4>
        <p><pre style="background-color:#eee">
        
var DocumentClient = require('documentdb').DocumentClient;

var host = [hostendpoint];                     // Add your endpoint
var masterKey = [database account masterkey];  // Add the massterkey of the endpoint

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
</pre></p>

##Community
- [DoQmentDB](https://github.com/a8m/doqmentdb) - A Promise-based DocumentDB client for MongoDB users

<h4>Running the tests</h4>
<p><pre>  
First You need to install mocha
&gt; npm install mocha

From the tests folder run 
&gt; mocha -t 0 -R spec
</p></pre>
    </body>
</html>