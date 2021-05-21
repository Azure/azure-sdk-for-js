// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Management-plane libraries currently do not support authentication using
 * the `@azure/identity` package. However, there is an adapter that can be used
 * to add support for it without introducing breaking changes. This script
 * enables this adapter in a management-plane library.
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
  if (!matches || matches.length < 2) {
    throw new Error(`Could not find ${search} in ${location}`);
  } else {
    return matches[1];
  }
}

function updateREADME(mainModule, relativePath, namespace) {
  return function(content) {
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

    const operation = getMatch(
      content.match(/client\.(.+?)\(.*\).*$/ms),
      "operation",
      "README file"
    );

    const operationHeader = operation
      .split(".")
      .reverse()
      .join(" ");

    return `## Azure ${clientName} SDK for JavaScript

This package contains an isomorphic SDK (runs both in node.js and in browsers) for ${clientName}.

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### Prerequisites

You must have an [Azure subscription](https://azure.microsoft.com/free/).

### How to install

To use this SDK in your project, you will need to install two packages.
- \`${pkgName}\` that contains the client.
- \`@azure/identity\` that provides different mechanisms for the client to authenticate your requests using Azure Active Directory.

Install both packages using the below command:
\`\`\`bash
npm install --save ${pkgName} @azure/identity
\`\`\`

> **Note**: You may have used either \`@azure/ms-rest-nodeauth\` or \`@azure/ms-rest-browserauth\` in the past. These packages are in maintenance mode receiving critical bug fixes, but no new features.
If you are on a [Node.js that has LTS status](https://nodejs.org/about/releases/), or are writing a client side browser application, we strongly encourage you to upgrade to \`@azure/identity\` which uses the latest versions of Azure Active Directory and MSAL APIs and provides more authentication options.

### How to use

- If you are writing a client side browser application, 
  - Follow the instructions in the section on Authenticating client side browser applications in [Azure Identity examples](https://aka.ms/azsdk/js/identity/examples) to register your application in the Microsoft identity platform and set the right permissions.
  - Copy the client ID and tenant ID from the Overview section of your app registration in Azure portal and use it in the browser sample below.
- If you are writing a server side application, 
    - [Select a credential from \`@azure/identity\` based on the authentication method of your choice](https://aka.ms/azsdk/js/identity/examples)
    - Complete the set up steps required by the credential if any.
    - Use the credential you picked in the place of \`DefaultAzureCredential\` in the Node.js sample below.

In the below samples, we pass the credential and the Azure subscription id to instantiate the client.
Once the client is created, explore the operations on it either in your favorite editor or in our [API reference documentation](https://docs.microsoft.com/javascript/api) to get started.

#### nodejs - Authentication, client creation, and ${operationHeader} as an example written in JavaScript.

##### Sample code

\`\`\`javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { ${clientName} } = require("${pkgName}");
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

// Use \`DefaultAzureCredential\` or any other credential of your choice based on https://aka.ms/azsdk/js/identity/examples
// Please note that you can also use credentials from the \`@azure/ms-rest-nodeauth\` package instead.
const creds = new DefaultAzureCredential();
const client = new ${clientName}(creds, subscriptionId);
const resourceGroupName = "testresourceGroupName";
const resourceName = "testresourceName";
client.${operation}(resourceGroupName, resourceName).then((result) => {
  console.log("The result is:");
  console.log(result);
}).catch((err) => {
  console.log("An error occurred:");
  console.error(err);
});
\`\`\`

#### browser - Authentication, client creation, and ${operationHeader} as an example written in JavaScript.

In browser applications, we recommend using the \`InteractiveBrowserCredential\` that interactively authenticates using the default system browser.
  - See [Single-page application: App registration guide](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) to configure your app registration for the browser.
  - Note down the client Id from the previous step and use it in the browser sample below.

##### Sample code

- index.html

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${pkgName} sample</title>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/identity/dist/index.js"></script>
    <script src="node_modules/${pkgName}/${mainModule}"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      // Create credentials using the \`@azure/identity\` package.
      // Please note that you can also use credentials from the \`@azure/ms-rest-browserauth\` package instead.
      const credential = new InteractiveBrowserCredential(
      {
        clientId: "<client id for your Azure AD app>",
        tenantId: "<optional tenant for your organization>"
      });
      const client = new ${namespace}.${clientName}(creds, subscriptionId);
      const resourceGroupName = "testresourceGroupName";
      const resourceName = "testresourceName";
      client.${operation}(resourceGroupName, resourceName).then((result) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/${relativePath}/README.png)
`;
  };
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

function getSourceFiles(path) {
  let clientFile = undefined;
  let contextFile = undefined;
  const files = fs.readdirSync(p.join(path, "src"));
  for (const file of files) {
    const match = file.match(/(.+?)Context.ts/);
    if (match !== undefined && match !== null) {
      contextFile = p.join(p.join(path, "src"), file);
      clientFile = p.join(p.join(path, "src"), `${match[1]}.ts`);
      break;
    }
  }
  if (clientFile === undefined || !fs.existsSync(clientFile))
    throw new Error(`Could not find the src/*.ts file`);
  if (contextFile === undefined) throw new Error(`Could not find the src/*Context.ts file`);
  return {
    clientFile: clientFile,
    contextFile: contextFile
  };
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

function getPackageVersion(content) {
  const versionMatch = content.match(/"version": "(\d+).(\d+).\d+",/ms);
  if (versionMatch.length != 3) {
    throw new Error("Could not parse the version in package.json");
  }
  return `${versionMatch[1]}.${(parseInt(versionMatch[2]) + 1).toString()}.0`;
}

function getMainModule(content) {
  return getMatch(content.match(/"main": "(?:\.\/)(.+?)",/ms), "main module", "package.json");
}

function getPackageInfo(packageJsonPath) {
  const content = fs.readFileSync(packageJsonPath, "utf-8");
  return {
    newPackageVersion: getPackageVersion(content),
    mainModule: getMainModule(content)
  };
}

function getNamespace(rollupConfigPath) {
  const content = fs.readFileSync(rollupConfigPath, "utf-8");
  return getMatch(content.match(/name: "(.+?)",/ms), "namespace", "rollup.config.js");
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(
      "Expected exactly one command-line argument for the path of the package to be updated"
    );
  }
  const path = args[2];
  const packageJsonPath = p.join(path, "package.json");
  const { newPackageVersion, mainModule } = getPackageInfo(packageJsonPath);
  const relativePkgPath = path
    .replace(/\/$/, "")
    .split("/")
    .slice(-3)
    .join("/");
  const namespace = getNamespace(p.join(path, "rollup.config.js"));
  const { contextFile, clientFile } = getSourceFiles(path);
  rewriteFile(p.join(path, "README.md"), updateREADME(mainModule, relativePkgPath, namespace));
  rewriteFile(packageJsonPath, updatePackageJson(newPackageVersion));
  rewriteFile(clientFile, updateClient);
  rewriteFile(contextFile, updateClientContext(newPackageVersion));
}

main(process.argv);
