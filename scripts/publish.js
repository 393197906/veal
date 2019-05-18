#!/usr/bin/env node

const shell = require('shelljs');
const { join } = require('path');
const { fork } = require('child_process');

if (
  shell
    .exec('npm config get registry')
    .stdout.indexOf('https://registry.npmjs.org/') === -1
) {
  console.error(
    'Failed: set npm registry to https://registry.npmjs.org/ first',
  );
  process.exit(1);
}

const cwd = process.cwd();
const ret = shell.exec('npx lerna updated').stdout;
const updatedRepos = ret
  .split('\n')
  .map(line => line.replace('- ', ''))
  .filter(line => line !== '');
if (updatedRepos.length === 0) {
  console.log('No package is updated.');
  process.exit(0);
}

const { code: buildCode } = shell.exec('npm run build');
if (buildCode === 1) {
  console.error('Failed: npm run build');
  process.exit(1);
}

const cp = fork(
  join(process.cwd(), 'lerna'),
  ['publish'].concat(process.argv.slice(2)),
  {
    stdio: 'inherit',
    cwd: process.cwd(),
  },
);
cp.on('error', err => {
  console.log(err);
});
cp.on('close', code => {
  console.log('code', code);
  if (code === 1) {
    console.error('Failed: lerna publish');
    process.exit(1);
  }
});
