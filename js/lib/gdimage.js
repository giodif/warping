import vector2d  from "./vector2d";

'use strict';

export default class GDImage{

    constructor( src, callback = ()=>{} ){
        this.image     = new Image();
        this.src       = src;
        this.image.src = src;
        this.width     = 0;
        this.height    = 0;
        this.dpr       = window.devicePixelRatio || 1;
        this.canvas    = document.createElement( "canvas" );
        this.ctx       = this.canvas.getContext( "2d" );

        this.image.onload = () => {
            this.resize( this.image.width, this.image.height );
            callback( this );
        };
    }

    resize( width, height ){
        this.width         = width * this.dpr;
        this.height        = height * this.dpr;
        this.canvas.width  = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width  = width + "px";
        this.canvas.style.height = height + "px";
        this.ctx.drawImage( this.image, 0, 0, this.width, this.height );
        return this;
    }
    size(){
        return vector2d.xy( this.width, this.height );
    }
    data(){
        return this.ctx.getImageData( 0, 0, this.width, this.height );
    }
    dataIndex( x, y, data ){
        return ( y * this.width + x ) * 4;
    }
    _pixel( x, y, data ){

        const z = this.dataIndex( x, y, data );

        return {
            r : data[ z ],
            g : data[ z + 1 ],
            b : data[ z + 2 ]
        };
    }
    eachPixel( func ){

        const data = this.data().data;
        let vec  = vector2d.xy();

        for( var y = 0; y < this.height; y++ ){
            for( var x = 0; x < this.width; x++ ){

                func( this._pixel( x, y, data ), vec._set( x, y ) );
            }
        }
    }
}