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
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var FractionModel = require( 'FRACTION_COMPARISON/intro/model/FractionModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  // constant
  var VALID_REPRESENTATION_VALUES = [
    'horizontal-bar',
    'circle',
    'chocolate',
    'different-sized-circles' ];

  /**
   * @constructor
   */
  function IntroModel() {

    // @public {Property.<boolean>}
    this.numberLineVisibleProperty = new BooleanProperty( false );

    // @public {Property.<string>}
    this.representationProperty = new Property( 'horizontal-bar' );

    // @public
    this.leftFractionModel = new FractionModel();

    // @public
    this.rightFractionModel = new FractionModel();

    // @public {Property.<boolean>}
    this.bothCompareProperty = new DerivedProperty( [ this.leftFractionModel.stateProperty, this.rightFractionModel.stateProperty ],
      function( leftState, rightState ) {
        return leftState === 'compare' && rightState === 'compare';
      } );

    //Boolean Property that indicates whether either of the left/right shapes is in the center, used to hide the center target region
    // @public {Property.<boolean>}
    this.eitherCompareProperty = new DerivedProperty( [ this.leftFractionModel.stateProperty, this.rightFractionModel.stateProperty ],
      function( leftState, rightState ) {
        return leftState === 'compare' || rightState === 'compare';
      } );

    // check for validity of representation, present for the lifetime of the sim
    this.representationProperty.link( function( representation ) {
      assert && assert( _.includes( VALID_REPRESENTATION_VALUES, representation ), 'invalid representation: ' + representation );
    } );

  }

  fractionComparison.register( 'IntroModel', IntroModel );

  inherit( Object, IntroModel, {
    /**
     * Resets the model
     * @public
     */
    reset: function() {
      this.numberLineVisibleProperty.reset();
      this.representationProperty.reset();
      this.leftFractionModel.reset();
      this.rightFractionModel.reset();
    }
  } );

  return IntroModel;
} );