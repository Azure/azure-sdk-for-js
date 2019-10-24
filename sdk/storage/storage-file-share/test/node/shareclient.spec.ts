import * as assert from "assert";
import { newPipeline, ShareClient, SharedKeyCredential, SignedIdentifier } from "../../src";
import { getBSU, getConnectionStringFromEnvironment } from "./../utils";
import { record } from "../utils/recorder";

describe("ShareClient Node.js only", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function() {
    await shareClient.delete();
    recorder.stop();
  });

  it("setAccessPolicy", async () => {
    const yesterday = recorder.newDate();
    const tomorrow = recorder.newDate();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const identifiers: SignedIdentifier[] = [
      {
        accessPolicy: {
          expiry: tomorrow,
          permissions: "rwd",
          start: yesterday
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.expiry.getTime(),
      identifiers[0].accessPolicy.expiry.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.start.getTime(),
      identifiers[0].accessPolicy.start.getTime()
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.permissions,
      identifiers[0].accessPolicy.permissions
    );
  });

  it("getAccessPolicy", (done) => {
    // create() with default parameters has been tested in setAccessPolicy
    done();
  });

  it("can be created with a url and a credential", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (shareClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareClient(shareClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName, {
      retryOptions: {
        maxTries: 5
      }
    });
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
