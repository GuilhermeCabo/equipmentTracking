export class Repository {
  constructor(model) {
    this.model = model;
  }

  matching = async ({
    filters = {},
    limit = 0,
    skip = 0,
    project = {},
    populate = null,
  }) => {
    const query = this.model.find(filters, project);

    if (limit) query.limit(limit);
    if (skip) query.skip(skip);
    if (populate)
      query.populate({
        path: populate.path,
        match: populate.query || {},
      });

    return await query.lean().exec();
  };

  aggregation = async (aggregationPipeline) => {
    return await this.model.aggregate(aggregationPipeline);
  };

  findById = async (id) => {
    return await this.model.findById(id);
  };

  persist = async ({ query, payload }) => {
    const document = await this.model.findOneAndUpdate(query, payload, {
      upsert: true,
      new: true,
    });

    console.log(document);

    return document;
  };
}
