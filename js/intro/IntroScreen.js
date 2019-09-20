// Copyright 2013-2019, University of Colorado Boulder

/**
 * The 'Intro' screen.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  const inherit = require( 'PHET_CORE/inherit' );
  const IntroModel = require( 'FRACTION_COMPARISON/intro/model/IntroModel' );
  const IntroView = require( 'FRACTION_COMPARISON/intro/view/IntroView' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  function IntroScreen() {
    Screen.call( this,
      function() { return new IntroModel(); },
      function( model ) { return new IntroView( model, ModelViewTransform2.createIdentity() ); },
      { backgroundColorProperty: new Property( '#e1f1f1' ) }
    );
  }

  fractionComparison.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );
