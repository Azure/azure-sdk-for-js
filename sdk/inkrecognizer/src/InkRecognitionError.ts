import { HttpOperationResponse } from "@azure/core-http";
export interface InkRecognitionError{
  status: number;
  message: string;
  response: HttpOperationResponse;
}