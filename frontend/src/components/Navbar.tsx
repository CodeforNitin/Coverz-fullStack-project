import { NavLink } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'

const Navbar = () => {
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <NavLink to='/' className='font-sans flex z-40 font-bold tracking-wider items-center'>
            Cover<span className='text-green-600 font-extrabold text-2xl text-balance !leading-tight'>Z</span>
          </NavLink>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
