import { NavLink } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='bg-white h-20 relative'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200' />

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex space-x-8'>
              <NavLink
                to='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Terms
              </NavLink>
              <NavLink
                to='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Privacy Policy
              </NavLink>
              <NavLink
                to='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
