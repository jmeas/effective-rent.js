import effectiveRent from '../../src/effective-rent';

describe('effectiveRent.compute()', () => {
  describe('A rent of $31 in January 2016 (a month with 31 days)', () => {
    it('should return 14', () => {
      const date = new Date(2016, 0, 1);
      const rent = effectiveRent.compute({rent: 31, payDate: date});
      expect(rent).to.equal('14.00');
    });
  });

  describe('A rent of $1000 half in January 2016 and half in February 2016', () => {
    // January 2016 - 31 days = $32.25806/day.
    // 7 days in Jan 2016 = $225.80645
    // February 2016 = 29 days = $34.48275/day
    // 7 days in Feb 2016 = $241.37931
    // Total cost is $482.75862. `toFixed() === $482.76`
    it('should return 14', () => {
      const date = new Date(2016, 0, 24);
      const rent = effectiveRent.compute({rent: 1000, payDate: date});
      expect(rent).to.equal('467.19');
    });
  });

  describe('Handles leap years', () => {
    // Rent is $1000
    // February 2017 - 28 days = $35.71428/day.
    // 3 days in Feb 2017 = $107.14285
    // March 2017 = 31 days = $32.25806/day.
    // 7 days in Mar 2017 = $354.83866
    // Total cost is $461.98151. `toFixed() === $461.98`
    it('should return 14', () => {
      const date = new Date(2017, 1, 25);
      const rent = effectiveRent.compute({rent: 1000, payDate: date});
      expect(rent).to.equal('461.98');
    });
  });

  describe('Handles December -> January jump', () => {
    // Rent is $1000
    // December 2017 - 31 days = $32.25806/day.
    // 10 days in Dec 2017 = $322.58060
    // January 2018 = 31 days = $32.25806/day.
    // 4 days in Jan 2018 = $129.03224
    // Total cost is $461.98151. `toFixed() === $451.61`
    it('should return 14', () => {
      const date = new Date(2017, 11, 21);
      const rent = effectiveRent.compute({rent: 1000, payDate: date});
      expect(rent).to.equal('451.61');
    });
  });
});
