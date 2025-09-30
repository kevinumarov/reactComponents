import { Link } from 'react-router-dom'

import type { LogoBoxProps } from '@/types/component-props'

const LogoBox = ({ containerClassName, squareLogo, textLogo }: LogoBoxProps) => {
  return (
    <div className={containerClassName ?? ''}>
      <Link to="/" className="logo-dark d-flex align-items-center">
        
      </Link>
      <Link to="/" className="logo-light d-flex align-items-center">
        <span className={`${textLogo?.className} fw-bold text-light`} style={{ fontSize: '20px' }}>Survey Analysis</span>
      </Link>
    </div>
  )
}

export default LogoBox
