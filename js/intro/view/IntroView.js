// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var FractionNode = require( 'FRACTION_COMPARISON/intro/view/FractionNode' );
  var ComparisonRegion = require( 'FRACTION_COMPARISON/intro/view/ComparisonRegion' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Vector2 = require( 'DOT/Vector2' );

  var RepresentationPanel = require( 'FRACTION_COMPARISON/intro/view/RepresentationPanel' );
  var NumberLineNode = require( 'FRACTION_COMPARISON/intro/view/NumberLineNode' );

  var Bucket = require( 'PHETCOMMON/model/Bucket' );
  var BucketHole = require( 'SCENERY_PHET/bucket/BucketHole' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var BucketFront = require( 'SCENERY_PHET/bucket/BucketFront' );

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
    this.addChild( new CheckBox( new Node(), model.property( 'numberLineVisible' ), {top: numberLineNode.bounds.maxY, centerX: numberLineNode.centerX, scale: 1.5} ) );

    this.addChild( new ResetAllButton( model.reset.bind( model ), {
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      right: this.layoutBounds.maxX - 2,
      bottom: this.layoutBounds.maxY - 2
    } ) );

    //To make it possible to drag pieces from the left over pieces in the right, we cannot just make subtrees for the left and right views
    //So model the pieces individually

    var distanceFromBottomToFraction = 0;
    var distanceFromSideToFraction = 140;
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

    //Make the buckets right side up
    var identityTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), new Vector2( 0, 0 ), 1 );

    //Options for both buckets
    //Align using view coordinates
    var bucketOptions = {
      size: new Dimension2( 120, 50 ),
      baseColor: 'gray',
      caption: ''
    };

    var bucketBottom = this.layoutBounds.maxY - 225;
    var distanceFromBucketToSide = 4;

    var leftBucket = new Bucket( bucketOptions );
    var leftBucketHole = new BucketHole( leftBucket, identityTransform );
    var leftBucketFront = new BucketFront( leftBucket, identityTransform );
    leftBucketFront.left = distanceFromBucketToSide;
    leftBucketFront.bottom = bucketBottom;
    leftBucketHole.x = leftBucketFront.x;
    leftBucketHole.y = leftBucketFront.y;
    this.addChild( leftBucketHole );
    this.addChild( leftBucketFront );

    var rightBucket = new Bucket( bucketOptions );
    var rightBucketHole = new BucketHole( rightBucket, identityTransform );
    var rightBucketFront = new BucketFront( rightBucket, identityTransform );
    rightBucketFront.right = this.layoutBounds.maxX - distanceFromBucketToSide;
    rightBucketFront.bottom = bucketBottom;
    rightBucketHole.x = rightBucketFront.x;
    rightBucketHole.y = rightBucketFront.y;
    this.addChild( rightBucketHole );
    this.addChild( rightBucketFront );
  }

  //TODO: redo layout so things float to the sides (and bottom)
  return inherit( ScreenView, IntroView );
} );