// Copyright 2013-2015, University of Colorado Boulder

/**
 * The region where fractions can be dragged to be compared, in the center top of the screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var CompareSeparateButton = require( 'FRACTION_COMPARISON/intro/view/CompareSeparateButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   *
   * @param {Function} compareButtonPressed
   * @param {Function} separateButtonPressed
   * @param {Property.<boolean>} compareBothProperty
   * @param {Property.<boolean>} eitherCompareProperty
   * @param {Object} [options]
   * @constructor
   */
  function ComparisonRegion( compareButtonPressed, separateButtonPressed, compareBothProperty, eitherCompareProperty, options ) {
    var comparisonRegionLength = 220;
    Rectangle.call( this, 0, 0, comparisonRegionLength, comparisonRegionLength, 10, 10, { lineStroke: 1, fill: 'white' } );

    this.addChild( new CompareSeparateButton( compareButtonPressed, separateButtonPressed, compareBothProperty, {
      centerX: this.bounds.centerX,
      bottom: this.bottom - 5
    } ) );

    var target = new Rectangle( 0, 0, 180, 100, { stroke: 'red', lineWidth: 1, lineDash: [ 6, 5 ], centerX: this.bounds.centerX, top: 59 } );
    this.addChild( target );

    //Only show the target region if both shapes are not in the compare region
    eitherCompareProperty.link( function( eitherCompare ) {
      target.visible = !eitherCompare;
    } );

    this.mutate( options );
  }

  fractionComparison.register( 'ComparisonRegion', ComparisonRegion );

  return inherit( Rectangle, ComparisonRegion );
} );