# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -15,9 +15,9 @@
 import type { ContainerUndeleteResponse } from '@azure/storage-blob';
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
-import { Credential } from '@azure/storage-common';
+import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
 import { CredentialPolicyCreator } from '@azure/storage-common';
 import { ServiceGetPropertiesResponse as DataLakeServiceGetPropertiesResponse } from '@azure/storage-blob';
 import { BlobServiceProperties as DataLakeServiceProperties } from '@azure/storage-blob';
@@ -276,9 +276,9 @@
     encryptionKey?: string;
     encryptionKeySha256?: string;
 }
 
-export { Credential }
+export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
 export { CredentialPolicyCreator }

```