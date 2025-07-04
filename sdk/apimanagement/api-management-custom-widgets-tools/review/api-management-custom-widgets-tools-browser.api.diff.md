# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- // @public
+ // @public (undocumented)
- export function deployNodeJS(serviceInformation: ServiceInformation, name: string, fallbackConfigPath?: string, { rootLocal, interactiveBrowserCredentialOptions, }?: DeployConfig): Promise<void>;
+ export function deployNodeJS(_serviceInformation: unknown, _name: string, _fallbackConfigPath: string): Promise<void>;
```