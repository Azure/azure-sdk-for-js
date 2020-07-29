let nock = require('nock');

module.exports.hash = "bac6944622b95f465db52c838ac6ab58";

module.exports.testInfo = {"uniqueName":{"container":"container159220831910304305","blob":"blob159220832047109000"},"newDate":{"now":"2020-06-15T08:05:19.100Z","tmr":"2020-06-15T08:05:19.101Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220831910304305')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:05:20 GMT',
  'ETag',
  '"0x8D81102D91B3357"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7605104a-c01e-007b-44eb-420f3c000000',
  'x-ms-client-request-id',
  'f23c88f4-7f24-4c7a-833a-a54826ca1736',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:05:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220831910304305/blob159220832047109000', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:05:20 GMT',
  'ETag',
  '"0x8D81102D94C02C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76051134-c01e-007b-21eb-420f3c000000',
  'x-ms-client-request-id',
  '861a8bd0-a4df-4615-897f-fa747d1d2d19',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T08:05:20.6169285Z',
  'Date',
  'Mon, 15 Jun 2020 08:05:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159220831910304305/blob159220832047109000')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Mon, 15 Jun 2020 08:05:20 GMT',
  'ETag',
  '"0x8D81102D97983A3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76051205-c01e-007b-6feb-420f3c000000',
  'x-ms-client-request-id',
  'beb7b084-2993-45b2-80c3-bb591c293cf6',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-15T08:05:20.9161395Z',
  'Date',
  'Mon, 15 Jun 2020 08:05:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159220831910304305/blob159220832047109000')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76051e96-c01e-007b-01eb-420f3c000000',
  'x-ms-client-request-id',
  '8592b1d0-d910-4013-a2d5-03ac08d0b752',
  'x-ms-version',
  '2019-12-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Mon, 15 Jun 2020 08:05:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159220831910304305/blob159220832047109000')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76051f2e-c01e-007b-17eb-420f3c000000',
  'x-ms-client-request-id',
  '01408f5b-25e6-4d1f-9726-8791b11dc44f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 08:05:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159220831910304305')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76051ff4-c01e-007b-5aeb-420f3c000000',
  'x-ms-client-request-id',
  '10c10553-b561-46b0-8c44-b429b221b085',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 08:05:25 GMT'
]);
