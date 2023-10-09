import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { FindEquipmentsService } from './findEquipments.service.js';

describe('FindEquipmentsService', () => {
  let findEquipmentsService;
  let mockEquipment;

  beforeEach(() => {
    mock.reset();

    findEquipmentsService = new FindEquipmentsService();

    mockEquipment = {
      _id: '9c094a18-8835-4af4-8366-a68152188cdb',
      name: 'Fork',
    };

    mock.method(
      findEquipmentsService.repository,
      'matching',
      mock.fn(async () => Promise.resolve([mockEquipment])),
    );
  });

  describe('execute', () => {
    it('should return a list of equipments', async () => {
      // Arrange

      // Act
      const equipments = await findEquipmentsService.execute();

      // Assert
      assert.deepStrictEqual(equipments[0], mockEquipment);
      assert.equal(
        findEquipmentsService.repository.matching.mock.calls.length,
        1,
      );
    });
  });
});
