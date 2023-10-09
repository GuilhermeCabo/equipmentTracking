export class CheckoutsSerializer {
  serialize({ _id: id, jobId, equipmentId, status }) {
    return {
      id,
      jobId,
      equipmentId,
      status,
    };
  }
}
