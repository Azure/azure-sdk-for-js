Samples for performing basic CRUD operations on DocumentDB Documents
- getOrCreateDatabase - given an id for a database, attempt to find existing Database. if none found, create a new Database
- getOrCreateCollection - given an id for a collection, attempt to find existing Collection. if none found, create a new Collection
- deleteCollection - using the supplied collection object, delete the collection
- deleteDatabase - using the supplied database object, delete the database
- getDocumentById - given an id of a document, go fetch it
- insertDocuments - given an array of JSON documents, go create these
- queryDocuments - how to create a query for a document
- replaceDocument - how to make changes to a retrieved document and then replace it on the server
- deleteDocument - given a document, go delete it from the database
