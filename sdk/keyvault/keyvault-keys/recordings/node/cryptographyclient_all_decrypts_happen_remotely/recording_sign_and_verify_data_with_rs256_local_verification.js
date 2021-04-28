let nock = require('nock');

module.exports.hash = "ff1d494f1eeeafee728774d05286d7ba";

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
  'westus2',
  'x-ms-client-request-id',
  'ba51a301-f558-4577-b319-a5a0d5fd9620',
  'x-ms-request-id',
  '7a35a616-424c-4819-ad34-813820e1c5a4',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT'
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
  'a534f051-2bde-4c6c-8740-acecdcbfdf00',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtyvUprZph9NgyFEPfiC1KSS9HQSAwAAACu7F9gOAAAA; expires=Tue, 25-May-2021 19:34:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0RhkfeQzKxQQmTqpFq35cXmR-xJ_Wg4CqTZ1vLZqOP5wKQs2z-mnnwhhoaXzHba-lcEbHqFhvhraM-jZE3gS9g7bprXrvFXw-IaoDhLQN3XRJWZcb1m98fNaejd3V0wXKY-qvNF_EJ0NHA0FP9yRY3Zz2bTFCeUwaKlNIoUZcY9-ZIKzdqXQsTf6PKR1a1Mm3O9HCUJpnLYY0UhksiFYDgxmHZVCq8_iZaN1p_L_pdPilgiz1734at4dDOl8wPGceGIrQwHf5rJoMNw6XYIIInmGZ0B9qmjDy74ys_QgCqUlpkkdjoZRxtYJFGIUTzLLnxjqX0LlZ8tKGkoRfb1R6Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619379255,"updated":1619379255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ba51a301-f558-4577-b319-a5a0d5fd9620',
  'x-ms-request-id',
  'e57d0cf6-28c7-48b2-9ff3-bce6767eac7d',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT',
  'Content-Length',
  '714'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e/sign')
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
  'x-ms-client-request-id',
  '931928b8-a3e6-4b94-b7dd-1b4c3a65419e',
  'x-ms-request-id',
  '8a3ab24d-a2fc-4e6c-aff6-97c0ae5b7065',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT'
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
  '91ace131-1ae8-40a9-be8a-7aa705e2d600',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtyvUprZph9NgyFEPfiC1KSS9HQSAwAAACu7F9gOAAAA; expires=Tue, 25-May-2021 19:34:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e/sign', {"alg":"RS256","value":"N4MG_WcwqVMx5YJxlsong-9ZXoV57jlAYdZ9x7BLweY"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e","value":"kHs571Z6Y0gaV0LkbKuejkhKDKNJwvTa4yTk5SQrxEQ0LRRCW4yzrWYu2-gVN7jbj86I_U4_9Mh3SJv0lpK6OcqEV9rsKrB8S069erQGjdR1gaWX-8At6w5a6PAJ0lH6eS2l4SPwFv36U2_leXfbZvbA6Z4WttlIQXknKEuhxQ3MLfjOdgeS8XFEJwefIBJl5txLW9rFc6E2HYTPE8BTl8CXFI-I2rhEA4L7bExyDrd-8lZVYbROr3D7XqJCdt-Fmt57TKDNeg4b72eGOMFF5kK6tIuPosBcObINLdR7VOFJ1CblAUNuewZYnUDEE0UU-BSdFJX3yBwo7tB0FXJS5w"}, [
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
  '931928b8-a3e6-4b94-b7dd-1b4c3a65419e',
  'x-ms-request-id',
  '9d4fda8e-a8f5-43f6-8d47-6dc6cbd24732',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:15 GMT',
  'Content-Length',
  '475'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619379256,"scheduledPurgeDate":1619984056,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0RhkfeQzKxQQmTqpFq35cXmR-xJ_Wg4CqTZ1vLZqOP5wKQs2z-mnnwhhoaXzHba-lcEbHqFhvhraM-jZE3gS9g7bprXrvFXw-IaoDhLQN3XRJWZcb1m98fNaejd3V0wXKY-qvNF_EJ0NHA0FP9yRY3Zz2bTFCeUwaKlNIoUZcY9-ZIKzdqXQsTf6PKR1a1Mm3O9HCUJpnLYY0UhksiFYDgxmHZVCq8_iZaN1p_L_pdPilgiz1734at4dDOl8wPGceGIrQwHf5rJoMNw6XYIIInmGZ0B9qmjDy74ys_QgCqUlpkkdjoZRxtYJFGIUTzLLnxjqX0LlZ8tKGkoRfb1R6Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619379255,"updated":1619379255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '546e66c6-4dda-40ff-8d1f-cf623cd6f2b2',
  'x-ms-request-id',
  'e6645079-da85-46cf-a2c6-6044ad73e454',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:16 GMT',
  'Content-Length',
  '873'
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
  'westus2',
  'x-ms-client-request-id',
  '4aac4000-b18e-4283-8ed1-1f3723b6d3b8',
  'x-ms-request-id',
  '5a9f02d7-5ba8-40cb-bc1c-b3a0239c9846',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:16 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '5d63fc6a-f98e-4f49-96e9-fa5cea0f3ae1',
  'x-ms-request-id',
  'f2ed2590-8c34-48b7-bea3-a2295be47aa2',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:16 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '7e63d6e2-c417-4c80-a696-350a328b8b7b',
  'x-ms-request-id',
  '641fe775-fdff-4368-91cd-0ae5429824fb',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:18 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '02017ffc-a622-4b87-be72-b4ee7ec4a5c7',
  'x-ms-request-id',
  '362c662a-dc3a-49a1-8ef3-54263e9584e6',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:20 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '61b28270-47eb-4a41-acf9-80f1e535c728',
  'x-ms-request-id',
  'e22468e3-6a03-4812-b478-95eb88cb9ad8',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:22 GMT'
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
  'westus2',
  'x-ms-client-request-id',
  '167339d5-1be7-4ef0-a94f-65c58b669292',
  'x-ms-request-id',
  'fe2ecc4d-6c82-4356-8ba4-730422fc7dd2',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619379256,"scheduledPurgeDate":1619984056,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/ebd6090681b64390bc4449459d55a46e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0RhkfeQzKxQQmTqpFq35cXmR-xJ_Wg4CqTZ1vLZqOP5wKQs2z-mnnwhhoaXzHba-lcEbHqFhvhraM-jZE3gS9g7bprXrvFXw-IaoDhLQN3XRJWZcb1m98fNaejd3V0wXKY-qvNF_EJ0NHA0FP9yRY3Zz2bTFCeUwaKlNIoUZcY9-ZIKzdqXQsTf6PKR1a1Mm3O9HCUJpnLYY0UhksiFYDgxmHZVCq8_iZaN1p_L_pdPilgiz1734at4dDOl8wPGceGIrQwHf5rJoMNw6XYIIInmGZ0B9qmjDy74ys_QgCqUlpkkdjoZRxtYJFGIUTzLLnxjqX0LlZ8tKGkoRfb1R6Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619379255,"updated":1619379255,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'cde3f07b-74ae-4835-98b3-5306b029e3ec',
  'x-ms-request-id',
  '3edeb2ae-a8cd-4d23-8907-0ff1eb41b048',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:27 GMT',
  'Content-Length',
  '873'
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
  '028ca5b7-9a9f-4b3a-bbe0-f23f4a627f10',
  'x-ms-request-id',
  '9c0534dd-f2bc-44a5-a8b0-f3db91b8a136',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:34:27 GMT'
]);
