let nock = require('nock');

module.exports.hash = "f72f6d410ddbb6f290d566a3ab5c8d5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create')
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
  '5126de41-dce5-4dac-8bf7-756054faae62',
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
  'Thu, 25 Jun 2020 13:09:31 GMT'
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
  '425ca285-2d99-4e39-8fa7-2c7274df1e00',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Akn8tbyz_XFDvmesabiqG_w_aSJHAQAAAAuZhtYOAAAA; expires=Sat, 25-Jul-2020 13:09:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:09:31 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending?api-version=7.1-preview&request_id=a3bb5644e6394241a9b0333064971512',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7da3a57f-c55a-4646-bb7b-b53166865fd9',
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
  'Thu, 25 Jun 2020 13:09:33 GMT',
  'Content-Length',
  '1373'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  'b3978487-5c52-4279-a9f1-fbdcf7773915',
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
  'Thu, 25 Jun 2020 13:09:33 GMT',
  'Content-Length',
  '1373'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '6ac14a12-700e-4e40-89cf-4299e24222bf',
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
  'Thu, 25 Jun 2020 13:09:33 GMT',
  'Content-Length',
  '1373'
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
  'e89cd76b-c858-4b64-8cb5-e0908a0eb564',
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
  'Thu, 25 Jun 2020 13:09:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '43891ff2-5e2a-43dc-803c-4d7b8c41477d',
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
  'Thu, 25 Jun 2020 13:09:35 GMT',
  'Content-Length',
  '1373'
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
  '7892ef78-e832-4521-aced-5ea2d5f06186',
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
  'Thu, 25 Jun 2020 13:09:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '517ff952-aea6-468b-9fa1-02f197e89309',
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
  'Thu, 25 Jun 2020 13:09:37 GMT',
  'Content-Length',
  '1373'
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
  '530b4bd9-e3d8-415e-b2b5-1bc573ef03ce',
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
  'Thu, 25 Jun 2020 13:09:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  'e51fbd29-515e-4095-b5ae-df4548203858',
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
  'Thu, 25 Jun 2020 13:09:38 GMT',
  'Content-Length',
  '1373'
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
  'aaab3bc9-ab98-4e60-bd44-c3a19263d489',
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
  'Thu, 25 Jun 2020 13:09:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '950004c7-f688-4595-a3bd-90c0db881e3f',
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
  'Thu, 25 Jun 2020 13:09:40 GMT',
  'Content-Length',
  '1373'
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
  '1e642183-01db-44a1-863d-7b7896997901',
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
  'Thu, 25 Jun 2020 13:09:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '4b8475ae-b336-467b-a488-8bf59f73ba0f',
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
  'Thu, 25 Jun 2020 13:09:43 GMT',
  'Content-Length',
  '1373'
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
  'efff852e-3954-4aef-9857-67f128b3377c',
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
  'Thu, 25 Jun 2020 13:09:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '8c89b677-f2db-49e8-a60b-eca5a9e24731',
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
  'Thu, 25 Jun 2020 13:09:44 GMT',
  'Content-Length',
  '1373'
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
  'b6c57bc3-cbb5-4b7d-a686-05ef536acb70',
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
  'Thu, 25 Jun 2020 13:09:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzMQMTRSG8t88Tbtmopvb/+OTX2Ie3AQYlzsIADGKiLTJozroUi60LsM4IUygIbnXv8578OduZ+De35fKYi+P7laIKXdVFSusGKR6FxiInF7NZ9IFEOGWQWcBz21GmgSux9LQWqXKJJV41HQfuNYN2EKXKjwy8xnQs4VLvTtT/hrMvKT67XicmqCe/zRDwM3PFXEA6j1wt1BI8I6pA5zjfhQWu9YoQPS1i85fapGxWEvH7+vnMniy7jCgGR5DRzuJyof671n/whVq96z5imsJmUHclYxa0afI4C6zbeerznyEuG0Mpzb2OcAo9NEbRcEYBlbzHKkrB3Y056vbvHJaVwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGpGHGs0zGzfWL37jozaKh15g5GEr1NdKYmkAO+nc3anXjAhlgNJljPfXNVNgf0sABbUoypInBK+cI4TqO3rMJ3fs+ezlhitLBW4v/d2qNQEOfgsxfeP0O436rm8uAWidIsWpT+ZDi+fdifPPxi4WFbB2RyuT8Ddw5zzkYu8XK4Lbm++lUgecKkmR6cSDtqdxmfe5D0ICymUDccnkB+i+lHV+Q7VMWHrhqOiXSxa+hFRWNjWIKsYTf2QC7N67vGrOdh47qEmtHofrOfNsJ7vE+exx5F5na7tYNMCIEb6PKWZ5GiTP8a3Y5vnFrsKiVVUEvZqk9w2ZGq1tJre+dms2qM=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","request_id":"a3bb5644e6394241a9b0333064971512"}, [
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
  '8cd82906-9c37-4138-a838-098536bb5f96',
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
  'Thu, 25 Jun 2020 13:09:47 GMT',
  'Content-Length',
  '1373'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090585,"updated":1593090585,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090572,"updated":1593090572}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '1cb492b2-cdb1-4003-943a-6efc30aab400',
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
  'Thu, 25 Jun 2020 13:09:47 GMT',
  'Content-Length',
  '2755'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
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
  '4489b1d2-d437-4b27-a5eb-daced418bbd6',
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
  'Thu, 25 Jun 2020 13:09:48 GMT'
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
  'e247c0d0-cc30-4caf-93f2-9614a658cd46',
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
  'Thu, 25 Jun 2020 13:09:48 GMT'
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
  '425ca285-2d99-4e39-8fa7-2c722fe11e00',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Akn8tbyz_XFDvmesabiqG_w_aSJHAgAAAAuZhtYOAAAA; expires=Sat, 25-Jul-2020 13:09:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 13:09:47 GMT',
  'Content-Length',
  '1310'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/')
  .query(true)
  .reply(200, {"value":"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","contentType":"application/x-pkcs12","id":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","managed":true,"attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090585,"updated":1593090585,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd"}, [
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
  'cba18390-0ed2-4eff-a3ca-06164a262a0f',
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
  'Thu, 25 Jun 2020 13:09:48 GMT',
  'Content-Length',
  '4087'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/import', {"value":"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"})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090588,"updated":1593090588,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090588,"updated":1593090588}}}, [
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
  '976b79b2-ce34-4c3f-bee0-c1bdb8f5a999',
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
  'Thu, 25 Jun 2020 13:09:48 GMT',
  'Content-Length',
  '2571'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1593090589,"scheduledPurgeDate":1600866589,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090585,"updated":1593090585,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090572,"updated":1593090572}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  '996f99f0-629d-4ff6-af2e-2453ecb8fd95',
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
  'Thu, 25 Jun 2020 13:09:48 GMT',
  'Content-Length',
  '2988'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '61a7da7f-67cd-4659-bd32-7ee6ab73e0bb',
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
  'Thu, 25 Jun 2020 13:09:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cbeaaea8-4b29-4217-a962-4e9c1fd71822',
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
  'Thu, 25 Jun 2020 13:09:48 GMT'
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
  'df0f997d-1c86-48c5-8d06-9d7f5c747f6a',
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
  'Thu, 25 Jun 2020 13:09:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cbcf07f4-5889-46fe-89b2-b7dd5fa71edb',
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
  'Thu, 25 Jun 2020 13:09:50 GMT'
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
  '258cea0a-9f7e-41f5-9121-3a99bf924d00',
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
  'Thu, 25 Jun 2020 13:09:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17f463d1-f972-464b-ae46-83e06d2b413d',
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
  'Thu, 25 Jun 2020 13:09:52 GMT'
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
  'adedd5b5-359f-427b-ad56-8504d19f9b87',
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
  'Thu, 25 Jun 2020 13:09:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5b294d93-21b9-4c53-a19a-e56c55f683ae',
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
  'Thu, 25 Jun 2020 13:09:54 GMT'
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
  '7d5e8d89-8ab4-4a34-ab6f-45af047275f6',
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
  'Thu, 25 Jun 2020 13:09:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd39e49c4-7476-47c3-a3fe-7135d9edd373',
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
  'Thu, 25 Jun 2020 13:09:56 GMT'
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
  'e4c1160e-3564-4115-b51d-54211694510e',
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
  'Thu, 25 Jun 2020 13:09:59 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '22db302a-bf80-47f6-b72a-abf8ba68f1ac',
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
  'Thu, 25 Jun 2020 13:09:59 GMT'
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
  'e173db05-bab6-459c-88e3-f844ee2161c8',
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
  'Thu, 25 Jun 2020 13:10:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0","deletedDate":1593090589,"scheduledPurgeDate":1600866589,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/90fa798e7ce449ca8942a5fb054044cd","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090585,"updated":1593090585,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593090572,"updated":1593090572}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0/pending"}}, [
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
  'b9d8da3f-194d-4738-9834-9dfd5d041543',
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
  'Thu, 25 Jun 2020 13:10:01 GMT',
  'Content-Length',
  '2988'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-0')
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
  '0e924e75-42f7-41a2-8121-84232bf4e87c',
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
  'Thu, 25 Jun 2020 13:10:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1593090601,"scheduledPurgeDate":1600866601,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090588,"updated":1593090588,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090588,"updated":1593090588}}}, [
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
  'c02e2410-53bd-4130-8982-af113e1ef03e',
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
  'Thu, 25 Jun 2020 13:10:01 GMT',
  'Content-Length',
  '2804'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7ec4813e-e9e1-4e93-bc18-42c4bf3ca6f0',
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
  'Thu, 25 Jun 2020 13:10:01 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'cffd5e16-c16d-4063-97e5-adb09263ef7c',
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
  'Thu, 25 Jun 2020 13:10:01 GMT'
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
  '46dba5a1-0661-4fcf-acd0-32699afe0317',
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
  'Thu, 25 Jun 2020 13:10:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '11aa6381-7ac6-468b-83cb-b6b3bd207b27',
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
  'Thu, 25 Jun 2020 13:10:03 GMT'
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
  'c58585ac-1057-4f79-822d-ee5b37f4c0a0',
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
  'Thu, 25 Jun 2020 13:10:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '0579dd09-952d-4101-abea-9302cee26e7d',
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
  'Thu, 25 Jun 2020 13:10:05 GMT'
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
  '905d11fb-3953-4aa7-86e2-a92016de5001',
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
  'Thu, 25 Jun 2020 13:10:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'acd9c1ff-c1f0-4281-98d8-acc8f420ae50',
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
  'Thu, 25 Jun 2020 13:10:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5d2ea4d3-797b-4f25-8e73-bbf70a055cf0',
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
  'Thu, 25 Jun 2020 13:10:09 GMT'
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
  '09d78e35-5db0-48ca-a8b0-012f60aca313',
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
  'Thu, 25 Jun 2020 13:10:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c2b79f73-845d-4978-8c6a-0e1825ce9ca2',
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
  'Thu, 25 Jun 2020 13:10:11 GMT'
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
  '816b11a4-8486-430f-8c2a-94acc9e6c62b',
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
  'Thu, 25 Jun 2020 13:10:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'adb211d0-f7f3-4a35-8dec-e39912ccc194',
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
  'Thu, 25 Jun 2020 13:10:13 GMT'
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
  '3042f5de-3143-4d16-ae81-fc719fad07fa',
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
  'Thu, 25 Jun 2020 13:10:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '181',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '41429390-a83a-4a20-abad-4560fc9539a9',
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
  'Thu, 25 Jun 2020 13:10:15 GMT'
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
  '90ee6a00-0818-4f03-aac6-4443dce44336',
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
  'Thu, 25 Jun 2020 13:10:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1","deletedDate":1593090601,"scheduledPurgeDate":1600866601,"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","kid":"https://keyvault_name.vault.azure.net/keys/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","sid":"https://keyvault_name.vault.azure.net/secrets/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/f8f3ce4d12f14fe0b47047f63ff5fcbc","x5t":"191IPPKwek_3mOK94Dtd6vDstI4","cer":"MIIDKDCCAhCgAwIBAgIQCVlTsh0bS7eIz0HnI8D3pDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI1OTQ1WhcNMjEwNjI1MTMwOTQ1WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDMxAxNFIby3zxNu2aim9v/45NfYh7cBBiXOwgAMYqItMmjOuhSLrQuwzghTKAhude/znvw525n4N7fl8piL4/uVogpd1UVK6wYpHoXGIicXs1n0gUQ4ZZBZwHPbUaaBK7H0tBapcoklXjUdB+41g3YQpcqPDLzGdCzhUu9O1P+Gsy8pPrteJyaoJ7/NEPAzc8VcQDqPXC3UEjwjqkDnON+FBa71ihA9LWLzl9qkbFYS8fv6+cyeLLuMKAZHkNHO4nKh/rvWf/CFWr3rPmKawmZQdyVjFrRp8jgLrNt56vOfIS4bQynNvY5wCj00RtFwRgGVvMcqSsHdjTnq9u8clpXAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBRmQ00ufRT+7abuqXFJkUjhDgKlfjAdBgNVHQ4EFgQUZkNNLn0U/u2m7qlxSZFI4Q4CpX4wDQYJKoZIhvcNAQELBQADggEBABwk/wLoAyPVbw00BmfgeInXRVvK/O82h04MP9TsH3XJOVip4P6038jJmhovT2n1BwZ2QjYb9Ca8UxfteUiicRIQAl/KNuEckvQj5ctdY+0+lR+UcPdc8HaPMhor/03lFR6ehEeM6lJnAh4SFrQT4VQr7VjlRXoIyVLFWr4i2cn0+1bm5NdvyL9qlfQVQmCUAYW+Pl+Aa48OP4B/NiPrB/NOf3m/Fbz65da4tlCDKI9iYV1vR9ozxJ6gmHvDBbRVSEusrTa3j2crunb290dFsK9X4WRb/yvxDCH5F963d+ZoSRQy3uHw3PqnyR1VJPVoi26KaIdpdyYrTFdNVizh8f8=","attributes":{"enabled":true,"nbf":1593089985,"exp":1624626585,"created":1593090588,"updated":1593090588,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"CN=MyCert","ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":13,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"EmailContacts"}}],"issuer":{"name":"Unknown"},"attributes":{"enabled":true,"created":1593090588,"updated":1593090588}}}, [
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
  'ece20774-789c-4224-a411-3ecfa34a1512',
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
  'Thu, 25 Jun 2020 13:10:17 GMT',
  'Content-Length',
  '2804'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/mergeCertificateName-canimportacertificatefromacertificatesnonbase64secretvalue-1')
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
  '76a9919b-2f27-43b3-930d-30c6be6d5927',
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
  'Thu, 25 Jun 2020 13:10:17 GMT'
]);
