// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import GeographyPoint from "./geographyPoint";

const ISO8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/i;
const GeoJSONPointTypeName = "Point";
const WorldGeodeticSystem1984 = "EPSG:4326"; // See https://epsg.io/4326

export function serialize<OutputT>(obj: unknown): OutputT {
  return walk(obj, (value) => {
    const result = serializeSpecialNumbers(value);
    return result;
  });
}

export function deserialize<OutputT>(obj: unknown): OutputT {
  return walk(obj, (value) => {
    let result = deserializeSpecialNumbers(value);
    result = deserializeDates(result);
    result = deserializeGeoPoint(result);
    return result;
  });
}

function walk(start: unknown, mapper: (val: any) => any): any {
  const seenMarker = new WeakMap<object, boolean>();
  const result = { value: undefined };
  const queue: { value: any; parent: any; key: string }[] = [
    { value: start, parent: result, key: "value" }
  ];

  while (queue.length) {
    const current = queue.shift()!;

    if (typeof current.value === "object" && current.value !== null) {
      if (seenMarker.has(current.value)) {
        throw new Error("Cannot map a recusive structure.");
      } else {
        seenMarker.set(current.value, true);
      }
    }

    const mapped = mapper(current.value);
    if (current?.parent && current.key) {
      current.parent[current.key] = mapped;
    }
    if (typeof mapped === "object" && mapped !== null) {
      for (const key of Object.keys(mapped)) {
        queue.push({
          value: mapped[key],
          parent: mapped,
          key
        });
      }
    }
  }

  return result.value;
}

function serializeSpecialNumbers(input: unknown): unknown {
  if (typeof input === "number") {
    if (isNaN(input)) {
      return "NaN";
    } else if (input === Infinity) {
      return "INF";
    } else if (input === -Infinity) {
      return "-INF";
    }
  }
  return input;
}

function deserializeSpecialNumbers(input: unknown): unknown {
  if (typeof input === "string") {
    if (input === "NaN") {
      return NaN;
    } else if (input === "INF") {
      return Infinity;
    } else if (input === "-INF") {
      return -Infinity;
    }
  }
  return input;
}

function deserializeDates(input: unknown): Date | unknown {
  if (typeof input === "string") {
    if (ISO8601DateRegex.test(input)) {
      return new Date(input);
    }
  }
  return input;
}

function deserializeGeoPoint(input: unknown): GeographyPoint | unknown {
  if (isGeoJSONPoint(input)) {
    return new GeographyPoint(input.coordinates[0], input.coordinates[1]);
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
    }
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
    }
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
    }
  });
}

function isValidObject(
  obj: any,
  options: {
    requiredKeys?: string[];
    propertyValidator?: (keyName: string) => boolean;
  } = {}
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
