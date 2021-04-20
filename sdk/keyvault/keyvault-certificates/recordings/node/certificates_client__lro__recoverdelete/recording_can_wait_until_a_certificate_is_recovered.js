let nock = require('nock');

module.exports.hash = "a1d96e510acbbd46c70cf3fa627a273c";

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
  'westus2',
  'x-ms-request-id',
  'c15962a9-cd1e-45fe-b0a4-4def40f80338',
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

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '8368dd18-e1f8-4f78-bf3b-e1dc49daea00',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:05:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:05:27 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending?api-version=7.2&request_id=f6e0533bdc6b4b4c8a4b01194905fc0b',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '656f35d7-71e1-4251-8c06-2d4b81d84672',
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
  'Tue, 16 Feb 2021 19:05:28 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  'd2ab9579-51c8-485f-b911-b835d265cb5d',
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
  'Tue, 16 Feb 2021 19:05:28 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  'f871f601-ea1a-4f2d-8c40-cf030f9cbe53',
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
  'Tue, 16 Feb 2021 19:05:29 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  '2a7b094d-45fa-4821-9586-7bb69e9a05bc',
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
  'Tue, 16 Feb 2021 19:05:30 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  'f1a6d949-d1ff-4d19-8862-a1f0da9b7db9',
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
  'Tue, 16 Feb 2021 19:05:33 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  'bbc0c981-1bec-418b-9060-e6a65dab9faf',
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
  'Tue, 16 Feb 2021 19:05:34 GMT',
  'Content-Length',
  '1345'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwO+UArmQPpzun+3mJX3lDHu1pnMcS1JQkWmrPqv5CFkplaM68ysKLQhARbJX1z1KIOW8qqa17AzLPBNpj3Sx92q5u4qXUt3ZTePK3Q7ve0dy/hg/EdR+JfkFw6uDYNNGv119COvtqq08GEcNtqfGSz7X53C4VlIkAC+WiUPYtf+2f0wjG16GzHgx9eigLUHHdI69AbNwpkWz21/6CSDXnwQODUiK7+8dpZVICvuGpW7Gk7KqScFXM+hD1RcYn1k8xcG5qc+AjEhZvUK8xNXVaznRXHKCWoIBZbdzo9c+lcP3F/KEKdzs6xnDRzGP+ID6ui5Zc7fgFople91m35+RHQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAC5GqfNucpFq3TmTUVJSSni7Vc3bLE3Yzz/9C9dIuCAumc8e3xxvcQz/tsqJgg5UknqngFtm0XuBiPBa0V8V9kuNLo0FoCILvZNVq8GFzfmwyceLgTJUDRiJHfXt7UtKFKvVjmRMciK+khNig11wlI6oTEXOV8zFPm/rUhu5rdN+N0blTQrP/lUfeOIjG2a3eUX5NPd8K37ZGatnYJaxuhSrz78zrZezxPx5RqSJZ6BnZTUGVfMwOU5jC4V7faIm2MvfWEQ4J/EvrlEP6NpflIfWDf0/iY8WNRvk0uep3LTntqLyHeqGY6h4oMecIgJ+JilFKOl9NP9F/Cx0l60GMwE=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","request_id":"f6e0533bdc6b4b4c8a4b01194905fc0b"}, [
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
  'e7192a5c-2c46-455b-9b37-5cdb0c9f1f37',
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
  'Tue, 16 Feb 2021 19:05:37 GMT',
  'Content-Length',
  '1317'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '1b846624-e625-453d-a43f-09cade0e162e',
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
  'Tue, 16 Feb 2021 19:05:37 GMT',
  'Content-Length',
  '2624'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1613502337,"scheduledPurgeDate":1614107137,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  'd638f1d6-adf3-4fd3-8373-6b33314c482a',
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
  'Tue, 16 Feb 2021 19:05:37 GMT',
  'Content-Length',
  '2829'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '81caf37f-e29b-4d3d-b54e-811578d1016b',
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
  'Tue, 16 Feb 2021 19:05:37 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'dc8841b5-925d-45dc-8bf9-b65d6aa19dae',
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
  'Tue, 16 Feb 2021 19:05:37 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a170b712-e993-4ec0-89a4-15068d2b9dcd',
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
  'Tue, 16 Feb 2021 19:05:39 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '9bb86613-8969-4f6b-bdb3-e44f8112eac4',
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
  'Tue, 16 Feb 2021 19:05:40 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7afb61cb-3e56-449b-8c2c-0d37c760695d',
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
  'Tue, 16 Feb 2021 19:05:43 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '2e04422c-7698-4c71-93ed-82759820b10d',
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
  'Tue, 16 Feb 2021 19:05:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1613502337,"scheduledPurgeDate":1614107137,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '94dcc35c-9c52-4d74-ab98-8449e1ab4b7d',
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
  'Tue, 16 Feb 2021 19:05:47 GMT',
  'Content-Length',
  '2829'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3383e8f1-591e-413e-8b70-afdb5e319d75',
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
  'Tue, 16 Feb 2021 19:05:47 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/recover')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '3eae6799-d90f-4844-9aa7-411abc20bb8d',
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
  'Tue, 16 Feb 2021 19:05:47 GMT',
  'Content-Length',
  '2624'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'ce7efa40-3b52-4ac1-a3c2-0d3077133c60',
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
  'Tue, 16 Feb 2021 19:05:47 GMT'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '013e78a3-7c3a-4e8a-9618-0039dbc91e15',
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
  'Tue, 16 Feb 2021 19:05:47 GMT'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b834a38d-e1b6-4aea-bf93-adb89038f019',
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
  'Tue, 16 Feb 2021 19:05:50 GMT'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '13401f5f-4b73-4c3b-b525-e875c98fc69f',
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
  'Tue, 16 Feb 2021 19:05:51 GMT'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e4a333cd-d47e-4e89-918b-8524d3d70c09',
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
  'Tue, 16 Feb 2021 19:05:53 GMT'
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
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7a5f0bfb-d6ba-4cb1-abee-c3c5c1f719a1',
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
  'Tue, 16 Feb 2021 19:05:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  'c496a4a4-22fe-430f-af10-5d7e22196e42',
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
  'Tue, 16 Feb 2021 19:05:57 GMT',
  'Content-Length',
  '2624'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1613502358,"scheduledPurgeDate":1614107158,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '53cb11ff-c2de-4205-9ce3-e4be5afd8023',
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
  'Tue, 16 Feb 2021 19:05:58 GMT',
  'Content-Length',
  '2829'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'e446db97-7d61-4154-bc20-9f14e0ddf1b3',
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
  'Tue, 16 Feb 2021 19:05:58 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'b76c7017-8f5e-4c25-b8b3-4d7f251a360a',
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
  'Tue, 16 Feb 2021 19:05:58 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '7f7c7252-ed64-4420-9ee9-fe61ba47dff3',
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
  'Tue, 16 Feb 2021 19:06:00 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3db5624f-fd3a-4fcb-8ee2-bc430023a8c6',
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
  'Tue, 16 Feb 2021 19:06:01 GMT'
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
  '162',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4806bb11-6d34-4757-a152-0c7be03b2a11',
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
  'Tue, 16 Feb 2021 19:06:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-","deletedDate":1613502358,"scheduledPurgeDate":1614107158,"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","kid":"https://keyvault_name.vault.azure.net/keys/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","sid":"https://keyvault_name.vault.azure.net/secrets/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/8371a5f1e0e643a6baa02abc90832bff","x5t":"7nnIrHjOwRS-QyBhto2Bo2UW2z4","cer":"MIIDKDCCAhCgAwIBAgIQNL/L4j3YRwCCfQymIPChozANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NTM2WhcNMjIwMjE2MTkwNTM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDA75QCuZA+nO6f7eYlfeUMe7WmcxxLUlCRaas+q/kIWSmVozrzKwotCEBFslfXPUog5byqprXsDMs8E2mPdLH3arm7ipdS3dlN48rdDu97R3L+GD8R1H4l+QXDq4Ng00a/XX0I6+2qrTwYRw22p8ZLPtfncLhWUiQAL5aJQ9i1/7Z/TCMbXobMeDH16KAtQcd0jr0Bs3CmRbPbX/oJINefBA4NSIrv7x2llUgK+4albsaTsqpJwVcz6EPVFxifWTzFwbmpz4CMSFm9QrzE1dVrOdFccoJaggFlt3Oj1z6Vw/cX8oQp3OzrGcNHMY/4gPq6Lllzt+AWimV73Wbfn5EdAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBSWzlOtL0C8XJWBoDs/Iz3jcS+HcDAdBgNVHQ4EFgQUls5TrS9AvFyVgaA7PyM943Evh3AwDQYJKoZIhvcNAQELBQADggEBAC8JAyP4TyXCUs4zDH+XQ17t9WYge3RnZfnbFyFw7qNpp7QlR4EeU2a8xDIJB7VYqrjvvBaIho7VOmKseQViixZRssX9vLZMkC37ZPU4YKgS3Ye/5hITy/fvyjFDmlZjpAvhDuBgghfABCDtFek+1FDeCh0FVH3AIiDzFoG3JbIXErf4vFc83BV9+2Zi0StBts1m4N0xL2LFq+mzVLJC2BMbxhcnfE1OtumODLAFJYHlKXi2iI0W2rBoo3Hcb2LwwkP98ShwIQ4N55Kxy+qZ7EuctfF4sVyXoHBmsOAD/8nxmpw/u2111o3K2w+X99p+egY1zndafNVbVGEhRu5I+yM=","attributes":{"enabled":true,"nbf":1613501736,"exp":1645038336,"created":1613502336,"updated":1613502336,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502328,"updated":1613502328}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroRecoverCertificateName-canwaituntilacertificateisrecovered-/pending"}}, [
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
  '3d4bf992-1ac3-4dde-94bd-19fc5e726367',
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
  'Tue, 16 Feb 2021 19:06:06 GMT',
  'Content-Length',
  '2829'
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
  'westus2',
  'x-ms-request-id',
  '4d71adc1-7cad-4046-a0c8-a7e3d2684aeb',
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
  'Tue, 16 Feb 2021 19:06:06 GMT'
]);
