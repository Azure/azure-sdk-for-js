let nock = require('nock');

module.exports.hash = "8fc0f0f8be4cfc4b1ab29277203cf2bc";

module.exports.testInfo = {"uniqueName":{"container":"container159218743504107204","blob":"blob159218743535309436","blobCPK":"blobCPK159218743535502279"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218743504107204')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'ETag',
  '"0x8D810D23894E519"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f471fd3-701e-006e-5abb-42188f000000',
  'x-ms-client-request-id',
  '41aeb515-a435-4ec2-8def-5f482870485d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159218743504107204/blobCPK159218743535502279', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'ETag',
  '"0x8D810D238C5DF3C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaa98a-e01e-0021-4cbb-4269db000000',
  'x-ms-client-request-id',
  'fb2a4ff0-9f03-4da1-8aa9-c2d469d2b4bd',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-version-id',
  '2020-06-15T02:17:15.4593596Z',
  'Date',
  'Mon, 15 Jun 2020 02:17:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218743504107204/blobCPK159218743535502279')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D238C5DF3C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f472186-701e-006e-7bbb-42188f000000',
  'x-ms-client-request-id',
  'c6df8f7e-2226-4ba5-b4a4-8b61adbedfb0',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:15.4593596Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159218743504107204/blobCPK159218743535502279')
  .reply(206, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-10/11',
  'Last-Modified',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D810D238C5DF3C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaaa45-e01e-0021-7dbb-4269db000000',
  'x-ms-client-request-id',
  'cdb7d256-d5d2-4518-b235-f27d51da2fab',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-15T02:17:15.4593596Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Mon, 15 Jun 2020 02:17:15 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-blob-content-md5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159218743504107204/blobCPK159218743535502279')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f472353-701e-006e-40bb-42188f000000',
  'x-ms-client-request-id',
  'fa84fc7a-5766-40ef-a3e0-c0ffdbbd857f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 15 Jun 2020 02:17:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159218743504107204')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bfaaaf7-e01e-0021-24bb-4269db000000',
  'x-ms-client-request-id',
  '8acff522-b4c5-44e1-9b17-e1d2ce199c96',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Mon, 15 Jun 2020 02:17:16 GMT'
]);
