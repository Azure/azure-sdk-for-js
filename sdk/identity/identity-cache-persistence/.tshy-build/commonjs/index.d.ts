import type { IdentityPlugin } from "@azure/identity";
/**
 * A plugin that provides persistent token caching for `@azure/identity`
 * credentials. The plugin API is compatible with `@azure/identity` versions
 * 2.0.0 and later. Load this plugin using the `useIdentityPlugin`
 * function, imported from `@azure/identity`.
 *
 * In order to enable this functionality, you must also pass
 * `tokenCachePersistenceOptions` to your credential constructors with an
 * `enabled` property set to true.
 *
 * Example:
 *
 * ```ts snippet:ReadmeSampleDeviceCodeCredential
 * import { DeviceCodeCredential } from "@azure/identity";
 *
 * const credential = new DeviceCodeCredential({
 *   tokenCachePersistenceOptions: {
 *     enabled: true,
 *   },
 * });
 *
 * // We'll use the Microsoft Graph scope as an example
 * const scope = "https://graph.microsoft.com/.default";
 *
 * // Print out part of the access token
 * console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
 * ```
 */
export declare const cachePersistencePlugin: IdentityPlugin;
//# sourceMappingURL=index.d.ts.map