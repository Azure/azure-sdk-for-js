let nock = require('nock');

module.exports.hash = "2b6e135f35a0c95ce68d415cb7bdec08";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  '46a3c3b4-a867-11eb-abf2-000d3aab33d0',
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
  '1b6d7a02-8ff1-41ee-ad8c-25f1cb0cd801',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApCTogXHR2hGiUq2iMeWbs-nSoKIAQAAAPDHG9gOAAAA; expires=Fri, 28-May-2021 21:18:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcOE6HjeFZzGXLNaU-NvfSeOh90nvELWkb6gNaJ_7u41gRr67gU2aOWl5froEoL3xPDSOeiX7ah7EEtNmWJsNEuxjuyX7T01UqIxSkYVP9EX9SMn8VAL1rT5hV5Iubw8jY_8tkC28m9Fq1ko0kUjtNCsAEkA5pDOAnyeftGdpRX4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:18:27 GMT',
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
  '520f343f-9393-46e4-a65c-da75851f4501',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApCTogXHR2hGiUq2iMeWbs-nSoKIAQAAAPDHG9gOAAAA; expires=Fri, 28-May-2021 21:18:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrcSi0xYkoxfSJUa-sp3dFP0Fwy4p-6hLbY0SfRCeOygGfwn2dc2lSRjG3sP1kqjXN46zZB2JWO_I4hGhdu74iwZ5iHk-aDqcqOM-OEdyb1QK3o-47891gfqLbddrmX-H-mO93chIZRS6vvcwjIwvFScxUjcnaBR28xlxZAUhp2m4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:18:27 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'd85b3d8a-8fe6-4af0-825f-449613a34500',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=ApCTogXHR2hGiUq2iMeWbs-nSoKIAgAAAPDHG9gOAAAA; expires=Fri, 28-May-2021 21:18:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:18:27 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"attributes":{"created":1619644708,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619644708},"key":{"e":"AQAB","key_ops":["wrapKey","decrypt","encrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/38ab5fddc7640dfa9ccdf0e4bcda3407","kty":"RSA-HSM","n":"rhE7Q4bARXn0HlHtwUXf8pZwcPL1Ivvmo_7y2ghAYqJSX7ROiFFyKetuN-LCfg3YL_fTQ4m8gPRaGsk3A5TMoMvosiAYLLaEo8PYvQA3zO-QO-MK9E8VrxXAMKa0dTOxwADduUwxH2Kj-zMPbqAztx0hBFm-WzOriSe-eqsOT6oi09HkWaY6WMWDgt90a_xcVM-2CyhN_shOloWZcHFLAdDKRFxSY_ah5kFmvqTzOeBxcSP2F_Dy-UpbWxGrSrGrRCICLYJYAlqvmYDji_eQvDmOuXYwWiQpUzs3SMBlhPn5SkvoXBwqWSQWdfEWEuhSKdOypuUYYgK3S-db0r-b0Q"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '701',
  'x-ms-request-id',
  '46dba9c8-a867-11eb-abf2-000d3aab33d0',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '268',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup')
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
  '47136e3a-a867-11eb-abf2-000d3aab33d0',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":{"code":null,"message":null,"innererror":null},"startTime":1619644711,"endTime":null,"jobId":"8e4e18e805a94300a35a16443189f065","azureStorageBlobContainerUri":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 28 Apr 2021 21:18:31 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/backup/8e4e18e805a94300a35a16443189f065/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '47215a40-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2625',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/8e4e18e805a94300a35a16443189f065/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"8e4e18e805a94300a35a16443189f065","startTime":1619644711,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:33 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '48c1630e-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2325',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/8e4e18e805a94300a35a16443189f065/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"8e4e18e805a94300a35a16443189f065","startTime":1619644711,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:38 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '4b654bd4-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2416',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/8e4e18e805a94300a35a16443189f065/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-malegerec2hsm-2021042821183184","endTime":1619644722,"error":null,"jobId":"8e4e18e805a94300a35a16443189f065","startTime":1619644711,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:42 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '4e151df0-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '268',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2378',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1619644708,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619644708},"deletedDate":1619644723,"key":{"e":"AQAB","key_ops":["wrapKey","encrypt","decrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/38ab5fddc7640dfa9ccdf0e4bcda3407","kty":"RSA-HSM","n":"rhE7Q4bARXn0HlHtwUXf8pZwcPL1Ivvmo_7y2ghAYqJSX7ROiFFyKetuN-LCfg3YL_fTQ4m8gPRaGsk3A5TMoMvosiAYLLaEo8PYvQA3zO-QO-MK9E8VrxXAMKa0dTOxwADduUwxH2Kj-zMPbqAztx0hBFm-WzOriSe-eqsOT6oi09HkWaY6WMWDgt90a_xcVM-2CyhN_shOloWZcHFLAdDKRFxSY_ah5kFmvqTzOeBxcSP2F_Dy-UpbWxGrSrGrRCICLYJYAlqvmYDji_eQvDmOuXYwWiQpUzs3SMBlhPn5SkvoXBwqWSQWdfEWEuhSKdOypuUYYgK3S-db0r-b0Q"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/rsa1","scheduledPurgeDate":1627420723}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '833',
  'x-ms-request-id',
  '4f8f32b0-a867-11eb-abf2-000d3aab33d0',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '141',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1619644708,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619644708},"deletedDate":1619644723,"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","encrypt","decrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/38ab5fddc7640dfa9ccdf0e4bcda3407","kty":"RSA-HSM","n":"rhE7Q4bARXn0HlHtwUXf8pZwcPL1Ivvmo_7y2ghAYqJSX7ROiFFyKetuN-LCfg3YL_fTQ4m8gPRaGsk3A5TMoMvosiAYLLaEo8PYvQA3zO-QO-MK9E8VrxXAMKa0dTOxwADduUwxH2Kj-zMPbqAztx0hBFm-WzOriSe-eqsOT6oi09HkWaY6WMWDgt90a_xcVM-2CyhN_shOloWZcHFLAdDKRFxSY_ah5kFmvqTzOeBxcSP2F_Dy-UpbWxGrSrGrRCICLYJYAlqvmYDji_eQvDmOuXYwWiQpUzs3SMBlhPn5SkvoXBwqWSQWdfEWEuhSKdOypuUYYgK3S-db0r-b0Q"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/rsa1","scheduledPurgeDate":1627420723}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '4fb4dee8-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '833',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '30'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/rsa1')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '4fc85c02-a867-11eb-abf2-000d3aab33d0',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '103',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/rsa1/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"},"folder":"mhsm-malegerec2hsm-2021042821183184"})
  .query(true)
  .reply(202, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 28 Apr 2021 21:18:48 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.net/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'Retry-After',
  '0',
  'x-ms-request-id',
  '4feb6030-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '4813',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:50 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '52d80be0-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2824',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:54 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '5495c09e-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '3016',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:18:56 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '566fcb8a-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2494',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:19:01 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '592bfd1c-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2428',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:19:05 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '5bdf1ea4-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2304',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:19:10 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '5e7daeaa-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2272',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/b6f01f70bfc64d54a28b69e5ceed274b/pending')
  .query(true)
  .reply(200, {"endTime":1619644750,"error":null,"jobId":"b6f01f70bfc64d54a28b69e5ceed274b","startTime":1619644726,"status":"Succeeded","statusDetails":"Number of successful key versions restored: 2, Number of key versions could not overwrite: 0"}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'date',
  'Wed, 28 Apr 2021 21:19:15 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '61185a16-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '233',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '2645',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/rsa1/')
  .query(true)
  .reply(200, {"attributes":{"created":1619644708,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1619644708},"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","decrypt","encrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/rsa1/38ab5fddc7640dfa9ccdf0e4bcda3407","kty":"RSA-HSM","n":"rhE7Q4bARXn0HlHtwUXf8pZwcPL1Ivvmo_7y2ghAYqJSX7ROiFFyKetuN-LCfg3YL_fTQ4m8gPRaGsk3A5TMoMvosiAYLLaEo8PYvQA3zO-QO-MK9E8VrxXAMKa0dTOxwADduUwxH2Kj-zMPbqAztx0hBFm-WzOriSe-eqsOT6oi09HkWaY6WMWDgt90a_xcVM-2CyhN_shOloWZcHFLAdDKRFxSY_ah5kFmvqTzOeBxcSP2F_Dy-UpbWxGrSrGrRCICLYJYAlqvmYDji_eQvDmOuXYwWiQpUzs3SMBlhPn5SkvoXBwqWSQWdfEWEuhSKdOypuUYYgK3S-db0r-b0Q"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '62bb66d8-a867-11eb-abf2-000d3aab33d0',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '701',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210407-3-27236ed1-develop',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=Ipv4;',
  'x-ms-server-latency',
  '32'
]);
