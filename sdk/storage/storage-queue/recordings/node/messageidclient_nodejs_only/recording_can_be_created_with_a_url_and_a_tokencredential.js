let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816839477105190"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816839477105190')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9a521c7-6003-0022-5447-6808ca000000',
  'x-ms-client-request-id',
  '360c1585-6213-47c6-9e50-fe5a84b58d01',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:54 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816839477105190')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5ce9915-6003-0066-7247-68d4a6000000',
  'x-ms-client-request-id',
  '7e172293-f571-4a57-b7ef-099ddd8cc120',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:55 GMT' ]);

