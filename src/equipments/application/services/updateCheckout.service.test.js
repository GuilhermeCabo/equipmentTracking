import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { UpdateCheckoutService } from './updateCheckout.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';

describe('UpdateCheckoutService', () => {
  let updateCheckoutService;
  let mockCheckout;

  beforeEach(() => {
    mock.reset();

    updateCheckoutService = new UpdateCheckoutService();

    mockCheckout = {
      _id: '9c094a18-8835-4af4-8366-a68152188cdb',
      jobId: '1234',
      equipmentId: '9c094a18-8835-4af4-8366-a68152188cdb',
      status: checkoutStatusEnum.ON_GOING,
    };

    mock.method(
      updateCheckoutService.repository,
      'persist',
      mock.fn(async ({ _, payload }) =>
        Promise.resolve({ ...mockCheckout, ...payload }),
      ),
    );
  });

  describe('execute', () => {
    it('should update the checkout', async () => {
      // Arrange

      // Act
      await updateCheckoutService.execute({
        checkoutId: Uuid.random(),
        payload: {},
      });

      // Assert
      assert.equal(
        updateCheckoutService.repository.persist.mock.calls.length,
        1,
      );
    });
  });
});
