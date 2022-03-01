let nock = require('nock');

module.exports.hash = "e719418e15a55c8c9608d6d45be16d22";

module.exports.testInfo = {"uniqueName":{"container":"container162158369932703522","blob":"blob162158370011806935","blobCPK":"blobCPK162158370022905289"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162158369932703522')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 21 May 2021 07:55:00 GMT',
  'ETag',
  '"0x8D91C2DBBF22C4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79ca5-b01e-00b6-7016-4e83b3000000',
  'x-ms-client-request-id',
  'd66f8a65-7d02-4574-a59b-4a5b9fa9889c',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Fri, 21 May 2021 07:54:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162158369932703522/blob162158370011806935', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 21 May 2021 07:55:00 GMT',
  'ETag',
  '"0x8D91C2DBC0560D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79d26-b01e-00b6-5616-4e83b3000000',
  'x-ms-client-request-id',
  'ea94f07e-9f13-453c-bad3-3cecfa155ff8',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-05-21T07:55:00.3210963Z',
  'Date',
  'Fri, 21 May 2021 07:54:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162158369932703522/blobCPK162158370022905289', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 21 May 2021 07:55:00 GMT',
  'ETag',
  '"0x8D91C2DBC17B3AF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79d5d-b01e-00b6-0316-4e83b3000000',
  'x-ms-client-request-id',
  '0de08d61-2a08-4506-afcf-1c3104ddda80',
  'x-ms-version',
  '2020-08-04',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2021-05-21T07:55:00.4411823Z',
  'Date',
  'Fri, 21 May 2021 07:54:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container162158369932703522/blobCPK162158370022905289')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 21 May 2021 07:55:00 GMT',
  'ETag',
  '"0x8D91C2DBC280A63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79d91-b01e-00b6-2f16-4e83b3000000',
  'x-ms-client-request-id',
  'dba7a54f-d7a3-41ee-92f5-5eb9a38cf899',
  'x-ms-version',
  '2020-08-04',
  'x-ms-version-id',
  '2021-05-21T07:55:00.5502602Z',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 21 May 2021 07:54:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container162158369932703522/blobCPK162158370022905289')
  .reply(401, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79dc6-b01e-00b6-5816-4e83b3000000',
  'x-ms-client-request-id',
  '14593036-ca8d-4bb7-8bec-464c24039306',
  'x-ms-version',
  '2020-08-04',
  'x-ms-error-code',
  'NoAuthenticationInformation',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,WWW-Authenticate,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'WWW-Authenticate',
  'Bearer authorization_uri=https://login.microsoftonline.com/aaaaa/oauth2/authorize resource_id=https://storage.azure.com',
  'Date',
  'Fri, 21 May 2021 07:55:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container162158369932703522')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bd79dfa-b01e-00b6-8016-4e83b3000000',
  'x-ms-client-request-id',
  'ffb9e4ce-7d95-47c8-8283-e4c7f33915eb',
  'x-ms-version',
  '2020-08-04',
  'Date',
  'Fri, 21 May 2021 07:55:00 GMT'
]);
