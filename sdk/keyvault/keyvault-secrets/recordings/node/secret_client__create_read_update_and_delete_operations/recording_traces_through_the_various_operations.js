let nock = require('nock');

module.exports.hash = "cfe420a3cdd80bc0a923f9c50498dbb8";

module.exports.testInfo = {"uniqueName":{"secrettrace":"secrettrace165101295898304139"},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/secrettrace165101295898304139')
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
  'ca9f9077-edd1-4294-9151-61b9e92b047a',
  'x-ms-request-id',
  '18fbf621-2fcb-4192-a267-84a0b97e142f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT'
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
  '267008d0-7bfc-48c4-b71f-33b96c7f1701',
  'x-ms-ests-server',
  '2.1.12651.7 - SCUS ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AvKoQ3hKAP5FhZtV6cnpyew; expires=Thu, 26-May-2022 22:42:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrDdnbKm58kb-xCCHRFI0tsZOfQ52YXkvHO1Guc31unF4CUW95_vJejBuQK0qztihQThfUqjfMFQCAjNoYIdbBEPWJ3ZMESN28VV5E8U1W-n847kmdZtc0qcXYgNnrqe897xx6kXj3IXevva0muozQ_yG5AEhL8zgTZY0xrvcPxaAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
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
  '9ad2023a-0706-4253-a676-32ee9bf30500',
  'x-ms-ests-server',
  '2.1.12707.9 - WUS2 ProdSlices',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=AkIO6EAn45NIhyJy9x0Ad7k; expires=Thu, 26-May-2022 22:42:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr-ojHtujRAmKzpj7C4iUkQIjDTHDr0rlCnlo6DcdC3iio81ChN9XcsDppkayjSIv3ERWu3FeDjqomxzMjkqtf5cHE5ILK8lxEvI5VMJStZGoHQ9fhgGrDnJ8Gp8sD5dh0iHLfw6MHWCR5qYS99JQstKOfP1oj2aJ2GYUSaevbRTogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '1753'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fsanitized%2F&grant_type=client_credentials&x-client-SKU=msal.js.node&x-client-VER=1.7.0&x-client-OS=win32&x-client-CPU=x64&x-ms-lib-capability=retry-after, h429&x-client-current-telemetry=5|771,2,,,|,&x-client-last-telemetry=5|0|||0,0&client-request-id=21fbdf93-c7c5-4cae-8d87-3374952b7180&client_secret=azure_client_secret&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22cp1%22%5D%7D%7D%7D")
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
  '14cef94c-74e1-47af-9a49-e3513c0f7400',
  'x-ms-ests-server',
  '2.1.12651.9 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'X-XSS-Protection',
  '0',
  'Set-Cookie',
  'fpc=Avz7Dr27JjBInpOkaKa-lEVPlvakAQAAAFxs-tkOAAAA; expires=Thu, 26-May-2022 22:42:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/secrettrace165101295898304139', {"value":"someValue","attributes":{}})
  .query(true)
  .reply(200, {"value":"someValue","id":"https://keyvault_name.vault.azure.net/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4","attributes":{"enabled":true,"created":1651012956,"updated":1651012956,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ca9f9077-edd1-4294-9151-61b9e92b047a',
  'x-ms-request-id',
  'cfc0c06b-74b2-474e-ab57-ab4323512051',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1568;da_age=1568;rd_age=1568;brd_age=7126;ra_notif_age=8208;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '282'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/secrettrace165101295898304139/')
  .query(true)
  .reply(200, {"value":"someValue","id":"https://keyvault_name.vault.azure.net/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4","attributes":{"enabled":true,"created":1651012956,"updated":1651012956,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '6ae877c8-7f51-4147-88fd-5b45f226ef07',
  'x-ms-request-id',
  '0dcb01fc-4400-4746-971e-a500e097d1cb',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7126;ra_notif_age=8209;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '282'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4', {"attributes":{}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4","attributes":{"enabled":true,"created":1651012956,"updated":1651012957,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '24a94540-cdcc-42b4-a3b7-686646e134a8',
  'x-ms-request-id',
  'b0ab71d4-ba7c-43c7-846d-904fddbec281',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7126;ra_notif_age=8209;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '262'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/secrets/secrettrace165101295898304139/backup')
  .query(true)
  .reply(200, {"value":"KUF6dXJlS2V5VmF1bHRTZWNyZXRCYWNrdXBWMS5taWNyb3NvZnQuY29tZXlKcmFXUWlPaUl5WVdabU5tRmhNUzAzTm1Ka0xUUTBZVGN0WVRjek5DMDJaalZoWkRCaU5XRTRPVGdpTENKaGJHY2lPaUpTVTBFdFQwRkZVQzB5TlRZaUxDSmxibU1pT2lKQk1qVTJRMEpETFVoVE5URXlJbjAuRWtLdHF5bm9aYmtod214b0ppRVRYSGJ0T2RtOVhlSG1jaWdfcnlBeUdLZWFENkNaQzJSQmg3cEhibzVxVDJaYy1UU2tob2VCVEZzdzRMejQ4bXp1TV9sUl9fdDhjS3p4X1lZS0dYRHZNQ21Ba1cwdGlXaGEtRVlxVzdGazZyUEJBZERkVFBZZE1mLTVSWGliVE04cm5FRmJxaHVBeEZNWHZPN09zSW9HN0MweFRpczlnTFhjTDhadF9BZmgxTHZMQXBzZE5sYWJuN3RlYUdJamh5VDkxN3FtaU5pSEF1UzBhLWJmU1p4bGpZQ3hoZUR1TC1TNmM2X1FpNkJNZUl3cVQzZTJ2REI3TFM1RGJiaW0zelBKYk9PRVo2LU85bVloVWZRaUFrVGd6MkI3NDJablBCSGV3SFd6RzBid3FqMXVON1l6SW1HSkZ6RVV6dkU4N1VIbGxnLjl6WFczeHRjV0VVbUVybU4wN3luQUEuU2VjenpMS3JYczV6Y21tajlmN3JmRmdTX0JlT1lYM1lTakg0cmN1Nk9jRGVlVGJidzlfZDdORk9oUDhFOFExT041RFhycDhGSFFEN2dUdDBFREZTektJc1RuOElJdktrc1htbDJtc2dUX3Rua0tzTkxvSGRVNHZpZUNSVUVhakdEVzZrOUhXVDZEYXVNYWVrcmVYZ3Zyd0dUVWlHWjYtVXVMVFVGaU5rRkJKYVctQXMycGJHT3lpS0RKZWlfZEpCWU4yS3k1Mm0yNV9IMUs3UVF6NF84UWVIMXZKQWFjajJVZXIteldIMk9iU0toOFl6ZFFKa05nczBxdXdYMW9xVWxlWEhCQUtBOHBOVkJ0Y3E3QXRxaDdhZDVFZUZidUFrVVdDMmtYZHRYNm45Q0VuNGs4TmtIWW85T3Zmc0RWVVlQSnhlYUNNZGxELTlFbzFZSVMtMUtIOFBNY2d2bFpQMjFhaUdlcnJWT1R1U1dlaWlOTkxNenhDZ3hQb3B2UElvYklQcTJjcVV1T2pBT19qMkEweGNyckFib2tRb01rcUI0c0pURC1TbWhMLWZObElIV0J6ZXVIOERiTGU4Mkk1d3VqUlJxQ1NMbEgtdU10TkVxWU9sTGZPdENFVnZoSUpyVnlNZEhPX1dRYzRvMHdrNE1kMWlBU1VLbEhCaEROcjdJZHNVbUw2VGNFd1RXbkJJV3BwSGwxUWMwSkU4amRpVGNuNjBKa0lCSVI3TW9idHRuRHZQNmNfaUotdC1wNUkyWUctTFMzb3RaX2tFZHNVN1JMSmJBX3J3WW5VMkZmMUtfR05NeGFfLVNLempWZFBNS2pLOUItM1dJVXRSenFKdVdyRjBaOVdzQUNabkNVeXhpbklXOFA0dGstR19FYmNjMnJsZ1VIQ0RkcE5CVERSR0NzbkctQVBsNTJEcUZrY1kweHg2MEdIYWE0TEVXTGtuQ0JWNTlTczZ0Vk1JaUhodGJHRXpjUUE0YnMtOXZmYmw2MEpMajlCYkZuOTMtQUZUdWZIb2RJV0JBYWQ2TUZwRlNoaXBJT3ZXOHlGTV8tZVRBWmtMLTBTeFluWHhWb1NXdXpaQ3dCQ21NdnpUa2Z2RDNWNTRDLW44ZTY2eTVnMWkta1daZXdSMGl6UVF4dGxRX1czaHFXM0dyQnIxMnV3SzZiOEpQWVRYcVdXd2J4U0JkMEhDWmJnLU1JVnltNjRHV3FIMjdfbUNnOXdFY2lGeFg5UmtvaWZmR1FRVlZqUV9nU2JQUXhsNERXcV9qcTY1ZjVPeDF0TV9rX3JwY3J5aWtCWmFKVXZ6QnRidVJEenhJS2ZUWjVMcTA4dnh4TzZzZHR5ZVJNWjJ0Q1hkX2FtTk9qLVZiNFc5am9UQnRLRm1Vak1JeXdnMEh1YVQ0b05ZdkdhN0NQSkZJQU9oOUdGWjlUOEF5MmJ5VzNLLWNhQzdqVW1MQTltY3JvWEFjTHZsTDhGeXpaU3BPclRyVk8tZ1Fzd1E0YUdzRFlQR3lhS2dvY2lNRXItMnQ5X2xCa040a1pMNWhpNDBjenJDdm5tU0ZxRXdrX3VWMXRFamo5VWloeGhOWE1HY3hWSlFlR0lIOFJuZEZpNks2SzhFQ214ejBCd2pvYUpBbkFnZE5fM2hsOWtucnFZRDNHLVpLc09rVHdXZk0tSks0YTNWRmpOQjdwX3lvU1JzdkJtZ2hoc0pTeE02WGl6eElQYThObmtvdDJPZTBnSXVUSVFxQmF3X3pVbEVEbXE0Zmc2Mk54emtzRUZYQnI4d1RpTEY2OExOaENTYXp3TU5nZ3lCYm5vU1JCUlZocEhGYnFvYWl0TnFzY1NCaDlnTXNzNDUweE5CN0x4eUl1OWx1aUU3enM3T0JOaHFuNXI1aHVNOGUyb2NHRkhFbS1ReExPVjhWVUl2VHo0SGRwbEdvS2N5Y3NHZFkzWlhPdWpqZEJfYXVTaTV0TDQ4VnNTa1NDdW0yd21BNGJoZGt5eFp3Z1B1NUdvTzVlWVZOY29wUng3RmlLcUo4ZWlGbjk5R1hhMWJJLTBUYzVwNDVkMlZJTVhiNkZkMmZQOGJTOFdFZXp3aUdKMjVULWRDNlJWbHhoSnJxNFVtLWtxVTNzVEpydU9jSE1menJ6dU9ZUzdnbkNMZ3JpMDhqNGJ0MENValhJQUhZdzVTeFJFUVp1eEZaMG0yWG0xS0FTcGhWLUlsLUp3MGZrc1Q2RmNsZWhkUmppUWVBQ1ppeWVEMlJvRUYtRDkzVkVqSElPXzlrZjVMM3ZpcGtEMW82T2Jlb1JVWXRodzNEVk5CYkgtSW5kcmtNbFdiQ09lbU0tNlZNWjRfTDRTb1FJeG1jNDl5WkItNlE2X2M0Rm9YMWk5TUNPQ1FRWWZjdUNEMHdLUF9RcUhYOW4yR2lOSW91UEg3Ni0zQVQwcWk0bUFpNWdaRXNoRVp0SjJVRnJJWTlMclc5ZFJmLU1xX19NeFV4eGVDa2FrSjhhemJFLXdtQ25QS2JESkRpTUFSUGdXYzlhYWpTMll6ZGFONzlqZ2R6Zzc2aWFVNFRtdjYtQlRLcUdZNXA4SHE2VXNicjZFSGpLcEJrUlJSb0dGZ051eEh2SjRWOXNGNmliNGpvaG1QZlY4aW12cWZxd1JybEthRVVpVTRzQTUtVEoxSG0yNnYtb2pacUJMOEdXblBhdXBCUlJ4NG1kMGp5S2xkZTZxNF95QjluOF92NExHb01vendMRG5HalExZnN2V2RhNmRhaENOeFFIQmo5c3NjT053UU1pSGVUXzlEQWEwTUVNOWx3R3d6N1RyekVmc2MzRWp4NklwSVB2aGtwNjdXQklGV2hOSkNWTDZVMjExclNPZGtfUmlncF9fdXVMUDRnVjVGX09uUy1WMjgxUGRRbnFkbE1rQWpVN3FxR3JNaU5IVVU4cVpfWmcubHUwa2JuNGw3cHhwaUNkVzBTOVc4WlVnM1M0VE9uaTV4bm1TdHVBZnc3OA"}, [
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
  'db6dcc28-a4d0-451b-b87e-5adfbc262417',
  'x-ms-request-id',
  '7efbe3e5-5aba-491a-9048-af59ced3c004',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7126;ra_notif_age=8209;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:36 GMT',
  'Content-Length',
  '3706'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/secrets/secrettrace165101295898304139')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/secrettrace165101295898304139","deletedDate":1651012957,"scheduledPurgeDate":1651617757,"id":"https://keyvault_name.vault.azure.net/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4","attributes":{"enabled":true,"created":1651012956,"updated":1651012957,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ddb36511-fe9e-4389-80e9-eba0f2cd318c',
  'x-ms-request-id',
  '1b726054-c81c-4842-8f20-08285b25a1c7',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7126;ra_notif_age=8209;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:37 GMT',
  'Content-Length',
  '420'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/secrettrace165101295898304139')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: secrettrace165101295898304139"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '103',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f34c95f9-fff4-4c59-8c82-0ae875d962a2',
  'x-ms-request-id',
  'c31de8b6-c3f0-4fcd-be75-a2fc8dce6b53',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7127;ra_notif_age=8209;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/secrettrace165101295898304139')
  .query(true)
  .reply(404, {"error":{"code":"SecretNotFound","message":"Deleted Secret not found: secrettrace165101295898304139"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '103',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '29469bea-6bfb-416b-b1e5-9d12c1179be4',
  'x-ms-request-id',
  '12363020-b456-4492-bf10-34a07c9c1793',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1569;da_age=1569;rd_age=1569;brd_age=7127;ra_notif_age=8209;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedsecrets/secrettrace165101295898304139')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedsecrets/secrettrace165101295898304139","deletedDate":1651012957,"scheduledPurgeDate":1651617757,"id":"https://keyvault_name.vault.azure.net/secrets/secrettrace165101295898304139/f2c53dbedb8e45c29f837c316c5903c4","attributes":{"enabled":true,"created":1651012956,"updated":1651012957,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '254cabfe-26fc-4ab9-b061-ca5a3a5f8e5f',
  'x-ms-request-id',
  'ecf7f1eb-d3d2-4715-b074-de97f5ec20d7',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1574;da_age=1574;rd_age=1574;brd_age=7132;ra_notif_age=8214;dec_lev=0;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:42 GMT',
  'Content-Length',
  '420'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedsecrets/secrettrace165101295898304139')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '29955234-114e-447d-9b06-312126bb4245',
  'x-ms-request-id',
  '10a150ad-2dca-42d0-ae6f-f4134bb6389f',
  'x-ms-keyvault-service-version',
  '1.9.378.1',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=131.107.159.98;act_addr_fam=InterNetwork;',
  'x-ms-keyvault-rbac-assignment-id',
  '0cc3cf84-3de1-5005-ab06-0ef4d04fa1de',
  'x-ms-keyvault-rbac-cache',
  'ra_age=1574;da_age=1574;rd_age=1574;brd_age=7132;ra_notif_age=8214;dec_lev=1;',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'Date',
  'Tue, 26 Apr 2022 22:42:42 GMT'
]);
