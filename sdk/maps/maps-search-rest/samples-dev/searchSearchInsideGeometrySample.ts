// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchSearchInsideGeometryParameters,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 *
 * @summary **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/PostSearchInsideGeometryCollection.json
 */
async function searchForBurgerJointsInsideAGeometryRepresentedAsAGeoJsonGeometryCollectionType() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchInsideGeometryParameters = {
    queryParameters: { query: "pizza", limit: 2 },
  };
  const result = await client.path("/search/geometry/{format}", format).post(options);
  console.log(result);
}

searchForBurgerJointsInsideAGeometryRepresentedAsAGeoJsonGeometryCollectionType().catch(
  console.error
);
/**
 * This sample demonstrates how to **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 *
 * @summary **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/PostSearchInsideFeatureCollection.json
 */
async function searchForPizzaPlacesInsideAGeometryRepresentedAsAGeoJsonFeatureCollectionType() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchInsideGeometryParameters = {
    queryParameters: { query: "pizza", limit: 2 },
  };
  const result = await client.path("/search/geometry/{format}", format).post(options);
  console.log(result);
}

searchForPizzaPlacesInsideAGeometryRepresentedAsAGeoJsonFeatureCollectionType().catch(
  console.error
);
/**
 * This sample demonstrates how to **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 *
 * @summary **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/PostSearchInsideGeometry.json
 */
async function searchForSubsJointsInsideAGeometryRepresentedAsAGeoJsonPolygonType() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchInsideGeometryParameters = {
    queryParameters: { query: "burger", limit: 2 },
  };
  const result = await client.path("/search/geometry/{format}", format).post(options);
  console.log(result);
}

searchForSubsJointsInsideAGeometryRepresentedAsAGeoJsonPolygonType().catch(console.error);
