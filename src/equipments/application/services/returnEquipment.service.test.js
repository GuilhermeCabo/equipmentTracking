import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { ReturnEquipmentService } from './returnEquipment.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';
import { BadData } from '../../../shared/domain/errors/badData.js';

describe('ReturnEquipmentService', () => {
  let returnEquipmentService;
  let mockCheckout;

  beforeEach(() => {
    mock.reset();

    returnEquipmentService = new ReturnEquipmentService();

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
      returnEquipmentService.getLastEquipmentCheckoutService,
      'execute',
      mock.fn(async () => Promise.resolve(mockCheckout)),
    );

    mock.method(
      returnEquipmentService.updateCheckoutService,
      'execute',
      mock.fn(async () => Promise.resolve()),
    );

    mock.method(
      returnEquipmentService.updateEquipmentService,
      'execute',
      mock.fn(async () => Promise.resolve()),
    );
  });

  describe('execute', () => {
    it('should return the equipment', async () => {
      // Arrange

      // Act
      await returnEquipmentService.execute(Uuid.random());

      // Assert
      assert.equal(
        returnEquipmentService.getLastEquipmentCheckoutService.execute.mock
          .calls.length,
        1,
      );
      assert.equal(
        returnEquipmentService.updateCheckoutService.execute.mock.calls.length,
        1,
      );
      assert.equal(
        returnEquipmentService.updateEquipmentService.execute.mock.calls.length,
        1,
      );
    });

    it('should return the equipment', async () => {
      // Arrange
      mock.method(
        returnEquipmentService.getLastEquipmentCheckoutService,
        'execute',
        mock.fn(async () => Promise.resolve(null)),
      );

      let error;

      // Act
      await returnEquipmentService
        .execute(Uuid.random())
        .catch((err) => (error = err));

      // Assert
      assert.equal(
        returnEquipmentService.getLastEquipmentCheckoutService.execute.mock
          .calls.length,
        1,
      );
      assert.equal(
        returnEquipmentService.updateCheckoutService.execute.mock.calls.length,
        0,
      );
      assert.equal(
        returnEquipmentService.updateEquipmentService.execute.mock.calls.length,
        0,
      );
      assert.notEqual(error, null);
      assert.notEqual(error, undefined);
      assert.equal(error.statusCode, 400);
      assert.equal(Boolean(error instanceof BadData), true);
    });
  });
});
