import { InkRecognitionUnit } from './InkRecognitionUnit';
import { InkPoint } from './BaseType'

export interface InkDrawing extends InkRecognitionUnit {
  center: InkPoint;
  confidence: number;
  recognizedShape: string;
  rotationAngle: number;
  points: InkPoint[];
  alternates: InkDrawing[];
}