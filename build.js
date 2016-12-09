(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function () {


    var audio = document.createElement("audio");
    audio.crossOrigin = "anonymous";
    //Change Audio source for different tunes
    audio.src = "https://cf-media.sndcdn.com/4J1dVns6H5Ms.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vNEoxZFZuczZINU1zLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0ODEyNzQyOTR9fX1dfQ__&Signature=VtFG6c8XcZrTAFvnXw-NP~o9~0WRg7sDuQiZigaQFldqnTz081Y6jsMkUC4tkH4ZtgrRZ4Iwk4rBAdxpdAMbfNPRrozb1py-bEExuIPuKE~rXqYH69Rq5rxsWkLjkHRQfP27gMQUODAntAjhCDvMld0i5EpVUzx56iL8JjSXmHHH9rOfm~oLmPcOCNemE-0qB8OuXwSIq7MVapo90ZDG2OFphbBNBgRVlXXaYlC4xjjIREdK5cG07gNOuoLeBjIPS8o4H9n8J03VtTRQQmEfR4AAPTNoHUHaufOqA8XC31-26FLFotqJk67T2KGtWFaakKICDElg0K1iR2Ew7at-zw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ";
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


},{}]},{},[1]);
