let nock = require('nock');

module.exports.hash = "a1e81eb55400bda425d12897b40d7253";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create')
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
  '0e9ebfe6-971d-49e8-85e3-d77f9bf58df0',
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
  'Tue, 16 Feb 2021 19:04:27 GMT'
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
  'c5eff122-0283-49f8-a6e5-14419573ec00',
  'x-ms-ests-server',
  '2.1.11496.5 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AufoSEQpIbxLjzJaYLa_pBMA4qsDEQAAAE0NvtcOAAAA; expires=Thu, 18-Mar-2021 19:04:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 19:04:28 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending?api-version=7.2&request_id=9a743912445e48b1be94a32cef5e366c',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '3b592a9c-7c1d-4d67-9e68-7c1947cc3039',
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
  'Tue, 16 Feb 2021 19:04:28 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  '16ea18be-ae7f-4051-b763-1cd64c421ceb',
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
  'Tue, 16 Feb 2021 19:04:28 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  'abd1a592-f73b-4703-a1df-9aa8a4b33b3f',
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
  'Tue, 16 Feb 2021 19:04:28 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  '20064641-d0eb-4210-802d-dcee79f780b4',
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
  'Tue, 16 Feb 2021 19:04:31 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  '173d510c-9c7d-424e-890b-6a1f9cab9ae6',
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
  'Tue, 16 Feb 2021 19:04:33 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  'eec23506-2d9a-4175-9de8-b0d8a6ea2fa1',
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
  'Tue, 16 Feb 2021 19:04:35 GMT',
  'Content-Length',
  '1337'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvdy3PKSD6/L0Jqr3EV3J/7YHq1xhhw38nmarpjsCbpD/Rr0BOZLUheEcfio8dNC3bLUysgJNg75LLXuak1/spF3grdtbie8QzKJjOkhehiUY2txA66gQPn6EATfrUnj7ganfhL3D3K4qI5O6xLOibnHBkuFCzlSlaNyqblbaUKTddvAkXY2TQ/njVgVYmg6Wvx7HoCS4S+2PI7sqNSXh8zSDFq7K8AOOJvS7oQpSX5rASs9+F7UzdZa2B9fphottNZn7h4fFN67beeWZ8Dy9GyJSj0RJSkj2TNctBTvfM3QsKpSb3RPzkSGFxnWyl0bdNuOTZVZ8PqPMLhvLEjbzVQIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBABa6F2zAAOqBxSu+87ra6WK9h9qiEgwi2F2ZnMfnvkd7xM+vZzlh3OgqgCIR2Tu4B+4cdOlb0jcRu4UmDP7LWPQDaB8xslgeRSfJ343CvNzdDSu7RvlPB8vJdKG+djOmjEo6kIvDyKdD378hxHnoRX8XG9/FePnftohe/6jwb/4GF1lt2xE8KUCz7E/WSt3wREhuLQvkJ67qiUtnrZ3LywLYJFGD918z7G6xfqTI42LDJK7GhGZgTugcCbHCCGkEpKaUZ7UQOuyxJVeKjzPIsXkNF9p+RUUbpCjy8JhJpzVFUyWazJCclQTEauAOhCUmVVyAakbnLOQjzci8rBBgyJU=","cancellation_requested":false,"status":"completed","target":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-","request_id":"9a743912445e48b1be94a32cef5e366c"}, [
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
  '17872784-2994-4342-8260-e09c0afbba6e',
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
  'Tue, 16 Feb 2021 19:04:36 GMT',
  'Content-Length',
  '1301'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","x5t":"aAkL5yfkrYAY_YmSZs0quhhmRZ0","cer":"MIIDKDCCAhCgAwIBAgIQTKIFqYGYT7OXbM7tpl3NtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDM2WhcNMjIwMjE2MTkwNDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC93Lc8pIPr8vQmqvcRXcn/tgerXGGHDfyeZqumOwJukP9GvQE5ktSF4Rx+Kjx00LdstTKyAk2Dvkste5qTX+ykXeCt21uJ7xDMomM6SF6GJRja3EDrqBA+foQBN+tSePuBqd+EvcPcriojk7rEs6JuccGS4ULOVKVo3KpuVtpQpN128CRdjZND+eNWBViaDpa/HsegJLhL7Y8juyo1JeHzNIMWrsrwA44m9LuhClJfmsBKz34XtTN1lrYH1+mGi201mfuHh8U3rtt55ZnwPL0bIlKPRElKSPZM1y0FO98zdCwqlJvdE/ORIYXGdbKXRt0245NlVnw+o8wuG8sSNvNVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTEBMydwvO+OIvIZSzLHx3i8HtvMDAdBgNVHQ4EFgQUxATMncLzvjiLyGUsyx8d4vB7bzAwDQYJKoZIhvcNAQELBQADggEBAE+A++czuQiAPPh92DP3qQ0fik8crfpDyxY5L9IcveW8ASTup6XWqfqJELzfoCjYTGhzKRxJDHnF3ZIlyRiBX065yCGooqYMjt0UPlqk0HZF5Q023ovcjtZkcn9j0SVMc6Cpuzu80y8U4UKp7nuH2vVOy3p6ZQxyUqD5J4w6vosdEwh/lHhKFK/1Ok/PmPFpuAdRI1yiD3fhF0Ed3zE3RUVPRBnXta4S1DBUiJJD53uLW/0I39hFl5WtPV0Sag+6CEUK+VU8t9h6XjD6C58RPBL2v5izr6bb0tnk7dnamrw1vbPWpEhiSv0E90pGMxFaQ5I6p0sbqFBsnyQr0NNSNr4=","attributes":{"enabled":true,"nbf":1613501676,"exp":1645038276,"created":1613502276,"updated":1613502276,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502268,"updated":1613502268}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '2cf8d950-fa62-4a11-925d-80199a56de24',
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
  'Tue, 16 Feb 2021 19:04:37 GMT',
  'Content-Length',
  '2584'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1613502277,"scheduledPurgeDate":1614107077,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","x5t":"aAkL5yfkrYAY_YmSZs0quhhmRZ0","cer":"MIIDKDCCAhCgAwIBAgIQTKIFqYGYT7OXbM7tpl3NtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDM2WhcNMjIwMjE2MTkwNDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC93Lc8pIPr8vQmqvcRXcn/tgerXGGHDfyeZqumOwJukP9GvQE5ktSF4Rx+Kjx00LdstTKyAk2Dvkste5qTX+ykXeCt21uJ7xDMomM6SF6GJRja3EDrqBA+foQBN+tSePuBqd+EvcPcriojk7rEs6JuccGS4ULOVKVo3KpuVtpQpN128CRdjZND+eNWBViaDpa/HsegJLhL7Y8juyo1JeHzNIMWrsrwA44m9LuhClJfmsBKz34XtTN1lrYH1+mGi201mfuHh8U3rtt55ZnwPL0bIlKPRElKSPZM1y0FO98zdCwqlJvdE/ORIYXGdbKXRt0245NlVnw+o8wuG8sSNvNVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTEBMydwvO+OIvIZSzLHx3i8HtvMDAdBgNVHQ4EFgQUxATMncLzvjiLyGUsyx8d4vB7bzAwDQYJKoZIhvcNAQELBQADggEBAE+A++czuQiAPPh92DP3qQ0fik8crfpDyxY5L9IcveW8ASTup6XWqfqJELzfoCjYTGhzKRxJDHnF3ZIlyRiBX065yCGooqYMjt0UPlqk0HZF5Q023ovcjtZkcn9j0SVMc6Cpuzu80y8U4UKp7nuH2vVOy3p6ZQxyUqD5J4w6vosdEwh/lHhKFK/1Ok/PmPFpuAdRI1yiD3fhF0Ed3zE3RUVPRBnXta4S1DBUiJJD53uLW/0I39hFl5WtPV0Sag+6CEUK+VU8t9h6XjD6C58RPBL2v5izr6bb0tnk7dnamrw1vbPWpEhiSv0E90pGMxFaQ5I6p0sbqFBsnyQr0NNSNr4=","attributes":{"enabled":true,"nbf":1613501676,"exp":1645038276,"created":1613502276,"updated":1613502276,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502268,"updated":1613502268}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e5da28da-7878-4a7a-a944-5e1c4bd308a3',
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
  'Tue, 16 Feb 2021 19:04:37 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '4a19aae2-f26c-4054-b0c0-710af2b4d1f6',
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
  'Tue, 16 Feb 2021 19:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '72271390-e8b7-4e83-8615-cb920f62d2a9',
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
  'Tue, 16 Feb 2021 19:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '6b0920e4-d36b-4375-8129-b492f409131f',
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
  'Tue, 16 Feb 2021 19:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  'e20e987a-b7fe-4dcc-a554-4eac9575f257',
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
  'Tue, 16 Feb 2021 19:04:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '19adc66b-9f15-4363-9b57-7fc76b20fbc7',
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
  'Tue, 16 Feb 2021 19:04:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '27801694-beae-4d40-a471-b7077d169d7b',
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
  'Tue, 16 Feb 2021 19:04:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '0a56b61d-4067-4556-b88b-96292925fa54',
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
  'Tue, 16 Feb 2021 19:04:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: lroDeleteCertificateName-canresumefromastoppedpoller-"}}, [
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
  'westus2',
  'x-ms-request-id',
  '4df9543c-665c-44ed-a1df-829d0fad466c',
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
  'Tue, 16 Feb 2021 19:04:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1613502277,"scheduledPurgeDate":1614107077,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","x5t":"aAkL5yfkrYAY_YmSZs0quhhmRZ0","cer":"MIIDKDCCAhCgAwIBAgIQTKIFqYGYT7OXbM7tpl3NtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDM2WhcNMjIwMjE2MTkwNDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC93Lc8pIPr8vQmqvcRXcn/tgerXGGHDfyeZqumOwJukP9GvQE5ktSF4Rx+Kjx00LdstTKyAk2Dvkste5qTX+ykXeCt21uJ7xDMomM6SF6GJRja3EDrqBA+foQBN+tSePuBqd+EvcPcriojk7rEs6JuccGS4ULOVKVo3KpuVtpQpN128CRdjZND+eNWBViaDpa/HsegJLhL7Y8juyo1JeHzNIMWrsrwA44m9LuhClJfmsBKz34XtTN1lrYH1+mGi201mfuHh8U3rtt55ZnwPL0bIlKPRElKSPZM1y0FO98zdCwqlJvdE/ORIYXGdbKXRt0245NlVnw+o8wuG8sSNvNVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTEBMydwvO+OIvIZSzLHx3i8HtvMDAdBgNVHQ4EFgQUxATMncLzvjiLyGUsyx8d4vB7bzAwDQYJKoZIhvcNAQELBQADggEBAE+A++czuQiAPPh92DP3qQ0fik8crfpDyxY5L9IcveW8ASTup6XWqfqJELzfoCjYTGhzKRxJDHnF3ZIlyRiBX065yCGooqYMjt0UPlqk0HZF5Q023ovcjtZkcn9j0SVMc6Cpuzu80y8U4UKp7nuH2vVOy3p6ZQxyUqD5J4w6vosdEwh/lHhKFK/1Ok/PmPFpuAdRI1yiD3fhF0Ed3zE3RUVPRBnXta4S1DBUiJJD53uLW/0I39hFl5WtPV0Sag+6CEUK+VU8t9h6XjD6C58RPBL2v5izr6bb0tnk7dnamrw1vbPWpEhiSv0E90pGMxFaQ5I6p0sbqFBsnyQr0NNSNr4=","attributes":{"enabled":true,"nbf":1613501676,"exp":1645038276,"created":1613502276,"updated":1613502276,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502268,"updated":1613502268}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  '83e2009b-b3db-4c7e-8f20-25f7287df2de',
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
  'Tue, 16 Feb 2021 19:04:47 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-","deletedDate":1613502277,"scheduledPurgeDate":1614107077,"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","kid":"https://keyvault_name.vault.azure.net/keys/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","sid":"https://keyvault_name.vault.azure.net/secrets/lroDeleteCertificateName-canresumefromastoppedpoller-/ae5820fc7e0743cc9030b6a5d96c38d8","x5t":"aAkL5yfkrYAY_YmSZs0quhhmRZ0","cer":"MIIDKDCCAhCgAwIBAgIQTKIFqYGYT7OXbM7tpl3NtDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDEwZNeUNlcnQwHhcNMjEwMjE2MTg1NDM2WhcNMjIwMjE2MTkwNDM2WjARMQ8wDQYDVQQDEwZNeUNlcnQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC93Lc8pIPr8vQmqvcRXcn/tgerXGGHDfyeZqumOwJukP9GvQE5ktSF4Rx+Kjx00LdstTKyAk2Dvkste5qTX+ykXeCt21uJ7xDMomM6SF6GJRja3EDrqBA+foQBN+tSePuBqd+EvcPcriojk7rEs6JuccGS4ULOVKVo3KpuVtpQpN128CRdjZND+eNWBViaDpa/HsegJLhL7Y8juyo1JeHzNIMWrsrwA44m9LuhClJfmsBKz34XtTN1lrYH1+mGi201mfuHh8U3rtt55ZnwPL0bIlKPRElKSPZM1y0FO98zdCwqlJvdE/ORIYXGdbKXRt0245NlVnw+o8wuG8sSNvNVAgMBAAGjfDB6MA4GA1UdDwEB/wQEAwIFoDAJBgNVHRMEAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAfBgNVHSMEGDAWgBTEBMydwvO+OIvIZSzLHx3i8HtvMDAdBgNVHQ4EFgQUxATMncLzvjiLyGUsyx8d4vB7bzAwDQYJKoZIhvcNAQELBQADggEBAE+A++czuQiAPPh92DP3qQ0fik8crfpDyxY5L9IcveW8ASTup6XWqfqJELzfoCjYTGhzKRxJDHnF3ZIlyRiBX065yCGooqYMjt0UPlqk0HZF5Q023ovcjtZkcn9j0SVMc6Cpuzu80y8U4UKp7nuH2vVOy3p6ZQxyUqD5J4w6vosdEwh/lHhKFK/1Ok/PmPFpuAdRI1yiD3fhF0Ed3zE3RUVPRBnXta4S1DBUiJJD53uLW/0I39hFl5WtPV0Sag+6CEUK+VU8t9h6XjD6C58RPBL2v5izr6bb0tnk7dnamrw1vbPWpEhiSv0E90pGMxFaQ5I6p0sbqFBsnyQr0NNSNr4=","attributes":{"enabled":true,"nbf":1613501676,"exp":1645038276,"created":1613502276,"updated":1613502276,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1613502268,"updated":1613502268}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/lroDeleteCertificateName-canresumefromastoppedpoller-/pending"}}, [
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
  'e3e64b3f-de19-4a2f-bba3-03c9e81d54f1',
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
  'Tue, 16 Feb 2021 19:04:47 GMT',
  'Content-Length',
  '2781'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/lroDeleteCertificateName-canresumefromastoppedpoller-')
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
  '6c155c40-e2b5-413d-b1ca-28209dabfa2a',
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
  'Tue, 16 Feb 2021 19:04:47 GMT'
]);
