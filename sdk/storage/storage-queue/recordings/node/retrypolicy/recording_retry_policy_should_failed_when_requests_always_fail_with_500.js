let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758135069201422"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758135069201422')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b186188-a003-013c-02f0-622049000000',
  'x-ms-client-request-id',
  'fe22da0a-fab8-4787-85a5-e977dfff7da5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758135069201422')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e4dfec70-9003-0028-43f0-62962b000000',
  'x-ms-client-request-id',
  '9a1ae92e-fbf2-4704-806e-5fae708809b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:54 GMT',
  'Connection',
  'close' ]);

