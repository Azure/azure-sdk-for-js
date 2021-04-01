let nock = require('nock');

module.exports.hash = "e3934ac4f2e65a6ed21b91952a328e5a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create')
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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '049931e7-a851-49c0-824e-500d74614cb6',
  'x-ms-request-id',
  '0e6218ce-4bce-487e-aba3-2b56a0e6eb79',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create')
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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9a11665d-12c4-4b5e-88dc-69a2fa561821',
  'x-ms-request-id',
  'f0bf3f3f-d7eb-4f0c-adfb-8d9b06433cf9',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:37 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '3286e4a7-850f-48b0-abfc-ab367208de00',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=ApffkFGI7r1MhyrBI3fmgmcL6tuIAQAAAPLa6tcOAAAA; expires=Wed, 21-Apr-2021 18:37:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 22 Mar 2021 18:37:38 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  'a314694d-b978-44fa-a3cd-229fc7a5e900',
  'x-ms-ests-server',
  '2.1.11562.10 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnfHrTrQQU5FiBGdG6jaQFoL6tuIAQAAAPLa6tcOAAAA; expires=Wed, 21-Apr-2021 18:37:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 22 Mar 2021 18:37:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/e7d8fc1c64694b9e955a6c05c168ae9b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tRsIFYLLCIMn4ZdPwqd-YnvJJHf4j70lmchMRqOM0RDImTwoppO5pX2G09EM3SyeD6K7CWzXak5tETAaAVxiVsB7lf276-mktD-AgSJhKe6sFV-7DtBV-02Uxh-o6zPYWHQ70B_qp1U8nPuG47Gygx80YNxmn14Zqwufrgk08MdOXYI5uCdnpC-OeL4XX5C_xRkT6gLfBGyDbX6FqORJO-Vf480nhzB01jFhVTatFOryvavkNCh8CRTexP8KB19xSzTP9kIOutvU3DSzP1c7Ne7spzx4RcjQLaJdq8yL3yzQibBitdh_ZGM9tmOt2vFUXqKNNTGos2xPsf8TN2SPbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '049931e7-a851-49c0-824e-500d74614cb6',
  'x-ms-request-id',
  '1ffa8234-bf74-444e-aec4-e0abeabd4e45',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:38 GMT',
  'Content-Length',
  '751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/4f09bb768ff94f89b6ffa9790e112470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2LQofxL12eMckzKtrde8blM6c7-uNvh8ZTl01HrglUw85niBZ6x5a8stNLtwK5ytnBgk7hbOqKagyrADeI2kvqE8wTcgSksYuROiU0W4Gk65xSLWebLPp4efv6bg17iKujdy4WprwpshdsLJRoNguCs9LP2B5OP0ToMtfUGW3Nog4nskizKACGdhE3cMvMXv4rmFN_CewJSoSMms4yRpuofOoWtBdgrmEe1XmiMUaTIruRYR8SxKfoahJWROcZx6h56stI345lfkmvJbG6meZsSeYOxdsw1kWdfaRFI8h__AxXlAnJmQJdb5rp_J28_cDgjczAAQ-h5nHfOaxo-vbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '9a11665d-12c4-4b5e-88dc-69a2fa561821',
  'x-ms-request-id',
  '281302f9-1a7e-4aed-a4c8-b89482aecf39',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:39 GMT',
  'Content-Length',
  '751'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1616438259,"scheduledPurgeDate":1624214259,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/4f09bb768ff94f89b6ffa9790e112470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2LQofxL12eMckzKtrde8blM6c7-uNvh8ZTl01HrglUw85niBZ6x5a8stNLtwK5ytnBgk7hbOqKagyrADeI2kvqE8wTcgSksYuROiU0W4Gk65xSLWebLPp4efv6bg17iKujdy4WprwpshdsLJRoNguCs9LP2B5OP0ToMtfUGW3Nog4nskizKACGdhE3cMvMXv4rmFN_CewJSoSMms4yRpuofOoWtBdgrmEe1XmiMUaTIruRYR8SxKfoahJWROcZx6h56stI345lfkmvJbG6meZsSeYOxdsw1kWdfaRFI8h__AxXlAnJmQJdb5rp_J28_cDgjczAAQ-h5nHfOaxo-vbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4bdccd60-bcb3-4d8e-bd1f-b799d71f1f7d',
  'x-ms-request-id',
  '946d6c9d-e6e9-4932-aa79-da3e603153a6',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:38 GMT',
  'Content-Length',
  '956'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '467231ad-038b-4529-86cd-d3d6e7583af5',
  'x-ms-request-id',
  '2a13a87f-e939-42a3-9e44-bb55b3f41237',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '908f70e3-b160-45d1-9df4-001de7ceb50f',
  'x-ms-request-id',
  'b89a83c9-6305-4230-8872-c3f7b802021a',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'ec3326bc-57fd-4443-a4f8-027c9e5306da',
  'x-ms-request-id',
  '7afab384-b342-492a-9dab-71dbbb95a847',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '0d88b6ca-ca08-4b75-892d-e867216b1257',
  'x-ms-request-id',
  'd423be2e-b758-4594-bd20-be50ec6f95d0',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '901c6e24-3b4b-4933-a50e-e4207673fa1e',
  'x-ms-request-id',
  'ec25d732-9540-49d9-9b3e-10f93e0d4367',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bc430afe-f21b-4159-86a2-882f2c2166df',
  'x-ms-request-id',
  'c7ad2f8f-b239-45ad-90ad-03adbeb9d0b6',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '22dcfe63-0add-4f07-b28d-152d21a05caf',
  'x-ms-request-id',
  '4c911cc1-fae2-4108-867b-81d27a1202b1',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'df421fbd-8374-44bd-b8f7-6054a097f9b3',
  'x-ms-request-id',
  'c9159ce5-78c6-4ba4-bcc7-3407a8167762',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '27b639da-5ff5-4cf7-ab63-551bcfe8da54',
  'x-ms-request-id',
  '34c63569-69fc-4aaa-aa3f-0d8536fcff57',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '49435766-d2bf-4aa0-9b5b-4242c0864bca',
  'x-ms-request-id',
  'fa79cf90-b8f2-48ed-94f0-85bfab282807',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '945b99b9-d9cb-4fdc-acd1-40828cb612f7',
  'x-ms-request-id',
  '8ac18d51-21b3-4a3d-9075-f27ca78a7288',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:37:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e56cde93-9d4f-4cb0-807c-bc25c3c7eb32',
  'x-ms-request-id',
  '02f27a18-8a18-49dc-9dfc-cb23786ded13',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '82775cf3-1d66-4daf-8150-42e0c04709fc',
  'x-ms-request-id',
  '877cde90-59d1-4c9e-a8d6-a5f6bbf03f10',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '4223a892-3e0f-4181-889c-a9c8d42e996e',
  'x-ms-request-id',
  '33532cfc-bed7-4da2-b6d6-71e250546aab',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1616438259,"scheduledPurgeDate":1624214259,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/4f09bb768ff94f89b6ffa9790e112470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2LQofxL12eMckzKtrde8blM6c7-uNvh8ZTl01HrglUw85niBZ6x5a8stNLtwK5ytnBgk7hbOqKagyrADeI2kvqE8wTcgSksYuROiU0W4Gk65xSLWebLPp4efv6bg17iKujdy4WprwpshdsLJRoNguCs9LP2B5OP0ToMtfUGW3Nog4nskizKACGdhE3cMvMXv4rmFN_CewJSoSMms4yRpuofOoWtBdgrmEe1XmiMUaTIruRYR8SxKfoahJWROcZx6h56stI345lfkmvJbG6meZsSeYOxdsw1kWdfaRFI8h__AxXlAnJmQJdb5rp_J28_cDgjczAAQ-h5nHfOaxo-vbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c5217c25-9ab6-493a-8c72-d9192f04ba18',
  'x-ms-request-id',
  '4f6f2406-38d0-4bce-a9e8-e04e6cdaf3ca',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:07 GMT',
  'Content-Length',
  '956'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '1807f85d-84df-46dc-a814-89e8fa30da68',
  'x-ms-request-id',
  '241fcf41-1517-44c5-9fa8-7babc2fc7e7c',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1616438288,"scheduledPurgeDate":1624214288,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/e7d8fc1c64694b9e955a6c05c168ae9b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tRsIFYLLCIMn4ZdPwqd-YnvJJHf4j70lmchMRqOM0RDImTwoppO5pX2G09EM3SyeD6K7CWzXak5tETAaAVxiVsB7lf276-mktD-AgSJhKe6sFV-7DtBV-02Uxh-o6zPYWHQ70B_qp1U8nPuG47Gygx80YNxmn14Zqwufrgk08MdOXYI5uCdnpC-OeL4XX5C_xRkT6gLfBGyDbX6FqORJO-Vf480nhzB01jFhVTatFOryvavkNCh8CRTexP8KB19xSzTP9kIOutvU3DSzP1c7Ne7spzx4RcjQLaJdq8yL3yzQibBitdh_ZGM9tmOt2vFUXqKNNTGos2xPsf8TN2SPbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'a9bf82e6-263f-439e-ab77-4f55245cd15e',
  'x-ms-request-id',
  '42a41012-8660-4d8f-9b4a-7c2113af15bb',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:08 GMT',
  'Content-Length',
  '956'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a464d556-9227-4cda-9d60-74dadcbeb3e2',
  'x-ms-request-id',
  '6a74d90b-bd81-4e30-be7d-c450513d9bf1',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b48e64ba-651f-4b56-98f6-6ef615a72294',
  'x-ms-request-id',
  '10eb9aee-057e-4266-ad71-0f93d1cf9719',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8626ab89-d1be-452c-b771-140c380a497c',
  'x-ms-request-id',
  '75a16044-f863-4056-891c-cfb85d0832da',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9918259f-3174-4f49-a864-bf0af91684ae',
  'x-ms-request-id',
  '81938a7c-473d-4ad2-b977-0a11999a8ccc',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '9ac69daf-d49a-4b2d-95c0-79b622cd12d6',
  'x-ms-request-id',
  '8b8d8886-7379-41b5-9c64-cee511789380',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '6fd0e09e-1a35-4eec-b2f5-38d833369942',
  'x-ms-request-id',
  '92a8503b-660c-46dd-8475-0c1b735bd403',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'a0ca0a49-690e-4fcb-9e66-75fa9b354891',
  'x-ms-request-id',
  '26253c30-7fe6-4835-9d30-0a2881fea1e6',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b350d5e0-6fe8-41a1-bbdf-71baa39104ae',
  'x-ms-request-id',
  '2da0954c-a0d7-4a94-ae7c-f3c0549ae02b',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '8d429528-19e4-40bc-948b-20e04a632de6',
  'x-ms-request-id',
  'f9d241bf-56bf-4f04-a8dd-152d8b7c5e46',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'e7766927-17a2-44fe-bbd5-c63c3f7743bc',
  'x-ms-request-id',
  'b897f701-701c-4cf9-968f-a2ef7e020dbd',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'bf0372dd-26ff-4785-861f-124f8a7ef436',
  'x-ms-request-id',
  '2725b98c-ea97-4626-b86f-e08f385b9d1c',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '36567e99-1ba7-4267-a80d-db5ff850cbdf',
  'x-ms-request-id',
  '4d97166d-17f8-49b8-97e5-58a3bb148d2c',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '5e51bf6d-6ca9-412f-8c1e-3090e917b3d1',
  'x-ms-request-id',
  'a43a9713-d268-48cb-87d4-e7856642682f',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '586e57a7-cfa0-4f91-8879-c7897d5337c8',
  'x-ms-request-id',
  '56816e0c-0da8-4bfd-a6ca-962a3597c2b8',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  '240256e0-0d13-47c4-afd5-99097ec94e3c',
  'x-ms-request-id',
  '6e2232c0-cf09-41d4-8f05-c55e5abb5f57',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1616438288,"scheduledPurgeDate":1624214288,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/e7d8fc1c64694b9e955a6c05c168ae9b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tRsIFYLLCIMn4ZdPwqd-YnvJJHf4j70lmchMRqOM0RDImTwoppO5pX2G09EM3SyeD6K7CWzXak5tETAaAVxiVsB7lf276-mktD-AgSJhKe6sFV-7DtBV-02Uxh-o6zPYWHQ70B_qp1U8nPuG47Gygx80YNxmn14Zqwufrgk08MdOXYI5uCdnpC-OeL4XX5C_xRkT6gLfBGyDbX6FqORJO-Vf480nhzB01jFhVTatFOryvavkNCh8CRTexP8KB19xSzTP9kIOutvU3DSzP1c7Ne7spzx4RcjQLaJdq8yL3yzQibBitdh_ZGM9tmOt2vFUXqKNNTGos2xPsf8TN2SPbQ","e":"AQAB"},"attributes":{"enabled":true,"created":1616438258,"updated":1616438258,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '3def9780-a2b5-4ed7-bc04-47c091898a61',
  'x-ms-request-id',
  '5c7acb4a-4839-47e6-b182-804178f6a550',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:38 GMT',
  'Content-Length',
  '956'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-client-request-id',
  'b0896c84-eb36-4c34-8273-e73e90662c7e',
  'x-ms-request-id',
  '4d49ec6d-8069-47c5-a7f9-67931d7b26cf',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.68.29.36;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 22 Mar 2021 18:38:38 GMT'
]);
