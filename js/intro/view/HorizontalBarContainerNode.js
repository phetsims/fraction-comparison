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

  function HorizontalBarContainerNode( options ) {
    options = _.extend( {cursor: 'pointer'}, options );
    Node.call( this );

    var border = new Rectangle( 0, 0, 180, 100, {fill: 'white', stroke: 'black', lineWidth: 1} );
    this.addChild( border );

    this.mutate( options );

    this.addInputListener( new NodeDragHandler( this, {} ) );
  }

  return inherit( Node, HorizontalBarContainerNode );
} );