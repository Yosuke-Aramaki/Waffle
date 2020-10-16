import { expect } from 'chai';
import fsx from 'fs-extra';
import * as path from 'path';
import { tsGenerator } from 'ts-generator'
import { TypeChain } from 'typechain/dist/TypeChain';
import { compileAndSave } from '../../src';
import { Config, inputToConfig } from '../../src/config';

const sourceDirectory = './test/projects/example';
const outputDirectory = '../build';
const compilerVersion = 'v0.5.9+commit.e560f70d';
const config = inputToConfig({
  sourceDirectory,
  outputDirectory,
  compilerVersion
});


async function generateTypes(config: Config) {
  const outputDirName = 'types';
  await tsGenerator(
    {cwd: config.outputDirectory},
    new TypeChain({cwd: config.outputDirectory, rawConfig: {files: '*.json', outDir: outputDirName, target:  'ethers-v5'}}))
  return path.join(config.outputDirectory, outputDirName)
}

describe('Type generation with TypeChain', () => {
  before(() => {
    console.log({cwd: process.cwd()});
    fsx.removeSync(outputDirectory);
  });

  it('outputs types to specified directory', async () => {
    await compileAndSave(config);
    const outputDirectoryForTypes = await generateTypes(config);
    expect(outputDirectoryForTypes).to.eq(path.join(config.outputDirectory, 'types'));
    const BasicTokenFactory = (await import('../../'+outputDirectoryForTypes + '/index.ts')).BasicTokenFactory;
    expect(BasicTokenFactory.name).to.equal('BasicTokenFactory');
    expect(Object.getPrototypeOf(BasicTokenFactory).name).to.equal('ContractFactory');
  });
});
