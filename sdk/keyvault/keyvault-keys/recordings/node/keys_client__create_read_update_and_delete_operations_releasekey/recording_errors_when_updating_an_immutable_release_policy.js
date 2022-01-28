let nock = require('nock');

module.exports.hash = "e97f1dfeea8e9af2bdefa65e65864790";

module.exports.testInfo = {"uniqueName":{"immutablerelease":"immutablerelease164324315726004693"},"newDate":{}}

nock('https://skr_attestation.azure.net:443', {"encodedQueryParams":true})
  .get('//generate-test-token')
  .reply(200, {"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYybHRKM0dSa3hWVC1fdkQ2dWJ4LWdHWUZIWU5pWE1WZ29sSzU5NzEyVzAiLCJqa3UiOiJodHRwczovL21hbGVnZWltbXV0YWJsZTJzaXRlLmF6dXJld2Vic2l0ZXMubmV0L2tleXMifQ.eyJpc3MiOiJodHRwczovL21hbGVnZWltbXV0YWJsZTJzaXRlLmF6dXJld2Vic2l0ZXMubmV0LyIsInNkay10ZXN0Ijp0cnVlLCJ4LW1zLWluaXR0aW1lIjp7fSwieC1tcy1ydW50aW1lIjp7ImtleXMiOlt7Imt0eSI6IlJTQSIsImtpZCI6ImZha2UtcmVsZWFzZS1rZXkiLCJ1c2UiOiJlbmMiLCJlIjoiQVFBQiIsIm4iOiJwWkxQcllyRWVNZFR6a2F6TVhNOEpZWkF1R0Zmc290VjdKVEhvYTFDQUVRVXR0MkxPc29aM1lKZ2o2TE5tajBaUFk2ZHdRWU1BNXBXSkhSQkM3cXBBY2xBb1VNalJ3cmZuUGZ5aFBaMWM1OEo3VTB2czNzeHktSG1lMl94eEtsUHNzYVZ2b1haNXEwYVp4RXhxYnlWQXZZekZSVl9JS1Z5bUxDaXhzalZmaEE4azBkWXdaeU9UYzVxQkFiTnlwU0tXb2NSd0c0UTdMZTVGeUtCRDB5eVJJTUFkazhQdjVsOHV0b2dMcEVMakRLZERQcTJuTE9iZ1NMRTFKSjlNUHdvQVRaaHZMbE1fV3lYODFocGs1NWp2Y1JoZzAzcUtyUVE2OFNBZ1pZeFN5QktVYWxDa3loSVB1RmVic1lIeWFFUXZGbTNPa2hfdlcwMzZuSTQ3U2x4UVEifV19LCJtYWEtZWhkIjoic2RrLXRlc3QiLCJpYXQiOjE2NDMyNDMxNTYsImV4cCI6MTY0Mzg0Nzk1Nn0.mW_9PdjNEXw8_62KeeN_LW_DL-cMWuEXazg3RtToFv8go4iGg5bZWDVTSjEd2ToU80Pc1EA7IB_o6vimNpZWb7a3irZQfTHYXvljpj5NV_xJ3piY_neNSi-Fojskyd3Kuih5oJOjvQPE_aWiBpbU1_3knE8w-X7TRcfCGdS1COpooxObYD2tIQE8On3M0c1WnihrMJ5opNoKK_2DnSDHWbjZagOWsQ5J0Du68hV0J6jHDD0f5gQ-tE8Eje2Bcx3PkZrsgiBVzdfCbTNUquqyOmWBRHC1WC-hFnfk2ybbba31xDDPc-uBD1f3AEMSQSguyAx9f-y6gD-2vEPtXPz1wg"}, [
  'Content-Length',
  '1321',
  'Content-Type',
  'application/json; charset=utf-8',
  'ETag',
  'W/"529-AAmzVN1XDmKC9ghr6gpRoJh8t+M"',
  'X-Powered-By',
  'Express',
  'Set-Cookie',
  'ARRAffinity=619d5cd37d5df35ce07c198c9a607841d32e50136529316925bc0449d5dc307e;Path=/;HttpOnly;Secure;Domain=skr_attestation.azure.net',
  'Set-Cookie',
  'ARRAffinitySameSite=619d5cd37d5df35ce07c198c9a607841d32e50136529316925bc0449d5dc307e;Path=/;HttpOnly;SameSite=None;Secure;Domain=skr_attestation.azure.net',
  'Date',
  'Thu, 27 Jan 2022 00:25:56 GMT',
  'Connection',
  'close'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/immutablerelease164324315726004693/create')
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
  'westus2',
  'x-ms-client-request-id',
  '81d2405d-bf75-4675-9649-c0b8a0c1efff',
  'x-ms-request-id',
  '869b4f9e-3148-4a7b-a2b2-8c532c752a7a',
  'x-ms-keyvault-service-version',
  '1.9.264.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 00:25:56 GMT'
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
  '2a05c435-525f-4b81-a831-d8f082d1d600',
  'x-ms-ests-server',
  '2.1.12261.22 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah7n2UgkIXhIm3ad91RlIaA; expires=Sat, 26-Feb-2022 00:25:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXVik3wp-eVppHSHcE00JgeuQXGb8Fun1LlixwXvussFS3iAVxEe8baKdSyz1i_hVu6ptMk6S2xVSt0pUoNoXH2Nq4sKC_qrQVA4ZvdRQmUQ3C0H6SVJr73_bQeS1t6C4CI9tCkxaAogZPxv9qMu4bCLWTybmamsndNsN4Ymio74gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 Jan 2022 00:25:56 GMT',
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
  'bf9272a6-c51f-4182-930d-e85db17fb300',
  'x-ms-ests-server',
  '2.1.12381.20 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsRhkoSPkC9MtG62dWPouBs; expires=Sat, 26-Feb-2022 00:25:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevriEIoTWyr4E_Xr9bbLz7EDCq4Df3RMNCrbQ_2m0P3UsJomXhit3pFFdeupNiDVqOpmgcPhZ_Uz2IOuJt-9NjZQyZkY_LzzPo8RHJ-0v-MVeqbX3334CvAmItSpp31w62cTcfOqkEPvhFrl5CqhJakfbVGPnwBjWPu-BSowTvNgMMgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 Jan 2022 00:25:56 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.4.0&x-client-OS=linux&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=1d7b1a6c-8560-4f1d-940a-e5ee5872a027&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  'a60a590f-1ef5-4951-ac92-684a74f14500',
  'x-ms-ests-server',
  '2.1.12381.20 - NCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Anle2XEa-ypCqlgaVvpyKeLiImrFAQAAAJTdg9kOAAAA; expires=Sat, 26-Feb-2022 00:25:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 27 Jan 2022 00:25:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/immutablerelease164324315726004693/create', {"kty":"RSA-HSM","key_ops":["encrypt","decrypt"],"attributes":{"exportable":true},"release_policy":{"immutable":true,"data":"eyJhbnlPZiI6W3siYWxsT2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJ0cnVlIn1dLCJhdXRob3JpdHkiOiJodHRwczovL3Nrcl9hdHRlc3RhdGlvbi5henVyZS5uZXQvIn1dLCJ2ZXJzaW9uIjoiMS4wLjAifQ"}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/immutablerelease164324315726004693/6825c4e6414e44288f2188fbc0fa6a83","kty":"RSA-HSM","key_ops":["encrypt","decrypt"],"n":"tW-exH9m5cGOkEhlnDbNfekox-qRY9ik129IFXCzVSJ3rT-EvuFrvEfEg31lg2aUcPthA5mkcyQK63r84q5-lgSAhy3RurpF38THuSgdOtR7124Moh2Xmxi7dvX5EK0HUYECalKdYBYInPCSFNn9munJe1wqmReFTE-r_sgkCznliiHHgt2WXNBZv0UvB8T4P9XTngz4gEXtEpM2X8om77NgjfNZ6b8TqreBRcHIzGHgOJYZiJbigMBOkvajFlxH9qjPcsNgrzSB1GTq5Xh-mF62h5zRPWcAJ2WvO6q7_qEBAvVcG-ilQjYW-EJCP1gKxpc4AoaJpin-YSfDM6tqbQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1643243158,"updated":1643243158,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7,"exportable":true},"release_policy":{"contentType":"application/json; charset=utf-8","data":"eyJ2ZXJzaW9uIjoiMS4wLjAiLCJhbnlPZiI6W3siYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyIsImFsbE9mIjpbeyJjbGFpbSI6InNkay10ZXN0IiwiZXF1YWxzIjoidHJ1ZSJ9XX1dfQ","immutable":true}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '81d2405d-bf75-4675-9649-c0b8a0c1efff',
  'x-ms-request-id',
  '3654926c-9306-4558-8277-e8c628078893',
  'x-ms-keyvault-service-version',
  '1.9.264.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0b7bb9bd-b488-5634-b80b-e2b4c4bd48cd',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1348;da_age=7606;rd_age=7606;brd_age=6100;ra_notif_age=1655;dec_lev=2;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 00:25:58 GMT',
  'Content-Length',
  '982'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/keys/immutablerelease164324315726004693/', {"attributes":{},"release_policy":{"immutable":true,"data":"eyJhbnlPZiI6W3siYW55T2YiOlt7ImNsYWltIjoic2RrLXRlc3QiLCJlcXVhbHMiOiJmYWxzZSJ9XSwiYXV0aG9yaXR5IjoiaHR0cHM6Ly9za3JfYXR0ZXN0YXRpb24uYXp1cmUubmV0LyJ9XSwidmVyc2lvbiI6IjEuMCJ9"}})
  .query(true)
  .reply(400, {"error":{"code":"BadParameter","message":"AKV.SKR.1020: Immutable Key Release Policy cannot be modified."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3aa3b281-2b8a-4bfa-a3a0-1300fad5ccb9',
  'x-ms-request-id',
  '8315bc52-75a8-4ad0-a84f-695e79083b11',
  'x-ms-keyvault-service-version',
  '1.9.264.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.229.43;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0b7bb9bd-b488-5634-b80b-e2b4c4bd48cd',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1349;da_age=7607;rd_age=7607;brd_age=6101;ra_notif_age=1656;dec_lev=1;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 27 Jan 2022 00:25:58 GMT'
]);
