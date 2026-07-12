import { getSDKType } from '../../common/utils.js';
import { ApiVersionType, SDKType } from '../../common/types.js';
import { IApiVersionTypeExtractor, IModelOnlyChecker } from '../../common/interfaces.js';
import * as mlcApi from '../../mlc/apiVersion/apiVersionTypeExtractor.js';
import * as hlcApi from '../../hlc/apiVersion/apiVersionTypeExtractor.js';
import * as rlcApi from '../../llc/apiVersion/apiVersionTypeExtractor.js';
import { logger } from '../../utils/logger.js';

export const getApiVersionType: IApiVersionTypeExtractor = async (packageRoot: string): Promise<ApiVersionType> => {
  const sdkType = getSDKType(packageRoot);
  switch (sdkType) {
    case SDKType.ModularClient:
      return await mlcApi.getApiVersionType(packageRoot);
    case SDKType.HighLevelClient:
      return await hlcApi.getApiVersionType(packageRoot);
    case SDKType.RestLevelClient:
      return await rlcApi.getApiVersionType(packageRoot);
    default:
      logger.warn(`Unsupported SDK type ${sdkType} to get detect api version`);
      return ApiVersionType.None;
  }
};

export const isModelOnly: IModelOnlyChecker = async (
  packageRoot: string,
  isBetaRelease?: boolean
): Promise<boolean> => {
  const sdkType = getSDKType(packageRoot);
  switch (sdkType) {
    case SDKType.ModularClient:
      return await mlcApi.isModelOnly(packageRoot, isBetaRelease);
    case SDKType.HighLevelClient:
      return false;
    case SDKType.RestLevelClient:
      return await rlcApi.isModelOnly(packageRoot);
    default:
      logger.warn(`Unsupported SDK type ${sdkType} to check if package is model-only`);
      return false;
  }
};
