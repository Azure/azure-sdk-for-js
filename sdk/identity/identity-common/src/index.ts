// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { TokenResponse, IdentityClient, getIdentityClientAuthorityHost } from "./client/identityClient";

export { parseExpiresOn } from "./credentials/managedIdentityCredential/utils";
export { MultiTenantTokenCredentialOptions } from "./credentials/multiTenantTokenCredentialOptions";
export { VSCodeCredentialFinder } from "./credentials/visualStudioCodeCredentialPlugin";
export { vsCodeCredentialControl } from "./credentials/vsCodeCredentialControl";

export { MsalNode, MsalNodeOptions } from "./msal/nodeFlows/msalNodeCommon";
export { TokenCachePersistenceOptions } from "./msal/nodeFlows/tokenCachePersistenceOptions";
export { CredentialFlow, CredentialFlowGetTokenOptions } from "./msal/credentials";
export { MsalFlow, MsalFlowOptions } from "./msal/flows";
export { MsalResult, MsalToken, AuthenticationRecord } from "./msal/types";
export { MsalBaseUtilities, defaultLoggerCallback, deserializeAuthenticationRecord, ensureValidMsalToken, getAuthority, getKnownAuthorities, getMSALLogLevel, msalToPublic, publicToMsal, serializeAuthenticationRecord } from "./msal/utils";

export { useIdentityPlugin } from "./plugins/consumer";
export { AzurePluginContext, CachePluginControl, IdentityPlugin, VisualStudioCodeCredentialControl } from "./plugins/provider";

export { getIdentityTokenEndpointSuffix } from "./util/identityTokenEndpoint";
export { processMultiTenantRequest } from "./util/processMultiTenantRequest";
export { resolveAdditionallyAllowedTenantIds, resolveTenantId } from "./util/tenantIdUtils";

export { logger, formatError, formatSuccess, logEnvVars, processEnvVars, credentialLogger, credentialLoggerInstance } from "./util/logging";
export { tracingClient } from "./util/tracing";

export { AzureAuthorityHosts, ALL_TENANTS, DefaultAuthorityHost, DefaultTenantId, DeveloperSignOnClientId } from "./constants";

export { AggregateAuthenticationError, AuthenticationError, AuthenticationRequiredError, AuthenticationRequiredErrorOptions } from "./errors";

export { RegionalAuthority } from "./regionalAuthority";

export { TokenCredentialOptions } from "./tokenCredentialOptions";

export { MsalTestCleanup, MsalTestSetupResponse, msalNodeTestSetup } from "../test/msalTestUtils";
