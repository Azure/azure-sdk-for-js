import { Query, Metadata } from "./operationsInterfaces/index.js";
import { AzureLogAnalyticsContext } from "./azureLogAnalyticsContext.js";
import { AzureLogAnalyticsOptionalParams } from "./models/index.js";
/** @internal */
export declare class AzureLogAnalytics extends AzureLogAnalyticsContext {
    /**
     * Initializes a new instance of the AzureLogAnalytics class.
     * @param options The parameter options
     */
    constructor(options?: AzureLogAnalyticsOptionalParams);
    query: Query;
    metadata: Metadata;
}
//# sourceMappingURL=azureLogAnalytics.d.ts.map