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

    var leftRectangle = new Rectangle( 0, -20, width, 20, {fill: '#61c9e4', lineWidth: 1, stroke: 'black'} );
    this.addChild( leftRectangle );
    var rightRectangle = new Rectangle( 0, -40, width, 20, {fill: '#dc528d', lineWidth: 1, stroke: 'black'} );
    this.addChild( rightRectangle );

    visibleProperty.linkAttribute( leftRectangle, 'visible' );
    visibleProperty.linkAttribute( rightRectangle, 'visible' );

    leftFractionProperty.link( function( leftFraction ) { leftRectangle.setRectWidth( leftFraction * width ); } );
    rightFractionProperty.link( function( rightFraction ) { rightRectangle.setRectWidth( rightFraction * width ); } );

    var linesNode = new Node( {pickable: false} );
    this.addChild( linesNode );

    //When tick spacing or labeled ticks change, update the ticks
    DerivedProperty.create( [leftFractionModel.property( 'numerator' ), leftFractionModel.property( 'denominator' ),
        rightFractionModel.property( 'numerator' ), rightFractionModel.property( 'denominator' )],
      function( leftNumerator, leftDenominator, rightNumerator, rightDenominator ) {
        var leastCommonDenominator = NumberLineNode.leastCommonDenominator( leftDenominator, rightDenominator );
        var lines = [];
        var maxTickIndex = leastCommonDenominator;
        for ( var i = 0; i <= maxTickIndex; i++ ) {
          var distance = i / maxTickIndex * width;
          var matchesLeft = Math.abs( i / maxTickIndex - leftNumerator / leftDenominator ) < 1E-6;
          var matchesRight = Math.abs( i / maxTickIndex - rightNumerator / rightDenominator ) < 1E-6;
          var lineHeight = (i === 0 || i === maxTickIndex || matchesLeft || matchesRight) ? 16 :
                           8;
          var segment = new Line( distance, -lineHeight / 2, distance, lineHeight / 2, {lineWidth: (i === 0 || i === maxTickIndex) ? 1.5 : 1, stroke: 'black'} );
          lines.push( segment );
        }

        linesNode.children = lines;
      } );

    var labelTop = linesNode.children[0].bounds.maxY;

    var zeroLabel = new Text( '0', {centerX: linesNode.children[0].centerX, top: labelTop, font: new PhetFont( { size: 26} )} );
    var oneLabel = new Text( '1', {centerX: linesNode.children[linesNode.children.length - 1].centerX, top: labelTop, font: new PhetFont( { size: 26} )} );

    this.addChild( zeroLabel );
    this.addChild( oneLabel );

    //Create the fraction nodes, and size them to be about the same size as the 0/1 labels.  Cannot use maths to get the scaling exactly right since the font bounds are wonky, so just use a heuristic scale factor
    var fractionNodeScale = 0.15;
    var leftFractionNode = new FractionNode( leftFractionModel.property( 'numerator' ), leftFractionModel.property( 'denominator' ), {interactive: false, scale: fractionNodeScale, top: labelTop} );
    leftFractionModel.property( 'fraction' ).link( function() { leftFractionNode.centerX = leftFractionModel.fraction * width; } );
    this.addChild( leftFractionNode );

    var rightFractionNode = new FractionNode( rightFractionModel.property( 'numerator' ), rightFractionModel.property( 'denominator' ), {interactive: false, scale: fractionNodeScale, top: labelTop} );
    rightFractionModel.property( 'fraction' ).link( function() { rightFractionNode.centerX = rightFractionModel.fraction * width; } );
    this.addChild( rightFractionNode );

    this.mutate( options );
  }

  return inherit( Node, NumberLineNode, {},

    //statics
    {
      leastCommonDenominator: function( a, b ) { return a * b / NumberLineNode.greatestCommonDenominator( a, b ); },
      greatestCommonDenominator: function gcd( a, b ) { return b ? gcd( b, a % b ) : Math.abs( a ); }
    } );
} );