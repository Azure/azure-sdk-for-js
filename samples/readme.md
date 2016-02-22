##Introduction ##
These samples demonstrate how to use the Node.js SDK to interact with the [Azure DocumentDB](http://azure.microsoft.com/services/documentdb)  service

##Building the sample ##

These samples were built using the [Node.js Tools for Visual Studio](https://github.com/Microsoft/nodejstools) and include *njsproj files accordingly. However, you do not *need* Visual Studio to run these samples. Just ignore the nsjprof files if you wish, and open the app.js in your choice of editor such as [Visual Studio Code](https://code.visualstudio.com/), or even a text editor such [Sublime](http://www.sublimetext.com/). The choice is yours!

Before you can run any of the samples you do need an active Azure DocumentDB account. 
So head over to [How to create a DocumentDB database account](https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-account/) and see how to setup your account.

Once you have your DocumentDB account setup, you can run these files using Visual Studio if you are using it, or by simply running **node app.js**

##Description ##

Azure DocumentDB is a fully managed, scalable, query-able, schema free JSON document database service built for modern applications and delivered to you by Microsoft.

These samples demonstrate how to use the Client SDKs to interact with the service.

- **CollectionManagement** - CRUD operations on DocumentCollection resources.

- **DatabaseManagent** - CRUD operations on Database resources.

- **DocumentManagement** - CRUD operations on Document resources.

- **IndexManagement** - shows samples on how to customize the Indexing Policy for a Collection should you need to.

- **Partitioning** - shows samples on using the provided hashPartitionResolver and rangePartitionResolver classes, and how to implement custom resolvers.
 
- **ServerSideScripts** - shows how to create, and execute, server-side stored procedures, triggers and user-defined functions.

After walking through these samples you should have a good idea of how to get going and how to make use of the various Azure DocumentDB APIs. 

There are step-by-step tutorials and more documentation on the [DocumentDB documentation](http://azure.microsoft.com/en-us/documentation/services/documentdb/) page so head over about this NoSQL document database.
 
##More information ##

For more information on this database service, please refer to the [Azure DocumentDB](http://azure.microsoft.com/services/documentdb) service page.