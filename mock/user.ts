import json from '../public/assets/db.json';

export default {
  all: () => {
    const items = json.users;

    return {
      code: 20000,
      data: items,
    };
  },
};
