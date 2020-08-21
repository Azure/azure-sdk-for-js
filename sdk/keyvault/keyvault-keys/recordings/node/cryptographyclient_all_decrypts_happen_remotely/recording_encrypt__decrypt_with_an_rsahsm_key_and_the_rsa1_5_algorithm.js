let nock = require('nock');

module.exports.hash = "896a9f87668c6e511862016838cd3eb3";

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
  '30b540b8-8b2f-407b-a9f1-82b68ba908dc',
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
  'Fri, 21 Aug 2020 16:33:30 GMT'
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
  '029344d7-b969-4ed2-8b77-c5cc66f00d00',
  'x-ms-ests-server',
  '2.1.10963.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnuryvoAAQlApUhCxqiZ1eA_aSJHAQAAAFnu0dYOAAAA; expires=Sun, 20-Sep-2020 16:33:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 16:33:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/1d0cc3ee5cd44d7c93883db302365848","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6AamyVK9g50K6DZgkBiQbce9dWSxWSYEOeh1wr2sT5s3BJBhb2LgdKCfBxznXBwG6r_ZnJvCgZDppXymO7D195dlED6u13Co1o3x095i0XpkobUWoIpwQoSGTwQhtm3DpEQIf6L0C4WUn60-LNvKXWqmde_3DgfOtX_eoSvRbv2eldOUaKQ_Hsa9IiYdHmicOIF66G8i-bKDtvFcm4iUjJwEjf5MmimEMAZgbss2427Z9pARXBPU58MkKTswpPQjmftnq37kcy0dtcZ-gvY59zNcKsFws-lI64KQasRXtkYhAdET9IQtRZyd1euBY2LcHSQLXpg6OKcR_yj2mCoDEw","e":"AQAB"},"attributes":{"enabled":true,"created":1598027610,"updated":1598027610,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2311c5d9-8a96-457f-9a20-c477eb3e5b01',
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
  'Fri, 21 Aug 2020 16:33:30 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"utQ_HS5PjrRzod0uuKIHFV42xKjKjWbW4xhdW6Qvl6i85CutY92rttEMAjRen92bE9R5iVPoF6cNbdTiG7xu7cAKxATWEVhDRVxzu-wO-lPN-ehAPtTOpRXRNlgrJXM3s0btAqV8yTqzKT5uwXxtWS2bEhbBniSyjZbsuRRusZ0-yo9jlOciXJZ4OxUC9mnm18YiXVeWl2Hcfr4cGaFEMjMV9X2C0fi_RZWq7F6N8_XaF8u4dxpBWs2okb5dcdMmRLn1TwH_tc_W7j3MkqEstzZnccS5_sHIkOJJ-yOGuypLkmI595K_V2WrCnAEz0_vrIYuROaNL9G4GH2wmEgwrQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598027611,"updated":1598027611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'fe7137d9-d03b-4a89-b871-3c6ddfb4240d',
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
  'Fri, 21 Aug 2020 16:33:31 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c')
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
  '77a2f6de-7748-4afc-931d-ecaf5b8e459f',
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
  'Fri, 21 Aug 2020 16:33:31 GMT'
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
  'c214bb05-fa72-46fb-b97d-798666e11c00',
  'x-ms-ests-server',
  '2.1.10963.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnuryvoAAQlApUhCxqiZ1eA_aSJHAgAAAFnu0dYOAAAA; expires=Sun, 20-Sep-2020 16:33:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 16:33:31 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"utQ_HS5PjrRzod0uuKIHFV42xKjKjWbW4xhdW6Qvl6i85CutY92rttEMAjRen92bE9R5iVPoF6cNbdTiG7xu7cAKxATWEVhDRVxzu-wO-lPN-ehAPtTOpRXRNlgrJXM3s0btAqV8yTqzKT5uwXxtWS2bEhbBniSyjZbsuRRusZ0-yo9jlOciXJZ4OxUC9mnm18YiXVeWl2Hcfr4cGaFEMjMV9X2C0fi_RZWq7F6N8_XaF8u4dxpBWs2okb5dcdMmRLn1TwH_tc_W7j3MkqEstzZnccS5_sHIkOJJ-yOGuypLkmI595K_V2WrCnAEz0_vrIYuROaNL9G4GH2wmEgwrQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598027611,"updated":1598027611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f24a3946-0e28-4d83-92da-eb76337286cc',
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
  'Fri, 21 Aug 2020 16:33:32 GMT',
  'Content-Length',
  '723'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c/decrypt', {"alg":"RSA1_5","value":"OwR7FhkqSaIv4RXMs5o4F1Yx8X8W6BS1yVLaLZW03bBJCIa3yuYcP0PCRTtvchKzEu9Ksjl5uVdlazTefHakh5AIE5mi5ZpWEIU0tXq_9jD0ZpMaK-hyuv5T7OzdDKqt5pCx-Te_sHfx6M7IPHOwnV8wqQTloMMOdJLmVbKC4lUeAtk3wStr7J_UcoJoiQV_ULkxQSau2qRaDFLQUyOIXEynO9uCZza2_0hCDpTbHbjsvAAWy5S-KQhPFixM9wMM5ehl78VD8BZ_tI8IvYqYO7CnW5EDCVNCzJsfvA0YdLiV48Vhk_5TwkxgreWv-HrBOc6v09xaF9NYlD_vHBAueg"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c","value":"ZW5jcnlwdCAmIGRlY3J5cHQgd2l0aCBhbiBSU0EtSFNNIGtleSBhbmQgdGhlIFJTQTFfNSBhbGdvcml0aG0"}, [
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
  'f2bb2403-d4b0-4b03-8363-d552da182e36',
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
  'Fri, 21 Aug 2020 16:33:32 GMT',
  'Content-Length',
  '228'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598027612,"scheduledPurgeDate":1605803612,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"utQ_HS5PjrRzod0uuKIHFV42xKjKjWbW4xhdW6Qvl6i85CutY92rttEMAjRen92bE9R5iVPoF6cNbdTiG7xu7cAKxATWEVhDRVxzu-wO-lPN-ehAPtTOpRXRNlgrJXM3s0btAqV8yTqzKT5uwXxtWS2bEhbBniSyjZbsuRRusZ0-yo9jlOciXJZ4OxUC9mnm18YiXVeWl2Hcfr4cGaFEMjMV9X2C0fi_RZWq7F6N8_XaF8u4dxpBWs2okb5dcdMmRLn1TwH_tc_W7j3MkqEstzZnccS5_sHIkOJJ-yOGuypLkmI595K_V2WrCnAEz0_vrIYuROaNL9G4GH2wmEgwrQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598027611,"updated":1598027611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '9a34ae4c-e586-49c5-b89f-5d63fc5c80ec',
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
  'Fri, 21 Aug 2020 16:33:32 GMT',
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
  'b0ad8f51-fc42-4465-a5d1-a870a9767683',
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
  'Fri, 21 Aug 2020 16:33:32 GMT'
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
  'a1e5de66-4fcc-48f8-9730-3ec8181053aa',
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
  'Fri, 21 Aug 2020 16:33:32 GMT'
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
  'dcc43f0e-2dd8-4ebe-8001-0194eb52b5c0',
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
  'Fri, 21 Aug 2020 16:33:34 GMT'
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
  '3b638d4c-9f3e-4c77-a96c-680af4738f7b',
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
  'Fri, 21 Aug 2020 16:33:36 GMT'
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
  '5d4ae0ff-e311-4f29-bd02-8a9b8d8f7abc',
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
  'Fri, 21 Aug 2020 16:33:39 GMT'
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
  'c559f517-39c7-4956-a091-b3f9781a115c',
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
  'Fri, 21 Aug 2020 16:33:41 GMT'
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
  'f428770e-84db-4451-97e2-888f453b6f52',
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
  'Fri, 21 Aug 2020 16:33:43 GMT'
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
  '72dbf009-547c-4cd0-9c83-4f2b30ff20f9',
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
  'Fri, 21 Aug 2020 16:33:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1598027612,"scheduledPurgeDate":1605803612,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/50f59a2cab164f518bf57ee25e9a610c","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"utQ_HS5PjrRzod0uuKIHFV42xKjKjWbW4xhdW6Qvl6i85CutY92rttEMAjRen92bE9R5iVPoF6cNbdTiG7xu7cAKxATWEVhDRVxzu-wO-lPN-ehAPtTOpRXRNlgrJXM3s0btAqV8yTqzKT5uwXxtWS2bEhbBniSyjZbsuRRusZ0-yo9jlOciXJZ4OxUC9mnm18YiXVeWl2Hcfr4cGaFEMjMV9X2C0fi_RZWq7F6N8_XaF8u4dxpBWs2okb5dcdMmRLn1TwH_tc_W7j3MkqEstzZnccS5_sHIkOJJ-yOGuypLkmI595K_V2WrCnAEz0_vrIYuROaNL9G4GH2wmEgwrQ","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1598027611,"updated":1598027611,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b9b355bf-5b0f-485b-9a54-8a695e42c906',
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
  'Fri, 21 Aug 2020 16:33:46 GMT',
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
  '42c8658d-da38-4891-ac2c-fcb99a2929c5',
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
  'Fri, 21 Aug 2020 16:33:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598027627,"scheduledPurgeDate":1605803627,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/1d0cc3ee5cd44d7c93883db302365848","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6AamyVK9g50K6DZgkBiQbce9dWSxWSYEOeh1wr2sT5s3BJBhb2LgdKCfBxznXBwG6r_ZnJvCgZDppXymO7D195dlED6u13Co1o3x095i0XpkobUWoIpwQoSGTwQhtm3DpEQIf6L0C4WUn60-LNvKXWqmde_3DgfOtX_eoSvRbv2eldOUaKQ_Hsa9IiYdHmicOIF66G8i-bKDtvFcm4iUjJwEjf5MmimEMAZgbss2427Z9pARXBPU58MkKTswpPQjmftnq37kcy0dtcZ-gvY59zNcKsFws-lI64KQasRXtkYhAdET9IQtRZyd1euBY2LcHSQLXpg6OKcR_yj2mCoDEw","e":"AQAB"},"attributes":{"enabled":true,"created":1598027610,"updated":1598027610,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b638228b-fd71-48cd-a81e-b5e0ea0088f7',
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
  'Fri, 21 Aug 2020 16:33:47 GMT',
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
  '53ba9a93-6ce3-4f65-905f-9e5ab6e5b060',
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
  'Fri, 21 Aug 2020 16:33:47 GMT'
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
  '43c23c0b-7504-4f90-97f1-03fe500e86af',
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
  'Fri, 21 Aug 2020 16:33:47 GMT'
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
  '370fe78a-3aa3-43ae-bf5d-760fbc26795b',
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
  'Fri, 21 Aug 2020 16:33:49 GMT'
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
  '624d8a8f-5c19-4844-a7cc-4defad44a79f',
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
  'Fri, 21 Aug 2020 16:33:52 GMT'
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
  '55db14fd-4769-4dc5-b109-94dcd6a61a27',
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
  'Fri, 21 Aug 2020 16:33:54 GMT'
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
  'c0ab40af-8ad4-4b3b-abd2-68eaceab4995',
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
  'Fri, 21 Aug 2020 16:33:56 GMT'
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
  'e9aacda4-4478-4e61-8bd8-fa9afa6ca91e',
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
  'Fri, 21 Aug 2020 16:33:58 GMT'
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
  '805096d4-ab8c-4305-9860-f543df774c1f',
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
  'Fri, 21 Aug 2020 16:34:00 GMT'
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
  '7e0af39e-611a-4bf5-b3c7-d4d48ac89d2c',
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
  'Fri, 21 Aug 2020 16:34:02 GMT'
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
  '4684bf17-454b-4e27-8de9-9b8635648eab',
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
  'Fri, 21 Aug 2020 16:34:04 GMT'
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
  'd83a1420-d5ba-43b6-82ed-bcd6520740d8',
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
  'Fri, 21 Aug 2020 16:34:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1598027627,"scheduledPurgeDate":1605803627,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/1d0cc3ee5cd44d7c93883db302365848","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6AamyVK9g50K6DZgkBiQbce9dWSxWSYEOeh1wr2sT5s3BJBhb2LgdKCfBxznXBwG6r_ZnJvCgZDppXymO7D195dlED6u13Co1o3x095i0XpkobUWoIpwQoSGTwQhtm3DpEQIf6L0C4WUn60-LNvKXWqmde_3DgfOtX_eoSvRbv2eldOUaKQ_Hsa9IiYdHmicOIF66G8i-bKDtvFcm4iUjJwEjf5MmimEMAZgbss2427Z9pARXBPU58MkKTswpPQjmftnq37kcy0dtcZ-gvY59zNcKsFws-lI64KQasRXtkYhAdET9IQtRZyd1euBY2LcHSQLXpg6OKcR_yj2mCoDEw","e":"AQAB"},"attributes":{"enabled":true,"created":1598027610,"updated":1598027610,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '2ca475fe-428e-429d-8a05-75b5160659cf',
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
  'Fri, 21 Aug 2020 16:34:07 GMT',
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
  '05b0475f-a0a0-43ec-a0da-0ddc77ef0497',
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
  'Fri, 21 Aug 2020 16:34:09 GMT'
]);
