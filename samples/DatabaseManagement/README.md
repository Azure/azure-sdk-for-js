Samples for performing basic CRUD operations on Azure Cosmos DB Database

- createCollection  - given an id, create a new Collectionwith thedefault indexingPolicy
- listCollections   - example of using the QueryIterator to get a list of Collections in a Database
- readCollection    - Read a collection by its _self
- readCollection    - Read a collection by its id (using new ID Based Routing)
- getOfferType      - get the Offer.OfferType for a collection. This is what determines if aCollection is S1, S2, or S3 
- modifyOfferType   - change the Offer.OfferType for a collection. This is how you scale a Collection up or down
- deleteCollection  - given just the collection id, delete the collection