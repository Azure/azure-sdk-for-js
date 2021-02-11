let nock = require('nock');

module.exports.hash = "92b0673837b9baab3cd04f2d9b8dc183";

module.exports.testInfo = {"uniqueName":{"container":"container158471579366104189","blob":"blob158471579420409236"},"newDate":{"now":"2020-03-20T14:49:55.260Z","tmr":"2020-03-20T14:49:55.260Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471579366104189')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:53 GMT',
  'ETag',
  '"0x8D7CCDDF3609B95"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f6aa-901e-0054-70c6-fe9595000000',
  'x-ms-client-request-id',
  '02a94cdb-5c8c-42c4-af5f-b384d8777f6a',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 14:49:53 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471579366104189/blob158471579420409236', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:54 GMT',
  'ETag',
  '"0x8D7CCDDF3AC3FE2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f74e-901e-0054-80c6-fe9595000000',
  'x-ms-client-request-id',
  'e23b331a-0cb7-45b9-991a-e438b987ec95',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T14:49:54.4205282Z',
  'Date',
  'Fri, 20 Mar 2020 14:49:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158471579366104189/blob158471579420409236')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Fri, 20 Mar 2020 14:49:54 GMT',
  'ETag',
  '"0x8D7CCDDF3F5D968"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f7d0-901e-0054-72c6-fe9595000000',
  'x-ms-client-request-id',
  '1d54c74e-db0e-4464-8684-bf3f4a6754d4',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-20T14:49:54.9038712Z',
  'Date',
  'Fri, 20 Mar 2020 14:49:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158471579366104189/blob158471579420409236')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f86f-901e-0054-6bc6-fe9595000000',
  'x-ms-client-request-id',
  'e7540387-84f6-4f09-9ac6-8e4b4a96b44b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 20 Mar 2020 14:49:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158471579366104189/blob158471579420409236')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f8fb-901e-0054-52c6-fe9595000000',
  'x-ms-client-request-id',
  '32396bd5-d460-4146-a80a-55f6a68ab779',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 20 Mar 2020 14:49:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158471579366104189')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91e6f9a1-901e-0054-48c6-fe9595000000',
  'x-ms-client-request-id',
  '2040ee62-ec75-47b5-b962-42287278bb1e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Fri, 20 Mar 2020 14:49:56 GMT'
]);
