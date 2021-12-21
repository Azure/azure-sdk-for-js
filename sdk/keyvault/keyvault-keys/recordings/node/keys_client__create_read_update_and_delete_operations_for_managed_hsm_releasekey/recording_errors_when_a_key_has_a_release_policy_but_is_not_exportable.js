let nock = require('nock');

module.exports.hash = "115b9c914bd98af4a85a23a0e81b1bca";

module.exports.testInfo = {"uniqueName":{"policynonexportable":"policynonexportable164011273410506163"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNfT1drYTlNcEpTeFM0NHZBbXRSRHNKelFkeFJPNkxfQkF5VHNXUVhEeUUiLCJqa3UiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC9rZXlzIn0.eyJpc3MiOiJodHRwczovL21hbGVnZXNrcmt2c2l0ZS5henVyZXdlYnNpdGVzLm5ldC8iLCJzZGstdGVzdCI6dHJ1ZSwieC1tcy1pbml0dGltZSI6e30sIngtbXMtcnVudGltZSI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJraWQiOiJmYWtlLXJlbGVhc2Uta2V5IiwidXNlIjoiZW5jIiwiZSI6IkFRQUIiLCJuIjoidTEyYnRhcDBmNmRIY2ZUMGdPdHdwOXhwMlFoQ1V2MlZIekdmT1M5SFRmLXdCbXhrQm1SeVlVN182WlpEQ0VOUUhocWZWTlVaZ1UwQVZYZVhmcGFHa3B6VnFRblFJSVlFTUU0TlhuMnIzNktldHBBV3JJUjlGNDRBQ1Y5aTFnR1Q5Rk5BUmF0ckl6TTZPWF9WcWxBNlF6aGdLWmgwR2hfdWdTLXFIUGxWcElScHlSa3d4a0ZmSGwxVnBCZW03c0FkekI0bHBRZ3FzWENDSTRrejZjc29iT2VVMjMzejV5bnBSUVp3c3ZXM1NDLUU5Vnc1TlJzc0JxRjV0Z3AxdTZUdzY0cDR1OVhfV2tIdTZXSmRxN2FVbmc4UmFkTGV5cTh2blpyRXo5NTA5SFJuNGZqM3lkbV9TT3hTdGxKZFJLMUNlbGNXSzMtdTBncXNlclZnUXVUTXhRIn1dfSwibWFhLWVoZCI6InNkay10ZXN0IiwiaWF0IjoxNjQwMTEyNzMzLCJleHAiOjE2NDA3MTc1MzN9.f0wNxkQywWTHT_t7_U10ONUIiL6Ax5ywRRuPC0cnAWQCMH7EfQG17jFvc-NqxpyZbe7SW1Aw2OoVZ28M4dpB-ZusdVJcPz2Y5rfODRpGT5TalRhQMkuKYyqggOcZkM3oEviuSdOBfmjZtPe3fWEKwiQFEk5rqrfEPnnT_moJ5wonyf4jTw8R5KxjdOKIDC44IfQkwdU88l66pNe-Fy_cDtqRa_SKuVC9UpCmVC9v89PdHSOTlg9dFYTIeXqeYAyMy7UObgIcIZ3Yq-BgqOLS8A8dd7yyo3tuF6XShtm1rCUUT5DJDOJoYlQ_cMqNiA67wy2vl1umka2LOYv3MylqbQ"}, [
  'Content-Length',
  '1307',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"51b-H09tX1+uNSLqT8oxl7Y8voBhm5c"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=c6a88b48c7c8f7eb36b815faecc076b5af62a303dfe264125f83c50a4458b7aa;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Tue, 21 Dec 2021 18:52:12 GMT',
  'Connection',
  'close'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable164011273410506163/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '1bfc48ce-628f-11ec-a30a-000d3afc9092',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
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
  '6469cbaf-393d-45e3-8b1e-31b94d892e00',
  'x-ms-ests-server',
  '2.1.12261.17 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aukx0r3hoTBOroEkvqo3dHU; expires=Thu, 20-Jan-2022 18:52:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrvkfFMYgyQUTTf0xPj3BGCra2DLMQcMsc3Zwb2kVMA8AXk2BW9rOtcxmKZpg_GOHxwPzVTBQlm5HZdAa1HB_apNqxBWl4lm0r3Q9hwemmc-57JfUp5LPFOztiqG2_4MgUWGFbYpGpXel9jBDPEWG8GfNMR-b5eiWJJ8197s3G65EgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:12 GMT',
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
  '80e27ce4-122e-457d-aa30-bba1ae823f00',
  'x-ms-ests-server',
  '2.1.12261.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AryigDo6bstCgRYxr4BHP_M; expires=Thu, 20-Jan-2022 18:52:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrM81TTPHf67krmg4LZnYm1c_hUxmMSnvQqKPUHw64OED_mn2lwgnBQEkU2AR4UxPBYgFcMZCeSLYTFozoAQrX6VwCisd5Z0mnPoVHSEj9iz4_nXOnUJ26P6rBkDdrfhSBsCN5WUKF_i-aXb6CUgC271kLi9-SPyaCEjiUbLmP7S0gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:12 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=f1e0bba5-27b4-4bcc-8f5f-fff2c66e629a&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a0d442e6-06da-428c-87d4-ff779b595200',
  'x-ms-ests-server',
  '2.1.12261.17 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AswSEKc_2DBLkEKLZMKl8FZe2YyLAQAAAFwZVNkOAAAA; expires=Thu, 20-Jan-2022 18:52:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 21 Dec 2021 18:52:12 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/policynonexportable164011273410506163/create', {"kty":"RSA","attributes":{},"release_policy":{"data":"eyJhbnlPZiI6W3siYWxsT2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wIn0"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"Non-exportable keys must not have release policy (Activity ID: 1c3af542-628f-11ec-a30a-000d3afc9092)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '22',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '146',
  'x-ms-request-id',
  '1c3af542-628f-11ec-a30a-000d3afc9092',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
