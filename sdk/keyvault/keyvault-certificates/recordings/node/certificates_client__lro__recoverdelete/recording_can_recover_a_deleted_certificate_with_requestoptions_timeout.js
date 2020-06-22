let nock = require('nock');

module.exports.hash = "1d277512bb04dd9cdf7874563f150fcb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'd5360015-3618-4b8e-881a-0addf15fd507',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '740ba2bd-6084-4a2f-9e4e-c5555acd0600',
  'x-ms-ests-server',
  '2.1.9987.14 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RAQAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:18 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:18 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwuY3aWJwUGv6m/5yRDnwvE3hAgaY2/lQ99gsyp7IKGnQZJxva3BKFAANtWwA+J6V5P6xHMvKw3O8qiY3KpQr8sZdHwn7cvMVAjuWvaHZruN7xm/DDXrCbir6gf8MWMHKmigJIl69F7RkkZ02iMjFtzSrmyETzjGTNXWt2/wHV+7nBceDUk1bHL0J1O1v6rTqJZh4JARTxcdzX4mMalLnAHQvrLmI2rEjJvUkdg2IcQsJgyB1jysitoW7Bjhc8o3bs1pVeoUfz0uNJhhIK5wAWmyMljuqqAaIbUWcZJManFe0qRT1XP1dgedWymKqtsk3368VM1OjIakPx0U/BAEw4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ7ST//sN7pXYitVodRaaEfhWscC8URkt/HIcvD43pze2wapBiGHijbSXdfQ7/OWvqyYdcc1VIWUF0VdjnvGADrFIo+UKxGZKlfx+gaKIIv/c9vUs6z9tg2wkqLRipudLl28humEs0zyYIob/zwjWOJoNRcMKRBqzticC2ch/O0ALxAaI6DX2cG2ppRFSn5mUPZkkPwN+eGZ9hiRCWJn/bEfMHYZmLzoAtWM2zonvHUMzVWJN7CxMsx16ECPPqVhhc6vX7Lav0vvOBHGKGhlx+2GaQORcMKMNFi/6e5+P75LgXB1aNEAMtAmKYLT2KV6ETHkdXF9Ls5XHL8Zk59p9z8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d22eeea7c618447395e94c265fd8e248"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending?api-version=7.0&request_id=d22eeea7c618447395e94c265fd8e248',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '44abdc6e-a579-4792-b68b-86385d952c20',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:18 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '5f12cb2b-ad59-4e75-82f9-5e9bcd06de7d',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:18 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '1bfb3e17-31ca-4d72-937a-d08f52630600',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RAgAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:19 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwuY3aWJwUGv6m/5yRDnwvE3hAgaY2/lQ99gsyp7IKGnQZJxva3BKFAANtWwA+J6V5P6xHMvKw3O8qiY3KpQr8sZdHwn7cvMVAjuWvaHZruN7xm/DDXrCbir6gf8MWMHKmigJIl69F7RkkZ02iMjFtzSrmyETzjGTNXWt2/wHV+7nBceDUk1bHL0J1O1v6rTqJZh4JARTxcdzX4mMalLnAHQvrLmI2rEjJvUkdg2IcQsJgyB1jysitoW7Bjhc8o3bs1pVeoUfz0uNJhhIK5wAWmyMljuqqAaIbUWcZJManFe0qRT1XP1dgedWymKqtsk3368VM1OjIakPx0U/BAEw4QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAJ7ST//sN7pXYitVodRaaEfhWscC8URkt/HIcvD43pze2wapBiGHijbSXdfQ7/OWvqyYdcc1VIWUF0VdjnvGADrFIo+UKxGZKlfx+gaKIIv/c9vUs6z9tg2wkqLRipudLl28humEs0zyYIob/zwjWOJoNRcMKRBqzticC2ch/O0ALxAaI6DX2cG2ppRFSn5mUPZkkPwN+eGZ9hiRCWJn/bEfMHYZmLzoAtWM2zonvHUMzVWJN7CxMsx16ECPPqVhhc6vX7Lav0vvOBHGKGhlx+2GaQORcMKMNFi/6e5+P75LgXB1aNEAMtAmKYLT2KV6ETHkdXF9Ls5XHL8Zk59p9z8=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"d22eeea7c618447395e94c265fd8e248"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '3ea3465e-d295-496a-bebe-068075b52138',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'b35f9cf9-232a-44bb-80c6-b2ce8a28ff00',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  'ab002f12-300e-4e9a-9bfd-9a241bbc0600',
  'x-ms-ests-server',
  '2.1.9987.14 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RAwAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:20 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-","deletedDate":1580947580,"scheduledPurgeDate":1588723580,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/0d6d1205ee424474be50b27f80a6c2fc","attributes":{"enabled":false,"nbf":1580946979,"exp":1612569979,"created":1580947579,"updated":1580947579,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1580947579,"updated":1580947579}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '50ba9425-25d7-48dc-b6d3-cf95e7d4df2d',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT',
  'Content-Length',
  '1390'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '0f3bc35e-57cb-4309-b054-8001964fc9a3',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:19 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '0bafdd33-d19f-4b54-8c17-6cb206020700',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RBAAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:20 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:20 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'eee9dc7f-7e87-49f9-8266-460a97e53ed2',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'a4af0c3a-87a4-4e83-9b2e-5170f0c9cdab',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:20 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '9b91682c-2339-42ea-a2c0-2eede9800600',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RBQAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:21 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:20 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '8380577e-ee4a-4100-a3e7-f7cccec9afa0',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '450818f8-eb86-463f-92d6-4358bc2f012a',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:22 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '9b91682c-2339-42ea-a2c0-2eed1f810600',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RBgAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:23 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:22 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '45a91384-d51b-4abf-b981-b0ae8ac73ef4',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '0b8bf674-114c-4e58-b337-acf0af3c68b0',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:24 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '742853a4-05a4-4c52-b29b-b78209650600',
  'x-ms-ests-server',
  '2.1.9987.14 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RBwAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:26 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:25 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '0d137736-5530-4c96-8e90-e324420dfec8',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '4f34303e-aba2-472e-8efd-75b62218a726',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:27 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '2b5a45cb-c11d-4f4c-aea0-2cede8a50600',
  'x-ms-ests-server',
  '2.1.9987.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RCAAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:28 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:27 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'f6cd4d1a-da3c-4205-9f0a-0f0d09f307ce',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'dbbb63e0-065d-4238-997d-fffbeaef6fee',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:29 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '740ba2bd-6084-4a2f-9e4e-c55568ce0600',
  'x-ms-ests-server',
  '2.1.9987.14 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RCQAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:30 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:29 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '8a1a5e9d-cd6b-4992-988c-7c49fbc3c08a',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '158f400f-d9af-4e0f-80d8-41d6e0603f8a',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:31 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '80ed5c3c-115c-4f27-8970-8caf16790600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RCgAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:33 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:32 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '0ae7f112-3375-4003-a874-eac66f2ddb23',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '063127cd-a32d-4714-ad2f-983a28db56b0',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:35 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '80ed5c3c-115c-4f27-8970-8caf4b790600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RCwAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:35 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:34 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '681dc209-da44-4602-bc58-b5d0b2ab2098',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'd81687b7-2a92-4630-9496-fc49003a02c3',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:37 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '881c105d-1a4f-48cd-b32e-84bf826f0600',
  'x-ms-ests-server',
  '2.1.9987.14 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RDAAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:38 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:38 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'eaa3c50a-3b4e-4a4a-8d61-7fc9e40529d5',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'b4ff2330-2da5-423a-a5e3-2fed2fd7f2e2',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:40 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '80ed5c3c-115c-4f27-8970-8caff1790600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RDQAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:40 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:40 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '178',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'fb91c42c-e546-457f-8ca0-e2dba4def7b8',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer ' +
    'authorization="https://login.windows.net/azure_tenant_id", ' +
    'resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  'cb65cadf-2446-4bb2-9354-42ec3428710b',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:42 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  '373d0e6d-f670-47ef-ab53-8c21c3210600',
  'x-ms-ests-server',
  '2.1.9987.14 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtqdVvxL_i5EswSmUcLOcZ1Tly3RDgAAAHlPzdUOAAAA; expires=Sat, ' +
    '07-Mar-2020 00:06:43 GMT; path=/; secure; HttpOnly; ' +
    'SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 06 Feb 2020 00:06:43 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-","deletedDate":1580947580,"scheduledPurgeDate":1588723580,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/0d6d1205ee424474be50b27f80a6c2fc","attributes":{"enabled":false,"nbf":1580946979,"exp":1612569979,"created":1580947579,"updated":1580947579,"recoveryLevel":"Recoverable+Purgeable"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1580947579,"updated":1580947579}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canrecoveradeletedcertificatewithrequestOptionstimeout-/pending"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; ckeyvault_nameset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'centralus',
  'x-ms-request-id',
  '0e5559b6-760f-456d-962f-4467916e3598',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=167.220.81.170;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 06 Feb 2020 00:06:43 GMT',
  'Content-Length',
  '1390'
]);
