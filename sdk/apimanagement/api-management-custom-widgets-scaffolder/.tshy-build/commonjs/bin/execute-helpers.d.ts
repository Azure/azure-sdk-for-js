import type { ReplaceTypesPreserveOptional, Validate, ValidateFnc } from "./execute-configs.js";
import type { Configs } from "../scaffolding.js";
import yargsParser from "yargs-parser";
export declare const extractConfigFromArgs: <TConfig extends Configs>(argv: yargsParser.Arguments, validateConfig: Validate<TConfig>, red: (msg: string) => void) => {
    configPartial: Partial<TConfig>;
    missing: boolean;
};
export type Log = (msg: string) => void;
type Config = <C extends Configs>(promptForConfig: (partial: Partial<C>) => Promise<C>, validateConfig: ReplaceTypesPreserveOptional<C, ValidateFnc>) => Promise<C>;
export declare const buildGetConfig: (gray: Log, red: Log) => Config;
export {};
//# sourceMappingURL=execute-helpers.d.ts.map