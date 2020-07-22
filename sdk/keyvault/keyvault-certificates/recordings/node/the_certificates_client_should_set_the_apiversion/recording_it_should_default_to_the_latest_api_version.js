let nock = require('nock');

module.exports.hash = "6e55f87aba7124f5102d2664f5fb6a9e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/create')
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
  'f6485797-3546-4349-af24-af7bbe2bb622',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:15 GMT'
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
  '474e7872-dca0-492a-ac9d-7deab2f42600',
  'x-ms-ests-server',
  '2.1.10877.6 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuSZQkV8mTpJpjXDzxSuS_I_aSJHAQAAADeEqtYOAAAA; expires=Fri, 21-Aug-2020 19:02:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Wed, 22 Jul 2020 19:02:15 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0GokdiEd4iaRuUWlL93B+fnPxN1lbu75hV4XZzOqObXRnJW6CKO8bxbOAkMEghu1Mt4DCmrmI4wnfDVdEF5HSjpZL01BAMl+MtGfTPW5VWJ/PpMosHdggQqCkFL0Vxgt8V7Wt/Dxljhsp0j+L4vRqVjwcXEM5o3J2x6ickBi4kYEHp1QhqIk8fB0AGGk1VCB1ME4UYSKXS1vwGFPOJ0r7HAQNFRgFuyjTjieEcOD1SoEu9xZiLnrwyNf8+zfmrWD3yc4qAfH0NSeVKScZsrYd9fDslXrbcjHpSjEb5lRE8WMC1vOWQnlk0bq98YiWgL/CBa3KBLoH+aYH1EjgoDLKQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAL7ay54Wq4AaIuD9eKmoAI5M9sYbqTk8sgXgtSw5Ae/bybAnUliZd3y66ZwL14nkTI4S6IxP0On2WhsIkUsFXJcHr2K0T5yklAbgY5zQK/hdjM88GXqXEgTBUMKmLT3YftlkclYqMj/i465jiXSVxNzYRggHGA9fV9+VUDHHG6E+SymVh1OC2Wpz4P1GNCuPV3wEilmQPtmQ2S5tP+2u+gFmkx/qhQQweOn6AEAWxiUMftGp8Evg0hZOUNHvTkuLqYWDIwtlgOJukRpmVR1RuLq+kCJLNA4WY+eaRUAEv+cC1L3Fy7n6ustb0nicfH82WLI9GC0Gh7HEtKyEz0JHfpA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8db9f6ea5c134648ace64ad1f805069f"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending?api-version=7.1-preview&request_id=8db9f6ea5c134648ace64ad1f805069f',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9dd5c769-05ea-491d-b825-1691572393b0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:16 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0GokdiEd4iaRuUWlL93B+fnPxN1lbu75hV4XZzOqObXRnJW6CKO8bxbOAkMEghu1Mt4DCmrmI4wnfDVdEF5HSjpZL01BAMl+MtGfTPW5VWJ/PpMosHdggQqCkFL0Vxgt8V7Wt/Dxljhsp0j+L4vRqVjwcXEM5o3J2x6ickBi4kYEHp1QhqIk8fB0AGGk1VCB1ME4UYSKXS1vwGFPOJ0r7HAQNFRgFuyjTjieEcOD1SoEu9xZiLnrwyNf8+zfmrWD3yc4qAfH0NSeVKScZsrYd9fDslXrbcjHpSjEb5lRE8WMC1vOWQnlk0bq98YiWgL/CBa3KBLoH+aYH1EjgoDLKQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAL7ay54Wq4AaIuD9eKmoAI5M9sYbqTk8sgXgtSw5Ae/bybAnUliZd3y66ZwL14nkTI4S6IxP0On2WhsIkUsFXJcHr2K0T5yklAbgY5zQK/hdjM88GXqXEgTBUMKmLT3YftlkclYqMj/i465jiXSVxNzYRggHGA9fV9+VUDHHG6E+SymVh1OC2Wpz4P1GNCuPV3wEilmQPtmQ2S5tP+2u+gFmkx/qhQQweOn6AEAWxiUMftGp8Evg0hZOUNHvTkuLqYWDIwtlgOJukRpmVR1RuLq+kCJLNA4WY+eaRUAEv+cC1L3Fy7n6ustb0nicfH82WLI9GC0Gh7HEtKyEz0JHfpA=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"8db9f6ea5c134648ace64ad1f805069f"}, [
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
  '0fbe9efe-e18b-4cc8-b127-c2dff07695bf',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:16 GMT',
  'Content-Length',
  '1348'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined","deletedDate":1595444536,"scheduledPurgeDate":1603220536,"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","kid":"https://keyvault_name.vault.azure.net/keys/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","sid":"https://keyvault_name.vault.azure.net/secrets/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","x5t":"fFRAJnQYyVuH20C2GFsTAiEnY_g","cer":"MIIDKDCCAhCgAwIBAgIQFC/eKwU8RkWz/oFtkRcGGjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzIyMTg1MTA0WhcNMjEwNzIyMTkwMTA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC2c+6xF/vggHrToGk9peqgYUU4UfUiH0TDk/DotrBjVLg+JkzJR6a8l59iOMjXJsORQmugW7037CSvbWWkhBPWNwpU6VWq/DBxz7rLCeTpuzerQqz2zYtGm0MlIZaeFAqZpffIa+HW++Ix71T8LE8S5x5qtP61TRFkg/TRER5TrTShtssUJgZ1BO2SS46AZ9wlXXp6oDb7f89nJ5E7VYzGFj2FqsbsGbfVZZy2dygtj3Wkh7+w0drwYKA2w05VcSoBJ5ZIqYhiBRHXyDEXTpzV2urFE/S081HECNTeNrUXe49SOjm/P/h60ZilInBiEjapE0yO6Wz6I8nd4IG5Dw4rAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ72aLrGspGIUn8ssLBIEPMMTA44DAdBgNVHQ4EFgQUO9mi6xrKRiFJ/LLCwSBDzDEwOOAwDQYJKoZIhvcNAQELBQADggEBALOHKA9GJFN6q9ZcK8JJ6zNfoj2WLg+a5TvAhEnMxJeT8MzT5DVTJgMXF3/mP1cpASAR44XYW+ZSM3KaKm6ekuiRmEWQR3bJ7Rev6cwMR6h/MS5pt9y9mmprQSs3c8/bmYkwB/fQGGNXCr3pBE4sYr6YQH5ohqm9mUuuLkvSO4eztdLDtJn99gymTf8Qz05fCd+JmZ7YVsF6e9e+G5TGdTNR38cvPVvXzfLAsbEs5FDKTuLzQhk8i+TDzGZi92G+R7OWpUK8pEbJwq8eqz9Uqb1SbNhVn8uucGGQEpjBdT5jhQRfHB+gda3cLDMjUYXri/622ovTN/tMzgm2KELEQSk=","attributes":{"enabled":true,"nbf":1595443864,"exp":1626980464,"created":1595444464,"updated":1595444464,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1595444456,"updated":1595444536}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending"}}, [
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
  '80b33f07-15cf-4520-95f7-139c7386c09f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:16 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '8b334a3b-afb8-4200-ae40-16bbc16891aa',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '31976646-e3b7-49db-a020-685b608cb023',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3407aaa4-08e0-4cab-b5a1-2e359cff0b02',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9a0916c4-910e-462e-abda-a9b9103e728d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:20 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c6f7af8e-e320-458d-9a1d-20f83127891d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:22 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '111ff6a0-31ff-419b-8cc9-fd854eb051cb',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e3ccb5a3-666c-4f6e-b1f1-3385ef1789a8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2bbb6986-d6c1-4d23-bb99-2218ac64aa44',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ca9ef415-3cfb-4d57-9e23-4da32549c1d7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7d453979-82f7-430b-9445-52068c96546a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:32 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9ab8d949-ee0b-4124-b1c9-0d56da61e3fd',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '650109a0-6e77-4808-9ba9-ea929a0a9594',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '032af1ec-966d-460d-a733-f5b60a08d51c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e2678872-ad7b-4066-826b-07d4f55ea759',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '156',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'baf393a1-ab68-4e9a-afd1-4910eb21fe01',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined","deletedDate":1595444536,"scheduledPurgeDate":1603220536,"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","kid":"https://keyvault_name.vault.azure.net/keys/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","sid":"https://keyvault_name.vault.azure.net/secrets/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/2f27bd9812cc45d199e4d09ed8f7545b","x5t":"fFRAJnQYyVuH20C2GFsTAiEnY_g","cer":"MIIDKDCCAhCgAwIBAgIQFC/eKwU8RkWz/oFtkRcGGjANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzIyMTg1MTA0WhcNMjEwNzIyMTkwMTA0WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC2c+6xF/vggHrToGk9peqgYUU4UfUiH0TDk/DotrBjVLg+JkzJR6a8l59iOMjXJsORQmugW7037CSvbWWkhBPWNwpU6VWq/DBxz7rLCeTpuzerQqz2zYtGm0MlIZaeFAqZpffIa+HW++Ix71T8LE8S5x5qtP61TRFkg/TRER5TrTShtssUJgZ1BO2SS46AZ9wlXXp6oDb7f89nJ5E7VYzGFj2FqsbsGbfVZZy2dygtj3Wkh7+w0drwYKA2w05VcSoBJ5ZIqYhiBRHXyDEXTpzV2urFE/S081HECNTeNrUXe49SOjm/P/h60ZilInBiEjapE0yO6Wz6I8nd4IG5Dw4rAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ72aLrGspGIUn8ssLBIEPMMTA44DAdBgNVHQ4EFgQUO9mi6xrKRiFJ/LLCwSBDzDEwOOAwDQYJKoZIhvcNAQELBQADggEBALOHKA9GJFN6q9ZcK8JJ6zNfoj2WLg+a5TvAhEnMxJeT8MzT5DVTJgMXF3/mP1cpASAR44XYW+ZSM3KaKm6ekuiRmEWQR3bJ7Rev6cwMR6h/MS5pt9y9mmprQSs3c8/bmYkwB/fQGGNXCr3pBE4sYr6YQH5ohqm9mUuuLkvSO4eztdLDtJn99gymTf8Qz05fCd+JmZ7YVsF6e9e+G5TGdTNR38cvPVvXzfLAsbEs5FDKTuLzQhk8i+TDzGZi92G+R7OWpUK8pEbJwq8eqz9Uqb1SbNhVn8uucGGQEpjBdT5jhQRfHB+gda3cLDMjUYXri/622ovTN/tMzgm2KELEQSk=","attributes":{"enabled":true,"nbf":1595443864,"exp":1626980464,"created":1595444464,"updated":1595444464,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1595444456,"updated":1595444536}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined/pending"}}, [
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
  '26722634-77b2-432b-b0c9-7e4c6307ff67',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:44 GMT',
  'Content-Length',
  '2838'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/apiVersionCertificateName-itshoulddefaulttothelatestAPIversion-undefined')
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
  '469f9355-550f-475c-8825-94b5aa86cb9c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.148.129.61;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 22 Jul 2020 19:02:44 GMT'
]);
