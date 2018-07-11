import * as assert from "assert";
import * as Stream from "stream";
import {
    CosmosClient,
} from "../../";
import { Container, ContainerDefinition, Database } from "../../client";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

// TODO: should fix long lines
// tslint:disable:max-line-length

const endpoint = testConfig.host;
const masterKey = testConfig.masterKey;
const client = new CosmosClient({
    endpoint,
    auth: { masterKey },
});

async function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

describe("NodeJS CRUD Tests", function () {
    this.timeout(process.env.MOCHA_TIMEOUT || 600000);
    // remove all databases from the endpoint before each test
    beforeEach(async function () {
        await TestHelpers.removeAllDatabases(client);
    });

    describe("TTL tests", function () {

        async function createcontainerWithInvalidDefaultTtl(db: Database, containerDefinition: ContainerDefinition, collId: any, defaultTtl: number) {
            containerDefinition.id = collId;
            containerDefinition.defaultTtl = defaultTtl;
            try {
                await db.containers.create(containerDefinition);
            } catch (err) {
                const badRequestErrorCode = 400;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        async function createItemWithInvalidTtl(container: Container, itemDefinition: any, itemId: any, ttl: number) {
            itemDefinition.id = itemId;
            itemDefinition.ttl = ttl;

            try {
                await container.items.create(itemDefinition);
                assert.fail("Must throw if using invalid TTL");
            } catch (err) {
                const badRequestErrorCode = 400;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        it("nativeApi Validate container and Item TTL values.", async function () {
            try {
                const { result: db } = await client.databases.create({ id: "ttl test1 database" });

                const containerDefinition = {
                    id: "sample container1",
                    defaultTtl: 5,
                };
                const database = await client.database(db.id);
                const { result: containerResult } = await database.containers.create(containerDefinition);
                assert.equal(containerDefinition.defaultTtl, containerResult.defaultTtl);
                const container = database.container(containerResult.id);

                // null, 0, -10 are unsupported value for defaultTtl.Valid values are -1 or a non-zero positive 32-bit integer value
                await createcontainerWithInvalidDefaultTtl(database, containerDefinition, "sample container2", null);
                await createcontainerWithInvalidDefaultTtl(database, containerDefinition, "sample container3", 0);
                await createcontainerWithInvalidDefaultTtl(database, containerDefinition, "sample container4", -10);

                const itemDefinition = {
                    id: "doc",
                    name: "sample Item",
                    key: "value",
                    ttl: 2,
                };

                // 0, null, -10 are unsupported value for ttl.Valid values are -1 or a non-zero positive 32-bit integer value
                await createItemWithInvalidTtl(container, itemDefinition, "doc1", 0);
                await createItemWithInvalidTtl(container, itemDefinition, "doc2", null);
                await createItemWithInvalidTtl(container, itemDefinition, "doc3", -10);
            } catch (err) {
                throw err;
            }
        });

        async function checkItemGone(container: Container, createdItem: any) {
            try {
                await container.item(createdItem.id).read();
                assert.fail("Must throw if the Item isn't there");
            } catch (err) {
                const badRequestErrorCode = 404;
                assert.equal(err.code, badRequestErrorCode, "response should return error code " + badRequestErrorCode);
            }
        }

        async function checkItemExists(container: Container, createdItem: any) {
            const { result: readItem } = await container.item(createdItem.id).read();
            assert.equal(readItem.ttl, createdItem.ttl);
        }

        async function positiveDefaultTtlStep4(container: Container, createdItem: any) {
            // the created Item should NOT be gone as it 's ttl value is set to 8 which overrides the containers' s defaultTtl value(5)
            await checkItemExists(container, createdItem);
            await sleep(4000);
            await checkItemGone(container, createdItem);
        }

        async function positiveDefaultTtlStep3(container: Container, createdItem: any, itemDefinition: any) {
            // the created Item should be gone now as it 's ttl value is set to 2 which overrides the containers' s defaultTtl value(5)
            await checkItemGone(container, createdItem);
            itemDefinition.id = "doc4";
            itemDefinition.ttl = 8;

            const { result: doc } = await container.items.create(itemDefinition);
            await sleep(6000);
            await positiveDefaultTtlStep4(container, doc);

        }

        async function positiveDefaultTtlStep2(container: Container, createdItem: any, itemDefinition: any) {
            // the created Item should NOT be gone as it 's ttl value is set to -1(never expire) which overrides the containers' s defaultTtl value
            await checkItemExists(container, createdItem);
            itemDefinition.id = "doc3";
            itemDefinition.ttl = 2;

            const { result: doc } = await container.items.create(itemDefinition);
            await sleep(4000);
            await positiveDefaultTtlStep3(container, doc, itemDefinition);
        }

        async function positiveDefaultTtlStep1(container: Container, createdItem: any, itemDefinition: any) {
            // the created Item should be gone now as it 's ttl value would be same as defaultTtl value of the container
            await checkItemGone(container, createdItem);
            itemDefinition.id = "doc2";
            itemDefinition.ttl = -1;

            const { result: doc } = await container.items.create(itemDefinition);
            await sleep(5000);
            await positiveDefaultTtlStep2(container, doc, itemDefinition);

        }

        it("nativeApi Validate Item TTL with positive defaultTtl.", async function () {
            const { result: db } = await client.databases.create({ id: "ttl test2 database" });

            const containerDefinition = {
                id: "sample container",
                defaultTtl: 5,
            };

            const { result: containerResult } = await client.database(db.id).containers.create(containerDefinition);

            const container = await client.database(db.id).container(containerResult.id);

            const itemDefinition = {
                id: "doc1",
                name: "sample Item",
                key: "value",
            };

            const { result: createdItem } = await container.items.create(itemDefinition);
            await sleep(7000);
            await positiveDefaultTtlStep1(container, createdItem, itemDefinition);
        });

        async function minusOneDefaultTtlStep1(container: Container, createdItem1: any, createdItem2: any, createdItem3: any) {
            // the created Item should be gone now as it 's ttl value is set to 2 which overrides the containers' s defaultTtl value(-1)
            await checkItemGone(container, createdItem3);

            // The Items with id doc1 and doc2 will never expire
            const { result: readItem1 } = await container.item(createdItem1.id).read();
            assert.equal(readItem1.id, createdItem1.id);

            const { result: readItem2 } = await container.item(createdItem2.id).read();
            assert.equal(readItem2.id, createdItem2.id);
        }

        it("nativeApi Validate Item TTL with -1 defaultTtl.", async function () {
            const { result: db } = await client.databases.create({ id: "ttl test2 database" });

            const containerDefinition = {
                id: "sample container",
                defaultTtl: -1,
            };

            const { result: createdContainer } = await client.database(db.id).containers.create(containerDefinition);

            const container = await client.database(db.id).container(createdContainer.id);

            const itemDefinition: any = {
                id: "doc1",
                name: "sample Item",
                key: "value",
            };

            // the created Item 's ttl value would be -1 inherited from the container' s defaultTtl and this Item will never expire
            const { result: createdItem1 } = await container.items.create(itemDefinition);

            // This Item is also set to never expire explicitly
            itemDefinition.id = "doc2";
            itemDefinition.ttl = -1;

            const { result: createdItem2 } = await container.items.create(itemDefinition);

            itemDefinition.id = "doc3";
            itemDefinition.ttl = 2;

            const { result: createdItem3 } = await container.items.create(itemDefinition);
            await sleep(4000);
            await minusOneDefaultTtlStep1(container, createdItem1, createdItem2, createdItem3);
        });

        it("nativeApi Validate Item TTL with no defaultTtl.", async function () {
            const { result: db } = await client.databases.create({ id: "ttl test3 database" });

            const containerDefinition = { id: "sample container" };

            const { result: createdContainer } = await client.database(db.id).containers.create(containerDefinition);

            const container = await client.database(db.id).container(createdContainer.id);

            const itemDefinition = {
                id: "doc1",
                name: "sample Item",
                key: "value",
                ttl: 5,
            };

            const { result: createdItem } = await container.items.create(itemDefinition);

            // Created Item still exists even after ttl time has passed since the TTL is disabled at container level(no defaultTtl property defined)
            await sleep(7000);
            await checkItemExists(container, createdItem);
        });

        async function miscCasesStep4(container: Container, createdItem: any, itemDefinition: any) {
            // Created Item still exists even after ttl time has passed since the TTL is disabled at container level
            await checkItemExists(container, createdItem);

        }

        async function miscCasesStep3(container: Container, upsertedItem: any, itemDefinition: any) {
            // the upserted Item should be gone now after 10 secs from the last write(upsert) of the Item
            await checkItemGone(container, upsertedItem);
            const query = "SELECT * FROM root r";
            const { result: results } = await container.items.query(query).toArray();
            assert.equal(results.length, 0);

            // Use a container definition without defaultTtl to disable ttl at container level
            const containerDefinition = { id: container.id };

            await container.replace(containerDefinition);

            itemDefinition.id = "doc2";

            const { result: createdItem } = await container.items.create(itemDefinition);
            await sleep(5000);
            await miscCasesStep4(container, createdItem, itemDefinition);
        }

        async function miscCasesStep2(container: Container, itemDefinition: any) {
            // Upsert the Item after 3 secs to reset the Item 's ttl
            itemDefinition.key = "value2";
            const { result: upsertedItem } = await container.items.upsert(itemDefinition);
            await sleep(7000);
            // Upserted Item still exists after (3+7)10 secs from Item creation time( with container 's defaultTtl set to 8) since it' s ttl was reset after 3 secs by upserting it
            await checkItemExists(container, upsertedItem);
            await sleep(3000);
            await miscCasesStep3(container, upsertedItem, itemDefinition);
        }

        async function miscCasesStep1(container: Container, createdItem: any, itemDefinition: any) {
            // the created Item should be gone now as the ttl time expired
            await checkItemGone(container, createdItem);
            // We can create a Item with the same id after the ttl time has expired
            const { result: doc } = await container.items.create(itemDefinition);
            assert.equal(itemDefinition.id, doc.id);
            await sleep(3000);
            await miscCasesStep2(container, itemDefinition);
        }

        it("nativeApi Validate Item TTL Misc cases.", async function () {
            const { result: db } = await client.databases.create({ id: "ttl test4 database" });

            const containerDefinition = {
                id: "sample container",
                defaultTtl: 8,
            };

            const { result: containerResult } = await client.database(db.id).containers.create(containerDefinition);

            const container = await client.database(db.id).container(containerResult.id);

            const itemDefinition = {
                id: "doc1",
                name: "sample Item",
                key: "value",
            };

            const { result: createdItem } = await container.items.create(itemDefinition);

            await sleep(10000);
            await miscCasesStep1(container, createdItem, itemDefinition);
        });
    });
});
