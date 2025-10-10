import { Suspense } from 'react'

import PageTitle from '@/components/PageTitle'
import AllTangledTreeCharts from './components/AllTangledTreeCharts'

const TangledTreeCharts = () => {
  return (
    <>
      <PageTitle title="Tangled Tree Charts" />
      <Suspense>
        <AllTangledTreeCharts />
      </Suspense>
    </>
  )
}

export default TangledTreeCharts

