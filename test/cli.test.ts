import { describe, expect, it } from 'vitest';
import path from 'node:path';

import { getAtlasOutputDirectory } from '../src/utils/fs.js';

describe('atlas output directory', () => {
  it('resolves docs/atlas relative to the current working directory', () => {
    expect(path.normalize(getAtlasOutputDirectory('C:/work/project'))).toBe(
      path.normalize('C:/work/project/docs/atlas')
    );
  });
});
