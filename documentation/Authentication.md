# Authentication

All service APIs require authentication via a `credentials` object when being
instantiated. There are three ways of authenticating and creating the required
`credentials` via the SDK: basic authentication, interactive login, and service
principal authentication.

## Basic Authentication

Simply provide your username and password to authenticate with the API using your
Azure account. It is encouraged that your username and password be stored in
environment variables rather than in the source code for your project.

```js
const Azure = require('azure');
const MsRest = require('ms-rest-azure');

MsRest.loginWithUsernamePassword(process.env.AZURE_USER, process.env.AZURE_PASS, (err, credentials) => {
  if (err) throw err;

  let storageClient = Azure.createStorageManagementClient(credentials, 'subscription-id');

  // ..use the client instance to manage service resources.
});
```

## Interactive login

Interactive login will provide a link and a code that will allow the user to
authenticate from a browser. Use this method when multiple accounts are used by
the same script or when user intervention is preferred.

```js
const Azure = require('azure');
const MsRest = require('ms-rest-azure');

MsRest.interactiveLogin((err, credentials) => {
  if (err) throw err;

  let storageClient = Azure.createStorageManagementClient(credentials, 'subscription-id');

  // ..use the client instance to manage service resources.
});
```

### For azure-graph sdk

One needs to set the tokenAudience to 'graph' and provide the tenantId in the options object.
```javascript
const AzureGraphClient = require('azure-graph');
const MsRestAzure = require('ms-rest-azure');

const options = {
  tokenAudience: 'graph',
  domain: '<tenantId>' 
};

MsRestAzure.interactiveLogin(options, (err, credentials) => {
  if (err) throw err;

  let graphClient = AzureGraphClient(credentials, '<tenantId>');

  // ..use the client instance to manage service resources.
});
```

## Service Principal Authentication

Interactive login, similar to how the CLI authenticates, is the easiest way to
authenticate; however, when using the Node.js SDK programmatically, you may want
to use service principal authentication rather than providing your account
credentials. This essentially creates keys for your Azure Active Directory
account that you can provide to the SDK to authenticate rather than requiring
user intervention or username/password.

### Creating a Service Principal

There are three ways to create a Service Principal, the next sections will walk
you through each method.

#### 1. Azure Portal

Follow the steps outlined in the
[Azure Portal documentation](https://azure.microsoft.com/en-us/documentation/articles/resource-group-create-service-principal-portal/)
 to generate the necessary keys.

#### 2. Azure CLI

This method can be used with either the
[Azure CLI v2.0 (Python)](https://github.com/Azure/azure-cli) or the
[Azure Cross-Platform CLI (npm module)](https://github.com/Azure/azure-xplat-cli).

_using the Python Azure CLI v2.0 requires just one step_
```shell
$ az ad sp create-for-rbac
```

_Using the Node.js cross-platform CLI requires additional steps for setting up
roles_
```shell
$ azure login # or $ azure login -u user@domain.tld
$ azure ad sp create -n sp-name -p sp-password
```

This will create a new Service Principal and output the keys, copy the output for
use in your script. Note: you can retrieve the keys later by running
`$ azure ad sp list` in your terminal.

The important fields are marked below (the other required field is the password
that was provided when creating the service principal)

```shell
+ Creating application sp-name
+ Creating service principal for application **56894bd4-0fde-41d8-a0d7-5bsslccety2**
data:    Object Id:               weewrerer-e329-4e9b-98c6-7878787
data:    Display Name:            sp-name
data:    Service Principal Names:
data:                             **56894bd4-0fde-41d8-a0d7-5bsslccety2**
data:                             https://sp-name
info:    ad sp create command OK
```

Next, you'll need to assign a role to the service principal that was just
created. You can get a list of available roles by running `$ azure role list`

_In this example we are creating the service principal as a Contributor at the
subscription level. A contributor role looks like this in the list_
```
data:    Name             : Contributor
data:    Actions          : 0=*
data:    NotActions       : 0=Microsoft.Authorization/*/Delete, 1=Microsoft.Authorization/*/Write
data:    IsCustom         : false
```

This will associate the service principal to your current subscription. Use the
service principal that was returned in the `create` step for the `--spn` option.

```shell
$ azure role assignment create --spn 56894bd4-0fde-41d8-a0d7-5bsslccety2 -o Contributor
info:    Executing command role assignment create
+ Finding role with specified name
data:    RoleAssignmentId     : /subscriptions/abcdefgh-1234-4cc9-89b5-12345678/providers/Microsoft.Authorization/roleAssignments/987654-ea85-40a5-80c2-abcdferghtt
data:    RoleDefinitionName   : Contributor
data:    RoleDefinitionId     : jhfskjf-6180-42a0-ab88-5656eiu677e23e
data:    Scope                : /subscriptions/abcdefgh-1234-4cc9-89b5-12345678
data:    Display Name         : sp-name
data:    SignInName           :
data:    ObjectId             : weewrerer-e329-4e9b-98c6-7878787
data:    ObjectType           : ServicePrincipal
data:
+
info:    role assignment create command OK
```

The service principal can now be used to log in.
```shell
$ azure login -u 56894bd4-0fde-41d8-a0d7-5bsslccety2 -p P@ssw0rd --tenant <a guid OR your domain(contosocorp.com)> --service-principal
info:    Executing command login
info:    Added subscription TestSubscription
+
info:    login command OK
```

#### 3. SDK

Run the [Service Principal creation script](./ServicePrincipal) to
programmatically create a service principal.


### Using the Service Principal

Now you can use the Service Principal keys to authenticate in the SDK.

```js
const Azure = require('azure');
const MsRest = require('ms-rest-azure');

MsRest.loginWithServicePrincipalSecret(
  'clientId or appId',
  'secret or password',
  'domain or tenantId',
  (err, credentials) => {
    if (err) throw err

    let storageClient = Azure.createStorageManagementClient(credentials, 'subscription-id');

    // ..use the client instance to manage service resources.
  }
);
```

### For azure-graph sdk

One needs to set the tokenAudience to 'graph' and provide the tenantId in the options object.
```javascript
const AzureGraphClient = require('azure-graph');
const MsRestAzure = require('ms-rest-azure');

const options = {
  tokenAudience: 'graph',
  domain: '<tenantId>' 
};

MsRestAzure.loginWithServicePrincipalSecret(
  'clientId or appId',
  'secret or password',
  'domain or tenantId',
  options, 
  (err, credentials) => {
  if (err) throw err;

  let graphClient = AzureGraphClient(credentials, '<tenantId>');

  // ..use the client instance to manage service resources.
});
```
