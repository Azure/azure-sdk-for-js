/** Defines a target data type of an index path specification in the Azure Cosmos DB service. */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export enum DataType {
  /** Represents a numeric data type. */
  Number = "Number",
  /** Represents a string data type. */
  String = "String",
  /** Represents a point data type. */
  Point = "Point",
  /** Represents a line string data type. */
  LineString = "LineString",
  /** Represents a polygon data type. */
  Polygon = "Polygon",
  /** Represents a multi-polygon data type. */
  MultiPolygon = "MultiPolygon"
}
