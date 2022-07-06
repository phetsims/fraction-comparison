// Copyright 2013-2021, University of Colorado Boulder

/**
 * The large horizontal panel at the bottom of the screen for selecting different representations.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Circle } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import fractionComparison from '../../fractionComparison.js';

// constants
const ICON_SCALE = 0.75;

class RepresentationPanel extends Panel {

  /**
   * @param {Property.<string>} representationProperty
   * @param {Object} [options]
   */
  constructor( representationProperty, options ) {

    options = merge( {
      fill: '#efe8e1',
      xMargin: 10,
      yMargin: 7
    }, options );

    const content = new RectangularRadioButtonGroup( representationProperty, [
      {
        value: 'horizontal-bar',
        node: new Rectangle( 0, 0, 50 * ICON_SCALE, 30 * ICON_SCALE, { fill: '#208644', lineWidth: 1, stroke: 'black' } )
      },
      {
        value: 'vertical-bar',
        node: new Rectangle( 0, 0, 14 * ICON_SCALE, 50 * ICON_SCALE, { fill: 'red', lineWidth: 1, stroke: 'black' } )
      },
      { value: 'circle', node: new Circle( 22 * ICON_SCALE, { fill: '#145991', lineWidth: 1, stroke: 'black' } ) },
      {
        value: 'chocolate',
        node: new Rectangle( 0, 0, 50 * ICON_SCALE, 40 * ICON_SCALE, { fill: '#563329', lineWidth: 1, stroke: 'black' } )
      },
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
      // RectangularRadioButtonGroup options
      orientation: 'horizontal',
      spacing: 12,
      radioButtonOptions: {
        baseColor: 'white',
        cornerRadius: 10
      }
    } );

    super( content, options );
  }
}

fractionComparison.register( 'RepresentationPanel', RepresentationPanel );
export default RepresentationPanel;