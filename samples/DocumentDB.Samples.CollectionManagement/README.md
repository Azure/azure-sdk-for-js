Samples for performing basic CRUD operations on DocumentDB Collection
- listCollections - example of using the QueryIterator to get a list of Collections in a Database in to an array
- createCollection - given an id, create a new Collection with the default indexingPolicy
- getOrCreateDatabase - given an id for a database, attempt to find existing Database. if none found, create a new Database
- deleteCollection - using the supplied collection object, delete the collection
- deleteDatabase - using the supplied database object, delete the database