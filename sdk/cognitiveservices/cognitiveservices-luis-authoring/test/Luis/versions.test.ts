/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";



describe("Versions Module Functionality Tests", () => {

  it('should list all versions', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let results = await client.versions.list(BaseTest.GlobalAppId);
      chai.expect(results.length > 0).to.be.true;
      for (let version of results) {
        chai.expect(version.version).not.to.be.null;
      }
    });
  });

  it('should get version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      for (let version of versions) {
        let result = await client.versions.get(BaseTest.GlobalAppId, version.version);
        chai.expect(version.version).to.eql(result.version);
      }
    });
  });

  it('should update version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      await client.versions.update(BaseTest.GlobalAppId, first.version, { version: "test" });
      let versionsWithUpdate = await client.versions.list(BaseTest.GlobalAppId);
      chai.expect(BaseTest.doesListContain(versionsWithUpdate, "version", "test")).to.be.true;
      chai.expect(BaseTest.doesListContain(versionsWithUpdate, "version", first.version)).to.be.false;
      await client.versions.update(BaseTest.GlobalAppId, "test", { version: first.version });
    });
  });

  it('should delete version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      let newVersion = await client.versions.clone(BaseTest.GlobalAppId, first.version, { version: "test" });
      let versionsWithTest = await client.versions.list(BaseTest.GlobalAppId);
      chai.expect(BaseTest.doesListContain(versionsWithTest, "version", newVersion.body)).to.be.true;
      await client.versions.deleteMethod(BaseTest.GlobalAppId, newVersion.body);
      let versionsWithoutTest = await client.versions.list(BaseTest.GlobalAppId);
      chai.expect(BaseTest.doesListContain(versionsWithoutTest, "version", newVersion.body)).to.be.false;
    });
  });

  it('should clone version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      let testVersion = { version: "test" };
      chai.expect(BaseTest.doesListContain(versions, "version", testVersion.version)).to.be.false;
      let newVersion = await client.versions.clone(BaseTest.GlobalAppId, first.version, testVersion);
      let versionsWithTest = await client.versions.list(BaseTest.GlobalAppId);
      chai.expect(BaseTest.doesListContain(versionsWithTest, "version", newVersion.body)).to.be.true;
      await client.versions.deleteMethod(BaseTest.GlobalAppId, newVersion.body);
    });
  });


  it('should list versions with error subsription key', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "401";
      await client.versions.list(BaseTest.GlobalAppId, {
        customHeaders: {
          "Ocp-Apim-Subscription-Key": "3eff76bb229942899255402725b72933"
        }
      }).catch(err => {
        let error = err.body.error;
        console.log(error);
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });

  it('should list versions with error app id', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "BadArgument";
      client.versions.list(BaseTest.GlobalAppIdError).catch(err => {
        let error = err.body.error;
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });

  it('should get version with error version', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "BadArgument";
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let errorVersion = versions[0].version + "_";
      client.versions.get(BaseTest.GlobalAppId, errorVersion).catch(err => {
        let error = err.body.error;
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });

  it('should update version with error model', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "BadArgument";
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      let versionToUpdate = { version: "" };

      client.versions.update(BaseTest.GlobalAppId, first.version, versionToUpdate).catch(err => {
        let error = err.body.error;
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });

  it('should delete version with error model', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "BadArgument";
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      client.versions.deleteMethod(BaseTest.GlobalAppId, first.version + "0").catch(err => {
        let error = err.body.error;
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });

  it('should clone version with error model', async () => {
    await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
      let errorCode = "BadArgument";
      let versions = await client.versions.list(BaseTest.GlobalAppId);
      let first = versions[0];
      let testVersion = { version: "" };
      chai.expect(BaseTest.doesListContain(versions, "version", testVersion.version));
      client.versions.clone(BaseTest.GlobalAppId, first.version, testVersion).catch(err => {
        let error = err.body.error;
        chai.expect(error).to.exist;
        chai.expect(errorCode).to.eql(error.code);
      });
    });
  });
});
