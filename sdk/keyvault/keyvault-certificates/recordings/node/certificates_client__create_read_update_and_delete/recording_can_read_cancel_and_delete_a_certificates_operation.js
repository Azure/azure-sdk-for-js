let nock = require('nock');

module.exports.hash = "6f980535ac15be901313455dcfccca09";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/create')
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
  '53f79497-ed5d-4128-9614-fb70c308b73e',
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
  'Thu, 25 Jun 2020 12:57:11 GMT'
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
  '497f2c90-bca1-4bbe-801d-cb13e6083401',
  'x-ms-ests-server',
  '2.1.10732.8 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ao94pwcTU1xEqxJkcwpvCV8_aSJHAQAAACiWhtYOAAAA; expires=Sat, 25-Jul-2020 12:57:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 25 Jun 2020 12:57:11 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/create', {"policy":{"key_props":{},"secret_props":{},"x509_props":{"subject":"cn=MyCert","sans":{}},"issuer":{"name":"Self"},"attributes":{}},"attributes":{}})
  .query(true)
  .reply(202, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFFJQ4t3qe2gcC5rvCg6oQcnspHTG8j9Pc1jUviKWQQN78EqouSASEVtuz5PE2696GIAYKx0Ot9JWDyM2fyctXMCw1VM0BMy/uhVCa7SE/RPlsiiIaVUhSZVGYljh2Hju8c9HjRDWyKDIlIFRi4tv1/f4jdS83+PF2reUYYIgro5Xk7M13EaYH4YQy/B2Va3/3/CiPk95vy/Z0jbRp6m7rtJNngWNIgAZjyJGc2Kp5Tu8xyRxuOL3ib1gOS0I0pfzknQOOyptoFAsDMRxqIaX5uMbHCZEclYkPAP0VHoj3zogYmIpXUeBzDcO9cN6+x6if4QyfoLSfrgWExQ6ooa3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADSkIxgOLUR3UbR6U3PJMQWKINYIf7jbmxBbbStC4HHogsO4y/9wxitfXUW46PsYIlu8wyvrrjd6qu8x0yH7dSn5PSEsBfKuQbpEM11U0XRSUdhBLEkcvF8zs1yvr+ij20qnTbysHipcnpgnRewYo0VeKz17HK9DDrv4ygn+9URZBZYOXoj5OdcGDyw7uX/IQYkaJ8Nyywj2agvxuLq+cXccgqDU9I0euz3hJK1evi5VXWXXGdl5AxbeoETIAQljLS2AvoJ0dJiWjmU7PN1Ng5pr3Nim7rVeTApztIlbwCnFzuBkJzu3cx2/DOWH7Xf/9/Rhm1jvw1Cn7V5uL91zxhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1c8db011c0314967876ee158372efa9a"}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Location',
  'https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending?api-version=7.1&request_id=1c8db011c0314967876ee158372efa9a',
  'Retry-After',
  '10',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '6cf32f48-d503-4789-a0cf-fa0eced59771',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1357'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFFJQ4t3qe2gcC5rvCg6oQcnspHTG8j9Pc1jUviKWQQN78EqouSASEVtuz5PE2696GIAYKx0Ot9JWDyM2fyctXMCw1VM0BMy/uhVCa7SE/RPlsiiIaVUhSZVGYljh2Hju8c9HjRDWyKDIlIFRi4tv1/f4jdS83+PF2reUYYIgro5Xk7M13EaYH4YQy/B2Va3/3/CiPk95vy/Z0jbRp6m7rtJNngWNIgAZjyJGc2Kp5Tu8xyRxuOL3ib1gOS0I0pfzknQOOyptoFAsDMRxqIaX5uMbHCZEclYkPAP0VHoj3zogYmIpXUeBzDcO9cN6+x6if4QyfoLSfrgWExQ6ooa3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADSkIxgOLUR3UbR6U3PJMQWKINYIf7jbmxBbbStC4HHogsO4y/9wxitfXUW46PsYIlu8wyvrrjd6qu8x0yH7dSn5PSEsBfKuQbpEM11U0XRSUdhBLEkcvF8zs1yvr+ij20qnTbysHipcnpgnRewYo0VeKz17HK9DDrv4ygn+9URZBZYOXoj5OdcGDyw7uX/IQYkaJ8Nyywj2agvxuLq+cXccgqDU9I0euz3hJK1evi5VXWXXGdl5AxbeoETIAQljLS2AvoJ0dJiWjmU7PN1Ng5pr3Nim7rVeTApztIlbwCnFzuBkJzu3cx2/DOWH7Xf/9/Rhm1jvw1Cn7V5uL91zxhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1c8db011c0314967876ee158372efa9a"}, [
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
  'e779606c-f46d-4cf4-a9b0-f17e241b7468',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1357'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/eff85035ec784db59e9641455c218c72","attributes":{"enabled":false,"nbf":1593089232,"exp":1624625832,"created":1593089832,"updated":1593089832,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089832,"updated":1593089832}},"pending":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending"}}, [
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
  '57463149-7c0b-48b5-995e-8139f0624981',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1202'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFFJQ4t3qe2gcC5rvCg6oQcnspHTG8j9Pc1jUviKWQQN78EqouSASEVtuz5PE2696GIAYKx0Ot9JWDyM2fyctXMCw1VM0BMy/uhVCa7SE/RPlsiiIaVUhSZVGYljh2Hju8c9HjRDWyKDIlIFRi4tv1/f4jdS83+PF2reUYYIgro5Xk7M13EaYH4YQy/B2Va3/3/CiPk95vy/Z0jbRp6m7rtJNngWNIgAZjyJGc2Kp5Tu8xyRxuOL3ib1gOS0I0pfzknQOOyptoFAsDMRxqIaX5uMbHCZEclYkPAP0VHoj3zogYmIpXUeBzDcO9cN6+x6if4QyfoLSfrgWExQ6ooa3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADSkIxgOLUR3UbR6U3PJMQWKINYIf7jbmxBbbStC4HHogsO4y/9wxitfXUW46PsYIlu8wyvrrjd6qu8x0yH7dSn5PSEsBfKuQbpEM11U0XRSUdhBLEkcvF8zs1yvr+ij20qnTbysHipcnpgnRewYo0VeKz17HK9DDrv4ygn+9URZBZYOXoj5OdcGDyw7uX/IQYkaJ8Nyywj2agvxuLq+cXccgqDU9I0euz3hJK1evi5VXWXXGdl5AxbeoETIAQljLS2AvoJ0dJiWjmU7PN1Ng5pr3Nim7rVeTApztIlbwCnFzuBkJzu3cx2/DOWH7Xf/9/Rhm1jvw1Cn7V5uL91zxhs=","cancellation_requested":false,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1c8db011c0314967876ee158372efa9a"}, [
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
  '543d92d0-df3d-4fcc-ae2b-7ee4976fb53a',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1357'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .patch('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending', {"cancellation_requested":true})
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFFJQ4t3qe2gcC5rvCg6oQcnspHTG8j9Pc1jUviKWQQN78EqouSASEVtuz5PE2696GIAYKx0Ot9JWDyM2fyctXMCw1VM0BMy/uhVCa7SE/RPlsiiIaVUhSZVGYljh2Hju8c9HjRDWyKDIlIFRi4tv1/f4jdS83+PF2reUYYIgro5Xk7M13EaYH4YQy/B2Va3/3/CiPk95vy/Z0jbRp6m7rtJNngWNIgAZjyJGc2Kp5Tu8xyRxuOL3ib1gOS0I0pfzknQOOyptoFAsDMRxqIaX5uMbHCZEclYkPAP0VHoj3zogYmIpXUeBzDcO9cN6+x6if4QyfoLSfrgWExQ6ooa3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADSkIxgOLUR3UbR6U3PJMQWKINYIf7jbmxBbbStC4HHogsO4y/9wxitfXUW46PsYIlu8wyvrrjd6qu8x0yH7dSn5PSEsBfKuQbpEM11U0XRSUdhBLEkcvF8zs1yvr+ij20qnTbysHipcnpgnRewYo0VeKz17HK9DDrv4ygn+9URZBZYOXoj5OdcGDyw7uX/IQYkaJ8Nyywj2agvxuLq+cXccgqDU9I0euz3hJK1evi5VXWXXGdl5AxbeoETIAQljLS2AvoJ0dJiWjmU7PN1Ng5pr3Nim7rVeTApztIlbwCnFzuBkJzu3cx2/DOWH7Xf/9/Rhm1jvw1Cn7V5uL91zxhs=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1c8db011c0314967876ee158372efa9a"}, [
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
  '6382d983-a20f-47fa-b17c-eeddc7ef0915',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1356'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending","issuer":{"name":"Self"},"csr":"MIICoTCCAYkCAQAwETEPMA0GA1UEAxMGTXlDZXJ0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFFJQ4t3qe2gcC5rvCg6oQcnspHTG8j9Pc1jUviKWQQN78EqouSASEVtuz5PE2696GIAYKx0Ot9JWDyM2fyctXMCw1VM0BMy/uhVCa7SE/RPlsiiIaVUhSZVGYljh2Hju8c9HjRDWyKDIlIFRi4tv1/f4jdS83+PF2reUYYIgro5Xk7M13EaYH4YQy/B2Va3/3/CiPk95vy/Z0jbRp6m7rtJNngWNIgAZjyJGc2Kp5Tu8xyRxuOL3ib1gOS0I0pfzknQOOyptoFAsDMRxqIaX5uMbHCZEclYkPAP0VHoj3zogYmIpXUeBzDcO9cN6+x6if4QyfoLSfrgWExQ6ooa3wIDAQABoEswSQYJKoZIhvcNAQkOMTwwOjAOBgNVHQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADSkIxgOLUR3UbR6U3PJMQWKINYIf7jbmxBbbStC4HHogsO4y/9wxitfXUW46PsYIlu8wyvrrjd6qu8x0yH7dSn5PSEsBfKuQbpEM11U0XRSUdhBLEkcvF8zs1yvr+ij20qnTbysHipcnpgnRewYo0VeKz17HK9DDrv4ygn+9URZBZYOXoj5OdcGDyw7uX/IQYkaJ8Nyywj2agvxuLq+cXccgqDU9I0euz3hJK1evi5VXWXXGdl5AxbeoETIAQljLS2AvoJ0dJiWjmU7PN1Ng5pr3Nim7rVeTApztIlbwCnFzuBkJzu3cx2/DOWH7Xf/9/Rhm1jvw1Cn7V5uL91zxhs=","cancellation_requested":true,"status":"inProgress","status_details":"Pending certificate created. Certificate request is in progress. This may take some time based on the issuer provider. Please check again later.","request_id":"1c8db011c0314967876ee158372efa9a"}, [
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
  'e152ec4c-cfce-4f08-843c-bd9f6445ade0',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1356'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/')
  .query(true)
  .reply(200, {"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/eff85035ec784db59e9641455c218c72","attributes":{"enabled":false,"nbf":1593089232,"exp":1624625832,"created":1593089832,"updated":1593089832,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089832,"updated":1593089832}}}, [
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
  '2392ed14-0ba9-4164-ab8b-ff1e1a4f543f',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1037'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/pending')
  .query(true)
  .reply(404, {"error":{"code":"PendingCertificateNotFound","message":"Pending certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '172',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1c718083-57c2-4126-9455-4bd7557796cc',
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
  'Thu, 25 Jun 2020 12:57:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1593089833,"scheduledPurgeDate":1600865833,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/eff85035ec784db59e9641455c218c72","attributes":{"enabled":false,"nbf":1593089232,"exp":1624625832,"created":1593089832,"updated":1593089832,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089832,"updated":1593089832}}}, [
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
  '370fea1e-33ce-49f9-afef-fa7894c08c58',
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
  'Thu, 25 Jun 2020 12:57:12 GMT',
  'Content-Length',
  '1254'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '71ef0aba-98f0-47ea-87ef-64a4640cfd55',
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
  'Thu, 25 Jun 2020 12:57:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'f298545a-6ef5-4cbf-97d5-14ba73dbbfd7',
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
  'Thu, 25 Jun 2020 12:57:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '9519b820-e156-4581-be12-30e012783ec8',
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
  'Thu, 25 Jun 2020 12:57:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'c3bfd77c-351c-4d63-a4f3-3707fcd5b1de',
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
  'Thu, 25 Jun 2020 12:57:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'de316c66-dbc6-4f47-adb2-4ed11315f17f',
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
  'Thu, 25 Jun 2020 12:57:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'fc800f2c-3fcc-43b7-bced-783b8528db07',
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
  'Thu, 25 Jun 2020 12:57:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '17c367b1-b8fb-44ef-9f62-ffaee75052ca',
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
  'Thu, 25 Jun 2020 12:57:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Deleted Certificate not found: CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '165',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '09f26cda-5a09-4413-ba04-7bcfaa6fec9d',
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
  'Thu, 25 Jun 2020 12:57:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-","deletedDate":1593089833,"scheduledPurgeDate":1600865833,"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/eff85035ec784db59e9641455c218c72","attributes":{"enabled":false,"nbf":1593089232,"exp":1624625832,"created":1593089832,"updated":1593089832,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90},"policy":{"id":"https://keyvault_name.vault.azure.net/certificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-/policy","key_props":{"exportable":true,"kty":"RSA","key_size":2048,"reuse_key":false},"secret_props":{"contentType":"application/x-pkcs12"},"x509_props":{"subject":"cn=MyCert","sans":{},"ekus":["1.3.6.1.5.5.7.3.1","1.3.6.1.5.5.7.3.2"],"key_usage":["digitalSignature","keyEncipherment"],"validity_months":12,"basic_constraints":{"ca":false}},"lifetime_actions":[{"trigger":{"lifetime_percentage":80},"action":{"action_type":"AutoRenew"}}],"issuer":{"name":"Self"},"attributes":{"enabled":true,"created":1593089832,"updated":1593089832}}}, [
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
  'f2ed43f6-2319-41e9-b878-710cf8beed00',
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
  'Thu, 25 Jun 2020 12:57:27 GMT',
  'Content-Length',
  '1254'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedcertificates/CRUDCertificateName-canreadcancelanddeleteacertificatesoperation-')
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
  'ef847a53-049f-48c9-a32c-7defa4de1320',
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
  'Thu, 25 Jun 2020 12:57:27 GMT'
]);
