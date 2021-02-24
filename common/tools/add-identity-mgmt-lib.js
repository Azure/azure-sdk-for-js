// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Management-plane libraries currently do not support authentication using
 * the `@azure/identity` package. However, there is an adapter that can be used
 * to add support for it without introducing breaking changes. This script
 * enables this adapter in an management-plane library.
 */

const fs = require("fs");
const p = require("path");

function rewriteFile(path, f) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) throw err;
    fs.writeFile(path, f(data), "utf-8", function(err) {
      if (err) throw err;
      console.log(`${p.basename(path)} has been updated`);
    });
  });
}

function getMatch(matches, search, location) {
  if (matches.length < 2) {
    throw new Error(`Could not find ${search} in ${location}`);
  } else {
    return matches[1];
  }
}

function updateREADME(content) {
  const pkgName = getMatch(
    content.match(/.+?npm install (@azure\/.+?)$.*/ms),
    "package name",
    "README file"
  );
  const clientName = getMatch(
    content.match(/## Azure (.+?) SDK for JavaScript$.*/ms),
    "client name",
    "README file"
  );

  return `## Azure ${clientName} SDK for JavaScript

This package contains an isomorphic SDK (runs both in node.js and in browsers) for ${clientName}.

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### How to install

To use this SDK in your project, you will need to install two packages.
- \`${pkgName}\` that contains the client.
- \`@azure/identity\` that contains different credentials for you to authenticate the client using Azure Active Directory.

Install both packages using the below commands.
\`\`\`bash
npm install ${pkgName}
npm install @azure/identity
\`\`\`
Please note that while the credentials from the older [\`@azure/ms-rest-nodeauth\`](https://www.npmjs.com/package/@azure/ms-rest-nodeauth) and [\`@azure/ms-rest-browserauth\`](https://www.npmjs.com/package/@azure/ms-rest-browserauth) packages are still supported, these packages are in maintenance mode receiving critical bug fixes, but no new features.
We strongly encourage you to use the credentials from \`@azure/identity\` where the latest versions of Azure Active Directory and MSAL APIs are used and more authentication options are provided.

### How to use

There are multiple credentials available in the \`@azure/identity\` package to suit your different authentication needs.
Read about them in detail in [readme for @azure/identity package](https://www.npmjs.com/package/@azure/identity).
To get started you can use the [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#defaultazurecredential) which tries different credentials internally until one of them succeeds.
Most of the credentials would require you to [create an Azure App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals#application-registration) first.
#### nodejs - Authentication, client creation, and get apps as an example written in JavaScript.

##### Sample code

\`\`\`javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { IotCentralClient } = require("@azure/arm-iotcentral");
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

// Create credentials using the \`@azure/identity\` package.
// Please note that you can also use credentials from the \`@azure/ms-rest-nodeauth\` package instead.
const creds = new DefaultAzureCredential();
const client = new IotCentralClient(creds, subscriptionId);
const resourceGroupName = "testresourceGroupName";
const resourceName = "testresourceName";
client.apps.get(resourceGroupName, resourceName).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.log("An error occurred:");
  console.error(err);
});
\`\`\`

#### browser - Authentication, client creation, and get apps as an example written in JavaScript.

In browser applications, we recommend using the \`InteractiveBrowserCredential\` that interactively authenticates using the default system browser.
It is necessary to [create an Azure App Registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the portal for your web application first.

##### Sample code

- index.html

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/arm-iotcentral sample</title>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/identity/dist/index.js"></script>
    <script src="node_modules/@azure/arm-iotcentral/dist/arm-iotcentral.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      // Create credentials using the \`@azure/identity\` package.
      // Please note that you can also use credentials from the \`@azure/ms-rest-browserauth\` package instead.
      const credential = new InteractiveBrowserCredential(
      {
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      const client = new Azure.ArmIotcentral.IotCentralClient(creds, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const resourceName = "testresourceName";
      client.apps.get(resourceGroupName, resourceName).then((result) => {
        console.log("The result is:");
        console.log(result);
      }).catch((err) => {
        console.log("An error occurred:");
        console.error(err);
      });
    </script>
  </head>
  <body></body>
</html>
\`\`\`

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/iotcentral/arm-iotcentral/README.png)
`;
}

function updatePackageJson(newPackageVersion) {
  return function(content) {
    return content
      .replace(/"version": "\d+.\d+.\d+",/ms, `"version": "${newPackageVersion}",`)
      .replace(/"@azure\/ms-rest-azure-js": "\^?(\d+).\d+.\d+"/ms, function(match, major) {
        return major === "1"
          ? '"@azure/ms-rest-azure-js": "^1.4.0"'
          : '"@azure/ms-rest-azure-js": "^2.1.0"';
      })
      .replace(/"@azure\/ms-rest-js": "\^?(\d+).\d+.\d+"/ms, function(match, major) {
        return (
          (major === "1" ? '"@azure/ms-rest-js": "^1.11.0"' : '"@azure/ms-rest-js": "^2.2.0"') +
          ',\n    "@azure/core-auth": "^1.1.4"'
        );
      })
      .replace(/"typescript": ".+?"/ms, '"typescript": "^3.6.0"');
  };
}

function getClientFilePath(path) {
  const files = fs.readdirSync(p.join(path, "src"));
  for (const file of files) {
    if (file.match(/.+?Client.ts/)) {
      return p.join("src", file);
    }
  }
  throw new Error(`Could not find the src/*Client.ts file`);
}

function getClientContextFilePath(path) {
  const files = fs.readdirSync(p.join(path, "src"));
  for (const file of files) {
    if (file.match(/.+?ClientContext.ts/)) {
      return p.join("src", file);
    }
  }
  throw new Error(`Could not find the src/*ClientContext.ts file`);
}

function updateClient(content) {
  const newCredComment = `@param credentials Credentials needed for the client to connect to Azure. Credentials
   * implementing the TokenCredential interface from the @azure/identity package are recommended. For
   * more information about these credentials, see
   * {@link https://www.npmjs.com/package/@azure/identity}. Credentials implementing the
   * ServiceClientCredentials interface from the older packages @azure/ms-rest-nodeauth and
   * @azure/ms-rest-browserauth are also supported.`;
  return content
    .replace(
      /^import \* as msRest from "@azure\/ms-rest-js";/ms,
      'import * as msRest from "@azure/ms-rest-js";\nimport { TokenCredential } from "@azure/core-auth";'
    )
    .replace(/ServiceClientCredentials/gms, "ServiceClientCredentials | TokenCredential")
    .replace(
      /@param credentials Credentials needed for the client to connect to Azure./ms,
      newCredComment
    );
}

function updateClientContext(newPackageVersion) {
  return function(content) {
    return updateClient(content).replace(
      /const packageVersion = "\d+\.\d+\.\d+";/,
      `const packageVersion = "${newPackageVersion}";`
    );
  };
}

function getPackageVersion(packageJsonPath) {
  const data = fs.readFileSync(packageJsonPath, "utf-8");
  const versionMatch = data.match(/"version": "(\d+).(\d+).\d+",/ms);
  return `${versionMatch[1]}.${(parseInt(versionMatch[2]) + 1).toString()}.0`;
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(
      "Expected exactly one command-line argument for the path of the package to be updated"
    );
  }
  const path = args[2];
  const packageJsonPath = p.join(path, "package.json");
  const newPackageVersion = getPackageVersion(packageJsonPath);
  rewriteFile(p.join(path, "README.md"), updateREADME);
  rewriteFile(p.join(path, "package.json"), updatePackageJson(newPackageVersion));
  rewriteFile(p.join(path, getClientFilePath(path)), updateClient);
  rewriteFile(p.join(path, getClientContextFilePath(path)), updateClientContext(newPackageVersion));
}

main(process.argv);
