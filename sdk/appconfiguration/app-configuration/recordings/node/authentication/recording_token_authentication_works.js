let nock = require('nock');

module.exports.hash = "1f913536eed564ac73ea0be292dff74d";

module.exports.testInfo = {"uniqueName":{},"newDate":{"label-1":"2021-04-13T00:31:08.936Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azuretenantid/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
  'Cache-Control',
  'max-age=86400, private',
  'Content-Length',
  '980',
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
  'fa84c1b1-1890-4700-a3da-4c1067080f00',
  'x-ms-ests-server',
  '2.1.11622.22 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aoqe_rEj5e9Lm_DHrmLQ8Vs; expires=Thu, 13-May-2021 00:31:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevraCJKSzMAjqyMRZGV2A6AfDrR4aNJFz1iHPGXthF08mZF6Ywvr1ucXlBNwpAGKdewsu2Ns2ZvHLcTHTQPn9u2dQDYHoZ-fzsl9_dhAci1-gjVtCEhVy1OxqWXsKCZgDFnDSJI2UHuD_hIBvub1F6Ba9VOd11hmlfeZsAJfAgztCIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Apr 2021 00:31:15 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azuretenantid/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azuretenantid/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azuretenantid/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azuretenantid/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '7114c866-7347-43a4-a6d8-ed66bd1d0400',
  'x-ms-ests-server',
  '2.1.11654.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aoqe_rEj5e9Lm_DHrmLQ8Vs; expires=Thu, 13-May-2021 00:31:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrnUhMl4iVcD8fBB7MW2DvhffHmMwsGd6Y3M4jJ_EpDthS8E6ZoSLe2f5_gNJjJsmo_Ini4jCtbQ061XvYYMrIqntpFPJhaeLOw_yPnhqdxUzCMob7V8_N0EfwXKvCOcTIdn4nDF9Lxwi4ROPBf6ZqIENjsxZr3Fi6OW8FjaMnniggAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Apr 2021 00:31:15 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=56d9a3ed-8cfd-4a46-aa83-e36a22275c32&client_secret=azure_client_secret")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1325',
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
  '585346f7-f221-48a3-b078-b1c23519a100',
  'x-ms-ests-server',
  '2.1.11622.22 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Aoqe_rEj5e9Lm_DHrmLQ8VvS-rn7AQAAAFPdBtgOAAAA; expires=Thu, 13-May-2021 00:31:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Apr 2021 00:31:15 GMT'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/token-authentication-test-1618273868936', {"key":"token-authentication-test-1618273868936","value":"hello"})
  .query(true)
  .reply(200, {"etag":"cPcetWjsp9SVL82P2IR2I5wtrEY","key":"token-authentication-test-1618273868936","label":null,"content_type":null,"value":"hello","tags":{},"locked":false,"last_modified":"2021-04-13T00:31:17+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 13 Apr 2021 00:31:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 13 Apr 2021 00:31:17 GMT',
  'ETag',
  '"cPcetWjsp9SVL82P2IR2I5wtrEY"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwODk5OTk=;sn=3089999',
  'x-ms-request-id',
  '1639576c-5d0e-4daf-8613-0b7c35e304db',
  'x-ms-correlation-request-id',
  '1639576c-5d0e-4daf-8613-0b7c35e304db',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
