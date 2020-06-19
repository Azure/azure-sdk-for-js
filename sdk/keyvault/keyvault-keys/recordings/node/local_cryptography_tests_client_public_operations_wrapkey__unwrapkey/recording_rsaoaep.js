let nock = require('nock');

module.exports.hash = "12edbec6f57d769d29432f4f279cd9ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RSA-OAEP-/create')
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
  '870da74b-7202-4b81-806c-e24024608c49',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:57 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'd0d3afc9-8c0b-402e-8a4d-92735cf02500',
  'x-ms-ests-server',
  '2.1.10732.8 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvrMOxQPh8hEtxF6IwyVn0c_aSJHAQAAANpGf9YOAAAA; expires=Sun, 19-Jul-2020 23:52:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RSA-OAEP-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kdYzTpBjjieefyvviXjhizSsZx1A4QhJrsEAKT2QCXKUa-qt6EDo2MvqymtXk5qw1JTOnQipDM-mX5BC6zQ5ExYwNcl1t6lglS_ikwhg6CKDdHc_Y5g920nj3q8iSWEDL4rWw6yyd_8Fw5g6MJpL-oSpcauJjbLhBx-PHaG5X_v76lvC91tICEr0EjBGP_Z28sBW8EQaGy75FmlzvBT0RwPTd9Yn05jTBdB2w1XUlXivrCg3ejIMLOuh0RMKa-kSIu37nUQSuKQ2R6lmB1dBEMpPRCJQa7_lXd9BcCcJW4W8VEn7kbf9VNkENHmY7OvCHWSW1LlClBPhE04BYEPQlQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610778,"updated":1592610778,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '14d37082-d0d9-4462-9d34-19abf0f8c80d',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed')
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
  '2ef3f553-e296-43ba-a1b2-df62ca02c014',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '46fc3c6a-3c45-44d0-8386-3d79697e5700',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvrMOxQPh8hEtxF6IwyVn0c_aSJHAgAAANpGf9YOAAAA; expires=Sun, 19-Jul-2020 23:52:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kdYzTpBjjieefyvviXjhizSsZx1A4QhJrsEAKT2QCXKUa-qt6EDo2MvqymtXk5qw1JTOnQipDM-mX5BC6zQ5ExYwNcl1t6lglS_ikwhg6CKDdHc_Y5g920nj3q8iSWEDL4rWw6yyd_8Fw5g6MJpL-oSpcauJjbLhBx-PHaG5X_v76lvC91tICEr0EjBGP_Z28sBW8EQaGy75FmlzvBT0RwPTd9Yn05jTBdB2w1XUlXivrCg3ejIMLOuh0RMKa-kSIu37nUQSuKQ2R6lmB1dBEMpPRCJQa7_lXd9BcCcJW4W8VEn7kbf9VNkENHmY7OvCHWSW1LlClBPhE04BYEPQlQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610778,"updated":1592610778,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5cf3642d-5ba9-4bab-9b32-a710180e8d09',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed/unwrapkey', {"alg":"RSA-OAEP","value":"jqolscgx8M8gN86iq8srJ7Im9pForiuEwZkqdwTvbhmlpzwpSVv_tj611P86u0HT7-MojkGK_CUXPvH4syOIDyswZHXKwWq9l661TP34V5QRDHOYtNmJ0T3xsdnrHVVYBhA8dvlr2QrssMhM9z87ytqvbBwZ5wMg4GIvl4TF3MOWvSG3wwugFp9TkMBzp-7LJDeRknpcc92Wwffx7tsKK0aoX113bgskeK_pQO4GFxBONmaqxz08crHGeOfXlrkh2YTXVN2wQjM1evTWhQ0Mm6nJUhPxeAIoXKjB3L_8r2AS_jVPz04Byplk8__JlosjRncu6icFpUfoplWUW1hVYQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed","value":"YXJlcGE"}, [
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
  'd2600fef-53b4-45ff-bf95-6c86d4c33336',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '155'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA-OAEP-","deletedDate":1592610779,"scheduledPurgeDate":1600386779,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kdYzTpBjjieefyvviXjhizSsZx1A4QhJrsEAKT2QCXKUa-qt6EDo2MvqymtXk5qw1JTOnQipDM-mX5BC6zQ5ExYwNcl1t6lglS_ikwhg6CKDdHc_Y5g920nj3q8iSWEDL4rWw6yyd_8Fw5g6MJpL-oSpcauJjbLhBx-PHaG5X_v76lvC91tICEr0EjBGP_Z28sBW8EQaGy75FmlzvBT0RwPTd9Yn05jTBdB2w1XUlXivrCg3ejIMLOuh0RMKa-kSIu37nUQSuKQ2R6lmB1dBEMpPRCJQa7_lXd9BcCcJW4W8VEn7kbf9VNkENHmY7OvCHWSW1LlClBPhE04BYEPQlQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610778,"updated":1592610778,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'eeb1d8ca-94cc-468e-abd7-b338ec80ace0',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '648f620e-eb2e-4c71-9f1c-c2298e1798fa',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8e7c6d30-0ba4-4408-afb3-58674cae7671',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:52:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '582c282d-cec4-452d-a5c7-0df85c4c78f4',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5eec4ca8-f824-4708-b169-ab35912d67f3',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4f659887-0477-4901-9df4-6abe5954c243',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f79e4871-88a6-42fa-91eb-feae06bb0e9a',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f2c118b9-ac22-4062-b39c-8a4c37de7e45',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '136ea24c-cac0-4162-9673-75acc6f52f20',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:11 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1274da08-5355-492c-b3c1-7588b1a5609c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-RSA-OAEP-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '114',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d8ece39-206f-4eec-9ea1-4142e44757a1',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-RSA-OAEP-","deletedDate":1592610779,"scheduledPurgeDate":1600386779,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-RSA-OAEP-/3501f3560643448f9243073cf91196ed","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"kdYzTpBjjieefyvviXjhizSsZx1A4QhJrsEAKT2QCXKUa-qt6EDo2MvqymtXk5qw1JTOnQipDM-mX5BC6zQ5ExYwNcl1t6lglS_ikwhg6CKDdHc_Y5g920nj3q8iSWEDL4rWw6yyd_8Fw5g6MJpL-oSpcauJjbLhBx-PHaG5X_v76lvC91tICEr0EjBGP_Z28sBW8EQaGy75FmlzvBT0RwPTd9Yn05jTBdB2w1XUlXivrCg3ejIMLOuh0RMKa-kSIu37nUQSuKQ2R6lmB1dBEMpPRCJQa7_lXd9BcCcJW4W8VEn7kbf9VNkENHmY7OvCHWSW1LlClBPhE04BYEPQlQ","e":"AQAB"},"attributes":{"enabled":true,"created":1592610778,"updated":1592610778,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'db33bf3b-0e75-4e78-a9e9-849ca824c8bc',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:17 GMT',
  'Content-Length',
  '894'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-RSA-OAEP-')
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
  '9d35e736-044b-4398-8c2f-5639452e915c',
  'x-ms-keyvault-service-version',
  '1.1.7.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.175.226.52;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 19 Jun 2020 23:53:17 GMT'
]);
