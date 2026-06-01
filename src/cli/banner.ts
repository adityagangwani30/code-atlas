import chalk from 'chalk';
import figlet from 'figlet';

export function renderBanner(): string {
  const title = figlet.textSync('CodeAtlas', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80
  });

  return [
    chalk.cyanBright(title),
    chalk.gray('Atlas your codebase. Generate docs, explain context, and onboard faster.')
  ].join('\n');
}
