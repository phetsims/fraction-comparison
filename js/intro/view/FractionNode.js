// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for the left/right fraction with up/down spinners for denominator/numerator
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
  var UpDownSpinner = require( 'FRACTION_COMPARISON/intro/view/UpDownSpinner' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function FractionNode( numeratorProperty, denominatorProperty, options ) {
    Node.call( this );
    var font = new PhetFont( { size: 128} );
    var numeratorNode = new Text( numeratorProperty.get(), { font: font } );

    numeratorProperty.link( function( value ) { numeratorNode.text = value + ''; } );

    var denominatorNode = new Text( denominatorProperty.get(), { font: font } );
    denominatorProperty.link( function( value ) {denominatorNode.text = value + '';} );

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

    var numeratorSpinner = new UpDownSpinner( numeratorProperty, 1, 9 );
    var denominatorSpinner = new UpDownSpinner( denominatorProperty, 1, 9 );

    var spinners = new VBox( {spacing: 40, children: [numeratorSpinner, denominatorSpinner], right: line.bounds.minX, centerY: line.bounds.centerY} );
    this.addChild( spinners );

    this.mutate( options );
  }

  return inherit( Node, FractionNode );
} );