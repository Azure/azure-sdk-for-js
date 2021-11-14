let nock = require('nock');

module.exports.hash = "bb6f75c4b6d1125ece9d9a06e93e8a82";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, { "tenant_discovery_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration", "api-version": "1.1", "metadata": [{ "preferred_network": "login.microsoftonline.com", "preferred_cache": "login.windows.net", "aliases": ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"] }, { "preferred_network": "login.partner.microsoftonline.cn", "preferred_cache": "login.partner.microsoftonline.cn", "aliases": ["login.partner.microsoftonline.cn", "login.chinacloudapi.cn"] }, { "preferred_network": "login.microsoftonline.de", "preferred_cache": "login.microsoftonline.de", "aliases": ["login.microsoftonline.de"] }, { "preferred_network": "login.microsoftonline.us", "preferred_cache": "login.microsoftonline.us", "aliases": ["login.microsoftonline.us", "login.usgovcloudapi.net"] }, { "preferred_network": "login-us.microsoftonline.com", "preferred_cache": "login-us.microsoftonline.com", "aliases": ["login-us.microsoftonline.com"] }] }, [
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
    '0e573fdf-76a7-46eb-bf0e-4cc88ffc6a00',
    'x-ms-ests-server',
    '2.1.12171.15 - SCUS ProdSlices',
    'Set-Cookie',
    'fpc=AkslAjbvK_VJk8S5fj5N8ek; expires=Sat, 04-Dec-2021 16:43:54 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrEtTw6DAP_Ryjw9F79kQ1uosjHdtynNDbpPTE86OET0ecUEcX7kVdDxPIjrGczPlXEIBu3DMYimEowSE4Oek1CzlQdxlxwJUrnOM2H97f3zEh9IDb_nn63R0FWKmTUpbCqeLiEciuxNdEh5_J4zEXBjp9vQWe1QxcAwv0JTNy8VMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Thu, 04 Nov 2021 16:43:54 GMT',
    'Content-Length',
    '980'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, { "token_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token", "token_endpoint_auth_methods_supported": ["client_secret_post", "private_key_jwt", "client_secret_basic"], "jwks_uri": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys", "response_modes_supported": ["query", "fragment", "form_post"], "subject_types_supported": ["pairwise"], "id_token_signing_alg_values_supported": ["RS256"], "response_types_supported": ["code", "id_token", "code id_token", "id_token token"], "scopes_supported": ["openid", "profile", "email", "offline_access"], "issuer": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0", "request_uri_parameter_supported": false, "userinfo_endpoint": "https://graph.microsoft.com/oidc/userinfo", "authorization_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize", "device_authorization_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode", "http_logout_supported": true, "frontchannel_logout_supported": true, "end_session_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout", "claims_supported": ["sub", "iss", "cloud_instance_name", "cloud_instance_host_name", "cloud_graph_host_name", "msgraph_host", "aud", "exp", "iat", "auth_time", "acr", "nonce", "preferred_username", "name", "tid", "ver", "at_hash", "c_hash", "email"], "kerberos_endpoint": "https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos", "tenant_region_scope": "WW", "cloud_instance_name": "microsoftonline.com", "cloud_graph_host_name": "graph.windows.net", "msgraph_host": "graph.microsoft.com", "rbac_url": "https://pas.windows.net" }, [
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
    'b2a01c86-1f7c-49a8-bfe3-f1bc3a891900',
    'x-ms-ests-server',
    '2.1.12197.4 - NCUS ProdSlices',
    'Set-Cookie',
    'fpc=AmsLqgzpBGJEskHPRPh35v0; expires=Sat, 04-Dec-2021 16:43:54 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr6TvLJENUrk8P7hIYyul-YLJoyaFeq6vv7Voyw7MOLzTTYxbqQNbc9jXzpesUjoEVisvyiOJAJy7xSvTo7bp4AYgkKfjwT9QY_A0PfUzXqv3HyNZnwWM0YGY1GCC9jAYQYhyPN_6Lc6IpjKZvzkRnruYWxqMhiDD1Ppg8XdSy4PIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Thu, 04 Nov 2021 16:43:54 GMT',
    'Content-Length',
    '1753'
  ]);

nock('https://login.microsoftonline.com:443', { "encodedQueryParams": true })
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.3.2&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=70d23244-1d55-425d-b7ca-e85507c3710f&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, { "token_type": "Bearer", "expires_in": 86399, "ext_expires_in": 86399, "access_token": "access_token" }, [
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
    'ccb20cb1-6f40-4498-b2d4-32c27da31a00',
    'x-ms-ests-server',
    '2.1.12197.4 - NCUS ProdSlices',
    'x-ms-clitelem',
    '1,0,0,,',
    'Set-Cookie',
    'fpc=AsyrsnnUAR5EiTDqCc4HEEj__1r8AQAAAMoEFtkOAAAA; expires=Sat, 04-Dec-2021 16:43:54 GMT; path=/; secure; HttpOnly; SameSite=None',
    'Set-Cookie',
    'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
    'Set-Cookie',
    'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
    'Date',
    'Thu, 04 Nov 2021 16:43:54 GMT',
    'Content-Length',
    '1318'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/datasources')
  .query(true)
  .reply(200, { "value": [{ "properties": { "createdAt": "2021-04-01T19:18:25.6411232Z", "lastModifiedAt": "2021-04-01T19:18:25.6411233Z", "parentCollection": null }, "kind": "Collection", "id": "datasources/Collection-vaR", "name": "Collection-vaR" }, { "properties": { "endpoint": "https://joherediteststorage.blob.core.windows.net/", "resourceGroup": "joheredi-test", "subscriptionId": "faa080af-c1d8-40ad-9cce-e1a450ca5b57", "location": "westus", "resourceName": "joherediteststorage", "createdAt": "2021-04-01T19:19:37.3396977Z", "lastModifiedAt": "2021-04-01T19:19:37.3396984Z", "parentCollection": { "type": "DataSourceReference", "referenceName": "Collection-vaR" } }, "kind": "AzureStorage", "id": "datasources/AzureBlob-BzV", "name": "AzureBlob-BzV" }], "count": 2 }, [
    'Date',
    'Sat, 17 Apr 2021 03:02:02 GMT',
    'Content-Type',
    'application/json; charset=utf-8',
    'Server',
    'Kestrel',
    'Content-Length',
    '709',
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains',
    'x-ms-correlation-request-id',
    '9e4bac9f-885b-43a0-9aeb-5fdd385646f9'
  ]);
