import { Uuid } from './shared/domain/uuid.js';

export const swagger = {
  swagger: '2.0',
  info: {
    title: 'Equipment Tracking',
    description: 'API Equipment Tracking',
    version: '1.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  tags: [
    {
      name: 'Equipments',
    },
  ],
  paths: {
    '/equipments': {
      get: {
        summary: 'List Equipments',
        tags: ['Equipments'],
        description: 'List equipments',
        operationId: 'LIST_EQUIPMENTS',
        parameters: [
          {
            name: 'name',
            in: 'query',
            description: 'Equipment Name',
            required: false,
            schema: {
              type: 'string',
              example: 'Fork',
            },
          },
          {
            name: 'location',
            in: 'query',
            description: 'Equipment current Location',
            required: false,
            schema: {
              type: 'string',
              example: 'Brooklyn',
            },
          },
          {
            name: 'status',
            in: 'query',
            description: 'Equipment current Status',
            required: false,
            schema: {
              type: 'string',
              example: 'available',
            },
            enum: ['available', 'rented'],
          },
        ],
        responses: {
          200: {
            description: 'Succesful operation',
          },
        },
      },
    },
    '/equipments/:equipmentId/checkout': {
      post: {
        summary: 'Check-outs a equipment for rent',
        tags: ['Equipments'],
        description: 'Check-out an equipment',
        operationId: 'CHECKOUT_EQUIPMENT',
        parameters: [
          {
            name: 'equipmentId',
            in: 'params',
            description: 'Equipment ID',
            required: true,
            schema: {
              type: 'string',
              example: Uuid.random(),
            },
          },
          {
            name: 'jobId',
            in: 'body',
            description: 'Job ID',
            required: true,
            schema: {
              type: 'string',
              example: Uuid.random(),
            },
          },
        ],
        responses: {
          201: {
            description: 'Succesful operation, check-outs an equipment',
          },
          400: {
            description:
              'Equipment has already been checked-out by someone else',
          },
          404: {
            description: 'Equipment not found',
          },
        },
      },
    },
    '/equipments/:equipmentId/return': {
      post: {
        summary: 'Returns a rented equipment',
        tags: ['Equipments'],
        description: 'Return a equipment after a check-out',
        operationId: 'RETURN_EQUIPMENT',
        parameters: [
          {
            name: 'equipmentId',
            in: 'params',
            description: 'Equipment ID',
            required: true,
            schema: {
              type: 'string',
              example: Uuid.random(),
            },
          },
          {
            name: 'location',
            in: 'body',
            description: 'Equipment returning location',
            required: true,
            schema: {
              type: 'string',
              example: "Hell's Kitchen",
            },
          },
        ],
        responses: {
          201: {
            description: 'Succesful operation, returns a checked-out equipment',
          },
          400: {
            description:
              "Equipment has not being checked-out, so it can' be returned",
          },
        },
      },
    },
  },
};
