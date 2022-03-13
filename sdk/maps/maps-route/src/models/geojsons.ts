// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Definitions based on [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946)

/** Geometry types */
export type GeometryType =
  | "Point"
  | "MultiPoint"
  | "LineString"
  | "MultiLineString"
  | "Polygon"
  | "MultiPolygon"
  | "GeometryCollection";

/** GeoJSON types */
export type GeoJsonType = GeometryType | "Feature" | "FeatureCollection";

/** 2D bounding box */
export type BBox2D = [number, number, number, number];
/** 3D bounding box */
export type BBox3D = [number, number, number, number, number, number];
/** Bounding box including information on the coordinate range for its geometries */
export type BBox = BBox2D | BBox3D;

/** A GeoJSON object */
export interface GeoJsonObject {
  type: GeoJsonType;
  bbox?: BBox;
}
/** 2D position */
export type Position2D = [number, number];
/** 3D position */
export type Position3D = [number, number, number];
/** An array of number representing a point */
export type Position = Position2D | Position3D;

/** GeoJSON Point */
export interface GeoJsonPoint extends GeoJsonObject {
  type: "Point";
  coordinates: Position;
}

/** GeoJSON MultiPoint */
export interface GeoJsonMultiPoint extends GeoJsonObject {
  type: "MultiPoint";
  coordinates: Position[];
}

/** GeoJSON LineString */
export interface GeoJsonLineString extends GeoJsonObject {
  type: "LineString";
  coordinates: Position[];
}

/** GeoJSON MultiLineString */
export interface GeoJsonMultiLineString extends GeoJsonObject {
  type: "MultiLineString";
  coordinates: Position[][];
}

/** GeoJSON Polygon */
export interface GeoJsonPolygon extends GeoJsonObject {
  type: "Polygon";
  coordinates: Position[][];
}

/** GeoJSON MultiPolygon */
export interface GeoJsonMultiPolygon extends GeoJsonObject {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

/** GeoJSON Geometry */
export type GeoJsonGeometry =
  | GeoJsonPoint
  | GeoJsonMultiPoint
  | GeoJsonLineString
  | GeoJsonMultiLineString
  | GeoJsonPolygon
  | GeoJsonMultiPolygon;

/** GeoJSON GeometryCollection */
export interface GeoJsonGeometryCollection extends GeoJsonObject {
  type: "GeometryCollection";
  geometries: GeoJsonGeometry[] /* It's not recommended to include GeometryCollection recursively */;
}

/** GeoJSON Feature */
export interface GeoJsonFeature extends GeoJsonObject {
  type: "Feature";
  geometry?: GeoJsonGeometry;
  properties?: { [name: string]: any };
  id?: number | string;
}

/** GeoJSON FeatureCollection */
export interface GeoJsonFeatureCollection extends GeoJsonObject {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}
