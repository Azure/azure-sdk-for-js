// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Server } from "http";

// NOTE: When using this code, you must change the module below to "@azure/identity"
import { AuthorizationCodeCredential } from "../src/credentials/authorizationCodeCredential";

// You will need to install these external dependencies with NPM:
import qs from "qs";
import open from "open";
import express from "express";

// This sample demonstrates how to use the AuthorizationCodeCredential,
// including the first part of the authorization code flow.  For this
// sample to work correctly, you must have an Azure Active Directory
// App Configuration configured with a redirect URI that matches the
// one used in this sample:
//
// http://localhost:8080/authresponse (port can be overridden with PORT env var)
//
// The user must also be able to grant access to the app for the resource
// requested in the specified scopes, Azure KeyVault in this case.  If
// the user cannot grant access to this resource due to administrator
// settings in the AAD tenant, one of the following errors will be displayed on
// the authorization page:
//
// https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-unexpected-user-consent-error

const port = process.env.PORT || 8080;
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const redirectUri = `http://localhost:${port}/authresponse`;
const authorityHost = "https://login.microsoftonline.com";
const scopes = "https://vault.azure.net/.default";

if (tenantId === undefined || clientId === undefined) {
  console.error("AZURE_TENANT_ID and AZURE_CLIENT_ID environment variables must be set");
  process.exit(1);
}

function getAuthorizeUrl(
  tenantId: string,
  clientId: string,
  scopes: string
): string {
  const queryParams = qs.stringify({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes
  });

  return `${authorityHost}/${tenantId}/oauth2/v2.0/authorize?${queryParams}`;
}

async function getCredential(): Promise<AuthorizationCodeCredential> {
  // Set up a temporary local endpoint that can wait for the
  // authentication redirect to be sent to the local redirect URI.
  const authCodePromise =
    new Promise<string>((resolve, reject) => {
      const app = express();
      let server: Server | undefined = undefined;

      app.get('/authresponse', (req, res) => {
        // Close the temporary server once we've received the redirect.
        res.sendStatus(200);
        if (server) {
          server.close();
        }

        // The redirect will either contain a "code" or an "error"
        const authorizationCode = req.query["code"];
        if (authorizationCode) {
          resolve(authorizationCode);
        } else {
          reject(new Error(`Authentication Error "${req.query["error"]}":\n\n${req.query["error_description"]}`));
        }
      });

      server = app.listen(
        port,
        () => console.log(`Authorization code redirect server listening on port ${port}`)
      );
    });

  // Direct the user to the authentication URI either by opening a
  // browser (desktop and mobile apps) or redirecting their browser
  // using a Location header (web apps and APIs).
  const authenticateUrl = getAuthorizeUrl(tenantId!, clientId!, scopes);
  console.log("Opening user's browser to URL:", authenticateUrl);
  await open(authenticateUrl);

  // Wait for the authorization response to be send to the redirect URI
  const authorizationCode = await authCodePromise;
  console.log("\nReceived authorization code:", authorizationCode);

  // Once we have the authorization code, the AuthorizationCodeCredential
  // can be created.  This credential will take care of requesting and
  // refreshing the access token from this point forward.
  return new AuthorizationCodeCredential(
    tenantId!,
    clientId!,
    clientSecret,
    // NOTE: Pass 'undefined' for clientSecret in desktop and mobile apps
    // because there is usually no sufficient way to protect your client secret
    // on a user's device.
    authorizationCode,
    redirectUri,
    // NOTE: It is not necessary to explicitly pass the authorityHost when using
    // the default authority host: https://login.microsoftonline.com.  It is only
    // necesary when a different authority host is used in the initial authorization
    // URI.
    { authorityHost }
  );
}

async function runExample() {
  // Get the credential to be used with any TypeScript API client
  // that accepts a TokenCredential.  The access token will be
  // requested on demand and refreshed when necessary.
  const credential = await getCredential();

  // This line demonstrates that it is possible to obtain an access
  // token using this credential but you *should not* use the credential
  // like this under normal circumstances.  The intended usage pattern is
  // to pass the credential directly into an API client class constructor.
  const accessToken = await credential.getToken(scopes);
  if (accessToken) {
    console.log("\nAccess token:", accessToken.token);
  } else {
    console.error("Could not retrieve an access token!");
  }
}

runExample().catch(err => {
  console.log("Encountered an error:\n\n", err);
})
