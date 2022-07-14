let nock = require('nock');

module.exports.hash = "04c6b1b36f2a3b1a4f23e3229fa0b660";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '79983d7a-de09-41e0-9059-0b9cdf2ec200',
  'x-ms-ests-server',
  '2.1.13156.10 - KRSLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AlZOTol5vaROknvE65Vr8IE; expires=Sat, 13-Aug-2022 02:58:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrxxFq6GwnKJHFBahk3l-pnHwdRQTt84a4_oQOu-f7NLyyO5yL4M6sIvuC1vJT2yJm4dAYmBhisP_H9FODbwndqA8BbnbPlNhHINbwEOhbhQ7FK6wuK94LMh1T3TRJF8u_UrGNJGFk7witEkxrxuymvtmiEjCG7UmL_Bdlll6KRpwgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  'd548c885-084c-4865-b51e-38607faa3500',
  'x-ms-ests-server',
  '2.1.13201.7 - SEASLR1 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Ar72k91pgopFljSYWL5pu1I; expires=Sat, 13-Aug-2022 02:58:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDKeXt-gGjGP74QgxBihPXvOMBWyvCfKlaaZqhJqpBWtxykpBurEYrPBja9CsSzw4Sbfw5q6NSKOmQgnA2hV1ZdBRd47PcF0GLP-zayTffy8WWR5LIXc91VkQVxpa4aHA6AuZir5xqj6dJxbFeCavWbGdcDqQ66Al5_ZO5wDmcSIgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=69b14f8e-0729-411f-8308-1e32f37f249a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3598,"ext_expires_in":3598,"access_token":"access_token"}, [
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
  '45360b1e-81cc-44e5-b18e-ef5795c87d00',
  'x-ms-ests-server',
  '2.1.13156.10 - SEASLR2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=ApwXOuqIRy1CsMX6mqDb3nw; expires=Sat, 13-Aug-2022 02:58:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT',
  'Content-Length',
  '1319'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/88888888-8888-8888-8888-888888888888/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"kerberos_endpoint":"https://login.microsoftonline.com/88888888-8888-8888-8888-888888888888/kerberos","tenant_region_scope":"AS","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '4d4bf598-c8df-41cd-8121-9500ae487a00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AomqKwgrleNJpAtqJxlRW_k; expires=Sat, 13-Aug-2022 02:58:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrSCdHXOOB96Dqj0yRgCxa7yDZ6dkOv5XLAUag0IKjgB3rvAPUWoi97EUQT2y5UI2F5bYMcK1EpIoWojnbo6ZLsPK0GvPEZYyGM-fn3qCkuS7PVmvSxDfU8AavQr0iBrM3ugU4ZKqJgLDvWRhNmZgZv7aIhI8YCennzxDUdaP6tBMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT',
  'Content-Length',
  '1753'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"The provided coordinates in query are invalid, out of range, or not in the expected format"}}, [
  'Content-Length',
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: D8DED4C8F4514991A55BE5C7905D8433 Ref B: TYO01EDGE2207 Ref C: 2022-07-14T02:58:47Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/json')
  .query(true)
  .reply(400, {"error":{"code":"400 BadRequest","message":"The provided coordinates in query are invalid, out of range, or not in the expected format"}}, [
  'Content-Length',
  '138',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 218BEFEC9287428AB667ED82A0146601 Ref B: TYBEDGE0909 Ref C: 2022-07-14T02:58:47Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.9.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=99e1aaa7-46ae-4b61-9f03-770d6c99f95a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '4d4bf598-c8df-41cd-8121-9500b3487a00',
  'x-ms-ests-server',
  '2.1.13156.10 - KRC ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AotYq35uO8FOpN_NoCXRRPw; expires=Sat, 13-Aug-2022 02:58:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 14 Jul 2022 02:58:46 GMT',
  'Content-Length',
  '1319'
]);

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/search/address/reverse/json')
  .query(true)
  .reply(200, {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"36","streetNumber":"36","routeNumbers":[],"street":"新港路","streetName":"新港路","streetNameAndNumber":"新港路, 36","countryCode":"TW","countrySubdivision":"桃園市","municipality":"桃園市","postalCode":"327","municipalitySubdivision":"新屋區","country":"台灣","countryCodeISO3":"TWN","freeformAddress":"32744, 桃園市 新屋區, 新港路, 36","boundingBox":{"northEast":"24.989644,121.014926","southWest":"24.989405,121.012705","entity":"position"},"extendedPostalCode":"32744","localName":"新屋區"},"position":"24.988867,121.017029"}]}, [
  'Content-Length',
  '648',
  'Content-Type',
  'application/json',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 8D0B6D8FEC184C95AD06C11C5EE1370E Ref B: TYBEDGE0909 Ref C: 2022-07-14T02:58:47Z',
  'Date',
  'Thu, 14 Jul 2022 02:58:47 GMT'
]);
