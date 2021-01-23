let nock = require('nock');

module.exports.hash = "ff5780b1f43ffe110b16e3198a026f8b";

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
  '82e2a62b-1135-4f47-9321-3862dd5e9300',
  'x-ms-ests-server',
  '2.1.11419.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AshC0_BgEwhAvO6Zi9WLpB4_aSJHAQAAAKlkndcOAAAA; expires=Mon, 22-Feb-2021 00:28:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 23 Jan 2021 00:28:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/06eeb62ed22b493baa5ce7c411a910ce","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xez4UwNKm4B2VMAAZY6fLB1OEOfMR7L6FR9JGhlQDyVQY3clz0BQlyHm3X7DmI26KwYlsTHgPKX-3qdW37yKCvKF4eSVcqv0QgcTm4oZo1p9RqsG-oa7HrfRhuh10V43q0caA6RrblKMAFS2ZQVn5VdFvHkdrLsQB-aWNGIA2fuei_Hhf9YwnXl6XPd8sXiaJO0EL14Q-hFSARnXQThHEKpjQJnhQryoZzsHt-NNNG9pu58iIibQlBwJ55KGlnm2-fQzfOJ722YotpPOuaBi4_i5WZZIqZlo6Jja-l5fQRIvrSpiyr_iTz0DUZ2KkiBYP0qjezRHYleKk3FQ4QTTyQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '4508b50a-a128-4a28-abf6-5dd76db7ad74',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:26 GMT',
  'Content-Length',
  '758'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/c5433004c3e7421dbcf73ad7d0e2b99c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2nQ1kbqLABJxsJyzZT3zeZyacMntXeOKkUK1zIEEZMKolArXHzImPYu2-sGPx9NT4KsL2JGlPk2NoBkFKIkTkaI_T6lkc3OK5rRiVeBK9_umAhYSlgmXEKic3OcKZ7Oc4rYWnw8DnJiAUWtdXW9-cwz8lmeEh9kuHIpwO_OvQacOFk3Pf6HQDRT9jQ77nUlADCAfONlMpk6KASUR9ftLmZU6XzWmQ8J5dd4fl1worXai1ZOHJcxueVjdHfy3581ezF6UIblAlvFg7Dxp8YOLFk-7l7MujnYKGjK_3Y0GoGZ0sFSD8j-IaygGAEKIdArchI7_yo_X3zkuE5ovHHHD0Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b9d9b766-0aac-4ae7-88f0-cd5477cc72ee',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:27 GMT',
  'Content-Length',
  '758'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1611361707,"scheduledPurgeDate":1619137707,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/c5433004c3e7421dbcf73ad7d0e2b99c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2nQ1kbqLABJxsJyzZT3zeZyacMntXeOKkUK1zIEEZMKolArXHzImPYu2-sGPx9NT4KsL2JGlPk2NoBkFKIkTkaI_T6lkc3OK5rRiVeBK9_umAhYSlgmXEKic3OcKZ7Oc4rYWnw8DnJiAUWtdXW9-cwz8lmeEh9kuHIpwO_OvQacOFk3Pf6HQDRT9jQ77nUlADCAfONlMpk6KASUR9ftLmZU6XzWmQ8J5dd4fl1worXai1ZOHJcxueVjdHfy3581ezF6UIblAlvFg7Dxp8YOLFk-7l7MujnYKGjK_3Y0GoGZ0sFSD8j-IaygGAEKIdArchI7_yo_X3zkuE5ovHHHD0Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c88dfc4a-aaea-4164-b878-c51fb98a7169',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:26 GMT',
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
  'b78d5585-70ff-4a50-b38d-fae176730b51',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:27 GMT'
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
  '8f3cc137-823f-4ca7-8212-608fb23887ff',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1611361707,"scheduledPurgeDate":1619137707,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/c5433004c3e7421dbcf73ad7d0e2b99c","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"2nQ1kbqLABJxsJyzZT3zeZyacMntXeOKkUK1zIEEZMKolArXHzImPYu2-sGPx9NT4KsL2JGlPk2NoBkFKIkTkaI_T6lkc3OK5rRiVeBK9_umAhYSlgmXEKic3OcKZ7Oc4rYWnw8DnJiAUWtdXW9-cwz8lmeEh9kuHIpwO_OvQacOFk3Pf6HQDRT9jQ77nUlADCAfONlMpk6KASUR9ftLmZU6XzWmQ8J5dd4fl1worXai1ZOHJcxueVjdHfy3581ezF6UIblAlvFg7Dxp8YOLFk-7l7MujnYKGjK_3Y0GoGZ0sFSD8j-IaygGAEKIdArchI7_yo_X3zkuE5ovHHHD0Q","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e6deb64c-17ab-4df2-827f-ff23e762cfc5',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:29 GMT',
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
  'dd550613-b4c8-4336-8c6c-cb5ea35dee4e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1611361709,"scheduledPurgeDate":1619137709,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/06eeb62ed22b493baa5ce7c411a910ce","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xez4UwNKm4B2VMAAZY6fLB1OEOfMR7L6FR9JGhlQDyVQY3clz0BQlyHm3X7DmI26KwYlsTHgPKX-3qdW37yKCvKF4eSVcqv0QgcTm4oZo1p9RqsG-oa7HrfRhuh10V43q0caA6RrblKMAFS2ZQVn5VdFvHkdrLsQB-aWNGIA2fuei_Hhf9YwnXl6XPd8sXiaJO0EL14Q-hFSARnXQThHEKpjQJnhQryoZzsHt-NNNG9pu58iIibQlBwJ55KGlnm2-fQzfOJ722YotpPOuaBi4_i5WZZIqZlo6Jja-l5fQRIvrSpiyr_iTz0DUZ2KkiBYP0qjezRHYleKk3FQ4QTTyQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f9432eb7-c4b6-41a0-b2a7-742695b08260',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:29 GMT',
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
  '586e4355-6c56-45a0-93e1-0495f1398b61',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:29 GMT'
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
  '1f685b6c-4698-4e5e-a46a-42cf99f7c85c',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:30 GMT'
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
  '0fd44153-0f67-416f-ba5f-2c1c2a15a931',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1611361709,"scheduledPurgeDate":1619137709,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/06eeb62ed22b493baa5ce7c411a910ce","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xez4UwNKm4B2VMAAZY6fLB1OEOfMR7L6FR9JGhlQDyVQY3clz0BQlyHm3X7DmI26KwYlsTHgPKX-3qdW37yKCvKF4eSVcqv0QgcTm4oZo1p9RqsG-oa7HrfRhuh10V43q0caA6RrblKMAFS2ZQVn5VdFvHkdrLsQB-aWNGIA2fuei_Hhf9YwnXl6XPd8sXiaJO0EL14Q-hFSARnXQThHEKpjQJnhQryoZzsHt-NNNG9pu58iIibQlBwJ55KGlnm2-fQzfOJ722YotpPOuaBi4_i5WZZIqZlo6Jja-l5fQRIvrSpiyr_iTz0DUZ2KkiBYP0qjezRHYleKk3FQ4QTTyQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611361706,"updated":1611361706,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'f0c7c448-83d3-4dcc-a53d-6d88180714fe',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:33 GMT',
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
  'ce7983d6-92aa-4941-b4f1-ecda10106d1f',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=40.76.87.35;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sat, 23 Jan 2021 00:28:34 GMT'
]);
