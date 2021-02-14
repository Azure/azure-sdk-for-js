let nock = require('nock');

module.exports.hash = "34ebb163e70d14775b1f2ae51e4fed13";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/orssrc/orsBlob')
  .reply(200, "", [
  'Content-Length',
  '308736',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'y7XBmARNLrDlPIkUsiWY+Q==',
  'Last-Modified',
  'Mon, 22 Jun 2020 10:32:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D8169784037828"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0a7d6f99-901e-001c-4855-5477c9000000',
  'x-ms-client-request-id',
  '5299e3cc-6896-408d-af83-755a5ab16f90',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-22T10:32:08.3617832Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-or-003ca702-58ab-4405-8f52-cb92316babde_9a53f315-d56b-44f6-a3e8-1d62c1b7089b',
  'complete',
  'x-ms-or-d685bc41-c8ab-4ea5-889c-2503f02954d8_671e9447-be18-4632-9eea-a1a29cdae759',
  'complete',
  'x-ms-creation-time',
  'Mon, 22 Jun 2020 10:32:08 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,x-ms-or-003ca702-58ab-4405-8f52-cb92316babde_9a53f315-d56b-44f6-a3e8-1d62c1b7089b,x-ms-or-d685bc41-c8ab-4ea5-889c-2503f02954d8_671e9447-be18-4632-9eea-a1a29cdae759,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Jul 2020 11:55:28 GMT'
]);
