import { v4 as uuidv4 } from 'uuid';

export function addUUIDToCollection(collection) {
  collection.map((model) => (model.uuid = uuidv4()));
}
