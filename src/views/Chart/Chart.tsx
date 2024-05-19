import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import Button from '../../components/Button/Button';
import TodoList from '../../components/TodoList/TodoList';

function Chart() {
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    const backgroundColor = 'white';
    const textColor = 'black';

	const randomNumber = (): number => {
		return 25 + Math.random() * 25;
	}

    const generateData = () => {
        let randomFactor = randomNumber();
        const samplePoint = (i: number) => i * (0.5 + Math.sin(i / 1) * 0.2 + Math.sin(i / 2) * 0.4 + Math.sin(i / randomFactor) * 0.8 + Math.sin(i / 50) * 0.5) + 200 + i * 2;

        const createCandle = (val: number, time: Time): CandlestickData => ({
            time,
            open: val,
            high: val,
            low: val,
            close: val,
        });

        const updateCandle = (candle: CandlestickData, val: number): CandlestickData => ({
            time: candle.time,
            close: val,
            open: candle.open,
            low: Math.min(candle.low, val),
            high: Math.max(candle.high, val),
        });

        randomFactor = randomNumber();
        const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
        const numberOfPoints = 2500 * 20;
        const initialData: CandlestickData[] = [];
        const realtimeUpdates: CandlestickData[] = [];
        let lastCandle: CandlestickData | undefined;
        let previousValue = samplePoint(-1);
        for (let i = 0; i < numberOfPoints; ++i) {
            if (i % 20 === 0) {
                date.setUTCDate(date.getUTCDate() + 1);
            }
            const time = (date.getTime() / 1000) as Time;
            let value = samplePoint(i);
			console.log(value)
            const diff = (value - previousValue) * Math.random();
            value = previousValue + diff;
            previousValue = value;
            if (i % 20 === 0) {
                const candle = createCandle(value, time);
                lastCandle = candle;
                if (i >= 1000) {
                    realtimeUpdates.push(candle);
                }
            } else {
                const newCandle = updateCandle(lastCandle!, value);
                lastCandle = newCandle;
                if (i >= 1000) {
                    realtimeUpdates.push(newCandle);
                } else if ((i + 1) % 20 === 0) {
                    initialData.push(newCandle);
                }
            }
        }

        return { initialData, realtimeUpdates };
    };

    const { initialData, realtimeUpdates } = generateData();

    useEffect(() => {
        if (!chartContainerRef.current) return;

        chartRef.current = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

        seriesRef.current = chartRef.current.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        seriesRef.current.setData(initialData);
        chartRef.current.timeScale().fitContent();
        chartRef.current.timeScale().scrollToPosition(2, false);

        const handleResize = () => {
            chartRef.current?.applyOptions({ width: chartContainerRef.current?.clientWidth ?? 0 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chartRef.current?.remove();
        };
    }, []);

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (!realtimeUpdates.length) {
                clearInterval(intervalID);
                return;
            }
            const update = realtimeUpdates.shift();
            seriesRef.current?.update(update!);
        }, 1000);

        return () => clearInterval(intervalID);
    }, [realtimeUpdates]);

    return (
        <>
            <div ref={chartContainerRef} className='chart-container' />
            <div>
                <Button text='Go to realtime' onClick={() => chartRef.current?.timeScale().scrollToRealTime()} />
            </div>
            <TodoList />
        </>
    );
}

export default Chart;
