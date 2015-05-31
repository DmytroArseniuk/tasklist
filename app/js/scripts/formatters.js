angular.module('formatters', [])
    .filter('dateFilter', function ($filter) {
        return function (date) {
            return $filter('date')(date, 'MMM dd yyyy');
        };
    });