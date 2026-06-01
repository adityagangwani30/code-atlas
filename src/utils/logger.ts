import chalk from 'chalk';

const prefix = chalk.blueBright('[CodeAtlas]');

export const logger = {
  info(message: string): void {
    console.log(`${prefix} ${message}`);
  },
  success(message: string): void {
    console.log(`${chalk.greenBright('[success]')} ${message}`);
  },
  warn(message: string): void {
    console.warn(`${chalk.yellowBright('[warn]')} ${message}`);
  },
  error(message: string): void {
    console.error(`${chalk.redBright('[error]')} ${message}`);
  }
};
