var Cards = {
  accuracy: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  attacksPerTurn: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  baseAttack: {
    presence: true,
    numericality: {
      noStrings: true,
      onlyInteger: true,
      greaterThan: 0
    }
  },
  baseDefense: {
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
      onlyInteger: true,
      greaterThan: 0
    }
  },
  firstName: {
    presence: true
  },
  gender: {
    presence: true,
    inclusion: {
      within: ['m', 'f', 'M', 'F'],
      message: '^%{value} is not a valid "gender". ["M", "F"]'
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
  stars: {
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
