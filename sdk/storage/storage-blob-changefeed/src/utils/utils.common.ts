import { URLBuilder } from "@azure/core-http";
import { ContainerClient } from "@azure/storage-blob";
import { CHANGE_FEED_SEGMENT_PREFIX, CHANGE_FEED_INITIALIZATION_SEGMENT } from "./constants";

const millisecondsInAnHour = 60 * 60 * 1000;
export function ceilToNearestHour(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }
  return new Date(Math.ceil(date.getTime() / millisecondsInAnHour) * millisecondsInAnHour);
}

export function floorToNearestHour(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }
  return new Date(Math.floor(date.getTime() / millisecondsInAnHour) * millisecondsInAnHour);
}

/**
 * Get URI from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export function getURI(url: string): string {
  const urlParsed = URLBuilder.parse(url);
  return `${urlParsed.getHost()}${urlParsed.getPort()}${urlParsed.getPath()}`;
}

// s[0]*31^(n - 1) + s[1]*31^(n - 2) + ... + s[n - 1]
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Bit operation converts operands to 32-bit integers
  }
  return hash;
}

export async function getYearsPaths(containerClient: ContainerClient): Promise<number[]> {
  const years: number[] = [];
  for await (const item of containerClient.listBlobsByHierarchy("/", {
    prefix: CHANGE_FEED_SEGMENT_PREFIX
  })) {
    // TODO: add String.prototype.includes polyfill for IE11
    if (item.kind === "prefix" && !item.name.includes(CHANGE_FEED_INITIALIZATION_SEGMENT)) {
      const yearStr = item.name.slice(CHANGE_FEED_SEGMENT_PREFIX.length, -1);
      years.push(parseInt(yearStr));
    }
  }
  return years.sort((a, b) => a - b);
}

export async function getSegmentsInYear(
  containerClient: ContainerClient,
  year: number,
  startTime?: Date,
  endTime?: Date
): Promise<string[]> {
  const segments: string[] = [];
  const yearBeginTime = new Date(Date.UTC(year, 0));
  if (endTime && yearBeginTime >= endTime) {
    return segments;
  }

  const prefix = `${CHANGE_FEED_SEGMENT_PREFIX}${year}/`;
  for await (const item of containerClient.listBlobsFlat({ prefix })) {
    const segmentTime = parseDateFromSegmentPath(item.name);
    if ((startTime && segmentTime < startTime) || (endTime && segmentTime >= endTime)) {
      continue;
    }
    segments.push(item.name);
  }
  return segments;
}

export function parseDateFromSegmentPath(segmentPath: string): Date {
  const splitPath = segmentPath.split("/");
  if (splitPath.length < 3) {
    throw new Error(`${segmentPath} is not a valid segment path.`);
  }

  const segmentTime = new Date(0);
  segmentTime.setUTCFullYear(parseInt(splitPath[2]));

  if (splitPath.length >= 4) {
    segmentTime.setUTCMonth(parseInt(splitPath[3]) - 1);
  }
  if (splitPath.length >= 5) {
    segmentTime.setUTCDate(parseInt(splitPath[4]));
  }
  if (splitPath.length >= 6) {
    segmentTime.setUTCHours(parseInt(splitPath[5]) / 100);
  }
  return segmentTime;
}

export function minDate(dateA: Date, dateB?: Date): Date {
  if (dateB && dateB < dateA) {
    return dateB;
  }
  return dateA;
}
