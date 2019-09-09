let nock = require('nock');

module.exports.testInfo = {"container":"container156776211427103908","blob":"blob156776211469702796"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776211427103908')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:34 GMT',
  'ETag',
  '"0x8D732AC970863DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26ff484d-a01e-001c-6295-64a5e3000000',
  'x-ms-client-request-id',
  'f358928d-3c7d-493e-b2f9-21b216006545',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776211427103908')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '552e27c4-f01e-0097-1595-64a18e000000',
  'x-ms-client-request-id',
  'bb112914-8da5-4053-9777-b4956489e0de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:34 GMT',
  'Connection',
  'close' ]);

