import { src } from "../lib/data"
import SettingsIcon from "./icons/Settingsicons"


const Navbar = () => {
    return(
        <div className='w-full flex items-center h-[60px] justify-between px-4 py-2'>
        <div className='flex items-center justify-center gap-1'>
          <div className='w-[30px] h-[30px] bg-black cursor-pointer rounded-lg'>
            <img src={src} alt="logo" className='logo' />
          </div>
          <span className='text-[24px] text-black font-bold'>KLEO</span>
        </div>
        <SettingsIcon />
      </div>
    )
}

export default Navbar;