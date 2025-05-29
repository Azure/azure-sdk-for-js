import type { Configs, ServiceInformation, Options, WidgetConfig } from "../scaffolding.js";
export declare const fieldIdToName: Record<keyof (WidgetConfig & ServiceInformation & Options) | string, string>;
export declare const prefixUrlProtocol: (value: string) => string;
export type ReplaceTypesPreserveOptional<T extends Record<any, any>, V> = {
    [Key in keyof T]: T[Key] extends undefined ? V | undefined : V;
};
export type ValidateFnc = (input: string) => boolean | string;
export type Validate<C extends Configs> = ReplaceTypesPreserveOptional<C, ValidateFnc>;
export declare const validateWidgetConfig: Validate<WidgetConfig>;
export declare const validateDeployConfig: Validate<ServiceInformation>;
export declare const validateMiscConfig: Validate<Options>;
export declare const promptWidgetConfig: (partial: Partial<WidgetConfig>) => Promise<WidgetConfig>;
export declare const promptServiceInformation: (partial: Partial<ServiceInformation>) => Promise<ServiceInformation>;
export declare const promptMiscConfig: (partial: Partial<Options>) => Promise<Options>;
//# sourceMappingURL=execute-configs.d.ts.map