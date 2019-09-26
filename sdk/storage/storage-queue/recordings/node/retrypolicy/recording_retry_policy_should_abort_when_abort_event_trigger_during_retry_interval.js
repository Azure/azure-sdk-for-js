let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758134786205662"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134786205662')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f5b8e9b-d003-0154-73f0-6246d9000000',
  'x-ms-client-request-id',
  '9dd5e60c-5416-4ff1-a23a-8193d4a02636',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758134786205662')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45aa05a0-d003-00dd-34f0-620201000000',
  'x-ms-client-request-id',
  '3d612a89-80d8-45b3-9088-ba6df671c6bc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:50 GMT',
  'Connection',
  'close' ]);

