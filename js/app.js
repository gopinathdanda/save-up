(function() {
	var app = angular.module('budget', []);
	
	app.controller('PageController', function(){
		this.tab = 1;
		
		this.selectTab = function(setTab){
			this.tab = setTab;
		}
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		}
	});
	
	app.controller('ListExpenses', ['$http', function($http){
		var list = this;
		list.expenses = [];
		list.incomes = [];
		
		$http.get('json/expenses.json').success(function(data){
			list.expenses = data;
		});
		
		$http.get('json/incomes.json').success(function(data){
			list.incomes = data;
		});
		
	}]);
	
	app.directive('reviewForm', function(){
		return {
			restrict: 'E',
			templateUrl: "js/review-form.html",
			controller: function() {
				this.rev = {};
		
				this.addReview = function(item){
					this.rev.createdOn = Date.now();
					item.reviews.push(this.rev);
					this.rev = {};
				}
			},
			controllerAs: "reviewCtrl"
		};
	});
})();