import { createHttpHeaders, createPipelineRequest, HttpClient } from "@azure/core-rest-pipeline";
import { paths } from "./utils/paths";
import { RecorderError } from "./utils/utils";

export type RecordingOptions = {
  handleRedirects?: boolean;
  tlsValidationCert?: string;
};

export async function setRecordingOptions(
  recorderUrl: string,
  httpClient: HttpClient,
  { handleRedirects, tlsValidationCert }: RecordingOptions
) {
  const rawBody: Record<string, any> = {
    HandleRedirects: handleRedirects,
  };
  if (tlsValidationCert) {
    rawBody.Transport = {
      TLSValidationCert: tlsValidationCert,
    };
  }
  const body = JSON.stringify(rawBody);

  const request = createPipelineRequest({
    url: `${recorderUrl}${paths.admin}${paths.setRecordingOptions}`,
    method: "POST",
    body,
    allowInsecureConnection: true,
    headers: createHttpHeaders({
      "Content-Type": "application/json",
    }),
  });

  const response = await httpClient.sendRequest(request);

  if (response.status < 200 || response.status > 299) {
    throw new RecorderError(`setRecordingOptions failed: ${response.bodyAsText}`);
  }
}
