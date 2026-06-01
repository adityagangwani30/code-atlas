#!/usr/bin/env node
import { Command } from 'commander';

import { renderBanner } from './banner.js';
import { handleAsk } from '../commands/ask.js';
import { handleExplain } from '../commands/explain.js';
import { handleGenerate } from '../commands/generate.js';
import { handleOnboard } from '../commands/onboard.js';
import { logger } from '../utils/logger.js';

const version = '0.1.0';

function buildProgram(): Command {
  const program = new Command();

  program
    .name('codeatlas')
    .description('CodeAtlas CLI for generating documentation, explanations, and onboarding workflows.')
    .version(version)
    .showHelpAfterError()
    .configureHelp({ sortSubcommands: true, sortOptions: true });

  program
    .command('generate')
    .description('Generate an atlas for the current project.')
    .option('--no-ai', 'Disable AI-assisted generation')
    .option('--focus <topic>', 'Focus generation on a topic')
    .option('--format <md|html>', 'Choose output format', 'md')
    .action(handleGenerate);

  program
    .command('explain <topic>')
    .description('Explain a topic in the current codebase.')
    .action(handleExplain);

  program
    .command('onboard')
    .description('Run an onboarding flow for a codebase.')
    .action(handleOnboard);

  program
    .command('ask <question...>')
    .description('Ask a question about the codebase.')
    .action((questionParts: string[]) => {
      return handleAsk.call(program, questionParts.join(' '));
    });

  program.action(() => {
    logger.info('Run codeatlas --help to view available commands.');
  });

  return program;
}

async function main(): Promise<void> {
  const program = buildProgram();
  if (process.argv.length <= 2) {
    console.log(renderBanner());
    console.log('');
    program.outputHelp();
    return;
  }

  await program.parseAsync(process.argv);
}

void main();
