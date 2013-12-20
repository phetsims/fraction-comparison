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
  var RectanglePushButton = require( 'SUN/RectanglePushButton' );
  var Color = require( 'SCENERY/util/Color' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );

  function ComparisonRegion( options ) {
    var comparisonRegionLength = 220;
    Rectangle.call( this, 0, 0, comparisonRegionLength, comparisonRegionLength, 10, 10, {lineStroke: 1, fill: 'white'} );

    var tailX = 0;
    var tailY = 0;
    var tipX = 10;
    var tipY = 0;
    var compareButton = new RectanglePushButton( new HBox( {spacing: 5, children: [
      new ArrowNode( tailX, tailY, tipX, tipY ),
      new ArrowNode( tailX, tailY, -tipX, tipY )
    ]} ), {rectangleFillUp: new Color( 'yellow' ), centerX: this.bounds.centerX, bottom: this.bottom - 5} );
    this.addChild( compareButton );

    var target = new Rectangle( 0, 0, 180, 100, {stroke: 'red', lineWidth: 1, lineDash: [ 6, 5 ], centerX: this.bounds.centerX, top: 59} );
    this.addChild( target );

    this.mutate( options );
  }

  return inherit( Rectangle, ComparisonRegion );
} );