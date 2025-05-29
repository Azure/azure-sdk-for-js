import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DefenderForAISetting, DefenderForAISettingsListOptionalParams, DefenderForAISettingsGetOptionalParams, DefenderForAISettingsGetResponse, DefenderForAISettingsCreateOrUpdateOptionalParams, DefenderForAISettingsCreateOrUpdateResponse, DefenderForAISettingsUpdateOptionalParams, DefenderForAISettingsUpdateResponse } from "../models/index.js";
/** Interface representing a DefenderForAISettings. */
export interface DefenderForAISettings {
    /**
     * Lists the Defender for AI settings.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: DefenderForAISettingsListOptionalParams): PagedAsyncIterableIterator<DefenderForAISetting>;
    /**
     * Gets the specified Defender for AI setting by name.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param defenderForAISettingName The name of the defender for AI setting.
     * @param options The options parameters.
     */
    get(resourceGroupName: string, accountName: string, defenderForAISettingName: string, options?: DefenderForAISettingsGetOptionalParams): Promise<DefenderForAISettingsGetResponse>;
    /**
     * Creates or Updates the specified Defender for AI setting.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param defenderForAISettingName The name of the defender for AI setting.
     * @param defenderForAISettings Properties describing the Defender for AI setting.
     * @param options The options parameters.
     */
    createOrUpdate(resourceGroupName: string, accountName: string, defenderForAISettingName: string, defenderForAISettings: DefenderForAISetting, options?: DefenderForAISettingsCreateOrUpdateOptionalParams): Promise<DefenderForAISettingsCreateOrUpdateResponse>;
    /**
     * Updates the specified Defender for AI setting.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param defenderForAISettingName The name of the defender for AI setting.
     * @param defenderForAISettings Properties describing the Defender for AI setting.
     * @param options The options parameters.
     */
    update(resourceGroupName: string, accountName: string, defenderForAISettingName: string, defenderForAISettings: DefenderForAISetting, options?: DefenderForAISettingsUpdateOptionalParams): Promise<DefenderForAISettingsUpdateResponse>;
}
//# sourceMappingURL=defenderForAISettings.d.ts.map