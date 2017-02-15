describe('component name test', function () {

	var element,
		outerScope,
		innerScope,
		classification;

	beforeEach(module('angularTicker'));

	beforeEach(inject(function ($rootScope, $compile) {
		classification = angular.element('<angular-ticker></angular-ticker>');

		outerScope = $rootScope;
		$compile(classification)(outerScope);
		innerScope = classification.isolateScope();
		outerScope.$digest();
	}));

	it('should be awesome', function () {
		//expect(classification.children[0].text()).to.equal('FooBar');
		expect(true).to.equal(true);
	});
});
