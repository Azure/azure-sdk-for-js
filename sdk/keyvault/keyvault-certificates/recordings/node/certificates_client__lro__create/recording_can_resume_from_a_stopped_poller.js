let nock = require('nock');

module.exports.hash = "4d9bae2f514e0a425d23342b13831e1e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create')
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
  'fd35d013-ca5b-4f41-8e5a-9d82420153c7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:40 GMT'
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
  '78454d94-2e34-4b52-9cd7-0e4805f14301',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AqsSSsms_TxBvNAkVXZQwtY_aSJHAQAAACWYhtYOAAAA; expires=Sat, 25-Jul-2020 13:05:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:05:40 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending?api-version=7.1&request_id=128814597ff849cbbeaedb49a3ae79de',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f99a766d-759f-464e-a19c-0d949fddf6dd',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:41 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3bb64bbd-3cb8-4ddb-a3f6-e5d650cb5e4d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:41 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '38636b31-3875-49aa-980f-3164c93a21b2',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:41 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8ed50244-3b69-4966-af24-35599a834612',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:41 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e8908fe6-b592-423c-acee-0b2bd9bb45d6',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:41 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd088c1ad-af06-40f5-a655-4466903a5cb0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '23c528af-b89f-41a8-abe9-b36c9d80b9e9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:44 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '161b3362-a73c-4b8a-9e11-58b3ba918eac',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '756824de-99bd-4e17-b3e0-71742546993d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:45 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '11045772-a3ea-4336-a732-9606744cb94a',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c0df953b-5e67-402c-b119-44294166ad2f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:48 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4c4aca5a-d98c-47fd-9324-d4a07702fbf7',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f7d0ebc8-f655-488c-9d13-6b9f24eb6250',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:50 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3e3bfebc-6f0b-4c76-abdf-c9a41cb49483',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c4df0aaa-fd5c-47f8-b612-3927933f6bea',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:51 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2512868e-254d-454b-9717-8f279415bdbb',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f78f9146-fa29-4f9d-a03c-7af111df63f9',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:54 GMT',
  'Content-Length',
  '1344'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c5433940-8602-4258-bfce-6d8756c385c1',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjVrOrRD3sjmlZiA2pTiNhsM1N90gmjau/pp0kfIbEYjBYzzw3xRvf1mOAwpMnD6yJ8HYlGKpByAPRK9/vz85mrE6PYygrr/y8AlcgCw3EoglkC9j48/5sQtkYCiRYu4gWfXi3oNWRamn5LeQzg+c563jt+m3rolEUZcfe4nnPLX+qce4PGS7+Yn45nakhycs1DRsHJWHuV2h91uT/qonGtcW9B6KLw4/kzepWxBGe+0hq64lE5qLIMcXZophH9LonpSpL2j9g8WAmhdbmaZDRWYFdLx7W/UWd5pKCMjeIWraIwbHuixT9ViyGp14OwYKe4JDpzl8GWpKvBrkQH6xtQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAIGYZdNf/BGsM4ErUgn1XUbORqkHV2BJDoxmQrSrIRhq82oMg6xRurnlJehf8MMV+C0EIMlBvOep/eMSBgvMQreJDqjUNpdV4ETA8BajFoXLO1vPjrPz04TrWVMita7Gltz/RIocFy30wTT0fLrY6Qq4qlVHCNh+Keg5J+h5PGUpZefp7YAho/E+bgHFWnjiV7Qqe7z00goP33V9x+cRsEMOmoDHUUWI9hdwI44jY1GLStgK43W1Mm8G1Qzyy9y7vdgrpsCkhGnn1kSoI2m9aCUrnPqlGna1Q3m2Qe91UhblcF4KjwwDfZsw9ET9vHOFnAYMR0Ktv4NPddEW0/VJZl4=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-","request_id":"128814597ff849cbbeaedb49a3ae79de"}, [
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
  '070b71f5-6dd2-4cf6-be10-594a33401e3f',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:56 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","x5t":"kTCh7AU1xkebZa6bij1OjcFc6KU","cer":"MIIDKDCCAhCgAwIBAgIQVOOPsSM1QsSJ8jMh+ISLITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTU0WhcNMjEwNjI1MTMwNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCNWs6tEPeyOaVmIDalOI2GwzU33SCaNq7+mnSR8hsRiMFjPPDfFG9/WY4DCkycPrInwdiUYqkHIA9Er3+/PzmasTo9jKCuv/LwCVyALDcSiCWQL2Pjz/mxC2RgKJFi7iBZ9eLeg1ZFqafkt5DOD5znreO36beuiURRlx97iec8tf6px7g8ZLv5ifjmdqSHJyzUNGwclYe5XaH3W5P+qica1xb0HoovDj+TN6lbEEZ77SGrriUTmosgxxdmimEf0uielKkvaP2DxYCaF1uZpkNFZgV0vHtb9RZ3mkoIyN4hatojBse6LFP1WLIanXg7Bgp7gkOnOXwZakq8GuRAfrG1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyxhaoNbChvzb1YxCJzVFkyWaYEzAdBgNVHQ4EFgQUssYWqDWwob829WMQic1RZMlmmBMwDQYJKoZIhvcNAQELBQADggEBAGj1pQ5ZQpqAvMotkHvvuJT4aQmHkMSxcBh2T8QJmcgikkDhZwOZp/qqDIKl5gbrOTIZGEsAz3kX7RW95fggVNaUpGButUDqnvT7owEerHX0BEyST+uwdKuhAiljGs/86Rx/H4a0wze1hg8KCmXGD9UJp7apQbubEFU/ImVCmor/VY025BUVGSQPUE/gwDhWF75i+BKKDDiDwEI7L+d+CXkn9KfBP2SEwQlrhpBe9EhMg/r+MffLlvRPXPGLVgDhXKbuM6uJ6Vbb6+AFhwUmztG0GvUdVi2Mv/q658EAkFNwyayX0+xXgMmRDSOkxja1Y4buNF+++IC2lEHV7WKfUb4=","attributes":{"enabled":true,"nbf":1593089754,"exp":1624626354,"created":1593090355,"updated":1593090355,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090341,"updated":1593090341}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e3921638-a23e-40af-879b-0ba47242052e',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:56 GMT',
  'Content-Length',
  '2610'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1593090356,"scheduledPurgeDate":1600866356,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","x5t":"kTCh7AU1xkebZa6bij1OjcFc6KU","cer":"MIIDKDCCAhCgAwIBAgIQVOOPsSM1QsSJ8jMh+ISLITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTU0WhcNMjEwNjI1MTMwNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCNWs6tEPeyOaVmIDalOI2GwzU33SCaNq7+mnSR8hsRiMFjPPDfFG9/WY4DCkycPrInwdiUYqkHIA9Er3+/PzmasTo9jKCuv/LwCVyALDcSiCWQL2Pjz/mxC2RgKJFi7iBZ9eLeg1ZFqafkt5DOD5znreO36beuiURRlx97iec8tf6px7g8ZLv5ifjmdqSHJyzUNGwclYe5XaH3W5P+qica1xb0HoovDj+TN6lbEEZ77SGrriUTmosgxxdmimEf0uielKkvaP2DxYCaF1uZpkNFZgV0vHtb9RZ3mkoIyN4hatojBse6LFP1WLIanXg7Bgp7gkOnOXwZakq8GuRAfrG1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyxhaoNbChvzb1YxCJzVFkyWaYEzAdBgNVHQ4EFgQUssYWqDWwob829WMQic1RZMlmmBMwDQYJKoZIhvcNAQELBQADggEBAGj1pQ5ZQpqAvMotkHvvuJT4aQmHkMSxcBh2T8QJmcgikkDhZwOZp/qqDIKl5gbrOTIZGEsAz3kX7RW95fggVNaUpGButUDqnvT7owEerHX0BEyST+uwdKuhAiljGs/86Rx/H4a0wze1hg8KCmXGD9UJp7apQbubEFU/ImVCmor/VY025BUVGSQPUE/gwDhWF75i+BKKDDiDwEI7L+d+CXkn9KfBP2SEwQlrhpBe9EhMg/r+MffLlvRPXPGLVgDhXKbuM6uJ6Vbb6+AFhwUmztG0GvUdVi2Mv/q658EAkFNwyayX0+xXgMmRDSOkxja1Y4buNF+++IC2lEHV7WKfUb4=","attributes":{"enabled":true,"nbf":1593089754,"exp":1624626354,"created":1593090355,"updated":1593090355,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090341,"updated":1593090341}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'dd04e9ff-84e0-4daa-b1db-2b4176d16c13',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:56 GMT',
  'Content-Length',
  '2814'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8de830c0-0121-46f2-b766-d38e00479344',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f26685a4-63e8-4851-9161-9d1f20cb5da5',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c136893b-ddb2-48a7-b59d-663c94f9c189',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '99488d2f-d084-423f-b9fc-a4879594fb3b',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '474a9ace-e465-47b1-899c-7e16a2fb9a31',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:05:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8ac06d24-9ebf-43c7-a07a-f4da102b7c06',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '60484391-63b7-4dc8-9a92-f57bc738ade0',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2668eaa7-1b0c-4c5d-8912-f181c8f042d3',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd5389ded-ecb5-4923-b7e7-b70586b64522',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ae621b3a-302a-4bae-a0ed-135aef11f623',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4df532c6-21e8-4b33-b371-3e42b7b91f43',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fa54c059-4842-41f7-94ac-9e1121ac6b04',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '55165ceb-0779-4705-8964-5001b4cadcdd',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroCreateCertificateName-canresumefromastoppedpoller-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '152',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8d796a38-cde9-405f-90e0-fb3e48cf3841',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/listCertificateName-canlistcertificatesbypage-4892663737593751')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: listCertificateName-canlistcertificatesbypage-4892663737593751"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '146',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1adbafdc-e617-4090-99e7-9eea26df3165',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-","deletedDate":1593090356,"scheduledPurgeDate":1600866356,"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","kid":"https://keyvault_name.vault.azure.net/keys/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","sid":"https://keyvault_name.vault.azure.net/secrets/lroCreateCertificateName-canresumefromastoppedpoller-/8e1650fe599f422ca8a2a0166b6639ca","x5t":"kTCh7AU1xkebZa6bij1OjcFc6KU","cer":"MIIDKDCCAhCgAwIBAgIQVOOPsSM1QsSJ8jMh+ISLITANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1NTU0WhcNMjEwNjI1MTMwNTU0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCNWs6tEPeyOaVmIDalOI2GwzU33SCaNq7+mnSR8hsRiMFjPPDfFG9/WY4DCkycPrInwdiUYqkHIA9Er3+/PzmasTo9jKCuv/LwCVyALDcSiCWQL2Pjz/mxC2RgKJFi7iBZ9eLeg1ZFqafkt5DOD5znreO36beuiURRlx97iec8tf6px7g8ZLv5ifjmdqSHJyzUNGwclYe5XaH3W5P+qica1xb0HoovDj+TN6lbEEZ77SGrriUTmosgxxdmimEf0uielKkvaP2DxYCaF1uZpkNFZgV0vHtb9RZ3mkoIyN4hatojBse6LFP1WLIanXg7Bgp7gkOnOXwZakq8GuRAfrG1AgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSyxhaoNbChvzb1YxCJzVFkyWaYEzAdBgNVHQ4EFgQUssYWqDWwob829WMQic1RZMlmmBMwDQYJKoZIhvcNAQELBQADggEBAGj1pQ5ZQpqAvMotkHvvuJT4aQmHkMSxcBh2T8QJmcgikkDhZwOZp/qqDIKl5gbrOTIZGEsAz3kX7RW95fggVNaUpGButUDqnvT7owEerHX0BEyST+uwdKuhAiljGs/86Rx/H4a0wze1hg8KCmXGD9UJp7apQbubEFU/ImVCmor/VY025BUVGSQPUE/gwDhWF75i+BKKDDiDwEI7L+d+CXkn9KfBP2SEwQlrhpBe9EhMg/r+MffLlvRPXPGLVgDhXKbuM6uJ6Vbb6+AFhwUmztG0GvUdVi2Mv/q658EAkFNwyayX0+xXgMmRDSOkxja1Y4buNF+++IC2lEHV7WKfUb4=","attributes":{"enabled":true,"nbf":1593089754,"exp":1624626354,"created":1593090355,"updated":1593090355,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090341,"updated":1593090341}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroCreateCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'a5f94533-46ab-41de-9847-9a4875a40239',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:11 GMT',
  'Content-Length',
  '2814'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroCreateCertificateName-canresumefromastoppedpoller-')
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
  'fd25684d-2868-4bfa-8ea2-f88bcb2ccf5d',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=51.141.175.151;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 25 Jun 2020 13:06:11 GMT'
]);
