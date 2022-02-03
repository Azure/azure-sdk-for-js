let nock = require('nock');

module.exports.hash = "145b4bc9a9cca59c3e8d3e47ae097a45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/v1/objects/0-wus-d8-9c3c0c769f74d4bb8f8c6af86257dec2/content/acsmetadata')
  .reply(200, {"resourceId":"e333a5b5-c1e4-4984-b752-447bf92d10b7","callId":"f954192d-52ef-4385-85e3-50662ca971ae","chunkDocumentId":"0-wus-d8-9c3c0c769f74d4bb8f8c6af86257dec2","chunkIndex":0,"chunkStartTime":"2022-02-02T12:07:03.5246240Z","chunkDuration":23820,"pauseResumeIntervals":[],"recordingInfo":{"contentType":"audioVideo","channelType":"mixed","format":"mp4","audioConfiguration":{"sampleRate":16000,"bitRate":128000,"channels":1},"videoConfiguration":{"longerSideLength":1920,"shorterSideLength":1080,"framerate":15,"bitRate":1000000}},"participants":[{"participantId":"8:acs:e333a5b5-c1e4-4984-b752-447bf92d10b7_0000000f-5a35-fb16-02c3-593a0d00053c"},{"participantId":"8:acs:e333a5b5-c1e4-4984-b752-447bf92d10b7_0000000f-5a36-3141-e3c7-593a0d00fc67"}]}, [
  'Date',
  'Wed, 02 Feb 2022 12:30:59 GMT',
  'Content-Type',
  'application/octet-stream',
  'Server',
  'Kestrel',
  'Content-Length',
  '959',
  'Cache-Control',
  'no-cache, max-age=0, s-maxage=0, private',
  'Content-Range',
  'bytes 0-958/959',
  'Last-Modified',
  'Wed, 02 Feb 2022 12:07:29 GMT',
  'MS-CV',
  'OZF5wMmbf0atmdM+TaeFxA.0',
  'Strict-Transport-Security',
  'max-age=2592000; includeSubDomains'
]);
