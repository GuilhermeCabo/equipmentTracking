import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';

import { Repository } from './repository.js';
import { Uuid } from '../../domain/uuid.js';
import { exec } from 'node:child_process';

describe('Repository', () => {
  let repository;
  let mockModel;

  beforeEach(() => {
    mock.reset();

    let findOptions = {
      limit: mock.fn(() => {}),
      skip: mock.fn(() => {}),
      lean: mock.fn(() => {}),
      exec: mock.fn(() => Promise.resolve([{}])),
    };

    mockModel = {
      find: mock.fn(() => ({
        limit: mock.fn(() => findOptions),
        skip: mock.fn(() => findOptions),
        lean: mock.fn(() => findOptions),
        exec: mock.fn(() => Promise.resolve([{}])),
      })),
      findById: mock.fn(() => Promise.resolve({})),
      findOneAndUpdate: mock.fn((_, payload, __) => Promise.resolve(payload)),
      aggregate: mock.fn(() => Promise.resolve([])),
    };

    repository = new Repository(mockModel);
  });

  describe('matching', () => {
    it('should return an array of documents', async () => {
      // Arrange

      // Act
      const documents = await repository.matching({});

      // Assert
      assert.deepStrictEqual(documents, [{}]);
      assert.deepStrictEqual(documents[0], {});

      assert.equal(mockModel.find.mock.calls.length, 1);
    });
  });

  describe('findById', () => {
    it('should return a document', async () => {
      // Arrange

      // Act
      const document = await repository.findById(Uuid.random());

      // Assert
      assert.deepStrictEqual(document, {});
      assert.equal(mockModel.findById.mock.calls.length, 1);
    });
  });

  describe('persist', () => {
    it('should return a updated document', async () => {
      // Arrange

      // Act
      const document = await repository.persist({
        query: {},
        payload: { field: '123' },
      });

      // Assert
      assert.deepStrictEqual(document, { field: '123' });
      assert.strictEqual(mockModel.findOneAndUpdate.mock.calls.length, 1);
    });
  });

  describe('aggregation', () => {
    it('should return an array of documents', async () => {
      // Arrange

      // Act
      const document = await repository.aggregation();

      // Assert
      assert.deepStrictEqual(document, []);
      assert.strictEqual(mockModel.aggregate.mock.calls.length, 1);
    });
  });
});
