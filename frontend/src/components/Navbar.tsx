import { NavLink } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {

  const {user} = useAuthContext();
  const { logout } = useLogout();
    const isAdmin:Boolean = false;

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <NavLink to='/' className='font-sans flex z-40 font-bold tracking-wider items-center'>
            Cover<span className='text-green-600 font-extrabold text-2xl text-balance !leading-tight'>Z</span>
          </NavLink>
          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <div>
                <span>
                <span>{user.email}</span>
                </span>
                <button
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  onClick={logout}>
                  Log out
                </button>
                </div>
                
                {isAdmin ? (
                  <NavLink
                    to='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard ✨
                  </NavLink>
                ) : null}
                <NavLink
                  to='/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to='/signup'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  >
                  Sign up
                </NavLink>

                <NavLink
                  to='/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Log in
                </NavLink>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <NavLink
                  to='/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
