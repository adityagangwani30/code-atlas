import path from 'node:path';

import type { Command } from 'commander';
import inquirer from 'inquirer';

import { createSpinner } from '../utils/spinner.js';
import { ensureDirectory, getAtlasOutputDirectory } from '../utils/fs.js';
import { logger } from '../utils/logger.js';

export interface GenerateOptions {
  ai?: boolean;
  focus?: string;
  format?: 'md' | 'html';
}

export async function handleGenerate(this: Command, options: GenerateOptions): Promise<void> {
  const spinner = createSpinner('Preparing atlas output');
  spinner.start();

  const outputDirectory = getAtlasOutputDirectory();
  await ensureDirectory(outputDirectory);
  spinner.succeed(`Output directory ready at ${outputDirectory}`);

  const answers = await inquirer.prompt<{ includeExamples: boolean }>([
    {
      type: 'confirm',
      name: 'includeExamples',
      message: 'Include starter examples?',
      default: true
    }
  ]);

  logger.info(
    `Generate stub running with format=${options.format ?? 'md'}, ai=${options.ai !== false}, focus=${options.focus ?? 'none'}, examples=${answers.includeExamples}`
  );

  const targetFile = path.join(outputDirectory, `atlas.${options.format ?? 'md'}`);
  logger.info(`Would write generated content to ${targetFile}`);
}
