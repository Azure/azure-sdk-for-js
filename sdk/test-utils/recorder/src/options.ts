import { createPipelineRequest, HttpClient } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths";
import { RecorderError } from "./utils/utils";

export type RecordingOptions = {
  HandleRedirects?: boolean;
};

export async function setRecordingOptions(
  recorderUrl: string,
  httpClient: HttpClient,
  options: RecordingOptions
) {
  const body = JSON.stringify(options);

  const request = createPipelineRequest({
    url: `${recorderUrl}${paths.admin}${paths.setRecordingOptions}`,
    method: "POST",
    body,
  });

  const response = await httpClient.sendRequest(request);

  if (response.status < 200 || response.status > 299) {
    throw new RecorderError(`setRecordingOptions failed: ${response.bodyAsText}`);
  }
}
