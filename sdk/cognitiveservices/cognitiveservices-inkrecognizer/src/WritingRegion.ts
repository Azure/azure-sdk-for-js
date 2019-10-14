import { InkRecognitionUnit } from './InkRecognitionUnit';
import { Paragraph } from './Paragraph';

export interface WritingRegion extends InkRecognitionUnit {
  paragraphs: Paragraph[];
}