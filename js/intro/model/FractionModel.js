// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the left or right fractions on the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var inherit = require( 'PHET_CORE/inherit' );

  function FractionModel() {
    PropertySet.call( this, {
      numerator: 1,
      denominator: 2,

      //one of start/drag/compare
      state: 'start',

      animating: false
    } );

    //Currently no support for creating NumberProperty through PropertySet constructor (should there be?), so create it manually here
    //And give it the same interface as other gettable properties
    this.divisionsProperty = new NumberProperty( 1 );
    this.addGetter( 'divisions' );

    this.addDerivedProperty( 'fraction', [ 'numerator', 'denominator' ], function( numerator, denominator ) {
      return numerator / denominator;
    } );
  }

  return inherit( PropertySet, FractionModel );
} );