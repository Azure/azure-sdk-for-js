import { getTsSourceFile } from "../../common/utils.js";
import { ApiVersionType } from "../../common/types.js";
import path, { basename } from "node:path";
import { FunctionDeclaration, SourceFile, SyntaxKind } from "ts-morph";
import { logger } from "../../utils/logger.js";
import { glob } from "glob";
import { exists } from "fs-extra";
import { tryGetNpmView } from "../../common/npmUtils.js";
import { getLatestStableVersion, isBetaVersion } from "../../utils/version.js";
import fs from "fs";
import unixify from "unixify";

function tryFindVersionInFunctionBody(func: FunctionDeclaration): string | undefined {
  const apiVersionStatements = func
    .getStatements()
    .filter((s) => s.getText().includes("options.apiVersion"));
  if (apiVersionStatements.length === 0) {
    return undefined;
  }
  const text = apiVersionStatements[apiVersionStatements.length - 1].getText();
  return extractApiVersionFromText(text);
}

function getFunctionNameCaseInsensitive(sourceFile: SourceFile, functionName: string): string {
  const allFunctions = sourceFile.getFunctions();
  const functionNameLower = functionName.toLowerCase();
  const matchingFunction = allFunctions.find((func) => {
    const name = func.getName();
    return name && name.toLowerCase() === functionNameLower;
  });

  return matchingFunction?.getName() || functionName;
}

function tryFindFunctionWithApiVersion(
  clientPath: string,
  functionName: string,
): FunctionDeclaration | undefined {
  const sourceFile = getTsSourceFile(clientPath);
  if (!sourceFile) return undefined;

  // Get the exact function name with correct case
  const exactFunctionName = getFunctionNameCaseInsensitive(sourceFile, functionName);

  // Get the function using the exact name
  return sourceFile.getFunction(exactFunctionName);
}

const extractApiVersionFromText = (text: string): string | undefined => {
  const begin = text.indexOf('"');
  const end = text.lastIndexOf('"');
  return text.substring(begin + 1, end);
};

const tryFindApiVersionInRestClientV1 = (clientPath: string): string | undefined => {
  const createClientFunction = tryFindFunctionWithApiVersion(clientPath, "createClient");
  if (!createClientFunction) return undefined;
  return tryFindVersionInFunctionBody(createClientFunction);
};

// new way in @autorest/typespec-ts emitter to set up api-version
const tryFindApiVersionInRestClientV2 = (clientPath: string): string | undefined => {
  const createClientFunction = tryFindFunctionWithApiVersion(clientPath, "createClient");
  if (!createClientFunction) return undefined;
  let apiVersion: string | undefined = undefined;
  const bindingParameters = createClientFunction
    .getParameters()
    .filter((p) => p.getNameNode().getKind() === SyntaxKind.ObjectBindingPattern);
  if (bindingParameters.length !== 1) return undefined;
  const bindingPatterns = bindingParameters[0]
    .getNameNode()
    .asKind(SyntaxKind.ObjectBindingPattern);
  if (!bindingPatterns) return undefined;
  bindingPatterns
    .getElements()
    .filter((e) => e.getName() === "apiVersion")
    .map((e) => {
      const text = e.getInitializer()?.getText();
      if (!text) return;
      apiVersion = extractApiVersionFromText(text);
    });
  return apiVersion;
};

// another new way in @autorest/typespec-ts emitter to set up api-version
const tryFindApiVersionInRestClientV3 = (clientPath: string): string | undefined => {
  const suffix = basename(clientPath).replace("Context.ts", "");
  const functionName = `create${suffix[0].toUpperCase()}${suffix.slice(1)}`;
  const createClientFunction = tryFindFunctionWithApiVersion(clientPath, functionName);
  if (!createClientFunction) return undefined;
  return tryFindVersionInFunctionBody(createClientFunction);
};

const findApiVersionsInOperations = (
  sourceFile: SourceFile | undefined,
): Array<string> | undefined => {
  const interfaces = sourceFile?.getInterfaces();
  const interfacesWithApiVersion = interfaces?.filter((itf) => itf.getProperty('"api-version"'));
  const apiVersions = interfacesWithApiVersion?.map((itf) => {
    const property = itf.getMembers().filter((m) => {
      const defaultValue = m.getChildrenOfKind(SyntaxKind.StringLiteral)[0];
      return defaultValue && defaultValue.getText() === '"api-version"';
    })[0];
    const literals = property.getChildrenOfKind(SyntaxKind.LiteralType);
    const apiVersion = literals.length > 0 ? literals[0].getText() : undefined;
    return apiVersion;
  });
  return apiVersions?.filter((v) => v !== undefined);
};

