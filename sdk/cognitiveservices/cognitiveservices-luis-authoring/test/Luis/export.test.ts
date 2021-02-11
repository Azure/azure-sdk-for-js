/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";

let appId : any;
const appName = "LUIS App Version Export";
const newVersionID = "0.2";
const defaultVersionID = "0.1";

describe("Export Tests", () => {

    before("add app for app version testing", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          appId = await client.apps.add({
            name: appName,
            description: "New LUIS App",
            culture: "en-us",
            domain: "Comics",
            usageScenario: "IoT"
          });
        });
      });
    
      after("delete app added for app version testing", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
          await client.apps.deleteMethod(appId.body);
        });
      });
    
      it("should export version", async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
         
          const luisApp = await client.versions.exportMethod(appId.body, defaultVersionID);
        
          chai.expect(luisApp).to.exist;
          chai.expect(luisApp.name).to.eql(appName);
        });
      });
    
      it("should export version Lu format", async () => {
          await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            
            const luisApp = await client.versions.exportLuFormat(appId.body, defaultVersionID);
    
            chai.expect(luisApp).to.exist;
          });
      });
});
