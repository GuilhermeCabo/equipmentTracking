import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import { EquipmentsController } from './equipments.controller.js';

describe('EquipmentsController', () => {
  let equipmentsController;
  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    equipmentsController = new EquipmentsController();

    mock.reset();

    mockResponse.status = mock.fn(() => mockResponse);
    mockResponse.json = mock.fn(() => mockResponse);

    mock.method(
      equipmentsController.findEquipmentsService,
      'execute',
      mock.fn(() => Promise.resolve([])),
    );
  });

  describe('find', () => {
    it('should return a response with status', async () => {
      // Arrange
      mockRequest.query = {};

      // Act
      const response = await equipmentsController.find(
        mockRequest,
        mockResponse,
      );

      // Assert
      assert.strictEqual(
        equipmentsController.findEquipmentsService.execute.mock.calls.length,
        1,
      );
      assert.strictEqual(mockResponse.status.mock.calls.length, 1);
      assert.strictEqual(mockResponse.json.mock.calls.length, 1);
      assert.deepStrictEqual(response, mockResponse);
    });
  });
});
