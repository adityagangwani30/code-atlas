import type { Command } from 'commander';

import { createSpinner } from '../utils/spinner.js';
import { logger } from '../utils/logger.js';

export async function handleOnboard(this: Command): Promise<void> {
  const spinner = createSpinner('Preparing onboarding flow');
  spinner.start();

  await new Promise((resolve) => setTimeout(resolve, 300));
  spinner.succeed('Onboarding flow ready');
  logger.info('Onboard stub initialized');
}
