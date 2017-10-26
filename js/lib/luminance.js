export default function lum( color ){

    var r = color.r,
        g = color.g,
        b = color.b,

        y = r + r + r + g + g + g + g + b;

    return ( y >> 3 ) / 255;
}