let nock = require('nock');

module.exports.hash = "a62afcef7768a860c35fcabd369f4c59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/create')
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
  '32615cae-1f80-4a9e-b55c-b0eeaa35763a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:23 GMT'
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
  '1647191f-fc41-4f66-94c8-0d57ccb31700',
  'x-ms-ests-server',
  '2.1.10620.11 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvrQdu_2QcpKhBAcaVoI2Jw_aSJHAQAAAHd4YNYOAAAA; expires=Fri, 26-Jun-2020 15:04:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 27 May 2020 15:04:23 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzC1uQc4JhMZme+h3xgWkdAZHaCIhV+OCLMSc+8dqg6fYL9W4Bjc90mK8s88GDAb1gn8ch8IGVldmFJ9brPLs4Jad+gx3hdewKBugKMacPyqHrHIG+v49p1kdPwCq848XCQWgI1p663Pua8taSHnsSnZvONPqdmCi3e/b50vb7gEODBpt0PdQ1CUgEIUSLxSWiKaVsim2TpfJXhAuev8rqCd5ApCqKzLzgJ1OBySmZifFEiTmxuo3kSR7hUjdK2f4cB9myEJawqxqBLO/qDyd4XGwQzLNO6QaTc9WP+Jq5hyeJ+ZkpgjZymDysCtlkGmZaMTe0WuQsOBqzqfJCf3r8wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA8/jTcYv8kuR/52ZG6EOgOEsA2yxZd+TRNXw9BgU6s//MR1Vli5wpayPZIXIdMgE9n8sSkIuIRupGybLjnJieKOWwvhxwl5COubcPxYe+/lNk5YSHSlr3UTBF+PO+eksBcGobmb9wY5Cjj5+VPVhFYgZ1XxxgZIWjAkPtzjIoLxM/vzg9WUrMaytmUFWBfai+v/yIs6P5UYXcCeV5edWFNfv3WOlyZTEnNMQo2LVpDxu5moAwJ5ho9IjuYYGQ7w7LbG5NTAw09tf61P64HokbnfPS2cHwt4+IaToVvPe7AWiLOaWWChL/ujLzRtKMc/JvD5YtOWPRLwvwUmDWYl8Vo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8b3796d3b5240f685a3b350e5f2f07c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending?api-version=7.1-preview&request_id=a8b3796d3b5240f685a3b350e5f2f07c',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5196634-dd97-418e-a683-cd3360de4adc',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:24 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzC1uQc4JhMZme+h3xgWkdAZHaCIhV+OCLMSc+8dqg6fYL9W4Bjc90mK8s88GDAb1gn8ch8IGVldmFJ9brPLs4Jad+gx3hdewKBugKMacPyqHrHIG+v49p1kdPwCq848XCQWgI1p663Pua8taSHnsSnZvONPqdmCi3e/b50vb7gEODBpt0PdQ1CUgEIUSLxSWiKaVsim2TpfJXhAuev8rqCd5ApCqKzLzgJ1OBySmZifFEiTmxuo3kSR7hUjdK2f4cB9myEJawqxqBLO/qDyd4XGwQzLNO6QaTc9WP+Jq5hyeJ+ZkpgjZymDysCtlkGmZaMTe0WuQsOBqzqfJCf3r8wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAA8/jTcYv8kuR/52ZG6EOgOEsA2yxZd+TRNXw9BgU6s//MR1Vli5wpayPZIXIdMgE9n8sSkIuIRupGybLjnJieKOWwvhxwl5COubcPxYe+/lNk5YSHSlr3UTBF+PO+eksBcGobmb9wY5Cjj5+VPVhFYgZ1XxxgZIWjAkPtzjIoLxM/vzg9WUrMaytmUFWBfai+v/yIs6P5UYXcCeV5edWFNfv3WOlyZTEnNMQo2LVpDxu5moAwJ5ho9IjuYYGQ7w7LbG5NTAw09tf61P64HokbnfPS2cHwt4+IaToVvPe7AWiLOaWWChL/ujLzRtKMc/JvD5YtOWPRLwvwUmDWYl8Vo=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a8b3796d3b5240f685a3b350e5f2f07c"}, [
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
  'b2350e61-b694-4ec9-8dd5-7469f13efc3d',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:24 GMT',
  'Content-Length',
  '1346'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/', {"attributes":{},"tags":{"customTag":"value"}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/a005245c0d7945e7a56201021c894cbd","attributes":{"enabled":false,"nbf":1590591264,"exp":1622127864,"created":1590591864,"updated":1590591865,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590591864,"updated":1590591864}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '9ce02114-3057-42bd-86d8-4046f20f89cc',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:25 GMT',
  'Content-Length',
  '1198'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canupdatethetagsofacertificate-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/a005245c0d7945e7a56201021c894cbd","attributes":{"enabled":false,"nbf":1590591264,"exp":1622127864,"created":1590591864,"updated":1590591865,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590591864,"updated":1590591864}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '8795cf57-64e4-4470-a299-7679ca7d9b62',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:25 GMT',
  'Content-Length',
  '1198'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-","deletedDate":1590591865,"scheduledPurgeDate":1598367865,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/a005245c0d7945e7a56201021c894cbd","attributes":{"enabled":false,"nbf":1590591264,"exp":1622127864,"created":1590591864,"updated":1590591865,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590591864,"updated":1590591864}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  '12515b46-182b-4b26-b2fb-bb9fa9e41359',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:25 GMT',
  'Content-Length',
  '1404'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b63931e-9ecf-45bd-89ac-9956c8e1c7b4',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd389edc4-1348-4661-a53a-4bc688583fec',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '76f701c9-f6fa-4589-81ef-ee908dfd0d0f',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a3a618bd-e097-42ab-b411-1fc43af52c09',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '95b098df-444a-4963-b1a3-f4ebafd8565a',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0c382576-d925-49ed-9619-e0d0791a20f1',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '198d0eac-1631-48a0-bd22-46aee265b352',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: recoverCertificateName-canupdatethetagsofacertificate-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '154',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8f532fe3-f416-4702-85e2-b2d57a3168ec',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-","deletedDate":1590591865,"scheduledPurgeDate":1598367865,"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/a005245c0d7945e7a56201021c894cbd","attributes":{"enabled":false,"nbf":1590591264,"exp":1622127864,"created":1590591864,"updated":1590591865,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"tags":{"customTag":"value"},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1590591864,"updated":1590591864}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/recoverCertificateName-canupdatethetagsofacertificate-/pending"}}, [
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
  'ef3dbd8d-523b-4ecc-b663-f53b598d4db8',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:39 GMT',
  'Content-Length',
  '1404'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/recoverCertificateName-canupdatethetagsofacertificate-')
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
  'f2f2dd71-53b9-4fb5-8872-a3c130587240',
  'x-ms-keyvault-service-version',
  '1.1.5.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.233.72.51;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 27 May 2020 15:04:39 GMT'
]);
