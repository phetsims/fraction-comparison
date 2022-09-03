// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Comparison' sim.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import fractionComparisonStrings from './fractionComparisonStrings.js';
import IntroScreen from './intro/IntroScreen.js';

const fractionComparisonTitleStringProperty = fractionComparisonStrings[ 'fraction-comparison' ].titleStringProperty;

const simOptions = {
  credits: {
    leadDesign: 'Karina K. R. Hensberry',
    softwareDevelopment: 'Sam Reid',
    team: 'Bryce Gruneich, Trish Loeblein, Ariel Paul, Kathy Perkins',
    graphicArts: 'Sharon Siman-Tov'
  }
};

simLauncher.launch( () => {
  const sim = new Sim( fractionComparisonTitleStringProperty, [ new IntroScreen() ], simOptions );
  sim.start();
} );