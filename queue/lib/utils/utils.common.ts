import { URLBuilder } from "ms-rest-js";

/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} name String to be appended to URL
 * @returns {string} An updated URL string
 */
export function appendToURLPath(url: string, name: string): string {
  const urlParsed = URLBuilder.parse(url);

  let path = urlParsed.getPath();
  path = path
    ? path.endsWith("/")
      ? `${path}${name}`
      : `${path}/${name}`
    : name;
  urlParsed.setPath(path);

  return urlParsed.toString();
}

/**
 * Set URL parameter name and value. If name exists in URL parameters, old value
 * will be replaced by name key. If not provide value, the parameter will be deleted.
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} name Parameter name
 * @param {string} [value] Parameter value
 * @returns {string} An updated URL string
 */
export function setURLParameter(
  url: string,
  name: string,
  value?: string
): string {
  const urlParsed = URLBuilder.parse(url);
  urlParsed.setQueryParameter(name, value);
  return urlParsed.toString();
}

/**
 * Get URL parameter by name.
 *
 * @export
 * @param {string} url
 * @param {string} name
 * @returns {(string | string[] | undefined)}
 */
export function getURLParameter(
  url: string,
  name: string
): string | string[] | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getQueryParameterValue(name);
}

/**
 * Set URL host.
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} host New host string
 * @returns An updated URL string
 */
export function setURLHost(url: string, host: string): string {
  const urlParsed = URLBuilder.parse(url);
  urlParsed.setHost(host);
  return urlParsed.toString();
}

/**
 * Get URL path from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export function getURLPath(url: string): string | undefined {
  const urlParsed = URLBuilder.parse(url);
  return urlParsed.getPath();
}

/**
 * Get URL query key value pairs from an URL string.
 *
 * @export
 * @param {string} url
 * @returns {{[key: string]: string}}
 */
export function getURLQueries(url: string): { [key: string]: string } {
  let queryString = URLBuilder.parse(url).getQuery();
  if (!queryString) {
    return {};
  }

  queryString = queryString.trim();
  queryString = queryString.startsWith("?")
    ? queryString.substr(1)
    : queryString;

  let querySubStrings: string[] = queryString.split("&");
  querySubStrings = querySubStrings.filter((value: string) => {
    const indexOfEqual = value.indexOf("=");
    const lastIndexOfEqual = value.lastIndexOf("=");
    return (
      indexOfEqual > 0 &&
      indexOfEqual === lastIndexOfEqual &&
      lastIndexOfEqual < value.length - 1
    );
  });

  const queries: { [key: string]: string } = {};
  for (const querySubString of querySubStrings) {
    const splitResults = querySubString.split("=");
    const key: string = splitResults[0];
    const value: string = splitResults[1];
    queries[key] = value;
  }

  return queries;
}

/**
 * Rounds a date off to seconds.
 *
 * @export
 * @param {Date} date
 * @param {boolean} [withMilliseconds=true] If true, YYYY-MM-DDThh:mm:ss.fffffffTZD will be returned;
 *                                          If false, YYYY-MM-DDThh:mmTZD will be returned.
 * @returns {string} Date string in ISO8061 format, with or without 7 milliseconds component
 */
export function truncatedISO8061Date(
  date: Date,
  withMilliseconds: boolean = true
): string {
  // Date.toISOString() will return like "2018-10-29T06:34:36.139Z"
  const dateString = date.toISOString();

  return withMilliseconds
    ? dateString.substring(0, dateString.length - 1) + "0000" + "Z"
    : dateString.substring(0, dateString.length - 5) + "Z";
}

/**
 * String.prototype.padStart()
 *
 * @export
 * @param {string} currentString
 * @param {number} targetLength
 * @param {string} [padString=" "]
 * @returns {string}
 */
export function padStart(
  currentString: string,
  targetLength: number,
  padString: string = " "
): string {
  if (String.prototype.padStart) {
    return currentString.padStart(targetLength, padString);
  }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}
