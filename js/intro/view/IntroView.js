// Copyright 2013-2017, University of Colorado Boulder

/**
 * View for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Checkbox = require( 'SUN/Checkbox' );
  var ComparisonRegion = require( 'FRACTION_COMPARISON/intro/view/ComparisonRegion' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var FractionNode = require( 'FRACTION_COMPARISON/intro/view/FractionNode' );
  var HorizontalBarContainerNode = require( 'FRACTION_COMPARISON/intro/view/HorizontalBarContainerNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LeftRightSpinner = require( 'SCENERY_PHET/LeftRightSpinner' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  var NumberLineNode = require( 'FRACTION_COMPARISON/intro/view/NumberLineNode' );
  var RepresentationPanel = require( 'FRACTION_COMPARISON/intro/view/RepresentationPanel' );

  /***
   * @param {IntroModel} model
   * @constructor
   */
  function IntroView( model ) {

    var self = this;
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    //Representation panel at the bottom center
    var representationPanel = new RepresentationPanel( model.representationProperty, {
      bottom: this.layoutBounds.maxY - 5,
      centerX: this.layoutBounds.centerX
    } );
    this.addChild( representationPanel );

    var numberLineNode = new NumberLineNode( model.leftFractionModel, model.rightFractionModel, model.numberLineVisibleProperty,
      { centerX: this.layoutBounds.centerX, bottom: representationPanel.top - 70 } );
    this.addChild( numberLineNode );

    //TODO: Manually tuned to be centered on the number line part.  Could be affected based on the font, would be superior to lay out based on global bounds of number line
    this.addChild( new Checkbox( new Rectangle( 0, 0, 0, 0 ), model.numberLineVisibleProperty, {
      top: numberLineNode.bounds.maxY + 7,
      centerX: numberLineNode.centerX,
      scale: 1.15
    } ) );

    this.addChild( new ResetAllButton( {
      listener: model.reset.bind( model ),
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      right: this.layoutBounds.maxX - 2,
      bottom: this.layoutBounds.maxY - 2
    } ) );

    //To make it possible to drag pieces from the left over pieces in the right, we cannot just make subtrees for the left and right views
    //So model the pieces individually

    var distanceFromSideToFraction = 50;
    var leftFractionNode = new FractionNode( model.leftFractionModel.numeratorProperty,
      model.leftFractionModel.denominatorProperty, {
        left: distanceFromSideToFraction,
        bottom: representationPanel.bounds.minY
      } );
    this.addChild( leftFractionNode );

    var rightFractionNode = new FractionNode( model.rightFractionModel.numeratorProperty,
      model.rightFractionModel.denominatorProperty, {
        right: this.layoutBounds.maxX - distanceFromSideToFraction,
        bottom: representationPanel.bounds.minY
      } );
    this.addChild( rightFractionNode );

    var compareButtonPressed = function() {
      leftHorizontalBarContainerNode.animateToComparison();
      rightHorizontalBarContainerNode.animateToComparison();
    };

    var separateButtonPressed = function() {
      leftHorizontalBarContainerNode.animateToStart();
      rightHorizontalBarContainerNode.animateToStart();
    };

    var comparisonRegion = new ComparisonRegion( compareButtonPressed, separateButtonPressed, model.bothCompareProperty, model.eitherCompareProperty, {
      top: 10,
      centerX: this.layoutBounds.centerX
    } );
    this.addChild( comparisonRegion );

    //Containers
    var leftHorizontalBarContainerNode = new HorizontalBarContainerNode(
      model.leftFractionModel,
      '#61c9e4',
      model.leftFractionModel.stateProperty,
      model.leftFractionModel.animatingProperty,
      model.leftFractionModel.divisionsProperty,
      true,
      function( width, height ) {
        return new Vector2( width / 2 + 10, comparisonRegion.bounds.centerY );
      }, function( width, height ) {
        return new Vector2( self.layoutBounds.centerX, comparisonRegion.bounds.centerY );
      } );

    var rightHorizontalBarContainerNode = new HorizontalBarContainerNode(
      model.rightFractionModel,
      '#dc528d',
      model.rightFractionModel.stateProperty,
      model.rightFractionModel.animatingProperty,
      model.rightFractionModel.divisionsProperty,
      true,
      function( width, height ) {
        return new Vector2( self.layoutBounds.maxX - width / 2 - 10, comparisonRegion.bounds.centerY );
      }, function( width, height ) {
        return new Vector2( self.layoutBounds.centerX, comparisonRegion.bounds.centerY );
      } );

    //Show the shadows right behind the originals, and don't let the shadows be moved
    var leftHorizontalBarContainerNodeShadow = new HorizontalBarContainerNode(
      model.leftFractionModel,
      '#61c9e4',
      model.leftFractionModel.stateProperty,
      model.leftFractionModel.animatingProperty,
      model.leftFractionModel.divisionsProperty,
      false,
      function( width, height ) {
        return new Vector2( width / 2 + 10, comparisonRegion.bounds.centerY );
      }, function( width, height ) {
        return new Vector2( self.layoutBounds.centerX, comparisonRegion.bounds.centerY );
      } );

    var rightHorizontalBarContainerNodeShadow = new HorizontalBarContainerNode(
      model.rightFractionModel,
      '#dc528d',
      model.rightFractionModel.stateProperty,
      model.rightFractionModel.animatingProperty,
      model.rightFractionModel.divisionsProperty,
      false,
      function( width, height ) {
        return new Vector2( self.layoutBounds.maxX - width / 2 - 10, comparisonRegion.bounds.centerY );
      }, function( width, height ) {
        return new Vector2( self.layoutBounds.centerX, comparisonRegion.bounds.centerY );
      } );

    this.addChild( leftHorizontalBarContainerNodeShadow );
    this.addChild( rightHorizontalBarContainerNodeShadow );

    this.addChild( leftHorizontalBarContainerNode );
    this.addChild( rightHorizontalBarContainerNode );

    //The dotted line to show if the "underneath" (z-order) value is too small to see.
    var lineWidth = 3;
    var leftDottedLineContainerNode = new Rectangle( 0, 0, 180, 100, {
      stroke: '#61c9e4',
      lineWidth: lineWidth,
      lineDash: [ 11, 7 ]
    } );
    model.leftFractionModel.fractionProperty.link( function( value ) {
      leftDottedLineContainerNode.setRectWidth( value * 180 );
    } );

    leftDottedLineContainerNode.left = leftHorizontalBarContainerNode.comparePosition.x - leftHorizontalBarContainerNode.width / 2 - 1;
    leftDottedLineContainerNode.centerY = leftHorizontalBarContainerNode.comparePosition.y;

    var leftValueSmallerProperty = new DerivedProperty( [ model.leftFractionModel.fractionProperty, model.rightFractionModel.fractionProperty ],
      function( leftFraction, rightFraction ) {
        return leftFraction <= rightFraction;
      } );

    //Only show the dotted line for the "underneath" shape after animation is complete
    var eitherAnimating = new DerivedProperty(
      [ model.leftFractionModel.animatingProperty, model.rightFractionModel.animatingProperty ],
      function( leftAnimating, rightAnimating ) {
        return leftAnimating || rightAnimating;
      } );

    var leftDottedLineContainerVisibleProperty = new DerivedProperty( [ model.bothCompareProperty, leftValueSmallerProperty, eitherAnimating ],
      function( bothCompare, leftValueSmaller, eitherAnimating ) {
        return bothCompare && leftValueSmaller && !eitherAnimating;
      } );
    leftDottedLineContainerVisibleProperty.linkAttribute( leftDottedLineContainerNode, 'visible' );
    this.addChild( leftDottedLineContainerNode );

    var leftDivisionsProperty = model.leftFractionModel.divisionsProperty;
    var leftDivisionSpinner = new LeftRightSpinner( leftDivisionsProperty,
      new DerivedProperty( [ leftDivisionsProperty ], function( leftDivisions ) { return leftDivisions > 1; } ),
      new DerivedProperty( [ leftDivisionsProperty ], function( leftDivisions ) { return leftDivisions < 10; } ),
      { centerX: leftHorizontalBarContainerNode.centerX, top: leftHorizontalBarContainerNode.bottom + 6 } );
    this.addChild( leftDivisionSpinner );

    var rightDivisionsProperty = model.rightFractionModel.divisionsProperty;
    var rightDivisionSpinner = new LeftRightSpinner( rightDivisionsProperty,
      new DerivedProperty( [ rightDivisionsProperty ], function( rightDivisions ) { return rightDivisions > 1; } ),
      new DerivedProperty( [ rightDivisionsProperty ], function( rightDivisions ) { return rightDivisions < 10; } ),
      { centerX: rightHorizontalBarContainerNode.centerX, top: rightHorizontalBarContainerNode.bottom + 6 } );
    this.addChild( rightDivisionSpinner );

    //Move the containers to the start locations on "reset all", see #30
    model.leftFractionModel.stateProperty.link( function( state ) {
      if ( state === 'start' ) {
        leftHorizontalBarContainerNode.animateToStart();
      }
    } );

    model.rightFractionModel.stateProperty.link( function( state ) {
      if ( state === 'start' ) {
        rightHorizontalBarContainerNode.animateToStart();
      }
    } );
  }

  fractionComparison.register( 'IntroView', IntroView );

  //TODO: redo layout so things float to the sides (and bottom)
  return inherit( ScreenView, IntroView );
} );