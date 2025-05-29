import type { CLIArguments, PlaywrightServiceInitConfig } from "./types.js";
export declare const executeCommand: (command: string) => Promise<string>;
export declare const getLanguageAndConfigInfoFromDirectory: () => PlaywrightServiceInitConfig;
export declare const getLanguageAndConfigInfoFromConfigurationFile: (playwrightConfigFile: string) => PlaywrightServiceInitConfig;
export declare const getFileReferenceForImport: (filePath: string) => string;
export declare const showHelpForCLI: () => string;
export declare const parseCLIArguments: () => CLIArguments;
//# sourceMappingURL=utils.d.ts.map