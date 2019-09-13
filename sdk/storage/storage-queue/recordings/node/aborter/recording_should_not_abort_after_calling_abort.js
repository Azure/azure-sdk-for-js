let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758129151902206"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758129151902206')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '858a0add-1003-0054-56f0-62b8d4000000',
  'x-ms-client-request-id',
  'fbc9ecc8-6d2c-4118-a831-f7e6ca2c534b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758129151902206')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68698680-e003-00a4-60f0-62fe25000000',
  'x-ms-client-request-id',
  '9908f834-6327-4690-8b3d-09a2fdca61e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:14:52 GMT',
  'Connection',
  'close' ]);

