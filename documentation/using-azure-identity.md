# Using @azure/identity with the Microsoft Identity Platform (AAD v2)

This document intends to demystify the configuration and use of [Microsoft
identity
platform](https://docs.microsoft.com/azure/active-directory/develop/),
also known as Azure Active Directory v2, with the Azure SDK libraries.
Microsoft identity platform implements the [OAuth 2.0 and OpenID Connect
standards](https://docs.microsoft.com/azure/active-directory/develop/active-directory-v2-protocols)
to provide authentication for users and services who may be granted access to
Azure services.

## Table of Contents

- [Getting Started](#getting-started)
- [Understanding the Credential Types](#understanding-the-credential-types)
- [Choosing a Credential Type](#choosing-a-credential-type)
- [Permissions and Consent](#permissions-and-consent)
- [Credential Types in @azure/identity](#credential-types-in-azureidentity)

## Getting Started

Any application that must support authentication through Microsoft identity
platform needs two things: a tenant and an app registration created for that
tenant.

A "tenant" is basically instance of Azure Active Directory associated with your
Azure account. You can follow the instructions on [this quick start guide for
setting up a
tenant](https://docs.microsoft.com/azure/active-directory/develop/quickstart-create-new-tenant)
to check if you have AAD tenant already or, if not, create one.

Once you have a tenant, you can create an app registration by following [this
quickstart guide for app
registrations](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app).
Your app registration holds the configuration for how your application will
authenticate users and services, so it's very important to it set up correctly
before using any of the credential types below. The section on each credential
will indicate which configuration settings it needs and how to use them.

### Should my App be Single or Multi Tenant?

One decision you will need to make up front when registering your app is whether
it will be single or multi-tenant, and more importantly, if the multi-tenant app
registration also supports personal Microsoft accounts. The primary deciding
factor is whether your application will be used only by users and services
inside of your AAD tenant or if you'd like other organizations and individuals
to use it.

The [app registration quickstart
guide](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app#register-a-new-application-using-the-azure-portal)
gives a helpful breakdown for the various tenancy options in the "Supported
account types" documentation.

You can easily change your application from single to multi-tenant and vice
versa after it is created, but you cannot currently change it to support
personal Microsoft accounts after it's already created.

## Understanding the Credential Types

Microsoft identity platform provides a variety of authentication flows that
serve different use cases and application types. A primary differentiator
between these flows is whether the "client" that initiates the flow is running
on a user device or on a system managed by the application developer (like a web
server). The [Microsoft Authentication
Library](https://docs.microsoft.com/azure/active-directory/develop/msal-client-applications)
documentation describes this distinction as _public_ versus _confidential_
clients.

Most of the credential types are strictly public or confidential as they serve a
specific purpose, like authenticating a backend service for use with storage
APIs. Some credentials may be both public or confidential depending on how you
configure them. For example, the [authorization code
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow)
can be initiated from a mobile application _or_ from within a web application
running in a server.

## Choosing a Credential Type

Here's a high level decision tree to help with choosing an appropriate
credential for your application:

- **Is the application deployed to a server?**

  - **Do the Azure services you want to use support authentication with managed identities?**

    - If so, use the `ManagedIdentityCredential`

    - If not, use the `EnvironmentCredential`

  - **Do you want your application to pick the appropriate credential type based on the
    environment?**

        - Use the `DefaultAzureCredential`

- **Is the application deployed to a user device or running in the browser?**

  - **Can the user's device display an authentication site in a browser window
    or web control?**

    - If so, use the `AuthorizationCodeCredential` or
      `InteractiveBrowserCredential`

    - If not, use the `DeviceCodeCredential`

## Permissions and Consent

The identity platform provides an authorization model for Azure services with
[two types of
permissions](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#troubleshooting-permissions-and-consent):

- **Application permissions** authorize an application to access resources
  directly. Administrator consent must be granted to your application.
- **Delegated permissions** authorize an application to access resources on
  behalf of a specific user. The user may grant permission to your application
  unless the permission requires administrator consent.

If you are only using _confidential credentials_ you should only need to be
concerned with application permissions. If you will be authenticating users
with a _public credential_, you must configure API permissions for the Azure
service you need to access (Key Vault, Storage, etc) so that user accounts can
be authorized to use them through your application. The [quick start guide for
configuring API
permissions](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis)
explains how to do this in detail.

### User-Granted Consent

When a user is being authenticated to access a service that is configured with
delegated permissions, they may be presented with a consent screen that asks
whether they want to grant your application permission to access resources on
their behalf. An example of this consent flow can be found in the [consent
framework documentation
page](https://docs.microsoft.com/azure/active-directory/develop/consent-framework).

An administrator can also grant consent for your application on behalf of all
users. In this case, users may never see a consent screen. If you'd like to
make it easy for an administrator to grant access to all users, follow the
instructions in the [admin consent endpoint request
documentation](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#request-the-permissions-from-a-directory-admin).

There are some cases where a user may not be allowed to grant consent to an
application. When this occurs, the user may have to speak with an administrator
to have the permissions granted on their behalf. The [user consent
troubleshooting
page](https://docs.microsoft.com/azure/active-directory/manage-apps/application-sign-in-unexpected-user-consent-error)
provides more details on the consent errors a user might encounter.

## Credential Types in @azure/identity

### ClientSecretCredential and ClientCertificateCredential

The `ClientSecretCredential` implements the [client credentials
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
to enable confidential clients, like web services, to access Azure resources.
To use this credential, you will need to create a client secret using the
"Certificates & secrets" page for your app registration.

The `ClientCertificateCredential` implements the same client credentials flow,
but instead uses a certificate as the means to authenticate the client. You must
must generate your own PEM-formatted certificate for use in this flow and then
[register
it](https://docs.microsoft.com/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad)
in the "Certificates & secrets" page for your app registration. Using a
certificate to authenticate is recommended as it is generally more secure than
using a client secret.

> NOTE: At this time, @azure/identity only supports PEM certificates that are
> **not** password protected.

For both of these credentials, `tenantId` and `clientId` are required parameters.
The `clientSecret` or `certificatePath` parameters are also required depending
on which credential you are using.

### UsernamePasswordCredential

The `UsernamePasswordCredential` follows the [resource owner password credential
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth-ropc)
to authenticate public or confidential clients. To use this credential, you
will need the `tenantId` and `clientId` of your app and a `username` and
`password` of the user you are authenticating.

Since this credential uses a user account to authenticate, the user or an
administrator will need to grant consent to your application before they can
successfully authenticate.

This credential type supports multi-tenant app registrations so you may pass
`organizations` as the `tenantId` to enable users from any organizational tenant
to authenticate.

Generally speaking, we _do not_ recommend using this credential type when other
more secure credential types are available. Handling the user's password
directly is a major security risk.

> NOTE: This credential type does not work with personal Microsoft accounts or
> multi-factor authentication at this time. See the
> [documentation](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth-ropc)
> for more information.

### EnvironmentCredential

The `EnvironmentCredential` looks for well-known environment variable names to
determine how it should authenticate. It effectively acts as a wrapper for the
`ClientSecretCredential`, `ClientCertificateCredential` or
`UsernamePasswordCredential` depending on which environment variables are
present.

This credential is meant to be used either on the developer's local machine or
in applications that are deployed to Azure in VMs, App Service, Functions,
Containers, etc.

In all cases, the `AZURE_TENANT_ID` and `AZURE_CLIENT_ID` environment variables
are expected to be present to use this credential as they identify your
application. The following environment variables will then be tried in order:

- `AZURE_CLIENT_SECRET` - A client secret to be used with
  `ClientSecretCredential`
- `AZURE_CLIENT_CERTIFICATE_PATH` - The path to a PEM-formatted certificate file
  in the deployment environment to be used with the
  `ClientCertificateCredential`
- `AZURE_USERNAME` and `AZURE_PASSWORD` - The username and password pair to be
  used with the `UsernamePasswordCredential`

Consult the documentation for the Azure service to which you deploy your
application to learn how to configure environment variables for your deployment.

### ManagedIdentityCredential

The `ManagedIdentityCredential` takes advantage of authentication endpoints that
are hosted within the virtual network of applications deployed to Azure virtual
machines, App Services, Functions, Container Services, [and
more](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities).

One important distinction of this credential compared to the others is that it
_does not require an app registration_. This authentication scheme relates to
the actual Azure resources to which your code is deployed rather than the
application itself.

To enable your application to authenticate with this credential, you will need
to grant one of two types of managed identity to the resource that runs your
code:

- A [system-assigned
  identity](https://docs.microsoft.com/azure/app-service/overview-managed-identity#adding-a-system-assigned-identity)
  which uniquely identifies your resource
- A [user-assigned
  identity](https://docs.microsoft.com/azure/app-service/overview-managed-identity#adding-a-user-assigned-identity)
  which can be assigned to your resource (and others)

Once your resource has an identity assigned, that identity can be granted access
to other Azure services through role assignments.

If you have configured your resource to use a system-assigned identity, you can
just create an instance of `ManagedIdentityCredential` without any
configuration. For user-assigned identities, you must provide the `clientId` of
the managed identity you wish to use for authentication.

More information on configuring and using managed identities can be found in the
[Managed identities for Azure
resources](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview)
documentation. There is also a [list of Azure
services](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities#azure-services-that-support-azure-ad-authentication)
that have been tested to confirm support for managed identity authentication.

### InteractiveBrowserCredential

The `InteractiveBrowserCredential` follows the [implicit grant
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
which enables authentication for clients that run completely in the browser. It
is primarily useful for single-page web applications (SPAs) which need to
authenticate to access Azure resources and APIs directly.

To use this credential successfully, your app registration will need to be
configured with both the **Access tokens** and **ID tokens** options checked under
**Implicit grant** in the **Authentication** page.

You will also need to add a redirect URI in the **Redirect URIs** section of the
**Authentication** page for your app registration. The redirect URI must point
to the URI of your web application. You must also make sure to specify the same
URI in the `redirectUri` field of the `InteractiveBrowserCredentialOptions` when
creating an `InteractiveBrowserCredential`.

> NOTE: At this time, this credential can only be used in the browser but
> Node.js support will be added in the future (see issue [#4774](https://github.com/Azure/azure-sdk-for-js/issues/4774)).

### DeviceCodeCredential

The `DeviceCodeCredential` follows the [device code authorization
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-device-code)
which enables input-constrained devices, like TVs or IoT devices, to
authenticate by having the user enter a provided "device code" into an
authorization site that the user visits on another device.

This credential is treated as a public client and must have the **Treat
application as a public client** setting enabled in the **Default client type**
section of the **Authentication** page of your app registration.

### AuthorizationCodeCredential

The `AuthorizationCodeCredential` follows the [authorization code
flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow)
which enables server-hosted web applications, native desktop and mobile
applications, and web APIs to access resources on the user's behalf.

This credential requires that the developer have an HTTP(S) endpoint exposed
which can receive the authentication response redirect. The URI at which you
host this endpoint must be added to the **Redirect URIs** list on the
**Authentication** page of your app registration. If you are developing
locally, you can also add a redirect URI for your development endpoint
(e.g. `http://localhost:8080/authresponse`).

A complete example of hosting your own authentication response endpoint can be
found in the [`authorization code manual test`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/test/manual/authorization-code-credential).

### DefaultAzureCredential

The `DefaultAzureCredential` is a specialization of the `ChainedTokenCredential`
which tries each of the following credential types in order until one of them
succeeds:

- `EnvironmentCredential`
- `ManagedIdentityCredential`

This credential type is ideal when one of the credentials in the chain will work
in the current environment, whether it's your local development or a production
server.

When you use this credential you will need to make sure that you've
properly configured your deployment environment to support one of the chained
credential types above otherwise authentication will fail.
