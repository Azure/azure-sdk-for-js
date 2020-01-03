let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816827484609798"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816827484609798')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6894f10-b003-0002-1d47-686406000000',
  'x-ms-client-request-id',
  '7262125e-39cf-493b-8873-f772ca3fdb95',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:54 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816827484609798')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8bd06823-7003-001f-4247-68bdec000000',
  'x-ms-client-request-id',
  '5fa1adba-0c5b-4dc4-be58-6da79d4d496b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:17:55 GMT' ]);

