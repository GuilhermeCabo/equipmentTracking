import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert';

import { CreateCheckoutService } from './createCheckout.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';

import { BadData } from '../../../shared/domain/errors/badData.js';
import { NotFound } from '../../../shared/domain/errors/notFound.js';

describe('CreateCheckoutService', () => {
  let createCheckoutService;
  let mockCheckout;

  beforeEach(() => {
    createCheckoutService = new CreateCheckoutService();

    mock.reset();

    mock.method(
      createCheckoutService.repository,
      'persist',
      mock.fn(() => Promise.resolve({ _id: '123' })),
    );

    mock.method(
      createCheckoutService.getLastEquipmentCheckoutService,
      'execute',
      mock.fn(() => Promise.resolve(null)),
    );

    mock.method(
      createCheckoutService.updateEquipmentService,
      'execute',
      mock.fn(() => Promise.resolve({})),
    );

    mock.method(
      createCheckoutService.getEquipmentByIdService,
      'execute',
      mock.fn(() => Promise.resolve({})),
    );
  });

  describe('execute', () => {
    it('should create and return a new checkout when the equipment is free', async () => {
      // Arrange

      // Act
      const checkout = await createCheckoutService.execute({
        jobId: Uuid.random(),
        equipmentId: Uuid.random(),
      });

      // Assert
      assert.notEqual(checkout, null);
      assert.notEqual(checkout, undefined);
      assert.strictEqual(
        createCheckoutService.repository.persist.mock.calls.length,
        1,
      );
      assert.strictEqual(
        createCheckoutService.getLastEquipmentCheckoutService.execute.mock.calls
          .length,
        1,
      );
      assert.strictEqual(
        createCheckoutService.getEquipmentByIdService.execute.mock.calls.length,
        1,
      );
      assert.strictEqual(
        createCheckoutService.updateEquipmentService.execute.mock.calls.length,
        1,
      );
    });

    it('should fail to create a new checkout when the equipment is already rented', async () => {
      // Arrange
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
        createCheckoutService.getLastEquipmentCheckoutService,
        'execute',
        mock.fn(() => Promise.resolve(mockCheckout)),
      );

      let error;

      // Act
      const checkout = await createCheckoutService
        .execute({
          jobId: Uuid.random(),
          equipmentId: Uuid.random(),
        })
        .catch((err) => {
          error = err;
        });

      // Assert
      assert.equal(checkout, undefined);
      assert.strictEqual(
        createCheckoutService.getLastEquipmentCheckoutService.execute.mock.calls
          .length,
        1,
      );
      assert.strictEqual(
        createCheckoutService.repository.persist.mock.calls.length,
        0,
      );
      assert.strictEqual(
        createCheckoutService.updateEquipmentService.execute.mock.calls.length,
        0,
      );
      assert.notEqual(error, null);
      assert.notEqual(error, undefined);
      assert.equal(error.statusCode, 400);
      assert.equal(Boolean(error instanceof BadData), true);
    });

    it('should fail to create a new checkout when the equipment does not exist', async () => {
      // Arrange
      mock.method(
        createCheckoutService.getEquipmentByIdService,
        'execute',
        mock.fn(() => Promise.resolve(null)),
      );

      let error;

      // Act
      const checkout = await createCheckoutService
        .execute({
          jobId: Uuid.random(),
          equipmentId: Uuid.random(),
        })
        .catch((err) => {
          error = err;
        });

      // Assert
      assert.equal(checkout, undefined);
      assert.strictEqual(
        createCheckoutService.getEquipmentByIdService.execute.mock.calls.length,
        1,
      );
      assert.strictEqual(
        createCheckoutService.getLastEquipmentCheckoutService.execute.mock.calls
          .length,
        0,
      );
      assert.strictEqual(
        createCheckoutService.repository.persist.mock.calls.length,
        0,
      );
      assert.strictEqual(
        createCheckoutService.updateEquipmentService.execute.mock.calls.length,
        0,
      );
      assert.notEqual(error, null);
      assert.notEqual(error, undefined);
      assert.equal(error.statusCode, 404);
      assert.equal(Boolean(error instanceof NotFound), true);
    });
  });
});
