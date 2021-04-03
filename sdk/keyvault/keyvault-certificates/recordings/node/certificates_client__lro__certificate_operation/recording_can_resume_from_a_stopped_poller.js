let nock = require('nock');

module.exports.hash = "903781a6afbfb5fa87e40e4f90b5500e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create')
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
  'x-ms-request-id',
  '248fbda9-1af1-4fdf-ab9c-e1bc949c6b82',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:05 GMT'
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
  '273c2a7d-8391-44f8-9729-1dee2421f100',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:05:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:05:05 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=3bad85f8bd43410cac29206284937af0',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'adeac49d-9751-46cc-a98c-771cdb9ae120',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:06 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  '8ef7ebe3-063a-461b-9a26-46c8efd47097',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:06 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/d691c9c745414bdd9c573cfb8d23f9cb","attributes":{"enabled":false,"nbf":1613501706,"exp":1645038306,"created":1613502306,"updated":1613502306,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502306,"updated":1613502306}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'x-ms-request-id',
  'ef401a81-8140-4b4d-806f-1fcf50719272',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:07 GMT',
  'Content-Length',
  '1157'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  '68ae88c4-0d78-4079-b951-295040e6d0cf',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:06 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  '2ab1dc10-e17c-45f2-a3c2-8dd6cd7329c7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:07 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  '45514589-8b62-470a-9b85-18905134c3f4',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:06 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  'a9961612-7260-4d99-8d99-e1b1b185b5c7',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:09 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  'bc88179e-9730-49a7-8d22-d79dea88bae8',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:10 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  'fa65173f-8323-4012-871c-df42ec7ba518',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:13 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'westus2',
  'x-ms-request-id',
  'd42983ba-17fd-4d21-91a8-57378c615772',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:15 GMT',
  'Content-Length',
  '1339'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5+UDGnk1l/WgFDDYNaqNjdSE5cQbvAbbXZ3EAgbGJ6Ga7A8Jt5I14Jn1e1rNfi60wI+R2zczUS8GOuOCzZygnkO3UOELXz0c4o57eU2lA/ejWbNdD3Pv/dl7Qk5yWA9b3kENcMhGh27xRLftGnNs4CbDZ2hTQzpQWzER+vmZ1yLTGqsNCEywam8ew1C1Np7xsNPVdrjXBele8HmrFBHAbd/A1RZlWEfEZhxny/PlaNhacR3bC0PAG714jrbqunR2zp4+TDwax6APjhVX4Bo/u3d6BXCsTTDr42iHo07G+/PcfwJWNIVSruJH7vsmml8ydeoykcNnVVMjUztE/HAL5QIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAFpd4DdvQGk/R3UkxjNg/rZXkMjm0rL8KjWEaC1K4rxzc4zZA2doSrOV6l9j6Th0fK59h1L7ApQ/HO5NE3sLTotVXoDhaKWZaqxEyTAafrtevgtcdEYrEQP038q0rDrJnYGJ+DoOoja60835/U+ODzj6FoIGsGHbbhs4+KekdaY0dxwJANBL8sHbrle9G5Kr+dSxgUUWMedeIpwSQfrTfBmpF1Wv6mXZecrk0ZcWBs9Xc00sxIlyPzHDIQchkRmMSIls6jdUoDB3PJlZ3159lo5A15O6yJhgesa3N3OQ6TqXkkOayl9KJTYqcOYYH6+U3E1zXjzjMwloPe95VVAFUvk=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-","request_id":"3bad85f8bd43410cac29206284937af0"}, [
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
  'x-ms-request-id',
  'f5b4f72a-b4cc-4cfc-93e1-a0096bb53dce',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:17 GMT',
  'Content-Length',
  '1305'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","x5t":"ZQqhV8wPBXUq7glTXmwgf0zcjH8","cer":"MIIDKDCCAhCgAwIBAgIQPLQW7WqNQRKi4x9jfJyYiTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTE2WhcNMjIwMjE2MTkwNTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn5QMaeTWX9aAUMNg1qo2N1ITlxBu8BttdncQCBsYnoZrsDwm3kjXgmfV7Ws1+LrTAj5HbNzNRLwY644LNnKCeQ7dQ4QtfPRzijnt5TaUD96NZs10Pc+/92XtCTnJYD1veQQ1wyEaHbvFEt+0ac2zgJsNnaFNDOlBbMRH6+ZnXItMaqw0ITLBqbx7DULU2nvGw09V2uNcF6V7weasUEcBt38DVFmVYR8RmHGfL8+Vo2FpxHdsLQ8AbvXiOtuq6dHbOnj5MPBrHoA+OFVfgGj+7d3oFcKxNMOvjaIejTsb789x/AlY0hVKu4kfu+yaaXzJ16jKRw2dVUyNTO0T8cAvlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ4OkIpMlTRhvS+asMvfQrxRkDnpTAdBgNVHQ4EFgQUODpCKTJU0Yb0vmrDL30K8UZA56UwDQYJKoZIhvcNAQELBQADggEBAM0bTcYuCwzj8ggd+fC+SFMT3+z/SFVrsKrqqAz/NWHbmQuWX9k51PEaHiRcaKx4DDngUZeM1Ph3s+e2xQOM5g9VHIExhPW3AvIH/OVmrIuLAhUs3kNzYusTM82B3+BxwRzn5/b62bFjCAyzluP9gHvGO0Og+Ot+Q5RdpxxuNtUx6FuRDzHzhJprGnVwD7fpTDihul4pXqDCrg8njOOqrlWkykHaOGUthY4lg4oknj4PsEyeacTXlLAcocgRDntGvhYxVcE9ss1W+k+jjB2a9Z9YN+xDqLf2O6ZdjBifKUbKFCcrtJQZmIqc+OD2j8To8jG+ViyBLD16M9iJmrJ5BZA=","attributes":{"enabled":true,"nbf":1613501716,"exp":1645038316,"created":1613502316,"updated":1613502316,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502306,"updated":1613502306}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'x-ms-request-id',
  'f6ff9ade-6fb2-4c02-a6bf-8eec3d714ee0',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:17 GMT',
  'Content-Length',
  '2594'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1613502317,"scheduledPurgeDate":1614107117,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","x5t":"ZQqhV8wPBXUq7glTXmwgf0zcjH8","cer":"MIIDKDCCAhCgAwIBAgIQPLQW7WqNQRKi4x9jfJyYiTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTE2WhcNMjIwMjE2MTkwNTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn5QMaeTWX9aAUMNg1qo2N1ITlxBu8BttdncQCBsYnoZrsDwm3kjXgmfV7Ws1+LrTAj5HbNzNRLwY644LNnKCeQ7dQ4QtfPRzijnt5TaUD96NZs10Pc+/92XtCTnJYD1veQQ1wyEaHbvFEt+0ac2zgJsNnaFNDOlBbMRH6+ZnXItMaqw0ITLBqbx7DULU2nvGw09V2uNcF6V7weasUEcBt38DVFmVYR8RmHGfL8+Vo2FpxHdsLQ8AbvXiOtuq6dHbOnj5MPBrHoA+OFVfgGj+7d3oFcKxNMOvjaIejTsb789x/AlY0hVKu4kfu+yaaXzJ16jKRw2dVUyNTO0T8cAvlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ4OkIpMlTRhvS+asMvfQrxRkDnpTAdBgNVHQ4EFgQUODpCKTJU0Yb0vmrDL30K8UZA56UwDQYJKoZIhvcNAQELBQADggEBAM0bTcYuCwzj8ggd+fC+SFMT3+z/SFVrsKrqqAz/NWHbmQuWX9k51PEaHiRcaKx4DDngUZeM1Ph3s+e2xQOM5g9VHIExhPW3AvIH/OVmrIuLAhUs3kNzYusTM82B3+BxwRzn5/b62bFjCAyzluP9gHvGO0Og+Ot+Q5RdpxxuNtUx6FuRDzHzhJprGnVwD7fpTDihul4pXqDCrg8njOOqrlWkykHaOGUthY4lg4oknj4PsEyeacTXlLAcocgRDntGvhYxVcE9ss1W+k+jjB2a9Z9YN+xDqLf2O6ZdjBifKUbKFCcrtJQZmIqc+OD2j8To8jG+ViyBLD16M9iJmrJ5BZA=","attributes":{"enabled":true,"nbf":1613501716,"exp":1645038316,"created":1613502316,"updated":1613502316,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502306,"updated":1613502306}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'x-ms-request-id',
  '4f4046f3-9d75-4a77-8d57-b4b4a55f660a',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:17 GMT',
  'Content-Length',
  '2793'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  'a7c428b0-422e-4d60-99f8-c7a0de88f731',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  'dc73de00-024a-4463-95d1-3415dcdb739e',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '797a5ed0-9eb9-432a-a945-b7d7d4df41e3',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  'cd8f98eb-e699-428a-b861-5728d7df73ba',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  'c17068db-4d33-46dd-ad9f-68941728b42d',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroOperationCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '435e8c20-41c5-4ab4-a73b-4f75ab72485b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-","deletedDate":1613502317,"scheduledPurgeDate":1614107117,"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","kid":"https://keyvault_name.vault.azure.net/keys/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","sid":"https://keyvault_name.vault.azure.net/secrets/lroOperationCertificateName-canresumefromastoppedpoller-/e4dfba8cae7f4f2e93bb98158c721610","x5t":"ZQqhV8wPBXUq7glTXmwgf0zcjH8","cer":"MIIDKDCCAhCgAwIBAgIQPLQW7WqNQRKi4x9jfJyYiTANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTE2WhcNMjIwMjE2MTkwNTE2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDn5QMaeTWX9aAUMNg1qo2N1ITlxBu8BttdncQCBsYnoZrsDwm3kjXgmfV7Ws1+LrTAj5HbNzNRLwY644LNnKCeQ7dQ4QtfPRzijnt5TaUD96NZs10Pc+/92XtCTnJYD1veQQ1wyEaHbvFEt+0ac2zgJsNnaFNDOlBbMRH6+ZnXItMaqw0ITLBqbx7DULU2nvGw09V2uNcF6V7weasUEcBt38DVFmVYR8RmHGfL8+Vo2FpxHdsLQ8AbvXiOtuq6dHbOnj5MPBrHoA+OFVfgGj+7d3oFcKxNMOvjaIejTsb789x/AlY0hVKu4kfu+yaaXzJ16jKRw2dVUyNTO0T8cAvlAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBQ4OkIpMlTRhvS+asMvfQrxRkDnpTAdBgNVHQ4EFgQUODpCKTJU0Yb0vmrDL30K8UZA56UwDQYJKoZIhvcNAQELBQADggEBAM0bTcYuCwzj8ggd+fC+SFMT3+z/SFVrsKrqqAz/NWHbmQuWX9k51PEaHiRcaKx4DDngUZeM1Ph3s+e2xQOM5g9VHIExhPW3AvIH/OVmrIuLAhUs3kNzYusTM82B3+BxwRzn5/b62bFjCAyzluP9gHvGO0Og+Ot+Q5RdpxxuNtUx6FuRDzHzhJprGnVwD7fpTDihul4pXqDCrg8njOOqrlWkykHaOGUthY4lg4oknj4PsEyeacTXlLAcocgRDntGvhYxVcE9ss1W+k+jjB2a9Z9YN+xDqLf2O6ZdjBifKUbKFCcrtJQZmIqc+OD2j8To8jG+ViyBLD16M9iJmrJ5BZA=","attributes":{"enabled":true,"nbf":1613501716,"exp":1645038316,"created":1613502316,"updated":1613502316,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502306,"updated":1613502306}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroOperationCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'x-ms-request-id',
  'a6eaa57b-1773-44dd-9428-9629a8a3354b',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:27 GMT',
  'Content-Length',
  '2793'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroOperationCertificateName-canresumefromastoppedpoller-')
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
  'x-ms-request-id',
  '78d598c1-a269-40e6-856b-f65864ce0963',
  'x-ms-keyvault-service-version',
  '1.2.164.2',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 16 Feb 2021 19:05:28 GMT'
]);
