'use client'

import {useState, useCallback} from 'react'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import {AiOutlineMenu} from 'react-icons/ai'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
      setIsOpen(value => !value)
  }, [])

  return (
    <div onClick={() => {}} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer">
          Airbnb your home
        </div>
        <div onClick={toggleOpen} className="p-4 md:px-2 md:py-2 border-[1px] rounded-full border-neutral-200 flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
              <MenuItem
                onClick={() => {}}
                label='My trips'
              />
              <MenuItem
                onClick={() => {}}
                label='My favorites'
              />
              <MenuItem
                onClick={() => {}}
                label='My reservations'
              />
              <MenuItem
                onClick={() => {}}
                label='My properties'
              />
              <MenuItem
                onClick={() => {}}
                label='Airbnb my home'
              />
              <hr/>
              <MenuItem
                onClick={() => signOut()}
                label='Logout'
              />
            </>
            ) : (
            <>
              <MenuItem
                onClick={loginModal.onOpen}
                label='Login'
              />
              <MenuItem
                onClick={registerModal.onOpen}
                label='Signup'
              />
            </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu