const mower = require('mower.js');

describe('Mower file test case ', ()=> {

	beforeAll(() => {
	}); 
	afterAll(() => {
	});
	describe('init funtion', ()=> {
		let params;
		let instance 
		beforeAll(() => {
		}); 
        beforeEach(() => {
            params = { 
                mowSize: '5 5',
                startPosition: '1 2 N'
            }
		});
		
		it('should return the string WrongParam in case of invalid params : start position out of the lawn', done => {
            params.startPosition = '1 6 S'
			mower.initialisation(params.mowSize, params.startPosition).catch((error) => {
				expect(error).toBe('WrongParam');
			    done();
			});
		});

		it('should return the string WrongParam in case of invalid params : direction invalid', done => {
            params.startPosition = '1 1 F'
			mower.initialisation(params.mowSize, params.startPosition).catch((error) => {
				expect(error).toBe('WrongParam');
			    done();
			});
		});

		it('should return the string WrongParam in case of invalid params : Invalid start position format', done => {
            params.startPosition = '11F'
			mower.initialisation(params.mowSize, params.startPosition).catch((error) => {
				expect(error).toBe('WrongParam');
			    done();
			});
		});

		it('should verify that the input params are valid : ', done => {
			mower.initialisation(params.mowSize, params.startPosition).then((result) => {
				expect(result).toBe(true);
			    done();
			});
		});
	});
	describe('lunchSequence funtion', ()=> {
		it('should return WrongParam: Invalid Seq', done => {
			mower.initialisation('5 5', '1 2 N').then((resultInit) => {
				expect(resultInit).toBe(true);
				mower.lunchSequence('AABABABABABAB').catch((result) => {
					expect(result).toBe('WrongParam: Invalid Seq');
					done();
				});
			});
		});

		it('should return (N 1 3)', done => {
			mower.initialisation('5 5', '1 2 N').then((resultInit) => {
				expect(resultInit).toBe(true);
				mower.lunchSequence('LFLFLFLFF').then((result) => {
					expect(result).toBe('N 1 3');
					done();
				});
			});
		});
		it('should return (E 5 1)', done => {
			mower.initialisation('5 5', '3 3 E').then((resultInit) => {
				expect(resultInit).toBe(true);
				mower.lunchSequence('FFRFFRFRRF').then((result) => {
					expect(result).toBe('E 5 1');
					done();
				});
			});
		});
	});
});
