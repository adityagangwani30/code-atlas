import { promises as fs } from 'node:fs';
import type { Command } from 'commander';
import inquirer from 'inquirer';

import { StaticAnalyzer } from '../analyzer/index.js';
import { DocumentGenerator } from '../generator/index.js';
import { getAtlasOutputDirectory } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export interface GenerateOptions {
  ai?: boolean;
  focus?: string;
  format?: 'md' | 'html';
}

export async function handleGenerate(this: Command, _options: GenerateOptions): Promise<void> {
  void _options;
  const cwd = process.cwd();
  const outputDirectory = getAtlasOutputDirectory(cwd);
  const outputExists = await directoryHasContents(outputDirectory);

  if (outputExists) {
    const { overwriteMode } = await inquirer.prompt<{ overwriteMode: 'yes' | 'no' | 'merge' }>([
      {
        type: 'list',
        name: 'overwriteMode',
        message: 'Atlas exists. Overwrite? (yes/no/merge)',
        choices: [
          { name: 'yes', value: 'yes' },
          { name: 'no', value: 'no' },
          { name: 'merge', value: 'merge' }
        ],
        default: 'merge'
      }
    ]);

    if (overwriteMode === 'no') {
      logger.info('Generation cancelled.');
      return;
    }

    if (overwriteMode === 'yes') {
      await fs.rm(outputDirectory, { recursive: true, force: true });
    }
  }

  const startedAt = process.hrtime.bigint();
  const analyzer = new StaticAnalyzer(cwd);
  const analysis = await analyzer.analyze();
  const generator = new DocumentGenerator(analysis, outputDirectory);
  const result = await generator.generate('merge');
  const elapsedSeconds = Number(process.hrtime.bigint() - startedAt) / 1_000_000_000;

  console.log(`✓ Generated ${result.generatedFiles.length} documents in /docs/atlas/`);
  for (const fileName of result.generatedFiles) {
    console.log(`✓ ${fileName}`);
  }
  console.log(`Time: ${elapsedSeconds.toFixed(1)}s`);
}

async function directoryHasContents(directoryPath: string): Promise<boolean> {
  try {
    const entries = await fs.readdir(directoryPath);
    return entries.length > 0;
  } catch {
    return false;
  }
}
