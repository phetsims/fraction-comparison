// Copyright 2002-2013, University of Colorado Boulder

/**
 * The horizontal number line that shows the values
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var FractionNode = require( 'FRACTION_COMPARISON/intro/view/FractionNode' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  function NumberLineNode( leftFractionModel, rightFractionModel, visibleProperty, options ) {
    Node.call( this );

    var leftFractionProperty = leftFractionModel.property( 'fraction' );
    var rightFractionProperty = rightFractionModel.property( 'fraction' );

    var width = 300;
    var line = new Line( 0, 0, width, 0, {lineWidth: 2, stroke: 'black'} );

    this.addChild( line );

    var leftFill = '#61c9e4';
    var rightFill = '#dc528d';
    var leftRectangle = new Rectangle( 0, -20, width, 20, {fill: leftFill, lineWidth: 1, stroke: 'black'} );
    this.addChild( leftRectangle );
    var rightRectangle = new Rectangle( 0, -40, width, 20, {fill: rightFill, lineWidth: 1, stroke: 'black'} );
    this.addChild( rightRectangle );

    leftFractionProperty.link( function( leftFraction ) { leftRectangle.setRectWidth( leftFraction * width ); } );
    rightFractionProperty.link( function( rightFraction ) { rightRectangle.setRectWidth( rightFraction * width ); } );

    var linesNode = new Node( {pickable: false} );
    this.addChild( linesNode );

    //Create the fraction nodes, and size them to be about the same size as the 0/1 labels.  Cannot use maths to get the scaling exactly right since the font bounds are wonky, so just use a heuristic scale factor
    var fractionNodeScale = 0.22;
    var fractionTop = 14;
    var leftFractionNode = new FractionNode( leftFractionModel.property( 'numerator' ), leftFractionModel.property( 'denominator' ), {interactive: false, scale: fractionNodeScale, fill: leftFill, top: fractionTop} );
    this.addChild( leftFractionNode );
    var coloredTickStroke = 2;
    var leftFractionNodeTickMark = new Line( 0, 0, 0, 0, {lineWidth: coloredTickStroke, stroke: leftFill} );
    this.addChild( leftFractionNodeTickMark );

    var rightFractionNode = new FractionNode( rightFractionModel.property( 'numerator' ), rightFractionModel.property( 'denominator' ), {interactive: false, scale: fractionNodeScale, fill: rightFill, top: fractionTop} );
    this.addChild( rightFractionNode );
    var rightFractionNodeTickMark = new Line( 0, 0, 0, 0, {lineWidth: coloredTickStroke, stroke: rightFill} );
    this.addChild( rightFractionNodeTickMark );

    //When tick spacing or labeled ticks change, update the ticks
    //TODO: Could be redesigned so that the black ticks aren't changing when the numerators change, if it is a performance problem
    DerivedProperty.multilink( [visibleProperty, leftFractionModel.property( 'numerator' ), leftFractionModel.property( 'denominator' ),
        rightFractionModel.property( 'numerator' ), rightFractionModel.property( 'denominator' )],
      function( visible, leftNumerator, leftDenominator, rightNumerator, rightDenominator ) {
        var lineHeight = 16;
        var leastCommonDenominator = NumberLineNode.leastCommonDenominator( leftDenominator, rightDenominator );
        var lines = [];
        var maxTickIndex = leastCommonDenominator;
        for ( var i = 0; i <= maxTickIndex; i++ ) {
          var distance = i / maxTickIndex * width;

          if ( visible || i === 0 || i === maxTickIndex ) {
            lines.push( new Line( distance, -lineHeight / 2, distance, lineHeight / 2, {lineWidth: 1.5, stroke: 'black'} ) );
          }
        }
        linesNode.children = lines;

        //Update the left/right fraction nodes for the fraction value and the colored tick mark
        var leftXOffset = leftNumerator === 0 || leftNumerator === leftDenominator ? lineHeight :
                          Math.abs( leftNumerator / leftDenominator - rightNumerator / rightDenominator ) < 1E-6 ? lineHeight * 0.8 :
                          0;
        var leftCenterX = width * leftNumerator / leftDenominator - leftXOffset;
        leftFractionNode.centerX = leftCenterX;
        leftFractionNodeTickMark.setLine( leftCenterX, leftFractionNode.top, width * leftNumerator / leftDenominator, leftFractionNode.top - fractionTop );

        var rightXOffset = rightNumerator === 0 || rightNumerator === rightDenominator ? lineHeight :
                           Math.abs( rightNumerator / rightDenominator - leftNumerator / leftDenominator ) < 1E-6 ? lineHeight * 0.8 :
                           0;
        var rightCenterX = width * rightNumerator / rightDenominator + rightXOffset;
        rightFractionNode.centerX = rightCenterX;
        rightFractionNodeTickMark.setLine( rightCenterX, rightFractionNode.top, width * rightNumerator / rightDenominator, rightFractionNode.top - fractionTop );

        //Handle overlapping number labels, see https://github.com/phetsims/fraction-comparison/issues/31
        if ( leftFractionNode.bounds.intersectsBounds( rightFractionNode.bounds ) && Math.abs( rightNumerator / rightDenominator - leftNumerator / leftDenominator ) > 1E-6 ) {
          var overlapAmount = leftFractionModel.fraction > rightFractionModel.fraction ?
                              leftFractionNode.bounds.minX - rightFractionNode.bounds.maxX + 2 :
                              leftFractionNode.bounds.maxX - rightFractionNode.bounds.minX + 2;

          leftFractionNode.translate( -overlapAmount / 2 / fractionNodeScale, 0 );
          rightFractionNode.translate( +overlapAmount / 2 / fractionNodeScale, 0 );
        }
      } );

    var labelTop = linesNode.children[0].bounds.maxY;

    var zeroLabel = new Text( '0', {centerX: linesNode.children[0].centerX, top: labelTop, font: new PhetFont( { size: 26} )} );
    var oneLabel = new Text( '1', {centerX: linesNode.children[linesNode.children.length - 1].centerX, top: labelTop, font: new PhetFont( { size: 26} )} );

    this.addChild( zeroLabel );
    this.addChild( oneLabel );

    //Only show certain properties when the number line check box is selected
    visibleProperty.linkAttribute( leftRectangle, 'visible' );
    visibleProperty.linkAttribute( rightRectangle, 'visible' );
    visibleProperty.linkAttribute( leftFractionNode, 'visible' );
    visibleProperty.linkAttribute( rightFractionNode, 'visible' );
    visibleProperty.linkAttribute( leftFractionNodeTickMark, 'visible' );
    visibleProperty.linkAttribute( rightFractionNodeTickMark, 'visible' );

    this.mutate( options );
  }

  return inherit( Node, NumberLineNode, {},

    //statics
    {
      leastCommonDenominator: function( a, b ) { return a * b / NumberLineNode.greatestCommonDenominator( a, b ); },
      greatestCommonDenominator: function gcd( a, b ) { return b ? gcd( b, a % b ) : Math.abs( a ); }
    } );
} );