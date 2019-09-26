let nock = require('nock');

module.exports.testInfo = {"container":"container156776205197109267"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776205197109267')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:32 GMT',
  'ETag',
  '"0x8D732AC71E1FAF9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5970649b-801e-0034-0195-64c44b000000',
  'x-ms-client-request-id',
  '665ccefc-6018-48a2-a125-ad032f044404',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776205197109267')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4060108-901e-00dc-5095-645ddd000000',
  'x-ms-client-request-id',
  'a687619b-559b-4fb2-a0a0-b8c1588b619b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:34 GMT',
  'Connection',
  'close' ]);

