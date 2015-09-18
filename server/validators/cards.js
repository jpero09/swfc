var Cards = {
  accuracy: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true
    }
  },
  attack: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  defense: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  cost: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  evade: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true
    }
  },
  name: {
    presence: true
  },
  gender: {
    presence: true,
    inclusion: {
      within: ['m', 'f', 'M', 'F', null],
      message: '^%{value} is not a valid "gender". ["M", "F", null]'
    }
  },
  maxLevel: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  range: {
    presence: true,
    inclusion: {
      within: ['s', 'm', 'l', 'S', 'M', 'L'],
      message: '^%{value} is not a valid "range". ["S", "M", "L"]'
    }
  },
  side: {
    presence: true,
    inclusion: {
      within: ['l', 'n', 'd', 'L', 'N', 'D'],
      message: '^%{value} is not a valid "side". ["D", "N", "L"]'
    }
  },
  rarity: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 5
    }
  }
};

module.exports = Cards;
