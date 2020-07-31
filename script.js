const svg = d3.select('svg');
const height = +svg.attr('height');
const width = +svg.attr('width');

const colorScale = d3.scaleOrdinal() //each element in the domain wil have the correspond value in the range (apple - '#c11d1d', lemon - yellow)
    .domain(['apple', 'lemon'])
    .range(['#c11d1d', 'yellow'])

const radiusScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([50, 25])

const render = (selection, { fruits }) => {
    const circle = selection.selectAll('circle').data(fruits);
    circle
        .enter().append('circle')
        .attr('cx', (d, i) => i * 100 + 200)
        .attr('cy', height / 2)
        .merge(circle)
        .attr('r', d => radiusScale(d.type))
        .attr('fill', d => colorScale(d.type))

    circle.exit().remove()
}

const makeFruit = (type) => ({ type })
const fruits = d3.range(5).map(() => makeFruit('apple'))

render(svg, { fruits }) // invoke render the first time with 5 elements

setTimeout(() => {
    fruits.pop();           // remove the last element from our array
    render(svg, { fruits }) // invoke render second time with 4 elements
}, 1000);


setTimeout(() => {
    fruits[2].type = 'lemon'; // update the second element in the fruits array
    render(svg, { fruits })   // invoke render to update the DOM elements
}, 2000);