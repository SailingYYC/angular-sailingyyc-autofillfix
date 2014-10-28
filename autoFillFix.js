/**
 * sailingyyc.AutoFillFix.js
 * Directive to trigger $scope updates when a browser auto-fills a form.
 *
 * Copyright (C) 2014 Colin Cyr
 * ccyr@sailingyyc.com
 */

angular.module( 'sailingyyc.AutoFillFix', [] )

.directive( 'formAutofillFix', function ( $timeout ) {
  return function ( scope, element, attrs ) {
    element.prop( 'method', 'post' );
    if ( attrs.ngSubmit ) {
      $timeout( function () {
        element
          .unbind( 'submit' )
          .bind( 'submit', function ( event ) {
            event.preventDefault();
            angular.forEach( ['input', 'textarea', 'select'], function ( tag ) {
              angular.forEach( element.find( tag ), function ( elem ) {
                elem = angular.element( elem );
                elem.triggerHandler( 'input' );
                elem.triggerHandler( 'change' );
                elem.triggerHandler( 'keydown' );
              });
            });            
            scope.$apply( attrs.ngSubmit );
          });
      });
    }
  };
})

;

