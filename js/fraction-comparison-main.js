// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Comparison' sim.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  const IntroScreen = require( 'FRACTION_COMPARISON/intro/IntroScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const fractionComparisonTitleString = require( 'string!FRACTION_COMPARISON/fraction-comparison.title' );

  const simOptions = {
    credits: {
      leadDesign: 'Karina K. R. Hensberry',
      softwareDevelopment: 'Sam Reid',
      team: 'Bryce Gruneich, Trish Loeblein, Ariel Paul, Kathy Perkins',
      graphicArts: 'Sharon Siman-Tov'
    }
  };

  SimLauncher.launch( function() {
    const sim = new Sim( fractionComparisonTitleString, [ new IntroScreen() ], simOptions );
    sim.start();
  } );
} );