let nock = require('nock');

module.exports.hash = "6f567888b759516f7351c531615709eb";

module.exports.testInfo = {"uniqueName":{"keyrotate":"keyrotate162811055942405038"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotate162811055942405038/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"AKV10000: Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '97',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61aa03fd-d0be-4061-9485-29656129980a',
  'x-ms-request-id',
  '0d780fba-a6c1-4e6a-bf5b-68e2004e89de',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 04 Aug 2021 20:55:59 GMT'
]);

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
  'c534fa8f-2831-4abf-83de-34c366eaab01',
  'x-ms-ests-server',
  '2.1.11898.12 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CI; expires=Fri, 03-Sep-2021 20:56:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrb04EjQNKjJ2I0g-tHWLr9f5usdx0lTG3ppIaGa5HiNv5tqCvNJVVQ93WtBE-eB7vA3TjKto-9b9tV-P0zKhTk7xBSlizcWtHrXVqJRRtaRA8W7OkmgfkSbQ8PYGguCsBjhEHOB9omY6VRS92SvKfaKG1QMK0DA7moz7Wc7YSA7EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:55:59 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/kerberos","tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'c6c85d19-18ae-4998-aea5-a46167ba0100',
  'x-ms-ests-server',
  '2.1.11935.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CI; expires=Fri, 03-Sep-2021 20:56:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrGXlur4h7pGvp7v7dE_OXJ9jaOKhT10oWWb6gIgbmEg1OAxZXbKIU9iMpRfSSicI5FR63YCwXs9aXSSHeiIPIoU90RHn6V0KxhGwjxZarrtB5BA2QieysJWF3z6WcH7Y6cLco_m2GKL_u0poMjyEkiaLM6Zdf-W6VNEZZ1jCUsM0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:55:59 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.2.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=2|771,0|,&x-client-last-telemetry=2|0|||0,0&client-request-id=c54ebd49-9228-46fd-85d7-d317c1534c65&client_secret=azure_client_secret")
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
  'a359ca03-bbd0-40ab-b360-388b1b0d0a00',
  'x-ms-ests-server',
  '2.1.11935.12 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Ako-ybgyu-xEmwPTUI8x8CKN_3OUAQAAAN_1nNgOAAAA; expires=Fri, 03-Sep-2021 20:56:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 04 Aug 2021 20:56:00 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotate162811055942405038/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/keyrotate162811055942405038/e5d4ba9a309d447fba997b05b94b9830","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1yQYFrTLr-5xYW-sVv_RXw-G3VCoP7B04jFWdCM_d6kCYsGqEIdfdlcK-EaGqDBA-oT1Ctf6tFvhECKL0nozvM2GxpR7evbIb0w0Ge34K9j24XlEEUToRUE7JtWeBNCDoYtgAUJdgSX716B8f9_2hMPAPfDjOsEECqKibC3C6yJz3qyboaDBlAgjvNX3ze1Cs24untr9YhrZPzyY-SwKzPCwT4mEuydGwbi8dmh1ok5S23S01JYmmiCZqUeCvvdeZe-8LrPM5venRMVtrNc76ttxBvX2kAC-IUk9xqtcsUPylj35PrPlP6TVOky6CmCaUDXTx9NJP5dJO-s-kWdi8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1628110560,"updated":1628110560,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '61aa03fd-d0be-4061-9485-29656129980a',
  'x-ms-request-id',
  '5f824c6a-c6cc-43dc-b6b4-93be8617edfe',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 04 Aug 2021 20:56:00 GMT',
  'Content-Length',
  '704'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/keyrotate162811055942405038/rotate')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/keyrotate162811055942405038/dbeae578486a4563910c6393417a1046","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zCXdXUCUG5f-69tcoopczRpVj5lCB3cAOGqNZfSfyczymV2YiHVFz1Ax4J--JU-pbc62KRXmuZhMiK0GwD4PsP1aNE-ru8N01jlvqMShswrGJYend3oFX6y5f3ARYLoI8M2QQHpxJ8E-KEM70mJR4czIHGfjvXnY80eC7agGUf1OxurINl7tBs44un239SX7xNzhJvCIKhGq_amgo2237L1jYsjT4pvOu4xpelQaaNDuZWHJBgNMB_iQEZl_xhXx8fEl-0q1zYlwR6K8fmhdjJhbojcLecF-Q622kirE6FqKHZxzXDERwYHjGTXmXKMnqSI4n5pshbysM2TRwPAMYQ","e":"AQAB"},"attributes":{"enabled":true,"created":1628110560,"updated":1628110560,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'c053cbd6-5f50-4c55-ab9e-699810dd7de2',
  'x-ms-request-id',
  'fdd4940d-4245-405b-95d5-e45a58fdc4cd',
  'x-ms-keyvault-service-version',
  '1.9.48.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 04 Aug 2021 20:56:01 GMT',
  'Content-Length',
  '704'
]);
