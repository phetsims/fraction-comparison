// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Comparison' sim.
 *
 * @author Sam Reid
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import fractionComparisonStrings from './fractionComparisonStrings.js';
import IntroScreen from './intro/IntroScreen.js';

const fractionComparisonTitleString = fractionComparisonStrings[ 'fraction-comparison' ].title;

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