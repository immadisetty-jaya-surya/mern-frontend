import './index.css'
import {faSearch,faShoppingCart,faLessThan, faGreaterThan} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Outlet } from 'react-router-dom'
// import Signup from '../Signup'

const Navbar = () => {
  let info = [
    {feature:'Categories'},
    {feature:'Sales'},
    {feature:'Clearance'},
    {feature:'New stock'},
    {feature:'Trending'}
  ]
  return (
    <div className="flex flex-col">
      <div className='flex space-x-8 justify-end pr-9 items-end'>
        <p>Help</p>
        <p>Orders & Returns</p>
        <p>name</p>
      </div>
      <div className='flex pb-3'>
        <a href='/' className="px-12 font-semibold text-3xl">
          ECOMMERCE
        </a>
        <div className='flex items-center space-x-8 pl-60'>
          {info.map((item)=>(
            <p key={item?.feature} className='px-1 pt-3 font-semibold text-base justify-center'>
              {item?.feature}
            </p>
          ))}
        </div>
        <ul className='flex pl-[360px] space-x-10 justify-end items-end'>
          <li>
            <FontAwesomeIcon icon={faSearch}/>
          </li>
          <li>
            <FontAwesomeIcon icon={faShoppingCart}/>
          </li>
        </ul>
      </div>
      <div className='flex bg-zinc-100 space-x-10 items-center justify-center py-1'>
        <FontAwesomeIcon icon={faLessThan}/>
        <p>Get 10% off on business sign up</p>
        <FontAwesomeIcon icon={faGreaterThan}/>
      </div>
      <div>
        <Outlet />
      </div> 
    </div>
  )
}

export default Navbar