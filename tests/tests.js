const { expect } = require("chai");
const CompareFileLists = require("../src/main.js");

const alpha_hash_list = [
  "7aec47f359bb75b768eeb95fa73b3a22d2fb053f6db3bb38daaff289512194c6",
  "f05e411f0e98d2ea40dcd2630d9e87a3587e61f44e28c9ab93925aa652c354f0",
  "813c9c630a770b91a829b072ae69b3582092a51d8406d5c3c18da1e3080f3452"
];

const bravo_hash_list = [
  "7aec47f359bb75b768eeb95fa73b3a22d2fb053f6db3bb38daaff289512194c6",
  "f05e411f0e98d2ea40dcd2630d9e87a3587e61f44e28c9ab93925aa652c354f0",
  "caccfde4071a22b06a5c7897c54cfe2d8812a254714882e80c7ff75aac6fa187"
];

describe("CompareFileLists class", () => {
  let compareFileLists;

  beforeEach(() => {
    compareFileLists = new CompareFileLists(alpha_hash_list, bravo_hash_list);
  });

  it("Should have a constructor", () => {
    expect(compareFileLists).to.exist;
  });

  it("Should instantiate properties", () => {
    expect(compareFileLists.alpha_hash_list).to.deep.equal(alpha_hash_list);
    expect(compareFileLists.bravo_hash_list).to.deep.equal(bravo_hash_list);
  });

  it("Should have methods", () => {
    expect(compareFileLists.compare).to.be.a("function");
    expect(compareFileLists.consume).to.be.a("function");
  });
});

describe("CompareFileLists functionality", () => {
  let compareFileLists;

  // If compare functionality is broken, all consume functionality
  // will break due to the dependence of it working properly

  beforeEach(() => {
    compareFileLists = new CompareFileLists(alpha_hash_list, bravo_hash_list);
  });

  it("Should compare lists correctly", () => {
    const expected = {
      unchanged: [
        "7aec47f359bb75b768eeb95fa73b3a22d2fb053f6db3bb38daaff289512194c6",
        "f05e411f0e98d2ea40dcd2630d9e87a3587e61f44e28c9ab93925aa652c354f0"
      ],
      added: [
        "813c9c630a770b91a829b072ae69b3582092a51d8406d5c3c18da1e3080f3452"
      ],
      removed: [
        "caccfde4071a22b06a5c7897c54cfe2d8812a254714882e80c7ff75aac6fa187"
      ]
    };
    expect(compareFileLists.compare()).to.deep.equal(expected);
  });

  it("Should consume lists correctly", () => {
    compareFileLists.compare();
    const expected = [
      {
        hash:
          "7aec47f359bb75b768eeb95fa73b3a22d2fb053f6db3bb38daaff289512194c6",
        change_type: "unchanged"
      },
      {
        hash:
          "f05e411f0e98d2ea40dcd2630d9e87a3587e61f44e28c9ab93925aa652c354f0",
        change_type: "unchanged"
      },
      {
        hash:
          "813c9c630a770b91a829b072ae69b3582092a51d8406d5c3c18da1e3080f3452",
        change_type: "added"
      },
      {
        hash:
          "caccfde4071a22b06a5c7897c54cfe2d8812a254714882e80c7ff75aac6fa187",
        change_type: "removed"
      }
    ];

    expect(compareFileLists.consume()).to.deep.equal(expected);
  });
});

// print out results one at a time in the console.
let compareFileLists = new CompareFileLists(alpha_hash_list, bravo_hash_list);
compareFileLists.compare();
compareFileLists.consume();
compareFileLists.printResults();
