/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import { BaseTest } from "../baseTest";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import * as chai from "chai";
import { ModelCreatePrebuiltEntityRoleResponse } from "../../src/models";

let entityId :string;
let roleId:  ModelCreatePrebuiltEntityRoleResponse;
describe("Prebuilt Entity Role Tests", () => {
    
    beforeEach("add prebuilt entitiy to test", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            entityId = (await client.model.addPrebuilt(BaseTest.GlobalAppId, "0.1", ["email"]))[0].id;
            roleId = await client.model.createPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, { name: "simple role" });
        
        });
    });

    afterEach("delete prebuilt entitiy", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", entityId);
        });
    });


    it("should add prebuilt entitiy role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
          chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
        });
    });

    it("should add prebuilt entitiy role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
          chai.expect(BaseTest.doesListContain(roles, "name", "simple role")).to.be.true;
        });
    });

    it("should get prebuilt entity role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            const role = await client.model.getPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
          chai.expect(role.name).to.eql("simple role");
        });
    });

    it("should update prebuilt entity role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          await client.model.updatePrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body, { name: "simple role 2" });
          const role = await client.model.getPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
          chai.expect(role.name).to.eql("simple role 2");
        });
    });

    it("should get prebuilt entity role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          const role = await client.model.getPrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
          chai.expect(role.name).to.eql("simple role");
        });
    });

    it("should delete prebuilt entity role", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          await client.model.deletePrebuiltEntityRole(BaseTest.GlobalAppId, "0.1", entityId, roleId.body);
          const roles = await client.model.listPrebuiltEntityRoles(BaseTest.GlobalAppId, "0.1", entityId);
          chai.expect(roles.length).to.eql(0);
        });
    });
});
