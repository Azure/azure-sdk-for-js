# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- export function createSynonymMapFromFile(name: string, filePath: string): Promise<SynonymMap>;
+ export function createSynonymMapFromFile(_name: string, _filePath: string): Promise<SynonymMap>;
```