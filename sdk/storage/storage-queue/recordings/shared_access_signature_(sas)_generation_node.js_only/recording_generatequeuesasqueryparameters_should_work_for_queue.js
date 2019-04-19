let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-19T03:51:44.637Z","tmr":"2019-04-19T03:51:44.638Z","queue":"queue155564590463806965"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155564590463806965')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72921793-9003-0012-2d63-f6a944000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:44 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155564590463806965')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-19T03%3A46%3A44Z","se":"2019-04-20T03%3A51%3A44Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"otcgLkM%2BEFb9DR45qd12XzS8DjSJ8fTOZ1LoqPIJgDM%3D","comp":"metadata","timeout":"30"})
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d394f35-5003-008c-3163-f6d003000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:44 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155564590463806965')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '61c1b741-a003-0011-2063-f6aa43000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Fri, 19 Apr 2019 03:51:45 GMT',
  'Connection',
  'close' ]);
