import {MockProvider} from '../src';
import {deployTypedContract} from '../src/deployTypedContraсt';
import {Constantinople} from './projects/example/build/types';
import {ConstantinopleFactory} from './projects/example/build/types/ConstantinopleFactory';

describe('INTEGRATION: deployTypedContract', () => {
  const [wallet] = new MockProvider().getWallets();

  it('successfully deploys contract', async () => {
    const contract: Constantinople = await deployTypedContract(wallet, ConstantinopleFactory, []);
  });
});
