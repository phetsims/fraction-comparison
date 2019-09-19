// Copyright 2013-2019, University of Colorado Boulder

/**
 * Button that will bring the left/right shapes to the center, or move them back to their homes.
 * One class is used to render both buttons since it is like a toggle button, and so the size won't change when toggling.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Shape = require( 'KITE/Shape' );
  const Vector2 = require( 'DOT/Vector2' );

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
    const xTip = 20;
    const yTip = 8;
    const xControl = 12;
    const yControl = -5;

    const rightCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( -xControl, yControl, -xTip, yTip ), { stroke: 'black', lineWidth: 3 } );
    const leftCurve = new Path( new Shape().moveTo( 0, 0 ).quadraticCurveTo( xControl, yControl, xTip, yTip ), { stroke: 'black', lineWidth: 3 } );

    const compareIcon = new HBox( {
      spacing: 5, children: [
        new Node( { children: [ leftCurve, createArrowhead( Math.PI / 3, new Vector2( xTip, yTip ) ) ] } ),
        new Node( { children: [ rightCurve, createArrowhead( Math.PI - Math.PI / 3, new Vector2( -xTip, yTip ) ) ] } )
      ]
    } );

    const separateIcon = new HBox( {
      spacing: 5, children: [
        new Node( { children: [ leftCurve, createArrowhead( Math.PI / 3 + Math.PI * 0.5, new Vector2( 0, 0 ) ) ] } ),
        new Node( { children: [ rightCurve, createArrowhead( Math.PI - Math.PI / 3 - Math.PI / 2, new Vector2( 0, 0 ) ) ] } )
      ]
    } );

    const maxWidth = Math.max( compareIcon.width, separateIcon.width );
    const maxHeight = Math.max( compareIcon.height, separateIcon.height );

    const compareButton = new RectangularPushButton( {
      content: new Rectangle( 0, 0, maxWidth, maxHeight, {
        children: [ compareIcon.mutate( { centerX: maxWidth / 2, centerY: maxHeight / 2 } ) ]
      } ),
      baseColor: new Color( 255, 255, 0 ),
      disabledBaseColor: new Color( 220, 220, 220 ),
      listener: compareButtonPressed
    } );

    const separateButton = new RectangularPushButton( {
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
    const headWidth = 10;
    const headHeight = 10;
    const directionUnitVector = Vector2.createPolar( 1, angle );
    const orthogonalUnitVector = directionUnitVector.perpendicular;
    const tip = directionUnitVector.times( headHeight ).plus( tail );
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