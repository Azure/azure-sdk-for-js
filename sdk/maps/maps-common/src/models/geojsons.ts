// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
export type BBox2D = [
  southWestLongitude: number,
  southWestLatitude: number,
  northEastLongitude: number,
  northEastLatitude: number,
];
/** 3D bounding box */
export type BBox3D = [
  southWestLongitude: number,
  southWestLatitude: number,
  southWestElevation: number,
  northEastLongitude: number,
  northEastLatitude: number,
  northEastElevation: number,
];
/** Bounding box including information on the coordinate range for its geometries */
export type BBox = BBox2D | BBox3D;

/** A GeoJSON object represents a Geometry, Feature, or collection of
   Features. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3) */
export interface GeoJsonObject {
  /** Representing the type of this GeoJSON object, including the seven geometry type and "Feature", "FeatureCollection". [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-1.4) */
  type: GeoJsonType;
  /** Include information on the coordinate range for its Geometries, Features, or FeatureCollections. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-5) */
  bbox?: BBox;
}
/** 2D position */
export type Position2D = [longitude: number, latitude: number];
/** 3D position */
export type Position3D = [longitude: number, latitude: number, elevation: number];
/** An array of number representing a point */
export type Position = Position2D | Position3D;

/** GeoJSON Point. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.2) */
export interface GeoJsonPoint extends GeoJsonObject {
  type: "Point";
  /** For type "Point", the "coordinates" member is a single position. */
  coordinates: Position;
}

/** GeoJSON MultiPoint. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.3) */
export interface GeoJsonMultiPoint extends GeoJsonObject {
  type: "MultiPoint";
  /** For type "MultiPoint", the "coordinates" member is an array of positions. */
  coordinates: Position[];
}

/** GeoJSON LineString. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.4) */
export interface GeoJsonLineString extends GeoJsonObject {
  type: "LineString";
  /** For type "LineString", the "coordinates" member is an array of two or more positions. */
  coordinates: Position[];
}

/** GeoJSON MultiLineString. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.5) */
export interface GeoJsonMultiLineString extends GeoJsonObject {
  type: "MultiLineString";
  /** For type "MultiLineString", the "coordinates" member is an array of LineString coordinate arrays. */
  coordinates: Position[][];
}

/**
 * GeoJSON Polygon. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.6)
 *
 * To specify a constraint specific to Polygons, it is useful to introduce the concept of a linear ring:
 *  - A linear ring is a closed LineString with four or more positions.
 *  - The first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.
 *  - A linear ring is the boundary of a surface or the boundary of a hole in a surface.
 *  - A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.
 * */
export interface GeoJsonPolygon extends GeoJsonObject {
  type: "Polygon";
  /** For type "Polygon", the "coordinates" member MUST be an array of linear ring coordinate arrays. */
  coordinates: Position[][];
}

/** GeoJSON MultiPolygon. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.7) */
export interface GeoJsonMultiPolygon extends GeoJsonObject {
  type: "MultiPolygon";
  /** For type "MultiPolygon", the "coordinates" member is an array of Polygon coordinate arrays. */
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

/** GeoJSON GeometryCollection. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.8) */
export interface GeoJsonGeometryCollection extends GeoJsonObject {
  type: "GeometryCollection";
  /* It's not recommended to include GeometryCollection recursively */
  geometries: GeoJsonGeometry[];
}

/** 
 * GeoJSON Feature
 * A Feature object represents a spatially bounded thing.  Every Feature
   object is a GeoJSON object. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.2)
 */
export interface GeoJsonFeature extends GeoJsonObject {
  type: "Feature";
  geometry?: GeoJsonGeometry;
  properties?: Record<string, any>;
  id?: number | string;
}

/** GeoJSON FeatureCollection. [Reference](https://www.rfc-editor.org/rfc/rfc7946#section-3.3) */
export interface GeoJsonFeatureCollection extends GeoJsonObject {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}
