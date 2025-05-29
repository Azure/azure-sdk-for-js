import type { TokenCredential } from "@azure/core-auth";
import { KeyVaultClient } from "./generated/keyVaultClient.js";
import type { AccessControlClientOptions } from "./accessControlModels.js";
import type { KeyVaultBackupClientOptions } from "./backupClientModels.js";
import type { SettingsClientOptions } from "./settingsClientModels.js";
export declare function createKeyVaultClient(vaultUrl: string, credential: TokenCredential, options: AccessControlClientOptions | KeyVaultBackupClientOptions | SettingsClientOptions): KeyVaultClient;
//# sourceMappingURL=createKeyVaultClient.d.ts.map