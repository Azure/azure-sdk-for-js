import * as assert from "assert";
import { Base, CosmosClient, DocumentBase, UriFactory } from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("Authorization", function () {
    this.timeout(5000);
    const client = new CosmosClient(host, { masterKey });

    // TODO: should have types for all these things
    let database: any = { id: "dbs" };
    let collection: any = { id: "colls" };

    let userReadPermission: any = { id: "User With Read Permission" };
    let userAllPermission: any = { id: "User With All Permission" };
    let collReadPermission: any = {
        id: "collection Read Permission",
        permissionMode: DocumentBase.PermissionMode.Read,
    };
    let collAllPermission: any = {
        id: "collection All Permission",
        permissionMode: DocumentBase.PermissionMode.All,
    };
    /************** TEST **************/

    beforeEach(async function () {
        await TestHelpers.removeAllDatabases(host, masterKey);
        // create a database
        const { result: db } = await client.createDatabase(database);
        assert.equal(db.id, database.id, "database is not created properly");
        database = db;

        // create userReadPermission
        const { result: user } = await client.createUser(database._self, userReadPermission);
        assert.equal(userReadPermission.id, user.id, "userReadPermission is not created properly");
        userReadPermission = user;

        // create collection
        const { result: coll } = await client.createCollection(database._self, collection);
        assert.equal(collection.id, coll.id, "coll1 is not created properly");
        collection = coll;

        // give permission to read collection, to userReadPermission
        collReadPermission.resource = collection._self;
        const { result: readPermission } = await client.createPermission(userReadPermission._self, collReadPermission);
        assert.equal(readPermission.id, collReadPermission.id, "permission to read coll1 is not created properly");
        collReadPermission = readPermission;

        // create userAllPermission
        const { result: userAllPerm } = await client.createUser(database._self, userAllPermission);
        assert.equal(userAllPermission.id, userAllPerm.id, "userAllPermission is not created properly");
        userAllPermission = userAllPerm;

        // create collAllPermission
        collAllPermission.resource = collection._self;
        const { result: allPermission } = await client.createPermission(userAllPermission._self, collAllPermission);
        assert.equal(collAllPermission.id, allPermission.id, "permission to read coll2 is not created properly");
        collAllPermission = allPermission;
    });

    afterEach(async function () {
        await TestHelpers.removeAllDatabases(host, masterKey);
    });

    it("Accessing collection by resourceTokens", async function () {
        const rTokens: any = {};
        rTokens[collection.id] = collReadPermission._token;

        const collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
        const clientReadPermission = new CosmosClient(host, { resourceTokens: rTokens });

        const { result: coll } = await clientReadPermission.readCollection(collectionUri);
        assert.equal(coll.id, collection.id, "invalid collection");
    });

    it("Accessing collection by permissionFeed", async function () {
        const clientReadPermission = new CosmosClient(host, { permissionFeed: [collReadPermission] });

        // self link must be used to access a resource using permissionFeed
        const { result: coll } = await clientReadPermission.readCollection(collection._self);
        assert.equal(coll.id, collection.id, "invalid collection");
    });

    it("Accessing collection without permission fails", async function () {
        const clientNoPermission = new CosmosClient(host, null);

        const collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
        try {
            await clientNoPermission.readCollection(collectionUri);
            assert.fail("accessing collectioni did not throw");
        } catch (err) {
            assert(err !== undefined); // TODO: should check that we get the right error message
        }
    });

    it("Accessing document by permissionFeed of parent collection", async function () {
        const { result: createdDoc } = await client.createDocument(collection._self, { id: "document1" });
        const clientReadPermission = new CosmosClient(host, { permissionFeed: [collReadPermission] });
        assert.equal("document1", createdDoc.id, "invalid documnet create");

        const { result: readDoc } = await clientReadPermission.readDocument(createdDoc._self);
        assert.equal(readDoc.id, createdDoc.id, "invalid document read");
    });

    it("Modifying collection by resourceTokens", async function () {
        const rTokens: any = {};
        rTokens[collection.id] = collAllPermission._token;

        const collectionUri = UriFactory.createDocumentCollectionUri(database.id, collection.id);
        const clientAllPermission = new CosmosClient(host, { resourceTokens: rTokens });

        // delete collection
        return clientAllPermission.deleteCollection(collectionUri);
    });

    it("Modifying collection by permissionFeed", async function () {
        const clientAllPermission = new CosmosClient(host, { permissionFeed: [collAllPermission] });

        // self link must be used to access a resource using permissionFeed
        // delete collection
        return clientAllPermission.deleteCollection(collection._self);
    });
});
