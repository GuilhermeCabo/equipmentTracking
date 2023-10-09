import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { UpdateEquipmentService } from './updateEquipment.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';
import { equipmentStatusEnum } from '../../domain/enum/equipmentStatus.enum.js';

describe('UpdateEquipmentService', () => {
  let updateEquipmentService;
  let mockEquipment;

  beforeEach(() => {
    mock.reset();

    updateEquipmentService = new UpdateEquipmentService();

    mockEquipment = {
      _id: '9c094a18-8835-4af4-8366-a68152188cdb',
      jobId: '1234',
      equipmentId: '9c094a18-8835-4af4-8366-a68152188cdb',
      status: equipmentStatusEnum.ON_GOING,
    };

    mock.method(
      updateEquipmentService.repository,
      'persist',
      mock.fn(async ({ _, payload }) =>
        Promise.resolve({ ...mockEquipment, ...payload }),
      ),
    );
  });

  describe('execute', () => {
    it('should update the equipment', async () => {
      // Arrange

      // Act
      await updateEquipmentService.execute({
        equipmentId: Uuid.random(),
        payload: {},
      });

      // Assert
      assert.equal(
        updateEquipmentService.repository.persist.mock.calls.length,
        1,
      );
    });
  });
});
