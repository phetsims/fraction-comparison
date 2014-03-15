// Copyright 2002-2013, University of Colorado Boulder

/**
 * The region where fractions can be dragged to be compared, in the center top of the screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var RectanglePushButton = require( 'SUN/RectanglePushButton' );
  var Color = require( 'SCENERY/util/Color' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  function CompareSeparateButton( compareButtonPressed, separateButtonPressed, compareBothProperty, options ) {
    Node.call( this );
    options = options || {};
    var xTip = 20;
    var yTip = 8;
    var xControl = 12;
    var yControl = -5;

    var createArrowhead = function( angle, tail ) {
      var headWidth = 10;
      var headHeight = 10;
      var directionUnitVector = Vector2.createPolar( 1, angle );
      var orthogonalUnitVector = directionUnitVector.perpendicular();
      var tip = directionUnitVector.times( headHeight ).plus( tail );
      return new Path( new Shape().moveToPoint( tail ).
          lineToPoint( tail.plus( orthogonalUnitVector.times( headWidth / 2 ) ) ).
          lineToPoint( tip ).
          lineToPoint( tail.plus( orthogonalUnitVector.times( -headWidth / 2 ) ) ).
          lineToPoint( tail ).close(),
        {fill: 'black'} );
    };

    var rightCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( -xControl, yControl, -xTip, yTip ), { stroke: 'black', lineWidth: 3 } );
    var leftCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( xControl, yControl, xTip, yTip ), { stroke: 'black', lineWidth: 3 } );

    var compareButton = new RectanglePushButton( new HBox( {spacing: 5, children: [
      new Node( {children: [leftCurve, createArrowhead( Math.PI / 3, new Vector2( xTip, yTip ) )]} ),
      new Node( {children: [rightCurve, createArrowhead( Math.PI - Math.PI / 3, new Vector2( -xTip, yTip ) )]} )
    ]} ), {rectangleFillUp: new Color( 'yellow' )} );
    compareButton.addListener( compareButtonPressed );

    var separateButton = new RectanglePushButton( new HBox( {spacing: 5, children: [
      new Node( {children: [leftCurve, createArrowhead( Math.PI / 3 + Math.PI * 0.5, new Vector2( 0, 0 ) )]} ),
      new Node( {children: [rightCurve, createArrowhead( Math.PI - Math.PI / 3 - Math.PI / 2, new Vector2( 0, 0 ) )]} )
    ]} ), {rectangleFillUp: new Color( 'green' )} );
    separateButton.addListener( separateButtonPressed );

    compareBothProperty.linkAttribute( separateButton, 'visible' );
    compareBothProperty.derivedNot().linkAttribute( compareButton, 'visible' );

    this.addChild( compareButton );
    this.addChild( separateButton );

    this.mutate( options );
  }

  return inherit( Node, CompareSeparateButton, {
    setBothComparedProperty: function( bothComparedProperty ) {
      this.bothComparedProperty = bothComparedProperty;
    }
  } );
} );