import { InkRecognitionUnit } from './InkRecognitionUnit';

export interface InkWord extends InkRecognitionUnit {
  alternates: string[];
  text: string;
}