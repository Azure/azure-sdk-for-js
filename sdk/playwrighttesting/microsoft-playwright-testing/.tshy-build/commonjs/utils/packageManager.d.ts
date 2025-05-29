import type { PackageManager } from "../common/types.js";
export declare class NPM implements PackageManager {
    runCommand: (command: string, args: string) => string;
    getVersionFromStdout: (stdout: string) => string;
}
export declare class PNPM implements PackageManager {
    runCommand: (command: string, args: string) => string;
    getVersionFromStdout: (stdout: string) => string;
}
export declare class Yarn implements PackageManager {
    runCommand: (command: string, args: string) => string;
    getVersionFromStdout: (stdout: string) => string;
}
export declare const getPackageManager: () => PackageManager;
//# sourceMappingURL=packageManager.d.ts.map