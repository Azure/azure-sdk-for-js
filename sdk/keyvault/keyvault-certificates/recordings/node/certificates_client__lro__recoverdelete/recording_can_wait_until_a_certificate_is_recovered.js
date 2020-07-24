let nock = require('nock');

module.exports.hash = "a95d32953929325ae83ba9eb5295fafb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/create')
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
  '4179e3d9-afc6-4518-81be-7f74794104ed',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:37 GMT'
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
  '0660b436-cb35-41aa-baaf-b2c1c7154e00',
  'x-ms-ests-server',
  '2.1.10761.15 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AsHV6lnJTS9MjKoVw28vwgA_aSJHAQAAANohkNYOAAAA; expires=Sat, 01-Aug-2020 18:43:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 02 Jul 2020 18:43:38 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending?api-version=7.1-preview&request_id=9475caf0718e4697a3c601d57d102ea6',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7febaafd-66b5-4a04-bb31-c4bb8d19e415',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:39 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '9d662745-9351-4e50-a178-92aa3515b68b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:39 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '89b32f87-ef24-40c0-91c5-5dcd8146b3ce',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:39 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '54af0d81-4e1d-4f79-99d6-c3b35140067a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:41 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  'ca4318d4-9997-4b42-85ca-f9a27887bd66',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:43 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '2fe35844-95df-46d5-98c3-c8aa74eacaad',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:46 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '9af2d680-877f-41a5-9510-1733edb61a34',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:48 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  'cd724179-baa0-4921-a27a-9acf2551ee72',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:49 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  'cd4876e1-2ca3-4ba5-85d6-0102cec67826',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:51 GMT',
  'Content-Length',
  '1355'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlF8y7TOZKaNItX0BFdMffcWa+vTYqaEfg9FKNrkxVsIoUtzfWpKGSKfXjNAFkjYUK50putGu6NPH7rTyjzYE33iENPdzWcdYzZCq9irGeQkC5syr9WK/31yDg4t10jbTWUdtlFys+XwZOF/FzIGVKsm0+h1cl6505wzDOIyOTIOGmIElpieYaztg9dVBS9HSL6BA+bZkjbTIGTMZrMQXt0GSR2CR8d+RnT0mOHM4b8HV8uwb5hskVCovYPU6uLewtBLdf5JDQ8Ls5eYhi7s+u6TFJTg/oBYbt/Wy0n5tgslHi/nES1yUWURfePW4ENlpvZsmY0ls6+HhL3d7wHPK6wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBACQqF+giRT8eeXsNxAHMBCJjOMTOoKZ3g4iV/geoNe3SiI7+iFgV0IC970HMD54FW02tSgxxOBf4+xY9V54zu6GfFtKZlhHGBD9pZkVMr+SlDmFmXHsaj9djOHq54IE8Iwz1aJk0ETtwJoOjQyO90At+6bJ1ddEQfrPvylzuwcC+sVTSYBSxqsfFlXp9oEBI1FrWX0nsR9xfWICMPad4YiipSWGyoU0WFhq0zPd2KMjKdjnyvK+fAF8rotI9lbX+kZxqj194D93sqbO3GlUa+kXTKKzHxO/z6i0zseH1NmtLx8aqRGOeouBrAnlgbYncMRiB7pKF3qkeDxUAnxJHKbE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","request_id":"9475caf0718e4697a3c601d57d102ea6"}, [
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
  '4b671298-9297-4fa0-9716-5aafe1878239',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:53 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '15bb0cc5-6332-4f48-94fd-60a215ff1cc6',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:53 GMT',
  'Content-Length',
  '2665'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1593715434,"scheduledPurgeDate":1601491434,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '3707246e-ef07-4552-b65a-a576a3c403a8',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:53 GMT',
  'Content-Length',
  '2880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b230599f-fad0-4160-adc4-cc1442f9eb4a',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a7d17a43-00c5-4b22-ba66-8569c8cfba5e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c0eea1c1-f0a7-4952-ae6c-90ee44f69c6b',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '51f9a8b0-99bc-4a8f-8ba6-19d519eaee72',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:43:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '994906a8-d117-494e-86d1-f20adf0b08ee',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b1f0243b-cdff-4094-a1f2-fbc879a4f05c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2050a715-a5b7-4e69-b169-bb1b5bdac21e',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '690b7d07-b51c-4dd7-99cb-1bf97b5b8933',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '60fef811-e25b-458a-aeb3-73d0b0b54236',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'dcddbfaa-f29e-46a7-ba8f-6290d1999163',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1593715434,"scheduledPurgeDate":1601491434,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '2f510f81-b650-4c5c-8d2e-584559662c74',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:12 GMT',
  'Content-Length',
  '2880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4b3ae28f-2e3a-4ee1-8135-9005ac2b0278',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '6ba00475-f918-4d7a-93dc-ecb74655e853',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:13 GMT',
  'Content-Length',
  '2665'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '363d8520-29e8-4543-bd61-77cbfb9b9829',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c213e488-f879-46ec-bf48-77d4ed459e48',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '5d4d9b5f-5fe4-4d6d-ade4-41a654e17102',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3ab3ad3c-b6b0-4351-9df8-3328f6176be3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a1101f62-2354-480a-a56b-9815f0439d07',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9364ec3e-5263-47a7-9424-37c1ec6e4a99',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ee217c3e-c7ba-4f2a-b823-55ebebab49f0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '4efce9da-6d4e-4838-bff8-1e11d785b64f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:24 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '2adef906-f8ea-46de-88f0-270ed9124949',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '01dfb279-70bc-402d-9e3a-0a05575fc9ac',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a21de85c-7390-45cf-9d76-a21e571956c0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '08e9e988-a6c7-4669-96a3-d2828c074ec2',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"A certificate with (name/id) lroRecoverCertificateName-canwaituntilacertificateisrecovered- was not found in this key vault. If you recently deleted this certificate you may be able to recover it using the correct recovery command. For help resolving this issue, please see https://go.microsoft.com/fwlink/?linkid=2125182"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '086acbb4-7baf-476e-9c2f-31a92eef779d',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:34 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '8b39bdec-961f-463d-b3f0-e8d394e3a72f',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:37 GMT',
  'Content-Length',
  '2665'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1593715477,"scheduledPurgeDate":1601491477,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '4fd5b8ea-b996-44dc-bb9a-1ef48bf9d39c',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:38 GMT',
  'Content-Length',
  '2880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a5f0fa67-dae9-460a-9ed8-ab7d560025c0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '00b6e458-2bda-4ea0-a00f-6dd0e8e3af80',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd435679f-41cd-4c2c-8107-570d3268d0b5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '7572f140-55a3-414f-b5ee-796444df9ae0',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '632735c3-fe6f-42cb-8c94-16b6b41b8648',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1da0467b-d0a9-4828-80ba-4b6754121322',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f6acea99-4ade-4158-a765-c43483588330',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b24a46ae-fbb2-4ca5-a4d4-95b02ce4e4d5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fbdf9d0e-75b1-4fa3-88ee-c7042044b1c1',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'e59f426a-4159-48c1-b034-f9cd43d7e978',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroRecoverCertificateName-canwaituntilacertificateisrecovered-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '163',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'aa4e5365-ec00-48ff-bb60-b724dcced8e7',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1593715477,"scheduledPurgeDate":1601491477,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/2aedc9ac6c6f41a49ec0ef43ecc44371","x5t":"5XsLmVSucjYVmWxqdUCmKHZ081c","cer":"MIIDKDCCAhCgAwIBAgIQHs25VARqRFyPu5/PISQuozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjAwNzAyMTgzMzUyWhcNMjEwNzAyMTg0MzUyWjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUXzLtM5kpo0i1fQEV0x99xZr69NipoR+D0Uo2uTFWwihS3N9akoZIp9eM0AWSNhQrnSm60a7o08futPKPNgTfeIQ093NZx1jNkKr2KsZ5CQLmzKv1Yr/fXIODi3XSNtNZR22UXKz5fBk4X8XMgZUqybT6HVyXrnTnDMM4jI5Mg4aYgSWmJ5hrO2D11UFL0dIvoED5tmSNtMgZMxmsxBe3QZJHYJHx35GdPSY4czhvwdXy7BvmGyRUKi9g9Tq4t7C0Et1/kkNDwuzl5iGLuz67pMUlOD+gFhu39bLSfm2CyUeL+cRLXJRZRF949bgQ2Wm9myZjSWzr4eEvd3vAc8rrAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTE0uizdmQ/fngbz7/KwSOYCqoRcjAdBgNVHQ4EFgQUxNLos3ZkP354G8+/ysEjmAqqEXIwDQYJKoZIhvcNAQELBQADggEBAD5/68v6zpzfP0e0vEnlfsC7qUEXuOzBSygemfBDRc77/DM9gUccoRcstrAtI/kr4yePbQ648caeqzRpBUH3AQkd8ScSgLRSzQTsFclw70eOkCa9vw9LFhX1sVFOsNmwF56AuG6/kLsw0BYXzUeyY5g84hziqVanzKT+ZC5ASkcJE8Nm08OgIpQ/hA4sCnVPrh739FeUE3MD932sdkf37o2DIqrb/5/NZl3Gqw39dvQ3GvEk2NqnpFwXDn39SyURbcVFP7QZ1h8uYLXGBlIhL2rIc6qLajntIs28sBkmuDEK+6Ia9bi4fy5x4KcpDDYOiLvUzgeFTZvSKh1OTJEgv0w=","attributes":{"enabled":true,"nbf":1593714832,"exp":1625251432,"created":1593715432,"updated":1593715432,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593715419,"updated":1593715419}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '2e76dcb5-724e-4b1f-a130-59aec1762af3',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:57 GMT',
  'Content-Length',
  '2880'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
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
  'ae036af4-f83f-4817-8169-831661e440b5',
  'x-ms-keyvault-service-version',
  '1.1.8.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=52.183.123.117;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Thu, 02 Jul 2020 18:44:58 GMT'
]);
