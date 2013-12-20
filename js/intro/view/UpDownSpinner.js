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
  var inherit = require( 'PHET_CORE/inherit' );
  var RoundShinyButton = require( 'SCENERY_PHET/RoundShinyButton' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function UpDownSpinner( valueProperty, min, max, options ) {

    var shapeWidth = 26;
    var upShape = new Shape().moveTo( 0, 0 ).lineTo( shapeWidth / 2, -10 ).lineTo( shapeWidth, 0 );
    var downShape = new Shape().moveTo( 0, 0 ).lineTo( shapeWidth / 2, 10 ).lineTo( shapeWidth, 0 );

    var upIcon = new Path( upShape, {lineWidth: 5, stroke: 'black', lineCap: 'round'} );
    var downIcon = new Path( downShape, {lineWidth: 5, stroke: 'black', lineCap: 'round'} );

    var radius = 20;
    var upButton = new RoundShinyButton( function() {
      valueProperty.set( Math.min( valueProperty.get() + 1, max ) );
    }, upIcon, {
      radius: radius,
      touchAreaRadius: 24 * 1.3,
      upFill: new Color( '#fefd53' ),
      overFill: new Color( '#fffe08' ),
      downFill: new Color( '#e9e824' ),
      iconOffsetY: -3
    } );

    var downButton = new RoundShinyButton( function() {
      valueProperty.set( Math.max( valueProperty.get() - 1, min ) );
    }, downIcon, {
      radius: radius,
      touchAreaRadius: 24 * 1.3,
      upFill: new Color( '#fefd53' ),
      overFill: new Color( '#fffe08' ),
      downFill: new Color( '#e9e824' ),
      iconOffsetY: +3
    } );

    VBox.call( this, {spacing: 6, children: [upButton, downButton]} );

    this.mutate( options );
  }

  return inherit( VBox, UpDownSpinner );
} );