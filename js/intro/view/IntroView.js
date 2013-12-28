// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var FractionNode = require( 'FRACTION_COMPARISON/intro/view/FractionNode' );
  var ComparisonRegion = require( 'FRACTION_COMPARISON/intro/view/ComparisonRegion' );
  var HorizontalBarContainerNode = require( 'FRACTION_COMPARISON/intro/view/HorizontalBarContainerNode' );
  var CheckBox = require( 'SUN/CheckBox' );

  var RepresentationPanel = require( 'FRACTION_COMPARISON/intro/view/RepresentationPanel' );
  var NumberLineNode = require( 'FRACTION_COMPARISON/intro/view/NumberLineNode' );

  function IntroView( model ) {

    var introView = this;
    ScreenView.call( introView, { renderer: 'svg' } );

    //Representation panel at the bottom center
    var representationPanel = new RepresentationPanel( model.property( 'representation' ), {bottom: this.layoutBounds.maxY - 5, centerX: this.layoutBounds.centerX} );
    this.addChild( representationPanel );

    var numberLineNode = new NumberLineNode( model.leftFractionModel.property( 'fraction' ), model.rightFractionModel.property( 'fraction' ), model.property( 'numberLineVisible' ),
      {centerX: this.layoutBounds.centerX, bottom: representationPanel.top - 70} );
    this.addChild( numberLineNode );

    //TODO: Manually tuned to be centered on the number line part.  Could be affected based on the font, would be superior to lay out based on global bounds of number line
    this.addChild( new CheckBox( new Node(), model.property( 'numberLineVisible' ), {top: numberLineNode.bounds.maxY + 20, centerX: numberLineNode.centerX, scale: 1.15} ) );

    this.addChild( new ResetAllButton( model.reset.bind( model ), {
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      right: this.layoutBounds.maxX - 2,
      bottom: this.layoutBounds.maxY - 2
    } ) );

    //To make it possible to drag pieces from the left over pieces in the right, we cannot just make subtrees for the left and right views
    //So model the pieces individually

    var distanceFromSideToFraction = 50;
    var leftFractionNode = new FractionNode( model.leftFractionModel.property( 'numerator' ), model.leftFractionModel.property( 'denominator' ), {
      left: distanceFromSideToFraction,
      bottom: representationPanel.bounds.minY
    } );
    this.addChild( leftFractionNode );

    var rightFractionNode = new FractionNode( model.rightFractionModel.property( 'numerator' ), model.rightFractionModel.property( 'denominator' ), {
      right: this.layoutBounds.maxX - distanceFromSideToFraction,
      bottom: representationPanel.bounds.minY
    } );
    this.addChild( rightFractionNode );

    var comparisonRegion = new ComparisonRegion( {top: 10, centerX: this.layoutBounds.centerX} );
    this.addChild( comparisonRegion );

    //Containers
    var leftHorizontalBarContainerNode = new HorizontalBarContainerNode( model.leftFractionModel.property( 'fraction' ), 'green', {left: 10, top: 10, centerY: comparisonRegion.bounds.centerY} );
    this.addChild( leftHorizontalBarContainerNode );

    var rightHorizontalBarContainerNode = new HorizontalBarContainerNode( model.rightFractionModel.property( 'fraction' ), 'blue', {right: this.layoutBounds.maxX - 10, centerY: comparisonRegion.bounds.centerY} );
    this.addChild( rightHorizontalBarContainerNode );
  }

  //TODO: redo layout so things float to the sides (and bottom)
  return inherit( ScreenView, IntroView );
} );