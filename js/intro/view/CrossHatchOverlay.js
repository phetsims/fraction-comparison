// Copyright 2002-2013, University of Colorado Boulder

/**
 * Prototype for interlacing for comparison
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
  var Text = require( 'SCENERY/nodes/Text' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var TextPushButton = require( 'SUN/TextPushButton' );
  var Color = require( 'SCENERY/util/Color' );
  var Pattern = require( 'SCENERY/util/Pattern' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  function CrossHatchOverlay( leftHorizontalBarContainerNode, rightHorizontalBarContainerNode ) {
    var crossHatchOverlay = this;
    var blue = function() {return new Rectangle( 0, 0, 20, 20, {fill: 'blue', stroke: null} );};
    var green = function() {return new Rectangle( 0, 0, 20, 20, {fill: 'green', stroke: null} );};
    var element = new VBox( {children: [
      new HBox( {children: [blue(), green()]} ),
      new HBox( {children: [green(), blue()]} )]} );

    element.toImage( function( image ) {
      crossHatchOverlay.fill = new Pattern( image );
    }, 0, 0, 40, 40 );

    Rectangle.call( this, 0, 0, 0, 0, {} );

    var update = function() {
      var a = leftHorizontalBarContainerNode.localToGlobalBounds( leftHorizontalBarContainerNode.contents.bounds );
      var b = rightHorizontalBarContainerNode.localToGlobalBounds( rightHorizontalBarContainerNode.contents.bounds );
      var c = crossHatchOverlay.globalToLocalBounds( a.intersection( b ) );
      crossHatchOverlay.setRect( c.minX, c.minY, Math.max( c.width, 0 ), Math.max( c.height, 0 ) );
    };
    leftHorizontalBarContainerNode.events.on( 'changed', update );
    rightHorizontalBarContainerNode.events.on( 'changed', update );

    leftHorizontalBarContainerNode.events.on( 'moved-to-front', function() {
      crossHatchOverlay.moveToFront();
    } );
    rightHorizontalBarContainerNode.events.on( 'moved-to-front', function() {
      crossHatchOverlay.moveToFront();
    } );
  }

  return inherit( Rectangle, CrossHatchOverlay );
} );