let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/create')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e39a7755-cd08-4fc9-8f6a-f72885acb4e7',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:14 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  '5b865444-cefe-4b5f-be9f-5859c6840800',
  'x-ms-ests-server',
  '2.1.9587.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHAQAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/e77c8d7e752b41899c8d81889eab0954","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jKm86SCZoLCRwh_ano6yeTgbmCd9I0VVTQ2JRQO9P0DN4C-UBV7wmvaaWalY9UUvvAUzcxzOvKEydetpeLswDVLqQNWywxexaIBYf79WrffKcp3tUTbn1QkzQJBID_28lsDAiS86drWVo0pn-PgifH4umdMYRmRVF2O3REusqoFeJfC4BJbL0ey-oh45l_L7aRD81PtCdGxDm66mmk6mGGDWfB_vlg6pmVmW-BJnbU5z0hXdygVV7X69YlZGb872qAqN3rfLbCG4reuLLvfHxl2OV_WAljG_w7wlKPRrYBIJrlOGz5WrhYfDbGFDe7p9MKpk6UZsiPxjmBvpAyVitQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797514,"updated":1571797514,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4515a1cf-f77b-4858-b4ca-8526b7cc5005',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:14 GMT',
  'Content-Length',
  '725'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4249dc3a-c6de-4e4d-8836-58b4c344568d',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:14 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '8fa4cac2-61d4-4066-8382-ca4569620800',
  'x-ms-ests-server',
  '2.1.9587.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHAgAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-","deletedDate":1571797515,"scheduledPurgeDate":1579573515,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/e77c8d7e752b41899c8d81889eab0954","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jKm86SCZoLCRwh_ano6yeTgbmCd9I0VVTQ2JRQO9P0DN4C-UBV7wmvaaWalY9UUvvAUzcxzOvKEydetpeLswDVLqQNWywxexaIBYf79WrffKcp3tUTbn1QkzQJBID_28lsDAiS86drWVo0pn-PgifH4umdMYRmRVF2O3REusqoFeJfC4BJbL0ey-oh45l_L7aRD81PtCdGxDm66mmk6mGGDWfB_vlg6pmVmW-BJnbU5z0hXdygVV7X69YlZGb872qAqN3rfLbCG4reuLLvfHxl2OV_WAljG_w7wlKPRrYBIJrlOGz5WrhYfDbGFDe7p9MKpk6UZsiPxjmBvpAyVitQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797514,"updated":1571797514,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd900adf5-9eaa-4172-a868-045e6dd0abfa',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT',
  'Content-Length',
  '925'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b4342aa6-66a6-4fa6-aa1f-7551637310b5',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '4bf3ad4e-7af7-4d97-896f-d79b6ae00900',
  'x-ms-ests-server',
  '2.1.9587.7 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHAwAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4dedaa50-726a-4f79-9239-e22fc6256bbd',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '834e751e-ff48-4856-a328-1254f940f1d2',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'f4e11382-1fbc-4c8e-af83-ef7d305b0700',
  'x-ms-ests-server',
  '2.1.9587.7 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHBAAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:15 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '158d7afe-3b59-4d4c-b98c-6b12f3d46aaa',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:16 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fea1fad4-9980-4d25-842a-5b601bbbd312',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:18 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '5e42b444-1e3e-47cc-b12a-83a2995e0800',
  'x-ms-ests-server',
  '2.1.9587.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHBQAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cf232a9f-2f74-4a3f-8785-1cfbfee5d713',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:18 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2a48946b-c066-428b-83ce-812e86d1610b',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:20 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '6fa51275-6f68-4655-a526-63e852fd0800',
  'x-ms-ests-server',
  '2.1.9587.7 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHBgAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:20 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '227741f9-8268-43f8-94c9-e380938c8b5e',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:20 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '25bac5bb-01ba-4d5b-ae90-d8c5ad6ea68b',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:22 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '362ef6f9-f6ea-4ad0-8fa7-51b2fc370900',
  'x-ms-ests-server',
  '2.1.9587.7 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHBwAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:22 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5f05d4e8-df6c-4c2b-a48d-d4db9296e9b6',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:23 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b5954c31-1f30-4b33-9aec-0fb6457d86d7',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:25 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'e87488b2-d5ef-4642-9af7-0009987b0900',
  'x-ms-ests-server',
  '2.1.9587.7 - WUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHCAAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:24 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '147',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1bc1ea6a-60a3-414a-9fd7-dfbd31a17320',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:25 GMT'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '435f4b90-bc5b-462c-a321-bf10d65d15c3',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:27 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'b51bf433-3a1b-41a2-b0ce-cfeedc1d0800',
  'x-ms-ests-server',
  '2.1.9587.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHCQAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:27 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-","deletedDate":1571797515,"scheduledPurgeDate":1579573515,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/e77c8d7e752b41899c8d81889eab0954","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jKm86SCZoLCRwh_ano6yeTgbmCd9I0VVTQ2JRQO9P0DN4C-UBV7wmvaaWalY9UUvvAUzcxzOvKEydetpeLswDVLqQNWywxexaIBYf79WrffKcp3tUTbn1QkzQJBID_28lsDAiS86drWVo0pn-PgifH4umdMYRmRVF2O3REusqoFeJfC4BJbL0ey-oh45l_L7aRD81PtCdGxDm66mmk6mGGDWfB_vlg6pmVmW-BJnbU5z0hXdygVV7X69YlZGb872qAqN3rfLbCG4reuLLvfHxl2OV_WAljG_w7wlKPRrYBIJrlOGz5WrhYfDbGFDe7p9MKpk6UZsiPxjmBvpAyVitQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797514,"updated":1571797514,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '269cde5d-4c54-4c28-9b02-966a2beb6797',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:27 GMT',
  'Content-Length',
  '925'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/recover')
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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '37ddf291-5794-4cec-a709-45593d996360',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:27 GMT'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '27d7f497-d80c-4d2f-946f-a25543580800',
  'x-ms-ests-server',
  '2.1.9587.7 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AttTenyGlUtFhz-KqzfiJpI_aSJHCgAAAAmxQdUOAAAA; expires=Fri, 22-Nov-2019 02:25:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 23 Oct 2019 02:25:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/recover')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/recoverKeyName-canrecoveradeletedkeywithrequestOptionstimeout-/e77c8d7e752b41899c8d81889eab0954","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"jKm86SCZoLCRwh_ano6yeTgbmCd9I0VVTQ2JRQO9P0DN4C-UBV7wmvaaWalY9UUvvAUzcxzOvKEydetpeLswDVLqQNWywxexaIBYf79WrffKcp3tUTbn1QkzQJBID_28lsDAiS86drWVo0pn-PgifH4umdMYRmRVF2O3REusqoFeJfC4BJbL0ey-oh45l_L7aRD81PtCdGxDm66mmk6mGGDWfB_vlg6pmVmW-BJnbU5z0hXdygVV7X69YlZGb872qAqN3rfLbCG4reuLLvfHxl2OV_WAljG_w7wlKPRrYBIJrlOGz5WrhYfDbGFDe7p9MKpk6UZsiPxjmBvpAyVitQ","e":"AQAB"},"attributes":{"enabled":true,"created":1571797514,"updated":1571797514,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9dc2d0e8-ca0e-43e1-bc28-773dfae85ab1',
  'x-ms-keyvault-service-version',
  '1.1.0.879',
  'x-ms-keyvault-network-info',
  'addr=167.220.2.132;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 23 Oct 2019 02:25:28 GMT',
  'Content-Length',
  '725'
]);

