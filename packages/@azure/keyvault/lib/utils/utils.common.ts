import { isNode, URLBuilder } from "@azure/ms-rest-js";

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
