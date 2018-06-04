import * as assert from "assert";
import { Base, Constants, CosmosClient, DocumentBase, UriFactory } from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

// TODO: these tests are all disabled

describe("RU Per Minute", function () {
    const client = new CosmosClient(host, { masterKey });

    let databaseLink: string;
    const createDatabase = async () => {
        const { result: createdDB } = await client.createDatabase({ id: "Database" });
        databaseLink = UriFactory.createDatabaseUri(createdDB.id);
    };

    // - removes all the databases,
    //  - creates a new database,
    beforeEach(async () => {
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
            await createDatabase();
        } catch (err) {
            throw err;
        }
    });

    // - removes all the databases,
    afterEach(async () => {
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });

    xit("Create Collection with RU Per Minute Offer", function (done) {
        const collectionDefinition = {
            id: "sample col",
        };

        const options = {
            offerEnableRUPerMinuteThroughput: true,
            offerVersion: "V2",
            offerThroughput: 400,
        };

        client.createCollection(databaseLink, collectionDefinition, options, function (err, collection) {
            assert.equal(err, undefined, "Error in creating collection");

            const validateOffer = function (error: any, offers: any) {
                assert.equal(error, undefined, "unexpected failure in reading offers");
                assert.equal(offers.length, 1);
                const offer = offers[0];

                assert.equal(offer.offerType, "Invalid");
                assert.notEqual(offer.content, undefined);
                assert.equal(offer.content.offerIsRUPerMinuteThroughputEnabled, true);

                done();
            };

            const queryIterator = client.readOffers().toArray(validateOffer);
        });
    });

    xit("Create Collection without RU Per Minute Offer", function (done) {
        const collectionDefinition = {
            id: "sample col",
        };

        const options = {
            offerVersion: "V2",
            offerThroughput: 400,
        };

        client.createCollection(databaseLink, collectionDefinition, options, function (err, collection) {
            assert.equal(err, undefined, "Error in creating collection");

            const validateOffer = function (error: any, offers: any) {
                assert.equal(error, undefined, "unexpected failure in reading offers");
                assert.equal(offers.length, 1);
                const offer = offers[0];

                assert.equal(offer.offerType, "Invalid");
                assert.notEqual(offer.content, undefined);
                assert.equal(offer.content.offerIsRUPerMinuteThroughputEnabled, false);

                done();
            };

            const queryIterator = client.readOffers().toArray(validateOffer);
        });
    });

    xit("Create Collection with RU Per Minute Offer and insert Document with disableRUPerMinuteUsage options",
        function (done) {
        const collectionDefinition = {
            id: "sample col",
        };

        const options = {
            offerEnableRUPerMinuteThroughput: true,
            offerVersion: "V2",
            offerThroughput: 400,
        };

        client.createCollection(databaseLink, collectionDefinition, options, function (err, collection) {
            assert.equal(err, undefined, "Error in creating collection");
            const collectionLink = collection._self;
            const options2: any = {
                disableRUPerMinuteUsage: true,
            };
            client.createDocument(collectionLink, { id: "sample document" },
                options2, function (err2, document, headers) {
                assert.equal(err2, undefined, "Error in creating document");
                assert(headers[Constants.HttpHeaders.IsRUPerMinuteUsed] !== true);
                done();
            });
        });
    });
});
