/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";


describe("Permissions Module Functionality Tests", () => {

  it('should list permissions', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      await client.permissions.update(BaseTest.GlobalAppId, { emails: ["guest@outlook.com", "invited.user@live.com"] });
      let result = await client.permissions.list(BaseTest.GlobalAppId);
      await client.permissions.deleteMethod(BaseTest.GlobalAppId, { email: "guest@outlook.com" });
      await client.permissions.deleteMethod(BaseTest.GlobalAppId, { email: "invited.user@live.com" });
      chai.expect(result.owner).to.eql(BaseTest.OwnerEmail);
      chai.expect(result.emails).to.eql(["guest@outlook.com", "invited.user@live.com"])
    });
  });

  it('should add permissions', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      await client.permissions.add(BaseTest.GlobalAppId, { email: "guest@outlook.com" });
      let result = await client.permissions.list(BaseTest.GlobalAppId);
      await client.permissions.deleteMethod(BaseTest.GlobalAppId, { email: "guest@outlook.com" });
      let found: boolean = false;
      for (let e of result.emails) {
        if (e == "guest@outlook.com") {
          found = true;
        }
      }
      chai.expect(found).to.be.true;
    });
  });

  it('should delete permissions', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      await client.permissions.add(BaseTest.GlobalAppId, { email: "guest@outlook.com" });
      await client.permissions.deleteMethod(BaseTest.GlobalAppId, { email: "guest@outlook.com" });
      let result = await client.permissions.list(BaseTest.GlobalAppId);

      let found: boolean = false;
      for (let e of result.emails) {
        if (e == "guest@outlook.com") {
          found = true;
        }
      }
      chai.expect(found).to.be.false;


    });
  });

  it('should update permission', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let collaborators = { emails: ["guest@outlook.com", "invited.user@live.com"] };
      await client.permissions.update(BaseTest.GlobalAppId, collaborators);
      let result = await client.permissions.list(BaseTest.GlobalAppId);
      await client.permissions.update(BaseTest.GlobalAppId, { emails: ["guest@outlook.com"] });
      chai.expect(result.emails).to.eql(collaborators.emails);
    });
  });
});
