import * as assert from "assert";
import { ResourceId } from "../../common";

describe("ResourceId", function() {
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
});
