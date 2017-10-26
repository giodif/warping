import vector2d  from "./lib/vector2d";
import luminance from "./lib/luminance";
import GDImage   from "./lib/gdimage";

const width  = 250,
      height = 250;

let faceimg,
    noiseimg;

// face
faceimg = new GDImage( "./img/set10.png", function( i ){
    faceimg.resize( width, height );
    // noise
    noiseimg = new GDImage( "./img/set16.png", function( i ){
        noiseimg.resize( width, height );
        init();
    } );
} );

function clone( a ){
    var b = new Uint8ClampedArray( a.length );

    for( var i = 0, len = a.length; i < len; i++ ){
        b[ i ] = a[ i ];
    }
    return b;
}

function resize( canvas, width, height ){

    var dpr = window.devicePixelRatio || 1;

    canvas.width        = width * dpr;
    canvas.height       = height * dpr;
    canvas.style.width  = width + "px";
    canvas.style.height = height + "px";
}

function init(){

    const stage = document.querySelector( "canvas" );
    const ctx   = stage.getContext( "2d" );

    const facedata = faceimg.data();

    noiseimg.eachPixel( function( pixel, vec ){

        const arr = new Uint8ClampedArray( stage.width * stage.height * 4 );

        const vv  = vec.vadd( gradXY( pixel, 100 ) );
        const vvv = wrap( vv.x, vv.y, faceimg.width, faceimg.height );

        const i = faceimg.dataIndex( vec.x, vec.y, facedata );
        const j = faceimg.dataIndex( vvv.x, vvv.y, facedata );

        arr[ i ]     = facedata.data[ j ]; 
        arr[ i + 1 ] = facedata.data[ j + 1 ];
        arr[ i + 2 ] = facedata.data[ j + 2 ];
        arr[ i + 3 ] = facedata.data[ j + 3 ];
    } );
    
    ctx.putImageData( facedata, 0, 0 );
}

//wrap the location so that it is
//always in the image
function wrap( x, y, width, height ){

    x %= width;
    y %= height;

    if( x < 0 ){ x += width; }
    if( y < 0 ){ y += height; }

    return vector2d.xy( x, y );
}

// converts a 3 value color
// into another 3 value color
function gradRGB( p, length = 10 ){ return p; }

// converts the 3 value color
// into a two value vector
function gradXY( p, length = 10 ){

    const z = length * ( ( p.b / 512 ) + 0.5 );

    return vector2d
        .xy( p.r, p.g )
        ._ssubtract( 127 )
        ._sdivide( 127 )
        ._smultiply( z )
        ._floor();
}
