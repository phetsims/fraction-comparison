// Copyright 2002-2013, University of Colorado Boulder

/**
 * The region where fractions can be dragged to be compared, in the center top of the screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Panel = require( 'SUN/Panel' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var TextPushButton = require( 'SUN/TextPushButton' );
  var Color = require( 'SCENERY/util/Color' );

  function ComparisonRegion( options ) {
    Rectangle.call( this, 0, 0, 200, 200, 10, 10, {lineStroke: 1, fill: 'white', lineDash: [ 6, 5 ], stroke: 'black'} );

    var textPushButton = new TextPushButton( 'Compare', {rectangleFillUp: new Color( 'yellow' ), centerX: this.bounds.centerX, bottom: this.bottom - 5} );
    this.addChild( textPushButton );
    this.mutate( options );
  }

  return inherit( Rectangle, ComparisonRegion );
} );