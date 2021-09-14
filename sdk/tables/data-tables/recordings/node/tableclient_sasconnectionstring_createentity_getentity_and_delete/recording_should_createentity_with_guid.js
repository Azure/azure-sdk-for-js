let nock = require('nock');

module.exports.hash = "69bd9ea5f4e3b945fa8d1b27c65e8da3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P3_node","RowKey":"R3","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c","testField@odata.type":"Edm.Guid"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A00.9113899Z'"`,
  'Location',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2402-0002-0039-0cae-a9c11b000000',
  'x-ms-client-request-id',
  'b0bb8d54-7c18-415e-9cdc-d7381b0cc9e8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://fakeaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')",
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode(PartitionKey=\'P3_node\',RowKey=\'R3\')')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-09-14T21%3A24%3A00.9113899Z'\"","PartitionKey":"P3_node","RowKey":"R3","Timestamp":"2021-09-14T21:24:00.9113899Z","testField@odata.type":"Edm.Guid","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-09-14T21%3A24%3A00.9113899Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced240f-0002-0039-18ae-a9c11b000000',
  'x-ms-client-request-id',
  '6ff1f52d-991b-4ff5-8a1f-8a23ed33f116',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/tableClientTestSASConnectionStringnode(PartitionKey=\'P3_node\',RowKey=\'R3\')')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced241d-0002-0039-24ae-a9c11b000000',
  'x-ms-client-request-id',
  'f7d16cbf-59fa-47f0-bf98-ca07e70aebd7',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:24:00 GMT'
]);
