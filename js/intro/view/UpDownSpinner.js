// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for up/down buttons for each numerator/denominator.
 *
 * TODO: press to hold
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var Color = require( 'SCENERY/util/Color' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Panel = require( 'SUN/Panel' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RoundShinyButton = require( 'SCENERY_PHET/RoundShinyButton' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function UpDownSpinner( valueProperty, min, max, options ) {

    var upShape = new Shape().moveTo( 0, 0 ).lineTo( 15, -10 ).lineTo( 30, 0 );
    var downShape = new Shape().moveTo( 0, 0 ).lineTo( 15, 10 ).lineTo( 30, 0 );

    var upIcon = new Path( upShape, {lineWidth: 5, stroke: 'black', lineCap: 'round'} );
    var downIcon = new Path( downShape, {lineWidth: 5, stroke: 'black', lineCap: 'round'} );

    var upButton = new RoundShinyButton( function() {
      valueProperty.set( Math.min( valueProperty.get() + 1, max ) );
    }, upIcon, {
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      upFill: new Color( '#fefd53' ),
      overFill: new Color( '#fffe08' ),
      downFill: new Color( '#e9e824' ),
      iconOffsetY: -3
    } );

    var downButton = new RoundShinyButton( function() {
      valueProperty.set( Math.max( valueProperty.get() - 1, min ) );
    }, downIcon, {
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      upFill: new Color( '#fefd53' ),
      overFill: new Color( '#fffe08' ),
      downFill: new Color( '#e9e824' ),
      iconOffsetY: +3
    } );

    VBox.call( this, {spacing: 10, children: [upButton, downButton]} );

    this.mutate( options );
  }

  return inherit( VBox, UpDownSpinner );
} );