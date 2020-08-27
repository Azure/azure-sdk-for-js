let nock = require('nock');

module.exports.hash = "41acd412c2d6e758eda95e5773894335";

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
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'b261f329-a496-42d6-a27e-8ffb6f4d0fb6',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:12 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
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
  '59a550e5-2eac-4b08-9019-574737ae2700',
  'x-ms-ests-server',
  '2.1.10963.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmDIk5D773RLr5kR_38plpc_aSJHAQAAACQ_0tYOAAAA; expires=Sun, 20-Sep-2020 22:18:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 22:18:12 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0c88b5671ff442668658cc6fee6fac23","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t3QhcnjaQ9c-x-457lhqr3Oo2CUyudWGTqFhljpP2e0S_VDQX1IEFg3UqwXiQoEmIPNyy3RKoxFgSjMBCUXCM3uPcw9S0Ne6EkZWh0hiDFZbk1F3bYdaJKv5-5zVopfOr_uNBaYO5IQFNgxH_3LM6bRFxLWmkL0oyRSqzifFejvmdBLQnj1wTKuV9cmRAPFObekQRIRceL3mcBW8tmKE8fH4CO6QCyGuQ--7kIvky-XC3MkU8KQ3BNJMoTS9lqYdOkE4N8pedr6lIg4zz7w2ir4uAAAVYVPMM9pYWpXK7DL7w4PdZ8uQIEM3F6ck0wOA3mACaCDO6O5cOQ6rLkfRjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '1ec2e415-f48a-41ec-a3dc-62ca7359e5d4',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:13 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pJ8_eVR-plqfgU1gWXME1otsQ_xJwgM-wRWEpzVRf2JFe9AHulhdLx_abYF-DfTjjrD7XH7pL9n2rSltyCEjWusOwVncRwtF8sHI6jN8zbDOupsO6HN8U8zbEO9r53nPCC1YU7q5j9UaXx8aHU_C3pK8c5Lr8ULMjLc_txt3N6BhVGiHezCBT5RBRRTHWkt8iuj-wefutjvTvlMGpIBWYYolpfTqzgR8JCcOtDn04J60iu_Ia711AU685YYG08FmGfaIJKulFeor6ljJwg3CXj5OLANcHpL2DIuOhIuwHlTAexWTeToKZQFU_hcZsqlhLdu9vDK3vSIoEB_sPTpWLQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  'a776cc0b-b550-45c5-9ccb-c86d4a601637',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8')
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
  'x-ms-request-id',
  'd94a8318-079f-45a8-a14c-60f855785624',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT'
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
  'eda5b851-040b-4ce1-9966-968675df0700',
  'x-ms-ests-server',
  '2.1.10963.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmDIk5D773RLr5kR_38plpc_aSJHAgAAACQ_0tYOAAAA; expires=Sun, 20-Sep-2020 22:18:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pJ8_eVR-plqfgU1gWXME1otsQ_xJwgM-wRWEpzVRf2JFe9AHulhdLx_abYF-DfTjjrD7XH7pL9n2rSltyCEjWusOwVncRwtF8sHI6jN8zbDOupsO6HN8U8zbEO9r53nPCC1YU7q5j9UaXx8aHU_C3pK8c5Lr8ULMjLc_txt3N6BhVGiHezCBT5RBRRTHWkt8iuj-wefutjvTvlMGpIBWYYolpfTqzgR8JCcOtDn04J60iu_Ia711AU685YYG08FmGfaIJKulFeor6ljJwg3CXj5OLANcHpL2DIuOhIuwHlTAexWTeToKZQFU_hcZsqlhLdu9vDK3vSIoEB_sPTpWLQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '04313c71-32e4-4b62-af74-dd77a89b7cf3',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8/sign', {"alg":"RS384","value":"KOG6UkGPorV1g8WNtPmBbAIRxq22nbC6vBvhtkWKXcFz7QitxK5C-bzwjb2hbWm7"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8","value":"Xj6CUAcmQzv-hgwVECkYzA0ljlUQoT8KCAl8TlJRTtwnybUGor3KtqwSmIkz9oAqlpPiceOcFECt93sC1oEVdRB76avO4ago7oduUWfiBgTRHNZxkyriI-5cG_3I_m8VgOFagdVzdGEj_CjlOvF5tAFRLjxjdH7yhxL_JaB2B5IYkjce4unK9wmZtL0KKUIfmEGFgIQ0jUYeCR0yBI82_XdtGW1bXiRKbKhYvCeHzxmIegs2N4u-oVm_BUyiAJ_6NGk9G5EPS_e9tnjyhszVZlAF5NeNSAyceeLScAdX-y-PIf6UFMgWYEU0QkEP1Yv2iQxsWFe4AvhKP6lAVxr6Jw"}, [
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
  'x-ms-request-id',
  '79c30bf7-b5be-48c0-8831-d01733453386',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT',
  'Content-Length',
  '487'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8/verify', {"alg":"RS384","digest":"KOG6UkGPorV1g8WNtPmBbAIRxq22nbC6vBvhtkWKXcFz7QitxK5C-bzwjb2hbWm7","value":"Xj6CUAcmQzv-hgwVECkYzA0ljlUQoT8KCAl8TlJRTtwnybUGor3KtqwSmIkz9oAqlpPiceOcFECt93sC1oEVdRB76avO4ago7oduUWfiBgTRHNZxkyriI-5cG_3I_m8VgOFagdVzdGEj_CjlOvF5tAFRLjxjdH7yhxL_JaB2B5IYkjce4unK9wmZtL0KKUIfmEGFgIQ0jUYeCR0yBI82_XdtGW1bXiRKbKhYvCeHzxmIegs2N4u-oVm_BUyiAJ_6NGk9G5EPS_e9tnjyhszVZlAF5NeNSAyceeLScAdX-y-PIf6UFMgWYEU0QkEP1Yv2iQxsWFe4AvhKP6lAVxr6Jw"})
  .query(true)
  .reply(200, {"value":true}, [
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
  'x-ms-request-id',
  '5744ab9d-7a59-44e9-a2c1-4f01741add83',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:14 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598048295,"scheduledPurgeDate":1605824295,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pJ8_eVR-plqfgU1gWXME1otsQ_xJwgM-wRWEpzVRf2JFe9AHulhdLx_abYF-DfTjjrD7XH7pL9n2rSltyCEjWusOwVncRwtF8sHI6jN8zbDOupsO6HN8U8zbEO9r53nPCC1YU7q5j9UaXx8aHU_C3pK8c5Lr8ULMjLc_txt3N6BhVGiHezCBT5RBRRTHWkt8iuj-wefutjvTvlMGpIBWYYolpfTqzgR8JCcOtDn04J60iu_Ia711AU685YYG08FmGfaIJKulFeor6ljJwg3CXj5OLANcHpL2DIuOhIuwHlTAexWTeToKZQFU_hcZsqlhLdu9vDK3vSIoEB_sPTpWLQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '427e088c-4408-4be2-8275-23f6c6dbba6d',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:15 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  'e1f0030d-b34c-46b9-93f7-66e96a806fba',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '4e0b3ab7-0c73-4344-b501-a377c7412e77',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '43856105-a79c-4cc1-89cf-b405866b0dde',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  'e7913d1c-3711-4a55-a8d8-cd4a3455cbf3',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '0419bea4-02d5-4865-90a3-2de3704b9d00',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  'd5c6c900-4908-44bc-a905-6eb0d6d8586c',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '35f2c45b-db37-44fe-a87b-93d773c0a281',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '548b2ff0-244e-4827-8f76-da7c2ecf1ed1',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '58e35335-0687-4029-82df-71c705a111c5',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '45664a00-cc98-4d71-9aa2-97570ee5a880',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'eastus',
  'x-ms-request-id',
  '735ce262-80f9-468a-afb1-330229626bd6',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598048295,"scheduledPurgeDate":1605824295,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/c19aea6a9cdc470d8d1bc09807d2e1f8","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"pJ8_eVR-plqfgU1gWXME1otsQ_xJwgM-wRWEpzVRf2JFe9AHulhdLx_abYF-DfTjjrD7XH7pL9n2rSltyCEjWusOwVncRwtF8sHI6jN8zbDOupsO6HN8U8zbEO9r53nPCC1YU7q5j9UaXx8aHU_C3pK8c5Lr8ULMjLc_txt3N6BhVGiHezCBT5RBRRTHWkt8iuj-wefutjvTvlMGpIBWYYolpfTqzgR8JCcOtDn04J60iu_Ia711AU685YYG08FmGfaIJKulFeor6ljJwg3CXj5OLANcHpL2DIuOhIuwHlTAexWTeToKZQFU_hcZsqlhLdu9vDK3vSIoEB_sPTpWLQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '6350a937-5ee4-468c-ba96-4b4d6179e41f',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:35 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test2')
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
  'x-ms-request-id',
  '6c089822-0692-4fc2-b6a7-9798f6e5411d',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598048317,"scheduledPurgeDate":1605824317,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0c88b5671ff442668658cc6fee6fac23","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t3QhcnjaQ9c-x-457lhqr3Oo2CUyudWGTqFhljpP2e0S_VDQX1IEFg3UqwXiQoEmIPNyy3RKoxFgSjMBCUXCM3uPcw9S0Ne6EkZWh0hiDFZbk1F3bYdaJKv5-5zVopfOr_uNBaYO5IQFNgxH_3LM6bRFxLWmkL0oyRSqzifFejvmdBLQnj1wTKuV9cmRAPFObekQRIRceL3mcBW8tmKE8fH4CO6QCyGuQ--7kIvky-XC3MkU8KQ3BNJMoTS9lqYdOkE4N8pedr6lIg4zz7w2ir4uAAAVYVPMM9pYWpXK7DL7w4PdZ8uQIEM3F6ck0wOA3mACaCDO6O5cOQ6rLkfRjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '8e4e1385-11d9-4b94-836f-6b422aefb2ff',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:37 GMT',
  'Content-Length',
  '886'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a8ba5d8e-3be9-4eab-a225-bc418a558493',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:37 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '40f9d438-105a-45c7-a85f-c931d3474f02',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:37 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a58ef5ad-83e9-4149-aa0e-3d997b5ffb2a',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:39 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'd9d195ca-24b0-44d1-af8b-69f3f28aec91',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:41 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '49c0d288-9402-4cc4-97a1-5efa1cdef9c9',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:43 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '15ecbd7e-807e-478e-af4f-59f50c31065d',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:45 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '181e00f9-1182-4f42-8ae3-d38e8d95de72',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:47 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '59a2415d-1863-40ea-8bb2-506a1deabda8',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:49 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'a53e501c-b812-40aa-bf6c-9eac6d5e88ce',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:51 GMT'
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
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '59c85b20-5ac2-4993-b259-9e77ec88329e',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598048317,"scheduledPurgeDate":1605824317,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/0c88b5671ff442668658cc6fee6fac23","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"t3QhcnjaQ9c-x-457lhqr3Oo2CUyudWGTqFhljpP2e0S_VDQX1IEFg3UqwXiQoEmIPNyy3RKoxFgSjMBCUXCM3uPcw9S0Ne6EkZWh0hiDFZbk1F3bYdaJKv5-5zVopfOr_uNBaYO5IQFNgxH_3LM6bRFxLWmkL0oyRSqzifFejvmdBLQnj1wTKuV9cmRAPFObekQRIRceL3mcBW8tmKE8fH4CO6QCyGuQ--7kIvky-XC3MkU8KQ3BNJMoTS9lqYdOkE4N8pedr6lIg4zz7w2ir4uAAAVYVPMM9pYWpXK7DL7w4PdZ8uQIEM3F6ck0wOA3mACaCDO6O5cOQ6rLkfRjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1598048293,"updated":1598048293,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'x-ms-request-id',
  '5249d5b8-281b-4dfa-92a2-56944e20c37b',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:56 GMT',
  'Content-Length',
  '886'
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
  'eastus',
  'x-ms-request-id',
  'beee98ee-17c3-4db1-afa3-1141ce43d8a0',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:18:56 GMT'
]);
