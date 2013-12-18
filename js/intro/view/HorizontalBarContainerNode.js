// Copyright 2002-2013, University of Colorado Boulder

/**
 * The draggable container node for horizontal bars
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
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var NodeDragHandler = require( 'FRACTION_COMPARISON/intro/view/NodeDragHandler' );
  var Events = require( 'AXON/Events' );

  function HorizontalBarContainerNode( fractionProperty, color, options ) {
    var horizontalBarContainerNode = this;
    options = _.extend( {cursor: 'pointer'}, options );
    Node.call( this );
    this.events = new Events();

    var border = new Rectangle( 0, 0, 180, 100, {stroke: 'black', lineWidth: 1} );
    this.addChild( border );

    this.contents = new Rectangle( 0, 0, fractionProperty.get() * 180, 100, {fill: color, stroke: 'black', lineWidth: 1} );
    fractionProperty.link( function( value ) {
      horizontalBarContainerNode.contents.setRectWidth( value * 180 );
      horizontalBarContainerNode.events.trigger( 'changed' );
    } );
    this.addChild( this.contents );

    this.mutate( options );

    this.addInputListener( new NodeDragHandler( this, {startDrag: function() {
      horizontalBarContainerNode.moveToFront();
      horizontalBarContainerNode.events.trigger( 'moved-to-front' );
    }, drag: function() {
      horizontalBarContainerNode.events.trigger( 'changed' );
    }} ) );
  }

  return inherit( Node, HorizontalBarContainerNode );
} );