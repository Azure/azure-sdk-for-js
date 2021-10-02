let nock = require('nock');

module.exports.hash = "b849d123819184d0401db793f4f0c93f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://us-storage.asm.skype.com:443', {"encodedQueryParams":true})
  .get('/v1/objects/0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242/content/acsmetadata')
  .reply(200, {"resourceId":"631fa8d8-aab5-4ac5-8e15-261aa2590750","callId":"36cf910b-932c-4101-a443-04e11a98aba5","chunkDocumentId":"0-eus-d16-4d30207fd28f8fe681e1d5523b1ba242","chunkIndex":0,"chunkStartTime":"2021-09-30T22:24:34.9497016Z","chunkDuration":19320,"pauseResumeIntervals":[{"startTime":"2021-09-30T22:24:37.9450001Z","duration":5220}],"recordingInfo":{"contentType":"mixed","channelType":"audioVideo","format":"mp4","audioConfiguration":{"sampleRate":16000,"bitRate":128000,"channels":1},"videoConfiguration":{"longerSideLength":1920,"shorterSideLength":1080,"framerate":8,"bitRate":1000000}},"participants":[{"participantId":"8:acs:631fa8d8-aab5-4ac5-8e15-261aa2590750_0000000c-d8b0-8adc-73ff-234822000345"},{"participantId":"8:acs:631fa8d8-aab5-4ac5-8e15-261aa2590750_0000000c-d8ac-54af-5bf4-343a0d0001ac"}]}, [
  'Cache-Control',
  'no-cache, max-age=0, s-maxage=0, private',
  'Content-Length',
  '1055',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-1054/1055',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Fri, 01 Oct 2021 23:29:13 GMT'
]);
