import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import UIExamplesList from '@/components/UIExamplesList'
import AllAreaCharts from './components/AllAreaCharts'

const AreaCharts = () => {
  return (
    <>
      <PageBreadcrumb subName="Survey Analysis" title="NPS Dashboard" />
      <PageMetaData title="NPS Dashboard - Area Charts" />

      <Row>
        <Col xl={9}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="anchor" id="overview">
                NPS Dashboard Overview
                <a
                  className="btn btn-sm btn-outline-success rounded-2 float-end"
                  href="https://www.netpromoterscore.com/"
                  target="_blank">
                  Learn About NPS
                </a>
              </CardTitle>
              <p className="text-muted mb-3">
                Net Promoter Score (NPS) is a key metric for measuring customer loyalty and satisfaction. 
                These interactive area charts provide comprehensive insights into NPS trends, segmentation, and survey performance.
              </p>
            </CardBody>
          </Card>
          <AllAreaCharts />
        </Col>
        <Col xl={3}>
          <UIExamplesList
            examples={[
              { link: '#overview', label: 'NPS Overview' },
              { link: '#basic', label: 'NPS Trends' },
              { link: '#spline', label: 'NPS Segmentation' },
              { link: '#datetime', label: 'Daily NPS Tracking' },
              { link: '#negative', label: 'Sentiment Analysis' },
              { link: '#stacked', label: 'Survey Volume by Channel' },
              { link: '#timeSeries', label: 'Multi-Dimensional Satisfaction' },
              { link: '#chart-nullvalues', label: 'Completion Rate Monitoring' },
            ]}
          />
        </Col>
      </Row>
    </>
  )
}

export default AreaCharts
