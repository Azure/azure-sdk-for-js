import assert from "assert";
import { DocumentBase } from "../..";
import { Container, TriggerDefinition } from "../../client";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

const notFoundErrorCode = 404;

// Mock for trigger function bodies
declare var getContext: any;

describe("NodeJS CRUD Tests", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  let container: Container;

  beforeEach(async function() {
    await removeAllDatabases();
    container = await getTestContainer("trigger container");
  });

  describe("Validate Trigger CRUD", function() {
    it("nativeApi Should do trigger CRUD operations successfully name based", async function() {
      // read triggers
      const { result: triggers } = await container.triggers.readAll().toArray();
      assert.equal(Array.isArray(triggers), true);

      // create a trigger
      const beforeCreateTriggersCount = triggers.length;
      // tslint:disable:no-var-keyword
      // tslint:disable:prefer-const
      const triggerDefinition: TriggerDefinition = {
        id: "sample trigger",
        body: "serverScript() { var x = 10; }",
        triggerType: DocumentBase.TriggerType.Pre,
        triggerOperation: DocumentBase.TriggerOperation.All
      };
      // tslint:enable:no-var-keyword
      // tslint:enable:prefer-const

      const { body: trigger } = await container.triggers.create(triggerDefinition);

      assert.equal(trigger.id, triggerDefinition.id);
      assert.equal(trigger.body, "serverScript() { var x = 10; }");

      // read triggers after creation
      const { result: triggersAfterCreation } = await container.triggers.readAll().toArray();
      assert.equal(
        triggersAfterCreation.length,
        beforeCreateTriggersCount + 1,
        "create should increase the number of triggers"
      );

      // query triggers
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: triggerDefinition.id
          }
        ]
      };
      const { result: results } = await container.triggers.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace trigger
      // prettier-ignore
      trigger.body = function() { const x = 20; };
      const { body: replacedTrigger } = await container.trigger(trigger.id).replace(trigger);

      assert.equal(replacedTrigger.id, trigger.id);
      assert.equal(replacedTrigger.body, "function () { const x = 20; }");

      // read trigger
      const { body: triggerAfterReplace } = await container.trigger(replacedTrigger.id).read();
      assert.equal(replacedTrigger.id, triggerAfterReplace.id);

      // delete trigger
      await await container.trigger(replacedTrigger.id).delete();

      // read triggers after deletion
      try {
        await container.trigger(replacedTrigger.id).read();
        assert.fail("Must fail to read after deletion");
      } catch (err) {
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });

    it("nativeApi Should do trigger CRUD operations successfully name based with upsert", async function() {
      // read triggers
      const { result: triggers } = await container.triggers.readAll().toArray();
      assert.equal(Array.isArray(triggers), true);

      // create a trigger
      const beforeCreateTriggersCount = triggers.length;
      // tslint:disable:no-var-keyword
      // tslint:disable:prefer-const
      const triggerDefinition: TriggerDefinition = {
        id: "sample trigger",
        body: "serverScript() { var x = 10; }",
        triggerType: DocumentBase.TriggerType.Pre,
        triggerOperation: DocumentBase.TriggerOperation.All
      };
      // tslint:enable:no-var-keyword
      // tslint:enable:prefer-const

      const { body: trigger } = await container.triggers.upsert(triggerDefinition);

      assert.equal(trigger.id, triggerDefinition.id);
      assert.equal(trigger.body, "serverScript() { var x = 10; }");

      // read triggers after creation
      const { result: triggersAfterCreation } = await container.triggers.readAll().toArray();
      assert.equal(
        triggersAfterCreation.length,
        beforeCreateTriggersCount + 1,
        "create should increase the number of triggers"
      );

      // query triggers
      const querySpec = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: triggerDefinition.id
          }
        ]
      };
      const { result: results } = await container.triggers.query(querySpec).toArray();
      assert(results.length > 0, "number of results for the query should be > 0");

      // replace trigger
      // prettier-ignore
      trigger.body = function() { const x = 20; };
      const { body: replacedTrigger } = await container.triggers.upsert(trigger);

      assert.equal(replacedTrigger.id, trigger.id);
      assert.equal(replacedTrigger.body, "function () { const x = 20; }");

      // read trigger
      const { body: triggerAfterReplace } = await container.trigger(replacedTrigger.id).read();
      assert.equal(replacedTrigger.id, triggerAfterReplace.id);

      // delete trigger
      await await container.trigger(replacedTrigger.id).delete();

      // read triggers after deletion
      try {
        await container.trigger(replacedTrigger.id).read();
        assert.fail("Must fail to read after deletion");
      } catch (err) {
        assert.equal(err.code, notFoundErrorCode, "response should return error code 404");
      }
    });
  });

  describe("validate trigger functionality", function() {
    const triggers: TriggerDefinition[] = [
      {
        id: "t1",
        // tslint:disable:no-var-keyword
        // tslint:disable:prefer-const
        // tslint:disable:curly
        // tslint:disable:no-string-throw
        // tslint:disable:object-literal-shorthand
        body: function() {
          var item = getContext()
            .getRequest()
            .getBody();
          item.id = item.id.toUpperCase() + "t1";
          getContext()
            .getRequest()
            .setBody(item);
        },
        triggerType: DocumentBase.TriggerType.Pre,
        triggerOperation: DocumentBase.TriggerOperation.All
      },
      {
        id: "t2",
        body: "function() { }", // trigger already stringified
        triggerType: DocumentBase.TriggerType.Pre,
        triggerOperation: DocumentBase.TriggerOperation.All
      },
      {
        id: "t3",
        body: function() {
          const item = getContext()
            .getRequest()
            .getBody();
          item.id = item.id.toLowerCase() + "t3";
          getContext()
            .getRequest()
            .setBody(item);
        },
        triggerType: DocumentBase.TriggerType.Pre,
        triggerOperation: DocumentBase.TriggerOperation.All
      },
      {
        id: "response1",
        body: function() {
          const prebody = getContext()
            .getRequest()
            .getBody();
          if (prebody.id !== "TESTING POST TRIGGERt1") throw "name mismatch";
          const postbody = getContext()
            .getResponse()
            .getBody();
          if (postbody.id !== "TESTING POST TRIGGERt1") throw "name mismatch";
        },
        triggerType: DocumentBase.TriggerType.Post,
        triggerOperation: DocumentBase.TriggerOperation.All
      },
      {
        id: "triggerOpType",
        body: "function() { }",
        triggerType: DocumentBase.TriggerType.Post,
        triggerOperation: DocumentBase.TriggerOperation.Delete
      }
    ];
    // tslint:enable:no-var-keyword
    // tslint:enable:prefer-const
    // tslint:enable:curly
    // tslint:enable:no-string-throw
    // tslint:enable:object-literal-shorthand

    it("should do trigger operations successfully with create", async function() {
      for (const trigger of triggers) {
        await container.triggers.create(trigger);
      }
      // create document
      const { body: document } = await container.items.create(
        { id: "doc1", key: "value" },
        { preTriggerInclude: "t1" }
      );
      assert.equal(document.id, "DOC1t1", "name should be capitalized");
      const { body: document2 } = await container.items.create(
        { id: "doc2", key2: "value2" },
        { preTriggerInclude: "t2" }
      );
      assert.equal(document2.id, "doc2", "name shouldn't change");
      const { body: document3 } = await container.items.create(
        { id: "Doc3", prop: "empty" },
        { preTriggerInclude: "t3" }
      );
      assert.equal(document3.id, "doc3t3");
      const { body: document4 } = await container.items.create(
        { id: "testing post trigger" },
        { postTriggerInclude: "response1", preTriggerInclude: "t1" }
      );
      assert.equal(document4.id, "TESTING POST TRIGGERt1");
      const { body: document5, headers } = await container.items.create(
        { id: "responseheaders" },
        { preTriggerInclude: "t1" }
      );
      assert.equal(document5.id, "RESPONSEHEADERSt1");
      try {
        await container.items.create({ id: "Docoptype" }, { postTriggerInclude: "triggerOpType" });
        assert.fail("Must fail");
      } catch (err) {
        assert.equal(err.code, 400, "Must throw when using a DELETE trigger on a CREATE operation");
      }
    });

    it("should do trigger operations successfully with upsert", async function() {
      for (const trigger of triggers) {
        await container.triggers.upsert(trigger);
      }
      // create document
      const { body: document } = await container.items.upsert(
        { id: "doc1", key: "value" },
        { preTriggerInclude: "t1" }
      );
      assert.equal(document.id, "DOC1t1", "name should be capitalized");
      const { body: document2 } = await container.items.upsert(
        { id: "doc2", key2: "value2" },
        { preTriggerInclude: "t2" }
      );
      assert.equal(document2.id, "doc2", "name shouldn't change");
      const { body: document3 } = await container.items.upsert(
        { id: "Doc3", prop: "empty" },
        { preTriggerInclude: "t3" }
      );
      assert.equal(document3.id, "doc3t3");
      const { body: document4 } = await container.items.upsert(
        { id: "testing post trigger" },
        { postTriggerInclude: "response1", preTriggerInclude: "t1" }
      );
      assert.equal(document4.id, "TESTING POST TRIGGERt1");
      const { body: document5, headers } = await container.items.upsert(
        { id: "responseheaders" },
        { preTriggerInclude: "t1" }
      );
      assert.equal(document5.id, "RESPONSEHEADERSt1");
      try {
        await container.items.upsert({ id: "Docoptype" }, { postTriggerInclude: "triggerOpType" });
        assert.fail("Must fail");
      } catch (err) {
        assert.equal(err.code, 400, "Must throw when using a DELETE trigger on a CREATE operation");
      }
    });
  });
});
