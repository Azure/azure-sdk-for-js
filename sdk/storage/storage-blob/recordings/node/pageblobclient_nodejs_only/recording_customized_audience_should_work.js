let nock = require('nock');

module.exports.hash = "25e59b4604d155bd986c417a9168ab08";

module.exports.testInfo = {"uniqueName":{"container":"container169708259413807677","blob":"blob169708259424707153"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708259413807677')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'ETag',
  '"0x8DBCAD64C0B4CC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a29933-f01e-0036-73bf-fc1e51000000',
  'x-ms-client-request-id',
  'f05f0661-fc25-4d0c-8bdd-6e5b748569d8',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708259413807677/blob169708259424707153')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'ETag',
  '"0x8DBCAD64C1CAAA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a29992-f01e-0036-2bbf-fc1e51000000',
  'x-ms-client-request-id',
  'ab72e2b8-5c42-4205-adf1-204c6beff24f',
  'x-ms-version',
  '2023-08-03',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2023-10-12T03:49:55.1816360Z',
  'Date',
  'Thu, 12 Oct 2023 03:49:54 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/aaaaa/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '49e7c5ab-9f74-4bfa-b280-f346ea340e00',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AiJQViKLvBhLkONGMqrRzzg; expires=Sat, 11-Nov-2023 03:49:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPq9n_yO-jOIDeZmyuApNuExMfQ4bo58Cunv1XgjP7JXHLMO7Y_IJhXTxeJmpwNs4p5Yh37wL3XsbZUXDPKeUCAQx6FQyDG9KIFtwrFzQmdEhZw_-IyqvBd-H1u348NybIilh21ACLTKfmVZSiPH8OisERhSC2LesEGJvUctTIOn4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:54 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/aaaaa/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/aaaaa/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/aaaaa/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/aaaaa/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/aaaaa/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '3d4fca17-ef71-46b2-bac4-ab0099252d00',
  'x-ms-ests-server',
  '2.1.16522.6 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-brcU0TyDDofxuWOElSYKcg' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqLYgqKHswZJtFiuWkwVQzI; expires=Sat, 11-Nov-2023 03:49:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEP4uUkuWKucu0qDhLudcMorwPRH1xEPIgKHKNZJ0CaKVthrqbNEVZFQGg7LQkw1jVo3X5y7DggmZ3-6QXGiodT7EA7gnb9BQDKCG3p-q4WlmJZ9eVV4tNnQ3kATQ4PLCSQAmRsKr1svwbuyrmDlVFTKunqj798O0yN6ox2GISaojAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=4794b82e-33b2-4b6c-aee8-30ce95ff06b3&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'f99dcba1-b28d-4c1a-8718-e2fb82191600',
  'x-ms-ests-server',
  '2.1.16522.6 - SEASLR1 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AqIjcxMNDmBAutb_dLJwPg4; expires=Sat, 11-Nov-2023 03:49:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'Content-Length',
  '1337'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container169708259413807677/blob169708259424707153')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DBCAD64C1CAAA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a29ace-f01e-0036-40bf-fc1e51000000',
  'x-ms-client-request-id',
  'b258936e-2ea5-43f1-ba49-5ff8ba984f95',
  'x-ms-version',
  '2023-08-03',
  'x-ms-version-id',
  '2023-10-12T03:49:55.1816360Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 12 Oct 2023 03:49:55 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 12 Oct 2023 03:49:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container169708259413807677')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a29ae9-f01e-0036-5bbf-fc1e51000000',
  'x-ms-client-request-id',
  'a7773403-8968-40be-b088-ec0401cc74c0',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:55 GMT'
]);
