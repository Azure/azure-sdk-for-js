import { ApiVersionType } from '../../common/types.js';
import { IApiVersionTypeExtractor } from '../../common/interfaces.js';
import { getClassicClientParametersPath, getTsSourceFile } from '../../common/utils.js';
import { isBetaVersion } from '../../utils/version.js';

// TODO: add unit test
export const getApiVersionType: IApiVersionTypeExtractor = async (
  packageRoot: string,
  apiVersion?: string
): Promise<ApiVersionType> => {
  if (apiVersion) {
    return isBetaVersion(apiVersion) ? ApiVersionType.Preview : ApiVersionType.Stable;
  }

  const paraPath = getClassicClientParametersPath(packageRoot);
  const source = getTsSourceFile(paraPath);
  const variableDeclarations = source?.getVariableDeclarations();
  if (!variableDeclarations) return ApiVersionType.Stable;
  for (const variableDeclaration of variableDeclarations) {
    const fullText = variableDeclaration.getFullText();
    if (fullText.toLowerCase().includes('apiversion')) {
      const match = fullText.match(/defaultValue: "([0-9a-z-]+)"/);
      if (!match || match.length !== 2) {
        continue;
      }
      if (match[1].includes('preview')) {
        return ApiVersionType.Preview;
      }
    }
  }
  return ApiVersionType.Stable;
};
