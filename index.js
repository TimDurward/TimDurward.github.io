$(document).ready(function () {


    var audio = document.createElement("audio");
    audio.crossOrigin = "anonymous";
    //Change Audio source for different tunes
    audio.src = "https://ec-media.sndcdn.com/K69OfdNtlN5w.128.mp3?f10880d39085a94a0418a7ef69b03d522cd6dfee9399eeb9a522099d6dffb834d343492e8c9f0f85b5ff5d6808eba105fd309db8a49ccac7a7c2eac791890944ae2a056c4f";
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

