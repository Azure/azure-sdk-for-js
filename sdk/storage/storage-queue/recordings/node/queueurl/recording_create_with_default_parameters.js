let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758134032305083"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134032305083')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84f4b9d8-9003-0137-19f0-62db22000000',
  'x-ms-client-request-id',
  '7783508b-bfa7-43d8-a5b8-7125a242a261',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758134032305083')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '805e1d4d-9003-005a-17f0-629164000000',
  'x-ms-client-request-id',
  '62ba996d-cff7-4994-858c-0a6452a20abd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:40 GMT',
  'Connection',
  'close' ]);

