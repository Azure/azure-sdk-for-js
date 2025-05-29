import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DefenderForAISettings } from "../operationsInterfaces/index.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { DefenderForAISetting, DefenderForAISettingsListOptionalParams, DefenderForAISettingsGetOptionalParams, DefenderForAISettingsGetResponse, DefenderForAISettingsCreateOrUpdateOptionalParams, DefenderForAISettingsCreateOrUpdateResponse, DefenderForAISettingsUpdateOptionalParams, DefenderForAISettingsUpdateResponse } from "../models/index.js";
/** Class containing DefenderForAISettings operations. */
export declare class DefenderForAISettingsImpl implements DefenderForAISettings {
    private readonly client;
    /**
     * Initialize a new instance of the class DefenderForAISettings class.
     * @param client Reference to the service client
     */
    constructor(client: CognitiveServicesManagementClient);
    /**
     * Lists the Defender for AI settings.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    list(resourceGroupName: string, accountName: string, options?: DefenderForAISettingsListOptionalParams): PagedAsyncIterableIterator<DefenderForAISetting>;
    private listPagingPage;
    private listPagingAll;
    /**
     * Lists the Defender for AI settings.
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param options The options parameters.
     */
    private _list;
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
    /**
     * ListNext
     * @param resourceGroupName The name of the resource group. The name is case insensitive.
     * @param accountName The name of Cognitive Services account.
     * @param nextLink The nextLink from the previous successful call to the List method.
     * @param options The options parameters.
     */
    private _listNext;
}
//# sourceMappingURL=defenderForAISettings.d.ts.map