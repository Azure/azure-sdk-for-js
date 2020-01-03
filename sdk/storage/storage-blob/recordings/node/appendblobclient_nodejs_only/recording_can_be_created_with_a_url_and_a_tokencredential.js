let nock = require('nock');

module.exports.testInfo = {"container":"container156816859584502742","blob":"blob156816859625204695"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816859584502742')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:16 GMT',
  'ETag',
  '"0x8D7365F00F10F5E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42fb85a7-101e-0062-1c47-682124000000',
  'x-ms-client-request-id',
  'b605ca5e-34d3-46d9-9cd5-b057d26f5be9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:15 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816859584502742')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ccae595-d01e-0012-2e47-6852e0000000',
  'x-ms-client-request-id',
  '2316a9d0-9105-4eff-b7f3-a2b24139c1b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:15 GMT' ]);

