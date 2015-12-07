(function() {
	var app = angular.module('budget', [], function(){});
	
	// Control tabbing through sections
	app.controller('PageController', function(){
		this.tab = 1;
		
		this.selectTab = function(setTab){
			this.tab = setTab;
		}
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		}
	});
	
	// List all the incomes and expenses
	app.controller('ListExpenses', ['$http', function($http){
		var list = this;
		var incomeTotal = 0;
		list.expenses = [];
		list.incomes = [];
		list.incomeTotal = incomeTotal;
		
		list.getExpenses = function(){
			$http.get('json/expenses.json').success(function(data){
				list.expenses = data;
			});	
		}
		
		list.getIncomes = function(){
			$http.get('json/incomes.json').success(function(data){
				list.incomes = data;
				for(var i=0;i<data.length;i++){
					incomeTotal+=data[i].amount;
				}
				list.incomeTotal = incomeTotal;
			});	
		}
		
		list.removeElement = function(index){
			console.log(index);
		}
	}]);
	
	// Show expense percentage - need to make it general
	app.directive('expensePercentage',['$http', function($http){
		return {
			restrict: 'E',
			templateUrl: "js/directives/expense-percentage.html",
			controller: function(){
				var list = this;
				var expenseTotal = 0;
				list.expenseTotal = expenseTotal;
				list.expensePercentage = expenseTotal/1000*100;
				list.some = 10;
				
				list.updatePercentage = function(){
					expenseTotal = 0;
					$http.get('json/expenses.json').success(function(data){
						for(var i=0;i<data.length;i++){
							expenseTotal+=data[i].amount;
						}
						list.expenseTotal = expenseTotal;
						list.expensePercentage = expenseTotal/1000*100;
						//console.log(list.expenseTotal);
					});	
				}
				
			},
			controllerAs: "expenseCtrl"
		};
	}]);
	
	// General form directive
	app.directive('addItem', ['$http', function($http){
		return {
			restrict: 'E',
			templateUrl: "js/directives/add-item-form.html",
			controller: function($attrs){
				var ctrl = this;
				ctrl.labelType = $attrs.formType;
				ctrl.labelTypeSingular = ctrl.labelType.slice(0,-1);
				if($attrs.formType=="expenses"){
					ctrl.showType = true;
				}else if($attrs.formType=="incomes"){
					ctrl.showType = false;
				}
				ctrl.success = false;
				
				ctrl.addItem = function(list,exCtrl){
					ctrl.item.label = ctrl.labelType;
					ctrl.item.submit = "set";
					data = $.param(ctrl.item);
					console.log(data);
					$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
					$http.post('json/add.php',data).then(function successCallback(response){
						if(!((response.data).localeCompare("success"))){
							ctrl.success = true;
							if(ctrl.showType){
								list.getExpenses();
								exCtrl.updatePercentage();
							}else{
								list.getIncomes();
							}
						}
					});
					
				};
			},
			controllerAs: "addItemCtrl"
		}
	}]);
	
	// How to make a custom directive - tutorial
	/*
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
	});*/
})();