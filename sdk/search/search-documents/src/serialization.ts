// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import GeographyPoint from "./geographyPoint";
import { walk } from "./walk";

const ISO8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/i;
const GeoJSONPointTypeName = "Point";
const WorldGeodeticSystem1984 = "EPSG:4326"; // See https://epsg.io/4326

const [serializeValue, deserializeValue] = [
  [serializeSpecialNumbers, serializeDates, serializeGeoPoint],
  [deserializeSpecialNumbers, deserializeDates, deserializeGeoPoint],
].map(
  (fns) =>
    (value: unknown): unknown =>
      fns.reduceRight((acc, fn) => fn(acc), value),
);

export function serialize<OutputT>(obj: unknown): OutputT {
  return walk(obj, serializeValue) as OutputT;
}

export function deserialize<OutputT>(obj: unknown): OutputT {
  return walk(obj, deserializeValue) as OutputT;
}

function serializeSpecialNumbers(input: unknown): unknown {
  if (typeof input === "number" && isNaN(input)) {
    return "NaN";
  } else if (input === Infinity) {
    return "INF";
  } else if (input === -Infinity) {
    return "-INF";
  } else {
    return input;
  }
}

function serializeDates(input: unknown): string | unknown {
  return input instanceof Date ? input.toISOString() : input;
}

function serializeGeoPoint(input: unknown): object | unknown {
  return input instanceof GeographyPoint ? input.toJSON() : input;
}

function deserializeSpecialNumbers(input: unknown): unknown {
  switch (input) {
    case "NaN":
      return NaN;
    case "-INF":
      return -Infinity;
    case "INF":
      return Infinity;
    default:
      return input;
  }
}

function deserializeDates(input: unknown): Date | unknown {
  return typeof input === "string" && ISO8601DateRegex.test(input) ? new Date(input) : input;
}

function deserializeGeoPoint(input: unknown): GeographyPoint | unknown {
  if (isGeoJSONPoint(input)) {
    const [longitude, latitude] = input.coordinates;
    return new GeographyPoint({ longitude, latitude });
  }
  return input;
}

interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
  crs: {
    type: "name";
    properties: {
      name: "EPSG:4326";
    };
  };
}

function isGeoJSONPoint(obj: any): obj is GeoJSONPoint {
  const requiredKeys = ["type", "coordinates"];
  return isValidObject(obj, {
    requiredKeys,
    propertyValidator: (key) => {
      switch (key) {
        case "type":
          return obj.type === GeoJSONPointTypeName;
          break;
        case "coordinates":
          return isCoordinateArray(obj.coordinates);
          break;
        case "crs":
          return isCrs(obj.crs);
          break;
        default:
          return false;
      }
    },
  });
}

function isCoordinateArray(maybeCoordinates: any): boolean {
  if (!Array.isArray(maybeCoordinates)) {
    return false;
  }
  if (maybeCoordinates.length !== 2) {
    return false;
  }
  if (typeof maybeCoordinates[0] !== "number" || typeof maybeCoordinates[1] !== "number") {
    return false;
  }
  return true;
}

function isCrs(maybeCrs: any): boolean {
  return isValidObject(maybeCrs, {
    requiredKeys: ["type", "properties"],
    propertyValidator: (key) => {
      switch (key) {
        case "type":
          return maybeCrs.type === "name";
          break;
        case "properties":
          return isCrsProperties(maybeCrs.properties);
          break;
        default:
          return false;
      }
    },
  });
}

function isCrsProperties(maybeProperties: any): boolean {
  return isValidObject(maybeProperties, {
    requiredKeys: ["name"],
    propertyValidator: (key) => {
      if (key === "name") {
        return maybeProperties.name === WorldGeodeticSystem1984;
      } else {
        return false;
      }
    },
  });
}

function isValidObject(
  obj: any,
  options: {
    requiredKeys?: string[];
    propertyValidator?: (keyName: string) => boolean;
  } = {},
): boolean {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const keys = Object.keys(obj);

  if (options.requiredKeys) {
    for (const requiredKey of options.requiredKeys) {
      if (!keys.includes(requiredKey)) {
        return false;
      }
    }
  }

  if (options.propertyValidator) {
    for (const key of keys) {
      if (!options.propertyValidator(key)) {
        return false;
      }
    }
  }

  return true;
}
