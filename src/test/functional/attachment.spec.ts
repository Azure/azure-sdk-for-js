import * as assert from "assert";
import * as Stream from "stream";
import {
    AzureDocuments, Base, Constants, CosmosClient,
    DocumentBase, HashPartitionResolver, Range,
    RangePartitionResolver, Response, RetryOptions,
} from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

// Used for sproc
declare var getContext: any;
// declare var body: (input?: any) => void; // TODO: remove this if it's not necessary

// TODO: should fix long lines
// tslint:disable:max-line-length

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("NodeJS CRUD Tests", function () {
    this.timeout(process.env.MOCHA_TIMEOUT || 10000);
    // remove all databases from the endpoint before each test
    beforeEach(async function () {
        this.timeout(10000);
        try {
            await TestHelpers.removeAllDatabases(host, masterKey);
        } catch (err) {
            throw err;
        }
    });
    describe("Validate Attachment CRUD", function () {

        beforeEach(async function () {
            try {
                await TestHelpers.removeAllDatabases(host, masterKey);
            } catch (err) {
                throw err;
            }
        });

        const createReadableStream = function (firstChunk?: any, secondChunk?: any) { // TODO: any
            const readableStream = new Stream.Readable();
            let chunkCount = 0;
            readableStream._read = function (n) {
                if (chunkCount === 0) {
                    this.push(firstChunk || "first chunk ");
                } else if (chunkCount === 1) {
                    this.push(secondChunk || "second chunk");
                } else {
                    this.push(null);
                }
                chunkCount++;
            };

            return readableStream;
        };

        const readMediaResponse = function (response: any): Promise<any> { // TODO: any
            return new Promise((resolve, reject) => {
                let data = "";
                response.on("data", function (chunk: any) {
                    data += chunk;
                });
                response.on("end", function () {
                    if (response.statusCode >= 300) {
                        return reject({ code: response.statusCode, body: data });
                    }

                    return resolve(data);
                });
            });
        };

        const attachmentCRUDTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), { id: "sample collection" });
                // create document
                const { result: document } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection),
                    { id: "sample document", foo: "bar", key: "value" });

                // list all attachments
                const { result: attachments } = await client.readAttachments(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document)).toArray();
                assert(Array.isArray(attachments), "Value should be an array");

                const initialCount = attachments.length;
                const validMediaOptions = { slug: "attachment name", contentType: "application/text" };
                const invalidMediaOptions = { slug: "attachment name", contentType: "junt/test" };
                let contentStream = createReadableStream();

                // create attachment with invalid content-type
                try {
                    const { result: badCreate } = await TestHelpers.createOrUpsertAttachmentAndUploadMedia(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document), contentStream, invalidMediaOptions, client, isUpsertTest);
                    assert.fail("Must fail to create attachment");
                } catch (err) {
                    assert(err !== undefined, "create attachment should return error on invalid mediatypes");
                    const badRequestErrorCode = 400;
                    assert.equal(err.code, badRequestErrorCode);
                }
                contentStream = createReadableStream();

                // create streamed attachment with valid content-type
                const { result: validAttachment } = await TestHelpers.createOrUpsertAttachmentAndUploadMedia(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), contentStream, validMediaOptions, client, isUpsertTest);
                assert.equal(validAttachment.id, "attachment name",
                    "name of created attachment should be the same as the one in the request");
                contentStream = createReadableStream();

                // create colliding attachment
                try {
                    const content2 = "bug";
                    const { result: attachment } = await client.createAttachmentAndUploadMedia(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document), contentStream, validMediaOptions);
                    assert.fail("Must fail to create colliding attachment");
                } catch (err) {
                    assert(err !== undefined, "create conflicting attachment should return error on conflicting names");
                    const conflictErrorCode = 409;
                    assert.equal(err.code, conflictErrorCode);
                }
                contentStream = createReadableStream();

                // create attachment with media link
                const dynamicAttachment = {
                    id: "dynamic attachment",
                    media: "http:// xstore.",
                    MediaType: "Book",
                    Author: "My Book Author",
                    Title: "My Book Title",
                    contentType: "application/text",
                };
                const { result: attachmentWithMediaLink } = await TestHelpers.createOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), dynamicAttachment, undefined, client, isUpsertTest);
                assert.equal(attachmentWithMediaLink.MediaType, "Book", "invalid media type");
                assert.equal(attachmentWithMediaLink.Author, "My Book Author", "invalid property value");

                // list all attachments
                const { result: attachments2 } = await client.readAttachments(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document)).toArray();
                assert.equal(attachments2.length, initialCount + 2, "number of attachments should've increased by 2");
                attachmentWithMediaLink.Author = "new author";

                // replace the attachment
                const { result: replacedAttachment } = await TestHelpers.replaceOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    TestHelpers.getAttachmentLink(isNameBased, db, collection, document, attachmentWithMediaLink),
                    attachmentWithMediaLink, undefined, client, isUpsertTest);
                assert.equal(replacedAttachment.MediaType, "Book", "invalid media type");
                assert.equal(replacedAttachment.Author, "new author", "invalid property value");

                // read attachment media
                const { result: mediaResponse } = await client.readMedia(validAttachment.media);
                assert.equal(mediaResponse, "first chunk second chunk");
                contentStream = createReadableStream("modified first chunk ", "modified second chunk");

                // update attachment media
                const { result: updatedMediaResult } = await TestHelpers.updateOrUpsertMedia(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    validAttachment.media, contentStream, validMediaOptions, client, isUpsertTest);

                // read attachment media after update
                // read media buffered
                const { result: mediaResponse2 } = await client.readMedia(validAttachment.media);
                assert.equal(mediaResponse2, "modified first chunk modified second chunk");

                // read media streamed
                client.connectionPolicy.MediaReadMode = DocumentBase.MediaReadMode.Streamed;
                const { result: mediaResponseStreamed } = await client.readMedia(validAttachment.media);
                const mediaResult = await readMediaResponse(mediaResponseStreamed);
                assert.equal(mediaResult, "modified first chunk modified second chunk");

                // share attachment with a second document
                const { result: document2 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "document 2" });
                const secondAttachment = { id: validAttachment.id, contentType: validAttachment.contentType, media: validAttachment.media };
                const { result: attachment2 } = await TestHelpers.createOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document2),
                    secondAttachment, undefined, client, isUpsertTest);
                assert.equal(validAttachment.id, attachment2.id, "name mismatch");
                assert.equal(validAttachment.media, attachment2.media, "media mismatch");
                assert.equal(validAttachment.contentType, attachment2.contentType, "contentType mismatch");

                // deleting attachment
                const { result: deletedAttachment } = await client.deleteAttachment(
                    TestHelpers.getAttachmentLink(isNameBased, db, collection, document, validAttachment));

                // read attachments after deletion
                try {
                    const { result: attachment } = await client.readAttachment(
                        TestHelpers.getAttachmentLink(isNameBased, db, collection, document, validAttachment));
                    assert.fail("Must fail to read attachment after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }
        };

        const attachmentCRUDOverMultiplePartitionsTest = async function (isNameBased: boolean, isUpsertTest: boolean) {
            try {
                const client = new CosmosClient(host, { masterKey });

                // create database
                const { result: db } = await client.createDatabase({ id: "sample database" });
                // create collection
                const partitionKey = "id";
                const collectionDefinition = {
                    id: "coll1",
                    partitionKey: { paths: ["/" + partitionKey], kind: DocumentBase.PartitionKind.Hash },
                };
                const { result: collection } = await client.createCollection(
                    TestHelpers.getDatabaseLink(isNameBased, db), collectionDefinition, { offerThroughput: 12000 });
                // create document
                const { result: document } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "sample document", foo: "bar", key: "value" });
                const sampleDocumentPartitionKeyValue = document[partitionKey];
                // list all attachments
                const { result: attachments } = await client.readAttachments(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), { partitionKey: sampleDocumentPartitionKeyValue }).toArray();
                assert(Array.isArray(attachments), "Value should be an array");
                const initialCount = attachments.length;
                const validMediaOptions = { slug: "attachment name", contentType: "application/text", partitionKey: document[partitionKey] };
                const invalidMediaOptions = { slug: "attachment name", contentType: "junt/test", partitionKey: document[partitionKey] };

                // create attachment with invalid content-type
                let contentStream = createReadableStream();
                try {
                    const { result: badUpdate } = await TestHelpers.createOrUpsertAttachmentAndUploadMedia(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                        contentStream, invalidMediaOptions, client, isUpsertTest);
                    assert.fail("Must fail to insert attachment with invalid content-type");
                } catch (err) {
                    assert(err !== undefined, "create attachment should return error on invalid mediatypes");
                    const badRequestErrorCode = 400;
                    assert.equal(err.code, badRequestErrorCode);
                }
                contentStream = createReadableStream();

                // create streamed attachment with valid content-type
                const { result: validAttachment } = await TestHelpers.createOrUpsertAttachmentAndUploadMedia(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    contentStream, validMediaOptions, client, isUpsertTest);
                assert.equal(validAttachment.id, "attachment name", "name of created attachment should be the same as the one in the request");
                contentStream = createReadableStream();

                // create colliding attachment
                try {
                    const content2 = "bug";
                    const { result: badCreate } = await client.createAttachmentAndUploadMedia(
                        TestHelpers.getDocumentLink(isNameBased, db, collection, document), contentStream, validMediaOptions);
                    assert.fail("create conflicting attachment should return error on conflicting names");
                } catch (err) {
                    const conflictErrorCode = 409;
                    assert.equal(err.code, conflictErrorCode);
                    contentStream = createReadableStream();
                }

                // create attachment with media link
                const dynamicAttachment = {
                    id: "dynamic attachment",
                    media: "http://xstore.",
                    MediaType: "Book",
                    Author: "My Book Author",
                    Title: "My Book Title",
                    contentType: "application/text",
                };
                const { result: attachmentWithMediaLink } = await TestHelpers.createOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    dynamicAttachment, { partitionKey: sampleDocumentPartitionKeyValue }, client, isUpsertTest);
                assert.equal(attachmentWithMediaLink.MediaType, "Book", "invalid media type");
                assert.equal(attachmentWithMediaLink.Author, "My Book Author", "invalid property value");

                // list all attachments
                const { result: attachments2 } = await client.readAttachments(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document), { partitionKey: document[partitionKey] }).toArray();
                assert.equal(attachments2.length, initialCount + 2, "number of attachments should've increased by 2");
                attachmentWithMediaLink.Author = "new author";

                // replace the attachment
                const { result: replacedAttachment } = await TestHelpers.replaceOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    TestHelpers.getAttachmentLink(isNameBased, db, collection, document, attachmentWithMediaLink),
                    attachmentWithMediaLink, { partitionKey: sampleDocumentPartitionKeyValue }, client, isUpsertTest);
                assert.equal(replacedAttachment.MediaType, "Book", "invalid media type");
                assert.equal(replacedAttachment.Author, "new author", "invalid property value");

                // read attachment media
                const { result: mediaResponse } = await client.readMedia(validAttachment.media);
                assert.equal(mediaResponse, "first chunk second chunk");
                contentStream = createReadableStream("modified first chunk ", "modified second chunk");

                // update attachment media
                const { result: mediaResult } = await TestHelpers.updateOrUpsertMedia(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document),
                    validAttachment.media, contentStream, validMediaOptions, client, isUpsertTest);

                // read attachment media after update
                // read media buffered
                const { result: mediaResponseAfterUpdate } = await client.readMedia(validAttachment.media);
                assert.equal(mediaResponseAfterUpdate, "modified first chunk modified second chunk");

                // read media streamed
                client.connectionPolicy.MediaReadMode = DocumentBase.MediaReadMode.Streamed;
                const { result: mediaResponseStreamed } = await client.readMedia(validAttachment.media);
                const mediaResultStreamed = await readMediaResponse(mediaResponseStreamed);
                assert.equal(mediaResultStreamed, "modified first chunk modified second chunk");

                // share attachment with a second document
                const { result: document2 } = await client.createDocument(
                    TestHelpers.getCollectionLink(isNameBased, db, collection), { id: "document 2" });
                const secondDocumentPartitionKeyValue = document2[partitionKey];
                const secondAttachment = { id: validAttachment.id, contentType: validAttachment.contentType, media: validAttachment.media };
                const { result: attachment2 } = await TestHelpers.createOrUpsertAttachment(
                    TestHelpers.getDocumentLink(isNameBased, db, collection, document2),
                    secondAttachment, { partitionKey: secondDocumentPartitionKeyValue }, client, isUpsertTest);
                assert.equal(validAttachment.id, attachment2.id, "name mismatch");
                assert.equal(validAttachment.media, attachment2.media, "media mismatch");
                assert.equal(validAttachment.contentType, attachment2.contentType, "contentType mismatch");
                const createdAttachment = attachment2;

                // deleting attachment
                const { result: attachment } = await client.deleteAttachment(
                    TestHelpers.getAttachmentLink(isNameBased, db, collection, document2, createdAttachment), { partitionKey: secondDocumentPartitionKeyValue });

                // read attachments after deletion
                try {
                    const { result: badRead } = await client.readAttachment(
                        TestHelpers.getAttachmentLink(isNameBased, db, collection, document2, createdAttachment), { partitionKey: secondDocumentPartitionKeyValue });
                    assert.fail("Must fail to read after deletion");
                } catch (err) {
                    const notFoundErrorCode = 404;
                    assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
                }
            } catch (err) {
                throw err;
            }

        };

        it("nativeApi Should do attachment CRUD operations successfully name based", async function () {
            try {
                await attachmentCRUDTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations successfully rid based", async function () {
            try {
                await attachmentCRUDTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations successfully name based with upsert", async function () {
            try {
                await attachmentCRUDTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations successfully rid based with upsert", async function () {
            try {
                await attachmentCRUDTest(false, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations over multiple partitions successfully name based", async function () {
            try {
                await attachmentCRUDOverMultiplePartitionsTest(true, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations over multiple partitions successfully rid based", async function () {
            try {
                await attachmentCRUDOverMultiplePartitionsTest(false, false);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations over multiple partitions successfully name based with upsert", async function () {
            try {
                await attachmentCRUDOverMultiplePartitionsTest(true, true);
            } catch (err) {
                throw err;
            }
        });

        it("nativeApi Should do attachment CRUD operations over multiple partitions successfully rid based with upsert", async function () {
            try {
                await attachmentCRUDOverMultiplePartitionsTest(false, true);
            } catch (err) {
                throw err;
            }
        });
    });
});
