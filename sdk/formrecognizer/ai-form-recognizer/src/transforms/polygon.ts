// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BoundingRegion as GeneratedBoundingRegion,
  DocumentKeyValuePair as GeneratedDocumentKeyValuePair,
  DocumentTable as GeneratedDocumentTable,
} from "../generated";
import { BoundingRegion, DocumentKeyValuePair, DocumentTable } from "../models/documentElements";

/**
 * Represents a point used to define bounding polygons. The unit is either 'pixel' or 'inch' (See {@link LengthUnit}).
 */
export interface Point2D {
  /**
   * x coordinate - relative from the left side of the page
   */
  x: number;
  /**
   * y coordinate - relative from the top of the page
   */
  y: number;
}

export function toBoundingPolygon(original: number[] | undefined): Point2D[] | undefined {
  const points: Point2D[] = [];
  if (!original) return;

  if (original.length % 2 !== 0) {
    throw new Error(
      "Unexpected number of points in the response, unable to translate as 2D points"
    );
  }

  for (let i = 0; i < original.length; i += 2) {
    points.push({ x: original[i], y: original[i + 1] });
  }

  return points;
}

export function toBoundingRegions(
  original: GeneratedBoundingRegion[] | undefined
): BoundingRegion[] | undefined {
  return original?.map((region) => ({ ...region, polygon: toBoundingPolygon(region.polygon) }));
}

export function toDocumentTableFromGenerated(table: GeneratedDocumentTable): DocumentTable {
  return {
    ...table,
    boundingRegions: toBoundingRegions(table.boundingRegions),
    cells: table.cells.map((cell) => ({
      ...cell,
      boundingRegions: toBoundingRegions(cell.boundingRegions),
    })),
  };
}

export function toKeyValuePairFromGenerated(
  pair: GeneratedDocumentKeyValuePair
): DocumentKeyValuePair {
  return {
    ...pair,
    key: { ...pair.key, boundingRegions: toBoundingRegions(pair.key.boundingRegions) },
    value: pair.value
      ? { ...pair.value, boundingRegions: toBoundingRegions(pair.value?.boundingRegions) }
      : undefined,
  };
}
