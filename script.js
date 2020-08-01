const svg = d3.select('svg');
const height = +svg.attr('height');
const width = +svg.attr('width');

//scaleOrdinal: each element in the domain will have the corresponding value from the range (typeA - '#c11d1d', typeB - yellow)
const colorScale = d3.scaleOrdinal()
    .domain(['typeA', 'typeB'])
    .range(['#c11d1d', 'yellow'])

const dimensionScale = d3.scaleOrdinal()
    .domain(['typeA', 'typeB'])
    .range([50, 25])

const render = (selection, { cars }) => {
    const car = selection.selectAll('rect').data(cars)
    car.enter().append('rect')
        .attr('x', (_d, i) => width / 6 + i * 80)
        .attr('y', height / 2 - 100)
        .merge(car)
        .attr('height', d => dimensionScale(d.type))
        .attr('width', d => dimensionScale(d.type))
        .attr('fill', d => colorScale(d.type))

    car.exit().remove()
}

const makeCar = (type) => ({ type })
const cars = d3.range(5).map(() => makeCar('typeA'))

render(svg, { cars }) // invoke render the first time with 5 elements

setTimeout(() => {
    cars.pop();           // remove the last element from our array
    render(svg, { cars }) // invoke render second time with 4 elements
}, 1000);

setTimeout(() => {
    cars[2].type = 'typeB'; // update the element with index 2 in the cars array
    render(svg, { cars })   // invoke render to update the DOM elements
}, 2000);