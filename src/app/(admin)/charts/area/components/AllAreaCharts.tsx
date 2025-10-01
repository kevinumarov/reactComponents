import ComponentContainerCard from '@/components/ComponentContainerCard'
import ReactApexChart from 'react-apexcharts'
import {
  areaNullValueChartOpts,
  basicChartOpts,
  dateTimeChartOpts,
  irregularTimeSeriesOpts,
  negativeValuesChartOpts,
  spilineChart,
  stackedChartOpts,
} from '../data'
import { Button } from 'react-bootstrap'

const BasicAreaChart = () => {
  return (
    <ComponentContainerCard id="basic" title="Net Promoter Score Trends" description="Track NPS performance over time with threshold indicators">
      <ReactApexChart height={380} options={basicChartOpts} series={basicChartOpts.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const SplineAreaChart = () => {
  return (
    <ComponentContainerCard id="spline" title="NPS Segmentation Analysis" description="Breakdown of Promoters, Passives, and Detractors over time">
      <ReactApexChart height={380} options={spilineChart} series={spilineChart.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const DateTimeAreaChart = () => {
  return (
    <ComponentContainerCard id="datetime" title="Daily NPS Tracking with Key Events" description="Interactive timeline showing NPS trends with business milestones">
      <div className="toolbar apex-toolbar icons-center justify-content-end w-100 gap-1">
        <Button variant="soft-secondary" size="sm" id="one_month">
          1M
        </Button>
        <Button variant="soft-secondary" size="sm" id="six_months">
          6M
        </Button>
        <Button variant="soft-secondary" size="sm" id="one_year" className="active">
          1Y
        </Button>
        <Button variant="soft-secondary" size="sm" id="ytd">
          YTD
        </Button>
        <Button variant="soft-secondary" size="sm" id="all">
          ALL
        </Button>
      </div>
      <ReactApexChart height={350} options={dateTimeChartOpts} series={dateTimeChartOpts.series} type="area" />
    </ComponentContainerCard>
  )
}

const NegativeValuesChart = () => {
  return (
    <ComponentContainerCard id="negative" title="Survey Sentiment Analysis" description="Positive vs negative feedback trends with baseline comparison">
      <ReactApexChart height={380} options={negativeValuesChartOpts} series={negativeValuesChartOpts.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const StackedChart = () => {
  return (
    <ComponentContainerCard id="stacked" title="Survey Response Volume by Channel" description="Multi-channel survey distribution showing email, web, mobile, and phone responses">
      <ReactApexChart height={422} options={stackedChartOpts} series={stackedChartOpts.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const IrregularTimeSeriesChart = () => {
  return (
    <ComponentContainerCard id="timeSeries" title="Multi-Dimensional Satisfaction Tracking" description="Overall, product, and service satisfaction scores comparison">
      <ReactApexChart height={380} options={irregularTimeSeriesOpts} series={irregularTimeSeriesOpts.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const AreaChartWithNullValues = () => {
  return (
    <ComponentContainerCard id="chart-nullvalues" title="Survey Completion Rate Monitoring" description="Daily completion rates with missing data points for non-survey days">
      <ReactApexChart height={380} options={areaNullValueChartOpts} series={areaNullValueChartOpts.series} type="area" className="apex-charts" />
    </ComponentContainerCard>
  )
}

const AllAreaCharts = () => {
  return (
    <>
      <BasicAreaChart />
      <SplineAreaChart />
      <DateTimeAreaChart />
      <NegativeValuesChart />
      <StackedChart />
      <IrregularTimeSeriesChart />
      <AreaChartWithNullValues />
    </>
  )
}

export default AllAreaCharts
