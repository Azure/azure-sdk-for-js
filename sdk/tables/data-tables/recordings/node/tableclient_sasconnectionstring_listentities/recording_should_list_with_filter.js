let nock = require('nock');

module.exports.hash = "e8e5ae253ad116417c99b446f8d12b7d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.7611971Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-06-09T16:21:43.7611971Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.8092308Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-06-09T16:21:43.8092308Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.199509Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-06-09T16:21:44.199509Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.2325316Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-06-09T16:21:44.2325316Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.2815665Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-06-09T16:21:44.2815665Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.3536177Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-06-09T16:21:44.3536177Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.3886426Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-06-09T16:21:44.3886426Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.42667Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-06-09T16:21:44.42667Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.4576921Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-06-09T16:21:44.4576921Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.5097291Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-06-09T16:21:44.5097291Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.5417514Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-06-09T16:21:44.5417514Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.5717723Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-06-09T16:21:44.5717723Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.8682736Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-06-09T16:21:43.8682736Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.9213113Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-06-09T16:21:43.9213113Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.964341Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-06-09T16:21:43.964341Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A43.9973645Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-06-09T16:21:43.9973645Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.0504022Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-06-09T16:21:44.0504022Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.0844268Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-06-09T16:21:44.0844268Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.1184506Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-06-09T16:21:44.1184506Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-06-09T16%3A21%3A44.1644837Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-06-09T16:21:44.1644837Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654ef000-9002-001e-484b-5d5b52000000',
  'x-ms-client-request-id',
  '6a14a458-68fb-4ce4-99e3-1dd883325783',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:44 GMT'
]);
