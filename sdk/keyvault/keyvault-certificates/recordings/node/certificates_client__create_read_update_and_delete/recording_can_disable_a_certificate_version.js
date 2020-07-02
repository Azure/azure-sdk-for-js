let nock = require('nock');

module.exports.hash = "c77e8cb87a2f1e442f864001ed283732";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create')
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
  '927b2fcb-60a9-4718-b90e-1f7abc94150b',
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
  'Thu, 25 Jun 2020 12:54:18 GMT'
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
  'd2c2745a-9e2b-4fa8-af62-6107690fb500',
  'x-ms-ests-server',
  '2.1.10732.8 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AmhUuPsVCqJAlME-GBL3b7s_aSJHAQAAAHuVhtYOAAAA; expires=Sat, 25-Jul-2020 12:54:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:54:18 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-candisableacertificateversion-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending?api-version=7.1-preview&request_id=c4e89464dcc54b8b8d78fb2ee3480068',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '33d78ac0-3d22-4d51-88db-53ea839b0f9f',
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
  'Thu, 25 Jun 2020 12:54:20 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  'f9e71b78-e68f-47d0-92b4-bf56075910ab',
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
  'Thu, 25 Jun 2020 12:54:20 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  '880be4fb-4729-455f-ba94-665ae6eb28bd',
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
  'Thu, 25 Jun 2020 12:54:20 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  '480b9b54-7873-4cc4-8e51-329ca0be0b43',
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
  'Thu, 25 Jun 2020 12:54:22 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  'be4907ed-1a61-47c2-83d2-1a706125c36f',
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
  'Thu, 25 Jun 2020 12:54:24 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  '155f4f44-e1b9-4bbc-a458-d761bb2c2b31',
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
  'Thu, 25 Jun 2020 12:54:26 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  '80caf6ed-55de-419a-bae8-a12f964b040f',
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
  'Thu, 25 Jun 2020 12:54:28 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  'd742a66b-ad7f-454b-92cf-e126f19f86e9',
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
  'Thu, 25 Jun 2020 12:54:30 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  '6fefec4a-7a29-4f53-b387-ed34c0243fe7',
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
  'Thu, 25 Jun 2020 12:54:31 GMT',
  'Content-Length',
  '1341'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ER2WZrgvdujoxd1Cg8sVMDDiCuK4yp9wY/isHGLIlMpimnRy0yrf/zIx2fQgkWMbpnicHUEg37Qe5y8gsVMSzZULBJaYjQG7ke6ECgD5sh/M5iHWHI2u9zB79AjaiYRRgt5JsCcL9f1PSfWRuzyEe8XLbpiJG60Q158m3tiRtb/gvS1k8g35ChqdmXAd1rbJ1Yiq5D1hc5dtdhOLEbu3VhBDz32ys6eERaUUxXzPdrmw2HouF5xXJS1BSsxO09wU6hyEXmIZudf1neJB6ifipa5qw/YmoGiG9Cdn1Q1ZvhDsT6JD8bv58Hc6TLkSRO1AdxxneqhFZnw9o2Nggf+LwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAGn1SyJ3j9r8eupMrTNTlG12b+JNrs/ocHeAupdboVTDrafNSbI6LDs7yvJ7eMuBquqVCZEgTlWZglIzAmvyHTURULVwMn4ffuD0YddyWhQSm2Bg9TZ+roitM+plB8e1f/bBsY4MXMSG42t80+DQkQ2x1Hfa0JxFMP2RUh8V+yj/MF+SN6oHlJRHpcJ0q+xwgRkeYfqYeaq+wzbHv7Myq/d4eNpSqTZK35kQoLV39Tnd59rGAoVOss+ktfZHss18tuUPpx7VjQEhPtYvt7DmU2PPaLrqXB032P6e/A5w15OlGj4nw+P4H+D1lSlCM8/CT2Y7wgGDN1p9N1u6gxBwiJI=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-","request_id":"c4e89464dcc54b8b8d78fb2ee3480068"}, [
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
  'cc119b9b-9ba0-459a-83ca-0d2e2778f585',
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
  'Thu, 25 Jun 2020 12:54:34 GMT',
  'Content-Length',
  '1309'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","x5t":"9yV9ucGmCB5F35BbcUi29fXtEBs","cer":"MIIDKDCCAhCgAwIBAgIQFrIGYydfR9qUFCH9fSI3MTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDMyWhcNMjEwNjI1MTI1NDMyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDoRHZZmuC926OjF3UKDyxUwMOIK4rjKn3Bj+KwcYsiUymKadHLTKt//MjHZ9CCRYxumeJwdQSDftB7nLyCxUxLNlQsElpiNAbuR7oQKAPmyH8zmIdYcja73MHv0CNqJhFGC3kmwJwv1/U9J9ZG7PIR7xctumIkbrRDXnybe2JG1v+C9LWTyDfkKGp2ZcB3WtsnViKrkPWFzl212E4sRu7dWEEPPfbKzp4RFpRTFfM92ubDYei4XnFclLUFKzE7T3BTqHIReYhm51/Wd4kHqJ+KlrmrD9iagaIb0J2fVDVm+EOxPokPxu/nwdzpMuRJE7UB3HGd6qEVmfD2jY2CB/4vAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREloKN0Xv+RyrWGcDOybDADpA96jAdBgNVHQ4EFgQURJaCjdF7/kcq1hnAzsmwwA6QPeowDQYJKoZIhvcNAQELBQADggEBADE2zRoSCnDkX5OoBmw5yx7KBo9vtAfYRSy6D8AfeSvr1wB5ntKxZfMv3QlKpPYreTk7lOMxD2/VmMlctIusU6wg8VpqSW9uUh41kjBvsXQAeDo3cudx6XeV7W+h1I6fCRWGA+QAhH/Pyw6zlUfP085FxjiO0WdxJ0o4LjIuCQlbwTZ3Mkh6v3J7IuuKtGxmgxFRlK3DtNttxPu22+EzzqPKZ7bhfxZOlJhjSj0y93mrgxEHv4NJsNbDqLkYGcDBPdq1zeQ7GQTPIEaSFxwuNplyPogEtua5mhhVkixzhSYqDXyqBkvbpiEQIvKveGSJguil0Q9v4PCLGOCR9Sw++ss=","attributes":{"enabled":true,"nbf":1593089072,"exp":1624625672,"created":1593089672,"updated":1593089672,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089660,"updated":1593089660}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'cf155b8e-debe-4873-9d7f-702cafee722f',
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
  'Thu, 25 Jun 2020 12:54:34 GMT',
  'Content-Length',
  '2595'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae', {"attributes":{"enabled":false}})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","x5t":"9yV9ucGmCB5F35BbcUi29fXtEBs","cer":"MIIDKDCCAhCgAwIBAgIQFrIGYydfR9qUFCH9fSI3MTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDMyWhcNMjEwNjI1MTI1NDMyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDoRHZZmuC926OjF3UKDyxUwMOIK4rjKn3Bj+KwcYsiUymKadHLTKt//MjHZ9CCRYxumeJwdQSDftB7nLyCxUxLNlQsElpiNAbuR7oQKAPmyH8zmIdYcja73MHv0CNqJhFGC3kmwJwv1/U9J9ZG7PIR7xctumIkbrRDXnybe2JG1v+C9LWTyDfkKGp2ZcB3WtsnViKrkPWFzl212E4sRu7dWEEPPfbKzp4RFpRTFfM92ubDYei4XnFclLUFKzE7T3BTqHIReYhm51/Wd4kHqJ+KlrmrD9iagaIb0J2fVDVm+EOxPokPxu/nwdzpMuRJE7UB3HGd6qEVmfD2jY2CB/4vAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREloKN0Xv+RyrWGcDOybDADpA96jAdBgNVHQ4EFgQURJaCjdF7/kcq1hnAzsmwwA6QPeowDQYJKoZIhvcNAQELBQADggEBADE2zRoSCnDkX5OoBmw5yx7KBo9vtAfYRSy6D8AfeSvr1wB5ntKxZfMv3QlKpPYreTk7lOMxD2/VmMlctIusU6wg8VpqSW9uUh41kjBvsXQAeDo3cudx6XeV7W+h1I6fCRWGA+QAhH/Pyw6zlUfP085FxjiO0WdxJ0o4LjIuCQlbwTZ3Mkh6v3J7IuuKtGxmgxFRlK3DtNttxPu22+EzzqPKZ7bhfxZOlJhjSj0y93mrgxEHv4NJsNbDqLkYGcDBPdq1zeQ7GQTPIEaSFxwuNplyPogEtua5mhhVkixzhSYqDXyqBkvbpiEQIvKveGSJguil0Q9v4PCLGOCR9Sw++ss=","attributes":{"enabled":false,"nbf":1593089072,"exp":1624625672,"created":1593089672,"updated":1593089675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'a8ae54e5-3ac0-4ba4-8c09-bea151059e6b',
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
  'Thu, 25 Jun 2020 12:54:35 GMT',
  'Content-Length',
  '1922'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","x5t":"9yV9ucGmCB5F35BbcUi29fXtEBs","cer":"MIIDKDCCAhCgAwIBAgIQFrIGYydfR9qUFCH9fSI3MTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDMyWhcNMjEwNjI1MTI1NDMyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDoRHZZmuC926OjF3UKDyxUwMOIK4rjKn3Bj+KwcYsiUymKadHLTKt//MjHZ9CCRYxumeJwdQSDftB7nLyCxUxLNlQsElpiNAbuR7oQKAPmyH8zmIdYcja73MHv0CNqJhFGC3kmwJwv1/U9J9ZG7PIR7xctumIkbrRDXnybe2JG1v+C9LWTyDfkKGp2ZcB3WtsnViKrkPWFzl212E4sRu7dWEEPPfbKzp4RFpRTFfM92ubDYei4XnFclLUFKzE7T3BTqHIReYhm51/Wd4kHqJ+KlrmrD9iagaIb0J2fVDVm+EOxPokPxu/nwdzpMuRJE7UB3HGd6qEVmfD2jY2CB/4vAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREloKN0Xv+RyrWGcDOybDADpA96jAdBgNVHQ4EFgQURJaCjdF7/kcq1hnAzsmwwA6QPeowDQYJKoZIhvcNAQELBQADggEBADE2zRoSCnDkX5OoBmw5yx7KBo9vtAfYRSy6D8AfeSvr1wB5ntKxZfMv3QlKpPYreTk7lOMxD2/VmMlctIusU6wg8VpqSW9uUh41kjBvsXQAeDo3cudx6XeV7W+h1I6fCRWGA+QAhH/Pyw6zlUfP085FxjiO0WdxJ0o4LjIuCQlbwTZ3Mkh6v3J7IuuKtGxmgxFRlK3DtNttxPu22+EzzqPKZ7bhfxZOlJhjSj0y93mrgxEHv4NJsNbDqLkYGcDBPdq1zeQ7GQTPIEaSFxwuNplyPogEtua5mhhVkixzhSYqDXyqBkvbpiEQIvKveGSJguil0Q9v4PCLGOCR9Sw++ss=","attributes":{"enabled":false,"nbf":1593089072,"exp":1624625672,"created":1593089672,"updated":1593089675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
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
  'e96b5aad-6a33-4106-ab06-400418c6ba50',
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
  'Thu, 25 Jun 2020 12:54:35 GMT',
  'Content-Length',
  '1773'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1593089675,"scheduledPurgeDate":1600865675,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","x5t":"9yV9ucGmCB5F35BbcUi29fXtEBs","cer":"MIIDKDCCAhCgAwIBAgIQFrIGYydfR9qUFCH9fSI3MTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDMyWhcNMjEwNjI1MTI1NDMyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDoRHZZmuC926OjF3UKDyxUwMOIK4rjKn3Bj+KwcYsiUymKadHLTKt//MjHZ9CCRYxumeJwdQSDftB7nLyCxUxLNlQsElpiNAbuR7oQKAPmyH8zmIdYcja73MHv0CNqJhFGC3kmwJwv1/U9J9ZG7PIR7xctumIkbrRDXnybe2JG1v+C9LWTyDfkKGp2ZcB3WtsnViKrkPWFzl212E4sRu7dWEEPPfbKzp4RFpRTFfM92ubDYei4XnFclLUFKzE7T3BTqHIReYhm51/Wd4kHqJ+KlrmrD9iagaIb0J2fVDVm+EOxPokPxu/nwdzpMuRJE7UB3HGd6qEVmfD2jY2CB/4vAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREloKN0Xv+RyrWGcDOybDADpA96jAdBgNVHQ4EFgQURJaCjdF7/kcq1hnAzsmwwA6QPeowDQYJKoZIhvcNAQELBQADggEBADE2zRoSCnDkX5OoBmw5yx7KBo9vtAfYRSy6D8AfeSvr1wB5ntKxZfMv3QlKpPYreTk7lOMxD2/VmMlctIusU6wg8VpqSW9uUh41kjBvsXQAeDo3cudx6XeV7W+h1I6fCRWGA+QAhH/Pyw6zlUfP085FxjiO0WdxJ0o4LjIuCQlbwTZ3Mkh6v3J7IuuKtGxmgxFRlK3DtNttxPu22+EzzqPKZ7bhfxZOlJhjSj0y93mrgxEHv4NJsNbDqLkYGcDBPdq1zeQ7GQTPIEaSFxwuNplyPogEtua5mhhVkixzhSYqDXyqBkvbpiEQIvKveGSJguil0Q9v4PCLGOCR9Sw++ss=","attributes":{"enabled":false,"nbf":1593089072,"exp":1624625672,"created":1593089672,"updated":1593089675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089660,"updated":1593089660}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'b5a4c32a-51bb-4057-9bed-a8a642ec254e',
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
  'Thu, 25 Jun 2020 12:54:35 GMT',
  'Content-Length',
  '2797'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9d32bf9f-3137-4237-b482-91a465617468',
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
  'Thu, 25 Jun 2020 12:54:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '363d3456-668d-4abc-8412-8da64b8612cd',
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
  'Thu, 25 Jun 2020 12:54:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '953e0e86-15ce-4058-a981-9b5ff250f58a',
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
  'Thu, 25 Jun 2020 12:54:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '23a1bb5b-d171-40f5-a347-1701102b7422',
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
  'Thu, 25 Jun 2020 12:54:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '747e12a4-2895-464f-9890-6473f3a4942e',
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
  'Thu, 25 Jun 2020 12:54:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4d7a79df-1ad1-42a0-a1c0-e4cc082728d9',
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
  'Thu, 25 Jun 2020 12:54:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a88d52fb-c0b6-45b8-9938-6b96f0d003db',
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
  'Thu, 25 Jun 2020 12:54:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-candisableacertificateversion-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e87a8ae2-618c-4303-8748-e77cf3cc6f3e',
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
  'Thu, 25 Jun 2020 12:54:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-candisableacertificateversion-","deletedDate":1593089675,"scheduledPurgeDate":1600865675,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","kid":"https://keyvault_name.vault.azure.net/keys/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","sid":"https://keyvault_name.vault.azure.net/secrets/CRUDCertificateName-candisableacertificateversion-/14f13b8b07784e3889356be03ce81bae","x5t":"9yV9ucGmCB5F35BbcUi29fXtEBs","cer":"MIIDKDCCAhCgAwIBAgIQFrIGYydfR9qUFCH9fSI3MTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNjI1MTI0NDMyWhcNMjEwNjI1MTI1NDMyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDoRHZZmuC926OjF3UKDyxUwMOIK4rjKn3Bj+KwcYsiUymKadHLTKt//MjHZ9CCRYxumeJwdQSDftB7nLyCxUxLNlQsElpiNAbuR7oQKAPmyH8zmIdYcja73MHv0CNqJhFGC3kmwJwv1/U9J9ZG7PIR7xctumIkbrRDXnybe2JG1v+C9LWTyDfkKGp2ZcB3WtsnViKrkPWFzl212E4sRu7dWEEPPfbKzp4RFpRTFfM92ubDYei4XnFclLUFKzE7T3BTqHIReYhm51/Wd4kHqJ+KlrmrD9iagaIb0J2fVDVm+EOxPokPxu/nwdzpMuRJE7UB3HGd6qEVmfD2jY2CB/4vAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBREloKN0Xv+RyrWGcDOybDADpA96jAdBgNVHQ4EFgQURJaCjdF7/kcq1hnAzsmwwA6QPeowDQYJKoZIhvcNAQELBQADggEBADE2zRoSCnDkX5OoBmw5yx7KBo9vtAfYRSy6D8AfeSvr1wB5ntKxZfMv3QlKpPYreTk7lOMxD2/VmMlctIusU6wg8VpqSW9uUh41kjBvsXQAeDo3cudx6XeV7W+h1I6fCRWGA+QAhH/Pyw6zlUfP085FxjiO0WdxJ0o4LjIuCQlbwTZ3Mkh6v3J7IuuKtGxmgxFRlK3DtNttxPu22+EzzqPKZ7bhfxZOlJhjSj0y93mrgxEHv4NJsNbDqLkYGcDBPdq1zeQ7GQTPIEaSFxwuNplyPogEtua5mhhVkixzhSYqDXyqBkvbpiEQIvKveGSJguil0Q9v4PCLGOCR9Sw++ss=","attributes":{"enabled":false,"nbf":1593089072,"exp":1624625672,"created":1593089672,"updated":1593089675,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089660,"updated":1593089660}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-candisableacertificateversion-/pending"}}, [
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
  'e6f1c167-a542-4273-a543-90c84338ab71',
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
  'Thu, 25 Jun 2020 12:54:49 GMT',
  'Content-Length',
  '2797'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-candisableacertificateversion-')
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
  '18f01559-9b38-47a7-832b-b05a84dfd886',
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
  'Thu, 25 Jun 2020 12:54:49 GMT'
]);
