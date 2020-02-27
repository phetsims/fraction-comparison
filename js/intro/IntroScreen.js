// Copyright 2013-2019, University of Colorado Boulder

/**
 * The 'Intro' screen.
 *
 * @author Sam Reid
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import fractionComparison from '../fractionComparison.js';
import IntroModel from './model/IntroModel.js';
import IntroView from './view/IntroView.js';

function IntroScreen() {
  Screen.call( this,
    function() { return new IntroModel(); },
    function( model ) { return new IntroView( model, ModelViewTransform2.createIdentity() ); },
    { backgroundColorProperty: new Property( '#e1f1f1' ) }
  );
}

fractionComparison.register( 'IntroScreen', IntroScreen );

inherit( Screen, IntroScreen );
export default IntroScreen;