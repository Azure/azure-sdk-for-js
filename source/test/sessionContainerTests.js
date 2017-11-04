"use strict";

var lib = require("../lib/"),
    sinon = require("sinon"),
    Base = require("../lib/base"),
    assert = require("assert"),
    testConfig = require("./_testConfig"),
    ResourceId = require("../lib/resourceId"),
    SessionContainer = require("../lib/sessionContainer");

var host = testConfig.host;
var masterKey = testConfig.masterKey;

describe("Session Container unit tests", function () {

    var collectionLink = 'dbs/testDatabase/colls/testCollection';
    var collectionId = 'oWxIAN48yN0=';

    var verify = function (resource, resourceType) {
        if (resourceType == 'offer' && resource.offer != 0)
            return true;
        else if (resourceType == 'db' && resource.database != 0)
            return true;
        else if (resourceType == 'coll' && resource.database != 0 && resource.collection != 0)
            return true;
        else if (resourceType == 'document' && resource.database != 0 && resource.documentCollection != 0 && resource.document != 0)
            return true;
        else if (resourceType == 'attachment' && resource.database != 0 && resource.documentCollection != 0 && resource.document != 0 && resource.attachment != 0)
            return true;
        else if (resourceType == 'sproc' && resource.database != 0 && resource.documentCollection != 0 && resource.storedProcedure != 0)
            return true;
        else if (resourceType == 'trigger' && resource.database != 0 && resource.documentCollection != 0 && resource.trigger != 0)
            return true;
        else if (resourceType == 'udf' && resource.database != 0 && resource.documentCollection != 0 && resource.userDefinedFunction != 0)
            return true;
        else if (resourceType == 'pkr' && resource.database != 0 && resource.documentCollection != 0 && resource.partitionKeyRange != 0)
            return true;
        else if (resourceType == 'user' && resource.database != 0 && resource.user != 0)
            return true;
        else if (resourceType == 'permission' && resource.database != 0 && resource.user != 0 && resource.permission != 0)
            return true;
        else
            return false;
    };

    it("validate ResourceId's parse and toString functions", function (done) {
        var rid = new ResourceId();
        var offerId = "HW1D"
        var databaseId = "5bdcAA==";
        var collectionId = "5bdcAKxMGks=";
        var docId = "n7JnAIx+kn8CAAAAAAAACA==";
        var attachmentId = "n7JnAIx+kn8BAAAAAAAACFZwB8E=";
        var sprocId = "n7JnAIx+kn8BAAAAAAAAgA==";
        var triggerId = "n7JnAIx+kn8BAAAAAAAAcA==";
        var udfId = "n7JnAIx+kn8BAAAAAAAAYA==";
        var pkrId = "oqoqAItdJQ0CAAAAAAAAUA==";
        var userId = "n7JnADdIXgA=";
        var permissionId = "n7JnADdIXgDnT1HTUDIbAA==";

        var offer = rid.parse(offerId);
        assert.equal(verify(offer, 'offer'), true);
        assert.equal(offer.toString(), offerId);

        var database = rid.parse(databaseId);
        assert.equal(verify(database, 'db'), true);
        assert.equal(database.toString(), databaseId);

        var collection = rid.parse(collectionId);
        assert.equal(verify(collection, 'coll'), true);
        assert.equal(collection.toString(), collectionId);

        var document = rid.parse(docId);
        assert.equal(verify(document, 'document'), true);
        assert.equal(document.toString(), docId);

        var attachment = rid.parse(attachmentId);
        assert.equal(verify(attachment, 'attachment'), true);
        assert.equal(attachment.toString(), attachmentId);

        var sproc = rid.parse(sprocId);
        assert.equal(verify(sproc, 'sproc'), true);
        assert.equal(sproc.toString(), sprocId);

        var trigger = rid.parse(triggerId);
        assert.equal(verify(trigger, 'trigger'), true);
        assert.equal(trigger.toString(), triggerId);

        var udf = rid.parse(udfId);
        assert.equal(verify(udf, 'udf'), true);
        assert.equal(udf.toString(), udfId);

        var pkr = rid.parse(pkrId);
        assert.equal(verify(pkr, 'pkr'), true);
        assert.equal(pkr.toString(), pkrId);

        var user = rid.parse(userId);
        assert.equal(verify(user, 'user'), true);
        assert.equal(user.toString(), userId);

        var permission = rid.parse(permissionId);
        assert.equal(verify(permission, 'permission'), true);
        assert.equal(permission.toString(), permissionId);
        done();
    });

    it("validate internal functions of Session Container", function (done) {
        var sc = new SessionContainer();

        //test compareAndSetToken()
        var oldTokens = {}
        sc.compareAndSetToken('0:200', oldTokens);
        assert.deepEqual(oldTokens, { '0': '200' })
        sc.compareAndSetToken('0:201', oldTokens);
        assert.deepEqual(oldTokens, { '0': '201' })
        sc.compareAndSetToken('0:199', oldTokens);
        assert.deepEqual(oldTokens, { '0': '201' })

        //test getCombinedSessiontoken()
        assert.equal(sc.getCombinedSessionToken({ '0': '100', '1': '200' }), '0:100,1:200');

        var ridRequest = {
            isNameBased: false,
            resourceId: collectionId,
            resourceAddress: collectionId,
            resourceType: 'docs',
            operationType: 'create'
        };

        var resHeadersRid = {
            'x-ms-alt-content-path': collectionLink,
            'x-ms-session-token': '1:1290'
        };

        //test setSessionToken() for rid based request
        sc.setSessionToken(ridRequest, {}, resHeadersRid);
        assert.deepEqual(sc.collectionNameToCollectionResourceId, { 'dbs/testDatabase/colls/testCollection': '-566441763' });
        assert.deepEqual(sc.collectionResourceIdToSessionTokens, { '-566441763': { '1': '1290' } });

        //test getPartitionKeyRangeIdToMapPrivate() for rid based request
        assert.deepEqual(sc.getPartitionKeyRangeIdToTokenMapPrivate(true, null, '/' + collectionLink + '/'), { '1': '1290' });

        //test clearToken for rid based request
        sc.clearToken(ridRequest);
        assert.deepEqual(sc.collectionNameToCollectionResourceId, { 'dbs/testDatabase/colls/testCollection': '-566441763' });
        assert.deepEqual(sc.collectionResourceIdToSessionTokens, {});

        var nameBasedRequest = {
            isNameBased: true,
            resourceId: null,
            resourceAddress: '/' + collectionLink + '/',
            resourceType: 'docs',
            operationType: 'create'
        };
        var resHeadersNameBased = {
            'x-ms-alt-content-path': collectionLink,
            'x-ms-content-path': collectionId,
            'x-ms-session-token': '1:1126'
        };

        //test setSessionToken() for name based request
        sc.setSessionToken(nameBasedRequest, {}, resHeadersNameBased);
        assert.deepEqual(sc.collectionNameToCollectionResourceId, { 'dbs/testDatabase/colls/testCollection': '-566441763' });
        assert.deepEqual(sc.collectionResourceIdToSessionTokens, { '-566441763': { '1': '1126' } });

        //test getPartitionKeyRangeIdToMapPrivate() for name based request
        assert.deepEqual(sc.getPartitionKeyRangeIdToTokenMapPrivate(false, collectionId, collectionId), { '1': '1126' });

        //test clearToken for name based request
        sc.clearToken(nameBasedRequest);
        assert.deepEqual(sc.collectionNameToCollectionResourceId, {});
        assert.deepEqual(sc.collectionResourceIdToSessionTokens, {});

        done();
    });

});
