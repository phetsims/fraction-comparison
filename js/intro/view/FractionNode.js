// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for the left/right fraction with up/down spinners for denominator/numerator
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
  var ScreenView = require( 'JOIST/ScreenView' );
  var Panel = require( 'SUN/Panel' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function FractionNode( numeratorProperty, denominatorProperty, options ) {
    Node.call( this );
    var font = new PhetFont( { size: 128} );
    var numeratorNode = new Text( numeratorProperty.get(), { font: font } );
    var denominatorNode = new Text( denominatorProperty.get(), { font: font } );

//    var numbers = _.range( 1, 10, 1 );
//    var numberNodes = numbers.map( function( number ) {
//      return new Text( number + '', {font: font} )
//    } );
//    var maxWidth = -1;
//    var maxHeight = -1;
//    numberNodes.forEach( function( node ) {
//      maxWidth = Math.max( maxWidth, node.width );
//      maxHeight = Math.max( maxHeight, node.height );
//    } );
//    this.children = numberNodes;

    var line = new Line( 0, 0, 80, 0, {lineWidth: 4, stroke: 'black'} );
    this.addChild( line );

    numeratorNode.mutate( {centerX: line.centerX, bottom: line.bounds.minY - 2} );
    denominatorNode.mutate( {centerX: line.centerX, top: line.bounds.maxY - 2} );

    this.addChild( numeratorNode );
    this.addChild( denominatorNode );

//    this.addChild( );

    this.mutate( options );
  }

  return inherit( Node, FractionNode );
} );