// Copyright 2013-2020, University of Colorado Boulder

/**
 * Model for the left or right fractions on the 'Intro' screen.
 *
 * @author Sam Reid
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import fractionComparison from '../../fractionComparison.js';

// constants
const VALID_STATE_VALUES = [ 'start', 'dragging', 'compare' ];

/**
 * @constructor
 */
function FractionModel() {

  // @public {Property.<boolean>}
  this.animatingProperty = new BooleanProperty( false );

  // @public {Property.<number>}
  this.divisionsProperty = new NumberProperty( 1 );

  // @public {Property.<number>}
  this.denominatorProperty = new NumberProperty( 2 );

  // @public {Property.<number>}
  this.numeratorProperty = new NumberProperty( 1 );

  // @public {Property.<string>} one of start/dragging/compare
  this.stateProperty = new StringProperty( 'start' );

  // @public {Property.<number>}
  this.fractionProperty = new DerivedProperty( [ this.numeratorProperty, this.denominatorProperty ],
    function( numerator, denominator ) {
      return numerator / denominator;
    } );

  // check for the validity of the sate, present for the lifetime of the sim
  this.stateProperty.link( function( state ) {
    assert && assert( _.includes( VALID_STATE_VALUES, state ), 'invalid state: ' + state );
  } );
}

fractionComparison.register( 'FractionModel', FractionModel );

inherit( Object, FractionModel, {
  /**
   * Resets
   * @public
   */
  reset: function() {
    this.numeratorProperty.reset();
    this.denominatorProperty.reset();
    this.stateProperty.reset();
    this.animatingProperty.reset();
    this.divisionsProperty.reset();
  }
} );

export default FractionModel;