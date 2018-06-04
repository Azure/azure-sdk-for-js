import * as assert from "assert";
import * as stream from "stream";
import {DocumentClient, UriFactory} from "../../";
import testConfig from "./../common/_testConfig";
import { TestHelpers } from "./../common/TestHelpers";

const host = testConfig.host;
const masterKey = testConfig.masterKey;

describe("Collection Naming", function () {
    const client = new DocumentClient(host, { masterKey });
    const databaseId = "collNamingTestDB";
    const collectionId = "media";
    const documentId = "doc1";
    const attachmentId = "atch1";

    const createReadableStream = function (firstChunk: string, secondChunk: string) {
        const readableStream = new stream.Readable();
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

    beforeEach(async function () {
        await TestHelpers.removeAllDatabases(host, masterKey);
        // create database
        const {result: db} = await client.createDatabase({ id: databaseId });
        assert.equal(db.id, databaseId, "database is not created properly");

        // create collection
        const dbUri = UriFactory.createDatabaseUri(databaseId);
        const {result: collection} = await client.createCollection(dbUri, { id: collectionId });
        assert.equal(collection.id, collectionId, "collection is not created properly");

        // createDocument
        const collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
        const {result: document} = await client.createDocument(collectionUri, { id: documentId });
        assert.equal(document.id, documentId, "document is not created properly");

        // create attachment and upload media
        const mediaOption = { slug: attachmentId, contentType: "application/text" };
        const readableStream = createReadableStream("UPLOADING ", "MEDIA");
        const documentUri = UriFactory.createDocumentUri(databaseId, collectionId, documentId);
        const {result: attachment} =
            await client.createAttachmentAndUploadMedia(documentUri, readableStream, mediaOption);
        assert.equal(attachment.id, attachmentId, "attachment is not created properly");
    });

    afterEach(async function () {
        await TestHelpers.removeAllDatabases(host, masterKey);
    });

    it("Accessing a collection with 'media' in its name", async function () {
        const collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
        const {result: collection} = await client.readCollection(collectionUri);
        assert.equal(collection.id, collectionId, "collectionIds do not match");
    });

    it("Accessing media in a collection", async function () {
        const collectionUri = UriFactory.createDocumentCollectionUri(databaseId, collectionId);
        const {result: collection} = await client.readCollection(collectionUri);
        assert.equal(collection.id, collectionId, "collectionIds do not match");
    });
});
