// Copyright 2013-2019, University of Colorado Boulder

/**
 * The region where fractions can be dragged to be compared, in the center top of the screen.
 *
 * @author Sam Reid
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import fractionComparison from '../../fractionComparison.js';
import CompareSeparateButton from './CompareSeparateButton.js';

/**
 *
 * @param {function} compareButtonPressed
 * @param {function} separateButtonPressed
 * @param {Property.<boolean>} compareBothProperty
 * @param {Property.<boolean>} eitherCompareProperty
 * @param {Object} [options]
 * @constructor
 */
function ComparisonRegion( compareButtonPressed, separateButtonPressed, compareBothProperty, eitherCompareProperty, options ) {
  const comparisonRegionLength = 220;
  Rectangle.call( this, 0, 0, comparisonRegionLength, comparisonRegionLength, 10, 10, {
    lineStroke: 1,
    fill: 'white'
  } );

  this.addChild( new CompareSeparateButton( compareButtonPressed, separateButtonPressed, compareBothProperty, {
    centerX: this.bounds.centerX,
    bottom: this.bottom - 5
  } ) );

  const target = new Rectangle( 0, 0, 180, 100, {
    stroke: 'red',
    lineWidth: 1,
    lineDash: [ 6, 5 ],
    centerX: this.bounds.centerX,
    top: 59
  } );
  this.addChild( target );

  //Only show the target region if both shapes are not in the compare region
  eitherCompareProperty.link( function( eitherCompare ) {
    target.visible = !eitherCompare;
  } );

  this.mutate( options );
}

fractionComparison.register( 'ComparisonRegion', ComparisonRegion );

inherit( Rectangle, ComparisonRegion );
export default ComparisonRegion;