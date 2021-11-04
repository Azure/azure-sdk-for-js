let nock = require('nock');

module.exports.hash = "def23b4b670f22ce483b3ddc656e42fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '9b504d64-63b2-4f4f-a636-cbdeb3242f00',
  'x-ms-ests-server',
  '2.1.12171.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=fpc;; expires=Sun, 28-Nov-2021 17:06:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 17:06:25 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"NA","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Type',
  'application/json; charset=utf-8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Methods',
  'GET, OPTIONS',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '4dcc83dc-c9c3-410f-a4ea-2f89369d1a01',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=fpc;; expires=Sun, 28-Nov-2021 17:06:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 17:06:25 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=04b07795-8ddb-461a-bbee-02f9e1bf7b46&username=azure_username&password=azure_password&scope=https%3A%2F%2Fsanitized%2F&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=client-request-id&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"email openid profile https://graph.microsoft.com/AuditLog.Read.All https://graph.microsoft.com/Directory.AccessAsUser.All https://graph.microsoft.com/Group.ReadWrite.All https://graph.microsoft.com/User.ReadWrite.All","expires_in":70000,"ext_expires_in":70000,"access_token":"access_token1","refresh_token":"refresh_token","foci":"1","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz","client_info":"eyJ1aWQiOiIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwMTIiLCJ1dGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0K"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'eaf33f50-771e-47d2-8a4c-259086f1ec00',
  'x-ms-ests-server',
  '2.1.12171.14 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=fpc;; expires=Sun, 28-Nov-2021 17:06:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 17:06:25 GMT',
  'Content-Length',
  '4774'
]);

nock('https://graph.microsoft.com:443', {"encodedQueryParams":true})
  .post('/v1.0/me/revokeSignInSessions')
  .reply(200, ["1f8b080000000000040a","14cb4b0a80201000d0bb4c2d63acadab083ac8a0d307d2111d2588ee1ebdfd7b60164f4ae8242adf0a160ed554ac317ba67460385d96229ba29360da84a3e9032bfda95b7dc045e4628a3040a3ab3258cd95df0f0000ffff","0300f23761a858000000"], [
  'Date',
  'Fri, 29 Oct 2021 17:06:25 GMT',
  'Content-Type',
  'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8',
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Encoding',
  'gzip',
  'Location',
  'https://graph.microsoft.com',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000',
  'request-id',
  'd4936217-1f53-4215-a0b4-5bfac53eb83e',
  'client-request-id',
  'd4936217-1f53-4215-a0b4-5bfac53eb83e',
  'x-ms-ags-diagnostic',
  '{"ServerInfo":{"DataCenter":"East US","Slice":"E","Ring":"5","ScaleUnit":"003","RoleInstance":"BL6PEPF0000E7BB"}}',
  'x-ms-resource-unit',
  '1',
  'OData-Version',
  '4.0'
]);

nock('https://graph.microsoft.com:443', {"encodedQueryParams":true})
  .post('/v1.0/me/revokeSignInSessions')
  .reply(200, ["1f8b080000000000040a","14cb4b0a80201000d0bb4c2d63acadab083ac8a0d307d2111d2588ee1ebdfd7b60164f4ae8242adf0a160ed554ac317ba67460385d96229ba29360da84a3e9032bfda95b7dc045e4628a3040a3ab3258cd95df0f0000ffff","0300f23761a858000000"], [
  'Date',
  'Fri, 29 Oct 2021 17:16:00 GMT',
  'Content-Type',
  'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8',
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Encoding',
  'gzip',
  'Location',
  'https://graph.microsoft.com',
  'Vary',
  'Accept-Encoding',
  'Strict-Transport-Security',
  'max-age=31536000',
  'request-id',
  '8de3be3b-6d12-4198-a6d0-15771c1ea765',
  'client-request-id',
  '8de3be3b-6d12-4198-a6d0-15771c1ea765',
  'x-ms-ags-diagnostic',
  '{"ServerInfo":{"DataCenter":"East US","Slice":"E","Ring":"5","ScaleUnit":"003","RoleInstance":"BL6PEPF0000E7BB"}}',
  'x-ms-resource-unit',
  '1',
  'OData-Version',
  '4.0'
]);

nock('https://graph.microsoft.com:443', {"encodedQueryParams":true})
  .post('/v1.0/me/revokeSignInSessions')
  .reply(401, ["1f8b080000000000040a","948f4b6e02311005af62f57a2c8d87c424de2551166c111768ec17b0f0b4833f6481b87b34881c20fb7aaa7a574229b990bb92cf01e46823174e31bcf57684b4e8b9c52cbb7c82d040336ae5c3827d6469517aee55b1f7a855e1c2a9df6955507b6a082a8af289e35c953f724a9003d44f6cc707e1d4461a0afbc5b1c5b9c782a058825a629cba6b37b57684777ce5822d2ef9511467d4c6f3370d1445503eff7e046e4be0344e469b514faf3bb376c6bad54803159c3b6ad3319023bb0fc14eebbd3676b2fa69efad7eb10c6d5763589bd5b3090c1ac8a70869faffd3dbedf60b0000ffff","03006b52885a60010000"], [
  'Date',
  'Fri, 29 Oct 2021 17:16:29 GMT',
  'Content-Type',
  'application/json',
  'Transfer-Encoding',
  'chunked',
  'Content-Encoding',
  'gzip',
  'Vary',
  'Accept-Encoding',
  'WWW-Authenticate',
  'Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYzNTUyNzc5MCJ9fX0="',
  'Strict-Transport-Security',
  'max-age=31536000',
  'request-id',
  '6bdd627b-1626-4bc6-86ae-630d71351dae',
  'client-request-id',
  '6bdd627b-1626-4bc6-86ae-630d71351dae',
  'x-ms-ags-diagnostic',
  '{"ServerInfo":{"DataCenter":"East US","Slice":"E","Ring":"5","ScaleUnit":"003","RoleInstance":"BL6PEPF0000E7BB"}}'
]);

