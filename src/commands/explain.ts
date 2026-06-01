import type { Command } from 'commander';

import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';

export async function handleExplain(this: Command, topic: string): Promise<void> {
  const spinner = createSpinner(`Explaining ${topic}`);
  spinner.start();

  await new Promise((resolve) => setTimeout(resolve, 300));
  spinner.succeed(`Ready to explain ${topic}`);
  logger.info(`Explain stub received topic: ${topic}`);
}
