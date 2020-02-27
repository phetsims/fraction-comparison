// Copyright 2013-2019, University of Colorado Boulder

/**
 * A drag handler for something that is movable and constrained to some (optional) bounds.
 * Copied from ph-scale\js\common\view\MovableDragHandler.js
 * Changes:
 * 1. Removed model view transform, this assumes nodes are moved directly
 * 2. Removed movable API, this class just moves nodes directly
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import SimpleDragHandler from '../../../../scenery/js/input/SimpleDragHandler.js';
import fractionComparison from '../../fractionComparison.js';

/**
 * @param {Node} node
 * @param {Object} [options]
 * @constructor
 */
function NodeDragHandler( node, options ) {

  options = merge( {
    startDrag: function() {},
    drag: function() {},
    endDrag: function() { /* do nothing */ }  // use this to do things at the end of dragging, like 'snapping'
  }, options );

  let startOffset; // where the drag started, relative to the Movable's origin, in parent view coordinates

  SimpleDragHandler.call( this, {

    allowTouchSnag: true,

    // note where the drag started
    start: function( event ) {
      startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minusXY( node.x, node.y );
      options.startDrag();
    },

    // change the location, adjust for starting offset, constrain to drag bounds
    drag: function( event ) {
      const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
      const constrainedLocation = constrainBounds( parentPoint, options.dragBounds );
      node.setTranslation( constrainedLocation );
      options.drag( event );
    },

    end: function( event ) {
      options.endDrag( event );
    }
  } );
}

fractionComparison.register( 'NodeDragHandler', NodeDragHandler );

/**
 * Constrains a point to some bounds.
 * @param {Vector2} point
 * @param {Bounds2} bounds
 */
var constrainBounds = function( point, bounds ) {
  if ( _.isUndefined( bounds ) || bounds.containsCoordinates( point.x, point.y ) ) {
    return point;
  }
  else {
    const xConstrained = Math.max( Math.min( point.x, bounds.maxX ), bounds.x );
    const yConstrained = Math.max( Math.min( point.y, bounds.maxY ), bounds.y );
    return new Vector2( xConstrained, yConstrained );
  }
};

inherit( SimpleDragHandler, NodeDragHandler );
export default NodeDragHandler;