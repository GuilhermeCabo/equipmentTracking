import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { CheckoutsRepository } from './checkouts.repository.js';
import { checkoutStatusEnum } from '../../../domain/enum/checkoutStatus.enum.js';

describe('CheckoutsRepository', () => {
  let checkoutsRepository;
  let mockCheckout;

  beforeEach(() => {
    mock.reset();

    checkoutsRepository = new CheckoutsRepository();

    mockCheckout = {
      _id: '9c094a18-8835-4af4-8366-a68152188cdb',
      jobId: '1234',
      equipment: {
        _id: '9c094a18-8835-4af4-8366-a68152188cdb',
        name: 'Fork',
      },
      status: checkoutStatusEnum.ON_GOING,
    };

    mock.method(
      checkoutsRepository,
      'aggregation',
      mock.fn(async () => Promise.resolve([mockCheckout])),
    );
  });

  describe('execute', () => {
    it('should return the last equipment checkout', async () => {
      // Arrange

      // Act
      const equipmentCheckout =
        await checkoutsRepository.getLastEquipmentCheckout([]);

      // Assert
      assert.strictEqual(equipmentCheckout, mockCheckout);
      assert.equal(checkoutsRepository.aggregation.mock.calls.length, 1);
    });
  });
});
