// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the left or right fractions on the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function FractionModel() {
    PropertySet.call( this, {
      numerator: 1,
      denominator: 2,

      //one of start/drag/compare
      state: 'start',

      animating: false
    } );

    //Currently no support for creating Property through PropertySet constructor (should there be?), so create it manually here
    //And give it the same interface as other gettable properties
    this.divisionsProperty = new Property( 1 );
    this.addGetter( 'divisions' );

    this.addDerivedProperty( 'fraction', [ 'numerator', 'denominator' ], function( numerator, denominator ) {
      return numerator / denominator;
    } );
  }

  fractionComparison.register( 'FractionModel', FractionModel );

  return inherit( PropertySet, FractionModel );
} );