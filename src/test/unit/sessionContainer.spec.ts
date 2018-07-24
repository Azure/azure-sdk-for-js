import * as assert from "assert";
import { ResourceId } from "../../common";
import { SessionContainer } from "../../sessionContainer";

describe("Session Container unit tests", function() {
  const collectionLink = "dbs/testDatabase/colls/testCollection";
  const collectionId = "oWxIAN48yN0=";

  const verify = function(resource: any, resourceType: string) {
    if (resourceType === "offer" && resource.offer !== 0) {
      return true;
    } else if (resourceType === "db" && resource.database !== 0) {
      return true;
    } else if (resourceType === "coll" && resource.database !== 0 && resource.collection !== 0) {
      return true;
    } else if (
      resourceType === "document" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.document !== 0
    ) {
      return true;
    } else if (
      resourceType === "attachment" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.document !== 0 &&
      resource.attachment !== 0
    ) {
      return true;
    } else if (
      resourceType === "sproc" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.storedProcedure !== 0
    ) {
      return true;
    } else if (
      resourceType === "trigger" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.trigger !== 0
    ) {
      return true;
    } else if (
      resourceType === "udf" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.userDefinedFunction !== 0
    ) {
      return true;
    } else if (
      resourceType === "pkr" &&
      resource.database !== 0 &&
      resource.documentCollection !== 0 &&
      resource.partitionKeyRange !== 0
    ) {
      return true;
    } else if (resourceType === "user" && resource.database !== 0 && resource.user !== 0) {
      return true;
    } else if (
      resourceType === "permission" &&
      resource.database !== 0 &&
      resource.user !== 0 &&
      resource.permission !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  it("validate ResourceId's parse and toString functions", function() {
    const rid = new ResourceId();
    const offerId = "HW1D";
    const databaseId = "5bdcAA==";
    const collId = "5bdcAKxMGks=";
    const docId = "n7JnAIx+kn8CAAAAAAAACA==";
    const attachmentId = "n7JnAIx+kn8BAAAAAAAACFZwB8E=";
    const sprocId = "n7JnAIx+kn8BAAAAAAAAgA==";
    const triggerId = "n7JnAIx+kn8BAAAAAAAAcA==";
    const udfId = "n7JnAIx+kn8BAAAAAAAAYA==";
    const pkrId = "oqoqAItdJQ0CAAAAAAAAUA==";
    const userId = "n7JnADdIXgA=";
    const permissionId = "n7JnADdIXgDnT1HTUDIbAA==";

    const offer = rid.parse(offerId);
    assert.equal(verify(offer, "offer"), true);
    assert.equal(offer.toString(), offerId);

    const database = rid.parse(databaseId);
    assert.equal(verify(database, "db"), true);
    assert.equal(database.toString(), databaseId);

    const collection = rid.parse(collId);
    assert.equal(verify(collection, "coll"), true);
    assert.equal(collection.toString(), collId);

    const document = rid.parse(docId);
    assert.equal(verify(document, "document"), true);
    assert.equal(document.toString(), docId);

    const attachment = rid.parse(attachmentId);
    assert.equal(verify(attachment, "attachment"), true);
    assert.equal(attachment.toString(), attachmentId);

    const sproc = rid.parse(sprocId);
    assert.equal(verify(sproc, "sproc"), true);
    assert.equal(sproc.toString(), sprocId);

    const trigger = rid.parse(triggerId);
    assert.equal(verify(trigger, "trigger"), true);
    assert.equal(trigger.toString(), triggerId);

    const udf = rid.parse(udfId);
    assert.equal(verify(udf, "udf"), true);
    assert.equal(udf.toString(), udfId);

    const pkr = rid.parse(pkrId);
    assert.equal(verify(pkr, "pkr"), true);
    assert.equal(pkr.toString(), pkrId);

    const user = rid.parse(userId);
    assert.equal(verify(user, "user"), true);
    assert.equal(user.toString(), userId);

    const permission = rid.parse(permissionId);
    assert.equal(verify(permission, "permission"), true);
    assert.equal(permission.toString(), permissionId);
  });

  it("validate internal functions of Session Container", function() {
    const sc = new SessionContainer();

    // test compareAndSetToken()
    const oldTokens = {};
    sc.compareAndSetToken("0:200", oldTokens);
    assert.deepEqual(oldTokens, { 0: "200" });
    sc.compareAndSetToken("0:201", oldTokens);
    assert.deepEqual(oldTokens, { 0: "201" });
    sc.compareAndSetToken("0:199", oldTokens);
    assert.deepEqual(oldTokens, { 0: "201" });

    // test getCombinedSessiontoken()
    assert.equal(sc.getCombinedSessionToken({ 0: "100", 1: "200" }), "0:100,1:200");

    const ridRequest = {
      isNameBased: false,
      resourceId: collectionId,
      resourceAddress: collectionId,
      resourceType: "docs",
      operationType: "create"
    };

    const resHeadersRid = {
      "x-ms-alt-content-path": collectionLink,
      "x-ms-session-token": "1:1290"
    };

    // test setSessionToken() for rid based request
    sc.setSessionToken(ridRequest, resHeadersRid);
    assert.deepEqual(
      (sc as any).collectionNameToCollectionResourceId, // TODO: implementation details
      { "dbs/testDatabase/colls/testCollection": "-566441763" }
    );
    assert.deepEqual(sc.collectionResourceIdToSessionTokens, {
      "-566441763": { 1: "1290" }
    });

    // test getPartitionKeyRangeIdToMapPrivate() for rid based request
    assert.deepEqual(sc.getPartitionKeyRangeIdToTokenMapPrivate(true, null, "/" + collectionLink + "/"), { 1: "1290" });

    // test clearToken for rid based request
    sc.clearToken(ridRequest);
    assert.deepEqual((sc as any).collectionNameToCollectionResourceId, {
      "dbs/testDatabase/colls/testCollection": "-566441763"
    });
    assert.deepEqual(sc.collectionResourceIdToSessionTokens, {});

    const nameBasedRequest: any = {
      isNameBased: true,
      resourceId: null,
      resourceAddress: "/" + collectionLink + "/",
      resourceType: "docs",
      operationType: "create"
    };
    const resHeadersNameBased = {
      "x-ms-alt-content-path": collectionLink,
      "x-ms-content-path": collectionId,
      "x-ms-session-token": "1:1126"
    };

    // test setSessionToken() for name based request
    sc.setSessionToken(nameBasedRequest, resHeadersNameBased);
    assert.deepEqual((sc as any).collectionNameToCollectionResourceId, {
      "dbs/testDatabase/colls/testCollection": "-566441763"
    });
    assert.deepEqual(sc.collectionResourceIdToSessionTokens, {
      "-566441763": { 1: "1126" }
    });

    // test getPartitionKeyRangeIdToMapPrivate() for name based request
    assert.deepEqual(sc.getPartitionKeyRangeIdToTokenMapPrivate(false, collectionId, collectionId), { 1: "1126" });

    // test clearToken for name based request
    sc.clearToken(nameBasedRequest);
    assert.deepEqual((sc as any).collectionNameToCollectionResourceId, {});
    assert.deepEqual(sc.collectionResourceIdToSessionTokens, {});
  });
});
