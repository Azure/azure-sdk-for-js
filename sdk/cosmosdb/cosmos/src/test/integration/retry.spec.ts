import assert from "assert";
import { AzureDocuments, Constants, CosmosClient, RetryOptions } from "../..";
import * as request from "../../request";

describe("retry policy tests", function() {
  this.timeout(300000);
  const collectionDefinition = {
    id: "sample collection"
  };

  const documentDefinition = {
    id: "doc",
    name: "sample document",
    key: "value"
  };

  const connectionPolicy = new AzureDocuments.ConnectionPolicy();

  // mocked database account to return the WritableLocations and ReadableLocations
  // set with the default endpoint
  // const mockGetDatabaseAccount = function (options, callback) {
  //     const databaseAccount = new AzureDocuments.DatabaseAccount();
  //     callback(undefined, databaseAccount);
  // };

  const retryAfterInMilliseconds = 1000;
  // // mocked request object stub that calls the callback with 429 throttling error
  // const mockCreateRequestObjectStub = function (connectionPolicy, requestOptions, callback) {
  //     callback({ code: 429, body: "Request rate is too large",
  //                retryAfterInMilliseconds: retryAfterInMilliseconds });
  // };

  // var mockCreateRequestObjectForDefaultRetryStub = function (connectionPolicy, requestOptions, callback) {
  //     global.counter++;
  //     if (global.counter % 5 == 0)
  //         return global.originalFunc(connectionPolicy, requestOptions, callback)
  //     else
  //         return callback({ code: "ECONNRESET", body: "Connection was reset" })
  // }

  // TODO: need to fix this, the stubbing doesn't work with the new way we work
  xit("throttle retry policy test default retryAfter", async function() {
    // connectionPolicy.RetryOptions = new RetryOptions(5);
    // const client = new CosmosClient({endpoint, auth: { masterKey }, connectionPolicy});
    // const { result: db } = await client.createDatabase({ id: "sample database" });
    // const { result: collection } = await client.createCollection(db._self, collectionDefinition);
    // const originalGetDatabaseAccount = client.getDatabaseAccount;
    // client.getDatabaseAccount = mockGetDatabaseAccount;
    // const originalCreateRequestObjectStub = request._createRequestObjectStub;
    // request._createRequestObjectStub = mockCreateRequestObjectStub;
    // try {
    //     const { result: createdDocument } =
    //         await client.createDocument(collection._self, documentDefinition);
    // } catch (err) {
    //     const responseHeaders = (err as request.ErrorResponse).headers;
    //     assert.equal(err.code, 429, "invalid error code");
    //     assert.equal(responseHeaders[Constants.ThrottleRetryCount],
    //         connectionPolicy.RetryOptions.MaxRetryAttemptCount, "Current retry attempts not maxed out");
    //     assert.ok(responseHeaders[Constants.ThrottleRetryWaitTimeInMs]
    //         >= connectionPolicy.RetryOptions.MaxRetryAttemptCount * retryAfterInMilliseconds);
    // }
    // request._createRequestObjectStub = originalCreateRequestObjectStub;
    // client.getDatabaseAccount = originalGetDatabaseAccount;
  });

  xit("throttle retry policy test fixed retryAfter", async function() {
    // connectionPolicy.RetryOptions = new RetryOptions(5, 2000);
    // const client = new CosmosClient(endpoint, { masterKey }, connectionPolicy);
    // const { result: db } = await client.createDatabase({ id: "sample database" });
    // const { result: collection } = await client.createCollection(db._self, collectionDefinition);
    // const originalGetDatabaseAccount = client.getDatabaseAccount;
    // client.getDatabaseAccount = mockGetDatabaseAccount;
    // const originalCreateRequestObjectStub = request._createRequestObjectStub;
    // request._createRequestObjectStub = mockCreateRequestObjectStub;
    // try {
    //     await client.createDocument(collection._self, documentDefinition);
    //     assert.fail("Must throw");
    // } catch (err) {
    //     const responseHeaders = (err as request.ErrorResponse).headers;
    //     assert.equal(err.code, 429, "invalid error code");
    //     assert.equal(responseHeaders[Constants.ThrottleRetryCount],
    //         connectionPolicy.RetryOptions.MaxRetryAttemptCount, "Current retry attempts not maxed out");
    //     assert.ok(responseHeaders[Constants.ThrottleRetryWaitTimeInMs]
    //         >= connectionPolicy.RetryOptions.MaxRetryAttemptCount
    //         * connectionPolicy.RetryOptions.FixedRetryIntervalInMilliseconds);
    // }
    // request._createRequestObjectStub = originalCreateRequestObjectStub;
    // client.getDatabaseAccount = originalGetDatabaseAccount;
  });

  xit("throttle retry policy test max wait time", async function() {
    // connectionPolicy.RetryOptions = new RetryOptions(5, 2000, 3);
    // const client = new CosmosClient(endpoint, { masterKey }, connectionPolicy);
    // const { result: db } = await client.createDatabase({ id: "sample database" });
    // const { result: collection } = await client.createCollection(db._self, collectionDefinition);
    // const originalGetDatabaseAccount = client.getDatabaseAccount;
    // client.getDatabaseAccount = mockGetDatabaseAccount;
    // const originalCreateRequestObjectStub = request._createRequestObjectStub;
    // request._createRequestObjectStub = mockCreateRequestObjectStub;
    // try {
    //     await client.createDocument(collection._self, documentDefinition);
    // } catch (err) {
    //     const responseHeaders = (err as request.ErrorResponse).headers;
    //     assert.equal(err.code, 429, "invalid error code");
    //     assert.ok(responseHeaders[Constants.ThrottleRetryWaitTimeInMs]
    //         >= connectionPolicy.RetryOptions.MaxWaitTimeInSeconds * 1000);
    // }
    // request._createRequestObjectStub = originalCreateRequestObjectStub;
    // client.getDatabaseAccount = originalGetDatabaseAccount;
  });

  xit("default retry policy validate create failure", async function() {
    // const client = new CosmosClient(endpoint, { masterKey }, connectionPolicy);
    // const { result: db } = await client.createDatabase({ id: "sample database" });
    // const { result: collection } = await client.createCollection(db._self, collectionDefinition);
    // global.originalFunc = request._createRequestObjectStub;
    // global.counter = 0;
    // request._createRequestObjectStub = mockCreateRequestObjectForDefaultRetryStub;
    // try {
    //     await client.createDocument(collection._self, documentDefinition);
    // } catch (err) {
    //     assert.equal(err.code, "ECONNRESET", "invalid error code");
    //     // assert.equal(global.counter, 6, "invalid number of retries");
    // }
    // request._createRequestObjectStub = global.originalFunc;
  });

  xit("default retry policy validate read success", async function() {
    // const client = new CosmosClient(endpoint, { masterKey }, connectionPolicy);
    // const { result: db } = await client.createDatabase({ id: "sample database" });
    // const { result: collection } = await client.createCollection(db._self, collectionDefinition);
    // const { result: createdDocument } = await client.createDocument(collection._self, documentDefinition);
    // global.originalFunc = request._createRequestObjectStub;
    // global.counter = 0;
    // request._createRequestObjectStub = mockCreateRequestObjectForDefaultRetryStub;
    // const { result: readDocument } = await client.readDocument(createdDocument._self);
    // assert.equal(readDocument.id, documentDefinition.id, "invalid document id");
    // assert.equal(global.counter, 5, "invalid number of retries");
    // request._createRequestObjectStub = global.originalFunc;
  });
});
