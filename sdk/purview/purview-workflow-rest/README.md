# Azure Purview Workflow Rest-Level client library for JavaScript

Workflows are automated, repeatable business processes that users can create within Microsoft Purview to validate and orchestrate CUD (create, update, delete) operations on their data entities. Enabling these processes allow organizations to track changes, enforce policy compliance, and ensure quality data across their data landscape.

Use the client library for Purview Workflow to:

- Manage workflows
- Submit user requests and monitor workflow runs
- View and respond to workflow tasks

**For more details about how to use workflow, please refer to the [service documentation][product_documentation]**

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- You must have an [Azure subscription][azure_subscription] and a [Purview resource][purview_resource] to use this package.

### Create and authenticate a `PurviewWorkflowClient`

Since the Workflow service uses an Azure Active Directory (AAD) bearer token for authentication and identification, an email address should be encoded into the token to allow for notification when using Workflow. It is recommended that the [Azure Identity][azure_identity] library be used  with a the [UsernamePasswordCredential][username_password_credential]. Before using the [Azure Identity][azure_identity] library with Workflow, [an application][app_registration] should be registered and used for the clientId passed to the [UsernamePasswordCredential][username_password_credential].
Set the values of the client ID, tenant ID, username and password as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, USERNAME, PASSWORD

```typescript
import PurviewWorkflow from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"];
const tenantId = process.env["AZURE_TENANT_ID"];
const clientId = process.env["AZURE_CLIENT_ID"];
const username = process.env["USERNAME"];
const password = process.env["PASSWORD"];
const client = PurviewWorkflow(
  endpoint,
  new UsernamePasswordCredential(
        tenantId,
        clientId,
        username,
        password
      )
  );
```

## Examples

The following section provides several code snippets covering some of the most common scenarios, including:

- [Submit User Requests](#submit-user-requests)
- [Approve Workflow Task](#approve-workflow-task)

### Submit user requests

```typescript
import createPurviewWorkflowClient, {
  UserRequestsSubmitParameters
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

async function userRequestsSubmit() {
  const endpoint = process.env["ENDPOINT"];
  const tenantId = process.env["AZURE_TENANT_ID"];
  const clientId = process.env["AZURE_CLIENT_ID"];
  const username = process.env["USERNAME"];
  const password = process.env["PASSWORD"];

  const credential = new UsernamePasswordCredential(tenantId , clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const options: UserRequestsSubmitParameters = {
    body: {
      comment: "Thanks!",
      operations: [
        {
          type: "CreateTerm",
          payload: {
            glossaryTerm: {
              name: "term",
              anchor: { glossaryGuid: "20031e20-b4df-4a66-a61d-1b0716f3fa48" },
              nickName: "term",
              status: "Approved"
            }
          }
        }
      ]
    }
  };
  const result = await client.path("/userrequests").post(options);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(result);
}

userRequestsSubmit().catch(console.error);
```

### Approve workflow task

```typescript
// This taskId represents an existing workflow task. The id can be obtained by calling GET /workflowtasks API.
import createPurviewWorkflowClient, {
  UserRequestsSubmitParameters
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();
async function approvalTaskApprove() {
  const endpoint = process.env["ENDPOINT"];
  const tenantId = process.env["AZURE_TENANT_ID"];
  const clientId = process.env["AZURE_CLIENT_ID"];
  const username = process.env["USERNAME"];
  const password = process.env["PASSWORD"];
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const options: ApprovalApproveParameters = {
    body: { comment: "Thanks for raising this!" }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/approve-approval", taskId)
    .post(options);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(result);
}

approvalTaskApprove().catch(console.error);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

<!-- LINKS -->
[product_documentation]: https://learn.microsoft.com/azure/purview/concept-workflow
[azure_subscription]: https://azure.microsoft.com/free/dotnet/
[purview_resource]: https://docs.microsoft.com/azure/purview/create-catalog-portal
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#readme
[app_registration]: https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app
[username_password_credential]: https://learn.microsoft.com/javascript/api/@azure/identity/usernamepasswordcredential?view=azure-node-latest
