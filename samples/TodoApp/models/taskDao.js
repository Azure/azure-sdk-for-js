const CosmosClient = require('../../../').DocumentClient;
const CosmosUtils = require('./CosmosUtils');

class TaskDao {

    /**
     * 
     * @param {CosmosClient} cosmosClient 
     * @param {*} databaseId 
     * @param {*} collectionId 
     */
    constructor(cosmosClient, databaseId, collectionId) {
        this.client = cosmosClient;
        this.databaseId = databaseId;
        this.collectionId = collectionId;

        this.database = null;
        this.collection = null;
    }

    async init() {
        try {
            const db = await CosmosUtils.getOrCreateDatabase(this.client, this.databaseId);
            this.database = db;
            const coll = await CosmosUtils.getOrCreateCollection(this.client, this.database._self, this.collectionId);
            this.collection = coll;
        } catch (err) {
            throw err;
        }
    }

    async find(querySpec) {

        if (!this.collection) {
            throw new Error("Collection is not initialized.");
        }
        try {
            const { result: results } = await this.client.queryDocuments(this.collection._self, querySpec).toArray();
            return results;
        } catch (err) {
            throw err;
        }
    }

    async addItem(item) {
        item.date = Date.now();
        item.completed = false;
        try {
            const { result: doc } = await this.client.createDocument(this.collection._self, item);
            return doc;
        } catch (err) {
            throw err;
        }
    }


    async updateItem(itemId) {
        try {
            const doc = await this.getItem(itemId);
            doc.completed = true;

            const { result: replaced } = await this.client.replaceDocument(doc._self, doc);
            return replaced;
        } catch (err) {
            throw err;
        }
    }

    async getItem(itemId) {
        try {
            const querySpec = {
                query: 'SELECT * FROM root r WHERE r.id = @id',
                parameters: [{
                    name: '@id',
                    value: itemId
                }]
            };

            const { result: results } = await this.client.queryDocuments(this.collection._self, querySpec).toArray();

            return results[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = TaskDao;
