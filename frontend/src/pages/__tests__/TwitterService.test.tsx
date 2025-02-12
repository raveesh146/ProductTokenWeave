import { describe, it} from 'vitest';
import { getTwitterData } from '../TwitterService';

describe('Twitter API Test', () => {
  it('should log Coinbase Twitter data', async () => {
    const data = await getTwitterData('@coinbase');
    console.log(JSON.stringify(data, null, 2));
  });
}); 