let nock = require('nock');

module.exports.testInfo = {"container":"container156776197817807853"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776197817807853')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:18 GMT',
  'ETag',
  '"0x8D732AC45E68DBF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e2e61e7-901e-0038-1395-645343000000',
  'x-ms-client-request-id',
  '090ae274-500f-4202-bafb-296f278050de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776197817807853')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '73ab64d7-101e-0129-5795-6437fa000000',
  'x-ms-client-request-id',
  '73974373-c4c8-4058-a591-c8d0f1c9384f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:18 GMT',
  'Connection',
  'close' ]);

