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


  it("should add patternAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const roles = await client.model.listPatternAnyEntityRoles(BaseTest.GlobalAppId, "0.1", entityId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
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

  it("should get patterAny entity role", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      const entityId = await client.model.createPatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", { name: "Pattern.Any model", explicitList: [] });
      const roleId = await client.model.createPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, { name: "simple role" });
      const role = await client.model.getPatternAnyEntityRole(BaseTest.GlobalAppId, "0.1", entityId.body, roleId.body);
      await client.model.deletePatternAnyEntityModel(BaseTest.GlobalAppId, "0.1", entityId.body);
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
