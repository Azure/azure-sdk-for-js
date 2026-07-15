import { ApiVersionType } from "./types.js";

export interface IApiVersionTypeExtractor {
  (packageRoot: string, apiVersion?: string): Promise<ApiVersionType>;
}

export interface IModelOnlyChecker {
  (packageRoot: string, isBetaRelease?: boolean): Promise<boolean>;
}
