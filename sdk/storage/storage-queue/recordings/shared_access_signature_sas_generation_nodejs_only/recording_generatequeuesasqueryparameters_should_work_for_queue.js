let nock = require('nock');

module.exports.testInfo = {"now":"2019-04-22T21:00:16.041Z","tmr":"2019-04-22T21:00:16.041Z","queue":"queue155596681604102999"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155596681604102999')
  .query({"timeout":"30"})
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '276a4a0b-d003-0096-3d4e-f9ff6c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:16 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue155596681604102999')
  .query({"sv":"2016-05-31","spr":"https%2Chttp","st":"2019-04-22T20%3A55%3A16Z","se":"2019-04-23T21%3A00%3A16Z","sip":"0.0.0.0-255.255.255.255","sp":"raup","sig":"fM%2F74mpM%2BHNH7GM8%2BEhQ8gmLjTinusS98NR7LmR%2BvVY%3D","comp":"metadata","timeout":"30"})
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '271dfe1a-1003-006e-214e-f93471000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-approximate-messages-count',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:15 GMT',
  'Connection',
  'close' ]);


nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155596681604102999')
  .query({"timeout":"30"})
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f200db3d-6003-008f-544e-f9d304000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Mon, 22 Apr 2019 21:00:16 GMT',
  'Connection',
  'close' ]);
