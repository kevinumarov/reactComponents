import { Suspense } from 'react'

import PageTitle from '@/components/PageTitle'
import AllIndentedTreeCharts from './components/AllIndentedTreeCharts'

const IndentedTreeCharts = () => {
  return (
    <>
      <PageTitle title="Indented Tree Charts" />
      <Suspense>
        <AllIndentedTreeCharts />
      </Suspense>
    </>
  )
}

export default IndentedTreeCharts

