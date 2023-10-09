import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { GetLastEquipmentCheckoutService } from './getLastEquipmentCheckout.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';

describe('GetLastEquipmentCheckoutService', () => {
  let getLastEquipmentCheckoutService;
  let mockCheckout;

  beforeEach(() => {
    mock.reset();

    getLastEquipmentCheckoutService = new GetLastEquipmentCheckoutService();

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
      getLastEquipmentCheckoutService.repository,
      'aggregation',
      mock.fn(async () => Promise.resolve([mockCheckout])),
    );
  });

  describe('execute', () => {
    it('should return the last equipment checkout', async () => {
      // Arrange

      // Act
      const equipmentCheckout = await getLastEquipmentCheckoutService.execute(
        Uuid.random(),
      );

      // Assert
      assert.deepStrictEqual(equipmentCheckout, mockCheckout);

      assert.equal(
        getLastEquipmentCheckoutService.repository.aggregation.mock.calls
          .length,
        1,
      );
    });
  });
});
