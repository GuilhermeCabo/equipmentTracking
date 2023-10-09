export class EquipmentsSerializer {
  serialize({ _id: id, name, status, location }) {
    return {
      id,
      name,
      status,
      location,
    };
  }
}
