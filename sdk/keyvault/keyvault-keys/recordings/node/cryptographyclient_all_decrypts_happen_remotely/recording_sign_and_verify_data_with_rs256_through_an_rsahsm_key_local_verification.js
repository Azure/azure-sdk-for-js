let nock = require('nock');

module.exports.hash = "c9b7369e700af2f456d31f3ed2ea758d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '686c1192-d91c-4c17-acf4-d9f8c32b3246',
  'x-ms-request-id',
  'c8823993-5fc9-4684-b01d-1168ac93575c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:49 GMT'
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
  'a5c23f86-3c48-4fd5-9d25-a439af3a6001',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw4AAAAjyhvYDgAAAA; expires=Fri, 28-May-2021 21:29:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrUeB1HxN2hpmfXvOzcqYSsZ2G8KoQ8pFprkygAnshEP1d0DYE9ffU-xon4bvozSY-3n1iTMHdzPD_W4hZG51nz9sH4AgIuJXh8ubPFXzXn5wYuailIou8a5fhvs8mJzVCjHrt_iNfsO7Zv7JwWQKArkkp5oUJbXs8pblLhetuYLogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:29:49 GMT',
  'Content-Length',
  '980'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '78ca8339-4e14-4418-b2c8-9ef29b39d101',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw4AAAAjyhvYDgAAAA; expires=Fri, 28-May-2021 21:29:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrfmliC5yxhSqUUd63lKuPygRZHbcBFojBvKb7sNNbYC0jeiRSX8wRPqNzErkBmV0a3q-vsy_sSHeUrBd6C6QriRtWBSex9PcmK90Z2xER1GJQcZTE7Q6hQmOarQzZ37nqelYsP1YI5xQt4n4ksnZHalWl5UAXTLFFw7lpqmfF49AgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:29:49 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'bbf44c73-4fce-4bc3-89a6-a0137ca64a01',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6Uw4AAAAjyhvYDgAAAA; expires=Fri, 28-May-2021 21:29:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:29:49 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/cf87a0c36ce04e86bd78d5062bb6ff79","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1V5rjnFTh2i2bCZzZSacNbN2mWprUDh4RwLvESeFADjvtr8kDZwuVztYRC8bn39mcK1og03aLKQ1w0F4zZpFCLUFHT5M3_7ZJEbb6MmAjTVVFS2jSBvTu26AezDasBGpXwWZ_aXAb4lwF8sQi0qQa2a7024lwKfJunwYo-4uQizf7T6ub967d7pQwyJ0AjPjKfAlkdzU7AXgIBFdf_1fr8l0rpBvTa8ggb_xGQXKDWTvyQrksQjQH0o4gFqfqbNIGqp6gh8NvJPoh9eb_0b3sNRc3P_Rq2NVusBeMwlLmjoi4yD_q-17pymdkTU5avM034FBgDIMImRDAnxFS53BQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '686c1192-d91c-4c17-acf4-d9f8c32b3246',
  'x-ms-request-id',
  '6d78794f-eae0-4243-80c0-7cd1c8d8ab96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:49 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test3/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1XseKjIupjD2B4EVPZf8zeauqM9Ih_Y3cYo5ZqMFRcN3Nc-kdbCUMyGm5AhqecEOBUdO0-vlhohC9oAcxLblUjqlGiqRuavRs72xv8U5zdzjxVirGnx90V4lYr6ydyIE3Tu9qu6pd5d8Af3WyE2ErrpUg2ARGljonjhWyTTEIWtzT9VWLd4uoi8Qwi37cOTcyBs3jbFIiwGmziH0JtANs9yIt-ctOd5BO_ZMzSptNl9zBoSjQbifEXvGAlwxDVAvZ4fIH1g9_Crqh2ZdSym7KDw69OG1kkIa-nzaDCF2hVPppFI6kJk5v2WJcr348qKlnKXTDJLZ_5aEchAKkHK8Ew","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9d49e4a5-13cc-4791-bfe6-7fe8ee500401',
  'x-ms-request-id',
  '9e2e9464-0a2a-428b-ab03-83d725f0316f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:50 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/12345678-1234-1234-1234-123456789012", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '50132646-ebc3-457e-bfdf-a7c152bfebf9',
  'x-ms-request-id',
  '72a191d2-1673-4d6a-9f4b-b6f6cae54dae',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1XseKjIupjD2B4EVPZf8zeauqM9Ih_Y3cYo5ZqMFRcN3Nc-kdbCUMyGm5AhqecEOBUdO0-vlhohC9oAcxLblUjqlGiqRuavRs72xv8U5zdzjxVirGnx90V4lYr6ydyIE3Tu9qu6pd5d8Af3WyE2ErrpUg2ARGljonjhWyTTEIWtzT9VWLd4uoi8Qwi37cOTcyBs3jbFIiwGmziH0JtANs9yIt-ctOd5BO_ZMzSptNl9zBoSjQbifEXvGAlwxDVAvZ4fIH1g9_Crqh2ZdSym7KDw69OG1kkIa-nzaDCF2hVPppFI6kJk5v2WJcr348qKlnKXTDJLZ_5aEchAKkHK8Ew","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '50132646-ebc3-457e-bfdf-a7c152bfebf9',
  'x-ms-request-id',
  'e3e312fc-5352-404e-8121-210523e9739f',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:50 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396/sign', {"alg":"RS256","value":"ZVJEOpllu5j_M4_8rnEmS4gS33itKrPUvkizsz--EGE"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396","value":"XvKNaRQUNqNsFr2_FMHh_OML9Jf8zfoEN5Ba3lP41NHphxYAwNPgYmm75dK-mxVDghsfGPO8QSF7p7EO5pAJhmKbuA0h71juzkCIjwF6_72gqNnekZnRrXm8Ab69f8LXCppNulSjavutdqkVH2K0pqv6_q-BVr9pzcwfbBJEAgFMhkN2bWHWPiUW_WXn1gZfkP6zYco7kokLTViBKcSBgLA4nykiQy7SQIxq8_Pe5l_yG3s72tasQMdpHYkN0s8Ri783r45QGTyAvHxkYdlGDgZbaY8WZzqVaPybMpyJI5uFXcMINmgVgK3Mpq0204J-ymMv5XgXqNZLSTvlh7dbKg"}, [
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
  '65a9ad82-8935-4a21-b3bd-0d9797fc6886',
  'x-ms-request-id',
  '6f7d8dd6-d5b0-47a7-8890-da4cc6dafe96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:50 GMT',
  'Content-Length',
  '478'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test3')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3","deletedDate":1619645391,"scheduledPurgeDate":1620250191,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1XseKjIupjD2B4EVPZf8zeauqM9Ih_Y3cYo5ZqMFRcN3Nc-kdbCUMyGm5AhqecEOBUdO0-vlhohC9oAcxLblUjqlGiqRuavRs72xv8U5zdzjxVirGnx90V4lYr6ydyIE3Tu9qu6pd5d8Af3WyE2ErrpUg2ARGljonjhWyTTEIWtzT9VWLd4uoi8Qwi37cOTcyBs3jbFIiwGmziH0JtANs9yIt-ctOd5BO_ZMzSptNl9zBoSjQbifEXvGAlwxDVAvZ4fIH1g9_Crqh2ZdSym7KDw69OG1kkIa-nzaDCF2hVPppFI6kJk5v2WJcr348qKlnKXTDJLZ_5aEchAKkHK8Ew","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'c0ce6ecc-ccbe-4df3-b6a6-9fea5e67a361',
  'x-ms-request-id',
  '8eb2a129-dc7f-49a2-8154-ef3a59da2a44',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:51 GMT',
  'Content-Length',
  '885'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '11b205dd-8ea4-4977-b9b0-3cfac7f4883d',
  'x-ms-request-id',
  'c07f2c0c-70e3-41ac-9c68-cf3532937a85',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e7b82241-8325-4f7f-89c5-f31975f38088',
  'x-ms-request-id',
  'd29a3dc1-8a3b-474e-be22-92c902f69b96',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '99b9aafe-3765-495a-a918-3f0f3fa91b78',
  'x-ms-request-id',
  '04f4ad99-9d22-488d-9789-7266cd8249b8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '110',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '4f3c11a6-bd85-4a52-9978-009078c5aa2b',
  'x-ms-request-id',
  'd138b76a-1727-4b64-867f-e5edd6066dda',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3","deletedDate":1619645391,"scheduledPurgeDate":1620250191,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3/15ddc6020aa24c0e870ec042e474b396","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1XseKjIupjD2B4EVPZf8zeauqM9Ih_Y3cYo5ZqMFRcN3Nc-kdbCUMyGm5AhqecEOBUdO0-vlhohC9oAcxLblUjqlGiqRuavRs72xv8U5zdzjxVirGnx90V4lYr6ydyIE3Tu9qu6pd5d8Af3WyE2ErrpUg2ARGljonjhWyTTEIWtzT9VWLd4uoi8Qwi37cOTcyBs3jbFIiwGmziH0JtANs9yIt-ctOd5BO_ZMzSptNl9zBoSjQbifEXvGAlwxDVAvZ4fIH1g9_Crqh2ZdSym7KDw69OG1kkIa-nzaDCF2hVPppFI6kJk5v2WJcr348qKlnKXTDJLZ_5aEchAKkHK8Ew","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd271d2ee-dd0c-4095-9406-3a1a15181e1b',
  'x-ms-request-id',
  '76d9a796-46ad-4333-b86e-c787f3501188',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:57 GMT',
  'Content-Length',
  '885'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test3')
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
  'c1d6b373-67f2-44eb-9903-935997755690',
  'x-ms-request-id',
  'b40911e6-001e-45f2-b59c-1ca1abda20c0',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619645398,"scheduledPurgeDate":1620250198,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/cf87a0c36ce04e86bd78d5062bb6ff79","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1V5rjnFTh2i2bCZzZSacNbN2mWprUDh4RwLvESeFADjvtr8kDZwuVztYRC8bn39mcK1og03aLKQ1w0F4zZpFCLUFHT5M3_7ZJEbb6MmAjTVVFS2jSBvTu26AezDasBGpXwWZ_aXAb4lwF8sQi0qQa2a7024lwKfJunwYo-4uQizf7T6ub967d7pQwyJ0AjPjKfAlkdzU7AXgIBFdf_1fr8l0rpBvTa8ggb_xGQXKDWTvyQrksQjQH0o4gFqfqbNIGqp6gh8NvJPoh9eb_0b3sNRc3P_Rq2NVusBeMwlLmjoi4yD_q-17pymdkTU5avM034FBgDIMImRDAnxFS53BQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '75e1690a-3e88-49c7-a3ac-e61a40b4b3d8',
  'x-ms-request-id',
  '77ad502c-5b6e-42d1-9fa4-e4d4bcf36311',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:57 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fb2dd6b8-c3a3-4072-a4ec-886ea4c8d2d7',
  'x-ms-request-id',
  'f6968b8d-fcaf-4c4b-a582-4d0cbf724129',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'a0df4721-b25c-4a92-a3e3-1eeeaaec35d9',
  'x-ms-request-id',
  'ab881c19-9dc7-45d3-8142-1bb9abbc4b79',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:29:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b39a5bd9-3a83-4145-9546-fb90a7085474',
  'x-ms-request-id',
  '4ca91339-fca9-4623-a641-196849d82fa9',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:30:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '249b5550-70b8-4507-8dcd-c500183afde6',
  'x-ms-request-id',
  '597ad40b-78af-49f3-971a-9fdda74bb4ed',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:30:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619645398,"scheduledPurgeDate":1620250198,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/cf87a0c36ce04e86bd78d5062bb6ff79","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"1V5rjnFTh2i2bCZzZSacNbN2mWprUDh4RwLvESeFADjvtr8kDZwuVztYRC8bn39mcK1og03aLKQ1w0F4zZpFCLUFHT5M3_7ZJEbb6MmAjTVVFS2jSBvTu26AezDasBGpXwWZ_aXAb4lwF8sQi0qQa2a7024lwKfJunwYo-4uQizf7T6ub967d7pQwyJ0AjPjKfAlkdzU7AXgIBFdf_1fr8l0rpBvTa8ggb_xGQXKDWTvyQrksQjQH0o4gFqfqbNIGqp6gh8NvJPoh9eb_0b3sNRc3P_Rq2NVusBeMwlLmjoi4yD_q-17pymdkTU5avM034FBgDIMImRDAnxFS53BQQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619645390,"updated":1619645390,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '03944789-f7c4-42c9-b721-f78f16b60413',
  'x-ms-request-id',
  '718fea68-e5c6-4aa7-a501-a342f5fb4de7',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:30:04 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  '27ceab01-f00b-4047-942c-89343ef6b966',
  'x-ms-request-id',
  '4bc3bd22-32b0-4fce-8061-5116aaa355a8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:30:05 GMT'
]);
