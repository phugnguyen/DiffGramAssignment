module.exports = class CompareFileLists {
  constructor(list1, list2) {
    this.alpha_hash_list = list1;
    this.bravo_hash_list = list2;
    this.lastComparedList = {};

    this.consume = this.consume.bind(this);
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

  printResults() {
    console.log(`Input: alpha_hash_list: ${this.alpha_hash_list}`);
    console.log(`Input: bravo_hash_list: ${this.bravo_hash_list} \n`);

    console.log("Results ... \n");
    this.consume().forEach(result => {
      console.log(result);
    });
  }
};
