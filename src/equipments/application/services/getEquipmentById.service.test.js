import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { GetEquipmentByIdService } from './getEquipmentById.service.js';
import { Uuid } from '../../../shared/domain/uuid.js';

describe('GetEquipmentByIdService', () => {
  let getEquipmentByIdService;
  let mockEquipment;

  beforeEach(() => {
    mock.reset();

    getEquipmentByIdService = new GetEquipmentByIdService();

    mockEquipment = {
      _id: '9c094a18-8835-4af4-8366-a68152188cdb',
      name: 'Fork',
    };

    mock.method(
      getEquipmentByIdService.repository,
      'findById',
      mock.fn(async () => Promise.resolve(mockEquipment)),
    );
  });

  describe('execute', () => {
    it('should return an equipment', async () => {
      // Arrange

      // Act
      const equipment = await getEquipmentByIdService.execute(Uuid.random());

      // Assert
      assert.deepStrictEqual(equipment, mockEquipment);

      assert.equal(
        getEquipmentByIdService.repository.findById.mock.calls.length,
        1,
      );
    });
  });
});
