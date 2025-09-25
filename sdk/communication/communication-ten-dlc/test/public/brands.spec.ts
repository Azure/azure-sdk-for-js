// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TenDlcClient } from "@azure-tools/communication-ten-dlc";
import { createRecordedClient } from "../utils/recordedClient.js";
import { CreateUUID } from "../utils/helpers.js";
import { type Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("TenDlcClient - Brands", function () {
  let recorder: Recorder;
  let client: TenDlcClient;
  let brandId: string;

  const DEFAULT_BRAND_ID = "a551dbcf-30a8-440c-9fb0-6baafbc411e8";

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
    if (isPlaybackMode()) {
      brandId = DEFAULT_BRAND_ID;
    } else {
      brandId = CreateUUID();
    }
  });

  afterEach(async () =>  {
    await recorder.stop();
  });

  it("successfully inserts brand", async () => {
    const brandDetails = {
      name: "newBrand",
      companyName: "Contoso",
    };

    const options = {
      brandDetails: brandDetails,
    };

    const brand = await client.upsertUSBrand(brandId, options);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "newBrand");
    assert.equal(brand.brandDetails?.companyName, "Contoso");

    await client.deleteUSBrand(brandId);
  });

  it("successfully updates brand", async () => {
    const brandDetails = {
      name: "newBrand",
      companyName: "Contoso",
    };

    const options = {
      brandDetails: brandDetails,
    };

    let brand = await client.upsertUSBrand(brandId, options);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "newBrand");
    assert.equal(brand.brandDetails?.companyName, "Contoso");

    const newBrandDetails = {
      name: "updatedName",
    };

    const newOptions = {
      brandDetails: newBrandDetails,
    };

    brand = await client.upsertUSBrand(brandId, newOptions);
    assert.equal(brand.id, brandId);
    assert.equal(brand.brandDetails?.name, "updatedName");
    assert.equal(brand.brandDetails?.companyName, "Contoso");

    await client.deleteUSBrand(brandId);
  });

  it("can list all us brands", async function () {
    const brandDetails = {
      name: "newBrand",
      companyName: "Contoso",
    };

    const options = {
      brandDetails: brandDetails,
    };

    client.upsertUSBrand(brandId, options);

    for await (const brand of client.listUSBrands()) {
      assert.isNotNull(brand);
    }

    await client.deleteUSBrand(brandId);
  });
});
