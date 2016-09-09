// Copyright 2013-2015, University of Colorado Boulder

/**
 * The 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Screen = require( 'JOIST/Screen' );
  var IntroModel = require( 'FRACTION_COMPARISON/intro/model/IntroModel' );
  var IntroView = require( 'FRACTION_COMPARISON/intro/view/IntroView' );

  function IntroScreen() {
    Screen.call( this,
      function() { return new IntroModel(); },
      function( model ) { return new IntroView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColor: '#e1f1f1' }
    );
  }

  fractionComparison.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );