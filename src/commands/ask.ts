import type { Command } from 'commander';

import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';

export async function handleAsk(this: Command, question: string): Promise<void> {
  const spinner = createSpinner('Thinking about your question');
  spinner.start();

  await new Promise((resolve) => setTimeout(resolve, 300));
  spinner.succeed('Question captured');
  logger.info(`Ask stub received: ${question}`);
}
