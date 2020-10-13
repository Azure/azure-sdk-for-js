let nock = require('nock');

module.exports.hash = "5c45c034633ef927b271c27527735d9b";

module.exports.testInfo = {"uniqueName":{"container":"container160258359673708257"},"newDate":{"now":"2020-10-13T10:06:35.980Z","tmr":"2020-10-13T10:06:35.980Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/aaaaa/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=aaaaa&client_secret=aaaaa&scope=https%3A%2F%2Fstorage.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiJodHRwczovL3N0b3JhZ2UuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjQ3LyIsImlhdCI6MTYwMjU4MzI5NiwibmJmIjoxNjAyNTgzMjk2LCJleHAiOjE2MDI2Njk5OTYsImFpbyI6IkUyUmdZRkE4V05yT1VMYlEyeUZBcE50OFV2TUdBQT09IiwiYXBwaWQiOiJmZjI4OThiNC0zNjljLTQ3YzMtYTQ3Ni1mNDVmZmM5MDY0ZWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwib2lkIjoiMWNlMTMyNzgtYTA4My00ZDE1LTg3OTYtZGUzOTcxNzc5M2UxIiwicmgiOiIwLkFRRUF2NGo1Y3ZHR3IwR1JxeTE4MEJIYlI3U1lLUC1jTnNOSHBIYjBYX3lRWk84YUFBQS4iLCJzdWIiOiIxY2UxMzI3OC1hMDgzLTRkMTUtODc5Ni1kZTM5NzE3NzkzZTEiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1dGkiOiJTcjlzY1lWbU9FYUNBVUsyMFdNREFBIiwidmVyIjoiMS4wIn0.pdSpuC2aEbgZNs5oN72PQIQ9ZoPiWlCTnS4k9MC0PCZp6tHZgkc5vVPcEbjLY5Iv7HZw7bgrVgEVw9Mh8kxlutqXsOsmDrudMVVZbeyf3S6rBW4cXKyqfigDgObUFq4OX2bCosMBw9eKip1aVmjICzJDWwCRKKS0pWN22h8FrU5XELGG3zEfW5eaAh8Ad_f9hIZZ7CUM1SmBCyzf9ykBjxcQ9DuoVmLJE9tWwSGbl2WGqO2TJHEwlodZNLY7mXu_DKLO6p-Y2jlho5w2QFLpq3xnNDu4X2wtVrjbyTJwadcP3z9oCEVuOt-a2RRzsPoPNG09CItqiMQg2OkH876Zew"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1318',
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
  '716cbf4a-6685-4638-8201-42b6d1630300',
  'x-ms-ests-server',
  '2.1.11154.7 - EASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjMQ5a788ytDu8lFnFLviRB00ISJAQAAACxzF9cOAAAA; expires=Thu, 12-Nov-2020 10:06:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 13 Oct 2020 10:06:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><KeyInfo><Start>2020-10-13T09:06:35Z</Start><Expiry>2020-10-14T10:06:35Z</Expiry></KeyInfo>")
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><UserDelegationKey><SignedOid>1ce13278-a083-4d15-8796-de39717793e1</SignedOid><SignedTid>aaaaa</SignedTid><SignedStart>2020-10-13T09:06:35Z</SignedStart><SignedExpiry>2020-10-14T10:06:35Z</SignedExpiry><SignedService>b</SignedService><SignedVersion>2020-02-10</SignedVersion><Value>jpVWs5qOQ6MJmrr3S6bCtlYqOeju2ZKmRtDAjVbJdO0=</Value></UserDelegationKey>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5d2-601e-002d-2d48-a179c2000000',
  'x-ms-client-request-id',
  '39749911-55ba-4ce8-aa57-35768997d366',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:35 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160258359673708257')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 10:06:36 GMT',
  'ETag',
  '"0x8D86F5FABDCC938"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5d5-601e-002d-3048-a179c2000000',
  'x-ms-client-request-id',
  '15c8bca8-449f-44e6-82b8-e3b08ca4ccdd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160258359673708257')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container160258359673708257\"><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5dd-601e-002d-3548-a179c2000000',
  'x-ms-client-request-id',
  'efe7ccee-7a1b-460b-9464-c07102c7453e',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 13 Oct 2020 10:06:36 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160258359673708257')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12d9c5e6-601e-002d-3c48-a179c2000000',
  'x-ms-client-request-id',
  '1b7bb074-2458-479e-ab5b-3e88c800c474',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 10:06:36 GMT'
]);
