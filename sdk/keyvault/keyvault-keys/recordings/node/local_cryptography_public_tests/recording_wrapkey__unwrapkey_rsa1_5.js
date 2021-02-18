let nock = require('nock');

module.exports.hash = "28a850557cd5498b3106c1da299c70fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/create')
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
  'westus2',
  'x-ms-request-id',
  '9cc8926f-e391-4a22-b319-6af7d680a03c',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:49 GMT'
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
  '7750e8e4-ca6f-453c-9bc8-80f3f93c1800',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag8YnLS1fBhKslvpke6qkmYA4qsDBwAAAPO4v9cOAAAA; expires=Sat, 20-Mar-2021 01:25:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rtDLphNQqgtqPg08WVwwaUIojmKAyEn4tTadJROaqajmPmcmLo-ESpt-KWeOpcuryBIakjJc-jIi2_2nyChSVaPHBO3Wc-FfoELvfwzApzorlMMpRus0Lxt90WvQLRU4EbAnZ4ggpXfxP-BUtZOCRWqdqc6w3uD5FY33WeU9iLSVbci7YUWHN8cYEw48xcmj7msq0WTwv39LGkLzD6uExvJMhTftNRYseYGWmsTXHrU_HOJOVCA9ziod-BNECzwUAPxkEX93xkiaUe7qNu-XHeusFCnApCrT0B3jy_nOc_ESkctYPq3RfbklRcF0IBOmtUpWjH6K_bABx3dNFVKYgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613611550,"updated":1613611550,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'd572ba4d-04f6-4b6d-a1ec-ad7fdd17386f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '732'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9')
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
  'westus2',
  'x-ms-request-id',
  '11dee167-f106-42ca-886b-7e8850059547',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT'
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
  '7750e8e4-ca6f-453c-9bc8-80f3173d1800',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag8YnLS1fBhKslvpke6qkmYA4qsDBwAAAPO4v9cOAAAA; expires=Sat, 20-Mar-2021 01:25:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rtDLphNQqgtqPg08WVwwaUIojmKAyEn4tTadJROaqajmPmcmLo-ESpt-KWeOpcuryBIakjJc-jIi2_2nyChSVaPHBO3Wc-FfoELvfwzApzorlMMpRus0Lxt90WvQLRU4EbAnZ4ggpXfxP-BUtZOCRWqdqc6w3uD5FY33WeU9iLSVbci7YUWHN8cYEw48xcmj7msq0WTwv39LGkLzD6uExvJMhTftNRYseYGWmsTXHrU_HOJOVCA9ziod-BNECzwUAPxkEX93xkiaUe7qNu-XHeusFCnApCrT0B3jy_nOc_ESkctYPq3RfbklRcF0IBOmtUpWjH6K_bABx3dNFVKYgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613611550,"updated":1613611550,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'c2785433-d1fb-45f2-9f4f-d8ad59f4a84f',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '732'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9/unwrapkey', {"alg":"RSA1_5","value":"MrDQD_rV5P-q3xgL9j2NZEUw6NcPJ9_Z0mPNif86cPazuRXamGNQsK8V0-pemgYWVwXixyguDrAsisIbQk_uU0_trmZo9A4tlLo81ufmM_uI1EINnzPPTb_JEMlWFvLbEpIATFbKcLeGuRHkyAH7V-CXCUxGG7yj0duZz-SdFW7n9R6x4hqxFiafa-KQUK5wSSx_mRhI0C0D47EDI9cOdLFRXLGzz_gIISBh3buvS-g3akqCJkFWt_v1a4qDw8u9kXXl8uu9Nl68GG-n1bwm6R6skbVhBY18GmWzFhHiMcMSUyxo-vg6wu_enEQgdouRoTIwE7zj-2GW3aLBzh0Ndw"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9","value":"YXJlcGE"}, [
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
  'x-ms-request-id',
  '15928b76-dfdf-4901-be74-6396f774feec',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '158'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-","deletedDate":1613611550,"scheduledPurgeDate":1614216350,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rtDLphNQqgtqPg08WVwwaUIojmKAyEn4tTadJROaqajmPmcmLo-ESpt-KWeOpcuryBIakjJc-jIi2_2nyChSVaPHBO3Wc-FfoELvfwzApzorlMMpRus0Lxt90WvQLRU4EbAnZ4ggpXfxP-BUtZOCRWqdqc6w3uD5FY33WeU9iLSVbci7YUWHN8cYEw48xcmj7msq0WTwv39LGkLzD6uExvJMhTftNRYseYGWmsTXHrU_HOJOVCA9ziod-BNECzwUAPxkEX93xkiaUe7qNu-XHeusFCnApCrT0B3jy_nOc_ESkctYPq3RfbklRcF0IBOmtUpWjH6K_bABx3dNFVKYgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613611550,"updated":1613611550,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'e0bc53e8-e9aa-4a7b-bc25-de98d363df0e',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-wrapKeyunwrapKeyRSA15-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b388deeb-e139-4ff8-a908-26142b6c0eb3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-wrapKeyunwrapKeyRSA15-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '5f704c72-7b0b-481d-abdf-dee98c380ec7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-wrapKeyunwrapKeyRSA15-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '073e0261-2a9f-4a49-a5e5-5a14cffc2097',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-wrapKeyunwrapKeyRSA15-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '126',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3703f35f-24be-4159-904f-a91a0c3e40d2',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-","deletedDate":1613611550,"scheduledPurgeDate":1614216350,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-/fb8bfa8846724a1aaa724047b7996cc9","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rtDLphNQqgtqPg08WVwwaUIojmKAyEn4tTadJROaqajmPmcmLo-ESpt-KWeOpcuryBIakjJc-jIi2_2nyChSVaPHBO3Wc-FfoELvfwzApzorlMMpRus0Lxt90WvQLRU4EbAnZ4ggpXfxP-BUtZOCRWqdqc6w3uD5FY33WeU9iLSVbci7YUWHN8cYEw48xcmj7msq0WTwv39LGkLzD6uExvJMhTftNRYseYGWmsTXHrU_HOJOVCA9ziod-BNECzwUAPxkEX93xkiaUe7qNu-XHeusFCnApCrT0B3jy_nOc_ESkctYPq3RfbklRcF0IBOmtUpWjH6K_bABx3dNFVKYgQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613611550,"updated":1613611550,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-request-id',
  'e58de1b6-9e42-49af-a7d1-bf922b844328',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:56 GMT',
  'Content-Length',
  '909'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-wrapKeyunwrapKeyRSA15-')
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
  'x-ms-request-id',
  'e6669dca-1a43-4bcf-8fb3-81cccd0413a0',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 18 Feb 2021 01:25:56 GMT'
]);
