let nock = require('nock');

module.exports.hash = "3442d192c2bc4d26b635f626037e7e57";

module.exports.testInfo = {"uniqueName":{"container":"container169708258601603689","blob":"blob169708258612600949"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708258601603689')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:46 GMT',
  'ETag',
  '"0x8DBCAD647343995"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a283bd-f01e-0036-80bf-fc1e51000000',
  'x-ms-client-request-id',
  '66f8f6ef-3d34-41a0-ab5a-f8ec4d44b549',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container169708258601603689/blob169708258612600949', "Hello")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:47 GMT',
  'ETag',
  '"0x8DBCAD64745E5CD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a28414-f01e-0036-54bf-fc1e51000000',
  'x-ms-client-request-id',
  '516ff999-b2ab-444f-bd8f-89b9fa12d192',
  'x-ms-version',
  '2023-08-03',
  'x-ms-content-crc64',
  '7YooR2vuA24=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2023-10-12T03:49:47.0632397Z',
  'Date',
  'Thu, 12 Oct 2023 03:49:46 GMT'
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
  '6718ab0f-fe99-408d-b5a0-9d816e031100',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-ra5GTphRoWTv_UJSTft0gw' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlI5ziEbluBIgcDTxK9ktC8; expires=Sat, 11-Nov-2023 03:49:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPE0h-enfUKSiRywFwDEc1wAkC4nt4JJfnqt32pXHUAGbBTluQTmGWw-UMeNlHeoH3KWxX6JFl_fSmUGFUqWGVBrPvnl8-HcmUuIEW7maz99wxCB2s1473jsUl-J-6wS_jfw_awy7oxEWul9c1jP2whRF61y_OXzKuaL2fnsM7HVIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:46 GMT',
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
  'ff6bc074-d15d-45fb-8470-4a9578eb1d00',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-mzPL2qvEu5ML-xEsIfkWig' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AhiowNNGRYRJnLuLKJ8gWqg; expires=Sat, 11-Nov-2023 03:49:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPzODk1n4vYxWdVcyYHNEZF8x0y0O93dsUMb8rcCaLNedxV3gM3TFGCOS7yK_PVYMuWCtdwP1jQ46qpZ6XwHNEBjRJgHiHBXbiGvgAb1c7KWraCVjebPI7s8sDPEF0u1AF8wusOTfmFT8jCGBFx1ldktu6VatLHF12vrSLV-AmZVcgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:47 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.15.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=b43d0c2b-7dfb-493b-8d3e-51d9ed31d6c8&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '6718ab0f-fe99-408d-b5a0-9d8176031100',
  'x-ms-ests-server',
  '2.1.16522.6 - JPE ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-5KizBHbQ1Mc8x_eIUwYgyA' 'unsafe-eval' 'unsafe-inline' 'report-sample'; object-src 'none'; base-uri 'self'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvqOW1H2E_1EkTIWJ2vgECo; expires=Sat, 11-Nov-2023 03:49:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 12 Oct 2023 03:49:47 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container169708258601603689/blob169708258612600949')
  .reply(200, "", [
  'Content-Length',
  '5',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Thu, 12 Oct 2023 03:49:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DBCAD64745E5CD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a2855a-f01e-0036-06bf-fc1e51000000',
  'x-ms-client-request-id',
  'ae377f4c-eec4-4101-ad5b-7be8ffd4bc47',
  'x-ms-version',
  '2023-08-03',
  'x-ms-version-id',
  '2023-10-12T03:49:47.0632397Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 12 Oct 2023 03:49:47 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 12 Oct 2023 03:49:47 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container169708258601603689')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58a285a2-f01e-0036-4bbf-fc1e51000000',
  'x-ms-client-request-id',
  '9f01b8e0-14c2-45ab-a556-91d77ad6a1a5',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Thu, 12 Oct 2023 03:49:47 GMT'
]);
