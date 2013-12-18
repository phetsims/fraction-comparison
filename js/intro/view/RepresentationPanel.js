// Copyright 2002-2013, University of Colorado Boulder

/**
 * The large horizontal panel at the bottom of the screen for selecting different representations.
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

  function RepresentationPanel( representationProperty, options ) {
    options = _.extend( {fill: '#efe8e1'}, options );

    var representations = ['horizontal-bar', 'vertical-bar', 'circle', 'chocolate', 'different-sized-circles'];
    var icons = {};
    icons['horizontal-bar'] = new Rectangle( 0, 0, 50, 30, {fill: '#208644', lineWidth: 1, stroke: 'black'} );
    icons['vertical-bar'] = new Rectangle( 0, 0, 14, 50, {fill: 'red', lineWidth: 1, stroke: 'black'} );
    icons['circle'] = new Circle( 22, {fill: '#145991', lineWidth: 1, stroke: 'black'} );
    icons['chocolate'] = new Rectangle( 0, 0, 50, 40, {fill: '#563329', lineWidth: 1, stroke: 'black'} );
    icons['different-sized-circles'] = new Node( {children: [
      new Circle( 20, {fill: '#f0d041', lineWidth: 1, stroke: 'black', x: 26, y: -26} ),
      new Circle( 12, {fill: '#f0d041', lineWidth: 1, stroke: 'black'} )]} );

    var maxWidth = -1;
    var maxHeight = -1;
    representations.forEach( function( representation ) {
      maxWidth = Math.max( maxWidth, icons[representation].width );
      maxHeight = Math.max( maxHeight, icons[representation].height );
    } );
    console.log( maxWidth, maxHeight );

    function paddedNode( content, width, height ) {
      content.centerX = width / 2;
      content.centerY = height / 2;
      return new Node( {children: [
        new Rectangle( 0, 0, width, height ),
        content
      ]} );
    }

    var widthWithPadding = maxWidth + 5;
    var heightWithPadding = maxHeight + 5;

    var children = representations.map( function( representation ) {
      return new InOutRadioButton( representationProperty, representation, paddedNode( icons[representation], widthWithPadding, heightWithPadding ) );
    } );

    var content = new HBox( {
      spacing: 20,
      children: children
    } );
    Panel.call( this, content, options );
  }

  return inherit( Panel, RepresentationPanel );
} );