// workaround for createClient function changes it's way to setup api-version
export const tryFindApiVersionInRestClient = (clientPath: string): string | undefined => {
  const version3 = tryFindApiVersionInRestClientV3(clientPath);
  if (version3) return version3;
  const version2 = tryFindApiVersionInRestClientV2(clientPath);
  if (version2) return version2;
  const version1 = tryFindApiVersionInRestClientV1(clientPath);
  return version1;
};

export const tryFindRestClientPath = async (
  packageRoot: string,
  clientPattern: string,
): Promise<string | undefined> => {
  const pattern = unixify(path.join(packageRoot, clientPattern));
  const clientFiles = await glob(pattern);
  if (clientFiles.length !== 1) {
    logger.warn(
      `Failed to find exactly one REST client in pattern '${pattern}', got '${clientFiles}'.`,
    );
    return undefined;
  }
  const filePath = clientFiles[0];
  if (!(await exists(filePath))) {
    logger.warn(`Client file '${filePath}' does not exist.`);
    return undefined;
  }
  return clientFiles[0];
};

export const getApiVersionTypeFromRestClient = async (
  packageRoot: string,
  clientPattern: string,
  findRestClientPath: (packageRoot: string, clientPattern: string) => Promise<string | undefined>,
): Promise<ApiVersionType> => {
  const clientPath = await findRestClientPath(packageRoot, clientPattern);
  if (!clientPath) return ApiVersionType.None;
  const apiVersion = tryFindApiVersionInRestClient(clientPath);
  if (apiVersion && apiVersion.indexOf("-preview") >= 0) return ApiVersionType.Preview;
  if (apiVersion && apiVersion.indexOf("-preview") < 0) return ApiVersionType.Stable;
  return ApiVersionType.None;
};

export const getApiVersionTypeFromOperations = (parametersPath: string): ApiVersionType => {
  const sourceFile = getTsSourceFile(parametersPath);
  const apiVersions = findApiVersionsInOperations(sourceFile);
  if (!apiVersions) return ApiVersionType.None;
  const previewVersions = apiVersions.filter((v) => v.indexOf("-preview") >= 0);
  return previewVersions.length > 0 ? ApiVersionType.Preview : ApiVersionType.Stable;
};

export const getApiVersionTypeFromNpm = async (packageName: string): Promise<ApiVersionType> => {
  logger.info("Fallback to get api version type from latest version in NPM");
  const npmViewResult = await tryGetNpmView(packageName);
  if (!npmViewResult) return ApiVersionType.Preview;
  const latestVersion = getLatestStableVersion(npmViewResult);
  return latestVersion && !isBetaVersion(latestVersion)
    ? ApiVersionType.Stable
    : ApiVersionType.Preview;
};

export const getApiVersionTypeFromMetadata = async (
  packageRoot: string,
): Promise<ApiVersionType> => {
  const metadataPath = path.join(packageRoot, "metadata.json");
  if (!(await exists(metadataPath))) {
    return ApiVersionType.None;
  }

  try {
    const metadataContent = fs.readFileSync(metadataPath, "utf-8");
    const metadata = JSON.parse(metadataContent);

    let apiVersion: string | undefined;

    // Support new format: { "apiVersions": { "service": "version", ... } }
    if (
      metadata.apiVersions != null &&
      !Array.isArray(metadata.apiVersions) &&
      typeof metadata.apiVersions === "object"
    ) {
      const values = Object.values(metadata.apiVersions).filter(
        (v): v is string => typeof v === "string",
      );
      if (values.length > 0) {
        // If any version is preview, use a preview version; otherwise use the first stable version
        // This ensures: any preview -> Preview, all stable -> Stable
        apiVersion = values.find((v) => v.indexOf("-preview") >= 0) || values[0];
      }
    } else {
      // Support old format: { "apiVersion": "version" }
      apiVersion = metadata.apiVersion;
    }

    if (!apiVersion) {
      logger.warn(
        `metadata.json exists at ${metadataPath} but does not contain apiVersion or apiVersions field`,
      );
      return ApiVersionType.None;
    }

    logger.info(`Found apiVersion "${apiVersion}" in metadata.json`);
    return apiVersion.indexOf("-preview") >= 0 ? ApiVersionType.Preview : ApiVersionType.Stable;
  } catch (error) {
    logger.warn(`Failed to read or parse metadata.json at ${metadataPath}: ${error}`);
    return ApiVersionType.None;
  }
};
