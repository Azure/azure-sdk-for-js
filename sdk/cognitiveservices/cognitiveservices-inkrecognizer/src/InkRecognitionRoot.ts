import { InkRecognitionUnit } from './InkRecognitionUnit';
import { InkBullet } from './InkBullet';
import { InkDrawing } from './InkDrawing';
import { InkWord } from './InkWord';
import { Line } from './Line';
import { Paragraph } from './Paragraph';
import { WritingRegion } from './WritingRegion';

export interface InkRecognitionRoot extends InkRecognitionUnit {
  inkBullets: InkBullet[];
  inkDrawings: InkDrawing[];
  inkWords: InkWord[];
  lines: Line[];
  paragraphs: Paragraph[];
  writingRegions: WritingRegion[];
}