import { Suspense } from 'react'

import PageTitle from '@/components/PageTitle'
import AllSankeyCharts from './components/AllSankeyCharts'

const SankeyCharts = () => {
  return (
    <>
      <PageTitle title="Sankey Charts" />
      <Suspense>
        <AllSankeyCharts />
      </Suspense>
    </>
  )
}

export default SankeyCharts
