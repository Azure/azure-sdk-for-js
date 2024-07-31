// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import { Recorder } from "@azure-tools/test-recorder";

describe("TenDlcClient - Brands", function () {
  let recorder: Recorder;
  let client: TenDlcClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully inserts brand", function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };
    var brand = client.upsertUSBrand("brandId", options);
    brand.then((value) => {
      assert.equal(value.id, "brandId");
      assert.equal(value.brandDetails?.name, "newBrand");
      assert.equal(value.brandDetails?.companyName, "Contoso");
    });
  }).timeout(30000);

  it("successfully updates brand", function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };
    var brand = client.upsertUSBrand("brandId", options);
    brand.then((value) => {
      assert.equal(value.id, "brandId");
      assert.equal(value.brandDetails?.name, "newBrand");
      assert.equal(value.brandDetails?.companyName, "Contoso");
    });

    const newBrandDetails =  {
      name: "updatedName"
    };
    
    var newOptions = {
      brandDetails: newBrandDetails
    };

    brand = client.upsertUSBrand("brandId", newOptions);
    brand.then((value) => {
      assert.equal(value.id, "brandId");
      assert.equal(value.brandDetails?.name, "updatedName");
      assert.equal(value.brandDetails?.companyName, "Contoso");
    });
  }).timeout(30000);

  it("successfully deletes brand", function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };
    client.upsertUSBrand("brandId", options);
    var brand = client.getUSBrand("brandId");
    brand.then((value) => {
      assert.equal(value.id, "brandId");
      assert.equal(value.brandDetails?.name, "newBrand");
      assert.equal(value.brandDetails?.companyName, "Contoso");
    });

    client.deleteUSBrand("brandId");
    var brand = client.getUSBrand("brandId");
    brand.then((value) => {
      assert.equal(value, undefined);
    });
  }).timeout(30000);

  it("can list all us brands", async function () {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };
    client.upsertUSBrand("brandId", options);
    let count = 0;
    for await (const brand of client.listUSBrands()) {
      count++;
      assert.isNotNull(brand);
    }
  }).timeout(30000);

  it("successfully cancels brand", function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };
    client.upsertUSBrand("brandId", options);
    var brand = client.getUSBrand("brandId");
    brand.then((value) => {
      assert.equal(value.id, "brandId");
      assert.equal(value.brandDetails?.name, "newBrand");
      assert.equal(value.brandDetails?.companyName, "Contoso");
    });

    var brand = client.cancelUSBrand("brandId");
    brand.then((value) => {
      assert.equal(value.status?.toString(), "Cancelled");
    });
  }).timeout(30000);
});
