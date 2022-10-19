let nock = require('nock');

module.exports.hash = "d7dd44614231ee1f8f5869f3fe6157d3";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem166538928145502913","directory":"directory166538928161905938","file":"file166538928220500135","newFile":"newFile166538928247903360"},"newDate":{"now":"2022-10-10T08:07:59.842Z","tmr":"2022-10-10T08:07:59.843Z"}}

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
  '1bdee59c-9bdd-443f-a81d-431fa4ba1a00',
  'x-ms-ests-server',
  '2.1.13845.9 - KRSLR1 ProdSlices',
  'Content-Security-Policy-Report-Only',
  "script-src 'self' 'nonce-__Le8mYNVxULmZr1FNFA2Q' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'none'; report-uri https://csp.microsoft.com/report/ESTS-UX-All",
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AtCkSt96QmRCtC6KOPFcNoE; expires=Wed, 09-Nov-2022 08:08:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr3dO5qmv8ndqa6q2B8KxBdV0tylP7Y2cjt2joqqUmvW1jYIDqSfwqU76T_dpwBSP6yEsLSst7BOlYSWrlJOE_NuU-JzIsAYgxmeH8Fj84_nYODnRG61JEOcVVZlKXxTT_HBZoTfqJmLkZwcRHsWSXGMPM1sk9f7Uc0oS0-zTFOAbq-cOq6hFef4xvCUY55mPbzy1jd8whub_V9LFDChKNhfeY2M2uALfJ-fv4y9U6pdMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 Oct 2022 08:08:00 GMT',
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
  'f329b7d7-a906-4745-8a11-7e6142e11700',
  'x-ms-ests-server',
  '2.1.13845.9 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AuGbhjk1AvlIrBhSplp8yMs; expires=Wed, 09-Nov-2022 08:08:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrNQRR9GC4Hz931METDt8yVC-eMeFDJHqvWaJfFM2XmpDS9IUVIHIkS7FWTbWXG1dbEhAFyffRheCuZbtlEqOS6ZFOTjY-GQGnVTur_nYib-V2aahRI1QXcXM5XoOuHwS_fzd0METwySjAMpG3K4ptT2xET9eTlIj60hWfvtwJWSCnsPZMy6M6tBfJmatSM6wRdtlmP7qYhZcGTRAqeMZce5jxQOzbPM39xE917jVnLnwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 Oct 2022 08:08:00 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "client_id=aaaaa&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.14.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=2ba57a6a-fb40-4198-ae4e-9d62802aded7&client_secret=aaaaa&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'e05e5a38-3084-4d55-8c9e-5aa581fc1700',
  'x-ms-ests-server',
  '2.1.13845.9 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlF58UUIDSJFrtRSW91Bf8DeeSdeAQAAAODJ1doOAAAA; expires=Wed, 09-Nov-2022 08:08:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 10 Oct 2022 08:08:00 GMT',
  'Content-Length',
  '1318'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2022-10-10T07:07:59Z</Start><Expiry>2022-10-15T08:07:59Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>3d0dde36-a773-4f66-8790-9179e20f18ba</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2022-10-10T07:07:59Z</SignedStart><SignedExpiry>2022-10-15T08:07:59Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2021-10-04</SignedVersion><Value>Ir8tlo8Usce1BkPETdG8uH5BsKpgMoiuqWHWxCcN894=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33cae0da-001e-001d-727f-dcf4bd000000',
  'x-ms-client-request-id',
  '284951c6-ed45-49cc-abc7-339a16e871ec',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:08:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 Oct 2022 08:08:01 GMT',
  'ETag',
  '"0x8DAAA968D3C19DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33cae10b-001e-001d-1c7f-dcf4bd000000',
  'x-ms-client-request-id',
  'a065c365-4730-4333-8450-d0b4c96f9c09',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:08:01 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913/directory166538928161905938')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:08:02 GMT',
  'ETag',
  '"0x8DAAA968D9860F7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '144e4f0e-801f-0013-527f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'b08f83a6-1ae4-462a-a024-7050426af090',
  'Date',
  'Mon, 10 Oct 2022 08:08:01 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913/directory166538928161905938/file166538928220500135')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:08:02 GMT',
  'ETag',
  '"0x8DAAA968DAE067A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '144e4f14-801f-0013-587f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '95001ac0-2745-4c39-b814-d4a10a838648',
  'Date',
  'Mon, 10 Oct 2022 08:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem166538928145502913//')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:08:01 GMT',
  'ETag',
  '"0x8DAAA968D3F79AA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '144e4f16-801f-0013-5a7f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '2e752bf5-0763-484d-9d9c-8349990cdc1c',
  'Date',
  'Mon, 10 Oct 2022 08:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913/newFile166538928247903360')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 Oct 2022 08:08:03 GMT',
  'ETag',
  '"0x8DAAA968E23F696"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '144e4f1a-801f-0013-5e7f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  'ed954cb8-bd20-4612-9a6c-ba7463028091',
  'Date',
  'Mon, 10 Oct 2022 08:08:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913/newFile166538928247903360')
  .query(true)
  .reply(403, {"error":{"code":"AuthorizationPermissionMismatch","message":"This request is not authorized to perform this operation using this permission.\nRequestId:144e4f25-801f-0013-677f-dcdd0d000000\nTime:2022-10-10T08:08:03.5890022Z"}}, [
  'Content-Length',
  '227',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'x-ms-request-id',
  '144e4f25-801f-0013-677f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '1c5f3afb-9b7d-4afb-87bb-3ddeff72c880',
  'Date',
  'Mon, 10 Oct 2022 08:08:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem166538928145502913/newFile166538928247903360')
  .query(true)
  .reply(409, {"error":{"code":"PathAlreadyExists","message":"The specified path already exists.\nRequestId:144e4f29-801f-0013-6b7f-dcdd0d000000\nTime:2022-10-10T08:08:03.7209276Z"}}, [
  'Content-Length',
  '168',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'PathAlreadyExists',
  'x-ms-request-id',
  '144e4f29-801f-0013-6b7f-dcdd0d000000',
  'x-ms-version',
  '2021-10-04',
  'x-ms-client-request-id',
  '3dc72ad8-094c-4ca0-8360-1702e6493aa8',
  'Date',
  'Mon, 10 Oct 2022 08:08:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem166538928145502913')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '33cae214-001e-001d-717f-dcf4bd000000',
  'x-ms-client-request-id',
  '43acac63-20a9-479a-8a51-aa8813e83509',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Mon, 10 Oct 2022 08:08:03 GMT'
]);
