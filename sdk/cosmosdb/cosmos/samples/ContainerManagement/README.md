Samples for performing basic CRUD operations on an Azure Cosmos DB collection

- createCollection - given an id, create a new Collection with the default indexingPolicy
- listCollections - example of using the QueryIterator to get a list of Collections in a Database
- getOfferType - get the Offer.OfferType for a collection. This is what determines if a Collection is S1, S2, or S3
- modifyOfferType - change the Offer.OfferType for a collection. This is how you scale a Collection up or down
- deleteCollection - given just the collection id, delete the collection