// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the 'Intro' screen.
 *
 * @author Sam Reid
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import fractionComparison from '../../fractionComparison.js';
import FractionModel from './FractionModel.js';

// constants
const VALID_REPRESENTATION_VALUES = [
  'horizontal-bar',
  'vertical-bar',
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
  this.representationProperty = new StringProperty( 'horizontal-bar' );

  // @public
  this.leftFractionModel = new FractionModel();

  // @public
  this.rightFractionModel = new FractionModel();

  // @public (read-only)  {Property.<boolean>}
  this.bothCompareProperty = new DerivedProperty( [ this.leftFractionModel.stateProperty, this.rightFractionModel.stateProperty ],
    function( leftState, rightState ) {
      return leftState === 'compare' && rightState === 'compare';
    } );

  //Boolean Property that indicates whether either of the left/right shapes is in the center, used to hide the center target region
  // @public (read-only) {Property.<boolean>}
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

export default IntroModel;