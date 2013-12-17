// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var FractionModel = require( 'FRACTION_COMPARISON/intro/model/FractionModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  function IntroModel() {
    this.leftFractionModel = new FractionModel();
    this.rightFractionModel = new FractionModel();
    PropertySet.call( this, {
      numberLineVisible: false,
      representation: 'horizontal-bar'
    } );
  }

  inherit( PropertySet, IntroModel, {
    step: function( dt ) {

    }
  } );

  return IntroModel;
} );