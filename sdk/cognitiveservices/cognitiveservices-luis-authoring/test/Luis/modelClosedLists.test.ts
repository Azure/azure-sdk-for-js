/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";

var closedListSample = {
  name: "States",
  subLists: [
    {
      canonicalForm: "New York",
      list: ["NY", "New York"]
    },
    {
      canonicalForm: "Washington",
      list: ["WA", "Washington"]
    },
    {
      canonicalForm: "California",
      list: ["CA", "California", "Calif.", "Cal."]
    }
  ]
};


describe("Model Closed Lists Tests", function () {
  it("should list closed lists", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const result = await client.model.listClosedLists(BaseTest.GlobalAppId, "0.1");
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(result).to.have.length.above(0);
    });
  });

  it("should add closed list", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {

      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(listId).not.to.eql(BaseTest.EmptyId);
    });
  });
  it("should get closed list", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const result = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(result.name).to.eql("States");
      chai.expect(result.subLists.length).to.eql(3);
    });
  });

  it("should update closed list", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.updateClosedList(BaseTest.GlobalAppId, "0.1", listId.body, {
        name: "New States", subLists: [{
          canonicalForm: "Texas",
          list: ["tx", "texas"]
        }]
      });
      const updated = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(updated.name).to.eql("New States");
      chai.expect(updated.subLists.length).to.eql(1);
      chai.expect(updated.subLists[0].canonicalForm).to.eql("Texas");
    });
  });

  it("should delete closed list", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      const lists = await client.model.listClosedLists(BaseTest.GlobalAppId, "0.1");
      chai.expect(BaseTest.doesListContain(lists, "id", listId)).to.be.false;
    });
  });

  it("should patch closed list", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.patchClosedList(BaseTest.GlobalAppId, "0.1", listId.body, {
        subLists: [{
          canonicalForm: "Texas",
          list: ["tx", "texas"]
        }, {
          canonicalForm: "Florida",
          list: ["fl", "florida"]
        }]
      });
      const list = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(list.subLists.length).to.eql(5);
      chai.expect(BaseTest.doesListContain(list.subLists, "canonicalForm", "Texas")).to.be.true;
      chai.expect(BaseTest.doesListContain(list.subLists, "canonicalForm", "Florida")).to.be.true;
    });
  });



  it("should add sublist", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.addSubList(BaseTest.GlobalAppId, "0.1", listId.body, { canonicalForm: "Texas", list: ["tx", "texas"] });
      const list = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(list.subLists.length).to.eql(4);
      chai.expect(BaseTest.doesListContain(list.subLists, "canonicalForm", "Texas")).to.be.true;
    });
  });

  it("should delete sublist", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      let list = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      let sublistId = null;
      for (var sublist of list.subLists) {
        if (sublist.canonicalForm == "New York") {
          sublistId = sublist.id;
        }
      }
      await client.model.deleteSubList(BaseTest.GlobalAppId, "0.1", listId.body, sublistId);
      list = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(list.subLists.length).to.eql(2);
      chai.expect(BaseTest.doesListContain(list.subLists, "canonicalForm", "New York")).to.be.false;
    });
  });

  it("should update sublist", async function () {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const listId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const list = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      let sublistId = null;
      for (var sublist of list.subLists) {
        if (sublist.canonicalForm == "New York") {
          sublistId = sublist.id;
        }
      }
      await client.model.updateSubList(BaseTest.GlobalAppId, "0.1", listId.body, sublistId, {
        canonicalForm: "New Yorkers",
        list: ["NYC", "NY", "New York"],
      });
      const newlist = await client.model.getClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", listId.body);
      chai.expect(newlist.subLists.length).to.eql(3);
      chai.expect(BaseTest.doesListContain(newlist.subLists, "canonicalForm", "New York")).to.be.false;
      chai.expect(BaseTest.doesListContain(newlist.subLists, "canonicalForm", "New Yorkers")).to.be.true;
    });
  });
});
