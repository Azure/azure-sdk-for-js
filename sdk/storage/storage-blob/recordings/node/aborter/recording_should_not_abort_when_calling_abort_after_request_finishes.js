let nock = require('nock');

module.exports.testInfo = {"container":"container156711934521903210"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156711934521903210')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 29 Aug 2019 22:55:45 GMT',
  'ETag',
  '"0x8D72CD406C4AC71"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '080a55d9-501e-0097-63bc-5e1958000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 29 Aug 2019 22:55:45 GMT',
  'Connection',
  'close' ]);

