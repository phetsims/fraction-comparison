// Copyright 2013-2019, University of Colorado Boulder

/**
 * The large horizontal panel at the bottom of the screen for selecting different representations.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  const ICON_SCALE = 0.75;

  /**
   *
   * @param {Property.<string>} representationProperty
   * @param {Object} [options]
   * @constructor
   */
  function RepresentationPanel( representationProperty, options ) {

    options = _.extend( {
      fill: '#efe8e1',
      xMargin: 10,
      yMargin: 7
    }, options );

    const content = new RadioButtonGroup( representationProperty, [
      { value: 'horizontal-bar', node: new Rectangle( 0, 0, 50 * ICON_SCALE, 30 * ICON_SCALE, { fill: '#208644', lineWidth: 1, stroke: 'black' } ) },
      { value: 'vertical-bar', node: new Rectangle( 0, 0, 14 * ICON_SCALE, 50 * ICON_SCALE, { fill: 'red', lineWidth: 1, stroke: 'black' } ) },
      { value: 'circle', node: new Circle( 22 * ICON_SCALE, { fill: '#145991', lineWidth: 1, stroke: 'black' } ) },
      { value: 'chocolate', node: new Rectangle( 0, 0, 50 * ICON_SCALE, 40 * ICON_SCALE, { fill: '#563329', lineWidth: 1, stroke: 'black' } ) },
      {
        value: 'different-sized-circles',
        node: new Node( {
          children: [
            new Circle( 20 * ICON_SCALE, { fill: '#f0d041', lineWidth: 1, stroke: 'black', x: 26, y: -26 } ),
            new Circle( 12 * ICON_SCALE, { fill: '#f0d041', lineWidth: 1, stroke: 'black' } )
          ]
        } )
      }
    ], {
      // RadioButtonGroup options
      orientation: 'horizontal',
      baseColor: 'white',
      cornerRadius: 10,
      spacing: 12
    } );

    Panel.call( this, content, options );
  }

  fractionComparison.register( 'RepresentationPanel', RepresentationPanel );

  return inherit( Panel, RepresentationPanel );
} );