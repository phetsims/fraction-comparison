// Copyright 2013-2017, University of Colorado Boulder

/**
 * The draggable container node for horizontal bars
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionComparison = require( 'FRACTION_COMPARISON/fractionComparison' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NodeDragHandler = require( 'FRACTION_COMPARISON/intro/view/NodeDragHandler' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   *
   * @param {FractionModel} fractionModel
   * @param {string} color
   * @param {Property.<string>} stateProperty - see docs in FractionModel
   * @param {Property.<string>} animatingProperty
   * @param {Property.<number>} divisionsProperty - see docs in FractionModel
   * @param {boolean} interactive
   * @param {function} startPositionFunction - a function taking args (width,height) to compute the start center of the node
   * @param {function} comparePositionFunction - a function taking args (width,height) to compute the center position of the node when compared
   * @param {Object} [options]
   * @constructor
   */
  function HorizontalBarContainerNode( fractionModel,
                                       color,
                                       stateProperty,
                                       animatingProperty,
                                       divisionsProperty,
                                       interactive,
                                       startPositionFunction,
                                       comparePositionFunction,
                                       options ) {
    var fractionProperty = fractionModel.fractionProperty;
    var self = this;

    this.stateProperty = stateProperty;
    this.animatingProperty = animatingProperty;

    options = _.extend( { cursor: 'pointer' }, options );
    Node.call( this );

    var border = new Rectangle( 0, 0, 180, 100, { stroke: 'black', lineWidth: 1 } );
    this.addChild( border );

    this.contents = new Rectangle( 0, 0, fractionProperty.get() * 180, 100, {
      fill: color,
      stroke: 'black',
      lineWidth: 1
    } );

    fractionProperty.link( function( value ) {
      self.contents.setRectWidth( value * 180 );
    } );
    this.addChild( this.contents );

    //Solid lines to show pieces
    var pieceDivisions = new Node();
    Property.multilink( [ fractionModel.numeratorProperty, fractionModel.denominatorProperty ],
      function( numerator, denominator ) {
        var children = [];
        for ( var i = 1; i < numerator; i++ ) {
          var x = i * 180 / denominator;
          children.push( new Line( x, 0, x, 100, { stroke: 'black', lineWidth: 1 } ) );
        }
        pieceDivisions.children = children;

      } );
    this.addChild( pieceDivisions );

    //Dotted lines to show user-selected divisions
    var divisionsNode = new Node();
    divisionsProperty.link( function( divisions ) {
      var children = [];
      for ( var i = 1; i < divisions; i++ ) {
        children.push( new Line( i * 180 / divisions, 0, i * 180 / divisions, 100, {
          stroke: 'gray',
          lineDash: [ 5, 4 ],
          lineWidth: 1.5
        } ) );
      }
      divisionsNode.children = children;
    } );
    this.addChild( divisionsNode );

    //Only show the separator lines if the user is not dragging/comparing the object (i.e. it is at its start location)
    if ( interactive ) {
      this.stateProperty.link( function( state ) {
        divisionsNode.visible = (state === 'start');
      } );
    }

    //For the "left behind" pieces, show semi-transparent so it gives the impression that it is just a "shadow", see #19
    if ( !interactive ) {
      this.opacity = 0.6;
    }

    this.mutate( options );
    this.startPosition = startPositionFunction( this.width, this.height );
    this.comparePosition = comparePositionFunction( this.width, this.height );

    this.center = this.startPosition;
    if ( interactive ) {
      this.addInputListener( new NodeDragHandler( this, {
        startDrag: function() {
          self.stateProperty.set( 'dragging' );
        },
        endDrag: function() {
          //Move to the start position or compare position, whichever is closer.
          var center = self.center;
          var distToStart = self.startPosition.distance( center );
          var distToCompare = self.comparePosition.distance( center );

          if ( distToStart < distToCompare ) {
            self.animateToStart();
          }
          else {
            self.animateToComparison();
          }
        }
      } ) );
    }
  }

  fractionComparison.register( 'HorizontalBarContainerNode', HorizontalBarContainerNode );

  return inherit( Node, HorizontalBarContainerNode, {
    /**
     * @public
     */
    animateToComparison: function() {
      this.animatingProperty.value = true;
      var self = this;
      new TWEEN.Tween( { x: this.center.x, y: this.center.y } )
        .to( { x: this.comparePosition.x, y: this.comparePosition.y }, 500 )
        .easing( TWEEN.Easing.Cubic.InOut )
        .onUpdate( function() { self.center = new Vector2( this.x, this.y ); } )
        .onComplete( function() {self.animatingProperty.value = false;} )
        .start( phet.joist.elapsedTime );
      this.stateProperty.set( 'compare' );
    },
    /**
     * @public
     */
    animateToStart: function() {
      this.animatingProperty.value = true;
      var self = this;
      new TWEEN.Tween( { x: this.center.x, y: this.center.y } )
        .to( { x: this.startPosition.x, y: this.startPosition.y }, 500 )
        .easing( TWEEN.Easing.Cubic.InOut )
        .onUpdate( function() { self.center = new Vector2( this.x, this.y ); } )
        .onComplete( function() {self.animatingProperty.value = false;} )
        .start( phet.joist.elapsedTime );
      this.stateProperty.set( 'start' );
    }
  } );
} );