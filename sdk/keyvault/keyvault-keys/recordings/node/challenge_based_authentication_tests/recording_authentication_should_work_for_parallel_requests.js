let nock = require('nock');

module.exports.hash = "e7609d71c263c79d760405b456cab059";

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
  'westus',
  'x-ms-request-id',
  '29148741-4e88-4afd-bded-0df522d40597',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:52 GMT'
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
  'westus',
  'x-ms-request-id',
  '89274ec3-6732-4bfa-a799-1ebd7cff7cce',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:52 GMT'
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
  'dfd09080-4394-4daa-804e-7e0d169b0900',
  'x-ms-ests-server',
  '2.1.11384.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AphSzQYwOr5Ip6jlF4Ooco8_aSJHAQAAADElj9cOAAAA; expires=Thu, 11-Feb-2021 05:05:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT'
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
  'c68d8ed3-709b-4f6b-a730-7745e9380d00',
  'x-ms-ests-server',
  '2.1.11397.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvMmCtiFEM9IrLy2iVKhKsM_aSJHAQAAADAlj9cOAAAA; expires=Thu, 11-Feb-2021 05:05:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/fce5b9cc787340108985b58b443acbac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rDBbRm7zpMr5tyuCkaSQOpH6PMyx6kGCEIjw6aJ1cGkvsRO4s72uzHb-RBKHi1-MA-ybmeJvitaBuKtV2IaKmXAgSiWYWoSgX9ZxxN1F2pfqcpLVXSE5x68pdrWp8vSHz3uOlYVeENMRNJbgq2rM948s7e8faB7A6KW6qtE1WVoLvJ7_iJOnqvHRkYpl3GWk_fzIdyEuPwLFC_0dqOObB_trzD3l2do38GZ_2gETtk0gF_M6IeOUONrTgwRlDmGHWZ2NRdAKPeo40k_J3cXtUk8HLEqTe9fK0OKj_aKAE1JgH0AAjqWM0gsTG25bXaVfj7TwE1dk3Wu9i3WhyF__hQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9055842b-51b7-444e-a24a-6f99fc07c977',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:52 GMT',
  'Content-Length',
  '757'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/48bc0a87e91949bbb1c12ebaa1231470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wnb8zxecj9HAmhKs07-4CmtqLPsKnZaiIa4bZRkCmY-Y9atoIvKhZufwh_GPmdanZ2b1IK7UfNmjKntZkdSJ9x3peyRz8O9K8Izgh9PI8xajtazQtl8AoSesizzGxBdTIH8yzSKjmHUSOkGIPyO6csx4HqLvQp_SRAJYpe59v4v31FSQJBQNT0MVuWPkpojuYNxCZJUdBHuj8LxcOhvSzPzqXn1BeuwndsXKjtw4Hm5cFmMxz5g7xADrth62IyAjcWNr_y5Lk5Ga7OekXsUgj2HaG-eC2IAry9PbdCpAjHqVzs13dHwPknnrHjbsISZaokwF2vH7y-2ofhI6_oNMZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '227e8770-ce7b-421c-99df-88b5b94276ac',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT',
  'Content-Length',
  '757'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610427953,"scheduledPurgeDate":1618203953,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/48bc0a87e91949bbb1c12ebaa1231470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wnb8zxecj9HAmhKs07-4CmtqLPsKnZaiIa4bZRkCmY-Y9atoIvKhZufwh_GPmdanZ2b1IK7UfNmjKntZkdSJ9x3peyRz8O9K8Izgh9PI8xajtazQtl8AoSesizzGxBdTIH8yzSKjmHUSOkGIPyO6csx4HqLvQp_SRAJYpe59v4v31FSQJBQNT0MVuWPkpojuYNxCZJUdBHuj8LxcOhvSzPzqXn1BeuwndsXKjtw4Hm5cFmMxz5g7xADrth62IyAjcWNr_y5Lk5Ga7OekXsUgj2HaG-eC2IAry9PbdCpAjHqVzs13dHwPknnrHjbsISZaokwF2vH7y-2ofhI6_oNMZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7675585a-db36-4819-be01-7fdd039f3067',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT',
  'Content-Length',
  '968'
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
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '949714d7-75aa-4df6-aebe-818c9a65e44d',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT'
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
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e54c4116-8f8b-42d3-bf0d-cbeffd66ad7e',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1610427953,"scheduledPurgeDate":1618203953,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/48bc0a87e91949bbb1c12ebaa1231470","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wnb8zxecj9HAmhKs07-4CmtqLPsKnZaiIa4bZRkCmY-Y9atoIvKhZufwh_GPmdanZ2b1IK7UfNmjKntZkdSJ9x3peyRz8O9K8Izgh9PI8xajtazQtl8AoSesizzGxBdTIH8yzSKjmHUSOkGIPyO6csx4HqLvQp_SRAJYpe59v4v31FSQJBQNT0MVuWPkpojuYNxCZJUdBHuj8LxcOhvSzPzqXn1BeuwndsXKjtw4Hm5cFmMxz5g7xADrth62IyAjcWNr_y5Lk5Ga7OekXsUgj2HaG-eC2IAry9PbdCpAjHqVzs13dHwPknnrHjbsISZaokwF2vH7y-2ofhI6_oNMZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd80d0a75-4d97-4dfc-a6b6-6d19e12c3ef7',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:55 GMT',
  'Content-Length',
  '968'
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
  'westus',
  'x-ms-request-id',
  'c0125499-f9d2-450e-9fb9-12ddba72520c',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610427956,"scheduledPurgeDate":1618203956,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/fce5b9cc787340108985b58b443acbac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rDBbRm7zpMr5tyuCkaSQOpH6PMyx6kGCEIjw6aJ1cGkvsRO4s72uzHb-RBKHi1-MA-ybmeJvitaBuKtV2IaKmXAgSiWYWoSgX9ZxxN1F2pfqcpLVXSE5x68pdrWp8vSHz3uOlYVeENMRNJbgq2rM948s7e8faB7A6KW6qtE1WVoLvJ7_iJOnqvHRkYpl3GWk_fzIdyEuPwLFC_0dqOObB_trzD3l2do38GZ_2gETtk0gF_M6IeOUONrTgwRlDmGHWZ2NRdAKPeo40k_J3cXtUk8HLEqTe9fK0OKj_aKAE1JgH0AAjqWM0gsTG25bXaVfj7TwE1dk3Wu9i3WhyF__hQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'becd7f1c-ad9c-4243-a5ef-483c6d497236',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:55 GMT',
  'Content-Length',
  '968'
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
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '76740a08-8355-4a6f-bbfb-95d948f32b72',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:56 GMT'
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
  '150',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1e831cf9-3459-4c55-b68d-1259018a0716',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1610427956,"scheduledPurgeDate":1618203956,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/fce5b9cc787340108985b58b443acbac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rDBbRm7zpMr5tyuCkaSQOpH6PMyx6kGCEIjw6aJ1cGkvsRO4s72uzHb-RBKHi1-MA-ybmeJvitaBuKtV2IaKmXAgSiWYWoSgX9ZxxN1F2pfqcpLVXSE5x68pdrWp8vSHz3uOlYVeENMRNJbgq2rM948s7e8faB7A6KW6qtE1WVoLvJ7_iJOnqvHRkYpl3GWk_fzIdyEuPwLFC_0dqOObB_trzD3l2do38GZ_2gETtk0gF_M6IeOUONrTgwRlDmGHWZ2NRdAKPeo40k_J3cXtUk8HLEqTe9fK0OKj_aKAE1JgH0AAjqWM0gsTG25bXaVfj7TwE1dk3Wu9i3WhyF__hQ","e":"AQAB"},"attributes":{"enabled":true,"created":1610427953,"updated":1610427953,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '41e9c453-c37e-4f6d-9281-16c6048dbdd4',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:57 GMT',
  'Content-Length',
  '968'
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
  'westus',
  'x-ms-request-id',
  '722dde90-fa40-4200-bcea-3cdd4d248830',
  'x-ms-keyvault-service-version',
  '1.2.99.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=76.121.141.80;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 12 Jan 2021 05:05:58 GMT'
]);
