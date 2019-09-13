import { InkRecognitionUnit } from './InkRecognitionUnit';
import { Line } from './Line';

export interface Paragraph extends InkRecognitionUnit {
  lines: Line[];
}