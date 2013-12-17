// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Intro' screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  var RepresentationPanel = require( 'FRACTION_COMPARISON/intro/view/RepresentationPanel' );

  function IntroView( model ) {

    var introView = this;
    ScreenView.call( introView, { renderer: 'svg' } );

    //Representation panel at the bottom center
    var representationPanel = new RepresentationPanel( model.property( 'representation' ), {bottom: this.layoutBounds.maxY - 5, centerX: this.layoutBounds.centerX} );
    this.addChild( representationPanel );

    this.addChild( new ResetAllButton( model.reset.bind( model ), {
      radius: 24,
      touchAreaRadius: 24 * 1.3,
      right: this.layoutBounds.maxX - 2,
      bottom: this.layoutBounds.maxY - 2
    } ) );
  }

  return inherit( ScreenView, IntroView );
} );