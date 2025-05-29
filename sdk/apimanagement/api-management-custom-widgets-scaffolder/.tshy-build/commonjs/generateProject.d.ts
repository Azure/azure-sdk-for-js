import type { ServiceInformation, Options, WidgetConfig } from "./scaffolding.js";
/**
 * Generates a scaffold project of Custom widget for API Managements' Dev Portal.
 *
 * @param widgetConfig - JSON object with data required by DevPortal to handle a widget integration.
 * @param deploymentConfig - JSON object with data for deployment.
 * @param options - JSON object with other data, which will not be stored in the DevPortal.
 */
export declare function generateProject(widgetConfig: WidgetConfig, deploymentConfig: ServiceInformation, options?: Options): Promise<void>;
//# sourceMappingURL=generateProject.d.ts.map