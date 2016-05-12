// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var PropertySet = require( 'AXON/PropertySet' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var FractionModel = require( 'FRACTION_COMPARISON/intro/model/FractionModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  function IntroModel() {
    this.leftFractionModel = new FractionModel();
    this.rightFractionModel = new FractionModel();
    PropertySet.call( this, {
      numberLineVisible: false,
      representation: 'horizontal-bar'
    } );

    this.bothCompareProperty = new DerivedProperty( [ this.leftFractionModel.stateProperty, this.rightFractionModel.stateProperty ], function( leftState, rightState ) {
      return leftState === 'compare' && rightState === 'compare';
    } );

    //Boolean Property that indicates whether either of the left/right shapes is in the center, used to hide the center target region
    this.eitherCompareProperty = new DerivedProperty( [ this.leftFractionModel.stateProperty, this.rightFractionModel.stateProperty ], function( leftState, rightState ) {
      return leftState === 'compare' || rightState === 'compare';
    } );
  }

  fractionComparison.register( 'IntroModel', IntroModel );

  inherit( PropertySet, IntroModel, {
    step: function() {
      //TODO: use dt
    },
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.leftFractionModel.reset();
      this.rightFractionModel.reset();
    }
  } );

  return IntroModel;
} );