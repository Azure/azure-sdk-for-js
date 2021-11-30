let nock = require('nock');

module.exports.hash = "a8c3a7443fc1b8404ae1c204643029c4";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, { "tenant_discovery_endpoint": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration", "api-version": "1.1", "metadata": [{ "preferred_network": "login.microsoftonline.com", "preferred_cache": "login.windows.net", "aliases": ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"] }, { "preferred_network": "login.partner.microsoftonline.cn", "preferred_cache": "login.partner.microsoftonline.cn", "aliases": ["login.partner.microsoftonline.cn", "login.chinacloudapi.cn"] }, { "preferred_network": "login.microsoftonline.de", "preferred_cache": "login.microsoftonline.de", "aliases": ["login.microsoftonline.de"] }, { "preferred_network": "login.microsoftonline.us", "preferred_cache": "login.microsoftonline.us", "aliases": ["login.microsoftonline.us", "login.usgovcloudapi.net"] }, { "preferred_network": "login-us.microsoftonline.com", "preferred_cache": "login-us.microsoftonline.com", "aliases": ["login-us.microsoftonline.com"] }] }, [
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
    '298aa27f-5f3d-4250-a767-aacbc74cdf00',
    'x-ms-ests-server',
    '2.1.11562.8 - WUS2 ProdSlices',
    'Set-Cookie',
    'fpc=fpc;; expires=Fri, 16-Apr-2021 03:14:42 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Wed, 17 Mar 2021 03:14:42 GMT',
    'Content-Length',
    '980'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, { "token_endpoint": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token", "token_endpoint_auth_methods_supported": ["client_secret_post", "private_key_jwt", "client_secret_basic"], "jwks_uri": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys", "response_modes_supported": ["query", "fragment", "form_post"], "subject_types_supported": ["pairwise"], "id_token_signing_alg_values_supported": ["RS256"], "response_types_supported": ["code", "id_token", "code id_token", "id_token token"], "scopes_supported": ["openid", "profile", "email", "offline_access"], "issuer": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0", "request_uri_parameter_supported": false, "userinfo_endpoint": "https://graph.microsoft.com/oidc/userinfo", "authorization_endpoint": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize", "device_authorization_endpoint": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode", "http_logout_supported": true, "frontchannel_logout_supported": true, "end_session_endpoint": "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout", "claims_supported": ["sub", "iss", "cloud_instance_name", "cloud_instance_host_name", "cloud_graph_host_name", "msgraph_host", "aud", "exp", "iat", "auth_time", "acr", "nonce", "preferred_username", "name", "tid", "ver", "at_hash", "c_hash", "email"], "tenant_region_scope": "NA", "cloud_instance_name": "microsoftonline.com", "cloud_graph_host_name": "graph.windows.net", "msgraph_host": "graph.microsoft.com", "rbac_url": "https://pas.windows.net" }, [
    'Cache-Control',
    'max-age=86400, private',
    'Content-Length',
    '1651',
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
    '439c8564-0337-4b49-b7f8-4c9c63f4ad00',
    'x-ms-ests-server',
    '2.1.11562.8 - SCUS ProdSlices',
    'Set-Cookie',
    'fpc=fpc;; expires=Fri, 16-Apr-2021 03:14:42 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Wed, 17 Mar 2021 03:14:42 GMT'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode', "scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&client_id=azure_client_id&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, { "user_code": "USER_CODE", "device_code": "DEVICE_CODE", "verification_uri": "https://microsoft.com/devicelogin", "expires_in": 900, "interval": 1, "message": "To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code USER_CODE to authenticate." }, [
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
    '0782b585-9142-4935-a901-5e684da4dd00',
    'x-ms-ests-server',
    '2.1.11562.8 - WUS2 ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=fpc;; expires=Fri, 16-Apr-2021 03:14:43 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=esctx; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Wed, 17 Mar 2021 03:14:42 GMT',
    'Content-Length',
    '473'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&client_id=azure_client_id&grant_type=device_code&device_code=DEVICE_CODE&client-request-id=client-request-id&client_info=1")
  .reply(200, { "token_type": "Bearer", "scope": "https://vault.azure.net/user_impersonation https://vault.azure.net/.default", "expires_in": 3599, "ext_expires_in": 3599, "access_token": "access_token", "refresh_token": "refresh_token", "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz", "client_info": "eyJ1aWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtY2Q5Mi04YTMwZTc2MmE4MmEiLCJ1dGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIn0" }, [
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
    '6542baa1-c678-4c37-a972-673cf275f200',
    'x-ms-ests-server',
    '2.1.11562.8 - WUS2 ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=fpc;; expires=Fri, 16-Apr-2021 03:14:58 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Wed, 17 Mar 2021 03:14:57 GMT',
    'Content-Length',
    '5163'
  ]);
