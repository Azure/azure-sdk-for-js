// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { TenDlcClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "../utils/recordedClient";
import { CreateUUID } from "../utils/helpers";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";

describe("TenDlcClient - Brands", function () {
  let recorder: Recorder;
  let client: TenDlcClient;
  let brandId: string; 

  const DEFAULT_BRAND_ID = "a551dbcf-30a8-440c-9fb0-6baafbc411e8";

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
    if(isPlaybackMode()){
      brandId = DEFAULT_BRAND_ID;
    }
    else{
      brandId = CreateUUID();
    }
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("successfully inserts brand", async function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };

    let brand = await client.upsertUSBrand(brandId, options);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "newBrand");
    assert.equal(brand.brandDetails?.companyName, "Contoso");

    await client.deleteUSBrand(brandId);
  }).timeout(30000);

  
  it("successfully updates brand", async function (this: Context) {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };

    let brand = await client.upsertUSBrand(brandId, options);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "newBrand");
    assert.equal(brand.brandDetails?.companyName, "Contoso");


    const newBrandDetails =  {
      name: "updatedName"
    };
    
    let newOptions = {
      brandDetails: newBrandDetails
    };

    brand = await client.upsertUSBrand(brandId, newOptions);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "updatedName");
    assert.equal(brand.brandDetails?.companyName, "Contoso");

    await client.deleteUSBrand(brandId);

  }).timeout(30000);

  it("can list all us brands", async function () {
    const brandDetails =  {
      name: "newBrand",
      companyName: "Contoso"
    };
    
    const options = {
      brandDetails: brandDetails
    };

    client.upsertUSBrand(brandId, options);
    
    for await (const brand of client.listUSBrands()) {
      assert.isNotNull(brand);
    }

    await client.deleteUSBrand(brandId);
  }).timeout(30000);
});
