import type { PackageManager } from "./types.js";
export declare class NPM implements PackageManager {
    installDevDependencyCommand: (packageName: string) => string;
    runCommand: (command: string, args: string) => string;
}
export declare class PNPM implements PackageManager {
    private useWorkspace;
    constructor();
    installDevDependencyCommand: (packageName: string) => string;
    runCommand: (command: string, args: string) => string;
}
export declare class Yarn implements PackageManager {
    installDevDependencyCommand: (packageName: string) => string;
    runCommand: (command: string, args: string) => string;
}
export declare const getPackageManager: () => PackageManager;
//# sourceMappingURL=packageManager.d.ts.map