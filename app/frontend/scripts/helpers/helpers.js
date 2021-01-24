import { v4 as uuidv4 } from 'uuid';

export function addUUIDToCollection(collection) {
  collection.map((model) => (model.uuid = uuidv4()));
}

export function vueEditableProp(prop) {
  return {
    get() {
      return this[prop];
    },
    set(value) {
      this.$emit(`update:${prop}`, value);
    },
  };
}
