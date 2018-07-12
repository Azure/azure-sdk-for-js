import { Constants } from ".";

const Regexes = Constants.RegularExpressions;

export class Helper {
  public static isStringNullOrEmpty(inputString: string) {
    // checks whether string is null, undefined, empty or only contains space
    return !inputString || /^\s*$/.test(inputString);
  }

  public static trimSlashFromLeftAndRight(inputString: string) {
    if (typeof inputString !== "string") {
      throw new Error("invalid input: input is not string");
    }

    return inputString.replace(Regexes.TrimLeftSlashes, "").replace(Regexes.TrimRightSlashes, "");
  }

  public static validateResourceId(resourceId: string) {
    // if resourceId is not a string or is empty throw an error
    if (typeof resourceId !== "string" || this.isStringNullOrEmpty(resourceId)) {
      throw new Error("Resource Id must be a string and cannot be undefined, null or empty");
    }

    // if resourceId starts or ends with space throw an error
    if (resourceId[resourceId.length - 1] === " ") {
      throw new Error("Resource Id cannot end with space");
    }

    // if resource id contains illegal characters throw an error
    if (Regexes.IllegalResourceIdCharacters.test(resourceId)) {
      throw new Error("Illegal characters ['/', '\\', '?', '#'] cannot be used in resourceId");
    }

    return true;
  }

  public static getResourceIdFromPath(resourcePath: string) {
    if (!resourcePath || typeof resourcePath !== "string") {
      return null;
    }

    const trimmedPath = this.trimSlashFromLeftAndRight(resourcePath);
    const pathSegments = trimmedPath.split("/");

    // number of segments of a path must always be even
    if (pathSegments.length % 2 !== 0) {
      return null;
    }

    return pathSegments[pathSegments.length - 1];
  }
}
