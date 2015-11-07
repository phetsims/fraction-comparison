// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Comparison' sim.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var IntroScreen = require( 'FRACTION_COMPARISON/intro/IntroScreen' );

  // strings
  var fractionComparisonTitleString = require( 'string!FRACTION_COMPARISON/fraction-comparison.title' );

  var screens = [ new IntroScreen() ];

  var simOptions = {
    credits: {
      leadDesign: 'Karina K. R. Hensberry',
      softwareDevelopment: 'Sam Reid',
      team: 'Bryce Gruneich, Trish Loeblein, Ariel Paul, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( fractionComparisonTitleString, screens, simOptions );
    sim.start();
  } );
} );