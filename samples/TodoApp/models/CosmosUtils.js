const CosmosClient = require('../../../').DocumentClient;

class CosmosUtils {
    /**
     * 
     * @param {CosmosClient} client 
     * @param {string} databaseId
     */
    static async getOrCreateDatabase(client, databaseId) {
        const querySpec = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

        try {
            const {result: result} = await client.queryDatabases(querySpec).toArray();
            if (result.length === 0) {
                const databaseSpec = {
                    id: databaseId
                };

                const {result: database}  = await client.createDatabase(databaseSpec);
                return database;
            } else {
                return result[0];
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * @param {CosmosClient} client 
     * @param {string} databaseLink 
     * @param {string} collectionId 
     */
    static async getOrCreateCollection (client, databaseLink, collectionId) {
        const querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };             

        try {
            const {result: results} = await client.queryCollections(databaseLink, querySpec).toArray();
            if (results.length === 0) {
                const collectionSpec = {
                    id: collectionId
                };
            

                const {result: collection} = await client.createCollection(databaseLink, collectionSpec);
                return collection;
            } else {
                return results[0];
            }
        } catch (err) {
            throw err;
        }
    }
};

module.exports = CosmosUtils;