module.exports = class CompareFileLists {
  constructor(list1, list2) {
    this.alpha_hash_list = list1;
    this.bravo_hash_list = list2;
    this.lastComparedList = {};
  }

  compare() {
    const set = new Set(this.bravo_hash_list);
    const results = {
      unchanged: [],
      added: []
    };

    this.alpha_hash_list.forEach(hash => {
      if (set.has(hash)) {
        results.unchanged.push(hash);
        set.delete(hash);
      } else {
        results.added.push(hash);
      }
    });

    results["removed"] = Array.from(set);
    this.lastComparedList = results;

    return results;
  }

  consume() {
    const results = [];

    for (let key in this.lastComparedList) {
      this.lastComparedList[key].forEach(hash => {
        results.push({ hash, change_type: key });
      });
    }

    return results;
  }
};
