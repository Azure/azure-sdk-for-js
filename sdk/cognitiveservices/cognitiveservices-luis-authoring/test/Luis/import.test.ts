/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as fs from "fs";
import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";
import { delay } from "@azure/ms-rest-js";

let appIds: Array<string> = [];

describe("Import Tests", () => {
  it("should import application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportApp.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }
        let app = JSON.parse(data);
        let importApplication = await client.apps.importMethod(app, { appName: "Test Import LUIS App" });
        var testApp = await client.apps.get(importApplication.body);
  
        chai.expect(testApp).to.exist;
        
        await delay(1000);
        var deleteRespose = await client.apps.deleteMethod(importApplication.body);
        chai.expect(deleteRespose.code, "Success");    
        await delay(1000);    
      });
    });
  });

  it("should import application in Lu format", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportLuApp.json", "utf-8", async (err, app) => {
        if (err) {
          throw err;
        }     
        let importLuApplication = await client.apps.importLuFormat(app);
        var testApp = await client.apps.get(importLuApplication.body);     
        
        chai.expect(testApp).to.exist;

        await delay(1000);
        var deleteRespose = await client.apps.deleteMethod(importLuApplication.body);
        chai.expect(deleteRespose.code, "Success");  
        await delay(1000);
      });
    });
  });
   
  it("should import v2 application", async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      fs.readFile("test/SessionRecords/ImportV2App.json", "utf-8", async (err, data) => {
        if (err) {
          throw err;
        }     
        let app = JSON.parse(data);
        let importV2Application = await client.apps.importV2App(app, { appName: "Test Import V2 LUIS App" });
        var testApp = await client.apps.get(importV2Application.body);

        chai.expect(testApp).to.exist;

        await delay(1000);
        
        var deleteRespose = await client.apps.deleteMethod(importV2Application.body);
        chai.expect(deleteRespose.code, "Success");  
        await delay(1000);
      });
    });
  });
});
