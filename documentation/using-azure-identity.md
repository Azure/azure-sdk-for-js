# Using @azure/identity with the Microsoft Identity Platform (AAD v2)

This document intends to demystify the configuration and use of [Microsoft
identity
platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/),
also known as Azure Active Directory v2, with the Azure SDK libraries.
Microsoft identity platform implements the OAuth 2.0 and OpenID Connect
standards to provide authentication for users and services who may be granted
access to Azure services.

## Table of Contents

- [Getting Started](#getting-started)
- [Understanding the Credential Types](#understanding-the-credential-types)
- [Choosing a Credential Type](#choosing-a-credential-type)
- [Credential Types in @azure/identity](#credential-types-in-azureidentity)

## Getting Started

Any application that must support authentication through Microsoft identity
platform needs two things: a tenant and an app registration created for that
tenant.

A "tenant" is basically instance of Azure Active Directory associated with your
Azure account.  You can follow the instructions on [this quickstart
guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant)
to check if you have AAD tenant already or, if not, create one.

Once you have a tenant, you can create an app registration by following [this
quickstart
guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
Your app registration holds the configuration for how your application will
authenticate users and services, so it's very important to make sure that you
have it set up correctly before using any of the credential types below.  The
section on each credential will indicate which configuration settings it needs
and how to use them.

### Should my App be Single or Multi Tenant?

One decision you will need to make up front when creating an app registration is
whether your application will be single or multi-tenant, and more importantly,
if the multi-tenant app registration also supports personal Microsoft accounts.

The primary deciding factor is whether your application will be used only by
users and services inside of your AAD tenant or if it's valuable to other
organizations and individuals as well.

The [app registration quickstart
guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#register-a-new-application-using-the-azure-portal)
gives a helpful breakdown for the various tenancy options in the "Supported
account types" documentation.

You can easily change your application from single to multi-tenant and vice
versa after it is created, but you cannot currently change it to support
personal Microsoft accounts if it was created without that option set.

## Understanding the Credential Types

Microsoft identity platform provides a variety of authentication flows that
serve different use cases and application types.  A primary differentiator
between these flows is whether the "client" that initiates the flow is running
on a user device or on a system managed by the application developer (like a web
server).  The [Microsoft Authentication
Library](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-client-applications)
documentation describes this distinction as _public_ versus _confidential_
clients.

Most of the credential types are strictly public or confidential as they serve a
specific purpose, like authenticating a backend service for use with storage
APIs.  Some credentials may be both public or confidential depending on how you
configure them.  For example, the [authorization code
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
can be initiated from a mobile application _or_ from within a web application
running in a server.

## Choosing a Credential Type

Here's a high level decision tree to help with choosing an appropriate
credential for your application:

- **Is the application deployed to a server?**

  - **Do you want to avoid entering credentials directly in your code or
    environment variables?**

    - If so, use the `ManagedIdentityCredential`.

    - If this isn't a concern, use the `EnvironmentCredential`.

- **Is the application deployed to a user device or running in the browser?**

  - **Can the user's device display an authentication site in a browser window
    or web control?**

    - If so, use the `AuthenticationCodeCredential` or
      `InteractiveBrowserCredential`.

    - If not, use the `DeviceCodeCredential`.

- **Are you developing an application on your local machine?**

  - Use the `DefaultAzureCredential`.

## Credential Types in @azure/identity

### ClientSecretCredential and ClientCertificateCredential

The `ClientSecretCredential` implements the [client credentials
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
to enable confidential clients, like web services, to access Azure resources.
To use this credential, you will need to create a client secret using the
"Certificates & secrets" page for your app registration.

The `ClientCertificateCredential` implements the same client credentials flow,
but instead uses a certificate as the means to authenticate the client. You must
must generate your own PEM-formatted certificate for use in this flow and then
[register
it](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#register-your-certificate-with-azure-ad)
in the "Certificates & secrets" page for your app registration. Using a
certificate to authenticate is recommended as it is generally more secure than
using a client secret.

> NOTE: At this time, @azure/identity only supports PEM files that are **not**
> password protected.

For both of these credentials, `tenantId` and `clientId` are required parameters.
The `clientSecret` or `certificatePath` parameters are also required depending
on which credential you are using.

### UsernamePasswordCredential

The `UsernamePasswordCredential` follows the [resource owner password credential
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth-ropc)
to authenticate public or confidential clients.  To use this credential, you
will need the `tenantId` and `clientId` of your app and a `username` and
`password` of the user you are authenticating.

This credential type supports multi-tenant app registrations so you may pass
`organizations` as the `tenantId` to enable users from any organizational tenant
to authenticate.

Generally speaking, we *do not* recommend using this credential type when other
more secure credential types are available.  Handling the user's password
directly is a major security risk.

> NOTE: This credential type does not work with personal Microsoft accounts at
> this time.  See the
> [documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth-ropc)
> for more information.

### EnvironmentCredential

The `EnvironmentCredential` looks for well-known environment variable names to
determine how it should authenticate.  It effectively acts as a wrapper for the
`ClientSecretCredential`, `ClientCertificateCredential` or
`UsernamePasswordCredential` depending on which environment variables are
present.

This credential is meant to be used either on the developer's local machine or
in applications that are deployed to Azure in VMs, App Service, Functions,
Containers, etc.

In all cases, the `AZURE_TENANT_ID` and `AZURE_CLIENT_ID` environment variables
are expected to be present to use this credential as they identify your
application.  The following environment variables will then be tried in order:

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
more](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities).

One important distinction of this credential compared to the others is that it
_does not require an app registration_.  This authentication scheme relates to
the actual Azure resources to which your code is deployed rather than the
application itself.

To enable your application to authenticate with this credential, you will need
to grant one of two types of managed identity to the resource that runs your
code:

- A [system-assigned
  identity](https://docs.microsoft.com/en-us/azure/app-service/overview-managed-identity#adding-a-system-assigned-identity)
  which uniquely identifies your resource
- A [user-assigned
  identity](https://docs.microsoft.com/en-us/azure/app-service/overview-managed-identity#adding-a-user-assigned-identity)
  which can be assigned to your resource (and others)

Once your resource has an identity assigned, that identity can be granted access
to other Azure services through role assignments.

If you have configured your resource to use a system-assigned identity, you can
just create an instance of `ManagedIdentityCredential` without any
configuration.  For user-assigned identities, you must provide the `clientId` of
the managed identity you wish to use for authentication.

More information on configuring and using managed identities can be found in the
[Managed identities for Azure
resources](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview)
documentation.  There is also a [list of Azure
services](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/services-support-managed-identities#azure-services-that-support-azure-ad-authentication)
that have been tested to confirm support for managed identity authentication.

### InteractiveBrowserCredential

The `InteractiveBrowserCredential` follows the [implicit grant
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow)
which enables authentication for clients that run completely in the browser.  It
is primarily useful for single-page web applications (SPAs) which need to
authenticate to access Azure resources and APIs directly.

TODO: redirect_uri

> NOTE: At this time, this credential can only be used in the browser but
> Node.js support will be added in the future (see issue [#4774](https://github.com/Azure/azure-sdk-for-js/issues/4774)).

### DeviceCodeCredential

The `DeviceCodeCredential` follows the [device code authorization
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-device-code)
which enables input-constrained devices, like TVs or IoT devices, to
authenticate by having the user enter a provided "device code" into an
authorization site that the user visits on another device.

### AuthenticationCodeCredential

The `AuthenticationCodeCredential` follows the [authorization code
flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
which enables server-hosted web applications, native desktop and mobile
applications, and web APIs to access resources on the user's behalf.

TODO: redirect_uri

### DefaultAzureCredential

The `DefaultAzureCredential` is meant to be used by developers who are writing
applications on their local machine.  It is a specialization of the
`ChainedTokenCredential` which tries each of the following credential types in
order until one of them succeeds:

- `EnvironmentCredential`
- `ManagedIdentityCredential`

More credential types will be added to this list in the future.

## Access Policies, Roles, and Consent

https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#troubleshooting-permissions-and-consent
