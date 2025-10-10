import { Suspense } from 'react'

import PageTitle from '@/components/PageTitle'
import AllDivergingBarCharts from './components/AllDivergingBarCharts'

const DivergingBarCharts = () => {
  return (
    <>
      <PageTitle title="Diverging Bar Charts" />
      <Suspense>
        <AllDivergingBarCharts />
      </Suspense>
    </>
  )
}

export default DivergingBarCharts

