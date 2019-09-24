import * as corehttp from "@azure/core-http";
import { InkRecognitionRoot } from './InkRecognitionRoot';

export interface InkRecognitionResultMetadata {
  status:number;
  responseText: string;
  headers: corehttp.HttpHeaders;
}

export type InkRecognitionResult = InkRecognitionResultMetadata & InkRecognitionRoot;