// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the left or right fractions on the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function FractionModel() {
    PropertySet.call( this, {
      numerator: 1,
      denominator: 1
    } );
  }

  return inherit( PropertySet, FractionModel );
} );