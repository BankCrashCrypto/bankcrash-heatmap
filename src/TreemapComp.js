import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

// Your data should be an array of objects, where each object represents a stock
// Each object should have a `name` property (the stock's name)
// and a `value` property (the stock's value or any other measure you're using)
// const data = new Array(20).fill().map(() => { 
//     return {
//         'name': ((Math.random() + 1).toString(36).substring(7)).toUpperCase(), 
//         'MDD': (100-((Math.random()*Math.random())) * 100).toFixed(1), 
//         'price': parseFloat(((Math.random() * 100000+3000)/100).toFixed(2)), 
//         'size': parseFloat((Math.random()*Math.random()*Math.random() * 1000+40))
//     }
// }).sort((a, b) =>  b.size - a.size);

const getColor = (value, min, max) => {
    const ratio2 = 1 - (value - min) / (max - min);
    const ratio = 2-2 * ratio2*ratio2*ratio2
    let green = 0;
    let red = 255;
    let separation = 1.993

    if (value > 99) {
        green = 0;
        red = 0;
    } else if (ratio > separation) {
        green = 0;
        red = Math.round(155 * (2-ratio)/(2-separation)+100);
    } else if (ratio > 1) {
        green = Math.round(255 * (separation-ratio));
        red = 255;
    } else {
        green = 255;
        red = Math.round(255 * (ratio));
    }
    return `rgb(${red}, ${green}, 0)`;
};
const CustomizedTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="treemap-custom-tooltip">
          {/* <p>{`${payload[0].payload.root.name}`}</p> */}
          {`${payload[0].payload.shortname}`}
          {/* <p>${`${payload[0].payload.price} / ${payload[0].payload.name}`}</p>   */}
          {/*   : ${payload[0].value} */}
        </div>
      );
    }
  
    return null;
  };
  
const TreeMapComponent = ({data_source}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <Treemap
                // data={data}
                data={data_source}
                dataKey="size"
                ratio={16/9}
                stroke="#fff"
                content={<CustomizedContent />}
                isAnimationActive={false}
            >
                <Tooltip content={<CustomizedTooltip />}/>
            </Treemap>
        </ResponsiveContainer>
    );
}
// finomhangolás string printeken
// yahoo link kattintás esetén 
// tooltip:


const CustomizedContent = (data) => {
    const { x, y, width, height, value, name, price, MDD} = data
    const sizzze = height * width
    let   BigFont   = sizzze > 12000 ? 24 : sizzze > 6000 ? 18 : sizzze > 1500 ? 11 : 10
    const SmallFont = sizzze > 12000 ? 14 : sizzze > 6000 ? 11 : sizzze > 1500 ? 8  : 5
    const TopFontGap= sizzze > 12000 ? -4 : sizzze > 6000 ? -2 : sizzze > 1500 ? 2  : 15
    const FontGap   = sizzze > 12000 ? 18 : sizzze > 6000 ? 14 : sizzze > 1500 ? 9  : 5
    BigFont = Math.min(BigFont, Math.ceil(width / (name ? name.length: 1)*1.4))
    return (
        <g>
            <a href={"https://finance.yahoo.com/quote/" + name} target="_blank" rel="noopener noreferrer" alt={"SOKAY"}>
             <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: getColor(MDD, 0,100), // colors[index % colors.length],
                    stroke: '#000',
                    strokeWidth: 2,
                    opacity: 0.8,
                }}
                // "https://finance.yahoo.com/quote/AMZN"
            />
            </a>
            <text
                x={x + width / 2}
                y={y + height / 2-10}
                textAnchor="middle"
                fill="#fff"
                fontSize={SmallFont}
            >
            <tspan x={x + width / 2} fontSize={BigFont} dy={TopFontGap}>{name}</tspan>
            {sizzze > 1500 && <tspan x={x + width / 2} fontWeight={200} dy={FontGap}>${price}</tspan>}
            {sizzze > 1500 && <tspan x={x + width / 2} fontWeight={200} dy={FontGap}>-{MDD} %</tspan>}
            </text>
        </g>
    );
};

export default TreeMapComponent;