// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for the left/right fraction with up/down spinners for denominator/numerator
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Line = require( 'SCENERY/nodes/Line' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var UpDownSpinner = require( 'SCENERY_PHET/UpDownSpinner' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function FractionNode( numeratorProperty, denominatorProperty, options ) {
    Node.call( this );
    var font = new PhetFont( { size: 84} );
    var numeratorNode = new Text( numeratorProperty.get(), { font: font } );

    var line = new Line( 0, 0, 80, 0, {lineWidth: 4, stroke: 'black'} );
    this.addChild( line );

    numeratorProperty.link( function( value ) {
      numeratorNode.text = value + '';
      numeratorNode.centerX = line.centerX;
    } );

    var denominatorNode = new Text( denominatorProperty.get(), { font: font } );
    denominatorProperty.link( function( value ) {
      denominatorNode.text = value + '';
      denominatorNode.centerX = line.centerX;
    } );

    numeratorNode.mutate( {centerX: line.centerX, bottom: line.bounds.minY - 2} );
    denominatorNode.mutate( {centerX: line.centerX, top: line.bounds.maxY - 2} );

    this.addChild( numeratorNode );
    this.addChild( denominatorNode );

    var numeratorUpEnabledProperty = new DerivedProperty( [numeratorProperty, denominatorProperty], function( numerator, denominator ) { return numerator < denominator; } );
    var numeratorDownEnabledProperty = new DerivedProperty( [numeratorProperty], function( numerator ) { return numerator > 0; } );
    var denominatorUpEnabledProperty = new DerivedProperty( [denominatorProperty], function( denominator ) { return denominator < 10;} );
    var denominatorDownEnabledProperty = new DerivedProperty( [ numeratorProperty, denominatorProperty], function( numerator, denominator ) { return denominator > 1 && numerator < denominator;} );

    var numeratorSpinner = new UpDownSpinner( numeratorProperty, numeratorUpEnabledProperty, numeratorDownEnabledProperty );
    var denominatorSpinner = new UpDownSpinner( denominatorProperty, denominatorUpEnabledProperty, denominatorDownEnabledProperty );

    var spinners = new VBox( {spacing: 20, children: [numeratorSpinner, denominatorSpinner], left: line.bounds.maxX + 5, centerY: line.bounds.centerY} );
    this.addChild( spinners );

    this.mutate( options );
  }

  return inherit( Node, FractionNode );
} );