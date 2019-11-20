let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157427318078205694","dir":"dir157427318137104049","file":"file157427318149209268"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157427318078205694')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 18:06:21 GMT',
  'ETag',
  '"0x8D76DE45931825E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '721ca9b0-701a-005d-2dcd-9f75db000000',
  'x-ms-client-request-id',
  '085a98ae-90cd-4e36-952e-df3658f00b2c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 18:06:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157427318078205694/dir157427318137104049')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 18:06:21 GMT',
  'ETag',
  '"0x8D76DE4594E2DDE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b13e5c29-301a-0063-07cd-9fe2a4000000',
  'x-ms-client-request-id',
  'cf2d9a29-e1c4-4679-84df-4ae20a2fcb93',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T18:06:21.4481374Z',
  'x-ms-file-last-write-time',
  '2019-11-20T18:06:21.4481374Z',
  'x-ms-file-creation-time',
  '2019-11-20T18:06:21.4481374Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 18:06:20 GMT'
]);
