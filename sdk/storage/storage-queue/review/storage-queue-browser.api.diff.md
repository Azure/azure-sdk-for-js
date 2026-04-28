# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -10,9 +10,9 @@
 import { AzureLogger } from '@azure/logger';
 import { BaseRequestPolicy } from '@azure/storage-common';
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
-import { Credential } from '@azure/storage-common';
+import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
 import { CredentialPolicyCreator } from '@azure/storage-common';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
@@ -108,9 +108,9 @@
     exposedHeaders: string;
     maxAgeInSeconds: number;
 }
 
-export { Credential }
+export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
 export { CredentialPolicyCreator }

```