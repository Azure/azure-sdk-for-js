let nock = require('nock');

module.exports.hash = "f5ed124a4d96fcaafa13bf1086da293e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/tableClientTestSASConnectionStringnode()')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode","value":[{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.0306156Z'\"","PartitionKey":"listEntitiesTest","RowKey":"0","Timestamp":"2021-09-14T21:23:57.0306156Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.1346893Z'\"","PartitionKey":"listEntitiesTest","RowKey":"1","Timestamp":"2021-09-14T21:23:57.1346893Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.9572797Z'\"","PartitionKey":"listEntitiesTest","RowKey":"10","Timestamp":"2021-09-14T21:23:57.9572797Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.0553495Z'\"","PartitionKey":"listEntitiesTest","RowKey":"11","Timestamp":"2021-09-14T21:23:58.0553495Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.138409Z'\"","PartitionKey":"listEntitiesTest","RowKey":"12","Timestamp":"2021-09-14T21:23:58.138409Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.2594958Z'\"","PartitionKey":"listEntitiesTest","RowKey":"13","Timestamp":"2021-09-14T21:23:58.2594958Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.3615694Z'\"","PartitionKey":"listEntitiesTest","RowKey":"14","Timestamp":"2021-09-14T21:23:58.3615694Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.4636426Z'\"","PartitionKey":"listEntitiesTest","RowKey":"15","Timestamp":"2021-09-14T21:23:58.4636426Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.5457009Z'\"","PartitionKey":"listEntitiesTest","RowKey":"16","Timestamp":"2021-09-14T21:23:58.5457009Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.6687888Z'\"","PartitionKey":"listEntitiesTest","RowKey":"17","Timestamp":"2021-09-14T21:23:58.6687888Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.7708609Z'\"","PartitionKey":"listEntitiesTest","RowKey":"18","Timestamp":"2021-09-14T21:23:58.7708609Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A58.8749352Z'\"","PartitionKey":"listEntitiesTest","RowKey":"19","Timestamp":"2021-09-14T21:23:58.8749352Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.2367629Z'\"","PartitionKey":"listEntitiesTest","RowKey":"2","Timestamp":"2021-09-14T21:23:57.2367629Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.3368346Z'\"","PartitionKey":"listEntitiesTest","RowKey":"3","Timestamp":"2021-09-14T21:23:57.3368346Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.4228963Z'\"","PartitionKey":"listEntitiesTest","RowKey":"4","Timestamp":"2021-09-14T21:23:57.4228963Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.5069565Z'\"","PartitionKey":"listEntitiesTest","RowKey":"5","Timestamp":"2021-09-14T21:23:57.5069565Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.5930178Z'\"","PartitionKey":"listEntitiesTest","RowKey":"6","Timestamp":"2021-09-14T21:23:57.5930178Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.6770784Z'\"","PartitionKey":"listEntitiesTest","RowKey":"7","Timestamp":"2021-09-14T21:23:57.6770784Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.7581361Z'\"","PartitionKey":"listEntitiesTest","RowKey":"8","Timestamp":"2021-09-14T21:23:57.7581361Z","foo":"testEntity"},{"odata.etag":"W/\"datetime'2021-09-14T21%3A23%3A57.8502021Z'\"","PartitionKey":"listEntitiesTest","RowKey":"9","Timestamp":"2021-09-14T21:23:57.8502021Z","foo":"testEntity"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2331-0002-0039-46ae-a9c11b000000',
  'x-ms-client-request-id',
  '9a93bf36-6823-4cfb-a836-feb135b34dd9',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:23:59 GMT'
]);
