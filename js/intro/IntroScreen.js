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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  var screenTitle = 'Intro';

  function IntroScreen() {
    Screen.call( this,
      screenTitle,
      new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'white' } ),
      function() { return new IntroModel(); },
      function( model ) { return new IntroView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColor: '#e1f1f1' }
    );
  }

  fractionComparison.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );