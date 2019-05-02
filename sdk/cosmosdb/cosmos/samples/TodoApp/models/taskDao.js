// @ts-check
const CosmosClient = require("../../../").CosmosClient;

class TaskDao {
  /**
   *
   * @param {CosmosClient} cosmosClient
   * @param {*} databaseId
   * @param {*} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  async init() {
    try {
      const dbResponse = await this.client.databases.createIfNotExists({ id: this.databaseId });
      this.database = dbResponse.database;
      const coResponse = await this.database.containers.create({ id: this.collectionId });
      this.container = coResponse.container;
    } catch (err) {
      throw err;
    }
  }

  async find(querySpec) {
    if (!this.container) {
      throw new Error("Collection is not initialized.");
    }
    try {
      const { result: results } = await this.container.items.query(querySpec).toArray();
      return results;
    } catch (err) {
      throw err;
    }
  }

  async addItem(item) {
    item.date = Date.now();
    item.completed = false;
    try {
      const { body: doc } = await this.container.items.create(item);
      return doc;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(itemId) {
    try {
      const doc = await this.getItem(itemId);
      doc.completed = true;

      const { body: replaced } = await this.container.item(itemId).replace(doc);
      return replaced;
    } catch (err) {
      throw err;
    }
  }

  async getItem(itemId) {
    try {
      const { body } = await this.container.item(itemId).read();

      return body;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TaskDao;
