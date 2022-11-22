// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Get POI Category Tree**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

POI Category API provides a full list of supported Points of Interest (POI) categories and subcategories together with their translations and synonyms. The returned content can be used to provide more meaningful results through other Search Service APIs, like [Get Search POI](https://docs.microsoft.com/rest/api/maps/search/getsearchpoi).
 *
 * @summary **Get POI Category Tree**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

POI Category API provides a full list of supported Points of Interest (POI) categories and subcategories together with their translations and synonyms. The returned content can be used to provide more meaningful results through other Search Service APIs, like [Get Search POI](https://docs.microsoft.com/rest/api/maps/search/getsearchpoi).
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchPOICategoryTree.json
 */
async function getThePoiCategoryTreeOnlyPartialResponseShownBelow() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const result = await client
    .path("/search/poi/category/tree/{format}", format)
    .get();
  console.log(result);
}

getThePoiCategoryTreeOnlyPartialResponseShownBelow().catch(console.error);
