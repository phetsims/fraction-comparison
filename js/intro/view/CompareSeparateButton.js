// Copyright 2013-2015, University of Colorado Boulder

/**
 * Button that will bring the left/right shapes to the center, or move them back to their homes.
 * One class is used to render both buttons since it is like a toggle button, and so the size won't change when toggling.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Function} compareButtonPressed
   * @param {Function} separateButtonPressed
   * @param {Property.<boolean>} compareBothProperty
   * @param {Object} [options]
   * @constructor
   */
  function CompareSeparateButton( compareButtonPressed, separateButtonPressed, compareBothProperty, options ) {
    Node.call( this );
    options = options || {};
    var xTip = 20;
    var yTip = 8;
    var xControl = 12;
    var yControl = -5;

    var rightCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( -xControl, yControl, -xTip, yTip ), { stroke: 'black', lineWidth: 3 } );
    var leftCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( xControl, yControl, xTip, yTip ), { stroke: 'black', lineWidth: 3 } );

    var compareIcon = new HBox( {
      spacing: 5, children: [
        new Node( { children: [ leftCurve, createArrowhead( Math.PI / 3, new Vector2( xTip, yTip ) ) ] } ),
        new Node( { children: [ rightCurve, createArrowhead( Math.PI - Math.PI / 3, new Vector2( -xTip, yTip ) ) ] } )
      ]
    } );

    var separateIcon = new HBox( {
      spacing: 5, children: [
        new Node( { children: [ leftCurve, createArrowhead( Math.PI / 3 + Math.PI * 0.5, new Vector2( 0, 0 ) ) ] } ),
        new Node( { children: [ rightCurve, createArrowhead( Math.PI - Math.PI / 3 - Math.PI / 2, new Vector2( 0, 0 ) ) ] } )
      ]
    } );

    var maxWidth = Math.max( compareIcon.width, separateIcon.width );
    var maxHeight = Math.max( compareIcon.height, separateIcon.height );

    var compareButton = new RectangularPushButton( {
      content: new Rectangle( 0, 0, maxWidth, maxHeight, {
        children: [ compareIcon.mutate( { centerX: maxWidth / 2, centerY: maxHeight / 2 } ) ]
      } ),
      baseColor: new Color( 255, 255, 0 ),
      disabledBaseColor: new Color( 220, 220, 220 ),
      listener: compareButtonPressed
    } );

    var separateButton = new RectangularPushButton( {
      content: new Rectangle( 0, 0, maxWidth, maxHeight, {
        children: [ separateIcon.mutate( { centerX: maxWidth / 2, centerY: maxHeight / 2 } ) ]
      } ),
      baseColor: new Color( 255, 255, 0 ),
      disabledBaseColor: new Color( 220, 220, 220 ),
      listener: separateButtonPressed
    } );

    compareBothProperty.linkAttribute( separateButton, 'visible' );
    compareBothProperty.link( function( compareBoth ) {
      compareButton.visible = !compareBoth;
    } );

    this.addChild( compareButton );
    this.addChild( separateButton );

    this.mutate( options );
  }

  /**
   * Arrowhead factory
   * @param {number} angle - in radians
   * @param {Vector2} tail
   * @returns {Path}
   */
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
      { fill: 'black' } );
  };

  fractionComparison.register( 'CompareSeparateButton', CompareSeparateButton );

  return inherit( Node, CompareSeparateButton );
} );