let nock = require('nock');

module.exports.testInfo = {"container":"container156464815604200526","blob":"blob156464815633801223"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156464815604200526')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 01 Aug 2019 08:29:16 GMT',
  'ETag',
  '"0x8D7165A5740BA93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0ea2222-801e-0052-4f43-486763000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:29:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156464815604200526')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ed8571e-f01e-0091-4843-48ee20000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 01 Aug 2019 08:29:16 GMT',
  'Connection',
  'close' ]);

