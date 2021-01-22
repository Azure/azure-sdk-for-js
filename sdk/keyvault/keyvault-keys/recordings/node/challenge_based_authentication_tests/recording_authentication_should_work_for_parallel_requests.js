let nock = require('nock');

module.exports.hash = "5445dc3efc0de054a10a0f3c09e0cb55";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'b12b0e9d-a521-4786-aa6a-eaf439384900',
  'x-ms-ests-server',
  '2.1.11419.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AgzLk6cH5u1PoB83Q-rk8Gs_aSJHAQAAANPsm9cOAAAA; expires=Sat, 20-Feb-2021 21:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 21 Jan 2021 21:44:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/47f9454ee12246beaeba4eacbdce63d1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"nmukzEG2NrdWfLsnOxlNQzj9tEMLWjWJS1SoJSIV99_YsxNYs_IhA2BGcXh4x7fxuhGcglcfN2zFCuAioXmkav-FPGG7kfAWUVdFJ4PzwsJ7yR-6omvLNygZxZUrqp1Q93fFT86UacNlpE2xcSo2NOsjZIHGEUeiqhj99Oq4qM9pAVtECWThqhnyVGr7VqugWFlK5wprC6AnjUU4VZQAcBxJ-pZoQp9gFJrpxfx-HgqwNTqz2La1wD5JbYfPpuB8HhibfQi-gPY2ecum2U-GXJqYDGbBW9CYilxwEqJdWrt8lGq8whPcVpzLfoJusIEyuwCwWMrmAzARqL6BWlE42Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'ebe13c0b-3b41-40ad-bf4e-28d4cadb7137',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:52 GMT',
  'Content-Length',
  '758'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/e5fd8bd4a9514714b33469df6a069dfe","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6YfYkL4but7X7D-YS33PowL5VXj5qfvQ2i_VfJhxeBs03YWGG6bvnM1-9dpHbqzIGkwVj4YRnSAYa6PByo29-vUp94I_UlrHU5LDL9VjSif_TSTfqyARHwOTIxpf6oBLzmz-Jcj2xSU6sKp-30zeiV6_L4QEQBT2CxJYqkMe3HP3eKqrsRQi9KLH-SDm9Ye2Mvkvusl_wif7PYwa1rpkq34liru6MYFLVlYd6X_y-1kDQRi8LHmvLOd3ts8-i4rSNtj1HZlH7Hi9vKSXoXQ5JbnSFj0lxQysNcsv-VTSRIbWZJQeuaHcYIxMhbGnzbBCV4xMC6K4g9zTjx-uOsYxhQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '93a8bec9-239f-4c67-ac8b-314b2d83c660',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:52 GMT',
  'Content-Length',
  '758'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1611265493,"scheduledPurgeDate":1619041493,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/e5fd8bd4a9514714b33469df6a069dfe","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6YfYkL4but7X7D-YS33PowL5VXj5qfvQ2i_VfJhxeBs03YWGG6bvnM1-9dpHbqzIGkwVj4YRnSAYa6PByo29-vUp94I_UlrHU5LDL9VjSif_TSTfqyARHwOTIxpf6oBLzmz-Jcj2xSU6sKp-30zeiV6_L4QEQBT2CxJYqkMe3HP3eKqrsRQi9KLH-SDm9Ye2Mvkvusl_wif7PYwa1rpkq34liru6MYFLVlYd6X_y-1kDQRi8LHmvLOd3ts8-i4rSNtj1HZlH7Hi9vKSXoXQ5JbnSFj0lxQysNcsv-VTSRIbWZJQeuaHcYIxMhbGnzbBCV4xMC6K4g9zTjx-uOsYxhQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'dbfb8ca6-28ad-4bcf-87fa-0bdb183e39df',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:53 GMT',
  'Content-Length',
  '970'
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
  'westus',
  'x-ms-request-id',
  'bec5b12e-3d43-479e-95be-20e868938a98',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:52 GMT'
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
  'westus',
  'x-ms-request-id',
  '558beba6-4aed-4307-9265-b4ba8557aa6e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1611265493,"scheduledPurgeDate":1619041493,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/e5fd8bd4a9514714b33469df6a069dfe","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6YfYkL4but7X7D-YS33PowL5VXj5qfvQ2i_VfJhxeBs03YWGG6bvnM1-9dpHbqzIGkwVj4YRnSAYa6PByo29-vUp94I_UlrHU5LDL9VjSif_TSTfqyARHwOTIxpf6oBLzmz-Jcj2xSU6sKp-30zeiV6_L4QEQBT2CxJYqkMe3HP3eKqrsRQi9KLH-SDm9Ye2Mvkvusl_wif7PYwa1rpkq34liru6MYFLVlYd6X_y-1kDQRi8LHmvLOd3ts8-i4rSNtj1HZlH7Hi9vKSXoXQ5JbnSFj0lxQysNcsv-VTSRIbWZJQeuaHcYIxMhbGnzbBCV4xMC6K4g9zTjx-uOsYxhQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4698f819-3739-446e-8d66-26dd8ff3291d',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:54 GMT',
  'Content-Length',
  '970'
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
  '6119ef70-e980-4758-b9b8-0d0b5bd1b2ab',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1611265496,"scheduledPurgeDate":1619041496,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/47f9454ee12246beaeba4eacbdce63d1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"nmukzEG2NrdWfLsnOxlNQzj9tEMLWjWJS1SoJSIV99_YsxNYs_IhA2BGcXh4x7fxuhGcglcfN2zFCuAioXmkav-FPGG7kfAWUVdFJ4PzwsJ7yR-6omvLNygZxZUrqp1Q93fFT86UacNlpE2xcSo2NOsjZIHGEUeiqhj99Oq4qM9pAVtECWThqhnyVGr7VqugWFlK5wprC6AnjUU4VZQAcBxJ-pZoQp9gFJrpxfx-HgqwNTqz2La1wD5JbYfPpuB8HhibfQi-gPY2ecum2U-GXJqYDGbBW9CYilxwEqJdWrt8lGq8whPcVpzLfoJusIEyuwCwWMrmAzARqL6BWlE42Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e9745a3d-458b-4b61-97da-d127caff55a5',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:55 GMT',
  'Content-Length',
  '970'
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
  'westus',
  'x-ms-request-id',
  'e883fd5e-b4ba-4cd5-9115-2bc296938e9f',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:56 GMT'
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
  'westus',
  'x-ms-request-id',
  '59b41717-a726-4557-97c9-32048b5a1644',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1611265496,"scheduledPurgeDate":1619041496,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/47f9454ee12246beaeba4eacbdce63d1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"nmukzEG2NrdWfLsnOxlNQzj9tEMLWjWJS1SoJSIV99_YsxNYs_IhA2BGcXh4x7fxuhGcglcfN2zFCuAioXmkav-FPGG7kfAWUVdFJ4PzwsJ7yR-6omvLNygZxZUrqp1Q93fFT86UacNlpE2xcSo2NOsjZIHGEUeiqhj99Oq4qM9pAVtECWThqhnyVGr7VqugWFlK5wprC6AnjUU4VZQAcBxJ-pZoQp9gFJrpxfx-HgqwNTqz2La1wD5JbYfPpuB8HhibfQi-gPY2ecum2U-GXJqYDGbBW9CYilxwEqJdWrt8lGq8whPcVpzLfoJusIEyuwCwWMrmAzARqL6BWlE42Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611265492,"updated":1611265492,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '68d39690-8c95-45fc-a54d-0f05bb7bd5d4',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:58 GMT',
  'Content-Length',
  '970'
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
  '45ba039d-65b5-4b2e-b462-96963c3d2ac9',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.112.50.112;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 Jan 2021 21:44:58 GMT'
]);
