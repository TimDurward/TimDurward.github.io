$(document).ready(function () {


    var audio = document.createElement("audio");
    audio.crossOrigin = "anonymous";
    //Change Audio source for different tunes
    // audio.src = "https://cf-media.sndcdn.com/ovnjbvEkgklX.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vb3ZuamJ2RWtna2xYLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0ODEyNzk2ODh9fX1dfQ__&Signature=vqSbT8nNXeRcz8DX~EJjxMKWWpt7w7XUmENJAb-fg5BiEmwyygbJ2yMXb6iAUA6FMWTQ8lxl4UFLudlixYQkQb0eBiTJ55rQJ7R6qIXfY3oArfUuMfKvaiY4JetfXVWsnqYw1fgLv~3QOmGf~Kq~OQWe2ns~kpWRFQtn-DUeUlNdvRUt44OBdLhwX3V9AWOn-m0y-85Srvk0SuOh0HpQpgTLrVeXoMg2lpiQul1SxSw4sM-VIntEi8ijzVUpmr-WxBpjvcghuEtKKZF0F-FTWRGLgmXH61TJnNK2B1xrBGCAmkx04UCzYEJylylyyFArr8Qf3ffAbhrS0dPq3Slq0Q__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ";
	  audio.src = "bsdu.mp3";
    var ac = new AudioContext();
    var analyser = ac.createAnalyser();

    //bind analyser to d3
    ac.createMediaElementSource(audio).connect(analyser).connect(ac.destination);


    var frequencyData = new Uint8Array(200);
    var svgHeight = '300';
    var svgWidth = '800';
    var barPadding = '1';

    function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg('div', svgHeight, svgWidth);

    // Init d3 chart
    svg.selectAll('rect')
        .data(frequencyData)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            return i * (svgWidth / frequencyData.length);
        })
        .attr('width', svgWidth / frequencyData.length - barPadding);

    // loop through frequencies
    function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function (d) {
                return svgHeight - d;
            })
            .attr('height', function (d) {
                return d;
            })
            .attr('fill', function (d) {
                return 'rgb(46, 204, ' + d + ' )';
            });
    }

    renderChart();
    audio.play();
});