nock('https://graph.microsoft.com:443', {"encodedQueryParams":true})
  .post('/v1.0/me/revokeSignInSessions')
  .reply(401, {"error":{"code":"InvalidAuthenticationToken","message":"Continuous access evaluation resulted in claims challenge with result: InteractionRequired and code: TokenIssuedBeforeRevocationTimestamp","innerError":{"date":"2021-10-29T17:16:30","request-id":"bf3e8b46-dc38-421e-949d-723a554d1ca9","client-request-id":"bf3e8b46-dc38-421e-949d-723a554d1ca9"}}}, [
  'Date',
  'Fri, 29 Oct 2021 17:16:29 GMT',
  'Content-Type',
  'application/json',
  'Transfer-Encoding',
  'chunked',
  'WWW-Authenticate',
  'Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYzNTUyNzc5MCJ9fX0="',
  'Strict-Transport-Security',
  'max-age=31536000',
  'request-id',
  'bf3e8b46-dc38-421e-949d-723a554d1ca9',
  'client-request-id',
  'bf3e8b46-dc38-421e-949d-723a554d1ca9',
  'x-ms-ags-diagnostic',
  '{"ServerInfo":{"DataCenter":"East US","Slice":"E","Ring":"5","ScaleUnit":"001","RoleInstance":"MN1PEPF00002F1F"}}'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=04b07795-8ddb-461a-bbee-02f9e1bf7b46&scope=https%3A%2F%2Fsanitized%2F&grant_type=refresh_token&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|62,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=client-request-id&refresh_token=refresh_token&claims=%7B%22access_token%22%3A%7B%22nbf%22%3A%7B%22essential%22%3Atrue%2C%22value%22%3A%221635527790%22%7D%2C%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(400, {"error":"invalid_grant","error_description":"AADSTS50173: The provided grant has expired due to it being revoked, a fresh auth token is needed. The user might have changed or reset their password. The grant was issued on '2021-10-29T17:06:26.4084709Z' and the TokensValidFrom date (before which tokens are not valid) for this user is '2021-10-29T17:16:00.0000000Z'.\r\nTrace ID: 47a23f57-3717-4857-8fab-b3485aeba800\r\nCorrelation ID: 14bf0b94-fba8-4d0b-84da-5f1c505531cf\r\nTimestamp: 2021-10-29 17:16:31Z","error_codes":[50173],"timestamp":"2021-10-29 17:16:31Z","trace_id":"47a23f57-3717-4857-8fab-b3485aeba800","correlation_id":"14bf0b94-fba8-4d0b-84da-5f1c505531cf","error_uri":"https://login.microsoftonline.com/error?code=50173","suberror":"bad_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '47a23f57-3717-4857-8fab-b3485aeba800',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,50173,0,604687.0128,',
  'Set-Cookie',
  'fpc=fpc;; expires=Sun, 28-Nov-2021 17:16:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 17:16:30 GMT',
  'Content-Length',
  '760'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=04b07795-8ddb-461a-bbee-02f9e1bf7b46&username=azure_username&password=azure_password&scope=https%3A%2F%2Fsanitized%2F&grant_type=password&client_info=1&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|371,0,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=client-request-id&claims=%7B%22access_token%22%3A%7B%22nbf%22%3A%7B%22essential%22%3Atrue%2C%22value%22%3A%221635527790%22%7D%2C%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","scope":"email openid profile https://graph.microsoft.com/AuditLog.Read.All https://graph.microsoft.com/Directory.AccessAsUser.All https://graph.microsoft.com/Group.ReadWrite.All https://graph.microsoft.com/User.ReadWrite.All","expires_in":80000,"ext_expires_in":80000,"access_token":"access_token2","refresh_token":"refresh_token","foci":"1","id_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz","client_info":"eyJ1aWQiOiIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwMTIiLCJ1dGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0K"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '47a23f57-3717-4857-8fab-b34865eba800',
  'x-ms-ests-server',
  '2.1.12171.14 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=fpc;; expires=Sun, 28-Nov-2021 17:16:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Oct 2021 17:16:30 GMT',
  'Content-Length',
  '4769'
]);

nock('https://graph.microsoft.com:443', {"encodedQueryParams":true})
  .post('/v1.0/me/revokeSignInSessions')
  .reply(200, {"@odata.context":"https://graph.microsoft.com/v1.0/$metadata#Edm.Boolean","value":true}, [
  'Date',
  'Fri, 29 Oct 2021 17:16:30 GMT',
  'Content-Type',
  'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false;charset=utf-8',
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Location',
  'https://graph.microsoft.com',
  'Strict-Transport-Security',
  'max-age=31536000',
  'request-id',
  '0d197bdd-4a2a-45a4-bdbc-858494e3f4cb',
  'client-request-id',
  '0d197bdd-4a2a-45a4-bdbc-858494e3f4cb',
  'x-ms-ags-diagnostic',
  '{"ServerInfo":{"DataCenter":"East US","Slice":"E","Ring":"5","ScaleUnit":"001","RoleInstance":"MN1PEPF00002F1F"}}',
  'x-ms-resource-unit',
  '1',
  'OData-Version',
  '4.0'
]);
