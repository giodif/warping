
var origin = { x : 0, y : 0 },
    __atan2 = function( v ){
        var at = Math.atan2( v.y, v.x );
        return at < 0 ? Math.PI * 2 + at : at;
    },
    __type = "Vector2D";

/**  VECTOR OBJECT  ***************/
var Vector2D = function( x, y ){
        this.x = x || 0;
        this.y = y || 0;
    };

    Vector2D.prototype = {
        constructor : Vector2D,

        type : function(){ return __type; },

        /* MUTATOR FUNCTIONS ********************/
        /****************************************/
        _smultiply : function( s ){
            this.x *= s;
            this.y *= s;
            return this;
        },
        _sdivide : function( s ){
            this.x /= s;
            this.y /= s;
            return this;
        },
        _sadd : function( s ){
            this.x += s;
            this.y += s;
            return this;
        },
        _ssubtract : function( s ){
            this.x -= s;
            this.y -= s;
            return this;
        },
        _smod : function( s ){
            this.x %= s;
            this.y %= s;
        },
        _vmultiply : function( v ){
            this.x *= v.x;
            this.y *= v.y;
            return this;
        },
        _vdivide : function( v ){
            this.x /= v.x;
            this.y /= v.y;
            return this;
        },
        _vadd : function( v ){
            this.x += v.x;
            this.y += v.y;
            return this;
        },
        _vsubtract : function( v ){
            this.x -= v.x;
            this.y -= v.y;
            return this;
        },
        _vmod : function( v ){
            this.x %= v.x;
            this.y %= v.y;
        },
        _set : function( x, y ){
            //move to the new x, y location
            this.x = x;
            this.y = y;
            return this;
        }, 
        _normalize : function(){
            //transform the vector so that it is length 1
            return this._sdivide( this.magnitude() );
        },
        _rotate : function( a, o ){
            //a needs to be radians
            //origin is a vector { x : 0, y : 0 }
            var _o = o || origin,
                z  = new Vector2D( Math.sin( a ), Math.cos( a ) );
            return this
                ._vsubtract( _o )
                ._set( this.wedge( z ), this.dot( z ) )
                ._vadd( _o );
        },
        _translate : function( d ){
            //d is a vector that represents the distance to translate
            return this._vadd( d );
        },
        _scale : function( p, o ){
            //percentage ( decimal e.g. 1.2, 0.5, etc ), origin (vector)
            var _o = o || origin;
            return this
                ._vsubtract( _o )
                ._smultiply( p )
                ._vadd( _o );
        },
        _reverse : function(){
            //keeps same magnitude, but in opposite direction
            return this._smultiply( -1 );
        },
        _floor : function(){
            this.x = Math.floor( this.x );
            this.y = Math.floor( this.y );
            return this;
        },

        /* OPERATIONS THAT RETURN A NEW VECTOR *****/
        /*******************************************/
        smultiply : function( s ){
            return new Vector2D( this.x * s, this.y * s );
        },
        sdivide : function( s ){
            return new Vector2D( this.x / s, this.y / s );
        },
        sadd : function( s ){
            return new Vector2D( this.x + s, this.y + s );
        },
        ssubtract : function( s ){
            return new Vector2D( this.x - s, this.y - s );
        },
        smod : function( s ){
            return new Vector2D( this.x % s, this.y % s );
        },
        vmultiply : function( v ){
            return new Vector2D( this.x * v.x, this.y * v.y );
        },
        vdivide : function( v ){
            return new Vector2D( this.x / v.x, this.y / v.y );
        },
        vadd : function( v ){
            return new Vector2D( this.x + v.x, this.y + v.y );
        },
        vsubtract : function( v ){
            return new Vector2D( this.x - v.x, this.y - v.y );
        },
        vmod : function( v ){
            return new Vector2D( this.x % v.x, this.y % v.y );
        },




        to : function( v ){
            return v.vsubtract( this );
        },
        from : function( v ){
            return this.vsubtract( v );
        },
        direction : function(){
            return this.clone()._normalize();
        },
        clone : function() {
            return new Vector2D( this.x, this.y );
        },
        reverse : function(){
            return this.clone()._reverse();
        },
        perpendicular : function(){
            return new Vector2D( -this.y, this.x );
        },
        rotate : function( a, o ){
            return this.clone()._rotate( a, o );
        },
        translate : function( d ){
            return this.clone()._translate( d );
        },
        scale : function( p, o ){
            return this.clone()._scale( p, o );
        },
        floor : function(){
            return this.clone()._floor();
        },

        /**** RETURN SCALAR VALUES **************/
        /****************************************/
        dot : function( v ){
            return this.x * v.x + this.y * v.y;
        },
        wedge : function( v ){
            //returns the signed area of the paralellogram
            //between the vectors
            return this.x * v.y - this.y * v.x;
        },
        magnitude : function(){
            return Math.sqrt( this.dot( this ) );
        },
        distanceTo : function( v ){
            return this.to( v ).magnitude();
        },

        /**** RETURN ANGLES IN RADIANS **********/
        /****************************************/
        angleDiff : function( v ){
            //returns the angle created by the two vector
            //in the counter-clockwise direction -2pi->2pi
            return this.toAngle() - v.toAngle();
        },
        toAngle : function(){
            //returns 0->2pi, always measures couterclockwise
            //angle of the line created by treating this vector as the origin
            //and the other vector as the end of the line.
            return __atan2( this );
        },
        angleTo : function( v ){
            //returns 0 -> 2pi, always measures couterclockwise from
            //the x axis
            return __atan2( v.clone().vsubtract( this ) );
        },
        angleBetween : function( v ){
            //returns the shortest angle created by the vectors
            //0->pi, always positive
            return Math.acos( this.dot( v ) / ( this.magnitude() * v.magnitude() ) );
        },
    };

export default {
    xy : function xy( x, y ){
        return new Vector2D( x, y );
    },
    polar : function( radius, theta ){
        return new Vector2D( Math.cos( theta ) * radius, Math.sin( theta ) * radius );
    }
};