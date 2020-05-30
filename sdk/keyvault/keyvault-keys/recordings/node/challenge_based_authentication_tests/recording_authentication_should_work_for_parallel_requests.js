let nock = require('nock');

module.exports.hash = "cccc295cd2446345a7c0c60f870c050f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '5dabc394-fe13-46c7-a8db-8ba6bad898f0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT'
]);

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
  '141ac79d-42ed-4b6c-b13f-608e29399500',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT'
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
  'eb2cde1a-c233-4838-99f0-7eaca96d6400',
  'x-ms-ests-server',
  '2.1.10571.11 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AgVP_9k73WVIs1y7qljhir0_aSJHAQAAABraWNYOAAAA; expires=Sat, 20-Jun-2020 20:22:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT',
  'Content-Length',
  '1315'
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
  '1240297c-5dca-4677-bc17-751f1f7d6700',
  'x-ms-ests-server',
  '2.1.10571.11 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ao3xQuqCaOhGunQN6BS211U_aSJHAQAAABraWNYOAAAA; expires=Sat, 20-Jun-2020 20:22:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/41557be3a898495e818e54c2e18632f5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"9hBVaH0Cwptww_wkWhX_dIyQw7TK88zks5MYfmAfyrbmlbSKjSrox6PHXcJey3RXgRreS_IYJuOSzIELyq3qpw3eHCsxonN4_uaP46j55qQ1M54X_zg_kmac7VlmjCWIWAn2BacySWxxFlwc86wVPfwobU1J1qGt_MXlOnM0gAa2nRmwPVvxEagCziS8zFBATkcGn0AetiWfKHYkfW6XRSoGjhP7dxr9Zh0FSMV-U3CGhBmQ7ey9LHfKwezRDQt-s_XFhcPsh84mW36GbWRtJTvqD72uK5Pu-cU30BHqXNe4nghvCl7LcOvlkv1p9UHXZlgyDUsT9ojE63O8VLc5rw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092571,"updated":1590092571,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e36afb46-a53f-4134-bc4c-4666bef804ff',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT',
  'Content-Length',
  '757'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1590092572,"scheduledPurgeDate":1597868572,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/41557be3a898495e818e54c2e18632f5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"9hBVaH0Cwptww_wkWhX_dIyQw7TK88zks5MYfmAfyrbmlbSKjSrox6PHXcJey3RXgRreS_IYJuOSzIELyq3qpw3eHCsxonN4_uaP46j55qQ1M54X_zg_kmac7VlmjCWIWAn2BacySWxxFlwc86wVPfwobU1J1qGt_MXlOnM0gAa2nRmwPVvxEagCziS8zFBATkcGn0AetiWfKHYkfW6XRSoGjhP7dxr9Zh0FSMV-U3CGhBmQ7ey9LHfKwezRDQt-s_XFhcPsh84mW36GbWRtJTvqD72uK5Pu-cU30BHqXNe4nghvCl7LcOvlkv1p9UHXZlgyDUsT9ojE63O8VLc5rw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092571,"updated":1590092571,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'b1e91b9b-89cb-4bb1-853f-7ca465e65baf',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:52 GMT',
  'Content-Length',
  '968'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/0935ec8051da4ac7ae4e1239f70e353b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"69M_yNO9MkJIImQJRY89XLrx9hfHo6fBSkOS2rrrGeqIlQmXzmM0vMv8q-uX9Igaa8iekvsdsHj2j3kd5AhJDi7-YJfQgpSQ-9QHmsP9Ni39KONbI6RVLrwRzaZLO-Uym9s4_8pKWZdvd7pimBIkM-laXnejSGTYFothqhgWJDX5vnPiyy6wzBfbr-3o-xtBAumf1JFKvRucb9_plp9rAeeMJ-vRtZF9TD3JMMYDl-SdXBiIJBKs1x7m0jcxg-DmKMIiEOy92HV7oYgBThHLxbn_uswdwIZz5keV6p2Dw7vbxIOQxMvFw9y2ueNUYXnb9fqgG1NimGKgZ3sltNYFiw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092572,"updated":1590092572,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'c668bb51-d274-4944-a14d-2007060e79d3',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT',
  'Content-Length',
  '757'
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
  '678c7961-30b9-4c78-87fc-e4568896b50f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:52 GMT'
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
  'b5d9803a-79e3-42e4-8923-8cba2de2b4da',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:51 GMT'
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
  '83616d26-8ff2-42cb-aef2-972232bc7fb1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:53 GMT'
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
  'ff132e9d-3851-4a8f-b89c-8f081f597d20',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:55 GMT'
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
  '89abce25-ad00-4cef-a43f-15a2303473d8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:22:58 GMT'
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
  '3bd24ee2-9bd1-41dd-a97d-ae953e4185ab',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:00 GMT'
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
  '4150ecdd-64f6-4037-90d0-fa73ada979ee',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:02 GMT'
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
  '85797bae-756e-4ca6-a7d1-b0ea74c3d11e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:04 GMT'
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
  'da09fd6b-45c4-473c-b1ef-bcb57023ccc2',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:05 GMT'
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
  'c45c21b5-8d28-46d5-9b9a-a665254aae2e',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:08 GMT'
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
  '1bc88fa2-9149-4d39-bd83-fab7ef646d39',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:10 GMT'
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
  '6e2f6466-10dc-4c83-ac74-b32676f87740',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:12 GMT'
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
  '49137776-9f77-4d1e-aac8-e0f6ea9061a5',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:14 GMT'
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
  '68ce98c2-439a-4896-b004-e62ef7c97b8a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:16 GMT'
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
  '6032c386-6feb-46f4-9b5e-d9398b11d453',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0","deletedDate":1590092572,"scheduledPurgeDate":1597868572,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--0/41557be3a898495e818e54c2e18632f5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"9hBVaH0Cwptww_wkWhX_dIyQw7TK88zks5MYfmAfyrbmlbSKjSrox6PHXcJey3RXgRreS_IYJuOSzIELyq3qpw3eHCsxonN4_uaP46j55qQ1M54X_zg_kmac7VlmjCWIWAn2BacySWxxFlwc86wVPfwobU1J1qGt_MXlOnM0gAa2nRmwPVvxEagCziS8zFBATkcGn0AetiWfKHYkfW6XRSoGjhP7dxr9Zh0FSMV-U3CGhBmQ7ey9LHfKwezRDQt-s_XFhcPsh84mW36GbWRtJTvqD72uK5Pu-cU30BHqXNe4nghvCl7LcOvlkv1p9UHXZlgyDUsT9ojE63O8VLc5rw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092571,"updated":1590092571,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '5baf4089-fc91-43bc-beb9-c6ad16ceab49',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:20 GMT',
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
  '6fb1c1fb-42e4-4b22-a65f-bcb05aa8a3a6',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1590092601,"scheduledPurgeDate":1597868601,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/0935ec8051da4ac7ae4e1239f70e353b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"69M_yNO9MkJIImQJRY89XLrx9hfHo6fBSkOS2rrrGeqIlQmXzmM0vMv8q-uX9Igaa8iekvsdsHj2j3kd5AhJDi7-YJfQgpSQ-9QHmsP9Ni39KONbI6RVLrwRzaZLO-Uym9s4_8pKWZdvd7pimBIkM-laXnejSGTYFothqhgWJDX5vnPiyy6wzBfbr-3o-xtBAumf1JFKvRucb9_plp9rAeeMJ-vRtZF9TD3JMMYDl-SdXBiIJBKs1x7m0jcxg-DmKMIiEOy92HV7oYgBThHLxbn_uswdwIZz5keV6p2Dw7vbxIOQxMvFw9y2ueNUYXnb9fqgG1NimGKgZ3sltNYFiw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092572,"updated":1590092572,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'afdec03f-492f-4acd-8759-fd3efcd5baea',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:20 GMT',
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
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd11c25ad-6262-4607-ae4c-5f767586ca35',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:21 GMT'
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
  '41b9afd0-9e36-418c-b96f-a5f3868bee8d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:20 GMT'
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
  'b058cef0-0f3d-49af-984b-408a02b88c05',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:23 GMT'
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
  '8722972b-fd54-4970-aed5-4908e13bd390',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:25 GMT'
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
  'a1d98f85-5a6f-4691-9739-f33db7bb6ac0',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:26 GMT'
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
  'c3c67d52-651e-4e26-a203-3b77e3a90e83',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:29 GMT'
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
  'fc0a7b3e-7c4b-4f37-87de-f265c1a1ba58',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:30 GMT'
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
  '33dab731-7d4c-427a-885b-d5e9197e59d8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:32 GMT'
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
  'c6fa7208-e9a3-4288-8410-f56b945c1233',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:35 GMT'
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
  '10e23df7-097f-47fc-a8db-0f11e0099dfb',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:37 GMT'
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
  '693ae555-4290-4c44-a1ec-c85c2575318c',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1","deletedDate":1590092601,"scheduledPurgeDate":1597868601,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/challengeAuthKeyName-Authenticationshouldworkforparallelrequests--1/0935ec8051da4ac7ae4e1239f70e353b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"69M_yNO9MkJIImQJRY89XLrx9hfHo6fBSkOS2rrrGeqIlQmXzmM0vMv8q-uX9Igaa8iekvsdsHj2j3kd5AhJDi7-YJfQgpSQ-9QHmsP9Ni39KONbI6RVLrwRzaZLO-Uym9s4_8pKWZdvd7pimBIkM-laXnejSGTYFothqhgWJDX5vnPiyy6wzBfbr-3o-xtBAumf1JFKvRucb9_plp9rAeeMJ-vRtZF9TD3JMMYDl-SdXBiIJBKs1x7m0jcxg-DmKMIiEOy92HV7oYgBThHLxbn_uswdwIZz5keV6p2Dw7vbxIOQxMvFw9y2ueNUYXnb9fqgG1NimGKgZ3sltNYFiw","e":"AQAB"},"attributes":{"enabled":true,"created":1590092572,"updated":1590092572,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  '629b5db3-cefc-44a5-9d98-0a6d896cb0f8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:41 GMT',
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
  '4d098506-ec45-4aeb-bda3-5ac1964082fd',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.158.245.220;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 21 May 2020 20:23:42 GMT'
]);
