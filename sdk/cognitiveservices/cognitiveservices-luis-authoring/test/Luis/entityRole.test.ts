/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import * as chai from "chai";

let closedListSample = { name: "closed list model", subLists: [{ canonicalForm: "Test", list: [] }] };

describe("Entity Role Tests", () => {
  it("should add simple entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "simple entity" });
      await client.model.createEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should add prebuilt entitiy role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]))[0].id;
      await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
      const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should add closed list entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      await client.model.createClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listClosedListEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should add regex entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, "0.1", { name: "regex model", regexPattern: "a+" });
      await client.model.createRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listRegexEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });


  it("should add composite entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]);
      const entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, "0.1", { name: "composite model", children: ["datetimeV2"] });
      await client.model.createCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listCompositeEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      for (let added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", added.id);
      }
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should add patternAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listPatternAnyEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });


  // Fails: The model (Pattern.Any Model) cannot contain an entity role.
  it.skip("should add hierarchical entity role ", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", children: ["child1"] });
      await client.model.createHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listHierarchicalEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should add custom prebuilt domain entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addCustomPrebuiltEntity(BaseTest.GlobalAppId, "0.1", { modelName: "ContactName", domainName: "Communication" });
      await client.model.createCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listCustomPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body)
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
    });
  });

  it("should get simple entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "simple entity" });
      const roleId = await client.model.createEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });


  it("should get prebuilt entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]))[0].id;
      const roleId = await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
      const role = await client.model.getPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get closed list entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const roleId = await client.model.createClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get regex entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, "0.1", { name: "regex model", regexPattern: "a+" });
      const roleId = await client.model.createRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get composite entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]);
      const entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, "0.1", { name: "composite model", children: ["datetimeV2"] });
      const roleId = await client.model.createCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      for (let added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", added.id);
      }
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get patterAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      const roleId = await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  // Fails: The model (Pattern.Any Model) cannot contain an entity role.
  it.skip("should get hierarchical entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any Model", children: ["child1"] });
      const roleId = await client.model.createHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get custom prebuilt domain entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addCustomPrebuiltEntity(BaseTest.GlobalAppId, "0.1", { modelName: "ContactName", domainName: "Communication" });
      const roleId = await client.model.createCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getCustomEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role");
    });
  });

  it("should get simple entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "simple entity" });
      await client.model.createEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });


  it("should get prebuilt entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]))[0].id;
      await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
      const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);

      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should get closed list entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const roleId = await client.model.createClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listClosedListEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should get regex entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, "0.1", { name: "regex model", regexPattern: "a+" });

      const roleId = await client.model.createRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });

      const roles = await client.model.listRegexEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);

      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);

      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should get composite entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]);
      const entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, "0.1", { name: "composite model", children: ["datetimeV2"] });
      await client.model.createCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listCompositeEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      for (let added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", added.id);
      }
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should get patterAny entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });

      await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listPatternAnyEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  // Fails: The model (Pattern.Any Model) cannot contain an entity role.
  it.skip("should get hierarchical entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any Model", children: ["child1"] });
      await client.model.createHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listHierarchicalEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should get custom prebuilt domain entity roles", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addCustomPrebuiltEntity(BaseTest.GlobalAppId, "0.1", { modelName: "ContactName", domainName: "Communication" });
      await client.model.createCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listCustomPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body)
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(1);
      chai.expect(roles[0].name).to.eql("simple role");
    });
  });

  it("should update simple entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "simple entity" });
      const roleId = await client.model.createEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);

      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });

  it("should update prebuilt entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]))[0].id;
      const roleId = await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
      await client.model.updatePrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body, { name: "simple role 2" });
      const role = await client.model.getPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });


  it("should update closed list entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const roleId = await client.model.createClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });

  it("should update regex entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, "0.1", { name: "regex model", regexPattern: "a+" });
      const roleId = await client.model.createRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });

  it("should update composite entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]);
      const entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, "0.1", { name: "composite model", children: ["datetimeV2"] });
      const roleId = await client.model.createCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      for (let added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", added.id);
      }
      chai.expect(role.name).to.eql("simple role 2");
    });
  });


  it("should update patterAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      const roleId = await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updatePatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });


  // Fails: The model (Pattern.Any Model) cannot contain an entity role.
  it.skip("should update hierarchical entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any Model", children: ["child1"] });
      const roleId = await client.model.createHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });

  it("should update custom prebuilt domain entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addCustomPrebuiltEntity(BaseTest.GlobalAppId, "0.1", { modelName: "ContactName", domainName: "Communication" });
      const roleId = await client.model.createCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.updateCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body, { name: "simple role 2" });
      const role = await client.model.getCustomEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(role.name).to.eql("simple role 2");
    });
  });

  it("should delete simple entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addEntity(BaseTest.GlobalAppId, "0.1", { name: "simple entity" });
      const roleId = await client.model.createEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete prebuilt entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]))[0].id;
      const roleId = await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
      await client.model.deletePrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
      const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
      await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete closed list entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addClosedList(BaseTest.GlobalAppId, "0.1", closedListSample);
      const roleId = await client.model.createClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteClosedListEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);

      const roles = await client.model.listClosedListEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteClosedList(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete regex entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createRegexEntityModel(BaseTest.GlobalAppId, "0.1", { name: "regex model", regexPattern: "a+" });
      const roleId = await client.model.createRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteRegexEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listRegexEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteRegexEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete composite entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const prebuiltEntitiesAdded = await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["datetimeV2"]);
      const entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, "0.1", { name: "composite model", children: ["datetimeV2"] });
      const roleId = await client.model.createCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteCompositeEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listCompositeEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      for (let added of prebuiltEntitiesAdded) {
        await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", added.id);
      }
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete patterAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      const roleId = await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deletePatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listPatternAnyEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });


  // Fails: The model (Pattern.Any Model) cannot contain an entity role.
  it.skip("should delete hierarchical entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any Model", children: ["child1"] });
      const roleId = await client.model.createHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteHierarchicalEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listHierarchicalEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });

  it("should delete custom prebuilt domain entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.addCustomPrebuiltEntity(BaseTest.GlobalAppId, "0.1", { modelName: "ContactName", domainName: "Communication" });
      const roleId = await client.model.createCustomPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      await client.model.deleteCustomEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      const roles = await client.model.listCustomPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body)
      await client.model.deleteEntity(BaseTest.GlobalAppId, "0.1", entityId.body);
      chai.expect(roles.length).to.eql(0);
    });
  });
});
