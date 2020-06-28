let nock = require('nock');

module.exports.hash = "693605e38869e567401f9f596f31f035";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/create')
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
  'eastus',
  'x-ms-request-id',
  'b997087e-cebe-4caf-88f7-8986b1e00993',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:48 GMT'
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
  'c2765136-231d-4019-9196-5966c9111700',
  'x-ms-ests-server',
  '2.1.10761.12 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=ArvQUxmp8PRFrrN35llhiIIL6tuIAQAAAHj8itYOAAAA; expires=Tue, 28-Jul-2020 21:02:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Sun, 28 Jun 2020 21:02:48 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsbIeYf0mtrz1EflDv089M14jATWlzA9+I+uECGaMkW1ArcV/nV4znbE/eEhet6Dl4zADpWWceS/C/t2rxAW+cbSDgMs5kI+VKGZuGUByF6ajlbgUATcH5nUb/yj4uk/GQs/qBKTtz7HUSCfJ8mpd3xB5NoSIm4IW7wW13b9Yw3IhNUd0Pb2oVkg8CtydyFM6hfUL7lOT36goJyX2FovVjQmtAd3ToWyvVjffc7NijaaTd0IvQz2CwFEhvR/M1yWvFuZO5U2PtdmdX7NswyOsInrbkvE9hWKgTN79eAW7qG7kIUVOZ6aMFuJ+NUw8S8dR5gN00d4rMPV4Tsqb5+/xXwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKHWtmf77/+/o9REfZ/grbxsFpDvMcTzMmfgM/yrkDEoWixCaIUIndin7RSJ5NN1ee8t4pZHq8KsO6YQNBBv5kvQrX9fcVtzEny4bB2hVV7R1AeQt+MvvLvX5ycFv+jkwh+FXeVNR/1TR4QMRQir27UYFyqhebUzLzoQjb3XfC0jCnlPLdr2oM/6iFnjInro1xXH0c2NHrHOJAe+y+JBY4KcKKrzrO+V/G3bKgsDc7CGJsADrTsVIu7cpIW/XAMWF/55c83GRFnigqS6NQd4JRLYfjvKiAveg0ISekeACIb+c5zItHIVYdFEHUJD0EvtvOrroLjiF0ac5WdkIrqalco=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4db0b2c4a5894765bfc8e5690e54105c"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/pending?api-version=7.1-preview&request_id=4db0b2c4a5894765bfc8e5690e54105c',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  '092765e0-6d20-472d-b023-e2b75a9a4e58',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:49 GMT',
  'Content-Length',
  '1353'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-cangetacertificatewithrequestOptionstimeout-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsbIeYf0mtrz1EflDv089M14jATWlzA9+I+uECGaMkW1ArcV/nV4znbE/eEhet6Dl4zADpWWceS/C/t2rxAW+cbSDgMs5kI+VKGZuGUByF6ajlbgUATcH5nUb/yj4uk/GQs/qBKTtz7HUSCfJ8mpd3xB5NoSIm4IW7wW13b9Yw3IhNUd0Pb2oVkg8CtydyFM6hfUL7lOT36goJyX2FovVjQmtAd3ToWyvVjffc7NijaaTd0IvQz2CwFEhvR/M1yWvFuZO5U2PtdmdX7NswyOsInrbkvE9hWKgTN79eAW7qG7kIUVOZ6aMFuJ+NUw8S8dR5gN00d4rMPV4Tsqb5+/xXwIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBAKHWtmf77/+/o9REfZ/grbxsFpDvMcTzMmfgM/yrkDEoWixCaIUIndin7RSJ5NN1ee8t4pZHq8KsO6YQNBBv5kvQrX9fcVtzEny4bB2hVV7R1AeQt+MvvLvX5ycFv+jkwh+FXeVNR/1TR4QMRQir27UYFyqhebUzLzoQjb3XfC0jCnlPLdr2oM/6iFnjInro1xXH0c2NHrHOJAe+y+JBY4KcKKrzrO+V/G3bKgsDc7CGJsADrTsVIu7cpIW/XAMWF/55c83GRFnigqS6NQd4JRLYfjvKiAveg0ISekeACIb+c5zItHIVYdFEHUJD0EvtvOrroLjiF0ac5WdkIrqalco=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"4db0b2c4a5894765bfc8e5690e54105c"}, [
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
  'eastus',
  'x-ms-request-id',
  '87aaadad-0926-4a62-a8bc-070541b7e18c',
  'x-ms-keyvault-service-version',
  '1.1.6.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=70.36.51.197;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 28 Jun 2020 21:02:50 GMT',
  'Content-Length',
  '1353'
]);
